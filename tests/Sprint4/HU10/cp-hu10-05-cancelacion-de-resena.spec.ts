// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalStartingFromHistoryCalificar,
  ratingCommentBox,
  selectStars,
} from './helpers';

test('CP-HU-10-05: Cancelacion de Resena', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available } = await openRatingModalStartingFromHistoryCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await selectStars(page, 3);
  await ratingCommentBox(page).fill('Este es un comentario de prueba para cancelar.');
  await page.getByRole('button', { name: 'Cancelar' }).click();

  await expect(page.getByText('Califica tu tutoría')).toBeHidden();
  await expect(page).toHaveURL(/\/historial$/);
  await expect(page.getByRole('button', { name: 'Calificar' }).first()).toBeVisible();
  await expect(page.getByText('Completada').first()).toBeVisible();
});
