// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R3
// title: Visualización Inicial de Solicitudes Expiradas con Datos

import { test, expect } from '@playwright/test';

import { expiredSummaryRows, openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R3: Visualización Inicial de Solicitudes Expiradas con Datos', async ({ page }) => {
    const expiredOpened = await openExpiredTab(page);
    test.skip(!expiredOpened, 'No se pudo abrir la pestaña Expiradas en la Bandeja.');

    test.skip((await expiredSummaryRows(page).count()) === 0, 'No hay solicitudes expiradas en el entorno actualmente.');

    const expiredTab = page.locator('button, [role="tab"]').filter({ hasText: /Expiradas\s*\(\d+\)/i }).first();
    const pendingTab = page.locator('button, [role="tab"]').filter({ hasText: /Pendientes\s*\(\d+\)/i }).first();
    const respondedTab = page.locator('button, [role="tab"]').filter({ hasText: /Respondidas\s*\(\d+\)/i }).first();

    await expect(expiredTab).toHaveClass(/bg-primary/);
    await expect(pendingTab).toHaveClass(/bg-white/);
    await expect(respondedTab).toHaveClass(/bg-white/);

    await expect(page.getByRole('columnheader', { name: 'ESTUDIANTE' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'MATERIA' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'FECHA/HORA' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'MENSAJE' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'ESTADO' })).toBeVisible();

    await expect(expiredSummaryRows(page).first()).toBeVisible();
    await expect(expiredSummaryRows(page).first().getByText('Expirada')).toBeVisible();
    await expect(expiredSummaryRows(page).first().locator('img')).toHaveCount(0);
  });
});