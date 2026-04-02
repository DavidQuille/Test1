import { expect, Locator, Page } from '@playwright/test';

async function goToHistoryPage(page: Page, pageNumber: number): Promise<void> {
  const targetPage = page.getByRole('button', { name: String(pageNumber), exact: true });
  await expect(targetPage).toBeVisible();

  if (await targetPage.isEnabled()) {
    await targetPage.click();
  }

  // Wait until the selected page button is disabled, which indicates active page.
  await expect(targetPage).toBeDisabled();
}

export async function loginAsTutorAndOpenHistory(page: Page, preferredPage?: number): Promise<void> {
  await page.goto('http://localhost:3001/');
  await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('daniel.v@epn.edu.ec');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('123456');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Historial' }).click();
  await expect(page.getByRole('heading', { name: /Historial de Tutorias Impartidas/i })).toBeVisible();

  if (preferredPage !== undefined) {
    await goToHistoryPage(page, preferredPage);
  }
}

export async function getEditableCard(page: Page, preferredIndex = 0, subjectPattern?: RegExp): Promise<Locator> {
  // Navigate through pages to find editable cards (without "Inasistencia" badge)
  for (let pageNum = 1; pageNum <= 10; pageNum++) {
    const allCards = page.getByRole('button', { name: /Ver detalle de la tutoria/i });
    const count = await allCards.count();
    
    if (count > 0) {
      // Check if any card doesn't have inasistencia badge
      for (let i = 0; i < count; i++) {
        const card = allCards.nth(i);
        const hasInasistencia = await card.getByText('Inasistencia').count() > 0;
        if (!hasInasistencia) {
          // If subjectPattern provided, check if card matches subject
          if (subjectPattern) {
            const cardText = await card.textContent();
            if (cardText && subjectPattern.test(cardText)) {
              return card;
            }
          } else {
            // No pattern specified, return first editable card
            return card;
          }
        }
      }
    }

    // Try next page
    const nextBtn = page.getByRole('button', { name: '>', exact: true });
    const isEnabled = await nextBtn.isEnabled().catch(() => false);
    if (!isEnabled) break;
    
    await nextBtn.click();
    await page.waitForTimeout(800);
  }
  
  throw new Error('No se encontró ninguna tarjeta editable (sin Inasistencia reportada).');
}

export async function getReadonlyInasistenciaCard(page: Page): Promise<Locator> {
  // Find the card "Cálculo Diferencial — Detalle Completo" with Inasistencia badge
  // This is a readonly card (no action buttons, just badge)
  // Use regex to match with flex spelling of the dash
  const card = page.getByRole('button', { name: /Cálculo.*Detalle Completo/ });
  const exists = await card.count() > 0;
  
  if (exists) {
    return card.first();
  }
  
  throw new Error('No se encontró la tarjeta con Inasistencia en la página actual.');
}
