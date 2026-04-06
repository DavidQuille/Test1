// spec: specs/Sprint3/CasosHU11.md
// case: CP-HU-11-02

import { test, expect } from '@playwright/test';

import {
  closeModalWithButton,
  expectModalCommonFields,
  loginAndOpenStudentAgenda,
  openUpcomingSessionByMode,
} from './helpers';

test.describe('HU11 - Agenda Estudiante', () => {
  test('CP-HU-11-02: Visualización del modal de detalle para tutoría virtual próxima', async ({ page }) => {
    await loginAndOpenStudentAgenda(page);

    const foundVirtual = await openUpcomingSessionByMode(page, 'Virtual');
    test.skip(!foundVirtual, 'No hay tutoría próxima en modalidad Virtual en los datos actuales.');

    await expectModalCommonFields(page);
    await expect(page.getByText(/^Virtual$/i)).toBeVisible();
    await expect(page.getByText(/ENLACE/i)).toBeVisible();

    await closeModalWithButton(page);
  });
});
