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

    // 3. Se visualiza un número de resultados en la cabecera (verificar que existe el texto)
    const resultsText = page.locator('p', { hasText: /\d+ resultados/ });
    await expect(resultsText).toBeVisible();

    // 4. Se muestran 10 tarjetas de oferta
    const ofertaCards = page.locator('main h3');
    await expect(ofertaCards).toHaveCount(10);

    // 5. Verificar la estructura de la primera tarjeta
    const firstCardTitle = page.locator('main h3').nth(0);
    
    // - Un título (h3)
    await expect(firstCardTitle).toBeVisible();
    
    // - Un precio en formato $X/h
    const priceElements = page.locator('text=/\\$[0-9]+(\\.\\d+)?\/h/');
    await expect(priceElements).not.toHaveCount(0);
    
    // - Una modalidad (Virtual, Presencial, Virtual/Presencial, Hibrida)
    const modalityCheck = 
      await page.locator('text=Virtual').count() > 0 || 
      await page.locator('text=Presencial').count() > 0 || 
      await page.locator('text=Hibrida').count() > 0 ||
      await page.locator('text=Híbrida').count() > 0;
    expect(modalityCheck).toBe(true);
    
    // - Descripción/texto en las tarjetas
    const paragraphs = page.locator('main p');
    await expect(paragraphs).not.toHaveCount(0);
    
    // - Foto del tutor (imagen)
    const images = page.locator('main img');
    await expect(images.count()).resolves.toBeGreaterThan(0);

    // 6 & 7. Verificar los controles de paginación - Botones visibles
    const button1 = page.locator('button', { hasText: '1' });
    const button2 = page.locator('button', { hasText: '2' });

    await expect(button1).toBeVisible();
    await expect(button2).toBeVisible();

    // 8. Botones habilitados
    await expect(button1).toBeEnabled();
    await expect(button2).toBeEnabled();

    // 9. Hay 4 botones de navegación (anterior, 1, 2, siguiente)
    const navigationButtons = page.locator('main button');
    await expect(navigationButtons).toHaveCount(4);
  });
});
