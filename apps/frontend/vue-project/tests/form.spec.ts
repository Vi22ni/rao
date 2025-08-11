import { test, expect } from '@playwright/test';
import path from 'path';

test('try to send invalid form', async ({ page }) => {
    await page.goto('https://pets-r.vercel.app/');

    await expect(page).toHaveTitle(/Pets/);

    await page.getByRole('link', { name: 'participar' }).click();

    await page.getByRole('button', { name: 'Enviar' }).click();

    setTimeout(() => { }, 500);

    await expect(page.locator('.errorMessage')).toHaveText('Por favor, adicione uma imagem do pet');
});

test('upload de arquivo com input', async ({ page }, testInfo) => {
    await page.goto('https://pets-r.vercel.app/');
    await page.getByRole('link', { name: 'participar' }).click();

    const filePath = path.resolve(testInfo.project.testDir, 'mocks/zion.jpg');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    await page.getByRole('button', { name: 'Enviar' }).click();

    await expect(page.locator('.errorMessage')).not.toContainText('O arquivo deve ter no máximo 2MB');
});

test('upload de arquivo com input - espera erro de limite', async ({ page }, testInfo) => {
    await page.goto('https://pets-r.vercel.app/');
    await page.getByRole('link', { name: 'participar' }).click();

    const filePath = path.resolve(testInfo.project.testDir, 'mocks/big.jpg');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    await page.getByRole('button', { name: 'Enviar' }).click();

    await expect(page.locator('.errorMessage').first()).toContainText('O arquivo deve ter no máximo 2MB');
});



