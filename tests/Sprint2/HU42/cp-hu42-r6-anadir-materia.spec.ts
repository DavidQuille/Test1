import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R6

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R6: Añadir Materia como Etiqueta (Pill)', async ({ page }) => {
    // Follow same setup as ADD1 to reach Paso 3
    await page.goto(BASE_URL + '/registro');
    await page.click('label:has-text("Tutor")');
    
    const randomSuffix = Math.floor(Math.random() * 1000000);
    const email = `d.q${randomSuffix}@epn.edu.ec`;
    const password = '123456';
    const uniquePhone = `59398${String(randomSuffix).padStart(7, '0')}`;
    
    const emailInput = page.locator('input[placeholder*="tu.correo"]');
    await emailInput.fill(email);
    
    const passwordInput = page.locator('input[placeholder*="Mínimo"]');
    await passwordInput.fill(password);
    
    const confirmPasswordInput = page.locator('input[placeholder*="Repite"]');
    await confirmPasswordInput.fill(password);
    
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
    
    const facultadSelect = page.locator('select').first();
    await facultadSelect.selectOption('FIEE - Eléctrica y Electrónica');
    
    const semestreSelect = page.locator('select').nth(1);
    await semestreSelect.selectOption('7° Semestre');
    
    const bioInput = page.locator('textarea[placeholder*="Cuéntales"]');
    await bioInput.clear();
    await page.waitForTimeout(300);
    await bioInput.fill('Soy especializado en matemáticas.');
    await page.waitForSelector('text=Biografía válida', { timeout: 5000 });
    
    const siguienteBtn = page.locator('button:has-text("Siguiente")').first();
    await siguienteBtn.waitFor({ state: 'visible' });
    await siguienteBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await siguienteBtn.click({ force: true });
    await page.waitForTimeout(1000);
    
    await page.waitForSelector('text=Define tu Horario', { timeout: 10000 });
    
    const horaRow = page.locator('tbody tr').filter({ hasText: '10:00' });
    const lunesCell = horaRow.locator('td').nth(1);
    await lunesCell.click();
    
    const finalizarDisponibilidadBtn = page.locator('button:has-text("Siguiente")').last();
    await finalizarDisponibilidadBtn.waitFor({ state: 'visible' });
    await finalizarDisponibilidadBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await finalizarDisponibilidadBtn.click({ force: true });
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('text=Detalles Profesionales', { timeout: 10000 });
    
    // Test R6: Añadir materia como etiqueta pill
    const materiaInput = page.getByPlaceholder(/Escribe una materia/i);
    await expect(materiaInput).toBeVisible();
    
    // 4. Ingresar 'Cálculo'
    await materiaInput.fill('Cálculo');
    
    // 5. Hacer clic en '+ Agregar'
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // Expected Results:
    // - El campo de texto se limpia
    await expect(materiaInput).toHaveValue('');
    
    // - Aparece una etiqueta (pill) con texto 'Cálculo' (exacto)
    const tagElement = page.getByText('Cálculo', { exact: true });
    await expect(tagElement).toBeVisible();
    
    // - La etiqueta incluye un botón '×' para eliminar
    const deleteButton = tagElement.locator('..').locator('button:has-text("×")');
    await expect(deleteButton).toBeTruthy();
  });
});
