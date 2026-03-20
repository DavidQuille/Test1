import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de mensaje obligatorio en solicitud de tutoría (dual modalidad)', () => {
  test('CP-HU-06-R7: Verificación de mensaje obligatorio en solicitud de tutoría (dual modalidad, modalidad seleccionada)', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    // 2. Navegar a una tutoría con dual modalidad
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Probabilidad');
    
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    await page.waitForURL('**/ofertas/**');
    
    // 3. Seleccionar un horario
    const horaButton = page.locator('button').filter({ hasText: '10:00' }).last();
    await horaButton.click();
    
    // 4. Abrir el modal
    const solicitarButton = page.getByRole('button', { name: 'Solicitar Tutoría (1)' });
    await solicitarButton.click();
    
    // 5. Seleccionar modalidad "Presencial"
    const presencialButton = page.getByRole('button', { name: 'Presencial' });
    await presencialButton.click();
    
    // 6. Dejar el mensaje vacío e intentar enviar
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El error de mensaje se muestra
    const errorMessage = page.locator('text=El mensaje es obligatorio.');
    await expect(errorMessage).toBeVisible();
  });
});
