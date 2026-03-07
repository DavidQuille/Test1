import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-R1: Visualización inicial de ofertas sin filtro de día aplicado', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Verificar que se muestran todas las ofertas (sin filtro de día)
    // Verificar que hay resultados mostrados
    const pageContent = page.locator('body');
    await expect(pageContent).toContainText('resultados', { timeout: 8000 });
    
    // 3. Verificar que el sistema cargó la interfaz "Encuentra tu Tutoría"
    const filtersSection = page.getByRole('heading', { name: 'Filtros' });
    await expect(filtersSection).toBeVisible();
  });
});
