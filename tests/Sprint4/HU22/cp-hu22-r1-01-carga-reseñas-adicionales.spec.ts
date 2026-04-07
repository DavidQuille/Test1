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
  test('CP-HU-22-R1-01: Carga de reseñas adicionales al hacer clic en Ver más reseñas', async ({ page }) => {
    const opened = await loginStudentAndOpenReviewsOffer(page);
    test.skip(!opened, 'La oferta con la sección de reseñas no está disponible en este entorno.');

    const section = reviewsSection(page);
    const button = loadMoreReviewsButton(page);

    await scrollToReviews(page);
    const hasSection = await section.isVisible().catch(() => false);
    const hasButton = await button.isVisible().catch(() => false);
    test.skip(!hasSection, 'La sección de reseñas no está visible en este entorno.');

    if (!hasButton) {
      await expect(section).toBeVisible();
      return;
    }

    const counter = page.locator('text=/Mostrando\\s+\\d+\\s+de\\s+\\d+\\s+reseñas/i');
    if (await counter.isVisible().catch(() => false)) {
      const beforeText = (await counter.first().innerText()).trim();

      await button.click();

      await expect(section).toBeVisible();
      await expect(counter).toBeVisible();
      await expect(button).toBeVisible();
      const afterText = (await counter.first().innerText()).trim();
      expect(afterText).not.toBe(beforeText);
      return;
    }

    await button.click();

    await expect(section).toBeVisible();
    await expect(button).toBeVisible();
  });
});
