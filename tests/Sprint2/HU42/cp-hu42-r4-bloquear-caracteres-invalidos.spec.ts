import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R4

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R4: Bloquear Ingreso de Caracteres No-Numéricos en Campos de Fecha', async ({ page }) => {
    // 1. Navegar a Detalles Profesionales (Paso 3)
    await loginAndGoto(page, TUTOR_REGISTRO_URL);
    
    // Llenar Paso 1 con datos aleatorios
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill(getNombreAleatorio());
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill(getNumeroWhatsAppAleatorio());
    await page.getByLabel('Facultad').selectOption('FIS - Sistemas');
    await page.getByLabel('Semestre Actual').selectOption('4° Semestre');
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill(getBiografiaAleatoria());
    
    // Avanzar a Paso 2
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();
    await expect(page.getByRole('heading', { name: 'Define tu Horario' })).toBeVisible();
    
    // Seleccionar un horario
    const availabilityButtons = page.locator('button[class*="transition-colors"][class*="font-semibold"]').nth(5);
    await availabilityButtons.click();
    
    // Avanzar a Paso 3
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();
    
    // 3. Abrir modal de Nueva Experiencia
    await page.getByRole('button', { name: '+ Añadir Experiencia' }).click();
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).toBeVisible();
    
    // 4. Intentar ingresar 'Hola' en Fecha Inicio
    const startDateInput = page.getByPlaceholder('Ej. 03/2024').first();
    await startDateInput.fill('Hola');
    
    // Verificar que no acepta caracteres no-numéricos
    let value = await startDateInput.inputValue();
    expect(value).toBe('');
    
    // 5. Intentar ingresar 'Presentes' en Fecha Fin
    const endDateInput = page.getByPlaceholder('Ej. 12/2025 o Presente').first();
    await endDateInput.fill('Presentes');
    
    // No debe aceptar "Presentes" con 's'
    value = await endDateInput.inputValue();
    expect(value).not.toBe('Presentes');
    
    // 6. Intentar ingresar '12-2024' (con guión)
    await startDateInput.fill('12-2024');
    
    // El guión no debe aceptarse (solo /)
    value = await startDateInput.inputValue();
    expect(value).not.toContain('-');
  });
});
