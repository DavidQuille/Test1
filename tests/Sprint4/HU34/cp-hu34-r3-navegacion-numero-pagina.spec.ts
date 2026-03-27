// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CP-HU-39-R3: Navegación por número de página en el Historial de Tutorías', () => {
  test('Navegación por número de página en el Historial de Tutorías', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await page.goto('https://politutorias-frontend.vercel.app/');
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Asegurarse de que el listado de tutorías muestra las primeras 5 tarjetas y los controles de paginación están visibles.
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');
    
    // Verificar que el botón de página 2 es visible
    const pageButton2 = page.getByRole('button', { name: '2' });
    await expect(pageButton2).toBeVisible();

    // 4. Hacer clic en el número de página '2' de los controles de paginación.
    await pageButton2.click();

    // Verificar que el sistema permanece en la pantalla 'Historial de Tutorías Impartidas'
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');

    // Verificar que el número '2' en los controles de paginación está resaltado (disabled)
    await expect(page.getByRole('button', { name: '2' })).toBeDisabled();

    // Verificar que el listado de tarjetas se ha actualizado mostrando contenido diferente
    await expect(page.getByText('Álgebra Lineal y Matrices').first()).toBeVisible();
  });
});
