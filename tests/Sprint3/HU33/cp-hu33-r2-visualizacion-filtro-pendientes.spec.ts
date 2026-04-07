import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU33.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { BASE_URL, MIS_SOLICITUDES_URL } from '../../config';

test.describe('Mis Solicitudes - Filtros', () => {
  test('CP-HU-33-R2: Verificar visualización del filtro Pendientes', async ({ page }) => {
    // Navegar a Mis Solicitudes
    await loginAndGoto(page, MIS_SOLICITUDES_URL);
    await page.goto(`${BASE_URL}/dashboard/solicitudes`);
    await page.waitForURL('**/dashboard/solicitudes');

    // Esperar carga de solicitudes
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Hacer clic en la pestaña Pendientes para verificar el filtro
    const pendientesButton = page.getByRole('button', { name: /Pendientes \(\d+\)/ });
    await pendientesButton.click();

    // Esperar a que carguen los datos
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Verificar que la pestaña "Pendientes" está activa
    await expect(pendientesButton).toHaveClass(/border-primary/);

    // Verificar que se visualiza una lista de tarjetas filtradas
    const tarjetas = page.getByRole('button').filter({ has: page.locator('text=Pendiente') }).filter({ has: page.locator('img') });
    const tarjetasCount = await tarjetas.count();
    expect(tarjetasCount).toBeGreaterThan(0);

    // Verificar que TODAS las tarjetas visibles tienen etiqueta "Pendiente"
    const todasTarjetas = await page.locator('button').filter({ hasText: /Pendiente.*Física|Electrónica/ }).all();
    for (const tarjeta of todasTarjetas) {
      const estadoLabel = tarjeta.locator('text=Pendiente').first();
      await expect(estadoLabel).toBeVisible();
    }
  });
});
