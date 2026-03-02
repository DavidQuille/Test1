// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R10

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de Biografía Corta con más de 300 caracteres', () => {
  test('CP-HU-34-R10: Validación de Biografía Corta con más de 300 caracteres', async ({ page }) => {
    // 1. Navigate to the tutor registration page
    await page.goto(TUTOR_REGISTRO_URL);

    // 2. Enter 'Daniela Castro' in Nombre Completo field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');

    // 3. Enter '593991234567' in Número de WhatsApp field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234567');

    // 4. Select 'FIS - Sistemas' from Facultad dropdown
    await page.getByLabel('Facultad').selectOption(['FIS - Sistemas']);

    // 5. Select '4° Semestre' from Semestre Actual dropdown
    await page.getByLabel('Semestre Actual').selectOption(['4° Semestre']);

    // 6. Enter a very long text (more than 300 characters) in Biografía Corta field
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Este es un texto de biografía muy extenso diseñado específicamente para superar el límite de trescientos caracteres y comprobar que el sistema bloquea correctamente cualquier intento de ingreso adicional una vez alcanzado el tope máximo permitido por el contador. Este texto debe exceder los 300 caracteres para verificar el comportamiento de bloqueo y la visualización del contador de caracteres.');

    // Expected Results:
    // - System limits input to 300 characters in 'Biografía Corta' field
    const bioField = page.getByRole('textbox', { name: 'Biografía Corta' });
    const bioValue = await bioField.inputValue();
    expect(bioValue.length).toBeLessThanOrEqual(300);

    // - Counter '300/300' is displayed below 'Biografía Corta' field
    await expect(page.locator('text=300/300')).toBeVisible();

    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();
  });
});
