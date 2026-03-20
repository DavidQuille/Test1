import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R4

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de Nombre Completo con más de 60 caracteres', () => {
  test('CP-HU-34-R4: Validación de Nombre Completo con más de 60 caracteres', async ({ page }) => {
    // 1. Navigate to tutor registration page
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Enter a very long name (more than 60 characters)
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Este es un nombre muy largo que definitivamente excede los sesenta caracteres para una prueba de longitud máxima');

    // Expected Results:
    // - System limits input to 60 characters in 'Nombre Completo' field
    const nombreField = page.getByRole('textbox', { name: 'Nombre Completo' });
    const inputValue = await nombreField.inputValue();
    expect(inputValue.length).toBeLessThanOrEqual(60);

    // - Counter '60/60' is displayed below 'Nombre Completo' field
    await expect(page.locator('text=60/60')).toBeVisible();

    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();
  });
});
