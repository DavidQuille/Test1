// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getEditableCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R4 Cancelar la Confirmación de Inasistencia', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page);

    // 3. Abrir modal Detalle de tutoría sin confirmar y luego abrir modal Confirmar Inasistencia.
    const tarjetaSinConfirmar = await getEditableCard(page, 0);
    await tarjetaSinConfirmar.click();
    await page.getByRole('dialog').getByRole('button', { name: 'Inasistencia' }).click();

    // 4. Hacer clic en botón Cancelar del modal Confirmar Inasistencia.
    await page.getByRole('button', { name: 'Cancelar' }).click();

    // Verificación: El modal Confirmar Inasistencia desaparece.
    await expect(page.getByRole('heading', { name: 'Confirmar Inasistencia' })).toHaveCount(0);

    // Verificación: Se regresa al modal Detalle de la Tutoría.
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();
  });
});