import { test, expect } from '@playwright/test';
import { createTutorAccount } from '../../auth';

// spec: specs/Sprint2/CasosHU34.md
// case: CP-HU-34-R2

test.describe('Validación de campos obligatorios vacíos al registrar Datos Básicos', () => {
  test('CP-HU-34-R2: Validación de campos obligatorios vacíos', async ({ page }) => {
    // Create a tutor account first
    const timestamp = Date.now();
    const uniqueEmail = `d.q.r2.${timestamp}@epn.edu.ec`;
    await createTutorAccount(page, uniqueEmail, '123456');

    // Click 'Siguiente Disponibilidad' button without filling any fields
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

