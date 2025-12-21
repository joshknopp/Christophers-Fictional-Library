
import { test, expect } from '@playwright/test';

test.describe('Book Viewer', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
  });

  test('should open the book viewer and display the first page', async ({ page }) => {
    // Wait for the book covers to be visible to avoid race conditions
    await page.waitForSelector('.book-cover');

    // Click on the first book cover to open the reader
    await page.locator('.book-cover').first().click();

    // The reader view should be visible
    await expect(page.locator('#reader-view')).toBeVisible();

    // Check if the first page image is loaded and visible
    const firstPageImage = page.locator('.reader-page img');
    await expect(firstPageImage).toBeVisible();
    await expect(firstPageImage).toHaveAttribute('src', /.*\/assets\/books\/charlies-day\/CharliesDay-2.jpg/);
  });

  test('should navigate to the next and previous pages', async ({ page }) => {
    // Wait for book covers to be rendered
    await page.waitForSelector('.book-cover');

    // Click the first book cover to open the reader
    await page.locator('.book-cover').first().click();

    // Ensure the reader view is visible before proceeding
    await expect(page.locator('#reader-view')).toBeVisible();

    // Click the 'next' button to go to the second page
    await page.locator('#next-page').click();

    // Verify the second page is displayed
    const secondPageImage = page.locator('.reader-page img');
    await expect(secondPageImage).toBeVisible();
    await expect(secondPageImage).toHaveAttribute('src', /.*\/assets\/books\/charlies-day\/CharliesDay-3.jpg/);

    // Click the 'previous' button to go back to the first page
    await page.locator('#prev-page').click();

    // Verify the first page is displayed again
    const firstPageImage = page.locator('.reader-page img');
    await expect(firstPageImage).toBeVisible();
    await expect(firstPageImage).toHaveAttribute('src', /.*\/assets\/books\/charlies-day\/CharliesDay-2.jpg/);
  });

  test('should close the book viewer', async ({ page }) => {
    // Wait for the book covers to load
    await page.waitForSelector('.book-cover');

    // Click the first book cover to open the reader
    await page.locator('.book-cover').first().click();

    // Confirm the reader is visible
    await expect(page.locator('#reader-view')).toBeVisible();

    // Click the 'close' button
    await page.locator('#close-reader').click();

    // The reader view should now be hidden
    await expect(page.locator('#reader-view')).toBeHidden();
  });
});
