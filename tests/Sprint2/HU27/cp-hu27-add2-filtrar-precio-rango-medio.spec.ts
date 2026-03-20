import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD2

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD2 - Filtrar ofertas por precio en rango medio con coincidencias', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // (Asumiendo que ya está logueado según el snapshot)
    
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    // 4. Ajustar el slider de "Precio" para seleccionar el rango de '$10.00' a '$15.00'
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar el slider a valores medios
    await sliders.nth(0).fill('10');
    await sliders.nth(1).fill('15');
    
    // Esperar a que se aplique el filtro
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // VALIDACIÓN VISUAL: SOLAMENTE ofertas en el rango $10-$15
    const preciosEsperados = ['$10/h', '$11/h', '$12/h', '$13/h', '$14/h', '$15/h'];
    
    // Verificar que aparecen ofertas del rango esperado
    let ofertasEncontradas = 0;
    for (const precio of preciosEsperados) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        ofertasEncontradas++;
      }
    }
    
    // Al menos algunas ofertas deberían estar en este rango
    expect(ofertasEncontradas).toBeGreaterThan(0);
    
    // Verificar que aparecen ofertas relacionadas
    let ofertasRelacionadas = 0;
    const posiblesOfertas = ['Cálculo', 'Física', 'Probabilidad', 'Estadística'];
    for (const oferta of posiblesOfertas) {
      const ofertaElement = page.locator(`h3:has-text("${oferta}")`);
      if (await ofertaElement.count() > 0) {
        await expect(ofertaElement.first()).toBeVisible();
        ofertasRelacionadas++;
      }
    }
    
    // Verificar precios en el rango
    const precios = ['$10/h', '$12/h', '$13/h', '$15/h'];
    let preciosEncontrados = 0;
    for (const precio of precios) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        preciosEncontrados++;
      }
    }
    
    // Debe haber al menos algunas ofertas en el rango
    expect(preciosEncontrados).toBeGreaterThan(0);
    
    // VALIDACIÓN CRÍTICA: NO aparecen ofertas fuera del rango
    const preciosFueraRango = ['$5/h', '$7/h', '$16/h', '$18/h', '$20/h'];
    
    for (const precio of preciosFueraRango) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        await expect(precioElement).not.toBeVisible();
      }
    }
    
    // Verificar que el slider refleja los valores correctos
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue();
    expect(parseFloat(sliderMinValue)).toBe(10);
    expect(parseFloat(sliderMaxValue)).toBe(15);
  });
});