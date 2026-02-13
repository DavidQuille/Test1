// spec: specs/CasosHU01.md
// case: CP-HU-01-R5 - Bloqueo por descripción vacía

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R5: Bloqueo por descripción de oferta vacía', async ({ page }) => {
    // 1. Navigate to the tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Click to open the new offer modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter the title "Álgebra Lineal"
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Álgebra Lineal');

    // 4. Set the price to 12
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('12');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Select "Matemáticas" category
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemáticas');
    await page.getByRole('button', { name: 'Matemáticas' }).click();

    // 7. Description field is left empty - no action needed

    // 8. Click to submit form without description to trigger validation
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the description field shows error
    const descriptionField = page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' });
    await expect(descriptionField).toHaveClass(/border-\[var\(--error\)\]/);
    
    // Verify the error message is displayed
    await expect(page.getByText('Agrega una descripción')).toBeVisible();
    
    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
