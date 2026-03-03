// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-06

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-06: Verificar selección de múltiples horarios en rango nocturno (18:00-20:00)', async ({ page }) => {
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

    // 5. Seleccionar horarios solo en rango nocturno: Lun 18:00, Vie 19:00, Sáb 20:00
    await page.getByRole('button', { name: 'Disponibilidad Lun 18:00' }).click();
    await page.getByRole('button', { name: 'Disponibilidad Vie 19:00' }).click();
    await page.getByRole('button', { name: 'Disponibilidad Sáb 20:00' }).click();

    // Expected Results:
    // - Los bloques horarios nocturnos están seleccionados
    await expect(page.getByRole('button', { name: 'Disponibilidad Lun 18:00' })).toContainText('✓');
    await expect(page.getByRole('button', { name: 'Disponibilidad Vie 19:00' })).toContainText('✓');
    await expect(page.getByRole('button', { name: 'Disponibilidad Sáb 20:00' })).toContainText('✓');

    // - El contador muestra '✓ 3 horarios seleccionados'
    await expect(page.getByText('✓ 3 horarios seleccionados')).toBeVisible();

    // - El sistema permite avanzar correctamente al Paso 3
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    await expect(page.getByRole('button', { name: 'Perfil Profesional', exact: true })).toBeVisible();
  });
});
