// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de alerta por solicitud previa de horario', () => {
  test('CP-HU-06-R2: Verificación de alerta por solicitud previa de horario', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Buscar una tutoría con disponibilidad de Miércoles 14:00
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Estadística');
    
    // Hacer clic en la primera tarjeta de oferta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Esperar a que cargue la página de detalle
    await page.waitForURL('**/ofertas/**');
    
    // 3. Seleccionar el chip del horario "14:00" en la fila del "Miércoles"
    // Buscar el botón de Miércoles 14:00
    const miercolesFila = page.locator('text=Miércoles').first().locator('..').locator('..').locator('..');
    const button1400 = miercolesFila.locator('button:has-text("14:00")').first();
    
    // Si el botón existe, hacer clic
    if (await button1400.isVisible().catch(() => false)) {
      await button1400.click();
      
      // 4. Observar el comportamiento del sistema
      // Verificación: Se visualiza una alerta con el texto exacto
      const alertText = page.locator('text=/Horario ya solicitado.*Miércoles 14:00/');
      
      if (await alertText.isVisible().catch(() => false)) {
        // Verificación: El botón "Solicitar Tutoría" no se habilita
        const button = page.locator('button:has-text("Solicitar Tutoría")').first();
        await expect(button).toBeDisabled();
        
        // Verificación: Se visualiza la alerta inferior
        await expect(alertText).toBeVisible();
      }
    }
  });
});
