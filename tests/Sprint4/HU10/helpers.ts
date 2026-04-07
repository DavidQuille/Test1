import { expect, Page } from '@playwright/test';

import { loginAndGoto } from '../../auth';
import { ESTUDIANTE_HISTORIAL_URL } from '../../config';

export async function loginStudentAndOpenHistory(page: Page) {
  await loginAndGoto(page, ESTUDIANTE_HISTORIAL_URL);

  if (!page.url().includes('/historial')) {
    await page.getByRole('link', { name: 'Historial' }).click();
  }

  await expect(page).toHaveURL(/\/historial$/);
  await expect(page.getByRole('heading', { name: /Historial de Tutorías/i })).toBeVisible();
}

export async function openRatingModalFromFirstCompletedWithCalificar(page: Page) {
  const calificarButtons = page.locator('main button', { hasText: /^Calificar$/ });
  const available = await calificarButtons.count();

  return {
    available,
    calificarButton: calificarButtons.first(),
  };
}

export async function clickCardContainerFromCalificarButton(page: Page) {
  const card = page.getByRole('main').getByRole('button', { name: /Completada/i }).filter({
    has: page.getByRole('button', { name: 'Calificar' }),
  });
  await card.first().click();
}

export function ratingStars(page: Page) {
  return page.locator('button[aria-label^="Calificación"]');
}

export function ratingModal(page: Page) {
  return page.getByRole('dialog', { name: /Califica tu tutoría/i });
}

export function detailModal(page: Page) {
  return page.getByRole('dialog', { name: /Detalle de la Tutoría/i });
}

export function ratingCommentBox(page: Page) {
  return page.getByPlaceholder(/Escribe un comentario/i);
}

export async function openRatingModalStartingFromHistoryCalificar(page: Page) {
  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  if (available === 0) {
    return { available };
  }

  await calificarButton.click();

  if (await detailModal(page).isVisible()) {
    await detailModal(page).getByRole('button', { name: 'Calificar' }).click();
  }

  await expect(ratingModal(page)).toBeVisible();
  return { available };
}

export async function selectStars(page: Page, stars: number) {
  await ratingStars(page).nth(stars - 1).click();
}

export async function openDetailFromFirstRatedCard(page: Page) {
  const ratedCard = page.getByRole('main').getByRole('button', { name: /Tu Calificación/i });
  const available = await ratedCard.count();
  if (available === 0) {
    return { available };
  }

  await ratedCard.first().click();
  await expect(detailModal(page)).toBeVisible();
  return { available };
}
