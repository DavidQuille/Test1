// spec: specs/Sprint3/CasosHu23.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

import {
  chooseReason,
  confirmReject,
  expectRejectSuccess,
  getTabCount,
  loginAndOpenInbox,
  openFirstPendingRequest,
  openRejectModal,
} from './helpers';

test.describe('HU23 - Exploratorio de motivos predefinidos', () => {
  test('Extra-01: Rechazar usando todos los motivos predefinidos disponibles', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Bandeja de Entrada.
    await loginAndOpenInbox(page);

    // 3-4. Abrir solicitud pendiente y modal de rechazo.
    await openFirstPendingRequest(page);
    await openRejectModal(page);

    const predefinidos = [
      'Imprevisto personal',
      'Conflicto de horarios con otra tutoría',
      'Enfermedad',
    ];

    for (const reason of predefinidos) {
      await expect(page.getByRole('radio', { name: reason })).toBeVisible();
    }

    for (const reason of predefinidos) {
      const pendingBefore = await getTabCount(page, 'Pendientes');
      const respondedBefore = await getTabCount(page, 'Respondidas');

      // Seleccionar motivo y confirmar rechazo.
      await chooseReason(page, reason);
      await confirmReject(page);
      await expectRejectSuccess(page, pendingBefore, respondedBefore);

      // Reabrir otra solicitud para continuar con el siguiente motivo.
      if (reason !== predefinidos[predefinidos.length - 1]) {
        await openFirstPendingRequest(page);
        await openRejectModal(page);
      }
    }
  });
});
