// spec: specs/Sprint3/CasosHU09.md
// case: CP-HU-09-R4
// title: Visualización Inicial de Solicitudes Expiradas sin Datos

import { test, expect } from '@playwright/test';

import { openExpiredTab } from './helpers';

test.describe('Bandeja de Entrada - Casos HU09', () => {
  test('CP-HU-09-R4: Visualización Inicial de Solicitudes Expiradas sin Datos', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    // 2. Navegar a la pantalla "T. Bandeja de Entrada".
    // 3. Hacer clic en la pestaña 'Expiradas (0)'.
    await openExpiredTab(page);

    await expect(page.getByRole('heading', { name: 'Bandeja de Entrada' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Expiradas(0)' })).toHaveClass(/bg-primary/);
    await expect(page.locator('th')).toHaveCount(0);
    await expect(page.getByText('No hay solicitudes expiradas.')).toBeVisible();
  });
});