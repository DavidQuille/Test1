// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R7
// title: Colapsar una Fila de Solicitud Pendiente Desplegada

import { test, expect } from '@playwright/test';

import { ensurePendingData, openPendingTab, pendingSummaryRows } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R7: Colapsar una Fila de Solicitud Pendiente Desplegada', async ({ page }) => {
    await ensurePendingData(page);

    // 1. Iniciar sesión como Tutor.
    // 2. Navegar a la pantalla "T. Bandeja de Entrada".
    // 3. Asegurarse de que la pestaña 'Pendientes (X)' esté activa.
    await openPendingTab(page);

    const firstPendingRow = pendingSummaryRows(page).first();
    const expandedDetail = page.locator('tbody tr').filter({ hasText: 'MENSAJE DEL ESTUDIANTE' }).first();

    // 4. Desplegar una fila de solicitud pendiente.
    await firstPendingRow.click();
    await expect(expandedDetail).toBeVisible();

    // 5. Hacer clic en el ícono de flecha hacia arriba de la fila expandida.
    await firstPendingRow.click();

    await expect(page.getByText('MENSAJE DEL ESTUDIANTE')).toHaveCount(0);
  });
});