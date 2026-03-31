import { loginAndGoto } from '../../auth';
import { ENCUENTRA_TUTORIA_URL } from '../../config';
// spec: specs/Sprint2/CasosHU32.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de visualización de detalles de oferta', () => {
  test('CP-HU-32-R1: Verificar la visualización de los detalles de una oferta al hacer clic en su tarjeta', async ({ page }) => {
    // 1. Login and navigate to encontremos-tutoria
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    
    // 2. Esperar a que se carguen las ofertas
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForSelector('[href*="/ofertas/"]', { timeout: 10000 });
    
    // 3. Hacer clic en la primera tarjeta de oferta
    const ofertaLink = page.locator('[href*="/ofertas/"]').first();
    await expect(ofertaLink).toBeVisible();
    await ofertaLink.click();
    
    // Verificación: El sistema carga la información detallada de la oferta
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    // Verificación: Se visualiza el título de la oferta
    const tituloOferta = page.locator('h1, h2').first();
    await expect(tituloOferta).toBeVisible();
    
    // Verificación: Se muestra información de la oferta
    const ofertaContent = page.locator('main').first();
    await expect(ofertaContent).toBeVisible();
  });

  test('CP-HU-32-R2: Verificar el regreso a la lista principal de ofertas desde la pantalla de detalles', async ({ page }) => {
    // 1. Login and navigate to encuentra-tutoria
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    
    // 2. Esperar a que se carguen las ofertas
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForSelector('[href*="/ofertas/"]', { timeout: 10000 });
    
    // 3. Hacer clic en una tarjeta de oferta
    const ofertaLink = page.locator('[href*="/ofertas/"]').first();
    await expect(ofertaLink).toBeVisible();
    await ofertaLink.click();
    
    // Esperar a que se cargue la página detalle
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    // 4. Regresar usando el navegador del browser
    await page.goBack();
    
    // Esperar a que se cargue la página nuevamente
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1000);
    
    // Verificación: Debe haber tarjetas de oferta visibles nuevamente
    const ofertaCards = page.locator('[href*="/ofertas/"]');
    await ofertaCards.first().waitFor({ timeout: 5000 });
    const cardCount = await ofertaCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
