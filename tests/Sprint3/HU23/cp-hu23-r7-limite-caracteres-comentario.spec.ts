// spec: specs/Sprint3/CasosHu23.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

import {
  chooseReason,
  loginAndOpenInbox,
  openFirstPendingRequest,
  openRejectModal,
} from './helpers';

test.describe('HU23 - Rechazo de solicitudes de tutoría', () => {
  test('CP-HU-23-R7: Bloqueo de ingreso al exceder límite de comentario', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    // 3-4. Abrir solicitud pendiente y modal de rechazo.
    await openFirstPendingRequest(page);
    await openRejectModal(page);

    // 5-6. Seleccionar "Otro" e intentar ingresar 301 caracteres.
    await chooseReason(page, 'Otro');
    const commentInput = page.getByRole('textbox', { name: 'Comentario adicional (opcional)' });
    await commentInput.fill('C'.repeat(301));

    const value = await commentInput.inputValue();
    expect(value.length).toBe(300);

    // Expected Results.
    await expect(page.getByText('300/300')).toBeVisible();
  });
});
