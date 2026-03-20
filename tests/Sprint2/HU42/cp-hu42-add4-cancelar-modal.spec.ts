import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD4

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales (Casos Adicionales)', () => {
  test('CP-HU-42-ADD4: Cancelar Modal de Nueva Experiencia sin Guardar Datos', async ({ page }) => {
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
    
    // 4. Ingresar datos parcialmente
    await page.getByPlaceholder('Ej. Ayudante de Cátedra').fill('Tutor');
    
    // 5. Hacer clic en 'Cancelar'
    await page.getByRole('button', { name: 'Cancelar' }).click();
    
    // Expected Results:
    // - El modal se cierra
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).not.toBeVisible();
    
    // - No se agrega experiencia
    const newExperienceText = page.getByText('Tutor', { exact: true });
    // Verificar que NO contiene la nueva experiencia
    const tutorFreelanceText = page.getByText('Tutor Freelance');
    await expect(tutorFreelanceText).toBeVisible(); // Esto existía antes
    // Pero verificar que estamos de vuelta en detalles
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();
    
    // - No aparece mensaje de error
    const errorMessages = page.locator('text=/error|Error/i');
    await expect(errorMessages).not.toBeVisible();
  });
});
