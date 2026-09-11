import { defineConfig, devices } from '@playwright/test';

const port = 4321;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm build && pnpm exec astro preview --port ${port}`,
    url: `http://localhost:${port}/Nikolai/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Astro 7 puts preview in the background when it thinks an AI agent is
    // driving the terminal. Playwright needs it in the foreground to know it
    // is alive, and this variable turns the detection off.
    env: { ASTRO_PREVIEW_BACKGROUND: '0' },
  },
});
