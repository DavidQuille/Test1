// spec: specs/Sprint3/CasosHU15.md
// case: CP-HU-15-R5

import { test, expect } from '@playwright/test';

import {
  closeSessionModal,
  hasCompletedBanner,
  loginAndOpenAgenda,
  tryOpenSessionByPredicate,
} from './helpers';

test.describe('HU15 - Mi Agenda', () => {
  test('CP-HU-15-R5: Verificar visualización del modal Detalle Tutoría para una tutoría Completada', async ({ page }) => {
    await loginAndOpenAgenda(page);

    const found = await tryOpenSessionByPredicate(page, async p => hasCompletedBanner(p));
    test.skip(!found, 'No hay sesión completada disponible en los datos actuales para validar la precondición.');

    await expect(page.getByRole('heading', { name: /Detalles de la Sesion/i })).toBeVisible();
    await expect(page.getByText(/Tutoria completada|Tutoría completada/i)).toBeVisible();

    await expect(page.locator('button', { hasText: /^Cerrar$/ }).last()).toBeVisible();
    await expect(page.getByRole('button', { name: /Cancelar tutor[ií]a/i })).toHaveCount(0);

    await closeSessionModal(page);
  });
});
