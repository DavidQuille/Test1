import { expect, Page } from '@playwright/test';
import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path';

import { loginAndGoto } from '../../auth';
import { BANDEJA_ENTRADA_URL } from '../../config';

const HU23_LOCK_PATH = path.join(process.cwd(), 'test-results', 'hu23.lock');

export async function withHu23ExclusiveAccess<T>(task: () => Promise<T>): Promise<T> {
  await mkdir(path.dirname(HU23_LOCK_PATH), { recursive: true });

  while (true) {
    try {
      await writeFile(HU23_LOCK_PATH, String(process.pid), { flag: 'wx' });
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  try {
    return await task();
  } finally {
    await rm(HU23_LOCK_PATH, { force: true });
  }
}

export async function loginAndOpenInbox(page: Page) {
  await loginAndGoto(page, BANDEJA_ENTRADA_URL);
  if (!page.url().includes('/bandeja')) {
    await page.goto(BANDEJA_ENTRADA_URL);
  }

  await expect(page).toHaveURL(/\/bandeja/);
  await expect(page.getByText('Solicitudes de tutoria recibidas')).toBeVisible({ timeout: 15000 });
}

export async function getTabCount(page: Page, tabName: string): Promise<number | null> {
  const tab = page.getByRole('button', { name: new RegExp(`${tabName} \\((\\d+)\\)`, 'i') }).first();
  if (!(await tab.isVisible().catch(() => false))) {
    return null;
  }

  const text = (await tab.innerText()).trim();
  const match = text.match(/\((\d+)\)/);
  return match ? Number(match[1]) : null;
}

export async function openFirstPendingRequest(page: Page): Promise<string | null> {
  const firstRow = page.locator('tbody tr').first();
  if (!(await firstRow.isVisible().catch(() => false))) {
    return null;
  }

  const firstCellText = await firstRow.locator('td').first().innerText();
  const lines = firstCellText
    .split('\n')
    .map(v => v.trim())
    .filter(Boolean);
  const studentName = lines[lines.length - 1] ?? '';

  await firstRow.click();
  await expect(page.getByRole('button', { name: 'Rechazar' }).first()).toBeVisible({ timeout: 8000 });
  return studentName;
}

export async function openRejectModal(page: Page) {
  await page.getByRole('button', { name: 'Rechazar' }).first().click();
  await expect(page.getByRole('heading', { name: /Rechazar Solicitud|Rechazar solicitud de tutoría/i })).toBeVisible({
    timeout: 10000,
  });
}

export async function chooseReason(page: Page, reason: string) {
  await page.getByRole('radio', { name: reason }).click();
}

export async function confirmReject(page: Page) {
  await page.getByRole('button', { name: 'Confirmar Rechazo' }).click();
}

export async function cancelReject(page: Page) {
  await page.getByRole('button', { name: 'Cancelar' }).click();
}

export async function expectRejectSuccess(page: Page, beforePending: number | null, beforeResponded: number | null) {
  const rejectDialog = page.getByRole('heading', { name: /Rechazar Solicitud|Rechazar solicitud de tutoría/i });
  await expect(rejectDialog).toBeHidden({ timeout: 10000 });

  if (beforePending !== null) {
    const afterPending = await getTabCount(page, 'Pendientes');
    expect(afterPending).toBe(beforePending - 1);
  }

  if (beforeResponded !== null) {
    const afterResponded = await getTabCount(page, 'Respondidas');
    expect(afterResponded).toBe(beforeResponded + 1);
  }
}

export async function expectRejectCancelled(page: Page, beforePending: number | null, beforeResponded: number | null) {
  await expect(page.getByRole('heading', { name: /Rechazar Solicitud|Rechazar solicitud de tutoría/i })).toBeHidden({
    timeout: 10000,
  });

  if (beforePending !== null) {
    const afterPending = await getTabCount(page, 'Pendientes');
    expect(afterPending).toBe(beforePending);
  }

  if (beforeResponded !== null) {
    const afterResponded = await getTabCount(page, 'Respondidas');
    expect(afterResponded).toBe(beforeResponded);
  }
}
