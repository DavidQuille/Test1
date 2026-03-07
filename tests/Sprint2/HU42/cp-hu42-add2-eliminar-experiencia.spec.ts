// spec: specs/Sprint2/CasosHU42.md
// case: CP-HU-42-ADD2

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';
import { getNombreAleatorio, getNumeroWhatsAppAleatorio, getBiografiaAleatoria } from './utils';

test.describe('HU42 - Detalles Profesionales (Casos Adicionales)', () => {
  test('CP-HU-42-ADD2: Eliminar una Experiencia Agregada', async ({ page }) => {
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
    
    // Ya hay experiencias precargadas, vamos a eliminar la primera nueva que agreguemos
    // 3. Abrir modal de Nueva Experiencia
    await page.getByRole('button', { name: '+ Añadir Experiencia' }).click();
    
    // 4. Llenar los campos
    await page.getByPlaceholder('Ej. Ayudante de Cátedra').fill('Tutor de Prueba');
    await page.getByPlaceholder('Ej. EPN, Facultad de Ciencias').fill('Universidad Test');
    await page.getByPlaceholder('Ej. 03/2024').first().fill('01/2023');
    await page.getByPlaceholder('Ej. 12/2025 o Presente').fill('12/2023');
    
    // 5. Guardar
    await page.getByRole('button', { name: 'Guardar' }).click();
    
    // Esperar a que se cierre el modal
    await expect(page.getByRole('heading', { name: 'Nueva Experiencia' })).not.toBeVisible();
    
    // Verificar que aparezca la experiencia
    await expect(page.getByText('Tutor de Prueba')).toBeVisible();
    
    // 6. Hacer clic en el botón '×' para eliminarla (última agregada)
    const deleteButtons = page.getByRole('button', { name: 'Eliminar experiencia' });
    const deleteButtonCount = await deleteButtons.count();
    
    // Hacer clic en el último botón de eliminar (la que acabamos de agregar)
    await deleteButtons.last().click();
    
    // Expected Results:
    // - La experiencia se elimina inmediatamente
    await expect(page.getByText('Tutor de Prueba')).not.toBeVisible();
    
    // - No aparecen mensajes de error
    const errorMessages = page.locator('text=/error|Error/i');
    await expect(errorMessages).not.toBeVisible();
  });
});
