import { loginAndGoto } from '../../auth';
// spec: specs/Sprint1/CasosHU03.md
// case: CP-HU-03-R2

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Verificación de la navegación a la Página 2 de ofertas mediante paginación', () => {
  test('CP-HU-03-R2: Verificación de la navegación a la Página 2 de ofertas mediante paginación', async ({ page }) => {
    // 1. Navegar a la pantalla 'Encuentra tu Tutoría' (Home Estudiante)
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    await page.waitForTimeout(1000);

    // Limpiar cualquier filtro aplicado
    const clearAllButton = page.locator('button', { hasText: 'Limpiar todos' });
    if (await clearAllButton.count() > 0) {
      await clearAllButton.click();
      await page.waitForTimeout(500);
    }

    // 2. Verificar que estamos en la página 1 con resultados
    const resultsText = page.locator('p').filter({ hasText: /\d+ resultados/ });
    await expect(resultsText).toBeVisible({ timeout: 5000 });
    
    // Obtener el primer título de la página 1 - buscar h3 que contienen links (ofertas)
    const ofertaCardsPage1 = page.locator('h3 >> a');
    const count1 = await ofertaCardsPage1.count();
    expect(count1).toBeGreaterThan(0);
    const titlePage1 = await ofertaCardsPage1.nth(0).textContent();
    console.log('Página 1 - Primer título oferta:', titlePage1);

    // 3. Buscar el botón de paginación '2'
    const button2 = page.locator('button').filter({ hasText: '2' }).first();
    const hasPage2 = await button2.isVisible({ timeout: 2000 }).catch(() => false);
    
    expect(hasPage2).toBe(true);

    // 4. Hacer clic en el botón '2'
    await button2.click();
    await page.waitForTimeout(1000);

    // 5. Verificar que estamos en página 2 - el botón '2' debe estar activo/highlighted
    const button2Active = page.locator('button').filter({ hasText: '2' }).first();
    const isPage2Active = await button2Active.evaluate(el => 
      el.getAttribute('class')?.includes('active') || 
      el.getAttribute('class')?.includes('bg-') ||
      el.getAttribute('aria-current') === 'page'
    );
    console.log('¿Botón 2 activo?', isPage2Active);

    // 6. Obtener el primer título visible en página 2
    await page.waitForTimeout(500);
    const ofertaCardsPage2 = page.locator('h3 >> a');
    const count2 = await ofertaCardsPage2.count();
    expect(count2).toBeGreaterThan(0);
    const titlePage2 = await ofertaCardsPage2.nth(0).textContent();
    console.log('Página 2 - Primer título oferta:', titlePage2);

    // 7. Verificar que las tarjetas de oferta son diferentes
    expect(titlePage2?.trim()).not.toBe(titlePage1?.trim());
    console.log('✓ Las ofertas son diferentes entre página 1 y 2');

    // 8. Hacer clic en el botón '1' para volver a página 1
    const button1Back = page.locator('button').filter({ hasText: '1' }).first();
    await button1Back.click();
    await page.waitForTimeout(1000);

    // 9. Verificar que volvemos a ver el título de la página 1
    const ofertaCardsBackPage1 = page.locator('h3 >> a');
    const countBack = await ofertaCardsBackPage1.count();
    expect(countBack).toBeGreaterThan(0);
    const titleBackToPage1 = await ofertaCardsBackPage1.nth(0).textContent();
    console.log('Página 1 (regresado) - Primer título oferta:', titleBackToPage1);
    expect(titleBackToPage1?.trim()).toBe(titlePage1?.trim());
    console.log('✓ Navegación correcta: P1 -> P2 -> P1');
  });
});
