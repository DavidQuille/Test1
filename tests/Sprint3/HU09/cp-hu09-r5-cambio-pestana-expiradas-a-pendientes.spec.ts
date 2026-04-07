// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R5
// title: Cambio de Pestaña: De Expiradas a Pendientes

import { test, expect } from '@playwright/test';

import { ensurePendingData, pendingSummaryRows, expiredSummaryRows, gotoInbox } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R5: Cambio de Pestaña de Expiradas a Pendientes', async ({ page }) => {
    const hasPendingData = await ensurePendingData(page);
    test.skip(!hasPendingData, 'No se pudieron generar solicitudes pendientes en el entorno actual.');

    // 1. Iniciar sesión como Tutor.
    // 2. Navegar a la pantalla "T. Bandeja de Entrada".
    await gotoInbox(page);

    // 3. Hacer clic en la pestaña 'Expiradas (Y)' para activarla.
    await page.locator('button, [role="tab"]').filter({ hasText: /Expiradas\s*\(\d+\)/i }).first().click();

    test.skip((await expiredSummaryRows(page).count()) === 0, 'No hay solicitudes expiradas en el entorno para validar el cambio desde Expiradas.');

    // 4. Hacer clic en la pestaña 'Pendientes (X)'.
    await page.locator('button, [role="tab"]').filter({ hasText: /Pendientes\s*\(\d+\)/i }).first().click();

    const pendingTab = page.locator('button, [role="tab"]').filter({ hasText: /Pendientes\s*\(\d+\)/i }).first();
    const expiredTab = page.locator('button, [role="tab"]').filter({ hasText: /Expiradas\s*\(\d+\)/i }).first();

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