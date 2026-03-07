// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD5

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales (Casos Adicionales)', () => {
  test('CP-HU-42-ADD5: Intentar Agregar una Materia sin Escribir Nada', async ({ page }) => {
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
    
    // 3. Dejar el campo de materia vacío
    const materiaInput = page.getByPlaceholder(/Escribe una materia/i);
    
    // Verificar que está vacío
    await expect(materiaInput).toHaveValue('');
    
    // 4. Hacer clic en '+ Agregar' sin escribir nada
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // Expected Results:
    // - No se agrega materia alguna
    // (El campo debe permanecer vacío, sin etiquetas nuevas)
    await expect(materiaInput).toHaveValue('');
    
    // - No aparece etiqueta ni mensaje de error
    const errorMessages = page.locator('text=/error|Error/i');
    await expect(errorMessages).not.toBeVisible();
    
    // - El campo permanece vacío y listo para una nueva entrada
    await expect(materiaInput).toHaveValue('');
  });
});
