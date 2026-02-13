// spec: specs/CasosHU01.md
// case: CP-HU-01-R11 - Bloqueo por Título demasiado corto

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R11: Bloqueo por Título de oferta demasiado corto (menor a 3 caracteres)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Open modal to test short title validation
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter a very short title "Fe" (2 characters)
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Fe');

    // 4. Set price to 10
    const priceInput = await page.locator('input[type="number"]');
    await priceInput.fill('10');

    // 5. Modalidad is already set to "Presencial" by default

    // 6. Select Matemáticas category
    await page.getByRole('textbox', { name: 'Buscar categorías...' }).fill('Matemáticas');
    await page.getByRole('button', { name: 'Matemáticas' }).click();

    // 7. Enter a valid description
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('Clases de matemáticas para estudiantes universitarios con énfasis en ejercicios prácticos.');

    // 8. Click to submit form and trigger validation
    await page.getByRole('button', { name: 'Publicar Oferta' }).click();

    // Verify the title field shows error with "Mínimo 3 caracteres"
    await expect(page.getByText('Mínimo 3 caracteres')).toBeVisible();

    // Verify the title counter shows "2/80"
    await expect(page.getByText('2/80')).toBeVisible();

    // Verify the modal remains open
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).toBeVisible();
  });
});
