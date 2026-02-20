// spec: specs/Sprint1/CasosHU03.md
// case: CP-HU-03-R2

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Verificación de la navegación a la Página 2 de ofertas mediante paginación', () => {
  test('CP-HU-03-R2: Verificación de la navegación a la Página 2 de ofertas mediante paginación', async ({ page }) => {
    // 1. Navegar a la pantalla 'Encuentra tu Tutoría' (Home Estudiante)
    await page.goto(ENCUENTRA_TUTORIA_URL);

    // 2. Verificar que estamos en la página 1 con al menos algunos resultados
    const resultsText = page.locator('text=/\\d+ resultados/');
    await expect(resultsText).toBeVisible();
    
    const paginationButtons = page.locator('button');
    const button1 = paginationButtons.filter({ hasText: '1' });
    const button2 = paginationButtons.filter({ hasText: '2' });
    
    // Obtener el primer título visible cuando estamos en página 1
    const firstCardPage1 = page.locator('main h3').first();
    const titlePage1 = await firstCardPage1.textContent();

    // 3. Hacer clic en el botón de paginación número '2'
    await button2.click();

    // 4. Esperar a que la lista de ofertas se actualice
    await page.waitForTimeout(500);

    // 5. Obtener el primer título visible cuando estamos en página 2
    const firstCardPage2 = page.locator('main h3').first();
    const titlePage2 = await firstCardPage2.textContent();

    // 6. Verificar que las tarjetas de oferta son diferentes a las de la página 1
    expect(titlePage2).not.toBe(titlePage1);

    // 7. Se muestran las tarjetas correspondientes (debería mostrar los últimos resultados)
    const ofertaCards = page.locator('main > div > div:nth-child(2) > div');
    // En la página 2 debería haber al menos 1 tarjeta (menos que las 10 de la página 1)
    const pageCount = await ofertaCards.count();
    expect(pageCount).toBeGreaterThan(0);
    expect(pageCount).toBeLessThan(10); // Página 2 debe tener menos tarjetas que página 1

    // 8. En los controles de paginación, el botón '2' se activa
    await expect(button2).toBeEnabled();

    // 9. Los botones de navegación '<' y '>' se mantienen visibles
    const navigationButtons = page.locator('main').locator('button');
    // Debe haber al menos 4 botones: anterior, 1, 2, siguiente
    await expect(navigationButtons).toHaveCount(4);

    // 10. Hacer clic en el botón anterior para volver a página 1
    const prevButton = navigationButtons.first();
    await prevButton.click();
    await page.waitForTimeout(500);

    // 11. Verificar que volvemos a ver el título de la página 1
    const firstCardBackToPage1 = page.locator('main h3').first();
    const titleBackToPage1 = await firstCardBackToPage1.textContent();
    expect(titleBackToPage1).toBe(titlePage1);
  });
});
