// spec: specs/CasosHU01.md
// case: CP-HU-01-R2 - Bloqueo por título de oferta vacío

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R2: Bloqueo por título de oferta vacío', async ({ page }) => {
    // 1. Navigate to the tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Click the "+ Nueva Oferta" button to open the modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Title field is left empty - no action needed

    // 4. Set the price field to 10
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('10');

    // 5. Modalidad is already set to "Presencial" by default, no action needed

    // 6. Type "Matemáticas" in the categories search field and select it
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemáticas');
    await page.getByRole('button', { name: 'Matemáticas' }).click();

    // 7. Enter the description for the tutoring offer
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Clases de matemáticas avanzadas para universitarios.');

    // 8. Click "Publicar Oferta" button without filling the title
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the validation error is shown for the title field
    const titleField = page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' });
    await expect(titleField).toHaveClass(/border-\[var\(--error\)\]/);
    
    // Verify the error message is displayed
    await expect(page.getByText('Escribe el título de la materia')).toBeVisible();
    
    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
