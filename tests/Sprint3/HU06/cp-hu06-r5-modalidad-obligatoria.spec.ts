import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { OFERTA_HU09_PRIMARIA_URL } from '../../config';
import { openRequestModal } from './helpers';

test.describe('Verificación de modalidad obligatoria en solicitud de tutoría', () => {
  test('CP-HU-06-R5: Verificación de modalidad obligatoria en solicitud de tutoría (dual modalidad)', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante (ya viene logueado desde el seed)
    // 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con modalidades "Virtual/Presencial"
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');
    await page.goto(OFERTA_HU09_PRIMARIA_URL);
    await page.waitForURL('**/ofertas/**');
    
    // 3-4. Seleccionar horario disponible y abrir modal
    const requestModalOpened = await openRequestModal(page);
    test.skip(!requestModalOpened, 'No hay horarios solicitables disponibles actualmente para esta oferta con esta cuenta.');
    
    // 5. Dejar la sección "Modalidad *" sin seleccionar
    // 6. Ingresar el mensaje
    const messageBox = page.getByRole('textbox', { name: 'Mensaje para el tutor' });
    await messageBox.fill('Necesito repasar integrales.');
    
    // 7. Hacer clic en el botón "Enviar Solicitud"
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El error de modalidad se muestra
    const modalidadError = page.getByText(/selecciona.*modalidad|modalidad.*obligatoria/i);
    await expect(modalidadError).toBeVisible();
  });
});
