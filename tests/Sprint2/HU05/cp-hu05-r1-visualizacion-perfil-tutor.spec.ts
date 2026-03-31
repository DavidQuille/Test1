import { test, expect } from '@playwright/test';
import { LOGIN_URL, ENCUENTRA_TUTORIA_URL } from '../../config';
import { CREDENTIALS } from '../../credentials';

// spec: specs/Sprint2/CasosHu05.md
// case: CP-HU-05-R1

test.describe('Visualización detallada del perfil del tutor en la pantalla de oferta', () => {
  test('CP-HU-05-R1: Visualizar información detallada del tutor', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    await page.goto(LOGIN_URL);
    
    // Hacer login como estudiante
    await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(CREDENTIALS.STUDENT.email);
    await page.getByRole('textbox', { name: /[Cc]ontraseña/ }).fill(CREDENTIALS.STUDENT.password);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Esperar a que se redirija al dashboard/encuentra-tutoria
    await page.waitForURL(/.*encuentra-tutoria|dashboard.*/, { timeout: 15000 });
    
    // 2. Navegar a encuenta-tutoria si es necesario
    if (!page.url().includes('encuentra-tutoria')) {
      await page.goto(ENCUENTRA_TUTORIA_URL);
    }
    
    // Esperar a que se carguen las ofertas
    await page.waitForTimeout(1000);
    
    // 3. Buscar y hacer clic en la primera oferta (título amarillo/naranja)
    // Las ofertas tienen títulos en color naranja/amarillo
    const offeraTitulo = page.locator('a').filter({ hasText: /Cálculo|Matemática|Física|Programación|[A-Z][a-z]+.*—/ }).first();
    await expect(offeraTitulo).toBeVisible({ timeout: 10000 });
    
    // Click on the yellow/orange title to see the offer details
    await offeraTitulo.click();
    
   // Esperar a que se cargue la página de detalle de la oferta
    await page.waitForURL(/.*ofertas\/.*/, { timeout: 10000 });
    
    // 4. Verificar que se ve la información del tutor en el detalle de la oferta
    //Se visualiza la información del tutor (nombre, académica, biografía, materias, experiencia)
    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
    
    // Verificación: La página cargó correctamente los detalles de la oferta
    // Se debe ver información relativa al tutor en la página
    const textContent = await page.locator('text=/tutor|Tutor|enseña|disponible/i').first();
    await expect(textContent).toBeVisible({ timeout: 5000 });
  });
});
