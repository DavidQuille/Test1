import { test, expect } from '@playwright/test';
import { createTutorAccount } from '../../auth';

// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R3

test.describe('Validación de Nombre Completo con menos de 3 caracteres', () => {
  test('CP-HU-34-R3: Validación de Nombre Completo con menos de 3 caracteres', async ({ page }) => {
    // Create a tutor account first
    const timestamp = Date.now();
    const uniqueEmail = `d.q.r3.${timestamp}@epn.edu.ec`;
    await createTutorAccount(page, uniqueEmail, '123456');

    // 2. Enter 'Jo' in Nombre Completo field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Jo');

    // 3. Enter '593991234567' in Número de WhatsApp field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234567');

    // 4. Select 'FIS - Sistemas' from Facultad dropdown
    await page.getByLabel('Facultad').selectOption(['FIS - Sistemas']);

    // 5. Select '4° Semestre' from Semestre Actual dropdown
    await page.getByLabel('Semestre Actual').selectOption(['4° Semestre']);

    // 6. Enter 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' in Biografía Corta field
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');

    // 7. Click Siguiente Disponibilidad button
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();

    // Expected Results:
    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();

    // - Error message 'Mínimo 3 caracteres' shows in red below 'Nombre Completo'
    await expect(page.getByText('Mínimo 3 caracteres')).toBeVisible();
  });
});
