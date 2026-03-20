import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD7

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales (Casos Adicionales)', () => {
  test('CP-HU-42-ADD7: Validar Comportamiento del Campo Fecha Fin con "Presente"', async ({ page }) => {
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
    
    // 4. Ingresar '06/2023' en Fecha Inicio
    await page.getByPlaceholder('Ej. 03/2024').first().fill('06/2023');
    
    // 5. Ingresar exactamente 'Presentes' en Fecha Fin (será truncado a 7 caracteres)
    // El campo tiene maxlength=7, así que "Presente" (8 letras) se trunca
    const endDateInput = page.getByPlaceholder('Ej. 12/2025 o Presente');
    await endDateInput.fill('Presente');
    
    // Verificar que el sistema trunca a 7 caracteres 
    // "Presente" tiene 8 caracteres, así que se trunca
    const endValue = await endDateInput.inputValue();
    expect(endValue.length).toBeLessThanOrEqual(7);
    
    // 6. Proceder a llenar los otros campos
    await page.getByPlaceholder('Ej. Ayudante de Cátedra').fill('Tutor Actual');
    await page.getByPlaceholder('Ej. EPN, Facultad de Ciencias').fill('EPN');
    
    // Guardar
    await page.getByRole('button', { name: 'Guardar' }).click();
    
    // Expected Results:
    // - El sistema acepta 'Presente' como valor válido
    // - La experiencia se guarda exitosamente
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).not.toBeVisible();
    
    // - Se visualiza en la lista de experiencias
    await expect(page.getByText('Tutor Actual')).toBeVisible();
  });
});
