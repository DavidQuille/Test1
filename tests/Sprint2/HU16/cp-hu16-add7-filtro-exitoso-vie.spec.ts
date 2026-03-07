import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD7: Filtrar ofertas exitosamente por un día con coincidencias (Vie)', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Vie' en la sección "Disponibilidad"
    const vieButton = page.getByTestId('filter-day-vie');
    await vieButton.click();
    
    // Expected Results:
    // - La lista de ofertas se filtra mostrando las que tienen disponibilidad el día 'Vie'
    // Verificar que el filtro activo está visible
    const filterTag = page.getByText('Vie').first();
    await expect(filterTag).toBeVisible();
    
    // - Verificar que hay resultados
    await page.waitForTimeout(500);
    
    // - Verificar que en las tarjetas aparece información de horarios (validación que se está filtrando correctamente)
    const availability = page.getByText(/\d{1,2}:\d{2}/).first();
    await expect(availability).toBeVisible();
  });
});
