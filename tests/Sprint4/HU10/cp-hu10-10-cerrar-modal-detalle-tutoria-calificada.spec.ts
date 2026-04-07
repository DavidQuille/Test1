// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  clickCardContainerFromCalificarButton,
  loginStudentAndOpenHistory,
  openRatingModalFromFirstCompletedWithCalificar,
} from './helpers';

test('CP-HU-10-10: Cerrar Modal de Detalle de Tutoria Calificada', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available, calificarButton } = await openRatingModalFromFirstCompletedWithCalificar(page);
  test.skip(available === 0, 'No hay tutorias Completadas pendientes de calificar en este entorno.');

  await calificarButton.click();
  await page.getByRole('button', { name: 'Calificación 4' }).click();
  await page.getByRole('button', { name: 'Enviar Reseña' }).click();

  await clickCardContainerFromCalificarButton(page);
  await expect(page.getByText('Detalle de la Tutoría')).toBeVisible();

  await page.getByRole('button', { name: 'Cerrar' }).click();

  await expect(page.getByText('Detalle de la Tutoría')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Historial de Tutorías' })).toBeVisible();
});
