import { expect, Page } from '@playwright/test';

const SLOT_TEXT_REGEX =
  /(?:Lun(?:es)?|Mar(?:tes)?|Mié(?:rcoles)?|Mie(?:rcoles)?|Jue(?:ves)?|Vie(?:rnes)?|Sáb(?:ado)?|Sab(?:ado)?|Dom(?:ingo)?)?\s*\d{1,2}:\d{2}/i;

function slotButtons(page: Page) {
  return page
    .locator('main button')
    .filter({ hasText: SLOT_TEXT_REGEX })
    .filter({ hasNotText: /Solicitar Tutoría|Enviar Solicitud|Cancelar/i });
}

async function waitForSlotsToRender(page: Page, timeoutMs = 8000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if ((await slotButtons(page).count()) > 0) {
      return true;
    }
    await page.waitForTimeout(200);
  }
  return false;
}

export async function selectAnyRequestableSlot(page: Page): Promise<boolean> {
  const requestButton = page.getByRole('button', { name: /Solicitar Tutoría/i });
  const hasSlots = await waitForSlotsToRender(page);
  if (!hasSlots) {
    return false;
  }

  const slots = slotButtons(page);
  const count = await slots.count();

  // Recorremos de atras hacia adelante para priorizar horarios de los ultimos dias
  // (usualmente viernes/sabado/domingo en esta tabla semanal).
  for (let i = count - 1; i >= 0; i -= 1) {
    const slot = slots.nth(i);
    if (!(await slot.isVisible().catch(() => false))) {
      continue;
    }

    if (!(await slot.isEnabled().catch(() => false))) {
      continue;
    }

    await slot.click();
    if (await requestButton.isEnabled().catch(() => false)) {
      return true;
    }
  }

  return false;
}

export async function openRequestModal(page: Page): Promise<boolean> {
  const requestButton = page.getByRole('button', { name: /Solicitar Tutoría/i });
  const hasRequestableSlot = await selectAnyRequestableSlot(page);
  if (!hasRequestableSlot) {
    return false;
  }

  await expect(requestButton).toBeEnabled();
  await requestButton.click();
  await expect(page.getByRole('heading', { name: /Solicitar Tutoría/i })).toBeVisible();
  return true;
}
