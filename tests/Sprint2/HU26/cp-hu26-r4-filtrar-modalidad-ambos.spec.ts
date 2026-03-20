import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU26.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Filtrar ofertas por modalidad', () => {
  test('CP-HU-26-R4: Filtrar ofertas por modalidad Ambos', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);

    // 3. Hacer clic en el botón filtro 'Ambos' en la sección 'Modalidad'.
    await page.getByTestId('filter-modalidad-ambos').click();

    // Verificar que hay un filtro tag de Ambos aplicado
    const filterTag = page.getByTestId('tag-modalidad');
    await expect(filterTag).toBeVisible();

    // Verificar que se muestran resultados bajo el filtro aplicado
    const resultadosText = page.locator(':text("resultados")').first();
    await expect(resultadosText).toBeVisible();

    // Verificar que se muestran ofertas
    const offerHeadings = page.getByRole('heading', { level: 3 });
    await expect(offerHeadings.first()).toBeVisible();
  });
});
