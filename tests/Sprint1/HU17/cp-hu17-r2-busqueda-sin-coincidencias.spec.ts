// spec: specs/Sprint1/CasosHU17.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('HU17 - Búsqueda de Tutorías', () => {
  test('Búsqueda de tutorías sin coincidencias', async ({ page }) => {
    // Navigate to encuentra-tutoria page
    await page.goto('http://localhost:3001/encuentra-tutoria');

    // Enter 'Astronomía' in the search field
    await page.getByRole('textbox', { name: 'Buscar por materia, tutor...' }).fill('Astronomía');

    // Press Enter to search for 'Astronomía'
    await page.keyboard.press('Enter');

    // Verify the counter shows "0 resultados"
    const resultCounter = page.locator('p', { hasText: 'resultados' });
    await expect(resultCounter).toContainText('0 resultados');

    // Verify the "No se encontraron ofertas" message is visible
    const noResultsMessage = page.locator('h2', { hasText: 'No se encontraron ofertas' });
    await expect(noResultsMessage).toBeVisible();

    // Verify the subtitle message is visible
    const subtitle = page.locator('p', { hasText: 'Intenta ajustar tus filtros de búsqueda' });
    await expect(subtitle).toBeVisible();

    // Verify no tutoring cards are displayed
    const cards = page.locator('main h3');
    const cardCount = await cards.count();
    expect(cardCount).toBe(0);
  });
});
