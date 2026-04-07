// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
  ratingCommentBox,
  ratingModal,
  selectStars,
} from './helpers';

test('CP-HU-10-02: Envio Exitoso de Resena con Comentario y Calificacion', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  const targetCard = calificarButton.locator('xpath=ancestor::*[@role="button"][1]');
  const targetTitle = (await targetCard.locator('p').first().innerText()).trim();

  await calificarButton.click();
  await expect(ratingModal(page)).toBeVisible();

  const comment = 'Excelente tutor, muy claro en sus explicaciones y dispuesto a ayudar.';
  await selectStars(page, 4);
  await ratingCommentBox(page).fill(comment);
  await page.getByRole('button', { name: 'Enviar Reseña' }).click();

  await expect(ratingModal(page)).toBeHidden();
  const updatedCard = page
    .getByRole('button', { name: new RegExp(targetTitle, 'i') })
    .filter({ hasText: 'TU CALIFICACIÓN' })
    .first();

  await expect(updatedCard).toBeVisible();
  await expect(updatedCard.getByText(comment)).toBeVisible();
  await expect(updatedCard.getByText('Completada')).toBeVisible();
  await expect(updatedCard.getByRole('button', { name: 'Calificar' })).toHaveCount(0);
});
