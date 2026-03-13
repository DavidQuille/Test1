// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Solicitud exitosa de tutoría con una sola modalidad', () => {
  test('CP-HU-06-R3: Solicitud exitosa de tutoría con una sola modalidad y mensaje lleno', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con una única modalidad configurada
    await page.goto('https://politutorias-frontend.vercel.app/ofertas/d0a69a40-ef25-4242-b29b-76419b4b8f93');
    
    // 3. Seleccionar un horario disponible (Viernes 10:00)
    const horaButton = page.getByRole('button', { name: '10:00' }).first();
    await horaButton.click();
    
    // 4. Hacer clic en el botón "Solicitar Tutoría"
    const solicitarButton = page.getByRole('button', { name: 'Solicitar Tutoría (1)' });
    await solicitarButton.click();
    
    // 5. En el modal "Solicitar Tutoría", ingresar el mensaje
    const messageBox = page.getByRole('textbox', { name: 'Mensaje para el tutor' });
    await messageBox.fill('Requiero ayuda urgente con este tema para mi examen.');
    
    // 6. Hacer clic en el botón "Enviar Solicitud"
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El modal se cierra y aparece la notificación de éxito
    const successNotification = page.locator('text=/¡Solicitud enviada!.*El tutor revisará/');
    await expect(successNotification).toBeVisible();
  });
});
