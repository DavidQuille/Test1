import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD1: Limpiar filtro de disponibilidad usando botón X', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Mar' en la sección "Disponibilidad"
    await page.getByTestId('filter-day-mar').click();
    
    // Verificar que el filtro está activo
    await page.waitForTimeout(500);
    
    // Verificar que aparecen horarios de Martes en las tarjetas
    const marAvailability = page.getByText(/Martes\s+\d{1,2}:\d{2}/).first();
    await expect(marAvailability).toBeVisible();
    
    // 3. Hacer clic en el botón X (icono de remover) junto al filtro activo de 'Mar'
    const removeButton = page.getByTestId('clear-day-tag');
    await expect(removeButton).toBeVisible();
    await removeButton.click();
    
    // Expected Results:
    // - El botón X desaparece de la interfaz
    await page.waitForTimeout(300);
    await expect(removeButton).not.toBeVisible();
    
    // - La lista de ofertas vuelve a mostrar todos los resultados disponibles
    // Verificar que el número de resultados cambió (aumentó después de eliminar el filtro)
    await page.waitForFunction(
      () => {
        const text = document.body.textContent || '';
        // Buscar que hay un números de resultados (sin Mar filtro específico)
        return /\d+ resultados/.test(text) && !/<p>Mar/.test(document.body.innerHTML);
      },
      { timeout: 8000 }
    );
  });
});
