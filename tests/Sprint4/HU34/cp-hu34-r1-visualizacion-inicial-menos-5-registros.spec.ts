// spec: specs/Sprint4/CasosHu34.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAndGoto } from '../../../auth';
import { TUTOR_HISTORIAL_URL, BASE_URL } from '../../../config';

test.describe('CP-HU-39-R1: Visualización inicial del Historial de Tutorías con menos de 5 registros', () => {
  test('Visualización inicial del Historial de Tutorías con menos de 5 registros', async ({ page }) => {
    // 1. Iniciar sesión como Tutor.
    await loginAndGoto(page, TUTOR_HISTORIAL_URL);

    // Verificar logo 'Poli Tutorías' y menú de navegación superior
    await expect(page.getByRole('link', { name: 'Poli Tutorías' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Panel' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bandeja' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mi Agenda' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Historial' })).toBeVisible();
    
    // Verificar título principal y subtítulo
    await expect(page.getByRole('heading', { name: 'Historial de Tutorias Impartidas' })).toBeVisible();
    await expect(page.getByText('Registro de todas tus sesiones pasadas')).toBeVisible();

    // Verificar métricas estáticas
    await expect(page.getByText('Tutorias completadas')).toBeVisible();
    await expect(page.getByText('Materias impartidas')).toBeVisible();
    await expect(page.getByText('Estudiantes que califican')).toBeVisible();

    // Verificar listado de tarjetas de tutorías
    const tutoriaCard = page.locator('button').filter({ hasText: 'Cálculo Diferencial' });
    const cardCount = await tutoriaCard.count();
    expect(cardCount).toBeGreaterThan(0);

    // Verificar controles de paginación
    await expect(page.getByRole('button', { name: 'Pagina anterior' })).toBeVisible();
  });
});
