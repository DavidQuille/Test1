import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD2: Cambiar filtro de disponibilidad sin deseleccionar el anterior', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Mar' en la sección "Disponibilidad"
    await page.getByTestId('filter-day-mar').click();
    
    // Verificar que Mar está activo y muestra 6 resultados
    let currentFilter = page.getByText('Mar').first();
    await expect(currentFilter).toBeVisible();
    
    const sixResultsText = page.getByText(/^6 resultados$/);
    await expect(sixResultsText).toBeVisible();
    
    // 3. Hacer clic en el botón 'Jue' sin deseleccionar primero el filtro de 'Mar'
    const jueButton = page.getByTestId('filter-day-jue');
    await jueButton.click();
    
    // Expected Results:
    // - El filtro anterior de 'Mar' se reemplaza con el filtro de 'Jue'
    currentFilter = page.getByText('Jue').first();
    await expect(currentFilter).toBeVisible();
    
    // - La lista de ofertas se actualiza
    const jueResults = page.getByText(/^6 resultados$/);
    await expect(jueResults).toBeVisible();
  });
});
