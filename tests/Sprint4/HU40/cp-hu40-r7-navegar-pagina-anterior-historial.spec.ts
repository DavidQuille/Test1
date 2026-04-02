// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ESTUDIANTE_HISTORIAL_URL, LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R7: Navegar a la página anterior del historial de tutorías', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Navegar a la pantalla "Historial de Tutorías" y ubicarse en página 2.
    await page.getByRole('link', { name: 'Historial' }).click();
    const pageTwo = page.getByRole('button', { name: 'Página 2' });
    await pageTwo.click();

    // 3. Hacer clic en el control de paginación "<".
    const prevButton = page.getByRole('button', { name: 'Página anterior' });
    await prevButton.click();

    // Expected Results
    await expect(page).toHaveURL(/\/historial(\?page=1)?$/);
    await expect(page.getByRole('button', { name: 'Página 1' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Página siguiente' })).toBeVisible();
  });
});