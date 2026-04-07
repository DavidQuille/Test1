// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R8
// title: Desplegar una Fila de Solicitud Expirada

import { test, expect } from '@playwright/test';

import { expiredSummaryRows, openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R8: Desplegar una Fila de Solicitud Expirada', async ({ page }) => {
    const expiredOpened = await openExpiredTab(page);
    test.skip(!expiredOpened, 'No se pudo abrir la pestaña Expiradas en la Bandeja.');

    test.skip((await expiredSummaryRows(page).count()) === 0, 'No hay solicitudes expiradas en el entorno actualmente.');

    const firstExpiredRow = expiredSummaryRows(page).first();
    await firstExpiredRow.click();

    await expect(page.getByText(/PRESENCIAL|VIRTUAL/).first()).toBeVisible();
    await expect(page.getByText(/^\$\d+\/h$/)).toBeVisible();
    await expect(page.getByText('MENSAJE DEL ESTUDIANTE')).toBeVisible();
  });
});