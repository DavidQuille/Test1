import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R6

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de Número de WhatsApp con menos de 10 dígitos', () => {
  test('CP-HU-34-R6: Validación de Número de WhatsApp con menos de 10 dígitos', async ({ page }) => {
    // 1. Navigate to tutor registration page
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Enter 'Daniela Castro' in Nombre Completo field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');

    // 3. Enter '593991234' (less than 10 digits) in Número de WhatsApp field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234');

    // 4. Select 'FIS - Sistemas' from Facultad dropdown
    await page.getByLabel('Facultad').selectOption(['FIS - Sistemas']);

    // 5. Select '4° Semestre' from Semestre Actual dropdown
    await page.getByLabel('Semestre Actual').selectOption(['4° Semestre']);

    // 6. Enter 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' in Biografía Corta field
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');

    // 7. Click 'Siguiente Disponibilidad' button
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();

    // Expected Results:
    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();

    // - Error message 'Ingresa un número válido (10-13 dígitos)' shows in red below 'Número de WhatsApp' field
    await expect(page.locator('text=Ingresa un número válido (10-13 dígitos)')).toBeVisible();
  });
});
