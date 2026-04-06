// spec: specs/Sprint3/CasosHU11.md
// case: CP-HU-11-04

import { test, expect } from '@playwright/test';

import {
  closeModalWithButton,
  loginAndOpenStudentAgenda,
  openFirstUpcomingSession,
  upcomingCards,
  upcomingHeading,
} from './helpers';

test.describe('HU11 - Agenda Estudiante', () => {
  test('CP-HU-11-04: Cierre del modal de detalle de tutoría al hacer clic en el botón Cerrar', async ({ page }) => {
    await loginAndOpenStudentAgenda(page);

    const cardsBefore = await upcomingCards(page).count();

    await openFirstUpcomingSession(page);
    await closeModalWithButton(page);

    await expect(page.getByRole('heading', { name: /Tutorias Agendadas/i })).toBeVisible();
    await expect(upcomingHeading(page)).toBeVisible();
    await expect(upcomingCards(page).first()).toBeVisible();
    expect(await upcomingCards(page).count()).toBe(cardsBefore);
  });
});
