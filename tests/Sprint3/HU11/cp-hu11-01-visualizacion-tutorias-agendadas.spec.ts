// spec: specs/Sprint3/CasosHU11.md
// case: CP-HU-11-01

import { test, expect } from '@playwright/test';

import {
  expectStudentAgendaTopNav,
  hasPreviousSection,
  hasViewAllPrevious,
  loginAndOpenStudentAgenda,
  previousHeading,
  upcomingCards,
  upcomingHeading,
} from './helpers';

test.describe('HU11 - Agenda Estudiante', () => {
  test('CP-HU-11-01: Visualización de la pantalla Tutorías Agendadas al navegar desde el menú', async ({ page }) => {
    await loginAndOpenStudentAgenda(page);

    await expectStudentAgendaTopNav(page);

    await expect(page.getByRole('heading', { name: /Tutorias Agendadas/i })).toBeVisible();
    await expect(page.getByText(/Lista cronologica de tus sesiones confirmadas/i)).toBeVisible();

    await expect(upcomingHeading(page)).toBeVisible();
    await expect(upcomingCards(page).first()).toBeVisible();

    const previousVisible = await hasPreviousSection(page);
    test.skip(!previousVisible, 'No hay sección ANTERIORES visible en los datos actuales para validar la precondición completa del caso.');

    await expect(previousHeading(page)).toBeVisible();
    const hasViewAll = await hasViewAllPrevious(page);
    expect(hasViewAll).toBeTruthy();
  });
});
