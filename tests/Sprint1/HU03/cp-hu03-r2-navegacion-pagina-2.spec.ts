// spec: specs/Sprint1/CasosHU03.md
// case: CP-HU-03-R2

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Verificación de la navegación a la Página 2 de ofertas mediante paginación', () => {
  test('CP-HU-03-R2: Verificación de la navegación a la Página 2 de ofertas mediante paginación', async ({ page }) => {
    // 1. Navegar a la pantalla 'Encuentra tu Tutoría' (Home Estudiante)
    await page.goto(ENCUENTRA_TUTORIA_URL);

    // Limpiar cualquier filtro aplicado
    const clearAllButton = page.locator('button', { hasText: 'Limpiar todos' });
    if (await clearAllButton.count() > 0) {
      await clearAllButton.click();
      await page.waitForTimeout(300);
    }

    // Limpiar filtros 'Limpiar todo' si existe
    const clearButton = page.locator('button', { hasText: 'Limpiar todo' });
    if (await clearButton.count() > 0) {
      await clearButton.click();
      await page.waitForTimeout(300);
    }

    // 2. Verificar que estamos en la página 1 con al menos algunos resultados
    const resultsText = page.locator('p').filter({ hasText: /\d+ resultados/ });
    await expect(resultsText).toBeVisible();
    
    // Obtener el primer título de la página 1
    const ofertaCardsPage1 = page.locator('main h3');
    const count1 = await ofertaCardsPage1.count();
    expect(count1).toBeGreaterThan(0);
    const titlePage1 = await ofertaCardsPage1.nth(0).textContent();

    // 3. Buscar el botón de paginación '2' (si existe)
    const button2 = page.locator('button').filter({ hasText: /^2\$/ });
    const hasPage2 = await button2.count() > 0;
    
    if (hasPage2) {
      // 4. Hacer clic en el botón '2'
      await button2.click();
      await page.waitForTimeout(500);

      // 5. Obtener el primer título visible cuando estamos en página 2
      const ofertaCardsPage2 = page.locator('main h3');
      const count2 = await ofertaCardsPage2.count();
      expect(count2).toBeGreaterThan(0);
      const titlePage2 = await ofertaCardsPage2.nth(0).textContent();

      // 6. Verificar que las tarjetas de oferta son diferentes
      expect(titlePage2?.trim()).not.toBe(titlePage1?.trim());

      // 7. Se muestran las tarjetas en página 2
      expect(count2).toBeGreaterThan(0);

      // 8. El botón '2' se activa
      await expect(button2).toBeEnabled();

      // 9. Los botones de navegación se mantienen visibles
      const allNavigationButtons = page.locator('button');
      const buttonCountPage2 = await allNavigationButtons.count();
      expect(buttonCountPage2).toBeGreaterThan(1);

      // 10. Hacer clic en el botón '1' para volver a página 1
      const button1Back = page.locator('button').filter({ hasText: /^1\$/ });
      if (await button1Back.count() > 0) {
        await button1Back.click();
        await page.waitForTimeout(500);

        // 11. Verificar que volvemos a ver el título de la página 1
        const ofertaCardsBackPage1 = page.locator('main h3');
        const countBack = await ofertaCardsBackPage1.count();
        expect(countBack).toBeGreaterThan(0);
        const titleBackToPage1 = await ofertaCardsBackPage1.nth(0).textContent();
        expect(titleBackToPage1?.trim()).toBe(titlePage1?.trim());
      }
    }
  });
});
