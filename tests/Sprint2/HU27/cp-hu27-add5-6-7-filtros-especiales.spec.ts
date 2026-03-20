import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD5, ADD6, ADD7

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD5 - Filtrar ofertas con rango muy amplio (todo el espectro)', async ({ page }) => {
    // Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar el slider para seleccionar el rango completo de '$5.00' a '$20.00'
    await sliders.nth(0).fill('5');
    await sliders.nth(1).fill('20');
    await page.waitForTimeout(1000);
    
    // Expected Results: Se muestran todas las ofertas disponibles en el sistema
    const resultados = page.locator('text=/\\d+ resultados/');
    const conteoTexto = await resultados.textContent();
    if (conteoTexto) {
      const match = conteoTexto.match(/\d+/);
      if (match) {
        const numeroResultados = parseInt(match[0]);
        expect(numeroResultados).toBeGreaterThan(10); // Verificar que hay múltiples ofertas
      }
    }
    
    // VALIDACIÓN VISUAL: Ofertas desde $5/h hasta $20/h están visibles
    const precios = ['$5/h', '$10/h', '$15/h', '$20/h'];
    let preciosEncontrados = 0;
    for (const precio of precios) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        preciosEncontrados++;
      }
    }
    expect(preciosEncontrados).toBeGreaterThan(2);
  });

  test.fixme('CP-HU-27-ADD6 - Filtrar ofertas con rango muy estrecho sin coincidencias altas', async ({ page }) => {
    // Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar el slider para seleccionar el rango de '$5.00' a '$6.00'
    await sliders.nth(0).fill('5');
    await sliders.nth(1).fill('6');
    await page.waitForTimeout(1000);
    
    // Expected Results: Solo se muestran ofertas de $5/h (muy pocas ofertas)
    const ofertas = page.locator('h3').filter({ hasText: /\$/ });
    const ofertasCount = await ofertas.count();
    
    // Verificar que solo se muestran ofertas de $5/h si existen
    const precio5 = page.locator('text="$5/h"');
    if (await precio5.count() > 0) {
      await expect(precio5.first()).toBeVisible();
    }
    
    // VALIDACIÓN CRÍTICA: NO se muestran ofertas de precios mayores
    const preciosMayores = ['$7/h', '$10/h', '$15/h', '$20/h'];
    for (const precio of preciosMayores) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        await expect(precioElement).not.toBeVisible();
      }
    }
    
    // El slider mantiene los valores seleccionados
    const sliderMinValue = await sliders.nth(0).inputValue();  
    const sliderMaxValue = await sliders.nth(1).inputValue();
    expect(parseFloat(sliderMinValue)).toBe(5);
    expect(parseFloat(sliderMaxValue)).toBe(6);
  });

  test.fixme('CP-HU-27-ADD7 - Filtrar ofertas en rango medio-alto', async ({ page }) => {
    // Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar el slider para seleccionar el rango de '$17.00' a '$19.00'
    await sliders.nth(0).fill('17');
    await sliders.nth(1).fill('19');
    await page.waitForTimeout(1000);
    
    // Expected Results: SOLAMENTE ofertas con precios en el rango $17-$19
    const preciosValidos = ['$17/h', '$18/h', '$19/h'];
    let preciosEncontrados = 0;
    
    for (const precio of preciosValidos) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        preciosEncontrados++;
      }
    }
    
    // VALIDACIÓN CRÍTICA: NO aparecen ofertas fuera del rango
    const preciosFuera = ['$16/h', '$20/h', '$15/h', '$5/h', '$10/h'];
    for (const precio of preciosFuera) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        await expect(precioElement).not.toBeVisible();
      }
    }
    
    // Verificar que el slider mantiene los valores correctos
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue();
    expect(parseFloat(sliderMinValue)).toBe(17);
    expect(parseFloat(sliderMaxValue)).toBe(19);
  });
});