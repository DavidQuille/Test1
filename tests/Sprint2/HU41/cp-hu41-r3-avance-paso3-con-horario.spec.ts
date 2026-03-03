// spec: specs/Sprint2/CasosHU41.md
// case: CP-HU-41-R3

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('HU41 - Define tu Horario (Paso 2)', () => {
  test.fixme('CP-HU-41-R3: Verificar avance al Paso 3 Perfil Profesional con al menos un horario seleccionado', async ({ page }) => {
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

    // 5. Hacer clic en el bloque de horario 'Mar 10:00' para seleccionarlo
    await page.getByRole('button', { name: 'Disponibilidad Mar 10:00' }).click();

    // 6. Verificar que se muestra el texto verde '✓ 1 horario seleccionado'
    await expect(page.getByText('✓ 1 horario seleccionado')).toBeVisible();

    // 7. Hacer clic en el botón 'Siguiente Perfil Profesional'
    await page.getByRole('button', { name: 'Siguiente Perfil Profesional →' }).click();

    // Expected Results:
    // - Se visualiza el paso '3 Perfil Profesional' resaltado
    await expect(page.getByRole('button', { name: 'Perfil Profesional', exact: true })).toBeVisible();

    // - Se muestra el título 'Detalles Profesionales'
    await expect(page.getByRole('heading', { name: 'Detalles Profesionales' })).toBeVisible();

    // - Se muestra el subtítulo 'Añade tu experiencia y materias para destacar'
    await expect(page.getByText('Añade tu experiencia y materias para destacar')).toBeVisible();

    // - Se visualiza el botón 'Finalizar Registro'
    await expect(page.getByRole('button', { name: 'Finalizar Registro' })).toBeVisible();
  });
});
