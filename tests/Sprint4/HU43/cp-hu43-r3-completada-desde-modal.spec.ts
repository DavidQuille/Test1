import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías Impartidas', () => {
  test('CP-HU-43-R3: Registrar tutoría como Completada desde el modal', async ({ page }) => {
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

    // Wait for the tutorings list to be visible
    const tutoriasRegion = page.getByRole('region', { name: /Listado de tutorias/ });
    await tutoriasRegion.waitFor({ state: 'visible', timeout: 10000 });

    // Navigate to page 3 to find unconfirmed tutorings
    const page3Btn = page.getByRole('button', { name: '3' });
    await page3Btn.click();
    await page.waitForTimeout(500); // Wait for page transition

    // Click on the card (not the action buttons inside) that contains Inasistencia
    const cardBtn = page.locator('div[role="button"][aria-label*="Ver detalle"]').filter({
      has: page.getByRole('button', { name: 'Inasistencia' })
    }).first();
    await cardBtn.click();
    await page.waitForTimeout(800);
    
    // Verify modal is open
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Click Completada button INSIDE the modal
    const completadaBtnInModal = modal.getByRole('button', { name: 'Completada' });
    await expect(completadaBtnInModal).toBeVisible();
    await completadaBtnInModal.click();

    // Wait for modal to close
    await page.waitForTimeout(800);
    await expect(modal).not.toBeVisible({ timeout: 5000 });

    // Verify we're still on history page
    await expect(page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' })).toBeVisible();
  });
});
