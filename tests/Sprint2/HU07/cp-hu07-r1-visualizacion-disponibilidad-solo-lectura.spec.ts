// spec: specs/Sprint2/CasosHU07.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAndGoto } from '../../auth';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU07 - Gestionar Disponibilidad', () => {
  test('CP-HU-07-R1: Verificar la visualización correcta de la disponibilidad registrada del tutor en modo solo lectura', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Navegar a la sección 'Gestionar Disponibilidad'
    await page.getByRole('link', { name: 'Disponibilidad Gestionar' }).click();

    // - La pantalla 'Gestionar Disponibilidad' carga correctamente.
    await expect(page).toHaveURL(/\/dashboard\/tutor\/disponibilidad$/);

    // - VALIDACIÓN VISUAL: En la cabecera, se visualiza el texto 'Volver al Panel' a la izquierda y el logo 'Poli Tutorías' a la derecha.
    await expect(page.getByRole('link', { name: 'Volver al Panel' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Poli Tutorías' })).toBeVisible();

    // - El título 'Gestionar Disponibilidad' es visible.
    await expect(page.getByRole('heading', { name: 'Gestionar Disponibilidad' })).toBeVisible();

    // - La descripción 'Haz clic en los horarios que tienes disponibles para ofrecer tutorías.' es visible.
    await expect(page.getByText('Haz clic en los horarios que tienes disponibles para ofrecer tutorías.')).toBeVisible();

    // - La sub-descripción 'Tu horario se mostrará en la zona horaria local (GMT-5).' es visible.
    await expect(page.getByText('Tu horario se mostrará en la zona horaria local (GMT-5).')).toBeVisible();

    // - Se muestra el contador '✓ 4 horarios seleccionados' en color verde.
    const counter = page.locator('p', { hasText: /horarios seleccionados/i }).first();
    await expect(counter).toBeVisible();
    await expect(counter).toContainText(/\d+\s+horarios seleccionados/i);

    // - La cuadrícula de horarios presenta las columnas 'HORA', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' y filas desde las 7:00 hasta las 20:00.
    await expect(page.getByRole('row', { name: /Hora\s+Lun\s+Mar\s+Mié\s+Jue\s+Vie\s+Sáb\s+Dom/ })).toBeVisible();


 


  });
});