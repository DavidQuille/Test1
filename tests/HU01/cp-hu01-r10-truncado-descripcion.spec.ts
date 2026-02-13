// spec: specs/CasosHU01.md
// case: CP-HU-01-R10 - Truncado automático en Descripción

import { test, expect } from '@playwright/test';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R10: Truncado automático por límite máximo en Descripción (250 caracteres)', async ({ page }) => {
    // 1. Navigate to tutor dashboard
    await page.goto('https://politutorias-frontend.vercel.app/dashboard/tutor');

    // 2. Open modal to test description character limit
    await page.getByRole('button', { name: '+ Nueva Oferta' }).click();

    // 3. Type a long description (263 characters) to test 250 character limit
    await page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' }).fill('En este curso intensivo aprenderás a dominar las integrales dobles y triples, así como el análisis vectorial completo. Incluye resolución de exámenes pasados, talleres prácticos semanales y acceso a grabaciones de las clases para repaso constante previo al examen.');

    // 4. Verify the text is truncated to 250 characters
    const descriptionField = page.getByRole('textbox', { name: 'Describe qué incluye tu tutor' });
    const value = await descriptionField.inputValue();
    expect(value.length).toBeLessThanOrEqual(250);

    // Verify the counter shows "250/250"
    await expect(page.getByText('250/250')).toBeVisible();
  });
});
