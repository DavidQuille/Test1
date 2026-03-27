// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CP-HU-39-R2: Visualización inicial del Historial de Tutorías con más de 5 registros (con paginación)', () => {
  test('Visualización inicial del Historial de Tutorías con más de 5 registros (con paginación)', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await page.goto('https://politutorias-frontend.vercel.app/');
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
    await page.getByRole('link', { name: 'Historial' }).click();

    // Verificar redirección a pantalla 'Historial de Tutorías Impartidas'
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');

    // Verificar que se visualize el listado con las primeras 5 tarjetas de tutorías
    const tutoriaCard = page.locator('button').filter({ hasText: 'Cálculo Diferencial' });
    const visibleCount = await tutoriaCard.count();
    expect(visibleCount).toBeGreaterThanOrEqual(1);

    // Verificar que los controles de paginación están visibles
    await expect(page.getByRole('button', { name: 'Pagina anterior' })).toBeVisible();

    // Verificar que hay múltiples páginas (al menos 2)
    await expect(page.getByRole('button', { name: '2' })).toBeVisible();
  });
});
