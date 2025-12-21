import { test, expect } from '@playwright/test';

test('Reader navigation', async ({ page }) => {
  await page.goto('/');

  // Open the reader for the first book.
  await page.locator('.book-cover').first().click();
  await page.waitForSelector('.reader-view-overlay', { state: 'visible' });

  // Wait for the page to be rendered
  await page.waitForTimeout(500);

  // Click the right arrow to go to the next page.
  await page.locator('.reader-view-nav.next').click();
  await page.waitForTimeout(500); // Wait for animation
  await page.screenshot({ path: 'reader-view-page2.png' });

  // Click the left arrow to go back to the previous page.
  await page.locator('.reader-view-nav.prev').click();
  await page.waitForTimeout(500); // Wait for animation
  await page.screenshot({ path: 'reader-view-page1.png' });

  // Click the close button.
  await page.locator('.reader-view-close').click();
  await page.waitForSelector('.reader-view-overlay', { state: 'hidden' });
  await page.screenshot({ path: 'bookshelf-view.png' });
});
