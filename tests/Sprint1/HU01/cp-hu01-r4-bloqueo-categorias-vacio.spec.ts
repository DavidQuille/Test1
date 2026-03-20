import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU01.md
// case: CP-HU-01-R4 - Bloqueo por categorías vacías

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R4: Bloqueo por no seleccionar categorías', async ({ page }) => {
    // 1. Navigate to the tutor dashboard
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Click to open the new offer modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter the title "Programación en Python"
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Programación en Python');

    // 4. Set the price to 15
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('15');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Categories field is left empty - no action needed

    // 7. Enter the description
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Clases de Python desde cero hasta nivel intermedio.');

    // 8. Close the categories dropdown by clicking on the title field
    await page.getByRole('textbox', { name: /Ej. C\u00e1lculo Vectorial/ }).click();

    // 9. Click to submit form and trigger validation error
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the error message for categories is displayed
    await expect(page.getByText('Selecciona al menos una categoría')).toBeVisible();
    
    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
