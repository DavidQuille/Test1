// spec: specs/Sprint2/CasosHU26.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Filtrar ofertas por modalidad', () => {
  test('CP-HU-26-ADD1: Limpiar filtro de modalidad utilizando la X', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await page.goto(ENCUENTRA_TUTORIA_URL);

    // 3. Hacer clic en un botón filtro de modalidad (ej: 'Presencial') en la sección 'Modalidad'.
    await page.getByTestId('filter-modalidad-presencial').click();

    // 4. Verificar que aparece la "X" junto al filtro aplicado.
    const clearButton = page.getByTestId('clear-modalidad-tag');
    await expect(clearButton).toBeVisible();

    // 5. Hacer clic en la "X" para limpiar el filtro.
    await clearButton.click();

    // Verificar que el filtro se limpia correctamente
    // El filtro tag debe haber desaparecido
    await expect(clearButton).not.toBeVisible();

    // Verificar que se muestran todas las ofertas nuevamente
    const resultadosText = page.locator(':text("resultados")').first();
    await expect(resultadosText).toBeVisible();

    // Verificar que se muestran ofertas
    const offerHeadings = page.getByRole('heading', { level: 3 });
    await expect(offerHeadings.first()).toBeVisible();
  });
});
