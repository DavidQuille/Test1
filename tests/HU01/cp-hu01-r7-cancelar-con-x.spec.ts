// spec: specs/CasosHU01.md
// case: CP-HU-01-R7 - Cancelar con el botón 'X'

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R7: Cancelar la publicación de oferta con el botón X (cerrar modal)', async ({ page }) => {
    // 1. Navigate to the tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Click to open the new offer modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Enter the title "Prueba de Cierre con X"
    await page.getByRole('textbox', { name: 'Ej. Cálculo Vectorial, Física' }).fill('Prueba de Cierre con X');

    // 4. Click the X button to close the modal
    await page.getByRole('button', { name: 'Cerrar modal' }).click();

    // Verify the modal is closed
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).not.toBeVisible();
    
    // Verify we are back at the dashboard with the tutor's profile
    await expect(page.getByRole('button', { name: '+ Nueva Oferta' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mis Ofertas de Tutorías' })).toBeVisible();
  });
});
