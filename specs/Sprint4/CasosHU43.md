# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-26

url: http://localhost:3001/tutor/historial

## ID: CP-HU-43-R1
**Título:** Actualizar estado de tutoría a 'Completada' directamente desde la tarjeta.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado. Existe al menos una tutoría en estado "sin confirmar" en la pantalla 'Historial de Tutorías Impartidas'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Historial de Tutorías Impartidas'.
 3. Localizar una tarjeta de tutoría específica que se encuentre en estado "sin confirmar".
 4. Hacer clic en el botón 'Completada' (con borde verde) ubicado directamente en la tarjeta de la tutoría.

**Expected Results:**
 - La tarjeta de la tutoría específica en el listado de la pantalla 'Historial de Tutorías Impartidas' se actualiza en tiempo real.
 - Los botones 'Completada' (verde) e 'Inasistencia' (rojo) desaparecen de la tarjeta.
 - En su lugar, la tarjeta muestra únicamente una etiqueta verde estática con el ícono check y el texto 'Completada'.
 - La métrica de "Tutorías completadas" del tutor se incrementa en uno.

## ID: CP-HU-43-R2
**Título:** Abrir modal 'Detalle de la Tutoría' para tutoría "sin confirmar" al hacer clic en el área general de la tarjeta.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado. Existe al menos una tutoría en estado "sin confirmar" en la pantalla 'Historial de Tutorías Impartidas'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Historial de Tutorías Impartidas'.
 3. Localizar una tarjeta de tutoría específica que se encuentre en estado "sin confirmar".
 4. Hacer clic en el área general de la tarjeta de la tutoría (fuera de los botones de acción).

**Expected Results:**
 - Se despliega una ventana modal con el título genérico 'Detalle de la Tutoría'.
 - El modal contiene la información de la tutoría (ej. 'Cálculo Vectorial', 'Mateo Vargas', '22 de marzo de 2026 a las 09:00').
 - En su parte inferior se visualiza el botón interactivo 'Completada' (borde verde) junto al botón 'Cerrar'. (No se visualiza el botón 'Inasistencia').

## ID: CP-HU-43-R3
**Título:** Registrar tutoría como 'Completada' desde el modal 'Detalle de la Tutoría' (para tutoría sin confirmar).
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado. Existe al menos una tutoría en estado "sin confirmar" en la pantalla 'Historial de Tutorías Impartidas'. El modal 'Detalle de la Tutoría' está abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Historial de Tutorías Impartidas'.
 3. Localizar una tarjeta de tutoría específica que se encuentre en estado "sin confirmar".
 4. Hacer clic en el área general de la tarjeta para abrir el modal 'Detalle de la Tutoría'.
 5. Dentro del modal 'Detalle de la Tutoría', hacer clic en el botón 'Completada'.

**Expected Results:**
 - La ventana modal 'Detalle de la Tutoría' se cierra automáticamente.
 - El sistema permanece en la pantalla 'Historial de Tutorías Impartidas'.
 - La tarjeta de la tutoría correspondiente en el listado se actualiza visualmente al estado 'Completada'.
 - Los botones 'Completada' e 'Inasistencia' desaparecen de la tarjeta.
 - En su lugar, la tarjeta muestra una etiqueta verde estática con el icono check y el texto 'Completada'.
 - La métrica de "Tutorías completadas" del tutor se incrementa en uno.

## ID: CP-HU-43-R4
**Título:** Abrir modal 'Detalle de la Tutoría' en modo lectura para tutoría ya 'Completada' (sin calificación del estudiante).
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado. Existe al menos una tutoría en estado 'Completada' (y que el estudiante aún no ha calificado) en la pantalla 'Historial de Tutorías Impartidas'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Historial de Tutorías Impartidas'.
 3. Localizar una tarjeta de tutoría específica que se encuentre en estado 'Completada' (con etiqueta verde y sin botones de acción).
 4. Hacer clic en el área general de dicha tarjeta.

**Expected Results:**
 - Se despliega una ventana modal con el título genérico 'Detalle de la Tutoría'.
 - El modal muestra la información de la tutoría (ej. 'Cálculo Vectorial', 'Andrés Morales', '15 de marzo de 2026 a las 10:00').
 - La vista del modal es de modo lectura.
 - En la esquina inferior izquierda se visualiza el texto estático "Estado: [Icono de cheque] Completada".
 - Los botones de acción ('Completada' e 'Inasistencia') no están disponibles.
 - Únicamente el botón 'Cerrar' está habilitado en la parte inferior derecha del modal.

## ID: CP-HU-43-R5
**Título:** Cerrar modal 'Detalle de la Tutoría' (modo lectura) de una tutoría 'Completada'.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado. El modal 'Detalle de la Tutoría' para una tutoría en estado 'Completada' (modo lectura) está abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Historial de Tutorías Impartidas'.
 3. Localizar una tarjeta de tutoría específica que se encuentre en estado 'Completada'.
 4. Hacer clic en el área general de la tarjeta para abrir el modal 'Detalle de la Tutoría' en modo lectura.
 5. Dentro del modal 'Detalle de la Tutoría', hacer clic en el botón 'Cerrar'.

**Expected Results:**
 - La ventana modal 'Detalle de la Tutoría' se cierra.
 - El sistema regresa a la pantalla 'Historial de Tutorías Impartidas'.
 - La pantalla 'Historial de Tutorías Impartidas' se mantiene visible con la tarjeta de la tutoría en el estado 'Completada' (etiqueta verde con texto 'Completada' y icono de cheque).

## ID: CP-HU-43-ADD-01
**Título:** Abrir modal 'Detalle de la Tutoría' en modo lectura para tutoría 'Completada' y calificada por el estudiante.
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado. Existe al menos una tutoría en estado 'Completada' que ya fue calificada por el estudiante en la pantalla 'Historial de Tutorías Impartidas'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Historial de Tutorías Impartidas'.
 3. Localizar una tarjeta de tutoría específica que se encuentre en estado 'Completada' y que ya haya sido calificada por el estudiante.
 4. Hacer clic en el área general de dicha tarjeta.

**Expected Results:**
 - Se despliega una ventana modal con el título 'Detalle de la Tutoría' sobre la pantalla 'Historial de Tutorías Impartidas'.
 - La vista del modal es de modo lectura.
 - En su parte inferior, se muestra una sección adicional con la puntuación en estrellas otorgada y el comentario exacto redactado por el estudiante.
 - Únicamente el botón 'Cerrar' está habilitado.
