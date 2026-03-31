import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU01.md
// case: CP-HU-01-R11 - Bloqueo por Título demasiado corto

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R11: Bloqueo por título muy corto (menos de 3 caracteres)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Open modal to test short title validation
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter a very short title "Fe" (2 characters)
    await page.getByRole('textbox', { name: /Ej. Cálculo Vectorial/ }).fill('Fe');

    // 4. Set price to 10
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('10');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Select Matemática category
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemática');
    await page.getByRole('button', { name: 'Matemática' }).click();

    // 7. Enter a valid description
    await page.getByRole('textbox', { name: /Describe qué incluye tu tutoría/ }).fill('Clases de Matemática para estudiantes universitarios con énfasis en ejercicios prácticos.');

    // 8. Close the categories dropdown by clicking on the title field
    await page.getByRole('textbox', { name: /Ej. C\u00e1lculo Vectorial/ }).click();

    // 9. Click to submit form and trigger validation
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the title field shows error with "Mínimo 3 caracteres"
    await expect(page.getByText('Mínimo 3 caracteres')).toBeVisible();

    // Verify the title counter shows "2/80"
    await expect(page.locator('span').filter({ hasText: /^2\/80$/ })).toBeVisible();

    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
