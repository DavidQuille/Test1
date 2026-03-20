import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD5: Filtrar ofertas por un día sin coincidencias (Dom)', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // 2. Hacer clic en el botón 'Dom' en la sección "Disponibilidad"
    const domButton = page.getByTestId('filter-day-dom');
    await domButton.click();
    
    // Expected Results:
    // - Se muestra el mensaje "No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda"
    const noOffersHeading = page.getByRole('heading', { name: 'No se encontraron ofertas' });
    await expect(noOffersHeading).toBeVisible();
    
    const noOffersMessage = page.getByText(/Intenta ajustar tus filtros de búsqueda/);
    await expect(noOffersMessage).toBeVisible();
  });
});
