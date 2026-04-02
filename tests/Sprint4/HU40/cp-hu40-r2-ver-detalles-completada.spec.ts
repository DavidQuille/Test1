// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ESTUDIANTE_HISTORIAL_URL, LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R2: Ver detalles de una tutoría con estado "Completada"', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Navegar a la pantalla "Historial de Tutorías".
    await page.getByRole('link', { name: 'Historial' }).click();
    await expect(page).toHaveURL(ESTUDIANTE_HISTORIAL_URL);

    // 3. Hacer clic en el área general de una tarjeta de tutoría con estado "Completada".
    await page.getByRole('button', { name: /Completada/ }).first().click();

    // Expected Results
    const dialog = page.getByRole('dialog', { name: 'Detalle de la Tutoría' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Juan Carlos Pérez')).toBeVisible();
    await expect(dialog.getByText('Cálculo Diferencial e Integral')).toBeVisible();
    await expect(dialog.getByText('10 de marzo, 2026')).toBeVisible();
    await expect(dialog.getByText('16:00 - 17:00')).toBeVisible();
    await expect(dialog.getByText('Estado:')).toBeVisible();
    await expect(dialog.getByText('Completada', { exact: true })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Cerrar', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Calificar' })).toHaveCount(0);
    await expect(page.locator('text=★')).toHaveCount(0);
  });
});