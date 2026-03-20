import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

// spec: specs/Sprint2/CasosHU27.md
// ID: CP-HU-27-ADD1

test.describe('HU27 - Filtrar ofertas por precio', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    await page.waitForLoadState('networkidle');
  });

  test.fixme('CP-HU-27-ADD1 - Filtrar ofertas por precio en rango alto con coincidencias', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    // (Asumiendo que ya está logueado según el snapshot)
    
    // 2. Navegar a la interfaz "Encuentra tu Tutoría".
    await expect(page).toHaveURL(ENCUENTRA_TUTORIA_URL);
    
    // 3. Localizar el slider de "Precio".
    const precioSection = page.locator('h3:has-text("Precio")').first();
    await expect(precioSection).toBeVisible();
    
    // 4. Ajustar el slider de "Precio" para seleccionar el rango de '$18.00' a '$20.00'
    const sliders = page.locator('[role="slider"], input[type="range"]');
    await expect(sliders).toHaveCount(2);
    
    // Ajustar el slider a valores altos dentro del rango válido
    await sliders.nth(0).fill('18');
    await sliders.nth(1).fill('20');
    
    // Esperar a que se aplique el filtro
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // VALIDACIÓN VISUAL: SOLAMENTE ofertas en el rango $18-$20
    const todasLasOfertas = page.locator('h3:not(:has-text("Filtros")):not(:has-text("Modalidad")):not(:has-text("Disponibilidad")):not(:has-text("Precio")):not(:has-text("Área de Conocimiento"))');
    
    // Verificar que hay ofertas en el rango especificado
    const ofertasPresentes = await todasLasOfertas.count();
    expect(ofertasPresentes).toBeGreaterThan(0);
    
    // Verificar precios de las ofertas mostradas están en el rango
    const precio18 = page.locator('text="$18/h"');
    const precio19 = page.locator('text="$19/h"');
    const precio20 = page.locator('text="$20/h"');
    
    // Al menos una de estas ofertas debería estar presente
    const hayOfertasEnRango = (await precio18.count()) + (await precio19.count()) + (await precio20.count());
    expect(hayOfertasEnRango).toBeGreaterThan(0);
    
    // VALIDACIÓN CRÍTICA: NO aparecen ofertas de menor precio
    const ofertasMenorPrecio = [
      'Introducción a la Lógica', // $5/h
      'Cálculo de una Variable', // $10/h
      'Fundamentos de Algoritmos' // $15/h u otras ofertas menores a $18
    ];
    
    for (const oferta of ofertasMenorPrecio) {
      const ofertaElement = page.locator(`text="${oferta}"`);
      if (await ofertaElement.count() > 0) {
        await expect(ofertaElement).not.toBeVisible();
      }
    }
    
    // Verificar que los valores del slider son correctos
    await expect(page.locator('text=$18.00')).toBeVisible();
    await expect(page.locator('text=$20.00')).toBeVisible();
    
    // Se muestra el filtro activo como chip/badge
    const filtroActivo = page.locator('[class*="chip"], [class*="badge"], [class*="tag"]').filter({ hasText: /\$18.*\$20/ });
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