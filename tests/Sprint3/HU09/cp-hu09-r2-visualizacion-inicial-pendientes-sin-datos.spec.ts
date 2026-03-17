// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R2
// title: Visualización Inicial de Solicitudes Pendientes sin Datos

import { test, expect } from '@playwright/test';

import { openPendingTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test.fixme('CP-HU-09-R2: Visualización Inicial de Solicitudes Pendientes sin Datos', async ({ page }) => {
    // Este caso requiere un tutor sin solicitudes pendientes.
    // El entorno compartido ya contiene pendientes, por lo que la precondición no es reproducible hoy.
    await openPendingTab(page);

    await expect(page.getByText('0 pendientes')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pendientes(0)' })).toHaveClass(/bg-primary/);
    await expect(page.getByRole('columnheader', { name: 'ESTUDIANTE' })).toHaveCount(0);
    await expect(page.getByText('No hay solicitudes pendientes.')).toBeVisible();
  });
});