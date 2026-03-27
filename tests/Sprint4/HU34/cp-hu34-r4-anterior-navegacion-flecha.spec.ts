// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CP-HU-39-R4-Anterior: Navegación por flecha Anterior (<) en el Historial de Tutorías', () => {
  test('Navegación por flecha Anterior (<)', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await page.goto('https://politutorias-frontend.vercel.app/');
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Asegurarse de que el listado de tutorías muestra las primeras 5 tarjetas y los controles de paginación están visibles.
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');

    // 4. Hacer clic en el número de página '2' para navegar a la segunda página.
    await page.getByRole('button', { name: '2' }).click();

    // 5. Hacer clic en la flecha de paginación '<' (Anterior).
    await page.getByRole('button', { name: 'Pagina anterior' }).click();

    // Verificar que el sistema permanece en la pantalla 'Historial de Tutorías Impartidas'
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');

    // Verificar que el número '1' en los controles de paginación está resaltado (disabled)
    await expect(page.getByRole('button', { name: '1' })).toBeDisabled();

    // Verificar que el botón anterior está deshabilitado (porque ya está en la primera página)
    await expect(page.getByRole('button', { name: 'Pagina anterior' })).toBeDisabled();

    // Verificar que el listado ha vuelto a mostrar las primeras tarjetas
    await expect(page.getByText('Cálculo Diferencial — Detalle Completo').first()).toBeVisible();
  });
});
