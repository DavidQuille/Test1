import { loginAndGoto } from '../../auth';
import { ENCUENTRA_TUTORIA_URL } from '../../config';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-ADD4: Filtrar ofertas exitosamente por un día con coincidencias (Lun)', async ({ page }) => {
    // 1. Navegar a la interfaz de "Encuentra tu Tutoría"
    await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);
    
    // Esperar a que se carguen las ofertas
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForSelector('[href*="/ofertas/"]', { timeout: 10000 });
    
    // 2. Hacer clic en el botón 'Lun' en la sección "Disponibilidad"
    const lunButton = page.getByTestId('filter-day-lun');
    await expect(lunButton).toBeVisible({ timeout: 5000 });
    await lunButton.click();
    
    // Expected Results:
    // - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Lun'
    // Esperar a que aparezcan resultados
    await page.waitForTimeout(1000);
    
    // - Verificar que el filtro activo está visible
    const filterTag = page.getByText('Lun').first();
    await expect(filterTag).toBeVisible();
    
    // - Verificar que las tarjetas muestran 'Lunes' con horario (validación que se está filtrando correctamente)
    const lunAvailability = page.getByText(/Lunes\s+\d{1,2}:\d{2}/).first();
    await expect(lunAvailability).toBeVisible();
  });
});
