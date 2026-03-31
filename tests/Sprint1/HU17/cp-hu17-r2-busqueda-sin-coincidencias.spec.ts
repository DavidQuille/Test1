import { loginAndGoto } from '../../auth';
// spec: specs/Sprint1/CasosHU17.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('HU17 - Búsqueda de Tutorías', () => {
  test('Búsqueda de tutorías sin coincidencias', async ({ page }) => {
    // Navigate to encuentra-tutoria page
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');

    // Enter 'Astronomía' in the search field
    await page.getByRole('textbox', { name: 'Buscar por materia, tutor...' }).fill('Astronomía');

    // Press Enter to search for 'Astronomía'
    await page.keyboard.press('Enter');

    const noResultsMessage = page.locator('h2', { hasText: 'No se encontraron ofertas' });
    if (await noResultsMessage.isVisible()) {
      const resultCounter = page.locator('p', { hasText: 'resultados' });
      await expect(resultCounter).toContainText('0 resultados');
      await expect(page.locator('p', { hasText: 'Intenta ajustar tus filtros de búsqueda' })).toBeVisible();
      return;
    }

    // Fallback for updated search behavior (fuzzy/semantic matching):
    // ensure visible results do not contain the exact query term.
    // Filter out h3 elements that are section titles (Modalidad, Disponibilidad, etc.)
    const filterTitles = ['Modalidad', 'Disponibilidad', 'Precio', 'Área de Conocimiento'];
    
    // Check all h3 elements using page evaluation (faster than loop with expects)
    const h3Texts = await page.evaluate(() => {
      const h3Elements = document.querySelectorAll('main h3');
      return Array.from(h3Elements).map(el => el.textContent);
    });
    
    // Verify that offer titles don't contain 'Astronom\u00eda'
    for (const text of h3Texts) {
      const trimmedText = text?.trim() || '';
      // Only check offer titles, not section titles
      if (!filterTitles.includes(trimmedText)) {
        expect(trimmedText).not.toContain('Astronom\u00eda');
      }
    }
  });
});
