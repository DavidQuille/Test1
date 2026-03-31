// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { getEditableCard, loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R2 Visualizar Detalle de Tutoría sin Confirmar', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page);

    // 3. Identificar una tarjeta de tutoría con estado sin confirmar.
    const tarjetaSinConfirmar = await getEditableCard(page, 0);
    await expect(tarjetaSinConfirmar).toBeVisible();

    // 4. Hacer clic en el área general de la tarjeta sin confirmar.
    await tarjetaSinConfirmar.click();

    // Verificación: Se despliega modal Detalle de la Tutoría.
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();

    // Verificación: Se visualiza información completa de la sesión.
    const detalleModal = page.getByRole('dialog');
    await expect(detalleModal).toContainText('Estudiante');
    await expect(detalleModal).toContainText(/Cálculo|Programación|Álgebra/);
    
    // Verificación: Se visualiza el botón Cerrar
    await expect(detalleModal.getByRole('button', { name: 'Cerrar', exact: true })).toBeVisible();
  });
});