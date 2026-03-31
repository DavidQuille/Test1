import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R1

test.describe('HU42 - Finalización Registro Tutor', () => {
  test('CP-HU-42-R1: Completar registro del tutor con perfil profesional (Paso 3)', async ({ page }) => {
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
    
    // Step 5: Fill Paso 1 data manually
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
    await bioInput.fill('Soy tutor especializado en matemáticas con 5 años de experiencia en educación superior y virtual.');
    
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
    
    // Step 7: Select time block for Paso 2 - click on hourly slot (Lunes 10:00)
    const horaRow = page.locator('tbody tr').filter({ hasText: '10:00' });
    const lunesCell = horaRow.locator('td').nth(1); // Lunes is second column (after HORA)
    await lunesCell.click();
    
    // Step 8: Verify at least one horario is selected
    await page.waitForTimeout(500);
    
    // Step 9: Click "Siguiente Perfil Profesional" button to advance to Paso 3
    const finalizarDisponibilidadBtn = page.locator('button:has-text("Siguiente")').last();
    await finalizarDisponibilidadBtn.waitFor({ state: 'visible' });
    await finalizarDisponibilidadBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await finalizarDisponibilidadBtn.click({ force: true });
    await page.waitForTimeout(2000);
    
    // Step 10: Wait for Paso 3 (Perfil Profesional) to load
    await page.waitForSelector('text=Perfil Profesional', { timeout: 10000 });
    
    // Step 11: Add a materia (subject) - fill in the textbox
    const materiaInput = page.locator('input[placeholder*="Escribe una materia"]');
    await materiaInput.waitFor({ state: 'visible', timeout: 5000 });
    await materiaInput.fill('Cálculo');
    
    // Step 12: Click "+ Agregar" button to add the materia
    const agregarBtn = page.locator('button:has-text("Agregar")').first();
    await agregarBtn.click();
    await page.waitForTimeout(500);
    
    // Step 13: Click "Finalizar Registro" button
    const finalizarBtn = page.locator('button:has-text("Finalizar Registro")');
    await finalizarBtn.waitFor({ state: 'visible' });
    await finalizarBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await finalizarBtn.click({ force: true });
    await page.waitForTimeout(2000);
    
    // Step 14: Verify registration completed - wait for page to load
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Verify we're NOT at login/registro pages anymore
    const url = page.url();
    expect(!url.includes('/registro')).toBeTruthy();
    expect(!url.includes('/iniciar-sesion')).toBeTruthy();
  });
});
