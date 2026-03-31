import { test, expect } from '@playwright/test';
import { REGISTRO_URL } from '../../config';

// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R1

test.describe('Registro exitoso de Datos Básicos del Tutor', () => {
  test('CP-HU-34-R1: Registro exitoso de Datos Básicos del Tutor', async ({ page }) => {
    // Generate unique email using timestamp to avoid conflicts
    const timestamp = Date.now();
    const uniqueEmail = `d.q${timestamp}@epn.edu.ec`;
    
    // Step 1: Navigate to registro page and start tutor registration
    await page.goto(REGISTRO_URL);
    
    // Select "Tutor" option
    await page.getByLabel('Tutor').check();
    
    // Enter email
    await page.getByLabel('Correo Electrónico').fill(uniqueEmail);
    
    // Enter password: 123456 (in both fields)
    await page.getByLabel('Contraseña').first().fill('123456');
    
    // Enter confirmation password
    await page.getByLabel('Confirmar Contraseña').fill('123456');
    
    // Click "Crear Cuenta" button
    await page.getByRole('button', { name: 'Crear Cuenta' }).click();
    
    // Verify we navigate to tutor profile completion page (/registro/tutor)
    await page.waitForURL('**/registro/tutor**', { timeout: 10000 });
    
    // Verify page shows Step 1 with basic fields
    await expect(page.getByRole('textbox', { name: 'Nombre Completo' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Número de WhatsApp' })).toBeVisible();
  });
});
