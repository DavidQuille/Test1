import { loginAndGoto } from '../../auth';
// spec: specs/Sprint3/CasosHU06.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Verificación de bloqueo por límite máximo de caracteres', () => {
  test('CP-HU-06-ADD01: Verificación de bloqueo por límite máximo de caracteres en mensaje de solicitud', async ({ page }) => {
    // 1. Iniciar sesión como Estudiante
    // 2. Navegar a una tutoría
    await loginAndGoto(page, 'https://politutorias-frontend.vercel.app/encuentra-tutoria');
    
    const searchInput = page.locator('input[placeholder*="Buscar"]').first();
    await searchInput.fill('Álgebra');
    
    const ofertaCard = page.locator('a[href*="/ofertas/"]').first();
    await ofertaCard.click();
    
    await page.waitForURL('**/ofertas/**');
    
    // 3. Seleccionar un horario
    const horaButton = page.getByRole('button', { name: '10:' }).first();
    await horaButton.click();
    
    // 4. Abrir el modal
    const solicitarButton = page.getByRole('button', { name: 'Solicitar Tutoría (1)' });
    await solicitarButton.click();
    
    // 5. Ingresar 501 caracteres (A repetido)
    const messageBox = page.getByRole('textbox', { name: 'Mensaje para el tutor' });
    const text501 = 'A'.repeat(501);
    await messageBox.fill(text501);
    
    // Verificación: El contador debe mostrar 500/500 (máximo permitido)
    const counter = page.locator('text=/\\d+\\/500/');
    await expect(counter).toContainText('500/500');
    
    // Verificación: El texto debe estar limitado a 500 caracteres
    const inputValue = await messageBox.inputValue();
    expect(inputValue.length).toBe(500);
  });
});
