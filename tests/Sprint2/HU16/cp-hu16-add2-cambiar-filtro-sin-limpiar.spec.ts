import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD2: Cambiar filtro de disponibilidad sin deseleccionar el anterior', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Mar' en la sección "Disponibilidad"
    await page.getByTestId('filter-day-mar').click();
    
    // Verificar que Mar está activo
    let currentFilter = page.getByText('Mar').first();
    await expect(currentFilter).toBeVisible();
    
    await page.waitForTimeout(500);
    
    // Verificar que aparecen horarios de Martes
    let dayAvailability = page.getByText(/Martes\s+\d{1,2}:\d{2}/).first();
    await expect(dayAvailability).toBeVisible();
    
    // 3. Hacer clic en el botón 'Jue' sin deseleccionar primero el filtro de 'Mar'
    const jueButton = page.getByTestId('filter-day-jue');
    await jueButton.click();
    
    // Expected Results:
    // - El filtro anterior de 'Mar' se reemplaza con el filtro de 'Jue'
    currentFilter = page.getByText('Jue').first();
    await expect(currentFilter).toBeVisible();
    
    await page.waitForTimeout(500);
    
    // - Verificar que las tarjetas ahora muestran 'Jueves' (el nuevo filtro)
    dayAvailability = page.getByText(/Jueves\s+\d{1,2}:\d{2}/).first();
    await expect(dayAvailability).toBeVisible();
  });
});
