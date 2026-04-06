// spec: specs/Sprint3/CasosHU11.md
// case: CP-HU-11-03

import { test, expect } from '@playwright/test';

import {
  closeModalWithButton,
  expectModalCommonFields,
  loginAndOpenStudentAgenda,
  openUpcomingSessionByMode,
} from './helpers';

test.describe('HU11 - Agenda Estudiante', () => {
  test('CP-HU-11-03: Visualización del modal de detalle para tutoría presencial próxima', async ({ page }) => {
    await loginAndOpenStudentAgenda(page);

    const foundPresencial = await openUpcomingSessionByMode(page, 'Presencial');
    test.skip(!foundPresencial, 'No hay tutoría próxima en modalidad Presencial en los datos actuales.');

    await expectModalCommonFields(page);
    const dialog = page.getByRole('dialog', { name: /Detalles de la sesion/i });
    await expect(dialog.getByText(/^Presencial$/i)).toBeVisible();
    await expect(dialog.getByText(/LUGAR/i)).toBeVisible();

    await closeModalWithButton(page);
  });
});
