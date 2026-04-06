import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { OFERTA_HU09_PRIMARIA_URL } from '../../config';
import { openRequestModal } from './helpers';

test.describe('Verificación de mensaje obligatorio en solicitud de tutoría (dual modalidad)', () => {
  test('CP-HU-06-R7: Verificación de mensaje obligatorio en solicitud de tutoría (dual modalidad, modalidad seleccionada)', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    // 2. Navegar a una tutoría con dual modalidad
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');
    await page.goto(OFERTA_HU09_PRIMARIA_URL);
    await page.waitForURL('**/ofertas/**');
    
    // 3-4. Seleccionar horario disponible y abrir modal
    const requestModalOpened = await openRequestModal(page);
    test.skip(!requestModalOpened, 'No hay horarios solicitables disponibles actualmente para esta oferta con esta cuenta.');
    
    // 5. Seleccionar modalidad "Presencial"
    const presencialButton = page.getByRole('button', { name: /Presencial/i });
    await presencialButton.click();
    
    // 6. Dejar el mensaje vacío e intentar enviar
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: El error de mensaje se muestra
    const errorMessage = page.locator('text=El mensaje es obligatorio.');
    await expect(errorMessage).toBeVisible();
  });
});
