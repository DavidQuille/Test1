// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R1

import { test, expect } from '@playwright/test';

import {
  expectCalendarScaffold,
  expectRightPanelScaffold,
  expectTopNav,
  loginAndOpenAgenda,
  monthHeading,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R1: Verificar navegación a la vista principal Mi Agenda', async ({ page }) => {
    await loginAndOpenAgenda(page);

    await expect(page.getByRole('heading', { name: 'Mi Agenda' })).toBeVisible();
    await expect(page.getByText('Calendario de sesiones confirmadas')).toBeVisible();

    await expectTopNav(page);
    await expectCalendarScaffold(page);
    await expectRightPanelScaffold(page);

    await expect(monthHeading(page)).not.toBeEmpty();
  });
});
