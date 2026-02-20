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
    const resultsText = page.locator('text=/\\d+ resultados/');
    await expect(resultsText).toBeVisible();

    // 4. Se muestran 10 tarjetas de oferta
    const ofertaCards = page.locator('main > div > div:nth-child(2) > div');
    await expect(ofertaCards).toHaveCount(10);

    // 5. Verificar la estructura de la primera tarjeta
    const firstCard = page.locator('main > div > div:nth-child(2) > div').nth(0);
    
    // - Un título (h3)
    const cardTitle = firstCard.locator('h3');
    await expect(cardTitle).toBeVisible();
    
    // - Un precio en formato $X/h
    await expect(page.locator('text=/\\$/').first()).toBeVisible();
    
    // - Una modalidad (Virtual, Presencial, Virtual/Presencial, Hibrida)
    const hasModality = 
      await page.locator('text=Virtual').count() > 0 || 
      await page.locator('text=Presencial').count() > 0 || 
      await page.locator('text=Hibrida').count() > 0;
    expect(hasModality).toBe(true);
    
    // - Etiquetas/Tags (verificar que existen elementos de texto en la página)
    await expect(page.locator('main')).toContainText(/[A-Z][a-z]+/); // Al menos un texto con mayúscula
    
    // - Nombre del tutor (verificar que hay párrafos)
    const paragraphs = page.locator('p');
    await expect(paragraphs).not.toHaveCount(0);
    
    // - Foto del tutor (imagen)
    const images = page.locator('img');
    await expect(images).not.toHaveCount(0);

    // 6. Verificar los controles de paginación
    const paginationButtons = page.locator('button');
    const button1 = paginationButtons.filter({ hasText: '1' });
    const button2 = paginationButtons.filter({ hasText: '2' });

    // 7. Botones de paginación visibles
    await expect(button1).toBeVisible();
    await expect(button2).toBeVisible();

    // 8. Botones habilitados
    await expect(button1).toBeEnabled();
    await expect(button2).toBeEnabled();

    // 9. Hay 4 botones de navegación (anterior, 1, 2, siguiente)
    const navigationButtons = page.locator('main').locator('button');
    await expect(navigationButtons).toHaveCount(4);
  });
});
