// spec: specs/CasosHU01.md
// case: CP-HU-01-R3 - Bloqueo por precio por hora inválido

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R3: Bloqueo por precio por hora inválido (fuera de rango)', async ({ page }) => {
    // 1. Navigate to the tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Click the "+ Nueva Oferta" button to open the modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter the title "Física I"
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Física I');

    // 4. Set the price to 3 which is outside the valid range ($5-$20)
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('3');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Select "Ciencias Exactas" category
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Ciencias Exactas');
    await page.getByRole('button', { name: 'Ciencias Exactas' }).click();

    // 7. Enter the description
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Tutorías personalizadas de Física I para estudiantes universitarios.');

    // 8. Click "Publicar Oferta" to trigger validation
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the price field shows error
    const priceField = page.locator('input[type="number"]');
    await expect(priceField).toHaveClass(/border-\[var\(--error\)\]/);
    
    // Verify the error message is displayed
    await expect(page.getByText('El precio mínimo por hora es de $5')).toBeVisible();
    
    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
