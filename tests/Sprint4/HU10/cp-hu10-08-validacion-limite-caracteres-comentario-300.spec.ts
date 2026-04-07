// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
} from './helpers';

test('CP-HU-10-08: Validacion del Limite de Caracteres en el Campo de Comentario (300 caracteres)', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await calificarButton.click();

  const commentBox = page.getByRole('textbox');
  const text300 = 'a'.repeat(300);
  await commentBox.fill(text300);
  await expect(page.getByText(/300\s*\/\s*300/)).toBeVisible();
  await commentBox.type('b');

  await expect(commentBox).toHaveValue(text300);
});
