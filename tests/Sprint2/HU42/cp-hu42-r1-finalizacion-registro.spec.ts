import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-R1

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales', () => {
  test('CP-HU-42-R1: Finalización Exitosa del Registro de Perfil de Tutor', async ({ page }) => {
    // 1. Iniciar sesión como Tutor (Paso 1 - Datos Básicos)
    await loginAndGoto(page, TUTOR_REGISTRO_URL);
    
    // 2. Llenar los campos obligatorios del Paso 1 con datos aleatorios
    const nombreAleatorio = getNombreAleatorio();
    const numeroAleatorio = getNumeroWhatsAppAleatorio();
    const biografiaAleatoria = getBiografiaAleatoria();
    
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill(nombreAleatorio);
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill(numeroAleatorio);
    await page.getByLabel('Facultad').selectOption('FIS - Sistemas');
    await page.getByLabel('Semestre Actual').selectOption('4° Semestre');
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill(biografiaAleatoria);
    
    // 3. Avanzar a Paso 2 (Disponibilidad)
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();
    
    // Esperar a que cargue el Paso 2 y seleccionar un horario
    await expect(page.getByRole('heading', { name: 'Define tu Horario' })).toBeVisible();
    
    // Seleccionar el primer horario disponible
    const availabilityButtons = page.locator('button[class*="transition-colors"][class*="font-semibold"]').nth(5);
    await availabilityButtons.click();
    
    // Avanzar a Paso 3 (Detalles Profesionales)
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    
    // 4. Verificar que estamos en Detalles Profesionales
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();
    
    // Los campos opcionales están vacíos (experiencia y materias)
    // 5. Hacer clic en 'Finalizar Registro'
    await page.getByRole('button', { name: 'Finalizar Registro' }).click();
    
    // Expected Results:
    // - El sistema finaliza el registro sin alertas
    // - Redirige a dashboard
    await expect(page).toHaveURL('http://localhost:3001/dashboard/tutor');
    
    // - Se visualiza el dashboard del tutor
    await expect(page.getByRole('heading', { name: /Mis Ofertas de Tutorías/i })).toBeVisible();
  });
});
