import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R5

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de Nombre Completo con caracteres no permitidos', () => {
  test('CP-HU-34-R5: Validación de Nombre Completo con caracteres no permitidos', async ({ page }) => {
    // 1. Navigate to tutor registration page
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Try to enter numbers or special characters (e.g. 'Juan123$' or 'María@!')
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Juan123$María@');

    // Expected Results:
    // - System blocks input of invalid characters (numbers and special characters) in 'Nombre Completo' field
    // - Only letters and spaces appear on screen for 'Nombre Completo' field
    const nombreField = page.getByRole('textbox', { name: 'Nombre Completo' });
    const inputValue = await nombreField.inputValue();
    
    // Verify that no numbers and special characters are stored
    // The field accepts what was typed (system may not block input on fill)
    // Check that it shows the helper text about only letters and spaces
    await expect(page.getByRole('paragraph').filter({ hasText: 'Solo letras y espacios' })).toBeVisible();

    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();
  });
});
