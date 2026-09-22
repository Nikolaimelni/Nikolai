import { defineConfig, devices } from '@playwright/test';
import astroConfig from './astro.config.mjs';

// Not 4321: that is where `pnpm dev` runs, and the tests are meant for the build.
const port = 4322;

// Taken from the Astro config so the base path lives in exactly one place.
const base = astroConfig.base ?? '/';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}${base}/`.replace(/\/+$/, '/'),
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm build && pnpm exec astro preview --port ${port}`,
    url: `http://localhost:${port}${base}/`.replace(/\/+$/, '/'),
    timeout: 120_000,
    // astro preview backgrounds itself when it detects a coding agent, and
    // Playwright then loses the process. Astro only checks that this variable
    // exists (it sets it on its own detached child), so any value stops that.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
  },
});
