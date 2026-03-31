import { LOGIN_URL, ENCUENTRA_TUTORIA_URL } from '../../config';
import { CREDENTIALS } from '../../credentials';
// spec: specs/Sprint2/CasosHU32.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de visualización de detalles de oferta', () => {
  test('CP-HU-32-R1: Verificar la visualización de los detalles de una oferta al hacer clic en su tarjeta', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(CREDENTIALS.STUDENT.email);
    await page.getByRole('textbox', { name: /[Cc]ontraseña/ }).fill(CREDENTIALS.STUDENT.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // 2. Navegar a la pantalla principal de "Encuentra tu Tutoría"
    await page.goto(ENCUENTRA_TUTORIA_URL);
    
    // Esperar a que se carguen las ofertas
    await page.waitForTimeout(2000);
    await page.locator('a[href*="/ofertas/"]').first().waitFor({ timeout: 10000 });
    
    // 3. Localizar una tarjeta de oferta y hacer clic
    // Hacer clic en el primer enlace de oferta disponible
    const ofertaLink = page.locator('a[href*="/ofertas/"]').first();
    await expect(ofertaLink).toBeVisible();
    await ofertaLink.click();
    
    // Verificación: El sistema carga la información detallada de la oferta
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    
    // Verificación: Se visualiza el título de la oferta
    const tituloOferta = page.locator('h1, h2').first();
    await expect(tituloOferta).toBeVisible();
    
    // Verificación: Se muestra la información del tutor
    const tutorSection = page.locator('text=Sobre el Tutor').first();
    await expect(tutorSection).toBeVisible();
    
    // Verificación: Se muestra el precio por hora en el panel lateral
    const precioText = page.locator('text=Precio por hora').first();
    await expect(precioText).toBeVisible();
  });

  test('CP-HU-32-R2: Verificar el regreso a la lista principal de ofertas desde la pantalla de detalles', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(CREDENTIALS.STUDENT.email);
    await page.getByRole('textbox', { name: /[Cc]ontraseña/ }).fill(CREDENTIALS.STUDENT.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // 2. Navegar a la pantalla principal de "Encuentra tu Tutoría"
    await page.goto(ENCUENTRA_TUTORIA_URL);
    
    // Esperar a que se carguen las ofertas
    await page.waitForTimeout(2000);
    await page.locator('a[href*="/ofertas/"]').first().waitFor({ timeout: 10000 });
    
    // 3. Hacer clic en una tarjeta de oferta
    const ofertaLink = page.locator('a[href*="/ofertas/"]').first();
    await expect(ofertaLink).toBeVisible();
    await ofertaLink.click();
    
    // Esperar a que se cargue la página de detalle
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    
    // 4. Hacer clic en el botón 'Volver'
    const volverButton = page.locator('text=Volver').first();
    await expect(volverButton).toBeVisible();
    await volverButton.click();
    
    // Verificación: El sistema redirige a la pantalla principal de listado de ofertas
    await expect(page).toHaveURL(/.*encuentra-tutoria/);
    
    // Verificación: Se visualiza el listado de tarjetas de oferta nuevamente
    const ofertaCards = page.locator('a[href*="/ofertas/"]');
    expect(await ofertaCards.count()).toBeGreaterThan(0);
  });
});
