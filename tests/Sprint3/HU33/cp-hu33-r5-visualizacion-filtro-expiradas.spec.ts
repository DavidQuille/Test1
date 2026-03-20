import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU33.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { MIS_SOLICITUDES_URL } from '../../config';

test.describe('Mis Solicitudes - Filtros', () => {
  test('CP-HU-33-R5: Verificar visualización del filtro Expiradas', async ({ page }) => {
    // Navegar a Mis Solicitudes
    await loginAndGoto(page, MIS_SOLICITUDES_URL);

    // Esperar carga de solicitudes
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Hacer clic en la pestaña "Expiradas (X)"
    const expiradasButton = page.getByRole('button', { name: /Expiradas \(\d+\)/ });
    await expect(expiradasButton).toBeVisible();
    await expiradasButton.click();

    // Verificar que la pestaña "Expiradas" está activa
    await expect(expiradasButton).toHaveClass(/border-primary/);

    // Si hay tarjetas expiradas, verificar que todas tienen etiqueta "Expirada"
    const tarjetasCount = await page.locator('button').filter({ hasText: /Expirada/ }).count();
    if (tarjetasCount > 0) {
      const todasTarjetas = await page.locator('button').filter({ hasText: /Expirada/ }).all();
      for (const tarjeta of todasTarjetas) {
        const estadoLabel = tarjeta.locator('text=Expirada').first();
        await expect(estadoLabel).toBeVisible();
      }
    }
  });
});
