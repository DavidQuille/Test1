// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-03

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

const WED_SLOTS = [
  'Disponibilidad Mié 07:00',
  'Disponibilidad Mié 08:00',
  'Disponibilidad Mié 09:00',
  'Disponibilidad Mié 10:00',
  'Disponibilidad Mié 11:00',
  'Disponibilidad Mié 12:00',
  'Disponibilidad Mié 13:00',
  'Disponibilidad Mié 14:00',
  'Disponibilidad Mié 15:00',
  'Disponibilidad Mié 16:00',
  'Disponibilidad Mié 17:00',
  'Disponibilidad Mié 18:00',
  'Disponibilidad Mié 19:00',
  'Disponibilidad Mié 20:00',
];

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-03: Verificar selección de todos los horarios de un día específico', async ({ page }) => {
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

    // 5. Seleccionar todos los horarios del Miércoles (Mié 07:00 hasta 20:00 = 14 bloques)
    for (const slot of WED_SLOTS) {
      await page.getByRole('button', { name: slot }).click();
    }

    // Expected Results:
    // - Los 14 bloques del miércoles contienen el ícono '✓'
    for (const slot of WED_SLOTS) {
      await expect(page.getByRole('button', { name: slot })).toContainText('✓');
    }

    // - El contador superior muestra '✓ 14 horarios seleccionados'
    await expect(page.getByText('✓ 14 horarios seleccionados')).toBeVisible();
  });
});
