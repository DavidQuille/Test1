// spec: specs/Sprint4/CasosHU40.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ESTUDIANTE_HISTORIAL_URL, LOGIN_URL } from '../../config';

test.describe('Historial de Tutorías (HU40)', () => {
  test('CP-HU-40-R1: Visualización inicial de la pantalla "Historial de Tutorías"', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante.
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('patricio.c@epn.edu.ec');
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // 2. Hacer clic en la opción "Historial" del menú superior de navegación.
    await page.getByRole('link', { name: 'Historial' }).click();

    // Expected Results
    await expect(page).toHaveURL(ESTUDIANTE_HISTORIAL_URL);
    await expect(page.getByRole('heading', { name: 'Historial de Tutorías' })).toBeVisible();
    await expect(page.getByText('Tutorías que has recibido y calificado')).toBeVisible();

    const logo = page.getByRole('link', { name: 'Poli Tutorías' });
    await expect(logo).toBeVisible();

    await expect(page.getByRole('link', { name: 'Explorar' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mis Solicitudes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Agenda' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Historial' })).toBeVisible();
    await expect(page.getByText('Patricio Chancusig', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Salir' })).toBeVisible();

    await expect(page.getByRole('button', { name: /Completada/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Inasistencia/ }).first()).toBeVisible();

    const pagination = page.getByRole('navigation', { name: 'Paginación' });
    await expect(pagination.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
    await expect(pagination.getByRole('button', { name: 'Página 1' })).toBeVisible();
    await expect(pagination.getByRole('button', { name: 'Página 2' })).toBeVisible();
    await expect(pagination.getByRole('button', { name: 'Página siguiente' })).toBeVisible();
  });
});