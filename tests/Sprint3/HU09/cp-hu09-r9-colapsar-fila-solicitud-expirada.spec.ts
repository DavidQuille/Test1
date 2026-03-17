// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R9
// title: Colapsar una Fila de Solicitud Expirada Desplegada

import { test, expect } from '@playwright/test';

import { expiredSummaryRows, openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test.fixme('CP-HU-09-R9: Colapsar una Fila de Solicitud Expirada Desplegada', async ({ page }) => {
    // Este caso requiere al menos una solicitud expirada visible en el entorno.
    await openExpiredTab(page);

    const firstExpiredRow = expiredSummaryRows(page).first();
    await firstExpiredRow.click();
    await expect(page.getByText('MENSAJE DEL ESTUDIANTE')).toBeVisible();

    await firstExpiredRow.locator('img').last().click();

    await expect(page.getByText('MENSAJE DEL ESTUDIANTE')).toHaveCount(0);
  });
});