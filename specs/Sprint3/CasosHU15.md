
url: http://localhost:3001/tutor/agenda

## ID: CP-HU-15-R1
**Título:** Verificar navegación a la vista principal "Mi Agenda"
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor autenticado y logueado en la plataforma PoliTutorias.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Ubicar el cursor y hacer clic sobre el enlace "Mi Agenda" en la barra de navegación global superior.

**Expected Results:**
 - El sistema enruta y carga la vista principal de la agenda ('T. Mi Agenda').
 - Se visualiza el título "Mi Agenda" y el subtítulo "Calendario de sesiones confirmadas".
 - El enlace "Mi Agenda" en el menú superior queda marcado con un resaltado amarillo indicando la ubicación activa.
 - La vista se divide en dos columnas: la izquierda muestra el calendario mensual con indicadores textuales en los días agendados, y la columna derecha (panel lateral) muestra el resumen "ESTE MES".
 - En la barra de navegación superior se muestran los enlaces 'Panel', 'Bandeja', 'Mi Agenda' (resaltado con fondo amarillo), 'Henry' (con ícono de usuario 'H' en círculo naranja), y 'Salir'.
 - El calendario muestra el mes 'Marzo 2026', flechas de navegación '<' y '>', los encabezados de los días de la semana 'DOM' a 'SÁB', y la cuadrícula de días del mes (del 1 al 31), incluyendo días con sesiones confirmadas (ej: '4: 15:00 Cálculo...', '6: 09:00 Cálculo..., 09:00 Física I, +2 más', '7: 11:00 Álgebra...', '8: 09:00 Cálculo..., 11:00 Física I, +2 más', '15: 10:00 Cálculo...').
 - El día '9' está resaltado con un círculo morado y el día '15' con un fondo amarillo.
 - El panel lateral derecho muestra el encabezado '15 de Marzo', '1 sesión confirmada', y la tarjeta '10:00 — Cálculo Vectorial', 'Andrés Morales', 'Toca para ver detalles →'.
 - La sección 'ESTE MES' muestra 'Sesiones confirmadas 11' (y flecha de expandir/contraer), listando sesiones como '11:00 — Álgebra Lineal', 'Andrés Morales', divisores de día (ej. 'Dom 8' con '4' sesiones) y sus respectivas sesiones, y 'Dom 15' con '1' sesión y su sesión.

---

## ID: CP-HU-15-R2
**Título:** Verificar actualización del panel lateral al seleccionar un día en el calendario
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", observando el calendario mensual con datos cargados, donde se evidencian días específicos que contienen etiquetas de sesiones confirmadas.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Posicionar el cursor y hacer clic sobre el cuadro numérico correspondiente a un día específico en el calendario que contenga sesiones confirmadas (ej., el día '8').

**Expected Results:**
 - El panel lateral derecho actualiza su cabecera para mostrar la fecha específica seleccionada (ej. '8 de Marzo') y el número de sesiones confirmadas para ese día (ej. '4 sesiones confirmadas').
 - El bloque de tarjetas "ESTE MES" se desplaza hacia abajo.
 - En la parte superior del panel se renderizan las tarjetas de sesiones confirmadas **exclusivamente para el día seleccionado** (ej. si se clickea el día '8', se muestran las tarjetas: '09:00 — Cálculo Vectorial', 'Sebastián Ríos', '11:00 — Física I', 'Isabella Mora', '14:00 — Álgebra Lineal', 'Lucas Herrera', '16:00 — Estática', 'Camila Flores').
 - La sección 'ESTE MES' y su listado de sesiones por mes se mantiene visible debajo, si está expandida.

---

## ID: CP-HU-15-R3
**Título:** Verificar visualización del modal "Detalle Tutoría" para una tutoría Virtual Pendiente
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", habiendo seleccionado un día en el calendario cuyo panel lateral visualiza la tarjeta resumen de una tutoría confirmada con modalidad "Virtual" y estado "Pendiente".

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Seleccionar un día en el calendario que tenga una tutoría Virtual y Pendiente (ej. el día '15' que muestra '10:00 — Cálculo Vectorial').
 3. Hacer clic sobre la tarjeta resumen de la sesión "10:00 — Cálculo Vectorial" en el panel lateral derecho.

**Expected Results:**
 - El sistema bloquea la vista de fondo y abre un modal (según mapa M7) sobre la pantalla 'T. Mi Agenda'.
 - El modal tiene el título '10:00 — Cálculo Vectorial' y subtítulo 'Andrés Morales'.
 - Dentro del modal se visualizan los campos: 'Modalidad: Virtual', 'Estado: Pendiente', 'Fecha: 15 de Marzo, 2026'.
 - Se visualiza un bloque titulado 'ENLACE' que presenta la URL 'meet.google.com/abc-xyz-pqr' en color azul.
 - Se visualizan los campos 'Estudiante:' y un campo de texto multi-línea 'Mensaje:'.
 - La botonera inferior del modal despliega los botones 'Cancelar tutoría' (a la izquierda) y 'Cerrar' (a la derecha).

---

