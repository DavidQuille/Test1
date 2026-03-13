// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Solicitud exitosa de tutoría con dual modalidad', () => {
  test('CP-HU-06-R6: Solicitud exitosa de tutoría con dual modalidad, modalidad y mensaje llenos', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con dual modalidad
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Buscar Probabilidad
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Probabilidad');
    
    // Hacer clic en la tarjeta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Esperar a que cargue
    await page.waitForURL('**/ofertas/**');
    
    // 3. Seleccionar un horario disponible (usar Viernes 10:00)
    const horaButton = page.locator('button').filter({ hasText: '10:00' }).last();
    await horaButton.click();
    
    // 4. Hacer clic en el botón "Solicitar Tutoría"
    const solicitarButton = page.getByRole('button', { name: 'Solicitar Tutoría (1)' });
    await solicitarButton.click();
    
    // 5. Seleccionar el botón "Virtual" en la sección "Modalidad *"
    const virtualButton = page.getByRole('button', { name: 'Virtual' });
    await virtualButton.click();
    
    // 6. Ingresar el mensaje
    const messageBox = page.getByRole('textbox', { name: 'Mensaje para el tutor' });
    await messageBox.fill('Necesito repasar integrales.');
    
    // 7. Hacer clic en el botón "Enviar Solicitud"
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El modal se cierra y aparece la notificación de éxito
    await expect(page.locator('text=¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto.')).toBeVisible();
  });
});
