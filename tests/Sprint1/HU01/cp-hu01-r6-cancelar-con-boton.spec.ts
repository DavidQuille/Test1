import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU01.md
// case: CP-HU-01-R6 - Cancelar con el botón 'Cancelar'

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R6: Cancelar creación de oferta con botón Cancelar', async ({ page }) => {
    // 1. Login and navigate to tutor dashboard
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);
    await page.waitForTimeout(1000);

    // 2. Click to open the new offer modal
    const newOfferBtn = page.getByRole('button', { name: '+ Nueva Oferta' }).first();
    await newOfferBtn.click();

    // Wait for modal
    await page.waitForTimeout(1500);

    // 3. Enter the title 
    await page.locator('input[name="title"]').first().fill('Prueba de Cancelación');
    await page.waitForTimeout(300);

    // 4. Click the Cancel button
    await page.getByRole('button', { name: 'Cancelar' }).first().click();
    await page.waitForTimeout(500);

    // Verify the modal is closed
    await expect(page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' })).not.toBeVisible({ timeout: 3000 });
    
    // Verify we are back at the dashboard
    await expect(page.getByRole('button', { name: '+ Nueva Oferta' })).toBeVisible({ timeout: 3000 });
  });
});
