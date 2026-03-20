import { test, expect } from '@playwright/test';
import { BANDEJA_ENTRADA_URL } from '../../config';
import { TUTOR } from '../../credentials';

test.describe('Confirmar Tutoría Virtual', () => {
  test('R1: Confirmar Tutoría Virtual exitosamente con enlace válido', async ({ page }) => {
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
    
    // 3. Expandir primera fila y buscar Virtual
    const firstRow = page.locator('tbody tr').first();
    await firstRow.click();
    
    // Esperar para que se expanda y muestre el botón Aceptar
    await expect(page.getByRole('button', { name: 'Aceptar' })).toBeVisible({ timeout: 3000 });
    
    // 4. Click en Aceptar
    await page.getByRole('button', { name: 'Aceptar' }).first().click();
    
    // Esperar modal
    await expect(page.locator('h2:has-text("Confirmar Tutoría")')).toBeVisible({ timeout: 3000 });
    
    // Verificar si es Virtual (si es Presencial, cancelar y marcar test como skip)
    const modalityText = await page.locator('text=/Modalidad elegida:/').textContent();
    if (modalityText && !modalityText.includes('Virtual')) {
      await page.getByRole('button', { name: 'Cancelar' }).click();
      test.skip();
    }
    
    // 5. Ingresar enlace
    await page.getByRole('textbox', { name: 'Enlace de la reunión *' }).fill('https://zoom.us/j/123456789');
    
    // 6. Confirmar
    await page.getByRole('button', { name: 'Confirmar' }).click();
    
    // Esperar a volver a la bandeja
    await page.waitForURL(BANDEJA_ENTRADA_URL);
    await expect(page).toHaveURL(BANDEJA_ENTRADA_URL);
  });
});