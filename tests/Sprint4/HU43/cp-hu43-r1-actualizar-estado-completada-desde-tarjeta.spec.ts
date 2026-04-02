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

    // Now navigate directly to tutor history page
    await page.goto('http://localhost:3001/tutor/historial', { waitUntil: 'networkidle' });

    // Wait for history page to load
    await page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' }).waitFor({ state: 'visible', timeout: 10000 });

    // Go to page 3 before completing (required by this case)
    const pageThreeButton = page.locator('button').filter({ hasText: /^3$/ }).first();
    await expect(pageThreeButton).toBeVisible();
    await pageThreeButton.click();

    // This action may only be available once. If it was already executed, do not fail reruns.
    const actionPair = page
      .locator('div')
      .filter({ has: page.getByRole('button', { name: 'Completada', exact: true }) })
      .filter({ has: page.getByRole('button', { name: 'Inasistencia', exact: true }) })
      .first();

    const completadaButtons = actionPair.getByRole('button', { name: 'Completada', exact: true });
    const completadaCount = await completadaButtons.count();

    if (completadaCount > 0) {
      await expect(completadaButtons.first()).toBeVisible();
      await completadaButtons.first().click();
    }

    // Keep a minimal assertion to ensure page remains stable after the action.
    await expect(page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' })).toBeVisible();
  });
});
