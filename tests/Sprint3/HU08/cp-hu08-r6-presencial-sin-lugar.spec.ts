import { test, expect } from '@playwright/test';
import { BANDEJA_ENTRADA_URL } from '../../config';
import { TUTOR } from '../../credentials';

test.describe('Confirmar Tutoría Presencial', () => {
  test('R6: Intento sin lugar de encuentro obligatorio - muestra error', async ({ page }) => {
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
    
    // 5 y 6. Dejar vacío y click Confirmar
    await page.getByRole('button', { name: 'Confirmar' }).click();
    
    // Verificar error
    await expect(page.getByText('El lugar de encuentro es obligatorio.')).toBeVisible({ timeout: 3000 });
    
    // Modal debe seguir abierto
    await expect(page.locator('h2:has-text("Confirmar Tutoría")')).toBeVisible();
  });
});