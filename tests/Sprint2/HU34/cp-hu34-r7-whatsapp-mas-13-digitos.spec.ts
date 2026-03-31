import { test, expect } from '@playwright/test';
import { createTutorAccount } from '../../auth';

// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R7

test.describe('Validación de Número de WhatsApp con más de 13 dígitos', () => {
  test('CP-HU-34-R7: Validación de Número de WhatsApp con más de 13 dígitos', async ({ page }) => {
    // Create a tutor account first
    const timestamp = Date.now();
    const uniqueEmail = `d.q.r7.${timestamp}@epn.edu.ec`;
    await createTutorAccount(page, uniqueEmail, '123456');

    // 2. Enter 'Daniela Castro' in Nombre Completo field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');

    // 3. Enter '59399123456789' (more than 13 digits) in Número de WhatsApp field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('59399123456789');

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
    await expect(page.getByText('Ingresa un número válido (10-13 dígitos)')).toBeVisible();
  });
});
