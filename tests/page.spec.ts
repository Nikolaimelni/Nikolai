import { expect, test } from '@playwright/test';

test('the page renders its sections', async ({ page }) => {
  await page.goto('');

  // The old site had four h1 elements, which is why this is pinned.
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);

  for (const id of ['work', 'experience', 'skills', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  const work = page.locator('#work');
  await expect(work.getByRole('heading', { name: 'Numfin Global' })).toBeVisible();
  await expect(work.locator('.project')).toHaveCount(2);
});

test('nothing scrolls sideways on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('');

  // The dots beside the portrait overhang on purpose and are clipped, so
  // scrollWidth is not the measure. What matters is whether a thumb can drag
  // the page sideways, which is what the old site let you do by 23px.
  const scrolled = await page.evaluate(() => {
    window.scrollTo(9999, 0);
    return window.scrollX;
  });

  expect(scrolled).toBe(0);
});

test('anchor jumps clear the sticky nav', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('');

  const navBottom = () => page.locator('nav').evaluate((nav) => nav.getBoundingClientRect().bottom);

  for (const id of ['work', 'experience', 'contact']) {
    await page.locator(`nav a[href="#${id}"]`).click();
    const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual((await navBottom()) - 1);
  }

  // The name in the nav points at #main, which starts right under the nav.
  await page.locator('nav a.brand').click();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('the nav marks the section in view', async ({ page }) => {
  await page.goto('');
  const link = page.locator('nav a[href="#contact"]');
  await link.click();
  await expect(link).toHaveAttribute('aria-current', 'true');
});

test('reduced motion switches transitions off', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');

  const durations = await page
    .getByRole('link', { name: 'Get in touch' })
    .evaluate((el) => getComputedStyle(el).transitionDuration.split(', ').map(Number.parseFloat));
  expect(durations.every((seconds) => seconds === 0)).toBe(true);
});

test('content survives without javascript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('');

  // Half the old page sat at opacity 0 waiting on a scroll handler.
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#contact form')).toBeVisible();
  await context.close();
});

test('the 404 page works', async ({ page }) => {
  const response = await page.goto('no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not here');
});
