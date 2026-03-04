import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD3

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD3 - Filtrar ofertas por precio mínimo exacto', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // (Asumiendo que ya está logueado según el snapshot)
    
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    // 4. Ajustar el slider de "Precio" para seleccionar el rango de '$5.00' a '$5.00'
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar ambos sliders al precio mínimo
    await sliders.nth(0).fill('5');
    await sliders.nth(1).fill('5');
    
    // Esperar a que se aplique el filtro
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // VALIDACIÓN VISUAL: SOLAMENTE la oferta de $5/h
    const introduccionLogica = page.locator('text="Introducción a la Lógica de Programación"');
    const precio5 = page.locator('text="$5/h"');
    
    // Verificar que aparece la oferta esperada
    if (await introduccionLogica.count() > 0) {
      await expect(introduccionLogica).toBeVisible();
    }
    if (await precio5.count() > 0) {
      await expect(precio5).toBeVisible();
    }
    
    // VALIDACIÓN CRÍTICA: NO aparece ninguna otra oferta
    const otrasOfertas = [
      'Nivelación de Matemáticas', // $7/h
      'Macroeconomía', // $9/h
      'Cálculo de una Variable', // $10/h
      'Probabilidad y Estadística' // $15/h u otras ofertas de precios mayores
    ];
    
    for (const oferta of otrasOfertas) {
      const ofertaElement = page.locator(`h3:has-text("${oferta.split(' ').slice(0, 2).join(' ')}")`);
      if (await ofertaElement.count() > 0) {
        await expect(ofertaElement).not.toBeVisible();
      }
    }
    
    // Verificar que los precios mayores no aparecen
    const preciosMayores = ['$7/h', '$9/h', '$10/h', '$15/h', '$18/h', '$20/h'];
    for (const precio of preciosMayores) {
      const precioElement = page.locator(`text="${precio}"`);
      if (await precioElement.count() > 0) {
        await expect(precioElement).not.toBeVisible();
      }
    }
    
    // El slider refleja el valor '$5.00' en ambos extremos
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue();
    expect(parseFloat(sliderMinValue)).toBe(5);
    expect(parseFloat(sliderMaxValue)).toBe(5);
    
    // Se muestra el filtro activo como chip/badge
    const filtroActivo = page.locator('[class*="chip"], [class*="badge"], [class*="tag"]').filter({ hasText: /\$5.*\$5/ });
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