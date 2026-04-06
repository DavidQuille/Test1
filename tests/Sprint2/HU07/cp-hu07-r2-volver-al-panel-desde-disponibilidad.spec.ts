// spec: specs/Sprint2/CasosHU07.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAndGoto } from '../../auth';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU07 - Gestionar Disponibilidad', () => {
  test("CP-HU-07-R2: Verificar la navegación correcta al Dashboard Tutor al hacer clic en el enlace 'Volver al Panel'", async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Navegar a la sección 'Gestionar Disponibilidad' (por ejemplo, haciendo clic en el enlace o menú correspondiente desde el Dashboard Tutor).
    await page.getByRole('link', { name: 'Disponibilidad Gestionar' }).click();

    // 3. Hacer clic en el enlace 'Volver al Panel' ubicado en la cabecera de la pantalla 'Gestionar Disponibilidad'.
    const backToPanelLink = page.locator('a[href="/dashboard/tutor"]', { hasText: 'Volver al Panel' }).first();
    await expect(backToPanelLink).toBeVisible();
    await backToPanelLink.click();

    // - El sistema redirige a la pantalla 'Dashboard Tutor'.
    await expect(page).toHaveURL(/\/dashboard\/tutor$/);

    // - VALIDACIÓN VISUAL: La pantalla del 'Dashboard Tutor' (hub central) se carga completamente, mostrando sus elementos característicos.
    await expect(page.getByText('Gestión Rápida')).toBeVisible();
    await expect(page.getByText('Mis Ofertas de Tutorías')).toBeVisible();
    await expect(page.getByRole('button', { name: '+ Nueva Oferta' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Disponibilidad Gestionar horarios' })).toBeVisible();
  });
});