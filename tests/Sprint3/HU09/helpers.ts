import { loginAndGoto } from '../../auth';
import { expect, Page } from '@playwright/test';

import {
  BANDEJA_ENTRADA_URL,
  OFERTA_HU09_PRIMARIA_URL,
  OFERTA_HU09_SECUNDARIA_URL,
} from '../../config';

const OFFER_URLS = [OFERTA_HU09_PRIMARIA_URL, OFERTA_HU09_SECUNDARIA_URL];

export async function gotoInbox(page: Page) {
  await loginAndGoto(page, BANDEJA_ENTRADA_URL);
  await page.waitForLoadState('networkidle');
}

export async function openPendingTab(page: Page) {
  await gotoInbox(page);
  await page.getByRole('button', { name: /Pendientes\(\d+\)/ }).click();
  await page.waitForTimeout(500);
}

export async function openExpiredTab(page: Page) {
  await gotoInbox(page);
  await page.getByRole('button', { name: /Expiradas\(\d+\)/ }).click();
  await page.waitForTimeout(500);
}

export function pendingSummaryRows(page: Page) {
  return page.locator('tbody tr').filter({ hasText: 'Pendiente' });
}

export function expiredSummaryRows(page: Page) {
  return page.locator('tbody tr').filter({ hasText: 'Expirada' });
}

export async function ensurePendingData(page: Page) {
  await openPendingTab(page);

  if ((await pendingSummaryRows(page).count()) > 0) {
    return;
  }

  await createPendingRequest(page);
  await openPendingTab(page);
  await expect(pendingSummaryRows(page).first()).toBeVisible();
}

export async function createPendingRequest(
  page: Page,
  message = `Solicitud automatizada HU09 ${Date.now()}`,
) {
  for (const offerUrl of OFFER_URLS) {
    await page.goto(offerUrl);
    await page.waitForLoadState('networkidle');

    const slotButtons = page.locator('button').filter({ hasText: /^\d{1,2}:\d{2}$/ });
    const slotCount = await slotButtons.count();

    for (let index = 0; index < slotCount; index += 1) {
      const slotButton = slotButtons.nth(index);

      if (!(await slotButton.isEnabled())) {
        continue;
      }

      await slotButton.click();

      const requestButton = page.getByRole('button', { name: /Solicitar Tutoría \(\d+\)/ });
      await expect(requestButton).toBeEnabled();
      await requestButton.click();

      const messageBox = page.getByRole('textbox', { name: /Mensaje para el tutor/ });
      await expect(messageBox).toBeVisible();
      await messageBox.fill(message);

      await page.getByRole('button', { name: 'Enviar Solicitud' }).click();
      await expect(page.getByText(/¡Solicitud enviada!/)).toBeVisible();
      return message;
    }
  }

  throw new Error('No se encontró un horario disponible para crear una solicitud pendiente de HU09.');
}