import { defineConfig, devices } from '@playwright/test';
import astroConfig from './astro.config.mjs';

// 4321 is where `pnpm dev` runs. The tests are meant for the build.
const port = 4322;
const baseURL = new URL(astroConfig.base ?? '/', `http://localhost:${port}`).href;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm build && pnpm exec astro preview --port ${port}`,
    url: baseURL,
    timeout: 120_000,
  },
});
