import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test.skip('CP-HU-41-R2: Verificar la selección visual y actualización del contador al hacer clic en un bloque horario', async ({ page }) => {
    const timestamp = Date.now();
    const uniquePhone = `593${Math.floor(Math.random() * 900000000 + 100000000)}`;
    
    // 1. Navegar a registro
    await page.goto(`${BASE_URL}/registro`);
    await page.locator('label').filter({ has: page.locator('text=Tutor') }).click();
    
    // 2. Crear cuenta
    const uniqueEmail = `d.q${timestamp}@epn.edu.ec`;
    await page.locator('input[placeholder="tu.correo@epn.edu.ec"]').fill(uniqueEmail);
    await page.locator('input[type="password"]').first().fill('123456');
    await page.locator('input[type="password"]').last().fill('123456');
    await page.locator('button:has-text("Crear Cuenta")').click();
    await page.waitForNavigation();
    
    // 3. Llenar Paso 1
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

    // 4. Avanzar a Paso 2
    const buttons = await page.locator('button:has-text("Siguiente")').all();
    await buttons[buttons.length - 1].click();
    
    await page.waitForSelector('text=Define tu Horario');
    
    // 5. Hacer clic en un horario (Lun 09:00)
    const horarioCell = page.locator('button').filter({ has: page.locator('text=Lun') }).first();
    await horarioCell.click();

    // Expected Results:
    // - El bloque cambia visualmente (azul con ✓)
    await expect(horarioCell).toHaveClass(/bg-blue/);
    
    // - Aparece el contador: '✓ 1 horario seleccionado'
    await expect(page.locator('text=✓ 1 horario seleccionado')).toBeVisible();
  });
});
