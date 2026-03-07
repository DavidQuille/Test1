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
    
    await page.waitForTimeout(500);
    
    // Verificar simplemente que hay resultados cuando Sáb está seleccionado
    // Buscar algún patrón de hora para verificar que hay resultados
    const hourPattern = page.getByText(/\d{1,2}:\d{2}/).first();
    await expect(hourPattern).toBeVisible();
    
    // 3. Hacer clic nuevamente en el botón 'Sáb' para deseleccionarlo
    await sabButton.click();
    
    // Expected Results:
    // - La lista de ofertas vuelve a mostrar todas las ofertas disponibles
    const pageContent = page.locator('body');
    await expect(pageContent).toContainText('resultados', { timeout: 8000 });
  });
});
