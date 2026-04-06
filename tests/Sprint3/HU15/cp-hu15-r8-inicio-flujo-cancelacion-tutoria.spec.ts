// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R8

import { test, expect } from '@playwright/test';

import {
  hasCancelButton,
  hasCompletedBanner,
  loginAndOpenAgenda,
  tryOpenSessionByPredicate,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R8: Verificar el inicio del flujo de cancelación de tutoría desde el modal de detalle', async ({ page }) => {
    await loginAndOpenAgenda(page);

    const found = await tryOpenSessionByPredicate(page, async p => {
      const completed = await hasCompletedBanner(p);
      const canCancel = await hasCancelButton(p);
      return !completed && canCancel;
    });

    test.skip(!found, 'No hay sesión pendiente cancelable disponible en los datos actuales para validar la precondición.');

    await page.getByRole('button', { name: /Cancelar tutor[ií]a/i }).click();

    await expect(page.getByRole('heading', { name: /Detalles de la Sesion/i })).not.toBeVisible();

    const destructiveFlowVisible =
      (await page.getByText(/motivo|justific|cancelaci[oó]n|confirmar/i).first().isVisible().catch(() => false)) ||
      (await page.getByRole('dialog').first().isVisible().catch(() => false));

    expect(destructiveFlowVisible).toBeTruthy();
  });
});
