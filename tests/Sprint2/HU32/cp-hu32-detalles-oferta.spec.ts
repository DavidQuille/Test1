// spec: specs/Sprint2/CasosHU32.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de visualización de detalles de oferta', () => {
  test('CP-HU-32-R1: Verificar la visualización de los detalles de una oferta al hacer clic en su tarjeta', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante - Ya viene logueado desde el seed
    // 2. Navegar a la pantalla principal de "E. Home Estudiante"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Esperar a que se carguen las ofertas
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    
    // 3. Localizar una tarjeta de oferta y hacer clic
    // Buscar la oferta de Cálculo (Cálculo Diferencial)
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill('Cálculo');
    
    // Esperar a que aparezca la oferta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await expect(ofertaCard).toBeVisible();
    
    // 4. Hacer clic en la tarjeta de oferta
    await ofertaCard.click();
    
    // Verificación: El sistema carga la información detallada de la oferta
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    
    // Verificación: En la cabecera, se visualiza el botón 'Volver' a la izquierda
    const volverButton = page.locator('a').filter({ hasText: 'Volver' }).first();
    await expect(volverButton).toBeVisible();
    
    // Verificación: Logo 'PoliTutorias' a la derecha
    const logo = page.locator('text=Poli').first();
    await expect(logo).toBeVisible();
    
    // Verificación: La sección principal muestra el título de la materia
    const tituloMateria = page.locator('h1').first();
    await expect(tituloMateria).toBeVisible();
    const tituloText = await tituloMateria.textContent();
    expect(tituloText).toBeTruthy();
    
    // Verificación: Se muestra la modalidad
    const modalidad = page.locator('text=/VIRTUAL|PRESENCIAL|Virtual|Presencial/').first();
    await expect(modalidad).toBeVisible();
    
    // Verificación: Se visualiza un párrafo descriptivo de la clase
    const descripcion = page.locator('p').filter({ hasText: /tutorial|presencial|clase|tutoría/i }).first();
    await expect(descripcion).toBeVisible();
    
    // Verificación: Se muestra el título 'Categorías' con tags
    const categoriasTitle = page.locator('h3').filter({ hasText: 'Categorías' }).first();
    await expect(categoriasTitle).toBeVisible();
    
    // Verificación: Se visualiza el título 'Disponibilidad Semanal'
    const disponibilidadTitle = page.locator('h3').filter({ hasText: 'Disponibilidad Semanal' }).first();
    await expect(disponibilidadTitle).toBeVisible();
    
    // Verificación: En el panel lateral, se visualiza el 'Precio por hora'
    const precioText = page.locator('text=Precio por hora').first();
    await expect(precioText).toBeVisible();
  });

  test('CP-HU-32-R2: Verificar el regreso a la lista principal de ofertas desde la pantalla de detalles', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante - Ya viene logueado desde el seed
    // 2. Navegar a la pantalla principal de "E. Home Estudiante"
    await page.goto('https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Esperar a que se carguen las ofertas
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    
    // Buscar la oferta
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill('Cálculo');
    
    // 3. Hacer clic en una tarjeta de oferta
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Verificación: Sistema carga la pantalla de detalles
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    
    // 4. Hacer clic en el botón 'Volver' ubicado en la cabecera superior izquierda
    const volverButton = page.locator('a').filter({ hasText: 'Volver' }).first();
    await volverButton.click();
    
    // Verificación: El sistema redirige a la pantalla principal de listado de ofertas
    await expect(page).toHaveURL(/.*encuentra-tutoria/);
    
    // Verificación: Se visualiza el listado de tarjetas de oferta
    const ofertaCards = page.locator('a[href*="/ofertas/"]');
    expect(await ofertaCards.count()).toBeGreaterThan(0);
  });
});
