// spec: specs/CasosHU01.md
// case: CP-HU-01-R12 - Bloqueo por Descripción demasiado corta

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R12: Bloqueo por descripción muy corta (menos de 30 caracteres)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await page.goto(DASHBOARD_TUTOR_URL);

    // 2. Open modal to test short description validation
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter a valid title
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Cálculo Vectorial');

    // 4. Set price to 15
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('15');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Select Matemática category
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemática');
    await page.getByRole('button', { name: 'Matemática' }).click();

    // 7. Enter a very short description "Clases rápidas." (15 characters, less than minimum of 20)
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Clases rápidas.');

    // 8. Close the categories dropdown by clicking on the title field
    await page.getByRole('textbox', { name: /Ej. C\u00e1lculo Vectorial/ }).click();

    // 9. Click to submit form and trigger validation
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the description field shows error with "Mínimo 20 caracteres"
    await expect(page.getByText('Mínimo 20 caracteres')).toBeVisible();

    // Verify the description counter shows "15/250"
    await expect(page.getByText('15/250')).toBeVisible();

    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
