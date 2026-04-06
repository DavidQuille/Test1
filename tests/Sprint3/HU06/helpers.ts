import { expect, Page } from '@playwright/test';

export async function selectAnyRequestableSlot(page: Page): Promise<boolean> {
  const requestButton = page.getByRole('button', { name: /Solicitar Tutoría/i });
  const slots = page.locator('button').filter({ hasText: /^\d{2}:\d{2}$/ });
  const count = await slots.count();

  // Recorremos de atras hacia adelante para priorizar horarios de los ultimos dias
  // (usualmente viernes/sabado/domingo en esta tabla semanal).
  for (let i = count - 1; i >= 0; i -= 1) {
    const slot = slots.nth(i);
    if (!(await slot.isVisible().catch(() => false))) {
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
