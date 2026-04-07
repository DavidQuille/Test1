import { expect, Page } from '@playwright/test';

import { loginAndGoto } from '../../auth';
import { ENCUENTRA_TUTORIA_URL } from '../../config';

const TARGET_OFFER_NAME = /Álgebra Lineal — Virtual|Cálculo Diferencial — Detalle Completo/i;

export async function loginStudentAndOpenReviewsOffer(page: Page) {
  await loginAndGoto(page, ENCUENTRA_TUTORIA_URL);

  const targetLink = page.getByRole('link', { name: TARGET_OFFER_NAME }).first();
  if (await targetLink.isVisible().catch(() => false)) {
    await targetLink.click();
  } else {
    const firstOfferLink = page.locator('main a[href^="/ofertas/"]').first();
    if (!(await firstOfferLink.isVisible().catch(() => false))) {
      return false;
    }

    await firstOfferLink.click();
  }

  await page.waitForURL(/\/ofertas\//);

  const reviewsHeading = page.getByRole('heading', { name: 'Reseñas de Estudiantes' });
  if (!(await reviewsHeading.waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false))) {
    return false;
  }

  await reviewsHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);

  await expect(reviewsHeading).toBeVisible();
  return true;
}

export function reviewsSection(page: Page) {
  return page.getByRole('heading', { name: 'Reseñas de Estudiantes' });
}

export function reviewsCounter(page: Page) {
  return page.locator('text=/Mostrando\\s+\\d+\\s+de\\s+\\d+\\s+reseñas/i');
}

export function loadMoreReviewsButton(page: Page) {
  return page.getByRole('button', { name: 'Ver más reseñas' });
}

export async function scrollToReviews(page: Page) {
  const heading = reviewsSection(page);
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
}
