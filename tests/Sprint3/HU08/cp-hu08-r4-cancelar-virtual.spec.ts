import { test, expect } from '@playwright/test';
import { BANDEJA_ENTRADA_URL } from '../../config';
import { TUTOR } from '../../credentials';

test.describe('Confirmar Tutoría Virtual', () => {
  test('R4: Cancelar confirmación de Tutoría Virtual', async ({ page }) => {
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
    
    // Verificar si es Virtual
    const modalityText = await page.locator('text=/Modalidad elegida:/').textContent();
    if (modalityText && !modalityText.includes('Virtual')) {
      await page.getByRole('button', { name: 'Cancelar' }).click();
      test.skip();
    }
    
    // 5. Click Cancelar
    await page.getByRole('button', { name: 'Cancelar' }).click();
    
    // Verificar que modal se cierra
    await expect(page.locator('h2:has-text("Confirmar Tutoría")')).not.toBeVisible({ timeout: 3000 });
    
    // Verificar bandeja
    await expect(page).toHaveURL(BANDEJA_ENTRADA_URL);
  });
});