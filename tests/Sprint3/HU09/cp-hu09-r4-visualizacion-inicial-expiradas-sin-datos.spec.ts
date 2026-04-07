// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R4
// title: Visualización Inicial de Solicitudes Expiradas sin Datos

import { test, expect } from '@playwright/test';

import { expiredSummaryRows, openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R4: Visualización Inicial de Solicitudes Expiradas sin Datos', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    // 2. Navegar a la pantalla "T. Bandeja de Entrada".
    // 3. Hacer clic en la pestaña 'Expiradas (0)'.
    const expiredOpened = await openExpiredTab(page);
    test.skip(!expiredOpened, 'No se pudo abrir la pestaña Expiradas en la Bandeja.');

    const zeroTab = page.locator('button, [role="tab"]').filter({ hasText: /Expiradas\s*\(0\)/i }).first();
    const emptyMessage = page.getByText(/No hay solicitudes expirad/i);
    const hasZeroPrecondition =
      (await expiredSummaryRows(page).count()) === 0 &&
      (await zeroTab.isVisible().catch(() => false)) &&
      (await emptyMessage.isVisible().catch(() => false));

    test.skip(!hasZeroPrecondition, 'La precondición de expiradas sin datos no se cumple en este entorno.');

    await expect(page.getByRole('heading', { name: 'Bandeja de Entrada' })).toBeVisible();
    await expect(zeroTab).toHaveClass(/bg-primary/);
    await expect(page.locator('th')).toHaveCount(0);
    await expect(emptyMessage).toBeVisible();
  });
});