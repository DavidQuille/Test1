import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-10

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const HOURS = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-10: Verificar selección de máximo número de horarios (todos disponibles)', async ({ page }) => {
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

    // 5. Seleccionar todos los bloques horarios disponibles (7 días × 14 horas = 98 horarios)
    for (const day of DAYS) {
      for (const hour of HOURS) {
        await page.getByRole('button', { name: `Disponibilidad ${day} ${hour}` }).click();
      }
    }

    // Expected Results:
    // - El contador muestra '✓ 98 horarios seleccionados'
    await expect(page.getByText('✓ 98 horarios seleccionados')).toBeVisible();

    // - El botón 'Siguiente Perfil Profesional' permanece funcional
    await expect(page.getByRole('button', { name: 'Siguiente Perfil Profesional →' })).toBeVisible();

    // - El sistema permite avanzar correctamente al Paso 3
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    await expect(page.getByRole('button', { name: 'Perfil Profesional', exact: true })).toBeVisible();
  });
});
