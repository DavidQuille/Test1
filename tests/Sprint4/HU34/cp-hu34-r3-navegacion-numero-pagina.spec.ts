// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAndGoto } from '../../auth';
import { TUTOR_HISTORIAL_URL, BASE_URL } from '../../config';

test.describe('CP-HU-39-R3: Navegación por número de página en el Historial de Tutorías', () => {
  test('Navegación por número de página en el Historial de Tutorías', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await loginAndGoto(page, TUTOR_HISTORIAL_URL);
    await page.goto(`${BASE_URL}/tutor/historial`);
    await page.waitForURL('**/tutor/historial');
    
    // Verificar que el botón de página 2 es visible
    const pageButton2 = page.getByRole('button', { name: '2' });
    await expect(pageButton2).toBeVisible();

    // 4. Hacer clic en el número de página '2' de los controles de paginación.
    await pageButton2.click();

    // Verificar que el sistema permanece en la pantalla 'Historial de Tutorías Impartidas'
    const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3001';
    await expect(page).toHaveURL(`${baseUrl}/tutor/historial`);

    // Verificar que el número '2' en los controles de paginación está resaltado (disabled)
    await expect(page.getByRole('button', { name: '2' })).toBeDisabled();

    // Verificar que el listado de tarjetas se ha actualizado mostrando contenido diferente
    await expect(page.getByText('Álgebra Lineal y Matrices').first()).toBeVisible();
  });
});
