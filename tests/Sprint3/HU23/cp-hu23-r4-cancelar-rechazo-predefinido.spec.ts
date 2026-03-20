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
  test('CP-HU-23-R4: Cancelar rechazo con motivo predefinido seleccionado', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    const pendingBefore = await getTabCount(page, 'Pendientes');
    const respondedBefore = await getTabCount(page, 'Respondidas');

    // 3-4. Abrir solicitud pendiente y modal de rechazo.
    await openFirstPendingRequest(page);
    await openRejectModal(page);

    // 5. Seleccionar motivo predefinido.
    await chooseReason(page, 'Imprevisto personal');

    // 6. Cancelar.
    await cancelReject(page);

    // Expected Results.
    await expectRejectCancelled(page, pendingBefore, respondedBefore);
  });
});
