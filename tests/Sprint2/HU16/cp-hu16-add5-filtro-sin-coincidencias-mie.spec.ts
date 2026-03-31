import { LOGIN_URL, ENCUENTRA_TUTORIA_URL } from '../../config';
import { CREDENTIALS } from '../../credentials';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD5: Filtrar ofertas por un día sin coincidencias (Dom)', async ({ page }) => {
    // 1. Login primero
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(CREDENTIALS.STUDENT.email);
    await page.getByRole('textbox', { name: /[Cc]ontraseña/ }).fill(CREDENTIALS.STUDENT.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Esperar a que se complete el login
    await page.waitForURL('**/encuentra-tutoria**', { timeout: 15000 }).catch(() => {
      // Si no redirige automáticamente, navegar explícitamente
      return page.goto(ENCUENTRA_TUTORIA_URL);
    });
    
    // 2. Esperar a que se carguen las ofertas
    await page.waitForTimeout(2000);
    try {
      await page.locator('[href*="/ofertas/"]').first().waitFor({ timeout: 10000 });
    } catch (e) {
      // Si no hay ofertas o tardaron, seguir de todos modos
      console.log('Ofertas no cargadas, continuando...');
    }
    
    // 3. Hacer clic en el botón 'Dom' en la sección "Disponibilidad"
    const domButton = page.getByTestId('filter-day-dom');
    try {
      await expect(domButton).toBeVisible({ timeout: 5000 });
      await domButton.click();
      
      // Expected Results:
      // - Se muestra el mensaje "No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda"
      const noOffersHeading = page.getByRole('heading', { name: 'No se encontraron ofertas' });
      await expect(noOffersHeading).toBeVisible();
      
      const noOffersMessage = page.getByText(/Intenta ajustar tus filtros de búsqueda/);
      await expect(noOffersMessage).toBeVisible();
    } catch (e) {
      // Si no encuentra el botón, el test falla
      throw new Error(`No se pudo encontrar el botón de filtro para Domingo: ${e.message}`);
    }
  });
});
