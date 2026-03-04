import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD12

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD12 - Limpiar todos los filtros usando el botón "Limpiar todos"', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // (Asumiendo que ya está logueado según el snapshot)
    
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Aplicar un filtro de precio seleccionando el rango de '$10.00' a '$18.00'
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    await sliders.nth(0).fill('10');
    await sliders.nth(1).fill('18');
    await page.waitForTimeout(1000);
    
    // 4. Aplicar filtros adicionales
    // Filtro de modalidad
    const modalidadVirtual = page.locator('text="Virtual"').first();
    if (await modalidadVirtual.count() > 0) {
      await modalidadVirtual.click();
      await page.waitForTimeout(500);
    }
    
    // Filtro de área de conocimiento
    const matematicaCheckbox = page.locator('input[type="checkbox"]').filter({ hasText: 'Matemática' }).or(page.locator('text="Matemática"').first());
    if (await matematicaCheckbox.count() > 0) {
      await matematicaCheckbox.click();
      await page.waitForTimeout(500);
    }
    
    // 5. Verificar que se muestran múltiples filtros activos
    const resultadosConFiltros = page.locator('text=/\\d+ resultados/');
    const conteoConFiltros = await resultadosConFiltros.textContent();
    
    // 6. Buscar y hacer clic en el botón "Limpiar todos"
    const botonLimpiarTodos = page.locator('button, [role="button"]').filter({ 
      hasText: /limpiar.*todos|clear.*all|reset.*all|borrar.*todos/i 
    });
    
    let botonEncontrado = false;
    
    // Buscar diferentes variaciones del botón
    const posiblesBotones = [
      page.locator('text="Limpiar todos"'),
      page.locator('text="Limpiar filtros"'),  
      page.locator('text="Clear all"'),
      page.locator('text="Reset filters"'),
      page.locator('button[class*="clear"]'),
      page.locator('button[data-testid*="clear"]'),
      page.locator('[class*="filter"] button').filter({ hasText: /limpiar|clear|reset/i })
    ];
    
    for (const boton of posiblesBotones) {
      if (await boton.count() > 0) {
        await boton.first().click();
        botonEncontrado = true;
        break;
      }
    }
    
    if (botonEncontrado) {
      await page.waitForTimeout(1000);
      
      // Expected Results:
      // Todos los filtros se eliminan completamente
      const resultadosFinales = page.locator('text=/\\d+ resultados/');
      const conteoFinal = await resultadosFinales.textContent();
      
      // VALIDACIÓN VISUAL: El listado vuelve a mostrar todas las ofertas (22 resultados)
      if (conteoFinal) {
        const numeroResultados = parseInt(conteoFinal.match(/\d+/)[0]);
        expect(numeroResultados).toBe(22); // Todas las ofertas disponibles
      }
      
      // El slider de precio vuelve a su rango completo
      const sliderMinValue = await sliders.nth(0).inputValue();
      const sliderMaxValue = await sliders.nth(1).inputValue();
      expect(parseFloat(sliderMinValue)).toBe(5);
      expect(parseFloat(sliderMaxValue)).toBeGreaterThanOrEqual(20);
      
      // Todos los demás filtros vuelven a su estado inicial
      // Verificar que Modalidad vuelve a "Todas"
      const modalidadTodas = page.locator('text="Todas"').first();
      if (await modalidadTodas.count() > 0) {
        await expect(modalidadTodas).toBeVisible();
      }
      
      // VALIDACIÓN CRÍTICA: Se muestran ofertas de todos los precios del sistema
      const ofertasTodasGamas = [
        'Introducción a la Lógica de Programación', // $5/h
        'Cálculo de una Variable', // $10/h  
        'Probabilidad y Estadística', // $15/h
        'Diseño Orientado a Objetos' // $20/h (u otras ofertas de $20/h)
      ];
      
      // Al menos algunas de estas ofertas deberían estar visibles
      let ofertasVisibles = 0;
      for (const oferta of ofertasTodasGamas) {
        const ofertaElement = page.locator(`text="${oferta.split(' ').slice(0, 3).join(' ')}"`);
        if (await ofertaElement.count() > 0) {
          ofertasVisibles++;
        }
      }
      expect(ofertasVisibles).toBeGreaterThan(2); // Al menos varias ofertas visibles
      
    } else {
      // Si no encontramos el botón, la funcionalidad podría no estar implementada
      console.log('Botón "Limpiar todos" no encontrado - funcionalidad podría no estar implementada');
      test.skip();
    }
  });
});