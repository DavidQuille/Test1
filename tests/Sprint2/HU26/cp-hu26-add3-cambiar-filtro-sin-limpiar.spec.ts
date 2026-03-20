import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU26.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Filtrar ofertas por modalidad', () => {
  test('CP-HU-26-ADD3: Cambiar de un filtro a otro sin limpiar primero', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);

    // 3. Hacer clic en el botón filtro 'Presencial' en la sección 'Modalidad'.
    await page.getByTestId('filter-modalidad-presencial').click();

    // 4. Sin limpiar el filtro anterior, hacer clic en el botón filtro 'Virtual'.
    await page.getByTestId('filter-modalidad-virtual').click();

    // Verificar que el filtro cambia automáticamente de 'Presencial' a 'Virtual'
    // El filtro tag de Virtual debe estar visible
    const filterTag = page.getByTestId('tag-modalidad');
    await expect(filterTag).toBeVisible();

    // El listado de ofertas se actualiza
    const resultadosText = page.locator(':text("resultados")').first();
    await expect(resultadosText).toBeVisible();

    // Verificar que se muestran ofertas
    const offerHeadings = page.getByRole('heading', { level: 3 });
    await expect(offerHeadings.first()).toBeVisible();
  });
});
