// spec: specs/Sprint4/CasosHU48.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsTutorAndOpenHistory } from './helpers';

test.describe('HU48 - Historial tutorias inasistencia', () => {
  test('CP-HU-48-R6 Ver Detalles de Tutoría con Inasistencia (Solo lectura)', async ({ page }) => {
    // 1-2. Iniciar sesión y navegar a Historial de Tutorías Impartidas.
    await loginAsTutorAndOpenHistory(page, 2);

    // 3. Identificar una tarjeta de tutoría en estado Inasistencia.
    // Find the card with Álgebra (readonly inasistencia card on page 2)
    const tarjetaInasistencia = page.getByRole('button', { name: /Álgebra/ });
    
    // Verificación: La tarjeta de inasistencia existe y es visible
    await expect(tarjetaInasistencia).toBeVisible();

    // 4. Hacer clic en el área general de la tarjeta de inasistencia.
    await tarjetaInasistencia.click();
    
    // Verificación: Se despliega modal Detalle de la Tutoría.
    await expect(page.getByRole('heading', { name: 'Detalle de la Tutoria' })).toBeVisible();
    
    // Esperar a que el diálogo esté plenamente cargado
    const detalleModal = page.getByRole('dialog');
    await detalleModal.waitFor({ state: 'visible' });
    
    // Verificación: Se visualiza información completa de la sesión.
    await expect(detalleModal).toContainText('Estudiante');
    await expect(detalleModal).toContainText(/Á[l\s]*gebra/);

  
  });
});