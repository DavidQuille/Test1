import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-R4

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-R4: Verificar la deselección de un bloque horario y la actualización del contador', async ({ page }) => {
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

    // 5. Seleccionar los bloques de horario 'Mié 11:00' y 'Mié 12:00'
    const slotMie11 = page.getByRole('button', { name: 'Disponibilidad Mié 11:00' });
    const slotMie12 = page.getByRole('button', { name: 'Disponibilidad Mié 12:00' });
    await slotMie11.click();
    await slotMie12.click();

    // 6. Verificar que se muestra el texto verde '✓ 2 horarios seleccionados'
    await expect(page.getByText('✓ 2 horarios seleccionados')).toBeVisible();

    // 7. Hacer clic nuevamente en el bloque 'Mié 11:00' para deseleccionarlo
    await slotMie11.click();

    // Expected Results:
    // - El bloque 'Mié 11:00' ya no contiene el ícono '✓'
    await expect(slotMie11).not.toContainText('✓');

    // - El contador disminuye mostrando '✓ 1 horario seleccionado'
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();

    // - El bloque 'Mié 12:00' sigue seleccionado
    await expect(slotMie12).toContainText('✓');
  });
});
