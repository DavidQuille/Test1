// spec: specs/Sprint3/CasosHu23.md
// seed: tests/seed.spec.ts

import { test } from '@playwright/test';

import {
  chooseReason,
  confirmReject,
  expectRejectSuccess,
  getTabCount,
  loginAndOpenInbox,
  openFirstPendingRequest,
  openRejectModal,
  withHu23ExclusiveAccess,
} from './helpers';

test.describe.configure({ mode: 'serial' });

test.describe('HU23 - Rechazo de solicitudes de tutoría', () => {
  test('CP-HU-23-R1: Rechazo con motivo predefinido exitoso', async ({ page }) => {
    await withHu23ExclusiveAccess(async () => {
    // 1. Iniciar sesión como Tutor y 2. navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    const pendingBefore = await getTabCount(page, 'Pendientes');
    const respondedBefore = await getTabCount(page, 'Respondidas');

    // 3. Desplegar los detalles de una solicitud pendiente.
    const opened = await openFirstPendingRequest(page);
    test.skip(!opened, 'No hay solicitudes pendientes visibles en el entorno.');

    // 4. Hacer clic en Rechazar.
    await openRejectModal(page);

    // 5. Seleccionar motivo predefinido.
    await chooseReason(page, 'Conflicto de horarios con otra tutoría');

    // 6. Confirmar rechazo.
    await confirmReject(page);

    // Expected Results.
    await expectRejectSuccess(page, pendingBefore, respondedBefore);
    });
  });
});
