// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-ADD-07

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test('CP-HU-41-ADD-07: Verificar deselección total después de múltiples selecciones', async ({ page }) => {
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

    // 5. Seleccionar múltiples horarios: Lun 09:00, Mar 14:00, Mié 11:00, Jue 15:00
    const slotLun09 = page.getByRole('button', { name: 'Disponibilidad Lun 09:00' });
    const slotMar14 = page.getByRole('button', { name: 'Disponibilidad Mar 14:00' });
    const slotMie11 = page.getByRole('button', { name: 'Disponibilidad Mié 11:00' });
    const slotJue15 = page.getByRole('button', { name: 'Disponibilidad Jue 15:00' });

    await slotLun09.click();
    await slotMar14.click();
    await slotMie11.click();
    await slotJue15.click();

    // 6. Verificar que el contador muestra '✓ 4 horarios seleccionados'
    await expect(page.getByText('✓ 4 horarios seleccionados')).toBeVisible();

    // 7. Deseleccionar todos uno por uno: contador 4 → 3 → 2 → 1 → 0
    await slotLun09.click();
    await expect(page.getByText('✓ 3 horarios seleccionados')).toBeVisible();

    await slotMar14.click();
    await expect(page.getByText('✓ 2 horarios seleccionados')).toBeVisible();

    await slotMie11.click();
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();

    await slotJue15.click();

    // Expected Results:
    // - Cada bloque deseleccionado ya no contiene '✓'
    await expect(slotLun09).not.toContainText('✓');
    await expect(slotMar14).not.toContainText('✓');
    await expect(slotMie11).not.toContainText('✓');
    await expect(slotJue15).not.toContainText('✓');

    // - El texto del contador desaparece o muestra 0 horarios
    await expect(page.getByText('✓ 4 horarios seleccionados')).not.toBeVisible();
    await expect(page.getByText('✓ 1 horario seleccionado')).not.toBeVisible();
  });
});
