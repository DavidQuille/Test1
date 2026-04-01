// spec: specs/Sprint4/CasosHU43.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías Impartidas', () => {
  test.skip('CP-HU-43-ADD-01: Modal lectura para tutoría Completada y calificada', async ({ page }) => {
    // SKIP: Waiting for student rating feature implementation
    // This test will be enabled once the student rating system is fully implemented
    
    // Navigate to login page
    await page.goto(LOGIN_URL);

    // Enter login credentials
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');

    // Click the login button
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // Navigate to the history page
    await page.getByRole('link', { name: 'Historial' }).click();

    // Find and click on a completed tutoring card that has been rated by the student
    // This will vary depending on the data available in the system
    const completedAndRatedCard = page.locator('button').filter({ hasText: 'Ver detalle de la tutoria' }).first();
    await completedAndRatedCard.click();

    // Verify the modal opens
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible();

    // Verify the modal contains tutoring information
    const modalTitle = modal.locator('heading:has-text("Detalle de la Tutoria")');
    await expect(modalTitle).toBeVisible();

    // Verify this is read-only mode: no action buttons visible
    const completadaActionButton = modal.getByRole('button', { name: 'Completada' });
    const inasistenciaActionButton = modal.getByRole('button', { name: 'Inasistencia' });
    
    await expect(completadaActionButton).not.toBeVisible();
    await expect(inasistenciaActionButton).not.toBeVisible();

    // Verify the student rating section is visible with stars and comment
    const ratingSection = modal.locator('text=CALIFICACIÓN').or(modal.locator('text=PUNTUACIÓN'));
    await expect(ratingSection).toBeVisible();

    // Verify only the Cerrar button is available
    const cerrarButton = modal.getByRole('button', { name: 'Cerrar' });
    await expect(cerrarButton).toBeVisible();
  });
});
