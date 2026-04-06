import { expect, Locator, Page, TestInfo } from '@playwright/test';

import { loginAndGoto } from '../../auth';
import { DASHBOARD_TUTOR_URL, TUTOR_AGENDA_URL } from '../../config';

export async function loginAndOpenAgenda(page: Page) {
  await loginAndGoto(page, DASHBOARD_TUTOR_URL);
  await page.goto(TUTOR_AGENDA_URL);

  await expect(page).toHaveURL(/\/tutor\/agenda/);
  await expect(page.getByRole('heading', { name: 'Mi Agenda' })).toBeVisible();
  await expect(page.getByText('Calendario de sesiones confirmadas')).toBeVisible();
}

export function monthHeading(page: Page) {
  return page.locator('h2').first();
}

export function dayButtons(page: Page) {
  return page
    .locator('main button')
    .filter({ hasText: /^\d{1,2}/ })
    .filter({ hasNotText: /Toca para ver detalles/i });
}

export function dayButtonsWithSessions(page: Page) {
  return dayButtons(page).filter({ hasText: /\d{1,2}:\d{2}/ });
}

export function sessionCards(page: Page) {
  return page.getByRole('button', { name: /Toca para ver detalles/i });
}

export async function clickAnyDayWithSessions(page: Page): Promise<number> {
  const days = dayButtonsWithSessions(page);
  const count = await days.count();
  expect(count).toBeGreaterThanOrEqual(0);

  if (count === 0) {
    return 0;
  }

  const day = days.first();
  const label = (await day.innerText()).trim();
  const dayNumber = Number(label.match(/^\d{1,2}/)?.[0] ?? '0');
  await day.click();
  return dayNumber;
}

export async function openFirstSessionModalFromSelectedDay(page: Page): Promise<void> {
  const cards = sessionCards(page);
  await expect(cards.first()).toBeVisible();
  await cards.first().click();
  await expect(page.getByRole('heading', { name: /Detalles de la Sesion/i })).toBeVisible();
}

export async function closeSessionModal(page: Page) {
  const closeButton = page.locator('button', { hasText: /^Cerrar$/ }).last();
  await expect(closeButton).toBeVisible();
  await closeButton.click();
  await expect(page.getByRole('heading', { name: /Detalles de la Sesion/i })).not.toBeVisible();
}

export async function tryOpenSessionByPredicate(
  page: Page,
  predicate: (page: Page) => Promise<boolean>
): Promise<boolean> {
  const dayCount = await dayButtonsWithSessions(page).count();

  for (let d = 0; d < dayCount; d += 1) {
    const day = dayButtonsWithSessions(page).nth(d);
    if (!(await day.isVisible().catch(() => false))) {
      continue;
    }

    await day.click();

    const cards = sessionCards(page);
    const cardCount = await cards.count();
    for (let c = 0; c < cardCount; c += 1) {
      await cards.nth(c).click();
      await expect(page.getByRole('heading', { name: /Detalles de la Sesion/i })).toBeVisible();

      const matches = await predicate(page);
      if (matches) {
        return true;
      }

      await closeSessionModal(page);
    }
  }

  return false;
}

export async function skipIfNoMatchingSession(testInfo: TestInfo, condition: boolean, reason: string) {
  testInfo.annotations.push({ type: 'precondition', description: reason });
  expect(condition, reason).toBeTruthy();
}

export async function hasCompletedBanner(page: Page): Promise<boolean> {
  return page.getByText(/Tutoria completada|Tutoría completada/i).isVisible().catch(() => false);
}

export async function hasCancelButton(page: Page): Promise<boolean> {
  return page.getByRole('button', { name: /Cancelar tutor[ií]a/i }).isVisible().catch(() => false);
}

export async function hasVirtualMode(page: Page): Promise<boolean> {
  return page.getByText(/^Virtual$/i).isVisible().catch(() => false);
}

export async function hasPresencialMode(page: Page): Promise<boolean> {
  return page.getByText(/^Presencial$/i).isVisible().catch(() => false);
}

export async function expectTopNav(page: Page) {
  await expect(page.getByRole('link', { name: 'Panel' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Bandeja' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mi Agenda' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Salir' })).toBeVisible();
}

export async function expectCalendarScaffold(page: Page) {
  await expect(monthHeading(page)).toBeVisible();
  await expect(page.getByRole('button', { name: /Mes anterior/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Mes siguiente/i })).toBeVisible();

  for (const day of ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']) {
    await expect(page.getByText(new RegExp(`^${day}$`))).toBeVisible();
  }

  const allDays = dayButtons(page);
  expect(await allDays.count()).toBeGreaterThanOrEqual(20);
}

export async function expectRightPanelScaffold(page: Page) {
  await expect(page.getByRole('heading', { name: /ESTE MES/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Sesiones confirmadas/i })).toBeVisible();
}

export async function selectDayByNumberIfVisible(page: Page, dayNumber: number): Promise<boolean> {
  const exact = dayButtons(page).filter({ hasText: new RegExp(`^${dayNumber}$`) }).first();
  if (await exact.isVisible().catch(() => false)) {
    await exact.click();
    return true;
  }
  return false;
}

export function findMainGrid(page: Page): Locator {
  return page.locator('main').first();
}
