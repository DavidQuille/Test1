# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-13

url: http://localhost:3001/bandeja

## ID: CP-HU-09-R1
**Título:** Visualización Inicial de Solicitudes Pendientes con Datos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y existen solicitudes de tutoría en estado "Pendiente" dirigidas a él.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción "Bandeja" en la barra de navegación superior.

**Expected Results:**
 - El sistema carga la pantalla principal de la Bandeja de Entrada.
 - Se visualiza la barra de navegación superior con los botones "Panel", "Bandeja" (activo), "Mi Agenda", el nombre de usuario y el botón "Salir".
 - Se visualiza el título "Bandeja de Entrada" y el subtítulo "Solicitudes de tutoría recibidas".
 - El indicador global de pendientes en la esquina superior derecha se muestra con un número (ej. '3 pendientes').
 - La pestaña 'Pendientes (X)' (ej. 'Pendientes (3)') se muestra activa (fondo oscuro, texto blanco).
 - Las pestañas "Expiradas (Y)" (ej. 'Expiradas (14)') y "Respondidas (Z)" se muestran inactivas.
 - Se visualizan las cabeceras de la tabla: "ESTUDIANTE", "MATERIA", "FECHA/HORA", "MENSAJE", "ESTADO".
 - Se muestra una lista de hasta 10 solicitudes pendientes en filas colapsadas (con paginación si excede).
 - Cada fila contiene: avatar/iniciales, nombre del estudiante, materia, fecha y hora, un fragmento del mensaje.
 - Cada fila muestra el tag de estado 'Pendiente' (texto naranja, fondo claro).
 - Cada fila presenta un ícono de flecha hacia abajo a la derecha.

---

## ID: CP-HU-09-R2
**Título:** Visualización Inicial de Solicitudes Pendientes sin Datos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y NO existen solicitudes de tutoría en estado "Pendiente" dirigidas a él.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Hacer clic en la opción "Bandeja" en la barra de navegación superior.

**Expected Results:**
 - El sistema carga la pantalla principal de la Bandeja de Entrada.
 - Se visualiza la barra de navegación superior con los botones "Panel", "Bandeja" (activo), "Mi Agenda", el nombre de usuario y el botón "Salir".
 - Se visualiza el título "Bandeja de Entrada" y el subtítulo "Solicitudes de tutoría recibidas".
 - El indicador global de pendientes en la esquina superior derecha muestra '0 pendientes'.
 - La pestaña 'Pendientes (0)' se muestra activa (fondo oscuro, texto blanco).
 - Las cabeceras de la tabla se ocultan.
 - En el área central de la pantalla se visualiza el texto exacto: "No hay solicitudes pendientes.".

---

## ID: CP-HU-09-R3
**Título:** Visualización Inicial de Solicitudes Expiradas con Datos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y existen solicitudes de tutoría en estado "Expirada".

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Hacer clic en la pestaña 'Expiradas (Y)' (ej. 'Expiradas (14)').

**Expected Results:**
 - Permanece en la pantalla "T. Bandeja de Entrada".
 - La pestaña 'Expiradas (Y)' (ej. 'Expiradas (14)') se muestra activa (fondo oscuro, texto blanco).
 - Las pestañas "Pendientes (X)" y "Respondidas (Z)" se muestran inactivas.
 - Se visualizan las cabeceras de la tabla: "ESTUDIANTE", "MATERIA", "FECHA/HORA", "MENSAJE", "ESTADO".
 - Se muestra una lista de solicitudes expiradas en filas colapsadas.
 - Cada fila contiene: avatar/iniciales, nombre del estudiante, materia, fecha y hora, un fragmento del mensaje.
 - Cada fila muestra el tag de estado 'Expirada' (texto rojo).
 - Las filas de solicitudes expiradas NO presentan ícono de flecha hacia abajo a la derecha.

---

## ID: CP-HU-09-R4
**Título:** Visualización Inicial de Solicitudes Expiradas sin Datos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y NO existen solicitudes de tutoría en estado "Expirada".

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Hacer clic en la pestaña 'Expiradas (0)'.

**Expected Results:**
 - Permanece en la pantalla "T. Bandeja de Entrada".
 - La pestaña 'Expiradas (0)' se muestra activa (fondo oscuro, texto blanco).
 - Las cabeceras de la tabla se ocultan.
 - En el área central de la pantalla se visualiza el texto exacto: "No hay solicitudes expiradas.".

---

## ID: CP-HU-09-R5
**Título:** Cambio de Pestaña: De Expiradas a Pendientes
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado, en la pantalla "T. Bandeja de Entrada", con la pestaña 'Expiradas' actualmente activa, y existen solicitudes "Pendiente".

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Hacer clic en la pestaña 'Expiradas (Y)' (ej. 'Expiradas (14)') para activarla.
 4. Hacer clic en la pestaña 'Pendientes (X)' (ej. 'Pendientes (3)').

**Expected Results:**
 - La interfaz actualiza su vista.
 - La pestaña 'Pendientes (X)' (ej. 'Pendientes (3)') se muestra activa (fondo oscuro, texto blanco).
 - Las pestañas "Expiradas (Y)" y "Respondidas (Z)" se muestran inactivas.
 - Se visualizan las cabeceras de la tabla: "ESTUDIANTE", "MATERIA", "FECHA/HORA", "MENSAJE", "ESTADO".
 - Se muestra una lista de solicitudes en estado 'Pendiente' en filas colapsadas.
 - Cada fila contiene: avatar/iniciales, nombre del estudiante, materia, fecha y hora, un fragmento del mensaje.
 - Cada fila muestra el tag de estado 'Pendiente' (texto naranja, fondo claro).
 - Cada fila presenta un ícono de flecha hacia abajo a la derecha.

