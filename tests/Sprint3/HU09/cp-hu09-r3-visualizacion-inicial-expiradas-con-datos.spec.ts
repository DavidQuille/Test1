// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R3
// title: Visualización Inicial de Solicitudes Expiradas con Datos

import { test, expect } from '@playwright/test';

import { expiredSummaryRows, openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test.fixme('CP-HU-09-R3: Visualización Inicial de Solicitudes Expiradas con Datos', async ({ page }) => {
    // Este caso requiere al menos una solicitud expirada visible en el entorno.
    await openExpiredTab(page);

    const expiredTab = page.getByRole('button', { name: /Expiradas\(\d+\)/ });
    const pendingTab = page.getByRole('button', { name: /Pendientes\(\d+\)/ });
    const respondedTab = page.getByRole('button', { name: /Respondidas\(\d+\)/ });

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