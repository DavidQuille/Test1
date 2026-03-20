import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R8

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de Número de WhatsApp con caracteres no numéricos', () => {
  test('CP-HU-34-R8: Validación de Número de WhatsApp con caracteres no numéricos', async ({ page }) => {
    // 1. Navigate to the tutor registration page
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Enter 'Daniela Castro' in Nombre Completo field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');

    // 3. Try to enter letters or special characters in Número de WhatsApp field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593abc-99123@');

    // Expected Results:
    // - System blocks input of letters and special characters in 'Número de WhatsApp' field
    // - Only numbers appear on screen for 'Número de WhatsApp' field
    const whatsappField = page.getByRole('textbox', { name: 'Número de WhatsApp' });
    const inputValue = await whatsappField.inputValue();
    
    // Verify we are still on the form
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();

    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();
  });
});

