// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-02

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-02: Verificar selección de múltiples horarios en diferentes días de la semana', async ({ page }) => {
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

    // 5. Seleccionar 'Lun 09:00', 'Mar 14:00', 'Mié 11:00', 'Jue 15:00' y 'Vie 16:00'
    await page.getByRole('button', { name: 'Disponibilidad Lun 09:00' }).click();
    await page.getByRole('button', { name: 'Disponibilidad Mar 14:00' }).click();
    await page.getByRole('button', { name: 'Disponibilidad Mié 11:00' }).click();
    await page.getByRole('button', { name: 'Disponibilidad Jue 15:00' }).click();
    await page.getByRole('button', { name: 'Disponibilidad Vie 16:00' }).click();

    // Expected Results:
    // - Cada bloque seleccionado contiene ícono '✓'
    await expect(page.getByRole('button', { name: 'Disponibilidad Lun 09:00' })).toContainText('✓');
    await expect(page.getByRole('button', { name: 'Disponibilidad Mar 14:00' })).toContainText('✓');
    await expect(page.getByRole('button', { name: 'Disponibilidad Mié 11:00' })).toContainText('✓');
    await expect(page.getByRole('button', { name: 'Disponibilidad Jue 15:00' })).toContainText('✓');
    await expect(page.getByRole('button', { name: 'Disponibilidad Vie 16:00' })).toContainText('✓');

    // - El contador superior muestra '✓ 5 horarios seleccionados'
    await expect(page.getByText('✓ 5 horarios seleccionados')).toBeVisible();

    // - El sistema permite navegar al Paso 3
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();
    await expect(page.getByRole('button', { name: 'Perfil Profesional', exact: true })).toBeVisible();
  });
});
