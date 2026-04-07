// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
} from './helpers';

test("CP-HU-10-07: Habilitacion del Boton 'Enviar Reseña' al Seleccionar Estrellas", async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await calificarButton.click();

  const submitButton = page.getByRole('button', { name: 'Enviar Reseña' });
  await expect(submitButton).toBeDisabled();

  await page.getByRole('button', { name: /^Calificación$/ }).first().click();

  await expect(submitButton).toBeEnabled();
});
