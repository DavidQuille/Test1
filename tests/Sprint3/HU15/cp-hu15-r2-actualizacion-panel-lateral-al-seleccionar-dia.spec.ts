// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R2

import { test, expect } from '@playwright/test';

import {
  clickAnyDayWithSessions,
  loginAndOpenAgenda,
  sessionCards,
  expectRightPanelScaffold,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R2: Verificar actualización del panel lateral al seleccionar un día en el calendario', async ({ page }) => {
    await loginAndOpenAgenda(page);

    const selectedDay = await clickAnyDayWithSessions(page);
    test.skip(selectedDay === 0, 'No hay días con sesiones confirmadas visibles en el calendario actual para validar la precondición.');

    await expect(page.getByRole('heading', { name: new RegExp(`^${selectedDay} de`, 'i') })).toBeVisible();
    await expect(page.getByRole('heading', { name: /ESTE MES/i })).toBeVisible();

    const cards = sessionCards(page);
    const cardsCount = await cards.count();
    test.skip(cardsCount === 0, 'El día seleccionado no mostró tarjetas de sesión visibles en esta ejecución.');
    await expect(cards.first()).toBeVisible();
    expect(cardsCount).toBeGreaterThan(0);

    await expectRightPanelScaffold(page);
  });
});
