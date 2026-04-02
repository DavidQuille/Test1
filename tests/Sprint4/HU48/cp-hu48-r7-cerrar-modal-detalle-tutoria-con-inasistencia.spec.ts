// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R7 Cerrar Modal de Detalle de Tutoría con Inasistencia', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page, 2);

    // 3. Identificar una tarjeta en estado Inasistencia y hacer clic para abrir el modal.
    // Find the card with Álgebra (readonly inasistencia card on page 2)
    const tarjetaInasistencia = page.getByRole('button', { name: /Álgebra/ });
    await tarjetaInasistencia.click();
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();

    // Esperar a que el diálogo esté plenamente cargado
    const detalleModal = page.getByRole('dialog');
    await detalleModal.waitFor({ state: 'visible' });

    // 4. Hacer clic en el botón Cerrar dentro del modal.
    await page.getByRole('button', { name: 'Cerrar', exact: true }).click();

    // Verificación: La ventana modal desaparece.
    await expect(page.getByRole('dialog')).toHaveCount(0);

    // Verificación: Se vuelve a mostrar la vista principal del listado.
    await expect(page.getByRole('heading', { name: /Historial de Tutorias Impartidas/i })).toBeVisible();

  });
});