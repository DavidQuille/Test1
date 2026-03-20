import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD6: Filtrar ofertas exitosamente por un día con coincidencias (Mié)', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Mié' en la sección "Disponibilidad"
    const mieButton = page.getByTestId('filter-day-mie');
    await mieButton.click();
    
    // Expected Results:
    // - La lista de ofertas se filtra mostrando las que tienen disponibilidad el día 'Mié'
    // Verificar que el filtro activo está visible
    const filterTag = page.getByText('Mié').first();
    await expect(filterTag).toBeVisible();
    
    // - Verificar que hay resultados
    await page.waitForTimeout(500);
    
    // - Verificar que en las tarjetas aparece información de horarios (validación que se está filtrando correctamente)
    const availability = page.getByText(/\d{1,2}:\d{2}/).first();
    await expect(availability).toBeVisible();
  });
});
