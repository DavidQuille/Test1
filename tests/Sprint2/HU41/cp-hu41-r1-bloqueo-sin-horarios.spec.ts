import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test.skip('CP-HU-41-R1: Verificar bloqueo de navegación al intentar avanzar sin seleccionar horarios', async ({ page }) => {
    // Generate unique email and phone for new tutor registration
    const timestamp = Date.now();
    const uniquePhone = `593${Math.floor(Math.random() * 900000000 + 100000000)}`;
    
    // 1. Navigate to registro page for tutor registration
    await page.goto(`${BASE_URL}/registro`);
    
    // Select "Tutor" option
    await page.locator('label').filter({ has: page.locator('text=Tutor') }).click();
    
    // Enter registration details
    const uniqueEmail = `d.q${timestamp}@epn.edu.ec`;
    await page.locator('input[placeholder="tu.correo@epn.edu.ec"]').fill(uniqueEmail);
    await page.locator('input[type="password"]').first().fill('123456');
    await page.locator('input[type="password"]').last().fill('123456');
    
    // Click "Crear Cuenta" button
    await page.locator('button:has-text("Crear Cuenta")').click();
    await page.waitForNavigation();
    
    // 2. Llenar los campos del Paso 1 (Datos Básicos)
    await page.locator('input[placeholder="Nombre Completo"]').clear();
    await page.locator('input[placeholder="Nombre Completo"]').fill('Daniela Castro');
    
    await page.locator('input[placeholder*="WhatsApp"]').clear();
    await page.locator('input[placeholder*="WhatsApp"]').fill(uniquePhone);
    
    await page.locator('input[placeholder="Facultad"]').click();
    await page.locator('text=FIEE').click();
    
    await page.locator('input[placeholder="Semestre"]').click();
    await page.locator('text=1° Semestre').click();
    
    await page.locator('textarea').clear();
    await page.locator('textarea').fill('Tengo 5 años de experiencia en desarrollo de software.');

    // 3. Avanzar al Paso 2 - Define tu Horario
    const buttons = await page.locator('button:has-text("Siguiente")').all();
    await buttons[buttons.length - 1].click();
    
    await page.waitForSelector('text=Define tu Horario');
    
    // 4. Intentar avanzar sin seleccionar horarios
    const siguienteButtons = await page.locator('button:has-text("Siguiente")').all();
    await siguienteButtons[siguienteButtons.length - 1].click();

    // Expected Results:
    // - El sistema bloquea la navegación y muestra mensaje de error
    await expect(page.locator('text=Selecciona al menos un horario')).toBeVisible();
  });
});
