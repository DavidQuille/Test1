import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU01.md
// case: CP-HU-01-R1 - Publicación exitosa de una oferta de tutoría

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R1: Publicación exitosa de una oferta de tutoría', async ({ page }) => {
    // 1. Login and navigate to tutor dashboard (loginAndGoto already does the navigation)
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);
    
    // Wait for dashboard to load
    await page.waitForTimeout(1000);
    
    // Verify we are on the right page by checking for the button
    const newOfferBtn = page.getByRole('button', { name: '+ Nueva Oferta' }).first();
    await newOfferBtn.click();
    
    // Wait for modal to appear
    await page.waitForTimeout(1500);

    // Generate unique title
    const uniqueTitle = `Matemática - ${Date.now()}`;

    // 2. Fill in the title
    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill(uniqueTitle);
    await page.waitForTimeout(300);

    // 3. Fill price
    const priceInput = page.locator('input[type="number"]');
    await priceInput.fill('10');
    await page.waitForTimeout(300);

    // 4. Select category
    const categorySearch = page.getByRole('textbox', { name: 'Buscar categorías...' });
    await categorySearch.fill('Matemática');
    await page.waitForTimeout(1000);
    
    const matematicaBtn = page.getByRole('button', { name: 'Matemática' }).first();
    await matematicaBtn.click();
    await page.waitForTimeout(600);

    // 5. Fill description
    const descInput = page.getByRole('textbox', { name: /Describe qué incluye tu tutoría/ });
    await descInput.fill('Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie.');
    await page.waitForTimeout(300);

    // Close the categories dropdown by clicking outside it (on the title field)
    await titleInput.click();
    await page.waitForTimeout(500);

    // 6. Click publish button
    const publishBtn = page.getByRole('button', { name: 'Publicar Oferta' });
    await publishBtn.click();
    await page.waitForTimeout(2000);

    // Verify success
    await expect(page.getByText('Oferta creada exitosamente')).toBeVisible({ timeout: 8000 });
  });
});


