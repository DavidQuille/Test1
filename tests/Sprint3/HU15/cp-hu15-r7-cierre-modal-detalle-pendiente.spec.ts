// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R7

import { test, expect } from '@playwright/test';

import {
  closeSessionModal,
  hasCancelButton,
  hasCompletedBanner,
  loginAndOpenAgenda,
  sessionCards,
  tryOpenSessionByPredicate,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R7: Verificar el cierre del modal de detalle de tutoría virtual/presencial pendiente', async ({ page }) => {
    await loginAndOpenAgenda(page);

    const found = await tryOpenSessionByPredicate(page, async p => {
      const completed = await hasCompletedBanner(p);
      const canCancel = await hasCancelButton(p);
      return !completed && canCancel;
    });

    test.skip(!found, 'No hay sesión pendiente cancelable disponible en los datos actuales para validar la precondición.');

    const selectedDayHeader = (await page.locator('aside h3').first().textContent())?.trim() ?? '';

    await closeSessionModal(page);

    await expect(page.getByRole('heading', { name: 'Mi Agenda' })).toBeVisible();
    if (selectedDayHeader) {
      await expect(page.getByRole('heading', { name: new RegExp(selectedDayHeader, 'i') })).toBeVisible();
    }
    await expect(sessionCards(page).first()).toBeVisible();
  });
});
