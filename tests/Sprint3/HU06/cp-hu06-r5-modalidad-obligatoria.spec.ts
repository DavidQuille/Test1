import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de modalidad obligatoria en solicitud de tutoría', () => {
  test('CP-HU-06-R5: Verificación de modalidad obligatoria en solicitud de tutoría (dual modalidad)', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con modalidades "Virtual/Presencial"
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Buscar Probabilidad
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Probabilidad');
    
    // Hacer clic en la primera tarjeta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Esperar a que cargue
    await page.waitForURL('**/ofertas/**');
    
    // 3. Seleccionar el horario "Viernes 13 mar · 10:00"
    const horaButton = page.getByRole('button', { name: '10:' }).first();
    await horaButton.click();
    
    // 4. Hacer clic en el botón "Solicitar Tutoría"
    const solicitarButton = page.getByRole('button', { name: 'Solicitar Tutoría (1)' });
    await solicitarButton.click();
    
    // 5. Dejar la sección "Modalidad *" sin seleccionar
    // 6. Ingresar el mensaje
    const messageBox = page.getByRole('textbox', { name: 'Mensaje para el tutor' });
    await messageBox.fill('Necesito repasar integrales.');
    
    // 7. Hacer clic en el botón "Enviar Solicitud"
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El error de modalidad se muestra
    const modalidadError = page.locator('text=Selecciona la modalidad');
    await expect(modalidadError).toBeVisible();
  });
});
