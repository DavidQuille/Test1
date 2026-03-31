import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-R2: Filtrar ofertas exitosamente por un día de la semana con coincidencias', async ({ page }) => {
    // 1. Navegar y hacer login como estudiante
    await page.goto('http://localhost:3001');
    await page.waitForSelector('input[placeholder*="tu.correo@epn.edu.ec"]', { timeout: 5000 });
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: /[Cc]ontraseña/ }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.waitForURL(/.*encuentra-tutoria/, { timeout: 15000 });
    
    // 2. Esperar a que se carguen las ofertas
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForSelector('[href*="/ofertas/"]', { timeout: 10000 });
    
    // 3. Hacer clic en el botón 'Mar' en la sección "Disponibilidad"
    const marButton = page.getByTestId('filter-day-mar');
    await expect(marButton).toBeVisible({ timeout: 5000 });
    await marButton.click();
    
    // Esperar a que se filtren los resultados
    await page.waitForTimeout(1000);
    
    // Expected Results:
    // - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Mar'
    // - Verificar que el filtro activo está visible
    const filterTag = page.getByText('Mar').first();
    await expect(filterTag).toBeVisible();
    
    // - Verificar que en las tarjetas aparece 'Martes' con horario
    const marAvailability = page.getByText(/Martes\s+\d{1,2}:\d{2}/).first();
    await expect(marAvailability).toBeVisible();
  });
});
