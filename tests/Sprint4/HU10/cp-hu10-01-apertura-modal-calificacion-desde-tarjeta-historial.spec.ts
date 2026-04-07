// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
  ratingModal,
  ratingStars,
} from './helpers';

test('CP-HU-10-01: Apertura de Modal de Calificacion desde Tarjeta de Historial', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await calificarButton.click();

  await expect(ratingModal(page)).toBeVisible();
  await expect(page.getByText(/¿Cómo calificarías/i)).toBeVisible();
  await expect(page.getByText(/¿Qué tal te pareció la clase\?/i)).toBeVisible();
  await expect(ratingStars(page)).toHaveCount(5);
  await expect(page.getByRole('button', { name: 'Enviar Reseña' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
});
