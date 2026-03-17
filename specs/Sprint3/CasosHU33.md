# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-13

url: https://politutorias-frontend.vercel.app/dashboard/solicitudes

## ID: CP-HU-33-R1
**Título:** Verificar visualización del filtro "Todas" en Mis Solicitudes
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante se encuentra autenticado y navega a la pantalla principal de "Mis Solicitudes". Existen solicitudes en varios estados (Pendiente, Aceptada, Rechazada, Expirada).

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Mis Solicitudes'.
 3. Hacer clic en la pestaña superior "Todas (X)" (donde X es el contador total de solicitudes).

**Expected Results:**
 - La pestaña "Todas (X)" se muestra activa (fondo azul oscuro con texto blanco).
 - Se visualiza una lista de tarjetas que combina visualmente solicitudes en estado Pendiente, Aceptada, Rechazada y Expirada.
 - Cada tarjeta muestra de forma obligatoria el avatar, materia, tutor, fecha/hora, modalidad, precio y su respectiva etiqueta de estado en la esquina superior derecha.

---

## ID: CP-HU-33-R2
**Título:** Verificar visualización del filtro "Pendientes" en Mis Solicitudes
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante se encuentra en la pantalla de "Mis Solicitudes". Existen solicitudes en estado Pendiente.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Mis Solicitudes'.
 3. Hacer clic en la pestaña "Pendientes (X)" (donde X es el contador de solicitudes pendientes).

**Expected Results:**
 - La pestaña "Pendientes (X)" se muestra activa (fondo oscuro, texto blanco).
 - El sistema filtra la lista principal y renderiza únicamente las tarjetas correspondientes a solicitudes en curso.
 - En todas las tarjetas visibles, la etiqueta de estado es "Pendiente" (texto naranja con ícono de reloj, fondo naranja claro).

---

## ID: CP-HU-33-R5
**Título:** Verificar visualización del filtro "Expiradas" en Mis Solicitudes
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante se encuentra en la pantalla de "Mis Solicitudes". Existen solicitudes en estado Expirada.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Mis Solicitudes'.
 3. Hacer clic en la pestaña "Expiradas (X)" (donde X es el contador de solicitudes expiradas).

**Expected Results:**
 - La pestaña "Expiradas (X)" se muestra activa (fondo oscuro, texto blanco).
 - El sistema filtra la lista principal y renderiza únicamente las tarjetas que superaron la regla de tiempo.
 - Visualmente, todas las tarjetas mostradas presentan una franja lateral izquierda color rojo y en la esquina superior derecha contienen el tag "Expirada" (texto rojo, ícono de reloj, fondo rojo claro).

---

## ID: CP-HU-33-R6
**Título:** Verificar despliegue del modal "Detalle de la Solicitud" para una solicitud Pendiente
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante se encuentra en la vista de "Mis Solicitudes" y visualiza en su lista una tarjeta con el tag de estado "Pendiente".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Mis Solicitudes'.
 3. Asegurarse de que existe al menos una tarjeta de solicitud con la etiqueta "Pendiente".
 4. Hacer clic sobre cualquier parte de una tarjeta de solicitud con estado "Pendiente".

**Expected Results:**
 - El sistema superpone en la pantalla el modal "Detalle de la Solicitud".
 - El modal despliega el resumen del tutor, el bloque informativo de la tutoría, y el recuadro "TU MENSAJE" con el texto original enviado.
 - En la parte inferior del modal, se muestra únicamente el botón "Cerrar".
 - El botón "Cancelar Solicitud" no se visualiza o se encuentra inactivo para esta versión.

---

## ID: CP-HU-33-R10
**Título:** Verificar visualización de controles de paginación con más de 5 solicitudes
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante se encuentra autenticado y navega a la pantalla principal de "Mis Solicitudes". En la pestaña "Todas" (o cualquier otra pestaña) existen más de 5 registros asociados (ej: "Todas (16)").

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Mis Solicitudes'.
 3. Asegurarse de que la pestaña "Todas" (o la pestaña activa) muestre un contador de solicitudes mayor a 5.
 4. Observar la parte inferior de la lista de tarjetas después de la carga inicial.

**Expected Results:**
 - La aplicación carga y renderiza la lista inicial de las primeras 5 tarjetas.
 - Justo debajo de la última tarjeta visible, se visualiza una barra de paginación numérica (ej. `< 1 2 3 4 >`).
 - El control de paginación está compuesto por flechas de navegación y números de página.
 - El número de la página activa se muestra resaltado dentro de un recuadro oscuro.