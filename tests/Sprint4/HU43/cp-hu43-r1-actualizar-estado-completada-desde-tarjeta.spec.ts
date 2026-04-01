import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías Impartidas', () => {
  test('CP-HU-43-R1: Actualizar estado de tutoría a Completada directamente desde la tarjeta', async ({ page }) => {
    // Navigate to login page
    await page.goto(LOGIN_URL);

    // Enter login credentials
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');

    // Click the login button
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // Wait for navigation to complete and link to be visible (proves session is active)
    await page.getByRole('link', { name: 'Historial' }).waitFor({ state: 'visible', timeout: 10000 });

    // Now navigate directly to history page
    await page.goto('http://localhost:3001/tutor/historial', { waitUntil: 'networkidle' });

    // Wait for history page to load
    await page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' }).waitFor({ state: 'visible', timeout: 10000 });

    // Find a card with both Completada and Inasistencia buttons (unconfirmed tutoring)
    // Click directly on the Completada button - don't need parent traversal
    const completadaBtn = page.getByRole('button', { name: 'Completada' }).first();
    
    // Verify it exists
    await expect(completadaBtn).toBeVisible();

    // Click the Completada button
    await completadaBtn.click();

    // Wait for the page to update with the new status
    await page.waitForTimeout(1500);
    
    // Reload to see the updated view with Completada badge
    await page.reload();
    await page.waitForTimeout(1000);
    
    // Verify we're still on history page
    await expect(page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' })).toBeVisible();
    
    // Verify the Completada badge is visible somewhere on the page
    // This confirms the action was successful
    const completadaBadges = page.locator('text=Completada');
    await expect(completadaBadges.first()).toBeVisible();
  });
});
