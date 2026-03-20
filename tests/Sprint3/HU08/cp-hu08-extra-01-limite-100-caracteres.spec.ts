import { test, expect } from '@playwright/test';
import { BANDEJA_ENTRADA_URL } from '../../config';
import { TUTOR } from '../../credentials';

test.describe('Confirmar Tutoría Presencial', () => {
  test('Extra-01: Verificar límite máximo de 100 caracteres en lugar de encuentro', async ({ page }) => {
    // 1. Iniciar sesión como Tutor
    await page.goto('http://localhost:3001');
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(TUTOR.email);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill(TUTOR.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    await page.waitForURL('**/dashboard/tutor');
    
    // 2. Navegar a Bandeja de Entrada
    await page.getByRole('link', { name: 'Bandeja' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'Bandeja de Entrada' })).toBeVisible({ timeout: 10000 });
    
    // 3. Expandir primera fila
    const firstRow = page.locator('tbody tr').first();
    await firstRow.click();
    
    await expect(page.getByRole('button', { name: 'Aceptar' })).toBeVisible({ timeout: 3000 });
    
    // 4. Click en Aceptar
    await page.getByRole('button', { name: 'Aceptar' }).first().click();
    
    // Esperar modal
    await expect(page.locator('h2:has-text("Confirmar Tutoría")')).toBeVisible({ timeout: 3000 });
    
    // Verificar si es Presencial
    const modalityText = await page.locator('text=/Modalidad elegida:/').textContent();
    if (modalityText && !modalityText.includes('Presencial')) {
      await page.getByRole('button', { name: 'Cancelar' }).click();
      test.skip();
    }
    
    // 5. Intentar ingresar 101 caracteres
    const textInput = page.getByRole('textbox', { name: 'Lugar de encuentro *' });
    const longText = 'B'.repeat(101);
    await textInput.fill(longText);
    
    // Verificar que contiene exactamente 100
    const currentValue = await textInput.inputValue();
    expect(currentValue.length).toBe(100);
    
    // Verificar contador
    await expect(page.getByText('100/100')).toBeVisible({ timeout: 3000 });
  });
});