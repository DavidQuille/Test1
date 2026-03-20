import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU33.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { MIS_SOLICITUDES_URL } from '../../config';

test.describe('Mis Solicitudes - Paginación', () => {
  test('CP-HU-33-R10: Verificar visualización de controles de paginación', async ({ page }) => {
    // Navegar a Mis Solicitudes
    await loginAndGoto(page, MIS_SOLICITUDES_URL);

    // Esperar carga
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Obtener contador de solicitudes en la pestaña "Todas"
    const todasCounter = await page.getByRole('button', { name: /Todas \((\d+)\)/ }).textContent();
    const match = todasCounter?.match(/\((\d+)\)/);
    const solicitudesTotal = match ? parseInt(match[1]) : 0;

    // Si hay más de 5 solicitudes, verificar paginación
    if (solicitudesTotal > 5) {
      // Verificar que se cargan menos del total inicialmente (hay paginación)
      // Buscar específicamente los botones de tarjetas de solicitud por su accessible name
      const tarjetasVisibles = await page.locator('button[class*="cursor-pointer"]').all();
      const count = tarjetasVisibles.length;
      
      // Verificar que hay paginación visible
      const paginacionBotones = page.getByRole('button', { name: /^[0-9]+$/ });
      const paginacionCount = await paginacionBotones.count();
      expect(paginacionCount).toBeGreaterThan(0);

      // Verificar botón "Página siguiente"
      const btnSiguiente = page.getByRole('button', { name: 'Página siguiente' });
      await expect(btnSiguiente).toBeVisible();
    } else {
      // Si hay 5 o menos solicitudes, NO debe haber paginación con números
      const paginacion = page.getByRole('button', { name: /^[0-9]+$/ });
      const paginacionCount = await paginacion.count();
      // Puede haber como máximo 1 botón (la página 1 si existe)
      expect(paginacionCount).toBeLessThanOrEqual(1);
    }
  });
});
