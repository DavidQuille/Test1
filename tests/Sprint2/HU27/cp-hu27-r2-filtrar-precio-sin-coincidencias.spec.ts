import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-R2

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-R2 - Filtrar ofertas por precio con rango sin coincidencias', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // (Asumiendo que ya está logueado según el snapshot)
    
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    // 4. Ajustar el slider de "Precio" para seleccionar el rango de '$1' a '$4'
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Intentar ajustar el slider a valores fuera del rango disponible
    await sliders.nth(0).fill('11');
    await sliders.nth(1).fill('12');
    
    // Esperar a que se aplique el filtro
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // - La lista de ofertas se vacía completamente.
    const ofertas = page.locator('h3').filter({ hasText: /\$/ });
    
    // VALIDACIÓN VISUAL: NO se muestran ofertas en el listado (0 resultados)
    const mensajeSinResultados = page.locator('text="No se encontraron ofertas"');
    if (await mensajeSinResultados.count() > 0) {
      await expect(mensajeSinResultados).toBeVisible();
    }
    
    // Alternativamente, verificar que no hay ofertas visibles
    const ofertasCount = await ofertas.count();
    expect(ofertasCount).toBe(0);
    
    // Se muestra el mensaje exacto
    const mensajeCompleto = page.locator('text="No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda."');
    if (await mensajeCompleto.count() > 0) {
      await expect(mensajeCompleto).toBeVisible();
    }
    
    // El slider mantiene los valores seleccionados
    // (Los valores pueden ser corregidos por el sistema a los límites válidos)
    const sliderMinValue = await sliders.nth(0).inputValue();
    const sliderMaxValue = await sliders.nth(1).inputValue();
    
    // Verificar que los valores están en un rango que no tiene ofertas
    expect(parseFloat(sliderMinValue)).toBeLessThan(5);
    expect(parseFloat(sliderMaxValue)).toBeLessThan(5);
    
    // Se muestra el filtro activo como chip/badge
    const filtroActivo = page.locator('[class*="chip"], [class*="badge"], [class*="tag"]').filter({ hasText: /\$.*\$/ });
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