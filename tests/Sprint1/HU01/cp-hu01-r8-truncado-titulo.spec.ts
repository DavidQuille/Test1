import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU01.md
// case: CP-HU-01-R8 - Truncado automático por límite máximo en Título

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R8: Truncado automático por límite máximo en Título (80 caracteres)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Open the new offer modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();
    
    // Wait for the modal to be visible and stable
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' }).waitFor({ state: 'visible' });

    // 3. Type a long title to test 80 character limit (90 characters total)
    await page.getByRole('textbox', { name: /Ej. Cálculo Vectorial/ }).fill('Curso completo de Cálculo Vectorial y Ecuaciones Diferenciales para Ingeniería de Software');

    // 4. Verify the text is truncated to 80 characters
    const titleField = page.getByRole('textbox', { name: /Ej. Cálculo Vectorial/ });
    const value = await titleField.inputValue();
    expect(value.length).toBeLessThanOrEqual(80);

    // Verify the counter shows "80/80" by checking the specific span
    await expect(page.locator('span').filter({ hasText: /^80\/80$/ })).toBeVisible();
  });
});
