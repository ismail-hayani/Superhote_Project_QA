import { test, expect } from '@playwright/test';

test('test', async ({ page, context}) => {

await page.goto('https://www.superhote.com/', { 
  waitUntil: 'domcontentloaded', // Faster than 'load'
  timeout: 60000
});
   await context.clearCookies();
  await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'L\'Outil', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Témoignages', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
});