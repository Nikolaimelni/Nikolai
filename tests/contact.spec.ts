import { expect, test } from '@playwright/test';

// Fields are addressed by id, not by label copy: the wording is meant to change.
async function fillForm(page: import('@playwright/test').Page) {
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

test('a failed send actually shows the error', async ({ page }) => {
  // On the old site the error node lived inside a hidden parent, so this
  // message could never appear and a lost enquiry looked like a sent one.
  await page.route('**/formspree.io/**', (route) => route.fulfill({ status: 500, body: '' }));

  await page.goto('');
  await fillForm(page);
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.getByRole('status')).toContainText('did not go through');
  await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled();
});
