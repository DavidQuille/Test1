// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R3: Cerrar el modal de detalle de tutoría', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Navegar a la pantalla "Historial de Tutorías".
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Hacer clic en una tarjeta de tutoría para abrir el modal de detalle.
    await page.getByRole('button', { name: /Completada/ }).first().click();

    // 4. Hacer clic en el botón "Cerrar" dentro del modal.
    await page.getByRole('button', { name: 'Cerrar' }).click();

    // Expected Results
    await expect(page.getByRole('dialog', { name: 'Detalle de la Tutoría' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Historial de Tutorías' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Paginación' })).toBeVisible();
  });
});