import { expect, test } from '@playwright/test';

test('every outbound link still resolves', { tag: '@network' }, async ({ page, request }) => {
  await page.goto('');

  const urls = await page.$$eval('a[href^="http"]', (links) =>
    Array.from(new Set(links.map((a) => (a as HTMLAnchorElement).href))),
  );

  expect(urls.length).toBeGreaterThan(0);

  const dead: string[] = [];
  for (const url of urls) {
    try {
      const response = await request.get(url, { timeout: 15_000, maxRedirects: 5 });
      // LinkedIn answers bots with 999, which is not the site being down.
      if (response.status() >= 400 && response.status() !== 999) {
        dead.push(`${response.status()} ${url}`);
      }
    } catch {
      dead.push(`unreachable ${url}`);
    }
  }

  expect(dead, `dead links:\n${dead.join('\n')}`).toHaveLength(0);
});
