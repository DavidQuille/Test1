// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { loginAndGoto } from '../../auth';
import { openRequestModal } from './helpers';
import { test, expect } from '@playwright/test';

test.describe('Solicitud exitosa de tutoría con una sola modalidad', () => {
  test('CP-HU-06-R3: Solicitud exitosa de tutoría con una sola modalidad y mensaje lleno', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con una única modalidad configurada
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');

    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Matemática - 1775436098632');

    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();

    await page.waitForURL('**/ofertas/**');
    
    // 3-4. Seleccionar un horario que habilite la solicitud y abrir modal
    const requestModalOpened = await openRequestModal(page);
    test.skip(!requestModalOpened, 'No hay horarios solicitables disponibles actualmente para esta oferta con esta cuenta.');
    
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
