
url: http://localhost:3001/historial

## ID: CP-HU-10-01
**Título:** Apertura de Modal de Calificación desde Tarjeta de Historial
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada" visible.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" directamente en la tarjeta de la tutoría.

**Expected Results:**
 - El sistema despliega el modal "Califica tu tutoría" sobre la pantalla actual.
 - Se visualiza un modal centrado con el título "Califica tu tutoría".
 - Contiene el texto "Califica tu experiencia con el tutor:", un conjunto de 5 estrellas (inicialmente sin selección), el texto "Deja un comentario (opcional):", un campo de texto (textarea), y dos botones en la parte inferior: "Enviar Reseña" y "Cancelar".
 - El botón "Enviar Reseña" se muestra deshabilitado (gris claro).

## ID: CP-HU-10-02
**Título:** Envío Exitoso de Reseña con Comentario y Calificación
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada". Modal "Califica tu tutoría" abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" en la tarjeta.
 5. Seleccionar 4 estrellas en el conjunto de calificación.
 6. Ingresar texto en el campo "Deja un comentario (opcional):", por ejemplo: "Excelente tutor, muy claro en sus explicaciones y dispuesto a ayudar.".
 7. Hacer clic en el botón "Enviar Reseña".

**Expected Results:**
 - El botón "Enviar Reseña" se visualiza habilitado después de seleccionar las estrellas.
 - El modal "Califica tu tutoría" se cierra.
 - Se muestra el mensaje temporal exacto: "Reseña enviada. Gracias por calificar tu tutoría.".
 - La tarjeta de la tutoría correspondiente en la pantalla 'Historial de Tutorías' se actualiza: el botón oscuro "Calificar" desaparece.
 - En su lugar, se muestran las 4 estrellas seleccionadas por el estudiante y el comentario ingresado "Excelente tutor, muy claro en sus explicaciones y dispuesto a ayudar.".
 - La etiqueta de estado verde "Completada" permanece visible.
 - La pantalla 'Historial de Tutorías' se visualiza nuevamente.

## ID: CP-HU-10-03
**Título:** Envío Exitoso de Reseña sin Comentario, solo Calificación
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada". Modal "Califica tu tutoría" abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" en la tarjeta.
 5. Seleccionar 5 estrellas en el conjunto de calificación.
 6. Dejar el campo "Deja un comentario (opcional):" vacío.
 7. Hacer clic en el botón "Enviar Reseña".

**Expected Results:**
 - El botón "Enviar Reseña" se visualiza habilitado después de seleccionar las estrellas.
 - El modal "Califica tu tutoría" se cierra.
 - Se muestra el mensaje temporal exacto: "Reseña enviada. Gracias por calificar tu tutoría.".
 - La tarjeta de la tutoría correspondiente en la pantalla 'Historial de Tutorías' se actualiza: el botón oscuro "Calificar" desaparece.
 - En su lugar, se muestran las 5 estrellas seleccionadas por el estudiante.
 - La etiqueta de estado verde "Completada" permanece visible.
 - La pantalla 'Historial de Tutorías' se visualiza nuevamente.

## ID: CP-HU-10-04
**Título:** Botón 'Enviar Reseña' Deshabilitado sin Selección de Estrellas
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada". Modal "Califica tu tutoría" abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" en la tarjeta.
 5. Dejar las 5 estrellas sin seleccionar.
 6. Ingresar texto en el campo "Deja un comentario (opcional):", por ejemplo: "Quiero dejar un comentario sin calificar la tutoría.".

**Expected Results:**
 - El botón "Enviar Reseña" dentro del modal "Califica tu tutoría" se visualiza deshabilitado (en gris claro).
 - El modal 'Califica tu tutoría' permanece abierto y visible en la pantalla.

## ID: CP-HU-10-05
**Título:** Cancelación de Reseña
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada". Modal "Califica tu tutoría" abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" en la tarjeta.
 5. Seleccionar 3 estrellas.
 6. Ingresar texto en el campo "Deja un comentario (opcional):", por ejemplo: "Este es un comentario de prueba para cancelar.".
 7. Hacer clic en el botón "Cancelar".

