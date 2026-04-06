import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { OFERTA_HU09_PRIMARIA_URL } from '../../config';
import { openRequestModal } from './helpers';

test.describe('Solicitud exitosa de tutoría con dual modalidad', () => {
  test('CP-HU-06-R6: Solicitud exitosa de tutoría con dual modalidad, modalidad y mensaje llenos', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con dual modalidad
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');
    await page.goto(OFERTA_HU09_PRIMARIA_URL);
    await page.waitForURL('**/ofertas/**');
    
    // 3-4. Seleccionar horario disponible y abrir modal
    const requestModalOpened = await openRequestModal(page);
    test.skip(!requestModalOpened, 'No hay horarios solicitables disponibles actualmente para esta oferta con esta cuenta.');
    
    // 5. Seleccionar el botón "Virtual" en la sección "Modalidad *"
    const virtualButton = page.getByRole('button', { name: /Virtual/i });
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
