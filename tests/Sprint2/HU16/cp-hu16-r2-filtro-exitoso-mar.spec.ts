import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-R2: Filtrar ofertas exitosamente por un día de la semana con coincidencias', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Mar' en la sección "Disponibilidad"
    await page.getByTestId('filter-day-mar').click();
    
    // Expected Results:
    // - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Mar'
    const resultsParagraph = page.getByText(/^6 resultados$/);
    await expect(resultsParagraph).toBeVisible();
    
    // - Verificar que el filtro activo está visible (etiqueta de Mar)
    const filterTag = page.getByText('Mar').first();
    await expect(filterTag).toBeVisible();
  });
});
