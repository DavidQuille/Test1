import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-01: Verificar la navegabilidad hacia atrás al Paso 1 Datos Básicos', async ({ page }) => {
    // Step 1: Navigate to registro page
    await page.goto(BASE_URL + '/registro');
    
    // Step 2: Select Tutor role
    await page.click('label:has-text("Tutor")');
    
    // Step 3: Create account with unique email and phone
    const randomSuffix = Math.floor(Math.random() * 1000000);
    const email = `d.q${randomSuffix}@epn.edu.ec`;
    const password = '123456';
    const uniquePhone = `59398${String(randomSuffix).padStart(7, '0')}`;
    
    // Fill registration form
    const emailInput = page.locator('input[placeholder*="tu.correo"]');
    await emailInput.fill(email);
    
    const passwordInput = page.locator('input[placeholder*="Mínimo"]');
    await passwordInput.fill(password);
    
    const confirmPasswordInput = page.locator('input[placeholder*="Repite"]');
    await confirmPasswordInput.fill(password);
    
    // Click Crear Cuenta and wait for navigation
    await Promise.all([
      page.click('button:has-text("Crear Cuenta")'),
      page.waitForNavigation()
    ]);
    
    // Step 4: Wait for Paso 1 (Datos Básicos) form to load
    await page.waitForSelector('text=Completa tu Perfil', { timeout: 10000 });
    
    // Step 5: Fill Paso 1 data manually - CLEAR FIELDS FIRST
    const nameInput = page.locator('input[placeholder*="Ej. Daniela"]');
    await nameInput.clear();
    await page.waitForTimeout(300);
    await nameInput.fill('David López');
    
    // Wait for name validation
    await page.waitForSelector('text=Nombre válido', { timeout: 5000 });
    
    const whatsappInput = page.locator('input[placeholder*="593"]');
    await whatsappInput.clear();
    await page.waitForTimeout(300);
    await whatsappInput.fill(uniquePhone);
    
    // Wait for whatsapp validation
    await page.waitForSelector('text=Número válido', { timeout: 5000 });
    
    // Fill Facultad
    const facultadSelect = page.locator('select').first();
    await facultadSelect.selectOption('FIEE - Eléctrica y Electrónica');
    
    // Fill Semestre Actual
    const semestreSelect = page.locator('select').nth(1);
    await semestreSelect.selectOption('7° Semestre');
    
    const bioInput = page.locator('textarea[placeholder*="Cuéntales"]');
    await bioInput.clear();
    await page.waitForTimeout(300);
    await bioInput.fill('Soy tutor especializado en matemáticas.');
    
    // Wait for bio validation
    await page.waitForSelector('text=Biografía válida', { timeout: 5000 });
    
    // Step 6: Click "Siguiente Disponibilidad" button
    const siguienteBtn = page.locator('button:has-text("Siguiente")').first();
    await siguienteBtn.waitFor({ state: 'visible' });
    await siguienteBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await siguienteBtn.click({ force: true });
    await page.waitForTimeout(1000);
    
    // Wait for Paso 2 to load
    await page.waitForSelector('text=Define tu Horario', { timeout: 10000 });
    
    // Step 7: Test the "Atrás" button and verify we go back to Paso 1
    const atrasBtn = page.locator('button:has-text("Atrás")');
    await atrasBtn.waitFor({ state: 'visible' });
    await atrasBtn.click();
    
    // Step 8: Verify we're back at Paso 1 and data is preserved
    await page.waitForSelector('text=Completa tu Perfil', { timeout: 5000 });
    await expect(page.locator('text=Datos Básicos')).toBeVisible();
  });
});
