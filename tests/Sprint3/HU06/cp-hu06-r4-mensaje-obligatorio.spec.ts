import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de mensaje obligatorio en solicitud de tutoría', () => {
  test('CP-HU-06-R4: Verificación de mensaje obligatorio en solicitud de tutoría (una modalidad)', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Buscar una tutoría
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Álgebra');
    
    // Hacer clic en la primera tarjeta de oferta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Esperar a que cargue
    await page.waitForURL('**/ofertas/**');
    
    // 3. Seleccionar un horario
    const horaButton = page.getByRole('button', { name: '10:' }).first();
    await horaButton.click();
    
    // 4. Hacer clic en el botón "Solicitar Tutoría"
    const solicitarButton = page.getByRole('button', { name: 'Solicitar Tutoría (1)' });
    await solicitarButton.click();
    
    // 5. En el modal, si hay modalidad, seleccionar una (si aplica)
    const virtualButton = page.getByRole('button', { name: 'Virtual' });
    if (await virtualButton.isVisible().catch(() => false)) {
      await virtualButton.click();
    }
    
    // 6. Dejar el campo de mensaje vacío e intentar enviar
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El error se muestra
    const errorMessage = page.locator('text=El mensaje es obligatorio.');
    await expect(errorMessage).toBeVisible();
  });
});
