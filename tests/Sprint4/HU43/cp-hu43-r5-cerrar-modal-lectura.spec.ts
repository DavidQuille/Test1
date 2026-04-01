// spec: specs/Sprint4/CasosHU43.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías Impartidas', () => {
  test('CP-HU-43-R5: Cerrar modal de lectura para tutoría Completada', async ({ page }) => {
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

    // Click on a completed tutoring card (page 1 has all completed)
    const allCards = page.locator('div[role="button"][aria-label*="Ver detalle"]');
    const completedCard = allCards.first(); // Page 1 has all completed tutorings
    await completedCard.click();
    await page.waitForTimeout(800);

    // Verify modal is opened
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Click Cerrar button to close modal
    const cerrarBtn = modal.getByRole('button', { name: 'Cerrar', exact: true });
    await expect(cerrarBtn).toBeVisible();
    await cerrarBtn.click();

    // Wait for modal to close
    await page.waitForTimeout(500);
    
    // Verify modal closes and we're back on history page
    await expect(modal).not.toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' })).toBeVisible();
  });
});
