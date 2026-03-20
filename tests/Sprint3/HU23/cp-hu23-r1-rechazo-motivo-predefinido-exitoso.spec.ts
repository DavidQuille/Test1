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
} from './helpers';

test.describe('HU23 - Rechazo de solicitudes de tutoría', () => {
  test('CP-HU-23-R1: Rechazo con motivo predefinido exitoso', async ({ page }) => {
    // 1. Iniciar sesión como Tutor y 2. navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    const pendingBefore = await getTabCount(page, 'Pendientes');
    const respondedBefore = await getTabCount(page, 'Respondidas');

    // 3. Desplegar los detalles de una solicitud pendiente.
    await openFirstPendingRequest(page);

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
