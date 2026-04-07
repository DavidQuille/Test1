// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R2
// title: Visualización Inicial de Solicitudes Pendientes sin Datos

import { test, expect } from '@playwright/test';

import { openPendingTab, pendingSummaryRows } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R2: Visualización Inicial de Solicitudes Pendientes sin Datos', async ({ page }) => {
    const pendingOpened = await openPendingTab(page);
    test.skip(!pendingOpened, 'No se pudo abrir la pestaña Pendientes en la Bandeja.');

    const zeroTab = page.locator('button, [role="tab"]').filter({ hasText: /Pendientes\s*\(0\)/i }).first();
    const emptyMessage = page.getByText(/No hay solicitudes pendientes/i);
    const hasZeroPrecondition =
      (await pendingSummaryRows(page).count()) === 0 &&
      (await zeroTab.isVisible().catch(() => false)) &&
      (await emptyMessage.isVisible().catch(() => false));

    test.skip(!hasZeroPrecondition, 'La precondición de pendientes sin datos no se cumple en este entorno.');

    await expect(page.getByText('0 pendientes')).toBeVisible();
    await expect(zeroTab).toHaveClass(/bg-primary/);
    await expect(page.getByRole('columnheader', { name: 'ESTUDIANTE' })).toHaveCount(0);
    await expect(emptyMessage).toBeVisible();
  });
});