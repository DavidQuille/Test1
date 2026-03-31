import { Page } from '@playwright/test';

import { BASE_URL } from './config';
import { getCredentialsByUrl } from './credentials';

export async function loginAndGoto(page: Page, targetUrl: string) {
  const user = getCredentialsByUrl(targetUrl);

  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(user.password);
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Wait until the app leaves the login landing before forcing the target route.
  try {
    await page.waitForURL(/\/(dashboard|encuentra-tutoria|tutor\/registro)/, { timeout: 10000 });
  } catch {
    // Some environments can be slower; the explicit navigation below remains the source of truth.
  }

  await page.goto(targetUrl);
}

export async function createTutorAccount(page: Page, email: string, password: string) {
  // Navigate to registration page
  await page.goto(`${BASE_URL}/registro`);
  
  // Click on Tutor radio button
  await page.getByRole('radio', { name: 'Tutor' }).click();
  
  // Fill email and password
  await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill(email);
  await page.getByRole('textbox', { name: 'Contraseña' }).first().fill(password);
  await page.getByRole('textbox', { name: 'Confirmar Contraseña' }).fill(password);
  
  // Click "Crear Cuenta" button
  await page.getByRole('button', { name: 'Crear Cuenta' }).click();
  
  // Wait for redirect to "Completa tu Perfil" (Paso 1)
  await page.waitForURL(`${BASE_URL}/**`, { timeout: 10000 });
}
