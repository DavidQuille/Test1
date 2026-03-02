// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R2

import { test, expect } from '@playwright/test';
import { TUTOR_REGISTRO_URL } from '../../config';

test.describe('Validación de campos obligatorios vacíos al registrar Datos Básicos', () => {
  test('CP-HU-34-R2: Validación de campos obligatorios vacíos', async ({ page }) => {
    // 1. Navigate to the tutor registration page
    await page.goto(TUTOR_REGISTRO_URL);

    // 7. Click 'Siguiente Disponibilidad' button without filling any fields
    await page.getByRole('button', { name: 'Siguiente Disponibilidad →' }).click();

    // Expected Results:
    // - System remains on 'Completa tu Perfil' screen
    await expect(page.getByRole('heading', { name: 'Completa tu Perfil' })).toBeVisible();

    // - Error message 'El nombre es obligatorio' shows in red below 'Nombre Completo'
    await expect(page.getByRole('paragraph').filter({ hasText: 'El nombre es obligatorio' })).toBeVisible();

    // - Error message 'El número de WhatsApp es obligatorio' shows in red below 'Número de WhatsApp'
    await expect(page.getByRole('paragraph').filter({ hasText: 'El número de WhatsApp es obligatorio' })).toBeVisible();

    // - Error message 'Selecciona tu facultad' shows in red below 'Facultad'
    await expect(page.getByRole('paragraph').filter({ hasText: 'Selecciona tu facultad' })).toBeVisible();

    // - Error message 'Selecciona tu semestre' shows in red below 'Semestre Actual'
    await expect(page.getByRole('paragraph').filter({ hasText: 'Selecciona tu semestre' })).toBeVisible();

    // - Error message 'La biografía es obligatoria' shows in red below 'Biografía Corta'
    await expect(page.getByRole('paragraph').filter({ hasText: 'La biografía es obligatoria' })).toBeVisible();
  });
});
