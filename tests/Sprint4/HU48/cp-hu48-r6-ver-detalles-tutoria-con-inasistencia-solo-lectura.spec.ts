// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getReadonlyInasistenciaCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R6 Ver Detalles de Tutoría con Inasistencia (Solo lectura)', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page);

    // 3. Identificar una tarjeta de tutoría en estado Inasistencia.
    const tarjetaInasistencia = await getReadonlyInasistenciaCard(page);
    await expect(tarjetaInasistencia).toBeVisible();

    // 4. Hacer clic en el área general de la tarjeta con Inasistencia.
    await tarjetaInasistencia.click();

    // Verificación: Se abre modal Detalle de la Tutoría.
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();

    // Verificación: La información de la sesión se presenta en modo lectura.
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByText('Estado:')).toBeVisible();
    await expect(dialog.getByText('Inasistencia')).toBeVisible();

    // Verificación: Los botones de acción Completada/Inasistencia no se visualizan.
    await expect(dialog.getByRole('button', { name: 'Completada' })).toHaveCount(0);
    await expect(dialog.getByRole('button', { name: 'Inasistencia' })).toHaveCount(0);

    // Verificación: El único control interactivo disponible es el botón Cerrar.
    await expect(dialog.getByRole('button', { name: 'Cerrar', exact: true })).toBeVisible();
  });
});