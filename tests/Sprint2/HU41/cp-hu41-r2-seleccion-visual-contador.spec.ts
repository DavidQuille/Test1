import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-R2

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-R2: Verificar la selección visual y actualización del contador al hacer clic en un bloque horario', async ({ page }) => {
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

    // 5. Hacer clic en el bloque de horario 'Lun a 09:00' en la cuadrícula
    const slotLun09 = page.getByRole('button', { name: 'Disponibilidad Lun 09:00' });
    await slotLun09.click();

    // Expected Results:
    // - El bloque horario 'Lun 09:00' cambia visualmente (contiene ✓)
    await expect(slotLun09).toContainText('✓');

    // - Aparece el texto verde centrado sobre la cuadrícula: '✓ 1 horario seleccionado'
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();
  });
});
