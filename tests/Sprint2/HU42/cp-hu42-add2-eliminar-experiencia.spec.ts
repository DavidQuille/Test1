import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config';

// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD2

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-ADD2: Eliminar una Experiencia Agregada', async ({ page }) => {
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
    await bioInput.fill('Soy especializado en matemáticas con experiencia.');
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
    
    // Test ADD2: Eliminar experiencia agregada
    await page.getByRole('button', { name: '+ Añadir Experiencia' }).first().click();
    
    // 4. Llenar los campos
    await page.getByPlaceholder('Ej. Ayudante de Cátedra').fill('Tutor de Prueba');
    await page.getByPlaceholder('Ej. EPN, Facultad de Ciencias').fill('Universidad Test');
    await page.getByPlaceholder('Ej. 03/2024').first().fill('01/2023');
    await page.getByPlaceholder('Ej. 12/2025 o Presente').fill('12/2023');
    
    // 5. Guardar
    await page.getByRole('button', { name: 'Guardar' }).click();
    
    // Esperar a que se cierre el modal
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).not.toBeVisible();
    
    // Verificar que aparezca la experiencia
    await expect(page.getByText('Tutor de Prueba')).toBeVisible();
    
    // 6. Hacer clic en el botón '×' para eliminarla (última agregada)
    const deleteButtons = page.getByRole('button', { name: 'Eliminar experiencia' });
    const deleteButtonCount = await deleteButtons.count();
    
    // Hacer clic en el último botón de eliminar (la que acabamos de agregar)
    await deleteButtons.last().click();
    
    // Expected Results:
    // - La experiencia se elimina inmediatamente
    await expect(page.getByText('Tutor de Prueba')).not.toBeVisible();
    
    // - No aparecen mensajes de error
    const errorMessages = page.locator('text=/error|Error/i');
    await expect(errorMessages).not.toBeVisible();
  });
});
