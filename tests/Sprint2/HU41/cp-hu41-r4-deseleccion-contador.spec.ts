import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test.skip('CP-HU-41-R4: Verificar la deselección de un bloque horario y la actualización del contador', async ({ page }) => {
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
    
    // 5. Seleccionar dos horarios (Mié 11:00 y Mié 12:00)
    const horarios = await page.locator('button').all();
    // Encontrar y clickear los horarios de Mié
    for (const horario of horarios) {
      const text = await horario.textContent();
      if (text && text.includes('Mié') && text.includes('11:00')) {
        await horario.click();
        break;
      }
    }
    
    for (const horario of horarios) {
      const text = await horario.textContent();
      if (text && text.includes('Mié') && text.includes('12:00')) {
        await horario.click();
        break;
      }
    }

    // 6. Verificar que muestra "✓ 2 horarios seleccionados"
    await expect(page.locator('text=✓ 2 horarios')).toBeVisible();

    // 7. Deseleccionar Mié 11:00
    for (const horario of horarios) {
      const text = await horario.textContent();
      if (text && text.includes('Mié') && text.includes('11:00')) {
        await horario.click();
        break;
      }
    }

    // Expected Results:
    // - El contador disminuye a "✓ 1 horario seleccionado"
    await expect(page.locator('text=✓ 1 horario seleccionado')).toBeVisible();
  });
});
