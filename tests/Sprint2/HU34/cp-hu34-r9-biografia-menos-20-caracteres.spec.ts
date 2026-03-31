import { test, expect } from '@playwright/test';
import { createTutorAccount } from '../../auth';

// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R9

test.describe('Validación de Biografía Corta con menos de 20 caracteres', () => {
  test('CP-HU-34-R9: Validación de Biografía Corta con menos de 20 caracteres', async ({ page }) => {
    // Create a tutor account first
    const timestamp = Date.now();
    const uniqueEmail = `d.q.r9.${timestamp}@epn.edu.ec`;
    await createTutorAccount(page, uniqueEmail, '123456');

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
    await expect(page.getByText('Mínimo 20 caracteres')).toBeVisible();
  });
});
