import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-09

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-09: Verificar selección de horarios después de mostrar mensaje de error', async ({ page }) => {
    // 1. Navegar a la página de registro de tutor
    await loginAndGoto(page, TUTOR_REGISTRO_URL);

    // 2. Llenar los campos del Paso 1 (Datos Básicos)
    await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('Daniela Castro');
    await page.getByRole('textbox', { name: 'Número de WhatsApp' }).fill('593991234567');
    await page.getByLabel('Facultad').selectOption('FIS - Sistemas');
    await page.getByLabel('Semestre Actual').selectOption('4° Semestre');
    await page.getByRole('textbox', { name: 'Biografía Corta' }).fill('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');

    // 3. Avanzar al Paso 2 - Define tu Horario
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();

    // 4. Verificar que estamos en el Paso 2
    await expect(page.getByRole('heading', { name: 'Define tu Horario' })).toBeVisible();

    // 5. Hacer clic en 'Siguiente Perfil Profesional' sin seleccionar ningún horario
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();

    // 6. Verificar que aparece el error
    await expect(page.getByText('Selecciona al menos un horario disponible')).toBeVisible();

    // 7. Seleccionar un horario 'Lun 09:00'
    await page.getByRole('button', { name: 'Disponibilidad Lun 09:00' }).click();

    // Expected Results:
    // - El mensaje de error desaparece
    await expect(page.getByText('Selecciona al menos un horario disponible')).not.toBeVisible();

    // - El contador verde aparece con '✓ 1 horario seleccionado'
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();

    // 8. Hacer clic en 'Siguiente Perfil Profesional' para avanzar
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();

    // - El sistema permite avanzar correctamente al Paso 3
    await expect(page.getByRole('button', { name: 'Perfil Profesional', exact: true })).toBeVisible();
  });
});
