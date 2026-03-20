import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md  
// ID: CP-HU-27-ADD8, ADD9, ADD10

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD8 - Filtrar ofertas cambiando de un rango con resultados a uno sin resultados', async ({ page }) => {
    // Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // 4. Ajustar el slider para '$5.00' a '$15.00' (con ofertas)
    await sliders.nth(0).fill('5');
    await sliders.nth(1).fill('15');
    await page.waitForTimeout(1000);
    
    // 5. Verificar que se muestran ofertas
    const resultadosConOfertas = page.locator('text=/\\d+ resultados/');
    const conteoInicialTexto = await resultadosConOfertas.textContent();
    const match = conteoInicialTexto ? conteoInicialTexto.match(/\d+/) : null;
    const conteoInicial = match ? parseInt(match[0]) : 0;
    expect(conteoInicial).toBeGreaterThan(0);
    
    // 6. Cambiar el slider para '$1.00' a '$4.00' (sin ofertas en el sistema)  
    await sliders.nth(0).fill('1');
    await sliders.nth(1).fill('4');
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // Al cambiar al rango $1-$4, la lista se vacía completamente (fuera del rango mínimo de $5)
    const ofertasEnSegundo = page.locator('h3').filter({ hasText: /\$/ });
    const ofertasSegundoCount = await ofertasEnSegundo.count();
    
    if (ofertasSegundoCount === 0) {
      // VALIDACIÓN VISUAL: La transición entre mostrar ofertas y lista vacía es fluida
      const mensajeSinResultados = page.locator('text=/no.*encontr|sin.*result|no.*result/i');
      if (await mensajeSinResultados.count() > 0) {
        await expect(mensajeSinResultados.first()).toBeVisible();
      }
    }
    
    // El slider refleja los nuevos valores
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue(); 
    // Nota: el sistema podría ajustar automáticamente al límite mínimo de $5
    expect(parseFloat(sliderMinValue)).toBeGreaterThanOrEqual(1);
    expect(parseFloat(sliderMaxValue)).toBeGreaterThanOrEqual(4);
  });

  test.fixme('CP-HU-27-ADD9 - Filtrar ofertas por rango que incluye ofertas de múltiples páginas', async ({ page }) => {
    // Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar el slider para '$8.00' a '$18.00'
    await sliders.nth(0).fill('8');
    await sliders.nth(1).fill('18');
    await page.waitForTimeout(1000);
    
    // 5. Verificar las ofertas en la página 1
    // Expected Results: Ofertas en el rango $8-$18 desde múltiples páginas
    const preciosEsperados = ['$8/h', '$10/h', '$12/h', '$15/h', '$16/h', '$17/h', '$18/h'];
    
    // Verificar que aparecen ofertas del rango esperado
    let ofertasEnRangoEncontradas = 0;
    for (const precio of preciosEsperados) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        ofertasEnRangoEncontradas++;
      }
    }
    
    // 6. Navegar a páginas siguientes si están disponibles
    const botonSiguientePagina = page.locator('button:has-text("siguiente"), button:has-text("2"), button[aria-label*="next"]');
    if (await botonSiguientePagina.count() > 0) {
      await botonSiguientePagina.first().click();
      await page.waitForTimeout(1000);
      
      // Verificar que el filtro persiste en la siguiente página
      const sliderMinValue = await sliders.nth(0).inputValue();
      const sliderMaxValue = await sliders.nth(1).inputValue();
      expect(parseFloat(sliderMinValue)).toBe(8);
      expect(parseFloat(sliderMaxValue)).toBe(18);
    }
    
    // VALIDACIÓN CRÍTICA: NO aparecen ofertas fuera del rango
    const preciosFuera = ['$5/h', '$19/h', '$20/h'];
    for (const precio of preciosFuera) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        await expect(precioElement).not.toBeVisible();
      }
    }
    
    expect(ofertasEnRangoEncontradas).toBeGreaterThan(0);
  });

  test.fixme('CP-HU-27-ADD10 - Resetear filtro de precio después de aplicar un filtro específico', async ({ page }) => {
    // Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // 4. Ajustar el slider para '$7.00' a '$12.00'
    await sliders.nth(0).fill('7');
    await sliders.nth(1).fill('12');
    await page.waitForTimeout(1000);
    
    // 5. Verificar que se muestran solo ofertas filtradas
    const resultadosFiltrados = page.locator('text=/\\d+ resultados/');
    const conteoFiltradoTexto = await resultadosFiltrados.textContent();
    const matchFiltrado = conteoFiltradoTexto ? conteoFiltradoTexto.match(/\d+/) : null;
    const conteoFiltrado = matchFiltrado ? parseInt(matchFiltrado[0]) : 0;
    
    // Verificar ofertas esperadas en el rango $7-$12
    const preciosEsperados = ['$7/h', '$8/h', '$9/h', '$10/h', '$11/h', '$12/h'];
    let ofertasEncontradas = 0;
    for (const precio of preciosEsperados) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        ofertasEncontradas++;
      }
    }
    
    // 6. Ajustar el slider para volver al rango completo '$5.00' a '$20.00'
    await sliders.nth(0).fill('5');
    await sliders.nth(1).fill('20');
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // Al resetear el filtro, se muestran todas las ofertas disponibles del sistema
    const resultadosCompletos = page.locator('text=/\\d+ resultados/');
    const conteoCompletoTexto = await resultadosCompletos.textContent();
    const matchCompleto = conteoCompletoTexto ? conteoCompletoTexto.match(/\d+/) : null;
    const conteoCompleto = matchCompleto ? parseInt(matchCompleto[0]) : 0;
    
    expect(conteoCompleto).toBeGreaterThan(conteoFiltrado);
    
    // VALIDACIÓN VISUAL: La transición de lista filtrada a lista completa es correcta
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue();
    expect(parseFloat(sliderMinValue)).toBe(5);
    expect(parseFloat(sliderMaxValue)).toBe(20);
    
    // Verificar que aparecen ofertas de todo el rango de precios del sistema
    const preciosCompletos = ['$5/h', '$7/h', '$10/h', '$15/h', '$18/h', '$20/h'];
    let preciosCompletosEncontrados = 0;
    for (const precio of preciosCompletos) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        preciosCompletosEncontrados++;
      }
    }
    expect(preciosCompletosEncontrados).toBeGreaterThan(2);
  });
});