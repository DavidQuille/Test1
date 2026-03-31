import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD1

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-ADD1: Guardar una Experiencia Exitosa', async ({ page }) => {
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
    await bioInput.fill('Soy especializado en matemáticas con experiencia en educación.');
    
    // Wait for bio validation
    await page.waitForSelector('text=Biografía válida', { timeout: 5000 });
    
    // Step 6: Click "Siguiente" button
    const siguienteBtn = page.locator('button:has-text("Siguiente")').first();
    await siguienteBtn.waitFor({ state: 'visible' });
    await siguienteBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await siguienteBtn.click({ force: true });
    await page.waitForTimeout(1000);
    
    // Wait for Paso 2 to load
    await page.waitForSelector('text=Define tu Horario', { timeout: 10000 });
    
    // Step 7: Select time block for Paso 2
    const horaRow = page.locator('tbody tr').filter({ hasText: '10:00' });
    const lunesCell = horaRow.locator('td').nth(1);
    await lunesCell.click();
    
    // Step 8: Click "Siguiente" button to advance to Paso 3
    const finalizarDisponibilidadBtn = page.locator('button:has-text("Siguiente")').last();
    await finalizarDisponibilidadBtn.waitFor({ state: 'visible' });
    await finalizarDisponibilidadBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await finalizarDisponibilidadBtn.click({ force: true });
    await page.waitForTimeout(2000);
    
    // Step 9: Wait for Paso 3 to load - Detalles Profesionales
    await page.waitForSelector('text=Detalles Profesionales', { timeout: 10000 });
    
    // Now test ADD1: Guardar Experiencia
    
    // 3. Abrir modal de Nueva Experiencia
    await page.getByRole('button', { name: '+ Añadir Experiencia' }).first().click();
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).toBeVisible();
    
    // 4. Ingresar 'Tutor de Programación' en Puesto
    await page.getByPlaceholder('Ej. Ayudante de Cátedra').fill('Tutor de Programación');
    
    // 5. Ingresar 'Universidad Local' en Lugar
    await page.getByPlaceholder('Ej. EPN, Facultad de Ciencias').fill('Universidad Local');
    
    // 6. Ingresar '06/2023' en Fecha Inicio
    await page.getByPlaceholder('Ej. 03/2024').first().fill('06/2023');
    
    // 7. Ingresar 'Presente' en Fecha Fin
    await page.getByPlaceholder('Ej. 12/2025 o Presente').fill('Presente');
    
    // 8. Hacer clic en 'Guardar'
    await page.getByRole('button', { name: 'Guardar' }).click();
    
    // Expected Results:
    // - El modal se cierra correctamente
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).not.toBeVisible();
    
    // - La experiencia se agrega a la lista
    await expect(page.getByText('Tutor de Programación')).toBeVisible();
    await expect(page.getByText('Universidad Local')).toBeVisible();
  });
});
