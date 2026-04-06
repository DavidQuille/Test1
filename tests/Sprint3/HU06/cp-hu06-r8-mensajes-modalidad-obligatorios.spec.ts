import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { OFERTA_HU09_PRIMARIA_URL } from '../../config';
import { openRequestModal } from './helpers';

test.describe('Verificación de mensajes y modalidad obligatorios', () => {
  test('CP-HU-06-R8: Verificación de mensajes y modalidad obligatorios en solicitud de tutoría (dual modalidad)', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    // 2. Navegar a una tutoría con dual modalidad
    await loginAndGoto(page, 'http://localhost:3001/encuentra-tutoria');
    await page.goto(OFERTA_HU09_PRIMARIA_URL);
    await page.waitForURL('**/ofertas/**');
    
    // 3-4. Seleccionar horario disponible y abrir modal
    const requestModalOpened = await openRequestModal(page);
    test.skip(!requestModalOpened, 'No hay horarios solicitables disponibles actualmente para esta oferta con esta cuenta.');
    
    // 5. No seleccionar modalidad ni escribir mensaje
    // 6. Intentar enviar
    const enviarButton = page.getByRole('button', { name: 'Enviar Solicitud' });
    await enviarButton.click();
    
    // Verificación: Ambos errores se muestran
    const modalidadError = page.getByText(/selecciona.*modalidad|modalidad.*obligatoria/i);
    const mensajeError = page.locator('text=El mensaje es obligatorio.');
    
    await expect(modalidadError).toBeVisible();
    await expect(mensajeError).toBeVisible();
  });
});
