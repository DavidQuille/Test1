// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-01

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-01: Verificar la navegabilidad hacia atrás al Paso 1 Datos Básicos', async ({ page }) => {
    // 1. Navegar a la página de registro de tutor
    await page.goto(TUTOR_REGISTRO_URL);

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

    // 5. Hacer clic en el botón inferior izquierdo '← Atrás Datos Básicos'
    await page.getByRole('button', { name: '← Atrás Datos Básicos' }).click();

    // Expected Results:
    // - El sistema redirige a la pantalla del Paso 1 'Datos Básicos' (título principal)
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();

    // - La información previamente ingresada se conserva intacta
    await expect(page.getByRole('textbox', { name: 'Nombre Completo' })).toHaveValue('Daniela Castro');
    await expect(page.getByRole('textbox', { name: 'Número de WhatsApp' })).toHaveValue('593991234567');
    await expect(page.getByLabel('Facultad')).toHaveValue('FIS - Sistemas');
    await expect(page.getByLabel('Semestre Actual')).toHaveValue('4° Semestre');
    await expect(page.getByRole('textbox', { name: 'Biografía Corta' })).toHaveValue('Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.');
  });
});
