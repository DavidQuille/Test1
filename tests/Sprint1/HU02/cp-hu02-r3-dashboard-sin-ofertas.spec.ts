import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU02.md
// case: CP-HU-02-R3
// title: Visualización del Dashboard de Tutor

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('Dashboard de Tutor - Casos HU02', () => {
  test.fixme('CP-HU-02-R3: Visualización Dashboard', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Wait for page to load
    await page.waitForTimeout(1500);

    // 3. Verify logo is visible
    const logoLink = page.getByRole('link', { name: /Poli.*Tutorías/ });
    await expect(logoLink).toBeVisible();

    // 4. Verify logout button exists
    const logoutButton = page.getByRole('button', { name: 'Salir' });
    await expect(logoutButton).toBeVisible();

    // 5. Verify the "Mis Ofertas de Tutorías" heading
    const heading = page.getByRole('heading', { name: 'Mis Ofertas de Tutorías' });
    await expect(heading).toBeVisible();

    // 6. Verify "+ Nueva Oferta" button
    const createOfferButton = page.getByRole('button', { name: /\+?\s*Nueva Oferta/ });
    await expect(createOfferButton).toBeVisible();
  });
});
