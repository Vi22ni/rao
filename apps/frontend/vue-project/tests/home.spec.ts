import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://pets-r.vercel.app/');

  await expect(page).toHaveTitle(/Pets/);
});

test('carousel next button changes first visible card', async ({ page }) => {
  await page.goto('https://pets-r.vercel.app/');

  const firstCardTextBefore = await page.locator('.carousel .wrapper .selectedCard').first().innerText();
  await page.screenshot({ path: 'firstCardTextBefore.png' });
  await page.click('button:has-text("próximo")');
  await page.waitForTimeout(500);
  
  const firstCardTextAfter = await page.locator('.carousel .wrapper .selectedCard').first().innerText();
  await page.screenshot({ path: 'firstCardTextAfter.png' });

  console.log("🚀 ~ firstCardTextBefore:", firstCardTextBefore)
  console.log("🚀 ~ firstCardTextAfter:", firstCardTextAfter)
  expect(firstCardTextAfter).not.toBe(firstCardTextBefore);
});


