// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R1
// title: Visualización Inicial de Solicitudes Pendientes con Datos

import { test, expect } from '@playwright/test';

import { ensurePendingData, openPendingTab, pendingSummaryRows } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R1: Visualización Inicial de Solicitudes Pendientes con Datos', async ({ page }) => {
    await ensurePendingData(page);

    // 1. Iniciar sesión como Tutor.
    // 2. Hacer clic en la opción "Bandeja" en la barra de navegación superior.
    await openPendingTab(page);

    await expect(page.getByRole('heading', { name: 'Bandeja de Entrada' })).toBeVisible();
    await expect(page.getByText('Solicitudes de tutoria recibidas')).toBeVisible();

    await expect(page.getByRole('link', { name: 'Panel' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bandeja' })).toBeVisible();

    await expect(page.getByText(/^\d+ pendientes$/)).toBeVisible();

    const pendingTab = page.getByRole('button', { name: /Pendientes\(\d+\)/ });
    const expiredTab = page.getByRole('button', { name: /Expiradas\(\d+\)/ });

    await expect(pendingTab).toHaveClass(/bg-primary/);
    await expect(expiredTab).toHaveClass(/bg-white/);

    await expect(page.getByRole('columnheader', { name: 'ESTUDIANTE' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'MATERIA' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'FECHA/HORA' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'MENSAJE' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'ESTADO' })).toBeVisible();

    const rows = pendingSummaryRows(page);
    expect(await rows.count()).toBeLessThanOrEqual(10);
    await expect(rows.first()).toBeVisible();
    await expect(rows.first().locator('td').nth(0)).not.toBeEmpty();
    await expect(rows.first().locator('td').nth(1)).not.toBeEmpty();
    await expect(rows.first().locator('td').nth(2)).not.toBeEmpty();
    await expect(rows.first().locator('td').nth(3)).not.toBeEmpty();
    await expect(rows.first().getByText('Pendiente')).toBeVisible();
  });
});