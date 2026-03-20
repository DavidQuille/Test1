import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-R1

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-R1: Verificar bloqueo de navegación al intentar avanzar sin seleccionar horarios', async ({ page }) => {
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

    // 5. Asegurarse de que no hay ningún bloque de horario seleccionado
    // y hacer clic en 'Siguiente Perfil Profesional' sin seleccionar
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();

    // Expected Results:
    // - El sistema bloquea la navegación
    await expect(page).toHaveURL(TUTOR_REGISTRO_URL);

    // - Se muestra el texto rojo 'Selecciona al menos un horario disponible' encima de la cuadrícula
    await expect(page.getByText('Selecciona al menos un horario disponible')).toBeVisible();
  });
});
