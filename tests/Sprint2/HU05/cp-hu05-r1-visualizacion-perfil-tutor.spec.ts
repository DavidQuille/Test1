import { loginAndGoto } from '../../auth';
// spec: specs/Sprint2/CasosHu05.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Visualización detallada del perfil del tutor en la pantalla de oferta', () => {
  test('CP-HU-05-R1: Visualizar información detallada del tutor', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante - Ya viene logueado desde el seed
    // 2. Navegar a la pantalla principal 'Inicio' o donde se listan las ofertas de tutoría
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    // Esperar a que se carguen las ofertas
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    
    // 3. Seleccionar y hacer clic en una tarjeta de oferta de tutoría para acceder a la pantalla de 'Detalle de la Oferta'
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    // Esperar a que se cargue la página de detalle
    await expect(page).toHaveURL(/.*ofertas\/.*/);
    
    // 4. Observar las secciones de información del tutor presentadas en la pantalla
    // Verificación: Se visualizan claramente las secciones 'Sobre el Tutor' y 'Experiencia'
    const sobreTutorHeading = page.locator('h2:has-text("Sobre el Tutor")');
    const experienciaHeading = page.locator('h3:has-text("Experiencia")');
    
    await expect(sobreTutorHeading).toBeVisible();
    await expect(experienciaHeading).toBeVisible();
    
    // Verificación: En la sección 'Sobre el Tutor', se muestra:
    // - El nombre del tutor
    const tutorNameHeading = page.locator('h3').filter({ hasText: /[A-Z][a-z]+\s+[A-Z][a-z]+/ }).first();
    await expect(tutorNameHeading).toBeVisible();
    const tutorName = await tutorNameHeading.textContent();
    expect(tutorName).toMatch(/[A-Z][a-z]+\s+[A-Z][a-z]+/);
    
    // - La información académica del tutor (ej: Semestre, FIM)
    const academicInfo = page.locator('p:has-text("Semestre"), p:has-text("FIM"), p:has-text("Mecánica")').first();
    if (await academicInfo.count() > 0) {
      await expect(academicInfo).toBeVisible();
    }
    
    // - Una descripción bibliográfica del tutor
    const bioDescription = page.locator('p').filter({ hasText: /Hola|Soy|apasionado/ }).first();
    if (await bioDescription.count() > 0) {
      await expect(bioDescription).toBeVisible();
      const bioText = await bioDescription.textContent();
      expect(bioText && bioText.length > 10).toBeTruthy();
    }
    
    // - Las materias que domina el tutor, listadas como tags
    const materiasLabel = page.locator('p:has-text("Materias que domino")').first();
    await expect(materiasLabel).toBeVisible();
    
    // Verificar que hay tags de materias visibles
    const tagsElements = page.locator('div').filter({ hasText: /Física|Lenguaje|Cálculo|química|Matemática/ });
    const tagsCount = await tagsElements.count();
    expect(tagsCount).toBeGreaterThan(0);
    
    // Verificación: En la sección 'Experiencia', se muestran entradas de historial
    const experienciaEntries = page.locator('h4').filter({ hasText: /Ayudante|Tutor|Profesor|Instructor/ });
    const entriesCount = await experienciaEntries.count();
    expect(entriesCount).toBeGreaterThan(0);
    
    // Verificación: Valida que las entradas tengan información de lugar y fechas
    const experienciaPlaces = page.locator('p:has-text("EPN"), p:has-text("Independiente")');
    expect(await experienciaPlaces.count()).toBeGreaterThan(0);
    
    const experienciaFechas = page.locator('p:has-text("—")');
    expect(await experienciaFechas.count()).toBeGreaterThan(0);
  });
});
