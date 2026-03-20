import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R7

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R7: Navegación hacia Atrás al Paso 2 Disponibilidad', async ({ page }) => {
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
    
    // 3. Seleccionar un horario en Paso 2
    const availabilityButtons = page.locator('button[class*="transition-colors"][class*="font-semibold"]').nth(5);
    await availabilityButtons.click();
    
    // Verificar que está seleccionado (debe aparecer el checkmark)
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();
    
    // Avanzar a Paso 3
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();
    
    // 4. Hacer clic en '← Atrás Disponibilidad'
    await page.getByRole('button', { name: '← Atrás Disponibilidad' }).click();
    
    // Expected Results:
    // - El sistema redirige a la pantalla del Paso 2
    await expect(page.getByRole('heading', { name: 'Define tu Horario' })).toBeVisible();
    
    // - Los bloques horarios previamente seleccionados se conservan intactos
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();
  });
});
