// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getEditableCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R1 Reportar Inasistencia desde Tarjeta de Historial', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page);

    // 3. Identificar una tarjeta de tutoría con estado sin confirmar.
    const tarjetaSinConfirmar = await getEditableCard(page, 0);
    await expect(tarjetaSinConfirmar).toBeVisible();

    // 4. Hacer clic en el botón Inasistencia (borde rojo) en la tarjeta.
    await tarjetaSinConfirmar.getByRole('button', { name: 'Inasistencia' }).click();

    // Verificación: Se muestra modal con título Confirmar Inasistencia e ícono rojo.
    await expect(page.getByRole('heading', { name: 'Confirmar Inasistencia' })).toBeVisible();

    // Verificación: Se muestra texto de advertencia completo.
    await expect(page.getByText('Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer.')).toBeVisible();

    // Verificación: Se visualizan botones Cancelar y Sí, reportar inasistencia.
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sí, reportar inasistencia' })).toBeVisible();
  });
});