import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R1

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R1: Finalización Exitosa del Registro de Perfil de Tutor', async ({ page }) => {
    // Generate unique email for new tutor registration
    const randomSuffix = Math.floor(Math.random() * 1000000);
    const uniqueEmail = `d.q${randomSuffix}@epn.edu.ec`;
    const password = '123456';
    const uniquePhone = `59398${String(randomSuffix).padStart(7, '0')}`;
    
    // Step 1: Navigate to registro page and create account
    await page.goto(BASE_URL + '/registro');
    await page.click('label:has-text("Tutor")');
    
    const emailInput = page.locator('input[placeholder*="tu.correo"]');
    await emailInput.fill(uniqueEmail);
    
    const passwordInput = page.locator('input[placeholder*="Mínimo"]');
    await passwordInput.fill(password);
    
    const confirmPasswordInput = page.locator('input[placeholder*="Repite"]');
    await confirmPasswordInput.fill(password);
    
    await Promise.all([
      page.click('button:has-text("Crear Cuenta")'),
      page.waitForNavigation()
    ]);
    
    // Step 2: Paso 1 - Llenar datos básicos
    await page.waitForSelector('text=Completa tu Perfil', { timeout: 10000 });
    
    const nameInput = page.locator('input[placeholder*="Ej. Daniela"]');
    await nameInput.clear();
    await page.waitForTimeout(300);
    await nameInput.fill('Juan Carlos Pérez');
    await page.waitForSelector('text=Nombre válido', { timeout: 5000 });
    
    const whatsappInput = page.locator('input[placeholder*="593"]');
    await whatsappInput.clear();
    await page.waitForTimeout(300);
    await whatsappInput.fill(uniquePhone);
    await page.waitForSelector('text=Número válido', { timeout: 5000 });
    
    const facultadSelect = page.locator('select').first();
    await facultadSelect.selectOption('FIS - Sistemas');
    
    const semestreSelect = page.locator('select').nth(1);
    await semestreSelect.selectOption('4° Semestre');
    
    const bioInput = page.locator('textarea[placeholder*="Cuéntales"]');
    await bioInput.clear();
    await page.waitForTimeout(300);
    await bioInput.fill('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');
    await page.waitForSelector('text=Biografía válida', { timeout: 5000 });
    
    // Step 3: Avanzar a Paso 2 (Disponibilidad)
    const siguienteBtn = page.locator('button:has-text("Siguiente")').first();
    await siguienteBtn.waitFor({ state: 'visible' });
    await siguienteBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await siguienteBtn.click({ force: true });
    await page.waitForTimeout(1000);
    
    // Step 4: Paso 2 - Seleccionar al menos un horario
    await page.waitForSelector('text=Define tu Horario', { timeout: 10000 });
    
    const horaRow = page.locator('tbody tr').filter({ hasText: '08:00' });
    const lunesCell = horaRow.locator('td').nth(1);
    await lunesCell.click();
    
    // Step 5: Avanzar a Paso 3 (Detalles Profesionales)
    const finalizarDisponibilidadBtn = page.locator('button:has-text("Siguiente")').last();
    await finalizarDisponibilidadBtn.waitFor({ state: 'visible' });
    await finalizarDisponibilidadBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await finalizarDisponibilidadBtn.click({ force: true });
    await page.waitForTimeout(2000);
    
    // Step 6: Paso 3 - Detalles Profesionales (Experiencias y Materias - ambos opcionales)
    await page.waitForSelector('text=Detalles Profesionales', { timeout: 10000 });
    
    // Step 7: Presionar "Finalizar Registro" para completar el registro
    await page.getByRole('button', { name: 'Finalizar Registro' }).click();
    
    // Expected Results:
    // - El sistema finaliza el registro sin alertas
    // - Redirige a dashboard o home
    await page.waitForTimeout(2000);
  });
});
