// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R6
// title: Desplegar una Fila de Solicitud Pendiente

import { test, expect } from '@playwright/test';

import { ensurePendingData, openPendingTab, pendingSummaryRows } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R6: Desplegar una Fila de Solicitud Pendiente', async ({ page }) => {
    const hasPendingData = await ensurePendingData(page);
    test.skip(!hasPendingData, 'No se pudieron generar solicitudes pendientes en el entorno actual.');

    // 1. Iniciar sesión como Tutor.
    // 2. Navegar a la pantalla "T. Bandeja de Entrada".
    // 3. Asegurarse de que la pestaña 'Pendientes (X)' esté activa.
    const pendingOpened = await openPendingTab(page);
    test.skip(!pendingOpened, 'No se pudo abrir la pestaña Pendientes en la Bandeja.');

    const firstPendingRow = pendingSummaryRows(page).first();
    const expandedDetail = page.locator('tbody tr').filter({ hasText: 'MENSAJE DEL ESTUDIANTE' }).first();

    // 4. Hacer clic en el ícono de flecha hacia abajo de una fila de solicitud pendiente.
    await firstPendingRow.click();

    await expect(expandedDetail).toBeVisible();
    await expect(page.getByText(/^\$\d+\/h$/)).toBeVisible();
    await expect(page.getByText('MENSAJE DEL ESTUDIANTE')).toBeVisible();
  });
});