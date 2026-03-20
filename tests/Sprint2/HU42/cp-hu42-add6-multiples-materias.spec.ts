import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD6

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales (Casos Adicionales)', () => {
  test('CP-HU-42-ADD6: Agregar Múltiples Materias Exitosamente', async ({ page }) => {
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
    
    // 3. Agregar 'Física'
    const materiaInput = page.getByPlaceholder(/Escribe una materia/i);
    await materiaInput.fill('Física');
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // 4. Agregar 'Química'
    await materiaInput.fill('Química');
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // 5. Agregar 'Álgebra'
    await materiaInput.fill('Álgebra');
    await page.getByRole('button', { name: '+ Agregar' }).click();
    
    // 6. Verificar que todas las materias aparecen como etiquetas
    await expect(page.getByText('Física')).toBeVisible();
    await expect(page.getByText('Química')).toBeVisible();
    await expect(page.getByText('Álgebra')).toBeVisible();
    
    // Expected Results:
    // - Se visualizan tres etiquetas (pills)
    // - Cada etiqueta tiene un botón '×'
    const deleteButtons = page.getByRole('button', { name: '×' });
    const deleteCount = await deleteButtons.count();
    expect(deleteCount).toBeGreaterThanOrEqual(3);
    
    // - El campo se limpia después de cada agregación
    await expect(materiaInput).toHaveValue('');
    
    // - No aparece mensaje de error
    const errorMessages = page.locator('text=/error|Error/i');
    await expect(errorMessages).not.toBeVisible();
  });
});
