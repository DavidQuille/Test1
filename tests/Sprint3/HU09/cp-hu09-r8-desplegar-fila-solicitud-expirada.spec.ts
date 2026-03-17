// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R8
// title: Desplegar una Fila de Solicitud Expirada

import { test, expect } from '@playwright/test';

import { expiredSummaryRows, openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test.fixme('CP-HU-09-R8: Desplegar una Fila de Solicitud Expirada', async ({ page }) => {
    // Este caso requiere al menos una solicitud expirada visible en el entorno.
    await openExpiredTab(page);

    const firstExpiredRow = expiredSummaryRows(page).first();
    await firstExpiredRow.click();

    await expect(page.getByText(/PRESENCIAL|VIRTUAL/).first()).toBeVisible();
    await expect(page.getByText(/^\$\d+\/h$/)).toBeVisible();
    await expect(page.getByText('MENSAJE DEL ESTUDIANTE')).toBeVisible();
  });
});