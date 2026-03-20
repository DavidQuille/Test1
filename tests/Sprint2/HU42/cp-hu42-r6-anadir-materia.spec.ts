import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R6

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R6: Añadir Materia como Etiqueta (Pill)', async ({ page }) => {
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
    
    // 3. Localizar la sección para añadir materias
    const materiaInput = page.getByPlaceholder(/Escribe una materia/i);
    await expect(materiaInput).toBeVisible();
    
    // 4. Ingresar 'Cálculo'
    await materiaInput.fill('Cálculo');
    
    // 5. Hacer clic en '+ Agregar'
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // Expected Results:
    // - El campo de texto se limpia
    await expect(materiaInput).toHaveValue('');
    
    // - Aparece una etiqueta (pill) con texto 'Cálculo' (exacto)
    const tagElement = page.getByText('Cálculo', { exact: true });
    await expect(tagElement).toBeVisible();
    
    // - La etiqueta incluye un botón '×' para eliminar
    const deleteButton = tagElement.locator('..').locator('button:has-text("×")');
    await expect(deleteButton).toBeTruthy();
  });
});