**Expected Results:**
 - El modal con el título "Califica tu tutoría" desaparece de la pantalla.
 - El modal se cierra sin guardar información.
 - El estudiante regresa a la vista exacta donde se encontraba (la pantalla 'Historial de Tutorías').
 - La tarjeta de la tutoría permanece en su estado original "Completada" y el botón oscuro "Calificar" sigue visible.

## ID: CP-HU-10-06
**Título:** Visualización de Detalle de Tutoría Calificada
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría que ya ha sido calificada (mostrando estrellas/comentario).

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría que ya fue calificada (indicada por las estrellas y posible comentario visible).
 4. Hacer clic sobre el área general de la tarjeta de la tutoría calificada.

**Expected Results:**
 - Se despliega un modal centrado con el título "Detalle de la Tutoría".
 - El modal muestra la información general de la sesión.
 - En la parte inferior, se visualiza una sección "Tu Reseña" con las estrellas otorgadas y el comentario redactado previamente.
 - Solo se visualiza un botón "Cerrar" en la parte inferior del modal.
 - El botón "Cerrar" se visualiza habilitado y es cliqueable.
 - Esta vista es de solo lectura.

## ID: CP-HU-10-07
**Título:** Habilitación del Botón 'Enviar Reseña' al Seleccionar Estrellas
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada". Modal "Califica tu tutoría" abierto, con el botón "Enviar Reseña" deshabilitado.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" en la tarjeta. (El botón "Enviar Reseña" está deshabilitado por defecto).
 5. Hacer clic para seleccionar 1 estrella (o cualquier número entre 1 y 5).

**Expected Results:**
 - El botón "Enviar Reseña" cambia visualmente a estado habilitado e interactuable (cambia de gris claro a un color más oscuro).

## ID: CP-HU-10-08
**Título:** Validación del Límite de Caracteres en el Campo de Comentario (300 caracteres)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada". Modal "Califica tu tutoría" abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic en el botón oscuro "Calificar" en la tarjeta.
 5. Ingresar un texto de 300 caracteres exactos en el campo "Deja un comentario (opcional):".
 6. Intentar ingresar un carácter adicional.

**Expected Results:**
 - El contador de caracteres en el campo de comentario muestra "300/300".
 - El sistema restringe el ingreso de texto adicional, no permitiendo escribir más allá de los 300 caracteres.

## ID: CP-HU-10-09
**Título:** Apertura de Modal de Calificación desde Detalle de Tutoría Completada
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría en estado "Completada".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría con la etiqueta de estado "Completada".
 4. Hacer clic sobre el área general de la tarjeta para abrir el modal 'Detalle de la Tutoría'.
 5. Hacer clic en el botón oscuro interactivo "Calificar" dentro del modal 'Detalle de la Tutoría'.

**Expected Results:**
 - Se superpone el modal "Califica tu tutoría" bloqueando la vista anterior ('Detalle de la Tutoría').
 - El modal contiene las 5 estrellas vacías, el campo de comentario opcional y el botón "Enviar Reseña" deshabilitado (gris claro).

## ID: CP-HU-10-10
**Título:** Cerrar Modal de Detalle de Tutoría Calificada
**Prioridad:** Baja
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'Historial de Tutorías', con al menos una tutoría calificada. Modal 'Detalle de la Tutoría' abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Historial de Tutorías'.
 3. Localizar una tarjeta de tutoría que ya fue calificada.
 4. Hacer clic sobre el área general de la tarjeta para abrir el modal 'Detalle de la Tutoría'.
 5. Hacer clic en el botón "Cerrar" en la parte inferior del modal.

**Expected Results:**
 - El modal 'Detalle de la Tutoría' desaparece de la pantalla.
 - El usuario regresa al listado principal de 'Historial de Tutorías'.
