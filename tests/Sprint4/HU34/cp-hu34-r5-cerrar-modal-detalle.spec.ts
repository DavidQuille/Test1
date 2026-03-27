// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CP-HU-39-R5-Cerrar: Cerrar modal de detalle de tutoría impartida', () => {
  test('Cerrar modal de detalle de tutoría impartida', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await page.goto('https://politutorias-frontend.vercel.app/');
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
    await page.getByRole('link', { name: 'Historial' }).click();

    // 3. Hacer clic sobre el área general de una tarjeta individual de tutoría.
    await page.getByRole('button', { name: 'Ver detalle de la tutoria Cálculo Diferencial — Detalle Completo' }).click();

    // 4. Asegurarse de que el modal 'Detalle de la Tutoría' se ha desplegado correctamente.
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();

    // 5. Hacer clic en el botón 'Cerrar' dentro del modal.
    await page.getByRole('button', { name: 'Cerrar', exact: true }).click();

    // Verificar que la ventana modal 'Detalle de la Tutoría' desaparece
    await expect(modal).not.toBeVisible();

    // Verificar que el usuario regresa a la vista principal del listado
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/historial');
    await expect(page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' })).toBeVisible();

    // Verificar que el listado de tarjetas sigue siendo visible
    await expect(page.getByText('Cálculo Diferencial — Detalle Completo')).toBeVisible();
  });
});
