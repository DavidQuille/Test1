import { test, expect } from '@playwright/test';
import { createTutorAccount } from '../../auth';

// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R4

test.describe('Validación de Nombre Completo con más de 60 caracteres', () => {
  test('CP-HU-34-R4: Validación de Nombre Completo con más de 60 caracteres', async ({ page }) => {
    // Create a tutor account first
    const timestamp = Date.now();
    const uniqueEmail = `d.q.r4.${timestamp}@epn.edu.ec`;
    await createTutorAccount(page, uniqueEmail, '123456');

    // 2. Enter a very long name (more than 60 characters)
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Este es un nombre muy largo que definitivamente excede los sesenta caracteres para una prueba de longitud máxima');

    // Expected Results:
    // - System limits input to 60 characters in 'Nombre Completo' field
    const nombreField = page.getByRole('textbox', { name: 'Nombre Completo' });
    const inputValue = await nombreField.inputValue();
    expect(inputValue.length).toBeLessThanOrEqual(60);

    // - Counter '60/60' is displayed below 'Nombre Completo' field
    await expect(page.getByText('60/60')).toBeVisible();

    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();
  });
});
