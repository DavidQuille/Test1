// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R2

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R2: Ignorar Acción de Guardar al Dejar Campos de Experiencia Vacíos', async ({ page }) => {
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
    
    // 3. Hacer clic en '+ Añadir Experiencia'
    await page.getByRole('button', { name: '+ Añadir Experiencia' }).click();
    
    // Esperar a que aparezca el modal
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).toBeVisible();
    
    // 4. Dejar todos los campos vacíos
    // (Sin llenar ningún campo del modal)
    
    // 5. Hacer clic en 'Guardar'
    await page.getByRole('button', { name: 'Guardar' }).click();
    
    // Expected Results:
    // - La acción se ignora silenciosamente
    // - No aparece mensaje de error
    // - El modal permanece visible
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).toBeVisible();
    
    // No debe haber mensajes de error
    const errorMessages = page.locator('text=/error|Error|ERROR/i');
    await expect(errorMessages).not.toBeVisible();
  });
});
