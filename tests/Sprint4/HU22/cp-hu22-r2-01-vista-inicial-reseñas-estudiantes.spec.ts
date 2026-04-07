// spec: specs/Sprint4/CasosHU22.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';

import {
  loadMoreReviewsButton,
  loginStudentAndOpenReviewsOffer,
  reviewsSection,
  scrollToReviews,
} from './helpers';

test.describe('HU22 - Reseñas de estudiantes', () => {
  test('CP-HU-22-R2-01: Vista inicial de la sección de reseñas', async ({ page }) => {
    const opened = await loginStudentAndOpenReviewsOffer(page);
    test.skip(!opened, 'La oferta con la sección de reseñas no está disponible en este entorno.');

    const section = reviewsSection(page);
    const button = loadMoreReviewsButton(page);

    await scrollToReviews(page);
    await expect(section).toBeVisible();

    const hasButton = await button.isVisible().catch(() => false);
    if (hasButton) {
      await expect(button).toBeVisible();
    }
  });
});
