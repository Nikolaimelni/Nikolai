import { expect, test } from '@playwright/test';

const home = '/Nikolai/';

test('the page renders its sections', async ({ page }) => {
  await page.goto(home);

  // The old site had four h1 elements, which is why this is pinned.
  await expect(page.locator('h1')).toHaveCount(1);

  for (const id of ['work', 'experience', 'skills', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  const work = page.locator('#work');
  await expect(work.getByRole('heading', { name: 'Numfin Global' })).toBeVisible();
  await expect(work.locator('.project')).toHaveCount(2);
});

test('nothing scrolls sideways on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(home);

  // The dots beside the portrait overhang on purpose and are clipped, so
  // scrollWidth is not the measure. What matters is whether a thumb can drag
  // the page sideways, which is what the old site let you do by 23px.
  const scrolled = await page.evaluate(() => {
    window.scrollTo(9999, 0);
    return window.scrollX;
  });

  expect(scrolled).toBe(0);
});

test('content survives without javascript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(home);

  // Half the old page sat at opacity 0 waiting on a scroll handler.
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#contact form')).toBeVisible();
  await context.close();
});

test('the 404 page works', async ({ page }) => {
  const response = await page.goto('/Nikolai/no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not here');
});
