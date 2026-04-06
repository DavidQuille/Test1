import { expect, Locator, Page } from '@playwright/test';

import { loginAndGoto } from '../../auth';
import { ESTUDIANTE_AGENDA_URL } from '../../config';

export async function loginAndOpenStudentAgenda(page: Page) {
  await loginAndGoto(page, ESTUDIANTE_AGENDA_URL);
  await page.goto(ESTUDIANTE_AGENDA_URL);

  await expect(page).toHaveURL(/\/agenda$/);
  await expect(page.getByRole('heading', { name: /Tutorias Agendadas/i })).toBeVisible();
}

export async function expectStudentAgendaTopNav(page: Page) {
  await expect(page.getByRole('link', { name: 'Poli Tutorías' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explorar' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mis Solicitudes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Agenda' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Salir' })).toBeVisible();
  await expect(page.getByText(/Patricio/i)).toBeVisible();
}

export function upcomingHeading(page: Page) {
  return page.getByRole('heading', { name: /PROXIMAS/i });
}

export function previousHeading(page: Page) {
  return page.getByRole('heading', { name: /ANTERIORES/i });
}

export function upcomingCards(page: Page): Locator {
  return page.getByRole('button').filter({ hasText: /En\s+\d+\s+dias/i });
}

export async function hasPreviousSection(page: Page): Promise<boolean> {
  return previousHeading(page).isVisible().catch(() => false);
}

export async function hasViewAllPrevious(page: Page): Promise<boolean> {
  return page.getByRole('button', { name: /Ver todas las anteriores/i }).isVisible().catch(() => false);
}

export async function openFirstUpcomingSession(page: Page) {
  const cards = upcomingCards(page);
  await expect(cards.first()).toBeVisible();
  await cards.first().click();
  await expect(page.getByRole('dialog', { name: /Detalles de la sesion/i })).toBeVisible();
}

export async function closeModalWithButton(page: Page) {
  const closeButton = page.getByRole('button', { name: 'Cerrar', exact: true });
  await expect(closeButton).toBeVisible();
  await closeButton.click();
  await expect(page.getByRole('dialog', { name: /Detalles de la sesion/i })).toHaveCount(0);
}

export async function closeModalWithX(page: Page) {
  const closeX = page.getByRole('button', { name: /Cerrar modal/i });
  await expect(closeX).toBeVisible();
  await closeX.click();
  await expect(page.getByRole('dialog', { name: /Detalles de la sesion/i })).toHaveCount(0);
}

export async function openUpcomingSessionByMode(page: Page, mode: 'Virtual' | 'Presencial'): Promise<boolean> {
  const cards = upcomingCards(page);
  const count = await cards.count();

  for (let i = 0; i < count; i += 1) {
    const card = cards.nth(i);
    const text = await card.innerText();
    if (!new RegExp(mode, 'i').test(text)) {
      continue;
    }

    await card.click();
    await expect(page.getByRole('dialog', { name: /Detalles de la sesion/i })).toBeVisible();
    return true;
  }

  return false;
}

export async function expectModalCommonFields(page: Page) {
  await expect(page.getByRole('heading', { name: /Detalles de la Sesión/i })).toBeVisible();
  await expect(page.getByText(/TU MENSAJE|Mensaje/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cerrar', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Cancelar/i })).toHaveCount(0);
}
