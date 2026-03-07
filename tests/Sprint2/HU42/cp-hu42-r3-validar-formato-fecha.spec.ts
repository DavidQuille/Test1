// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R3

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R3: Validar y Mantener Formato de Fecha MM/AAAA', async ({ page }) => {
    // 1. Navegar a Detalles Profesionales (Paso 3)
    await page.goto(TUTOR_REGISTRO_URL);
    
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
    
    // 4. Ingresar '03/2024' en Fecha Inicio
    await page.getByPlaceholder('Ej. 03/2024').first().fill('03/2024');
    
    // 5. Mover el foco al campo Fecha Fin
    await page.getByPlaceholder('Ej. 12/2025 o Presente').first().focus();
    
    // Expected Results:
    // - El campo Fecha Inicio mantiene el formato MM/AAAA
    const startDateInput = page.getByPlaceholder('Ej. 03/2024').first();
    await expect(startDateInput).toHaveValue('03/2024');
    
    // - Se visualiza correctamente con el slash
    const inputValue = await startDateInput.inputValue();
    expect(inputValue).toMatch(/^\d{2}\/\d{4}$/);
  });
});
