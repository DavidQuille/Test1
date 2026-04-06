// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R3

import { test, expect } from '@playwright/test';

import {
  closeSessionModal,
  hasCancelButton,
  hasCompletedBanner,
  hasVirtualMode,
  loginAndOpenAgenda,
  tryOpenSessionByPredicate,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R3: Verificar visualización del modal Detalle Tutoría para una tutoría Virtual Pendiente', async ({ page }) => {
    await loginAndOpenAgenda(page);

    const found = await tryOpenSessionByPredicate(page, async p => {
      const virtual = await hasVirtualMode(p);
      const completed = await hasCompletedBanner(p);
      return virtual && !completed;
    });

    test.skip(!found, 'No hay sesión Virtual Pendiente disponible en los datos actuales para validar la precondición.');

    await expect(page.getByRole('heading', { name: /Detalles de la Sesion/i })).toBeVisible();
    await expect(page.getByText(/^Virtual$/i)).toBeVisible();
    await expect(page.getByText(/ENLACE/i)).toBeVisible();
    await expect(page.getByText(/MENSAJE DEL ESTUDIANTE/i)).toBeVisible();

    const cancelVisible = await hasCancelButton(page);
    await expect(page.getByRole('button', { name: /^Cerrar$/ })).toBeVisible();
    expect(cancelVisible).toBeTruthy();

    await closeSessionModal(page);
  });
});
