import { loginAndGoto } from '../../auth';
import { expect, Page } from '@playwright/test';

import {
  BANDEJA_ENTRADA_URL,
  OFERTA_HU09_PRIMARIA_URL,
  OFERTA_HU09_SECUNDARIA_URL,
} from '../../config';

const OFFER_URLS = [OFERTA_HU09_PRIMARIA_URL, OFERTA_HU09_SECUNDARIA_URL];

function pendingTabLocator(page: Page) {
  return page.locator('button, [role="tab"]').filter({ hasText: /Pendientes\s*\(\d+\)/i }).first();
}

function expiredTabLocator(page: Page) {
  return page.locator('button, [role="tab"]').filter({ hasText: /Expiradas\s*\(\d+\)/i }).first();
}

export async function gotoInbox(page: Page) {
  await loginAndGoto(page, BANDEJA_ENTRADA_URL);

  if (!page.url().includes('/bandeja')) {
    const bandejaLink = page.getByRole('link', { name: /^Bandeja$/i });
    if (await bandejaLink.isVisible().catch(() => false)) {
      await bandejaLink.click();
    } else {
      await page.goto(BANDEJA_ENTRADA_URL);
    }
  }

  await page.waitForURL('**/bandeja**');
  await page.waitForLoadState('domcontentloaded');
}

export async function openPendingTab(page: Page) {
  await gotoInbox(page);
  const pendingTab = pendingTabLocator(page);
  if (!(await pendingTab.isVisible().catch(() => false))) {
    return false;
  }

  await pendingTab.click();
  await page.waitForTimeout(500);
  return true;
}

export async function openExpiredTab(page: Page) {
  await gotoInbox(page);
  const expiredTab = expiredTabLocator(page);
  if (!(await expiredTab.isVisible().catch(() => false))) {
    return false;
  }

  await expiredTab.click();
  await page.waitForTimeout(500);
  return true;
}

export function pendingSummaryRows(page: Page) {
  return page.locator('tbody tr').filter({ hasText: /Pendiente/i });
}

export function expiredSummaryRows(page: Page) {
  return page.locator('tbody tr').filter({ hasText: /Expirada/i });
}

export async function ensurePendingData(page: Page) {
  const pendingOpened = await openPendingTab(page);
  if (!pendingOpened) {
    return false;
  }

  if ((await pendingSummaryRows(page).count()) > 0) {
    return true;
  }

  const created = await createPendingRequest(page);
  if (!created) {
    return false;
  }

  await openPendingTab(page);
  if ((await pendingSummaryRows(page).count()) === 0) {
    return false;
  }

  await expect(pendingSummaryRows(page).first()).toBeVisible();
  return true;
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

      const requestButton = page.getByRole('button', { name: /Solicitar Tutoría/i });
      if (!(await requestButton.isVisible().catch(() => false))) {
        continue;
      }

      if (!(await requestButton.isEnabled().catch(() => false))) {
        continue;
      }

      await requestButton.click();

      const messageBox = page.getByRole('textbox', { name: /Mensaje para el tutor/ });
      if (!(await messageBox.isVisible().catch(() => false))) {
        continue;
      }

      const virtualButton = page.getByRole('button', { name: /Virtual/i });
      if (await virtualButton.isVisible().catch(() => false)) {
        await virtualButton.click();
      }

      await messageBox.fill(message);

      await page.getByRole('button', { name: 'Enviar Solicitud' }).click();

      const sent = await page.getByText(/¡Solicitud enviada!/).isVisible().catch(() => false);
      if (sent) {
        return true;
      }
    }
  }

  return false;
}