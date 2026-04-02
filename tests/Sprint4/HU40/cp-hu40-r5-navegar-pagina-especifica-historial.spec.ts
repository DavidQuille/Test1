// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R5: Navegar a una página específica del historial de tutorías', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Navegar a la pantalla "Historial de Tutorías".
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Hacer clic en el número de página "2".
    const pageTwo = page.getByRole('button', { name: 'Página 2' });
    await pageTwo.click();

    // Expected Results
    await expect(page).toHaveURL(/\/historial\?page=2$/);
    await expect(pageTwo).toBeVisible();
    await expect(page.getByRole('button', { name: 'Página anterior' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Página siguiente' })).toBeDisabled();
  });
});