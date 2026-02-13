// spec: specs/CasosHU01.md
// case: CP-HU-01-R12 - Bloqueo por Descripción demasiado corta

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R12: Bloqueo por Descripción de oferta demasiado corta (menor a 20 caracteres)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Open modal to test short description validation
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter a valid title
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Cálculo Vectorial');

    // 4. Set price to 15
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('15');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Select Matemáticas category
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemáticas');
    await page.getByRole('button', { name: 'Matemáticas' }).click();

    // 7. Enter a very short description "Clases rápidas." (15 characters, less than minimum of 20)
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Clases rápidas.');

    // 8. Click to submit form and trigger validation
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the description field shows error with "Mínimo 20 caracteres"
    await expect(page.getByText('Mínimo 20 caracteres')).toBeVisible();

    // Verify the description counter shows "15/250"
    await expect(page.getByText('15/250')).toBeVisible();

    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
