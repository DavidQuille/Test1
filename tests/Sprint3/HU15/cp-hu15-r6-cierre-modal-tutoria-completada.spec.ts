// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R6

import { test, expect } from '@playwright/test';

import {
  closeSessionModal,
  hasCompletedBanner,
  loginAndOpenAgenda,
  sessionCards,
  tryOpenSessionByPredicate,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R6: Verificar el cierre del modal de detalle de tutoría Completada', async ({ page }) => {
    await loginAndOpenAgenda(page);

    const found = await tryOpenSessionByPredicate(page, async p => hasCompletedBanner(p));
    test.skip(!found, 'No hay sesión completada disponible en los datos actuales para validar la precondición.');

    await closeSessionModal(page);

    await expect(page.getByRole('heading', { name: 'Mi Agenda' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /ESTE MES/i })).toBeVisible();
    await expect(sessionCards(page).first()).toBeVisible();
  });
});
