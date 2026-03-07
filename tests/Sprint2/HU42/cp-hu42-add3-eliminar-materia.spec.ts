// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD3

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales (Casos Adicionales)', () => {
  test('CP-HU-42-ADD3: Eliminar una Materia Agregada', async ({ page }) => {
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
    await expect(page.getByRole('heading', { name: 'Define tu Horario' })).toBeVisible({ timeout: 10000 });
    
    // Seleccionar un horario
    const availabilityButtons = page.locator('button[class*="transition-colors"][class*="font-semibold"]').nth(5);
    await availabilityButtons.click();
    
    // Avanzar a Paso 3
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();
    
    // 3. Agregar la materia 'Cálculo'
    const materiaInput = page.getByPlaceholder(/Escribe una materia/i);
    await materiaInput.fill('Cálculo');
    
    // Hacer clic en '+ Agregar'
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // 4. Verificar que aparece la etiqueta 'Cálculo'
    const calculoTag = page.getByText('Cálculo', { exact: true });
    await expect(calculoTag).toBeVisible();
    
    // 5. Hacer clic en el botón '×' de la etiqueta
    // Encontrar el botón de eliminar asociado a Cálculo
    const deleteButton = calculoTag.locator('..').locator('button');
    await deleteButton.click();
    
    // Expected Results:
    // - La etiqueta 'Cálculo' se elimina
    await expect(calculoTag).not.toBeVisible();
    
    // - El campo se limpia
    await expect(materiaInput).toHaveValue('');
    
    // - No aparece mensaje de error
    const errorMessages = page.locator('text=/error|Error/i');
    await expect(errorMessages).not.toBeVisible();
  });
});
