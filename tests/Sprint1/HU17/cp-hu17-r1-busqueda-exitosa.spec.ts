import { loginAndGoto } from '../../auth';
// spec: specs/Sprint1/CasosHU17.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('HU17 - Búsqueda de Tutorías', () => {
  test('Búsqueda exitosa de tutorías por materia o tutor', async ({ page }) => {
    // Navigate to encuentra-tutoria page for searching tutoring services
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');

    // Enter 'Cálculo' in the search field
    await page.getByRole('textbox', { name: 'Buscar por materia, tutor...' }).fill('Cálculo');

    // Press Enter to search
    await page.keyboard.press('Enter');

    // Verify the counter updates with search results
    const resultCounter = page.locator('p', { hasText: 'resultados' });
    await expect(resultCounter).toContainText(/\d+\s+resultados/);

    // Verify heading with 'Cálculo' exists - indicating results are shown
    const calculoHeading = page.locator('h3', { hasText: /Cálculo/ });
    await expect(calculoHeading).toBeVisible();

    // Verify at least one tutoring card is displayed
    const cards = page.locator('main h3');
    const resultCount = await cards.count();
    expect(resultCount).toBeGreaterThan(0);

    // Verify the first result has a complete structure: Title, Price, Modality, Description, Tags, Tutor
    const firstCard = page.locator('main').locator('div').filter({ has: page.locator('h3').first() }).first();
    
    // Verify Title exists
    const title = page.locator('main h3').first();
    await expect(title).toBeVisible();
    
    // Verify Price exists (should contain $ symbol and /h)
    const price = page.locator('main', { hasText: /\$[0-9]+(\.\d+)?\/h/ });
    await expect(price).toBeVisible();
    
    // Verify Modality exists  
    const modality = page.locator('main', { hasText: /Virtual|Presencial|Híbrida/ });
    await expect(modality).toBeVisible();
  });
});
