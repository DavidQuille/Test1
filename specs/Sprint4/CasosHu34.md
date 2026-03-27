# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-26

url: https://politutorias-frontend.vercel.app/tutor/historial

## ID: CP-HU-39-R1
**Título:** Visualización inicial del Historial de Tutorías con menos de 5 registros
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema con 3 tutorías impartidas registradas (menos de 5).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.

**Expected Results:**
 - El sistema redirige a la pantalla 'Historial de Tutorías Impartidas'.
 - Se visualiza el logo 'Poli Tutorias' y el menú de navegación superior con las opciones 'Panel', 'Bandeja', 'Mi Agenda', 'Historial' (resaltada con un fondo oscuro y texto blanco, indicando la página actual), 'Reseñas', un icono de usuario con el texto 'J Juan' y el texto 'Salir'.
 - El título principal 'Historial de Tutorías Impartidas' y el subtítulo 'Registro de todas tus sesiones pasadas' están presentes.
 - Se muestran tres métricas estáticas en la parte superior: '9 Tutorías completadas' (acompañada de un ícono de check verde), '4 Materias impartidas' (acompañada de un ícono de libro) y '89% Estudiantes que califican' (acompañada de un ícono de estrella).
 - Se visualiza un listado de máximo 5 tarjetas de tutorías, correspondiente a las 3 tutorías registradas.
 - Cada tarjeta presenta las iniciales del estudiante en un círculo, el título de la oferta de la tutoría, el nombre del estudiante, y la fecha y hora de la sesión.
 - Los controles de paginación ('<', '1', '2', '>') están ocultos en la parte inferior de la pantalla.

## ID: CP-HU-39-R2
**Título:** Visualización inicial del Historial de Tutorías con más de 5 registros (con paginación)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema con 12 tutorías impartidas registradas (más de 5).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.

**Expected Results:**
 - El sistema redirige a la pantalla 'Historial de Tutorías Impartidas'.
 - Se visualiza el logo 'Poli Tutorias' y el menú de navegación superior con las opciones 'Panel', 'Bandeja', 'Mi Agenda', 'Historial' (resaltada con un fondo oscuro y texto blanco, indicando la página actual), 'Reseñas', un icono de usuario con el texto 'J Juan' y el texto 'Salir'.
 - El título principal 'Historial de Tutorías Impartidas' y el subtítulo 'Registro de todas tus sesiones pasadas' están presentes.
 - Se muestran tres métricas estáticas en la parte superior: '9 Tutorías completadas' (acompañada de un ícono de check verde), '4 Materias impartidas' (acompañada de un ícono de libro) y '89% Estudiantes que califican' (acompañada de un ícono de estrella).
 - Se visualiza un listado con las primeras 5 tarjetas de tutorías, cada una detallando: iniciales del estudiante (en un círculo), título de la oferta de la tutoría, nombre del estudiante, y fecha y hora de la sesión.
 - En la parte inferior de la pantalla, los controles numéricos de paginación y flechas ('<', '1' (resaltado), '2', '3', '4', '5', '6', '>') son visibles, indicando la disponibilidad de más páginas.

## ID: CP-HU-39-R3
**Título:** Navegación por número de página en el Historial de Tutorías
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema con 12 tutorías impartidas registradas, visualizando la primera página de su 'Historial de Tutorías Impartidas' con los controles de paginación visibles.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
 3. Asegurarse de que el listado de tutorías muestra las primeras 5 tarjetas y los controles de paginación están visibles.
 4. Hacer clic en el número de página '2' de los controles de paginación.

**Expected Results:**
 - El sistema permanece en la pantalla 'Historial de Tutorías Impartidas'.
 - El listado de tarjetas de tutorías se actualiza para mostrar el siguiente bloque de tutorías (tarjetas 6 a 10).
 - El número '2' en los controles de paginación se resalta, indicando que es la nueva página activa.

## ID: CP-HU-39-R4-Siguiente
**Título:** Navegación por flecha 'Siguiente' (>) en el Historial de Tutorías
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema con 12 tutorías impartidas registradas, visualizando la primera página de su 'Historial de Tutorías Impartidas' con los controles de paginación visibles.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
 3. Asegurarse de que el listado de tutorías muestra las primeras 5 tarjetas y los controles de paginación están visibles.
 4. Hacer clic en la flecha de paginación '>' (Siguiente).

**Expected Results:**
 - El sistema permanece en la pantalla 'Historial de Tutorías Impartidas'.
 - El listado de tarjetas de tutorías se actualiza para mostrar la siguiente página de resultados (tarjetas 6 a 10).
 - El número de la nueva página activa (ej. '2') se resalta en los controles de paginación.

## ID: CP-HU-39-R4-Anterior
**Título:** Navegación por flecha 'Anterior' (<) en el Historial de Tutorías
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema con 12 tutorías impartidas registradas, visualizando la segunda página de su 'Historial de Tutorías Impartidas'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
 3. Asegurarse de que el listado de tutorías muestra las primeras 5 tarjetas y los controles de paginación están visibles.
 4. Hacer clic en el número de página '2' para navegar a la segunda página.
 5. Hacer clic en la flecha de paginación '<' (Anterior).

**Expected Results:**
 - El sistema permanece en la pantalla 'Historial de Tutorías Impartidas'.
 - El listado de tarjetas de tutorías se actualiza para mostrar la primera página de resultados (tarjetas 1 a 5).
 - El número '1' en los controles de paginación se resalta, indicando que es la nueva página activa.

## ID: CP-HU-39-R5-Abrir
**Título:** Abrir modal de detalle al hacer clic en una tarjeta de tutoría impartida
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema, visualizando el listado de tarjetas en su 'Historial de Tutorías Impartidas' con al menos una tarjeta visible.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
 3. Asegurarse de que al menos una tarjeta de tutoría es visible en el listado.
 4. Hacer clic sobre el área general de una tarjeta individual de tutoría (ej. la primera tarjeta del listado).

**Expected Results:**
 - Se despliega una ventana modal 'Detalle de la Tutoría' sobre la pantalla 'Historial de Tutorías Impartidas'.
 - El modal se superpone a la pantalla principal, atenuándola ligeramente.
 - Muestra la información detallada de la sesión seleccionada, incluyendo la información del estudiante, título de la oferta de la tutoría, fecha, hora, modalidad, precio, lugar/enlace y mensaje.
 - No se visualizan los botones 'Completada' ni 'Inasistencia' dentro de esta modal.
 - En la parte inferior del modal, únicamente se visualiza el botón 'Cerrar'.

## ID: CP-HU-39-R5-Cerrar
**Título:** Cerrar modal de detalle de tutoría impartida
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema, con el modal 'Detalle de la Tutoría' abierto sobre la pantalla 'Historial de Tutorías Impartidas'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción de menú 'Historial' en la barra de navegación superior.
 3. Hacer clic sobre el área general de una tarjeta individual de tutoría (ej. la primera tarjeta del listado) para abrir el modal de detalle.
 4. Asegurarse de que el modal 'Detalle de la Tutoría' se ha desplegado correctamente.
 5. Hacer clic en el botón 'Cerrar' dentro del modal.

**Expected Results:**
 - La ventana modal 'Detalle de la Tutoría' desaparece.
 - El usuario regresa a la vista principal del listado en la pantalla 'Historial de Tutorías Impartidas', manteniendo el estado previo de la paginación y el listado.