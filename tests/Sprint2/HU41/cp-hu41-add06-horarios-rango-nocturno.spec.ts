import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-06: Verificar selección de múltiples horarios en rango nocturno (18:00-20:00)', async ({ page }) => {
    const randomSuffix = Math.floor(Math.random() * 1000000);
    const email = `d.q${randomSuffix}@epn.edu.ec`;
    const uniquePhone = `59398${String(randomSuffix).padStart(7, '0')}`;
    
    await page.goto(BASE_URL + '/registro');
    await page.click('label:has-text("Tutor")');
    
    await page.locator('input[placeholder*="tu.correo"]').fill(email);
    await page.locator('input[placeholder*="Mínimo"]').fill('123456');
    await page.locator('input[placeholder*="Repite"]').fill('123456');
    
    await Promise.all([
      page.click('button:has-text("Crear Cuenta")'),
      page.waitForNavigation()
    ]);
    
    await page.waitForSelector('text=Completa tu Perfil', { timeout: 10000 });
    
    const nameInput = page.locator('input[placeholder*="Ej. Daniela"]');
    await nameInput.clear();
    await page.waitForTimeout(300);
    await nameInput.fill('David López');
    await page.waitForSelector('text=Nombre válido', { timeout: 5000 });
    
    const whatsappInput = page.locator('input[placeholder*="593"]');
    await whatsappInput.clear();
    await page.waitForTimeout(300);
    await whatsappInput.fill(uniquePhone);
    await page.waitForSelector('text=Número válido', { timeout: 5000 });
    
    await page.locator('select').first().selectOption('FIEE - Eléctrica y Electrónica');
    await page.locator('select').nth(1).selectOption('7° Semestre');
    
    const bioInput = page.locator('textarea[placeholder*="Cuéntales"]');
    await bioInput.clear();
    await page.waitForTimeout(300);
    await bioInput.fill('Soy tutor especializado en matemáticas.');
    await page.waitForSelector('text=Biografía válida', { timeout: 5000 });
    
    const siguienteBtn = page.locator('button:has-text("Siguiente")').first();
    await siguienteBtn.waitFor({ state: 'visible' });
    await siguienteBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await siguienteBtn.click({ force: true });
    await page.waitForTimeout(1000);
    
    await page.waitForSelector('text=Define tu Horario', { timeout: 10000 });

    // 5. Select night hours
    const table = page.locator('table');
    const rows = await table.locator('tbody tr').all();
    
    for (let i = 11; i < Math.min(13, rows.length); i++) {
      const cells = await rows[i].locator('td').all();
      if (cells.length > 1) await cells[1].click();
      await page.waitForTimeout(100);
    }

    
    await expect(page.locator('text=horarios seleccionados')).toBeVisible({ timeout: 5000 });
  });
});
