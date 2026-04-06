
url: http://localhost:3001/dashboard/tutor/disponibilidad

## ID: CP-HU-07-R1
**Título:** Verificar la visualización correcta de la disponibilidad registrada del tutor en modo solo lectura.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión con credenciales válidas y tiene disponibilidad horaria registrada previamente en el sistema.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección 'Gestionar Disponibilidad' 
**Expected Results:**
 - La pantalla 'Gestionar Disponibilidad' carga correctamente.
 - **VALIDACIÓN VISUAL:** En la cabecera, se visualiza el texto 'Volver al Panel' a la izquierda y el logo 'Poli Tutorías' a la derecha.
 - El título 'Gestionar Disponibilidad' es visible.
 - La descripción 'Haz clic en los horarios que tienes disponibles para ofrecer tutorías.' es visible.
 - La sub-descripción 'Tu horario se mostrará en la zona horaria local (GMT-5).' es visible.
 - Se muestra el contador '✓ 4 horarios seleccionados' en color verde.
 - La cuadrícula de horarios presenta las columnas 'HORA', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' y filas desde las 7:00 hasta las 20:00.
 - Los bloques 'Lun 12:00', 'Mar 12:00', 'Lun 19:00' y 'Mar 19:00' están resaltados con un checkmark blanco sobre fondo oscuro, indicando su selección.
 - Los botones 'Cancelar' y 'Guardar Cambios' están visibles pero deshabilitados (no clickeables).
 - No se permite la interacción (selección/deselección) de los horarios de la cuadrícula, confirmando el modo de solo lectura.

---

## ID: CP-HU-07-R2
**Título:** Verificar la navegación correcta al Dashboard Tutor al hacer clic en el enlace 'Volver al Panel'.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión con credenciales válidas y se encuentra actualmente en la pantalla 'Gestionar Disponibilidad'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección 'Gestionar Disponibilidad' (por ejemplo, haciendo clic en el enlace o menú correspondiente desde el Dashboard Tutor).
 3. Hacer clic en el enlace 'Volver al Panel' ubicado en la cabecera de la pantalla 'Gestionar Disponibilidad'.

**Expected Results:**
 - El sistema redirige a la pantalla 'T. Dashboard Tutor'.
 - **VALIDACIÓN VISUAL:** La pantalla del 'T. Dashboard Tutor' (hub central) se carga completamente, mostrando sus elementos característicos.
