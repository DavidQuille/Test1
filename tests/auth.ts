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
