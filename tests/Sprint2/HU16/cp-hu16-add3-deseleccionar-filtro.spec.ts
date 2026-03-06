import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD3: Deseleccionar un filtro haciendo clic nuevamente en el mismo día', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Sáb' en la sección "Disponibilidad"
    const sabButton = page.getByTestId('filter-day-sab');
    await sabButton.click();
    
    // Verificar que Sáb está activo
    let currentFilter = page.getByText('Sáb').first();
    await expect(currentFilter).toBeVisible();
    
    // Verificar que muestra 3 resultados
    const threeResults = page.getByText(/^3 resultados$/);
    await expect(threeResults).toBeVisible();
    
    // 3. Hacer clic nuevamente en el botón 'Sáb' para deseleccionarlo
    await sabButton.click();
    
    // Expected Results:
    // - La lista de ofertas vuelve a mostrar todas las ofertas disponibles (37 resultados)
    await page.waitForFunction(
      () => document.body.textContent?.includes('37 resultados'),
      { timeout: 8000 }
    );
  });
});
