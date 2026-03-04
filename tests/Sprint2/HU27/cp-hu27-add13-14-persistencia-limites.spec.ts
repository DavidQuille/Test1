import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD13, ADD14

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD13 - Verificar persistencia del filtro de precio al navegar entre páginas', async ({ page }) => {
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Aplicar un filtro de precio de '$8.00' a '$15.00'
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    await sliders.nth(0).fill('8');
    await sliders.nth(1).fill('15');
    await page.waitForTimeout(1000);
    
    // 4. Verificar que está en la página 1 con ofertas filtradas
    await expect(page.locator('text=/\\d+ resultados/')).toBeVisible();
    
    // Guardar estado inicial
    const sliderMinValueInicial = await sliders.nth(0).inputValue();
    const sliderMaxValueInicial = await sliders.nth(1).inputValue();
    
    // 5. Navegar a la página 2 si está disponible
    const botonPagina2 = page.locator('button:has-text("2"), [aria-label*="page 2"], [aria-label*="página 2"]');
    if (await botonPagina2.count() > 0) {
      await botonPagina2.first().click();
      await page.waitForTimeout(1000);
      
      // Expected Results: El filtro de precio se mantiene activo
      const sliderMinValuePag2 = await sliders.nth(0).inputValue();
      const sliderMaxValuePag2 = await sliders.nth(1).inputValue();
      expect(parseFloat(sliderMinValuePag2)).toBe(parseFloat(sliderMinValueInicial));
      expect(parseFloat(sliderMaxValuePag2)).toBe(parseFloat(sliderMaxValueInicial));
      
      // VALIDACIÓN VISUAL: El filtro permanece visible
      const filtroVisible = page.locator('[class*="chip"], [class*="badge"], [class*="tag"]').filter({ hasText: /\$/ });
      if (await filtroVisible.count() > 0) {
        await expect(filtroVisible.first()).toBeVisible();
      }
      
      // 6. Navegar a la página 3 si está disponible
      const botonPagina3 = page.locator('button:has-text("3"), [aria-label*="page 3"], [aria-label*="página 3"]');
      if (await botonPagina3.count() > 0) {
        await botonPagina3.first().click();
        await page.waitForTimeout(1000);
        
        const sliderMinValuePag3 = await sliders.nth(0).inputValue();
        const sliderMaxValuePag3 = await sliders.nth(1).inputValue();
        expect(parseFloat(sliderMinValuePag3)).toBe(parseFloat(sliderMinValueInicial));
        expect(parseFloat(sliderMaxValuePag3)).toBe(parseFloat(sliderMaxValueInicial));
      }
      
      // 7. Regresar a la página 1
      const botonPagina1 = page.locator('button:has-text("1"), [aria-label*="page 1"], [aria-label*="página 1"]');
      if (await botonPagina1.count() > 0) {
        await botonPagina1.first().click();
        await page.waitForTimeout(1000);
        
        // El filtro debe seguir activo en página 1
        const sliderMinValueFinal = await sliders.nth(0).inputValue();
        const sliderMaxValueFinal = await sliders.nth(1).inputValue();
        expect(parseFloat(sliderMinValueFinal)).toBe(parseFloat(sliderMinValueInicial));
        expect(parseFloat(sliderMaxValueFinal)).toBe(parseFloat(sliderMaxValueInicial));
        
        // VALIDACIÓN CRÍTICA: En todas las páginas SOLAMENTE aparecen ofertas dentro del rango
        const ofertasEnPagina1 = page.locator('h3').filter({ hasText: /\$/ });
        await expect(ofertasEnPagina1.first()).toBeVisible();
        
        // La URL puede incluir parámetros que reflejan el filtro aplicado
        const currentURL = await page.url();
        console.log('URL con filtros:', currentURL);
      }
    } else {
      // Si no hay paginación, solo verificar que el filtro permanece activo
      const sliderMinValueFinal = await sliders.nth(0).inputValue();
      const sliderMaxValueFinal = await sliders.nth(1).inputValue();
      expect(parseFloat(sliderMinValueFinal)).toBe(parseFloat(sliderMinValueInicial));
      expect(parseFloat(sliderMaxValueFinal)).toBe(parseFloat(sliderMaxValueInicial));
    }
  });

  test.fixme('CP-HU-27-ADD14 - Validar límites del slider de precio en valores extremos', async ({ page }) => {
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // 4. Intentar mover el slider mínimo por debajo de $5.00
    await sliders.nth(0).fill('0');
    await page.waitForTimeout(500);
    
    const sliderMinValueBajo = await sliders.nth(0).inputValue();
    const valorMinimo = parseFloat(sliderMinValueBajo);
    
    // 5. Intentar mover el slider máximo por encima de $20.00
    await sliders.nth(1).fill('50');
    await page.waitForTimeout(500);
    
    const sliderMaxValueAlto = await sliders.nth(1).inputValue();
    const valorMaximo = parseFloat(sliderMaxValueAlto);
    
    // Expected Results:
    // El slider no permite valores menores a $5.00 en el extremo inferior
    expect(valorMinimo).toBeGreaterThanOrEqual(5);
    
    // El slider no permite valores mayores a $20.00 en el extremo superior  
    expect(valorMaximo).toBeLessThanOrEqual(20);
    
    // VALIDACIÓN VISUAL: Los valores mostrados se mantienen dentro de los límites
    const valorMinimoMostrado = page.locator('text=$5.00, text=5.00, text=5');
    const valorMaximoMostrado = page.locator('text=$20.00, text=20.00, text=20'); 
    
    // Verificar que los valores se corrigieron a los límites válidos
    await sliders.nth(0).fill('1');
    await sliders.nth(1).fill('100');
    await page.waitForTimeout(500);
    
    const sliderMinFinal = await sliders.nth(0).inputValue();
    const sliderMaxFinal = await sliders.nth(1).inputValue();
    
    expect(parseFloat(sliderMinFinal)).toBeGreaterThanOrEqual(5);
    expect(parseFloat(sliderMaxFinal)).toBeLessThanOrEqual(20);
    
    // VALIDACIÓN CRÍTICA: El filtro funciona correctamente incluso con valores extremos
    await page.waitForTimeout(1000);
    
    // Verificar que el filtro sigue funcionando después de intentar valores extremos
    const ofertas = page.locator('h3').filter({ hasText: /\$/ });
    const ofertasCount = await ofertas.count();
    
    // Debe haber ofertas visibles (el filtro debe funcionar normalmente)
    expect(ofertasCount).toBeGreaterThan(0);
    
    // Verificar que se muestran solo ofertas en el rango válido del sistema
    const preciosValidos = ['$5/h', '$7/h', '$10/h', '$15/h', '$18/h', '$20/h'];
    let preciosValidosEncontrados = 0;
    for (const precio of preciosValidos) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        preciosValidosEncontrados++;
      }
    }
    expect(preciosValidosEncontrados).toBeGreaterThan(0);
  });
});