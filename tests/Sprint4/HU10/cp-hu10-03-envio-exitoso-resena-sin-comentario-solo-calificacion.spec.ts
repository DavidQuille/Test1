// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
  ratingModal,
  selectStars,
} from './helpers';

test('CP-HU-10-03: Envio Exitoso de Resena sin Comentario, solo Calificacion', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  const targetCard = calificarButton.locator('xpath=ancestor::*[@role="button"][1]');
  const targetTitle = (await targetCard.locator('p').first().innerText()).trim();

  await calificarButton.click();
  await expect(ratingModal(page)).toBeVisible();

  await selectStars(page, 5);
  await page.getByRole('button', { name: 'Enviar Reseña' }).click();

  await expect(ratingModal(page)).toBeHidden();

  const updatedCard = page
    .getByRole('button', { name: new RegExp(targetTitle, 'i') })
    .filter({ hasText: 'TU CALIFICACIÓN' })
    .first();

  await expect(updatedCard).toBeVisible();
  await expect(updatedCard.getByText('Completada')).toBeVisible();
  await expect(updatedCard.getByRole('button', { name: 'Calificar' })).toHaveCount(0);
});
