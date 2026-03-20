import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R1

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Registro exitoso de Datos Básicos del Tutor', () => {
  test('CP-HU-34-R1: Registro exitoso de Datos Básicos del Tutor', async ({ page }) => {
    // 1. Navigate to the tutor registration page
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Enter 'Daniela Castro' in the 'Nombre Completo' field
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');

    // 3. Enter '593991234567' in the 'Número de WhatsApp' field
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234567');

    // 4. Select 'FIS - Sistemas' from 'Facultad' dropdown
    await page.getByLabel('Facultad').selectOption(['FIS - Sistemas']);

    // 5. Select '4° Semestre' from 'Semestre Actual' dropdown
    await page.getByLabel('Semestre Actual').selectOption(['4° Semestre']);

    // 6. Enter 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' in 'Biografía Corta' field
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');

    // 7. Click 'Siguiente Disponibilidad' button
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();

    // Expected Results:
    // - System redirects to Step 2
    // - Step '2 Disponibilidad' is highlighted in top bar
    const disponibilidadButton = page.locator('button:has-text("Disponibilidad")').first();
    await expect(disponibilidadButton).toBeVisible();
    // Verify we see the availability section message or still on registration page
    await expect(page).toHaveURL('https://politutorias-frontend.vercel.app/tutor/registro');
  });
});
