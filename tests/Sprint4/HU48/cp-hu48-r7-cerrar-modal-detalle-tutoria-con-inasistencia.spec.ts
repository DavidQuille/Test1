// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getReadonlyInasistenciaCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R7 Cerrar Modal de Detalle de Tutoría con Inasistencia', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page);

    // 3. Abrir detalle de tarjeta en estado Inasistencia.
    const tarjetaInasistencia = await getReadonlyInasistenciaCard(page);
    await tarjetaInasistencia.click();
    await expect(page.getByRole('heading', { name: /Detalle de la Tutor/i })).toBeVisible();

    // 4. Hacer clic en botón Cerrar del modal.
    await page.getByRole('button', { name: 'Cerrar', exact: true }).click();

    // Verificación: El modal Detalle de la Tutoría desaparece.
    await expect(page.getByRole('heading', { name: /Detalle de la Tutor/i })).toHaveCount(0);

    // Verificación: Se vuelve a mostrar la vista principal del listado.
    await expect(page.getByRole('heading', { name: /Historial de Tutorias Impartidas/i })).toBeVisible();

    // Verificación: No hay ninguna alteración en el estado previo de las tarjetas.
    const listadoConInasistencia = await getReadonlyInasistenciaCard(page);
    await expect(listadoConInasistencia).toBeVisible();
    await expect(listadoConInasistencia.getByText('Inasistencia')).toBeVisible();
  });
});