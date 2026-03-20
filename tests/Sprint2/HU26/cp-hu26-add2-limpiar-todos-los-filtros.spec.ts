import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU26.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Filtrar ofertas por modalidad', () => {
  test('CP-HU-26-ADD2: Limpiar todos los filtros utilizando el botón Limpiar todos', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);

    // 3. Hacer clic en un botón filtro de modalidad (ej: 'Virtual') en la sección 'Modalidad'.
    await page.getByTestId('filter-modalidad-virtual').click();

    // 4. Verificar que aparece el botón 'Limpiar todos'.
    const clearAllButton = page.getByTestId('clear-all-filters');
    await expect(clearAllButton).toBeVisible();

    // 5. Hacer clic en el botón 'Limpiar todos'.
    await clearAllButton.click();

    // Verificar que todos los filtros se limpian correctamente
    // El botón de limpiar todos debe haber desaparecido
    await expect(clearAllButton).not.toBeVisible();

    // Verificar que se muestran todas las ofertas nuevamente
    const resultadosText = page.locator(':text("resultados")').first();
    await expect(resultadosText).toBeVisible();

    // Verificar que se muestran ofertas
    const offerHeadings = page.getByRole('heading', { level: 3 });
    await expect(offerHeadings.first()).toBeVisible();
  });
});
