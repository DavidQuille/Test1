// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getEditableCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R3 Reportar Inasistencia desde Modal de Detalle', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page, 3);

    // 3. Identificar tarjeta sin confirmar y abrir modal Detalle de la Tutoría.
    const tarjetaSinConfirmar = await getEditableCard(page, 0);
    await tarjetaSinConfirmar.click();
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();

    // 4. Hacer clic en botón rojo Inasistencia dentro del modal de detalle.
    await page.getByRole('dialog').getByRole('button', { name: 'Inasistencia' }).click();

    // Verificación: Se superpone modal Confirmar Inasistencia sobre modal detalle.
    await expect(page.getByRole('heading', { name: 'Confirmar Inasistencia' })).toBeVisible();

    // Verificación: Se visualiza título y texto de confirmación.
    await expect(page.getByText('Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer.')).toBeVisible();

    // Verificación: Se visualizan botones Cancelar y Sí, reportar inasistencia.
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sí, reportar inasistencia' })).toBeVisible();

    // 5. Hacer clic en botón Sí, reportar inasistencia.
    await page.getByRole('button', { name: 'Sí, reportar inasistencia' }).click();
  });
});