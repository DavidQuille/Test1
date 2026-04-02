// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R4: Ver detalles de una tutoría con estado "Inasistencia"', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Navegar a la pantalla "Historial de Tutorías".
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Hacer clic en una tarjeta de tutoría con estado "Inasistencia".
    await page.getByRole('button', { name: /Inasistencia/ }).first().click();

    // Expected Results
    const dialog = page.getByRole('dialog', { name: 'Detalle de la Tutoría' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('María Fernanda González')).toBeVisible();
    await expect(dialog.getByText('Programación en Python - Desde Cero')).toBeVisible();
    await expect(dialog.getByText('10 de febrero, 2026')).toBeVisible();
    await expect(dialog.getByText('11:00 - 12:00')).toBeVisible();
    await expect(dialog.getByText('Estado:')).toBeVisible();
    await expect(dialog.getByText('Inasistencia', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cerrar', exact: true })).toBeVisible();
  });
});