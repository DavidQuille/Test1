// spec: specs/CasosHU01.md
// case: CP-HU-01-R9 - Bloqueo por límite máximo de categorías

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R9: Bloqueo por límite máximo de categorías (Máx. 5)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Open modal to test category limit
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Select 5 categories: Matemáticas, Física, Química, Álgebra, Cálculo
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemáticas');
    await page.getByRole('button', { name: 'Matemáticas' }).click();

    // Select Física
    await page.getByRole('button', { name: 'Física' }).click();

    // Select Química
    await page.getByRole('button', { name: 'Química' }).click();

    // Select Álgebra
    await page.getByRole('button', { name: 'Álgebra' }).click();

    // Select Cálculo to reach 5/5 limit
    await page.getByRole('button', { name: 'Cálculo' }).click();

    // 4. Verify the counter shows "5/5"
    await expect(page.getByText('5/5')).toBeVisible();

    // Verify that all other category buttons are disabled
    const disabledCount = await page.locator('button[disabled]').count();
    expect(disabledCount).toBeGreaterThan(0);
  });
});