## ID: CP-HU-15-R4
**Título:** Verificar visualización del modal "Detalle Tutoría" para una tutoría Presencial Pendiente
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", habiendo seleccionado un día en el calendario cuyo panel lateral visualiza la tarjeta resumen de una tutoría confirmada con modalidad "Presencial" y estado "Pendiente".

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Seleccionar un día en el calendario que tenga una tutoría Presencial y Pendiente (ej. el día '15' que muestra '10:00 — Cálculo Vectorial').
 3. Hacer clic sobre la tarjeta resumen de la sesión "10:00 — Cálculo Vectorial" en el panel lateral derecho.

**Expected Results:**
 - El sistema bloquea la vista de fondo y abre un modal (según mapa M7) sobre la pantalla 'T. Mi Agenda'.
 - El modal tiene el título '10:00 — Cálculo Vectorial' y subtítulo 'Andrés Morales'.
 - Dentro del modal se visualizan los campos: 'Modalidad: Presencial', 'Estado: Pendiente', 'Fecha: 15 de Marzo, 2026'.
 - Se visualiza un bloque titulado 'LUGAR' (acompañado de un ícono de ubicación) que expone la dirección física 'Carrera 43 # 12-34, Bogotá'.
 - Se visualizan los campos 'Estudiante:' y un campo de texto multi-línea 'Mensaje:'.
 - La botonera inferior del modal despliega los botones 'Cancelar tutoría' (a la izquierda) y 'Cerrar' (a la derecha).

---

## ID: CP-HU-15-R5
**Título:** Verificar visualización del modal "Detalle Tutoría" para una tutoría Completada
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", habiendo seleccionado un día en el calendario cuyo panel lateral visualiza la tarjeta resumen de una tutoría confirmada con estado "Completada".

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Seleccionar un día en el calendario que contenga una tutoría con estado "Completada".
 3. Hacer clic sobre la tarjeta resumen de la sesión con estado "Completada" en el panel lateral derecho.

**Expected Results:**
 - El sistema bloquea la vista de fondo y abre un modal (según mapa M7) sobre la pantalla 'T. Mi Agenda'.
 - El modal muestra un mensaje superior indicando: 'Tutoría completada. Esta tutoría ya se realizó. Solo puedes ver los detalles.'
 - Únicamente el botón 'Cerrar' se visualiza en la parte inferior del modal.

---

## ID: CP-HU-15-R6
**Título:** Verificar el cierre del modal de detalle de tutoría Completada
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", con el modal "Detalle Tutoría" de una tutoría "Completada" abierto.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Seleccionar un día en el calendario que contenga una tutoría con estado "Completada" y hacer clic en su tarjeta resumen para abrir el modal.
 3. Hacer clic en el botón "Cerrar" en la parte inferior del modal de detalle de tutoría completada.

**Expected Results:**
 - El modal de detalle de tutoría completada se cierra y desaparece de la vista.
 - Se regresa a la pantalla 'T. Mi Agenda' con la vista de calendario mensual.
 - El panel lateral derecho muestra el estado previo (ej. el resumen de sesiones del día o del mes) antes de la apertura del modal.

---

## ID: CP-HU-15-R7
**Título:** Verificar el cierre del modal de detalle de tutoría (virtual/presencial pendiente)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", con el modal "Detalle Tutoría" de una tutoría "Virtual Pendiente" o "Presencial Pendiente" abierto.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Seleccionar un día en el calendario que contenga una tutoría Virtual o Presencial Pendiente y hacer clic en su tarjeta resumen para abrir el modal.
 3. Hacer clic en el botón "Cerrar" en la esquina inferior derecha del modal de detalle de tutoría.

**Expected Results:**
 - La acción de cerrado se ejecuta, el modal desaparece de la vista.
 - La pantalla principal de Mi Agenda recupera el foco.
 - Se conserva el día previamente seleccionado en el calendario y la vista del panel derecho intacta.
 - Se regresa a la pantalla 'T. Mi Agenda' con la vista de calendario mensual y el panel lateral derecho mostrando el estado previo antes de la apertura del modal.

---

## ID: CP-HU-15-R8
**Título:** Verificar el inicio del flujo de cancelación de tutoría desde el modal de detalle
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "Mi Agenda", con el modal "Detalle Tutoría" de una tutoría "Virtual Pendiente" o "Presencial Pendiente" abierto, y el botón "Cancelar tutoría" visible.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la vista principal "Mi Agenda".
 2. Seleccionar un día en el calendario que contenga una tutoría Virtual o Presencial Pendiente y hacer clic en su tarjeta resumen para abrir el modal.
 3. Hacer clic en el botón "Cancelar tutoría" en la parte inferior izquierda del modal de detalle de tutoría.

**Expected Results:**
 - Se cierra el modal de detalle de tutoría actual.
 - El sistema inicia el flujo de cancelación de la tutoría, levantando una alerta destructiva o un nuevo modal exigiendo la selección de un motivo justificado.
 - Una vez completado este flujo de selección de motivo, se regresa a la pantalla 'T. Mi Agenda'.
 - La pantalla principal de Mi Agenda recupera el foco.