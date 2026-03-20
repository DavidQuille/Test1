// spec: specs/Sprint3/CasosHu23.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';

import {
  cancelReject,
  chooseReason,
  expectRejectCancelled,
  getTabCount,
  loginAndOpenInbox,
  openFirstPendingRequest,
  openRejectModal,
} from './helpers';

test.describe('HU23 - Rechazo de solicitudes de tutoría', () => {
  test('CP-HU-23-R6: Cancelar rechazo con motivo Otro con comentario', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    const pendingBefore = await getTabCount(page, 'Pendientes');
    const respondedBefore = await getTabCount(page, 'Respondidas');

    // 3-4. Abrir solicitud pendiente y modal de rechazo.
    await openFirstPendingRequest(page);
    await openRejectModal(page);

    // 5-6. Seleccionar "Otro" y escribir comentario.
    await chooseReason(page, 'Otro');
    await page.getByRole('textbox', { name: 'Comentario adicional (opcional)' }).fill('Revisar agenda');

    // 7. Cancelar.
    await cancelReject(page);

    // Expected Results.
    await expectRejectCancelled(page, pendingBefore, respondedBefore);
  });
});
