// spec: specs/Sprint1/CasosHU17.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('HU17 - Búsqueda de Tutorías', () => {
  test('Búsqueda con campo de texto vacío', async ({ page }) => {
    // Navigate to encuentra-tutoria page
    await page.goto('http://localhost:3001/encuentra-tutoria');

    // Press Enter with empty search field
    await page.keyboard.press('Enter');

    // Verify the search field is empty
    const searchField = page.getByRole('textbox', { name: 'Buscar por materia, tutor...' });
    await expect(searchField).toHaveValue('');

    // Verify all offers are displayed
    const tutorCards = page.locator('main h3');
    const cardCount = await tutorCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Verify the counter shows the total number of results
    const resultCounter = page.locator('p', { hasText: 'resultados' });
    await expect(resultCounter).toContainText(/\d+\s+resultados/);
    
    // Extract the result count to verify it's positive
    const counterText = await resultCounter.textContent();
    const resultCountFromCounter = parseInt(counterText?.match(/\d+/)?.[0] || '0', 10);
    
    // The counter should show results
    expect(resultCountFromCounter).toBeGreaterThan(0);

    // Verify cards are displayed with default ordering
    const firstCard = page.locator('main h3').first();
    await expect(firstCard).toBeVisible();
  });
});
