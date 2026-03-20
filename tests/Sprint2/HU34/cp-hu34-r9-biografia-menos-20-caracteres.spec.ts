import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R9

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de Biografía Corta con menos de 20 caracteres', () => {
  test('CP-HU-34-R9: Validación de Biografía Corta con menos de 20 caracteres', async ({ page }) => {
    // 1. Navigate to the tutor registration page
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Enter 'Daniela Castro' in Nombre Completo field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');

    // 3. Enter '593991234567' in Número de WhatsApp field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234567');

    // 4. Select 'FIS - Sistemas' from Facultad dropdown
    await page.getByLabel('Facultad').selectOption(['FIS - Sistemas']);

    // 5. Select '4° Semestre' from Semestre Actual dropdown
    await page.getByLabel('Semestre Actual').selectOption(['4° Semestre']);

    // 6. Enter 'Soy un tutor nuevo.' (less than 20 characters) in Biografía Corta field
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Soy un tutor nuevo.');

    // 7. Click 'Siguiente Disponibilidad' button
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();

    // Expected Results:
    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();

    // - Error message 'Mínimo 20 caracteres' shows in red below 'Biografía Corta' field
    await expect(page.locator('text=Mínimo 20 caracteres')).toBeVisible();
  });
});
