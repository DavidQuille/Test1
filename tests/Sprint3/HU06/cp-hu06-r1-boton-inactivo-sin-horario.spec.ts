import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de botón "Solicitar Tutoría" inactivo al no seleccionar horarios', () => {
  test('CP-HU-06-R1: Verificación de botón "Solicitar Tutoría" inactivo al no seleccionar horarios', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');
    
    // Buscar una tutoría
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Probabilidad');
    
    // Hacer clic en la primera tarjeta de oferta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Esperar a que cargue la página de detalle
    await page.waitForURL('**/ofertas/**');
    
    // 3. Asegurarse de que ningún chip de horario esté seleccionado en la sección "Disponibilidad Semanal"
    // 4. Verificar el estado del botón "Solicitar Tutoría"
    
    // Verificación: El usuario permanece en la pantalla "E. Detalle Oferta"
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    
    // Verificación: El botón "Solicitar Tutoría" se muestra en un estado visual deshabilitado
    const button = page.locator('button:has-text("Solicitar Tutoría")').first();
    await expect(button).toBeDisabled();
    
    // Verificación: El mensaje de ayuda está visible
    const helpText = page.locator('text=Selecciona al menos un horario');
    await expect(helpText).toBeVisible();
  });
});
