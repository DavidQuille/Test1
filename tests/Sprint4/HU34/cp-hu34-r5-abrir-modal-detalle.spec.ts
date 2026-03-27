// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CP-HU-39-R5-Abrir: Abrir modal de detalle al hacer clic en una tarjeta', () => {
  test('Abrir modal de detalle de tutoría impartida', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await page.goto('https://politutorias-frontend.vercel.app/');
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Asegurarse de que al menos una tarjeta de tutoría es visible en el listado.
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');
    
    // 4. Hacer clic sobre el área general de una tarjeta individual de tutoría.
    await page.getByRole('button', { name: 'Ver detalle de la tutoria Cálculo Diferencial — Detalle Completo' }).click();

    // Verificar que se despliega una ventana modal 'Detalle de la Tutoría'
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible();

    // Verificar que el modal muestra el título 'Detalle de la Tutoria'
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();

    // Esperar a que el modal cargue completamente (esperar a que aparezca el contenido)
    await page.locator('dialog').locator('text=Cálculo Diferencial').waitFor();

    // Verificar que en la parte inferior del modal hay el botón 'Cerrar'
    await expect(page.getByRole('button', { name: 'Cerrar', exact: true })).toBeVisible();
  });
});
