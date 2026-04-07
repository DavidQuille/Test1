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
  withHu23ExclusiveAccess,
} from './helpers';

test.describe.configure({ mode: 'serial' });

test.describe('HU23 - Rechazo de solicitudes de tutoría', () => {
  test('CP-HU-23-R5: Cancelar rechazo con motivo Otro sin comentario', async ({ page }) => {
    await withHu23ExclusiveAccess(async () => {
    // 1-2. Iniciar sesión y navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    const pendingBefore = await getTabCount(page, 'Pendientes');
    const respondedBefore = await getTabCount(page, 'Respondidas');

    // 3-4. Abrir solicitud pendiente y modal de rechazo.
    const opened = await openFirstPendingRequest(page);
    test.skip(!opened, 'No hay solicitudes pendientes visibles en el entorno.');
    await openRejectModal(page);

    // 5-6. Seleccionar "Otro" y mantener comentario vacío.
    await chooseReason(page, 'Otro');

    // 7. Cancelar.
    await cancelReject(page);

    // Expected Results.
    await expectRejectCancelled(page, pendingBefore, respondedBefore);
    });
  });
});
