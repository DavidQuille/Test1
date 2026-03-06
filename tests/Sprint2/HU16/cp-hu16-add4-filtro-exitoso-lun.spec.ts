import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD4: Filtrar ofertas exitosamente por un día con coincidencias (Lun)', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Lun' en la sección "Disponibilidad"
    const lunButton = page.getByTestId('filter-day-lun');
    await lunButton.click();
    
    // Expected Results:
    // - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Lun'
    await page.waitForFunction(
      () => document.body.textContent?.includes('12 resultados'),
      { timeout: 8000 }
    );
    
    // - Verificar que el filtro activo está visible
    const filterTag = page.getByText('Lun').first();
    await expect(filterTag).toBeVisible();
  });
});
