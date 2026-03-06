// spec: specs/Sprint1/CasosHU03.md
// case: CP-HU-03-R1

import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

test.describe('Verificación de la visualización inicial de ofertas en la Página 1', () => {
  test('CP-HU-03-R1: Verificación de la visualización inicial de ofertas en la Página 1', async ({ page }) => {
    // 1. Navegar a la pantalla 'Encuentra tu Tutoría' (Home Estudiante)
    await page.goto(ENCUENTRA_TUTORIA_URL);

    // 2. Se visualiza la pantalla 'Encuentra tu Tutoría'
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);

    // 3. Se visualiza un número de resultados en la cabecera
    const resultsText = page.locator('p', { hasText: /\d+ resultados/ });
    await expect(resultsText).toBeVisible();

    // 4. Se muestran tarjetas de oferta (h3 con los títulos de las tutorías)
    const ofertaCards = page.locator('main h3');
    const cardCount = await ofertaCards.count();
    // Verificar que hay h3 (títulos de ofertas)
    expect(cardCount).toBeGreaterThan(0);

    // 5. Verificar la estructura de la primera tarjeta - que es visible y tiene contenido
    const firstCardTitle = ofertaCards.nth(0);
    await expect(firstCardTitle).toBeVisible();
    
    // Verificar que el título tiene contenido
    const titleText = await firstCardTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.trim().length).toBeGreaterThan(0);
  });
});
