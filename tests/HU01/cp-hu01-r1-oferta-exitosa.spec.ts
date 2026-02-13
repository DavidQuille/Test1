// spec: specs/CasosHU01.md
// case: CP-HU-01-R1 - Publicación exitosa de una oferta de tutoría

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R1: Publicación exitosa de una oferta de tutoría', async ({ page }) => {
    // 1. Navigate to the tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Click the "+ Nueva Oferta" button to open the modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter the offer title with unique timestamp to avoid duplicates
    const uniqueTitle = `Cálculo Vectorial ${Date.now()}`;
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill(uniqueTitle);

    // 4. Clear the price field and enter 10
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('10');

    // 5. Modalidad is already set to "Presencial" by default, no action needed

    // 6. Type "Matemáticas" in the categories search field and select it
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemáticas');
    await page.getByRole('button', { name: 'Matemáticas' }).click();

    // 7. Enter the description for the tutoring offer
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie.');

    // 8. Click the "Publicar Oferta" button to submit the form
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the offer was created successfully
    await expect(page.getByText('Oferta creada exitosamente')).toBeVisible();
  });
});
