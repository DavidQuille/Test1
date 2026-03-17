// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R5
// title: Cambio de Pestaña: De Expiradas a Pendientes

import { test, expect } from '@playwright/test';

import { ensurePendingData, pendingSummaryRows, gotoInbox } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R5: Cambio de Pestaña de Expiradas a Pendientes', async ({ page }) => {
    await ensurePendingData(page);

    // 1. Iniciar sesión como Tutor.
    // 2. Navegar a la pantalla "T. Bandeja de Entrada".
    await gotoInbox(page);

    // 3. Hacer clic en la pestaña 'Expiradas (Y)' para activarla.
    await page.getByRole('button', { name: /Expiradas\(\d+\)/ }).click();

    // 4. Hacer clic en la pestaña 'Pendientes (X)'.
    await page.getByRole('button', { name: /Pendientes\(\d+\)/ }).click();

    const pendingTab = page.getByRole('button', { name: /Pendientes\(\d+\)/ });
    const expiredTab = page.getByRole('button', { name: /Expiradas\(\d+\)/ });

    await expect(pendingTab).toHaveClass(/bg-primary/);
    await expect(expiredTab).toHaveClass(/bg-white/);

    await expect(page.getByRole('columnheader', { name: 'ESTUDIANTE' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'MATERIA' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'FECHA/HORA' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'MENSAJE' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'ESTADO' })).toBeVisible();

    await expect(pendingSummaryRows(page).first()).toBeVisible();
    await expect(pendingSummaryRows(page).first().getByText('Pendiente')).toBeVisible();
  });
});