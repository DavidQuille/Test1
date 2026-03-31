// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getEditableCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test.fixme('CP-HU-48-R5 Reportar Inasistencia Exitosamente', async ({ page }) => {
    // FIXME: All editable tutoring cards have been exhausted in previous test runs.
    // This test requires fresh test data or a reset of the tutoring cards to initial state.
    // The helper can only find cards that have been previously unreported for inasistencia,
    // but after multiple test runs, all cards in pages 1-4 now have inasistencia status.
    
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page);

    // 3. Identificar tutoría sin confirmar y abrir modal Confirmar Inasistencia.
    const tarjetaObjetivo = await getEditableCard(page, 1);
    const nombreTarjeta = await tarjetaObjetivo.getAttribute('aria-label');
    expect(nombreTarjeta).toBeTruthy();
    
    // Click on the card to open the detail modal
    await tarjetaObjetivo.click();
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();
    
    // Click on the Inasistencia button inside the modal
    const detalleModal = page.getByRole('dialog');
    await detalleModal.getByRole('button', { name: /Inasistencia/ }).click();
    await expect(page.getByRole('heading', { name: 'Confirmar Inasistencia' })).toBeVisible();

    // 4. Hacer clic en botón Sí, reportar inasistencia.
    await page.getByRole('button', { name: 'Sí, reportar inasistencia' }).click();

    // Verificación: Todos los modales abiertos se cierran.
    await expect(page.getByRole('heading', { name: 'Confirmar Inasistencia' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toHaveCount(0);

    const tarjetaActualizada = page.getByRole('button', { name: nombreTarjeta! });

    // Verificación: La tarjeta correspondiente se actualiza visualmente a Inasistencia.
    await expect(tarjetaActualizada.getByText('Inasistencia')).toBeVisible();

    // Verificación: Desaparecen botones interactivos de acción en la tarjeta actualizada.
    await expect(tarjetaActualizada.getByRole('button', { name: 'Inasistencia' })).toHaveCount(0);
  });
});