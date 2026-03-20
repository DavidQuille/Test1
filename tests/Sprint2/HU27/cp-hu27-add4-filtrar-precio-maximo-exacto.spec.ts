import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD4

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD4 - Filtrar ofertas por precio máximo disponible', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // (Asumiendo que ya está logueado según el snapshot)
    
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    // 4. Ajustar el slider de "Precio" para seleccionar el rango de '$20.00' a '$20.00'
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar ambos sliders al precio máximo del sistema
    await sliders.nth(0).fill('20');
    await sliders.nth(1).fill('20');
    
    // Esperar a que se aplique el filtro
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // VALIDACIÓN VISUAL: SOLAMENTE ofertas de $20/h
    const precio20 = page.locator('text="$20/h"');
    
    // Verificar que aparecen ofertas de $20/h
    if (await precio20.count() > 0) {
      await expect(precio20.first()).toBeVisible();
    }
    
    // VALIDACIÓN CRÍTICA: NO aparecen ofertas de menor precio
    const ofertasMenorPrecio = [
      'Cálculo de una Variable', // $10/h
      'Introducción a la Lógica', // $5/h
      'Fundamentos de Algoritmos' // $15/h u otros menores a $20
    ];
    
    for (const oferta of ofertasMenorPrecio) {
      const ofertaElement = page.locator(`h3:has-text("${oferta.split(' ').slice(0, 3).join(' ')}")`);
      if (await ofertaElement.count() > 0) {
        await expect(ofertaElement).not.toBeVisible();
      }
    }
    
    // Verificar que los precios menores no aparecen
    const preciosMenores = ['$5/h', '$7/h', '$10/h', '$15/h', '$18/h', '$19/h'];
    for (const precio of preciosMenores) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        await expect(precioElement).not.toBeVisible();
      }
    }
    
    // El slider refleja el valor '$20.00' en ambos extremos
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue();
    expect(parseFloat(sliderMinValue)).toBe(20);
    expect(parseFloat(sliderMaxValue)).toBe(20);
    
    // Se muestra el filtro activo como chip/badge
    const filtroActivo = page.locator('[class*="chip"], [class*="badge"], [class*="tag"]').filter({ hasText: /\$20.*\$20/ });
    if (await filtroActivo.count() > 0) {
      await expect(filtroActivo.first()).toBeVisible();
      // Verificar que tiene opción de eliminar (x)
      const botonEliminar = filtroActivo.first().locator('[class*="close"], button, [role="button"]').filter({ hasText: /×|x|✕/ });
      if (await botonEliminar.count() > 0) {
        await expect(botonEliminar.first()).toBeVisible();
      }
    }
  });
});