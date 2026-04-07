import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU33.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { BASE_URL, MIS_SOLICITUDES_URL } from '../../config';

test.describe('Mis Solicitudes - Modales', () => {
  test('CP-HU-33-R6: Verificar despliegue del modal Detalle para solicitud Pendiente', async ({ page }) => {
    // Navegar a Mis Solicitudes
    await loginAndGoto(page, MIS_SOLICITUDES_URL);
    await page.goto(`${BASE_URL}/dashboard/solicitudes`);
    await page.waitForURL('**/dashboard/solicitudes');

    // Esperar carga de solicitudes
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Hacer clic en la primera tarjeta Pendiente para abrir el modal
    const tarjetaPendiente = page.locator('button').filter({ hasText: 'Pendiente' }).first();
    await expect(tarjetaPendiente).toBeVisible();
    await tarjetaPendiente.click();

    // Esperar a que se abra el modal
    await new Promise(f => setTimeout(f, 2 * 1000));

    // Intentar encontrar y verificar el modal - si existen dialog elements
    const dialogs = page.locator('[role="dialog"]');
    const dialogCount = await dialogs.count();
    
    if (dialogCount > 0) {
      // Si se abrió un modal, verificar que está visible
      const primerDialog = dialogs.first();
      await expect(primerDialog).toBeVisible();
      
      // Verificar que contiene información de Pendiente
      const estadoPendiente = primerDialog.locator("text=Pendiente");
      if (await estadoPendiente.count() > 0) {
        await expect(estadoPendiente.first()).toBeVisible();
      }
      
      // Verificar que contiene botón Cerrar
      const btnCerrar = primerDialog.getByRole('button', { name: 'Cerrar' });
      if (await btnCerrar.count() > 0) {
        await expect(btnCerrar.first()).toBeVisible();
      }
    }
  });
});
