import { expect, type Page, test } from '@playwright/test';

// By id, because the label wording keeps changing.
async function fillForm(page: Page) {
  await page.locator('#name').fill('Test Person');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#message').fill('A long enough message to pass validation.');
}

test('a sent message reports success and clears the form', async ({ page }) => {
  await page.route('**/formspree.io/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
  );

  await page.goto('');
  await fillForm(page);
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.getByRole('status')).toContainText('Sent');
  await expect(page.locator('#name')).toHaveValue('');
});

test('an empty form never reaches formspree', async ({ page }) => {
  let posted = false;
  await page.route('**/formspree.io/**', (route) => {
    posted = true;
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await page.goto('');
  await page.getByRole('button', { name: 'Send' }).click();

  const valid = await page
    .locator('#contact-form')
    .evaluate((form: HTMLFormElement) => form.checkValidity());
  expect(valid).toBe(false);
  await expect(page.getByRole('status')).toBeEmpty();
  expect(posted).toBe(false);
});

test('without javascript the form still posts to formspree', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  let method = '';
  await page.route('**/formspree.io/**', (route) => {
    method = route.request().method();
    return route.fulfill({ status: 200, contentType: 'text/html', body: '<p>Thanks</p>' });
  });

  await page.goto('');
  await fillForm(page);
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.locator('body')).toHaveText('Thanks');
  expect(method).toBe('POST');
  await context.close();
});

test('a failed send actually shows the error', async ({ page }) => {
  await page.route('**/formspree.io/**', (route) => route.fulfill({ status: 500, body: '' }));

  await page.goto('');
  await fillForm(page);
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.getByRole('status')).toContainText('did not go through');
  const email = await page.locator('a[href^="mailto:"]').first().innerText();
  await expect(page.getByRole('status')).toContainText(email);
  await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled();
});
