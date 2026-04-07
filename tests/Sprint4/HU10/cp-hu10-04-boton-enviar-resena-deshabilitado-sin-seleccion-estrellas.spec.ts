// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalStartingFromHistoryCalificar,
  ratingCommentBox,
  ratingModal,
} from './helpers';

test("CP-HU-10-04: Boton 'Enviar Reseña' Deshabilitado sin Seleccion de Estrellas", async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available } = await openRatingModalStartingFromHistoryCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await ratingCommentBox(page).fill('Quiero dejar un comentario sin calificar la tutoría.');

  await expect(page.getByRole('button', { name: 'Enviar Reseña' })).toBeDisabled();
  await expect(ratingModal(page)).toBeVisible();
});
