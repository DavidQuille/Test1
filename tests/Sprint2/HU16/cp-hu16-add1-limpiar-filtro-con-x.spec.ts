import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD1: Limpiar filtro de disponibilidad usando botón X', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Mar' en la sección "Disponibilidad"
    await page.getByTestId('filter-day-mar').click();
    
    // Verificar que el filtro está activo
    let resultsParagraph = page.getByText(/^6 resultados$/);
    await expect(resultsParagraph).toBeVisible();
    
    // 3. Hacer clic en el botón X (icono de remover) junto al filtro activo de 'Mar'
    const removeButton = page.getByTestId('clear-day-tag');
    await expect(removeButton).toBeVisible();
    await removeButton.click();
    
    // Expected Results:
    // - El botón X desaparece de la interfaz
    await page.waitForTimeout(300);
    await expect(removeButton).not.toBeVisible();
    
    // - La lista de ofertas vuelve a mostrar todas las ofertas disponibles (37 resultados)
    await page.waitForFunction(
      () => document.body.textContent?.includes('37 resultados'),
      { timeout: 8000 }
    );
  });
});
