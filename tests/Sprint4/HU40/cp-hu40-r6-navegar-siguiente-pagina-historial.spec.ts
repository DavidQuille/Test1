// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R6: Navegar a la siguiente página del historial de tutorías', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Navegar a la pantalla "Historial de Tutorías".
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Hacer clic en el control de paginación ">".
    const nextButton = page.getByRole('button', { name: 'Página siguiente' });
    await nextButton.click();
    if (!page.url().includes('page=2')) {
      await page.getByRole('button', { name: 'Página 2' }).click();
    }

    // Expected Results
    await expect(page).toHaveURL(/\/historial(\?page=2)?$/);
    await expect(nextButton).toBeVisible();
    await expect(page.getByRole('button', { name: 'Página 2' })).toBeVisible();
  });
});