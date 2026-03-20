import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU02.md
// case: CP-HU-02-R2
// title: Redirección al modal de creación de oferta desde el dashboard con ofertas

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('Dashboard de Tutor - Casos HU02', () => {
  test('CP-HU-02-R2: Redirección al modal de creación de oferta', async ({ page }) => {
    // 1. Navegar a la URL del dashboard del tutor
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);

    // 2. Esperar a que la página cargue completamente
    await page.waitForLoadState('domcontentloaded');

    // Pre-condición: El tutor está logueado y está en la sección "Mis Ofertas de Tutorías"

    // 3. Hacer clic en el botón "+ Nueva Oferta"
    const newOfferButton = page.getByRole('button', { name: /\+?\s*Nueva Oferta/i }).first();
    await expect(newOfferButton).toBeVisible();
    await newOfferButton.click();

    // 4. Esperar a que se abra el modal de creación
    // y verificar que el modal sea visible
    const modalHeading = page.getByRole('heading', { name: 'Nueva Oferta de Tutoría' });
    await expect(modalHeading).toBeVisible();

    // Verificaciones adicionales del modal
    // 5. Verificar que se visualiza un modal superpuesto a la pantalla actual
    // para la creación de una nueva oferta de tutoría
    
    // Verificar que los campos del formulario son visibles
    const titleInput = page.getByPlaceholder(/Ej. Cálculo Vectorial/);
    await expect(titleInput).toBeVisible();

    // Verificar que el botón de cerrar modal está presente
    const closeButton = page.getByRole('button', { name: 'Cerrar modal' });
    await expect(closeButton).toBeVisible();

    // Verificar que el formulario tiene los campos esperados
    const priceInput = page.getByRole('spinbutton');
    await expect(priceInput).toBeVisible();

    const modalityCombobox = page.getByRole('combobox');
    await expect(modalityCombobox).toBeVisible();

    // Verificar que los botones de acción del modal están presentes
    const cancelButton = page.getByRole('button', { name: 'Cancelar' });
    await expect(cancelButton).toBeVisible();

    const publishButton = page.getByRole('button', { name: 'Publicar Oferta' });
    await expect(publishButton).toBeVisible();
  });
});
