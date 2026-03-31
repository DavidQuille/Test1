import { expect, Locator, Page } from '@playwright/test';

export async function loginAsTutorAndOpenHistory(page: Page): Promise<void> {
  await page.goto('http://localhost:3001/');
  await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Historial' }).click();
  await expect(page.getByRole('heading', { name: /Historial de Tutorias Impartidas/i })).toBeVisible();
}

export async function getEditableCard(page: Page, preferredIndex = 0): Promise<Locator> {
  // Simple approach: Get any available card, navigate to next pages if needed
  let allCards = page.getByRole('button', { name: /Ver detalle de la tutoria/i });
  let count = await allCards.count();
  
  let pageNum = 1;
  while (count === 0 && pageNum < 10) {
    // Try next page
    const nextBtn = page.getByRole('button', { name: '>' });
    const isEnabled = await nextBtn.isEnabled().catch(() => false);
    if (!isEnabled) break;
    
    await nextBtn.click();
    await page.waitForTimeout(1000);
    allCards = page.getByRole('button', { name: /Ver detalle de la tutoria/i });
    count = await allCards.count();
    pageNum++;
  }
  
  expect(count).toBeGreaterThan(0);
  return allCards.nth(Math.min(preferredIndex, count - 1));
}

export async function getReadonlyInasistenciaCard(page: Page): Promise<Locator> {
  const cards = page
    .getByRole('button', { name: /Ver detalle de la tutoria/i })
    .filter({ hasText: 'Inasistencia' })
    .filter({ hasNot: page.getByRole('button', { name: 'Inasistencia' }) });
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  return cards.first();
}
