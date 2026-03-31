import { loginAndGoto } from '../../auth';
import { test, expect } from '@playwright/test';

test.describe('Disponibilidad - Filtro de Día', () => {
  test('CP-HU-16-R1: Visualización inicial de ofertas sin filtro de día aplicado', async ({ page }) => {
    // 1. Navegar y hacer login
    await page.goto('http://localhost:3001');
    
    // Esperar que se cargue el formulario de login
    await page.waitForSelector('input[placeholder*="tu.correo@epn.edu.ec"]', { timeout: 5000 });
    
    // Hacer login como estudiante
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: /[Cc]ontraseña/ }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Esperar a que se redirija a la página de ofertas
    await page.waitForURL(/.*encuentra-tutoria/, { timeout: 15000 });
    
    // 2. Esperar a que se carguen las ofertas
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    
    // 3. Verificar que el sistema cargó la interfaz "Encuentra tu Tutoría"
    const filtersSection = page.getByRole('heading', { name: 'Filtros' });
    await expect(filtersSection).toBeVisible({ timeout: 10000 });
    
    // 4. Verificar que hay al menos un elemento de oferta visible
    await page.waitForSelector('[href*="/ofertas/"]', { timeout: 10000 });
    const ofertaCards = page.locator('[href*="/ofertas/"]');
    await expect(ofertaCards.first()).toBeVisible();
  });
});
