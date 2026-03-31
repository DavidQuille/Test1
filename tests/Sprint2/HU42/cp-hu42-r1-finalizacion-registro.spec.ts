import { test, expect } from '@playwright/test';
import { REGISTRO_URL } from '../../config';

// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R1

test.describe('HU42 - Detalles Profesionales', () => {
  test.fixme('CP-HU-42-R1: Finalización Exitosa del Registro de Perfil de Tutor', async ({ page }) => {
    // FIXME: Este test depende del flujo correcto de HU34 (Paso 1) y HU41 (Paso 2).
    // HU41 no está avanzando correctamente al Paso 2 "Define tu Horario", por lo tanto
    // HU42 también falla ya que no puede llegara Paso 3 "Detalles Profesionales".
    // Este test debería funcionar una vez que HU41 sea reparado.

    // Generate unique email for new tutor registration
    const timestamp = Date.now();
    const uniqueEmail = `d.q${timestamp}@epn.edu.ec`;
    
    // Step 1: Navigate to registro page and create account
    await page.goto(REGISTRO_URL);
    await page.getByLabel('Tutor').check();
    await page.getByLabel('Correo Electrónico').fill(uniqueEmail);
    await page.getByLabel('Contraseña').first().fill('123456');
    await page.getByLabel('Confirmar Contraseña').fill('123456');
    await page.getByRole('button', { name: 'Crear Cuenta' }).click();
    
    // Wait for navigation to tutor profile completion page
    await page.waitForURL('**/registro/tutor**', { timeout: 10000 });
    
    // Step 2: Paso 1 - Llenar datos básicos
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Juan Carlos Pérez');
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234567');
    await page.getByLabel('Facultad').selectOption('FIS - Sistemas');
    await page.getByLabel('Semestre Actual').selectOption('4° Semestre');
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');
    
    // Step 3: Avanzar a Paso 2 (Disponibilidad)
    await page.getByRole('button', { name: /Siguiente.*Disponibilidad/i }).click();
    await page.waitForURL('**/registro/tutor**');
    
    // Step 4: Paso 2 - Seleccionar al menos un horario
    await expect(page.getByRole('heading', { name: 'Define tu Horario' })).toBeVisible();
    
    // Select a time slot (Lun 08:00)
    await page.locator('button').filter({ hasText: /Lun.*08:00/ }).first().click();
    
    // Step 5: Avanzar a Paso 3 (Detalles Profesionales)
    await page.getByRole('button', { name: /Siguiente.*Perfil/ }).click();
    await page.waitForURL('**/registro/tutor**');
    
    // Step 6: Paso 3 - Detalles Profesionales (Experiencias y Materias - ambos opcionales)
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();
    
    // Step 7: Presionar "Finalizar Registro" para completar el registro
    await page.getByRole('button', { name: 'Finalizar Registro' }).click();
    
    // Expected Results:
    // - El sistema finaliza el registro sin alertas
    // - Redirige a dashboard tutor
    const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3001';
    await page.waitForURL(`${baseUrl}/dashboard/tutor`, { timeout: 10000 });
    await expect(page).toHaveURL(`${baseUrl}/dashboard/tutor`);
  });
});