---

## ID: CP-HU-09-R6
**Título:** Desplegar una Fila de Solicitud Pendiente
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado, en la pantalla "T. Bandeja de Entrada", con la pestaña 'Pendientes' activa y al menos una solicitud "Pendiente" visible (ej. 'Valeria Sánchez').

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Asegurarse de que la pestaña 'Pendientes (X)' esté activa y que se visualicen solicitudes.
 4. Hacer clic en el ícono de flecha hacia abajo de una fila de solicitud pendiente (ej. la correspondiente a 'Valeria Sánchez').

**Expected Results:**
 - La fila de la solicitud seleccionada se expande verticalmente.
 - Debajo de la información base, aparecen los detalles adicionales: un ícono con la modalidad (ej. "Virtual") y su texto.
 - Se visualiza el precio por hora (ej. "$10/h").
 - Se visualiza un recuadro con el título "MENSAJE DEL ESTUDIANTE" que contiene el texto completo del mensaje.
 - Se visualizan los botones "Aceptar" (fondo oscuro) y "Rechazar" (fondo blanco) en la fila expandida.
 - El ícono de flecha de la fila seleccionada cambia apuntando hacia arriba.

---

## ID: CP-HU-09-R7
**Título:** Colapsar una Fila de Solicitud Pendiente Desplegada
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado, en la pantalla "T. Bandeja de Entrada", con la pestaña 'Pendientes' activa y una fila de solicitud pendiente (ej. 'Valeria Sánchez') está actualmente expandida.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Asegurarse de que la pestaña 'Pendientes (X)' esté activa.
 4. Desplegar una fila de solicitud pendiente (ej. la de 'Valeria Sánchez') haciendo clic en su ícono de flecha hacia abajo.
 5. Hacer clic en el ícono de flecha hacia arriba de la fila de la solicitud expandida (ej. la de 'Valeria Sánchez').

**Expected Results:**
 - La fila de la solicitud seleccionada se contrae.
 - Se ocultan los detalles de modalidad, precio, el mensaje completo y los botones de acción ("Aceptar", "Rechazar").
 - La fila vuelve a su estado de resumen inicial, mostrando únicamente la información básica.
 - El ícono de flecha de la fila vuelve a apuntar hacia abajo.

---

## ID: CP-HU-09-R8
**Título:** Desplegar una Fila de Solicitud Expirada
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado, en la pantalla "T. Bandeja de Entrada", con la pestaña 'Expiradas' activa y al menos una solicitud expirada visible.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Hacer clic en la pestaña 'Expiradas (Y)' (ej. 'Expiradas (14)') para activarla y visualizar solicitudes.
 4. Hacer clic en cualquier parte de una fila de solicitud expirada (ej. la fila correspondiente a 'Juan Pérez').

**Expected Results:**
 - La fila de la solicitud seleccionada se expande verticalmente.
 - Se muestran detalles adicionales: un ícono con la modalidad (ej. "Presencial") y su texto.
 - Se visualiza el precio por hora (ej. "$8/h").
 - Se visualiza un recuadro con el título "MENSAJE DEL ESTUDIANTE" conteniendo el texto completo del mensaje.
 - El ícono de flecha de la fila seleccionada apunta hacia arriba.
 - No se visualizan botones de acción ("Aceptar", "Rechazar") en la fila expandida.
 - *Observación:* Existe una aparente inconsistencia en la documentación: Los criterios de aceptación indican que las filas expiradas "NO presentan ícono de flecha hacia abajo" inicialmente, mientras que el glosario de A9 y A10 describe la funcionalidad de flechas para desplegar/colapsar. Este caso de prueba asume que la fila es expandible mediante clic en la fila, y que el ícono de flecha aparece y cambia de estado tras la expansión.

---

## ID: CP-HU-09-R9
**Título:** Colapsar una Fila de Solicitud Expirada Desplegada
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado, en la pantalla "T. Bandeja de Entrada", con la pestaña 'Expiradas' activa y una fila de solicitud expirada está actualmente expandida.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada" (haciendo clic en "Bandeja" en la barra superior).
 3. Hacer clic en la pestaña 'Expiradas (Y)' (ej. 'Expiradas (14)') para activarla y visualizar solicitudes.
 4. Desplegar una fila de solicitud expirada (ej. la de 'Juan Pérez') haciendo clic en la fila.
 5. Hacer clic en el ícono de flecha hacia arriba de la fila de la solicitud expandida (ej. la de 'Juan Pérez').

**Expected Results:**
 - La fila de la solicitud seleccionada se contrae.
 - Se ocultan los detalles de modalidad, precio y el mensaje completo.
 - La fila vuelve a su estado de resumen inicial, mostrando únicamente la información básica.
 - El ícono de flecha de la fila vuelve a apuntar hacia abajo (o desaparece si la implementación inicial no lo muestra).
 - *Observación:* Se mantiene la observación sobre la inconsistencia de la documentación respecto a la presencia de íconos de flecha en filas expiradas en su estado colapsado inicial, asumiendo aquí que el ícono es interactivo una vez la fila está desplegada.
