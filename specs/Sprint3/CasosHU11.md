
url: http://localhost:3001/agenda

## ID: CP-HU-11-01
**Título:** Visualización de la pantalla 'Tutorías Agendadas' al navegar desde el menú
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante autenticado en el sistema y con registros de tutorías futuras confirmadas.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Hacer clic en el enlace de navegación "Agenda" en el menú superior.

**Expected Results:**
 - El sistema enruta la vista y carga la pantalla de Tutorías Agendadas.
 - Se visualiza la barra de navegación superior con el 'Poli Tutorías' logo y los textos 'Explorar', 'Mis Solicitudes', 'Agenda' (subrayado).
 - A la derecha, se muestra 'P Patricio' y 'Salir'.
 - El contenido principal incluye el título 'Tutorías Agendadas' y el subtítulo 'Lista cronológica de tus sesiones confirmadas'.
 - Se organiza la sección titulada "PRÓXIMAS (3)" que contiene tres tarjetas de tutorías futuras con su fecha, horario, materia y tutor resaltados.
 - Cada tarjeta de 'PRÓXIMAS' incluye: un bloque de calendario con el mes (ej. 'MAR') y el día (ej. '15'), el título de la materia (ej. 'Cálculo Vectorial'), la hora (ej. '10:00'), un mini avatar seguido del nombre del tutor (ej. 'Juan Pérez'), y la fecha completa (ej. 'Domingo, 15 de marzo de 2026').
 - Se muestra la sección 'ANTERIORES (7)' con tres tarjetas de tutoría visibles en un tono gris claro.
 - Cada tarjeta de 'ANTERIORES' incluye: un bloque de calendario con el mes (ej. 'MAR') y el día (ej. '8'), el título de la materia (ej. 'Programación Básica'), la hora (ej. '09:00'), un mini avatar seguido del nombre del tutor (ej. 'María López'), la fecha completa (ej. 'Domingo, 8 de marzo de 2026'), y una etiqueta 'COMPLETADA' en el lado derecho.
 - Debajo de las tarjetas de 'ANTERIORES', se encuentra un botón con el texto 'Ver todas las anteriores (4 más)' y un icono de flecha hacia abajo.

---

## ID: CP-HU-11-02
**Título:** Visualización del modal de detalle para tutoría virtual próxima
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante autenticado y en la pantalla 'Tutorías Agendadas', con una tutoría virtual próxima en la sección "PRÓXIMAS".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'E. Agenda' (Tutorías Agendadas).
 3. Localizar una tarjeta de tutoría configurada bajo la modalidad "Virtual" en la sección "PRÓXIMAS" (Ej: 'Cálculo Vectorial').
 4. Hacer clic en la tarjeta de tutoría 'Cálculo Vectorial'.

**Expected Results:**
 - El sistema reacciona levantando la superposición del modal "Detalles de la Sesión".
 - El modal se despliega con el título 'Cálculo Vectorial'.
 - Dentro del modal se muestran los detalles: Fecha 'Domingo, 15 de marzo de 2026', Hora '10:00', Tarifa '$20.000 COP/hora', Modalidad 'Virtual'.
 - Se renderiza el bloque "ENLACE" mostrando el hipervínculo en color azul 'meet.google.com/abc-xyz-123'.
 - Se muestra la sección con el título 'Mensaje' y el texto 'Necesito refuerzo en integrales triples y series de Fourier.'.
 - En la esquina inferior derecha del modal, se presenta únicamente el botón "Cerrar". No se visualiza la opción para cancelar.

---

## ID: CP-HU-11-03
**Título:** Visualización del modal de detalle para tutoría presencial próxima
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante autenticado y en la pantalla 'Tutorías Agendadas', con una tutoría presencial próxima en la sección "PRÓXIMAS".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'E. Agenda' (Tutorías Agendadas).
 3. Localizar una tarjeta de tutoría configurada bajo la modalidad "Presencial" en la sección "PRÓXIMAS" (Ej: 'Química Orgánica').
 4. Hacer clic en la tarjeta de tutoría 'Química Orgánica'.

**Expected Results:**
 - El sistema reacciona levantando la superposición del modal "Detalles de la Sesión".
 - El modal se despliega con el título 'Química Orgánica'.
 - Dentro del modal se muestran los detalles: Fecha 'Jueves, 2 de abril de 2026', Hora '11:00', Tarifa '$20.000 COP/hora', Modalidad 'Presencial'.
 - Se renderiza el bloque específico "LUGAR" acompañado de un ícono de ubicación o mapa, detallando la dirección 'Laboratorio de Química, Edificio B, Piso 2'.
 - Se muestra la sección con el título 'Mensaje' y el texto 'Necesito repasar los mecanismos de reacción para SN1 y SN2.'.
 - En la botonera de la parte inferior del modal, se presenta únicamente el botón "Cerrar".

---

## ID: CP-HU-11-04
**Título:** Cierre del modal de detalle de tutoría al hacer clic en el botón 'Cerrar'
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante autenticado y en la pantalla 'Tutorías Agendadas', con el modal "Detalles de la Sesión" de una tutoría próxima abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'E. Agenda' (Tutorías Agendadas).
 3. Hacer clic en una tarjeta de tutoría 'PRÓXIMA' (Ej: 'Cálculo Vectorial') para abrir el modal de detalle.
 4. Hacer clic en el botón "Cerrar" en la parte inferior del modal "Detalles de la Sesión".

**Expected Results:**
 - El sistema captura la orden de salida y destruye el modal.
 - El modal desaparece de la vista.
 - La pantalla 'E. Agenda' se muestra completamente, con todos sus elementos visibles nuevamente.
 - La lista de tutorías "PRÓXIMAS" se mantiene en la misma posición de scroll o vista en la que se encontraba originalmente antes del clic.

---

## ID: CP-HU-11-05
**Título:** Cierre del modal de detalle de tutoría al hacer clic en el ícono 'X'
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante autenticado y en la pantalla 'Tutorías Agendadas', con el modal "Detalles de la Sesión" de una tutoría próxima abierto.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'E. Agenda' (Tutorías Agendadas).
 3. Hacer clic en una tarjeta de tutoría 'PRÓXIMA' (Ej: 'Química Orgánica') para abrir el modal de detalle.
 4. Hacer clic en el ícono de "X" ubicado en la cabecera del modal "Detalles de la Sesión".

**Expected Results:**
 - El sistema captura la orden de salida y destruye el modal.
 - El modal desaparece de la vista.
 - La pantalla 'E. Agenda' se muestra completamente, con todos sus elementos visibles nuevamente.
 - La lista de tutorías "PRÓXIMAS" se mantiene en la misma posición de scroll o vista en la que se encontraba originalmente antes del clic.
