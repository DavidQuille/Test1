import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU33.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { MIS_SOLICITUDES_URL } from '../../config';

test.describe('Mis Solicitudes - Filtros', () => {
  test('CP-HU-33-R1: Verificar visualización del filtro Todas', async ({ page }) => {
    // Navegar a la pantalla de Mis Solicitudes
    await loginAndGoto(page, MIS_SOLICITUDES_URL);

    // Esperar a que carguen las solicitudes
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Hacer clic en la pestaña "Todas (X)" para verificar la visualización del filtro Todas
    await page.getByRole('button', { name: /Todas \(\d+\)/ }).click();

    // Verificar que la pestaña "Todas" está activa
    const todasButton = page.getByRole('button', { name: /Todas \(\d+\)/ });
    await expect(todasButton).toHaveClass(/border-primary/);

    // Verificar que se visualiza una lista de tarjetas con solicitudes
    const tarjetas = page.getByRole('button').filter({ has: page.locator('img') }).filter({ hasText: /Pendiente|Aceptada|Rechazada|Expirada/ });
    const tarjetasCount = await tarjetas.count();
    expect(tarjetasCount).toBeGreaterThan(0);

    // Verificar que cada tarjeta visible contiene los elementos requeridos
    const primeraTarjeta = tarjetas.first();
    
    // Verificar avatar
    await expect(primeraTarjeta.locator('img').first()).toBeVisible();

    // Verificar materia (heading)
    const materia = primeraTarjeta.locator('h3');
    await expect(materia).toBeVisible();

    // Verificar tutor (paragraph)
    const tutor = primeraTarjeta.locator('p');
    await expect(tutor).toBeVisible();

    // Verificar fecha/hora (debe contener formato de fecha)
    const fecha = primeraTarjeta.locator('text=/\\d{1,2}\\s\\w+\\s\\d{4}\\s·\\s\\d{2}:\\d{2}/');
    await expect(fecha).toBeVisible();

    // Verificar modalidad (PRESENCIAL, VIRTUAL, AMBOS)
    const modalidad = primeraTarjeta.locator('text=/PRESENCIAL|VIRTUAL|AMBOS/');
    await expect(modalidad).toBeVisible();

    // Verificar precio (formato $X/h)
    const precio = primeraTarjeta.locator('text=/\\$\\d+/');
    await expect(precio).toBeVisible();

    // Verificar etiqueta de estado (Pendiente, Aceptada, Rechazada, Expirada)
    const estado = primeraTarjeta.locator('text=/Pendiente|Aceptada|Rechazada|Expirada/').first();
    await expect(estado).toBeVisible();
  });
});
