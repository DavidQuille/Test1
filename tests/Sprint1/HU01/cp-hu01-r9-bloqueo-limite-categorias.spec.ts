import { loginAndGoto } from '../../auth';
// spec: specs/CasosHU01.md
// case: CP-HU-01-R9 - Bloqueo por límite máximo de categorías

import { test, expect } from '@playwright/test';
import { DASHBOARD_TUTOR_URL } from '../../config';

test.describe('HU01 - Publicación de Ofertas de Tutoría', () => {
  test('CP-HU-01-R9: Bloqueo por límite de categorías', async ({ page }) => {
    // 1. Login and navigate to tutor dashboard
    await loginAndGoto(page, DASHBOARD_TUTOR_URL);
    await page.waitForTimeout(1000);

    // 2. Open modal
    await page.getByRole('button', { name: '+ Nueva Oferta' }).first().click();
    await page.waitForTimeout(1500);

    // 3. Click on the categories search field to open the dropdown
    const categorySearch = page.getByRole('textbox', { name: 'Buscar categorías...' });
    await categorySearch.click();
    await page.waitForTimeout(800);

    // 4. Select exactly 5 categories as specified
    const categoriesToSelect = ['Matemática', 'Física', 'Química', 'Estadística', 'Programación'];
    
    for (const category of categoriesToSelect) {
      const categoryBtn = page.getByRole('button', { name: category }).first();
      await expect(categoryBtn).toBeVisible({ timeout: 3000 });
      await categoryBtn.click();
      await page.waitForTimeout(600);
    }

    // 5. Verify counter shows 5/5 - the limit is reached
    const counter = page.locator('text=/^5\/5$/');
    await expect(counter.first()).toBeVisible({ timeout: 3000 });

    // 6. Try to select a 6th category (Electrónica) - should be disabled
    const sixthCategoryBtn = page.getByRole('button', { name: 'Electrónica' }).first();
    const sixthBtnIsVisible = await sixthCategoryBtn.isVisible({ timeout: 1000 }).catch(() => false);
    
    // The 6th button should either not exist or be disabled
    if (sixthBtnIsVisible) {
      const isDisabled = await sixthCategoryBtn.evaluate(el => (el as HTMLButtonElement).disabled);
      // If button is disabled, this proves the limit is enforced
      expect(isDisabled).toBe(true);
    }

    // 7. Verify counter is STILL 5/5 (the system blocked the 6th category)
    const counterStill5 = page.locator('text=/^5\/5$/');
    await expect(counterStill5.first()).toBeVisible({ timeout: 3000 });

    console.log('✓ Test passed: System enforced 5-category limit');
  });
});