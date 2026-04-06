// spec: specs/Sprint3/CasosHU11.md
// case: CP-HU-11-05

import { test, expect } from '@playwright/test';

import {
  closeModalWithX,
  loginAndOpenStudentAgenda,
  openFirstUpcomingSession,
  upcomingCards,
  upcomingHeading,
} from './helpers';

test.describe('HU11 - Agenda Estudiante', () => {
  test('CP-HU-11-05: Cierre del modal de detalle de tutoría al hacer clic en el ícono X', async ({ page }) => {
    await loginAndOpenStudentAgenda(page);

    const cardsBefore = await upcomingCards(page).count();

    await openFirstUpcomingSession(page);
    await closeModalWithX(page);

    await expect(page.getByRole('heading', { name: /Tutorias Agendadas/i })).toBeVisible();
    await expect(upcomingHeading(page)).toBeVisible();
    await expect(upcomingCards(page).first()).toBeVisible();
    expect(await upcomingCards(page).count()).toBe(cardsBefore);
  });
});
