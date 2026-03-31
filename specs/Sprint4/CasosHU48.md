# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-26

url: http://localhost:3001/tutor/historial

## ID: CP-HU-48-R1
**Título:** Reportar Inasistencia desde Tarjeta de Historial
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, en la sección 'Historial de Tutorías Impartidas'. Debe existir al menos una tutoría con estado "sin confirmar".

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría con el estado "sin confirmar".
 4. Hacer clic en el botón 'Inasistencia' (con borde rojo) ubicado en la tarjeta de la tutoría.

**Expected Results:**
 - Se superpone la ventana modal de advertencia.
 - El modal se visualiza con el título "Confirmar Inasistencia" y un ícono de advertencia rojo.
 - Se muestra el texto explicativo: "¿Estás seguro? Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer."
 - En la parte inferior, se visualizan los botones "Cancelar" (borde gris) y "Sí, reportar inasistencia" (borde y texto rojo).

## ID: CP-HU-48-R2
**Título:** Visualizar Detalle de Tutoría sin Confirmar
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, en la sección 'Historial de Tutorías Impartidas'. Debe existir al menos una tutoría con estado "sin confirmar".

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría con el estado "sin confirmar".
 4. Hacer clic en el área general de la tarjeta de tutoría en estado "sin confirmar".

**Expected Results:**
 - Se despliega una ventana modal sobre la pantalla 'Historial de Tutorías Impartidas'.
 - El modal muestra el título "Detalle de la Tutoría".
 - Se visualiza la información completa de la sesión (título de la oferta de la tutoría, Estudiante, Fecha, Hora, Modalidad, Precio, Lugar/Enlace y Mensaje del estudiante).
 - En la parte inferior, se visualizan los botones interactivos "Completada" (borde verde), "Inasistencia" (borde rojo) y el botón de texto "Cerrar".

## ID: CP-HU-48-R3
**Título:** Reportar Inasistencia desde Modal de Detalle
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, en el modal 'Detalle de la Tutoría' de una sesión pendiente de confirmar.

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría con el estado "sin confirmar" y hacer clic para abrir el modal 'Detalle de la Tutoría'.
 4. Hacer clic en el botón rojo 'Inasistencia' dentro del modal 'Detalle de la Tutoría'.

**Expected Results:**
 - Se superpone el modal de advertencia "Confirmar Inasistencia" bloqueando la vista del modal de detalle anterior.
 - El modal se visualiza con el título "Confirmar Inasistencia" y un ícono de advertencia rojo.
 - Se muestra el texto de confirmación: "¿Estás seguro? Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer."
 - Contiene los botones "Cancelar" (borde gris) y "Sí, reportar inasistencia" (borde y texto rojo).

## ID: CP-HU-48-R4
**Título:** Cancelar la Confirmación de Inasistencia
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, visualizando el modal de advertencia "Confirmar Inasistencia" abierto desde el modal de detalle.

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría "sin confirmar" y abrir el modal 'Confirmar Inasistencia' desde el modal de detalle.
 4. Hacer clic en el botón 'Cancelar' en el modal "Confirmar Inasistencia".

**Expected Results:**
 - El modal de advertencia "Confirmar Inasistencia" desaparece sin aplicar cambios.
 - El sistema devuelve al tutor exactamente a la interfaz que estaba debajo (el modal 'Detalle de la Tutoría').

## ID: CP-HU-48-R5
**Título:** Reportar Inasistencia Exitosamente
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, visualizando el modal de advertencia "Confirmar Inasistencia".

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría "sin confirmar" y abrir el modal 'Confirmar Inasistencia' (ya sea desde la tarjeta o desde el modal de detalle).
 4. Hacer clic en el botón rojo 'Sí, reportar inasistencia'.

**Expected Results:**
 - Todos los modales abiertos se cierran.
 - Al regresar al listado 'Historial de Tutorías Impartidas', la tarjeta de la sesión correspondiente se actualiza visualmente.
 - La tarjeta actualizada muestra una etiqueta estática con contorno rojo, ícono de "X" y el texto "Inasistencia".
 - Los botones interactivos de acción ("Completada", "Inasistencia") en la tarjeta desaparecen.

## ID: CP-HU-48-R6
**Título:** Ver Detalles de Tutoría con Inasistencia (Solo lectura)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, en la sección 'Historial de Tutorías Impartidas'. Debe existir al menos una tutoría en estado 'Inasistencia'.

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría que ya se encuentre en estado 'Inasistencia'.
 4. Hacer clic en el área general de la tarjeta de tutoría en estado 'Inasistencia'.

**Expected Results:**
 - Se abre una ventana modal 'Detalle de la Tutoría'.
 - La información de la sesión original se presenta en modo lectura.
 - Los botones de acción ("Completada" e "Inasistencia") no se visualizan.
 - En la esquina inferior izquierda del modal se muestra el texto estático "Estado: [Ícono X rojo] Inasistencia".
 - El único control interactivo disponible es el botón "Cerrar".

## ID: CP-HU-48-R7
**Título:** Cerrar Modal de Detalle de Tutoría con Inasistencia
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado, visualizando el modal 'Detalle de la Tutoría' de una sesión con inasistencia.

**Steps:**
 1. Iniciar sesión como Tutor en la plataforma.
 2. Navegar a la sección 'Historial de Tutorías Impartidas'.
 3. Identificar una tarjeta de tutoría en estado 'Inasistencia' y hacer clic para abrir el modal 'Detalle de la Tutoría'.
 4. Hacer clic en el botón 'Cerrar' dentro del modal.

**Expected Results:**
 - La ventana modal 'Detalle de la Tutoría' desaparece.
 - El sistema muestra nuevamente la vista principal del listado en la pantalla 'Historial de Tutorías Impartidas'.
 - No hay ninguna alteración en el estado previo de las tarjetas en el listado.

---
