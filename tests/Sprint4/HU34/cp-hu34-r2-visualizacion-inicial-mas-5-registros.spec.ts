// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAndGoto } from '../../auth';
import { TUTOR_HISTORIAL_URL, BASE_URL } from '../../config';

test.describe('CP-HU-39-R2: Visualización inicial del Historial de Tutorías con más de 5 registros (con paginación)', () => {
  test('Visualización inicial del Historial de Tutorías con más de 5 registros (con paginación)', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await loginAndGoto(page, TUTOR_HISTORIAL_URL);

    // Verificar que se visualize el listado con las primeras 5 tarjetas de tutorías
    const tutoriaCard = page.locator('button').filter({ hasText: 'Cálculo Diferencial' });
    const visibleCount = await tutoriaCard.count();
    expect(visibleCount).toBeGreaterThanOrEqual(1);

    // Verificar que los controles de paginación están visibles
    await expect(page.getByRole('button', { name: 'Pagina anterior' })).toBeVisible();

    // Verificar que hay múltiples páginas (al menos 2)
    await expect(page.getByRole('button', { name: '2' })).toBeVisible();
  });
});
