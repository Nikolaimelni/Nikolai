import { readdirSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const projectsDir = new URL('../src/content/projects/', import.meta.url);
const published = readdirSync(projectsDir)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => !/^draft:\s*true\b/m.test(readFileSync(new URL(file, projectsDir), 'utf8')));

test('the page renders its sections', async ({ page }) => {
  await page.goto('');

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);

  for (const id of ['experience', 'skills', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  // No published projects means no Work section and no nav link to it.
  const titles = page.locator('#work').getByRole('heading', { level: 3 });
  await expect(titles).toHaveCount(published.length);
  await expect(page.locator('nav a[href="#work"]')).toHaveCount(published.length > 0 ? 1 : 0);
});

test('nothing scrolls sideways on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('');

  const scrolled = await page.evaluate(() => {
    window.scrollTo(9999, 0);
    return window.scrollX;
  });

  expect(scrolled).toBe(0);
});

test('the name in the nav renders with its space', async ({ page }) => {
  await page.goto('');
  const brand = page.locator('nav a.brand');
  const markup = (await brand.textContent())?.replace(/\s+/g, ' ').trim();
  expect(await brand.innerText()).toBe(markup);
});

// 200% is the text size WCAG expects a page to survive.
for (const { width, text } of [
  { width: 375, text: '100%' },
  { width: 1280, text: '200%' },
]) {
  test(`anchor jumps clear the sticky nav at ${width}px, ${text} text`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('');
    await page.evaluate((size) => {
      document.documentElement.style.fontSize = size;
    }, text);

    const navBottom = () =>
      page.locator('nav').evaluate((nav) => nav.getBoundingClientRect().bottom);

    const ids = await page
      .locator('nav a[data-spy]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('data-spy') ?? ''));

    for (const id of ids) {
      await page.locator(`nav a[href="#${id}"]`).click();
      const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
      expect(top).toBeGreaterThanOrEqual((await navBottom()) - 1);
    }

    // The name in the nav points at #main, which starts right under the nav.
    await page.locator('nav a.brand').click();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
}

test('the nav marks the section in view and nothing else', async ({ page }) => {
  await page.goto('');
  const link = page.locator('nav a[href="#contact"]');
  const marked = page.locator('nav a[aria-current]');

  await link.click();
  await expect(link).toHaveAttribute('aria-current', 'true');

  // Skills has no nav link. Its top goes above the band the observer watches.
  await page.locator('#skills').evaluate((skills) => {
    const top = skills.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight * 0.2);
  });
  await expect(marked).toHaveCount(0);

  await link.click();
  await expect(marked).toHaveCount(1);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(marked).toHaveCount(0);
});

test('reduced motion switches transitions off', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');

  const durations = await page
    .getByRole('link', { name: 'Get in touch' })
    .evaluate((el) => getComputedStyle(el).transitionDuration.split(', ').map(Number.parseFloat));
  expect(durations.every((seconds) => seconds === 0)).toBe(true);
});

test('nothing on the page loads from another site', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => {
    if (request.url().startsWith('http')) origins.add(new URL(request.url()).origin);
  });

  await page.goto('');
  await page.waitForLoadState('networkidle');

  expect([...origins]).toEqual([new URL(page.url()).origin]);
});

test('the content security policy blocks nothing we ship', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  for (const path of ['', 'no-such-page']) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1);
  }

  // The one expected error is the 404 page reporting its own status.
  expect(errors).toEqual([
    'Failed to load resource: the server responded with a status of 404 (Not Found)',
  ]);
});

test('content survives without javascript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('');

  await expect(page.locator('#experience')).toBeVisible();
  await expect(page.locator('#contact form')).toBeVisible();
  await context.close();
});

test('the 404 page works', async ({ page }) => {
  const response = await page.goto('no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not here');
});
