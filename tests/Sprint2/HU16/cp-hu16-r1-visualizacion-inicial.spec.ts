import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-R1: Visualización inicial de ofertas sin filtro de día aplicado', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Verificar que se muestran todas las ofertas (37 resultados)
    await page.waitForFunction(
      () => document.body.textContent?.includes('37 resultados'),
      { timeout: 8000 }
    );
    
    // 3. Verificar que el sistema cargó la interfaz "Encuentra tu Tutoría"
    await page.waitForFunction(
      () => document.body.textContent?.includes('Filtros'),
      { timeout: 8000 }
    );
  });
});
