// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  clickCardContainerFromCalificarButton,
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
  ratingStars,
} from './helpers';

test('CP-HU-10-09: Apertura de Modal de Calificacion desde Detalle de Tutoria Completada', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await clickCardContainerFromCalificarButton(page);
  await expect(page.getByText('Detalle de la Tutoría')).toBeVisible();

  await page.getByRole('dialog', { name: 'Detalle de la Tutoría' }).getByRole('button', { name: 'Calificar' }).click();

  await expect(page.getByText('Califica tu tutoría')).toBeVisible();
  await expect(ratingStars(page)).toHaveCount(5);
  await expect(page.getByRole('textbox')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enviar Reseña' })).toBeDisabled();
});
