// spec: specs/Sprint4/CasosHU10.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  detailModal,
  loginStudentAndOpenHistory,
  openDetailFromFirstRatedCard,
} from './helpers';

test('CP-HU-10-06: Visualizacion de Detalle de Tutoria Calificada', async ({ page }) => {
  await loginStudentAndOpenHistory(page);

  const { available } = await openDetailFromFirstRatedCard(page);
  test.skip(available === 0, 'No hay tutorias ya calificadas visibles en este entorno.');

  await expect(detailModal(page)).toBeVisible();
  await expect(page.getByText('Tu Reseña')).toBeVisible();
  const cerrarButton = page.getByRole('button', { name: 'Cerrar', exact: true });
  await expect(cerrarButton).toBeVisible();
  await expect(cerrarButton).toBeEnabled();
});
