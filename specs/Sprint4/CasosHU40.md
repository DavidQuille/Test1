
# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-26

url: http://localhost:3001/historial

## ID: CP-HU-40-R1
**Título:** Visualización inicial de la pantalla "Historial de Tutorías"
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado en el sistema.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Hacer clic en la opción "Historial" del menú superior de navegación.

**Expected Results:**
 - El sistema redirige a la pantalla "Historial de Tutorías".
 - Se visualiza el logo "Poli Tutorías" en la esquina superior izquierda.
 - La barra de navegación superior muestra las opciones "Explorar", "Mis Solicitudes", "Agenda", "Historial" (resaltada), "Patricio" con icono de perfil y "Salir".
 - El título principal de la pantalla es "Historial de Tutorías" con el subtítulo "Tutorías que has recibido y calificado".
 - Se muestra un listado de tarjetas de tutorías, listando únicamente las tarjetas en estado "Completada" (etiqueta verde) e "Inasistencia" (con recuadro rojo: "El tutor reportó inasistencia para esta sesión.").
 - Los controles de paginación "<", "1", "2", "3", "4", "5", ">" se muestran en la parte inferior.

## ID: CP-HU-40-R2
**Título:** Ver detalles de una tutoría con estado "Completada"
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla "Historial de Tutorías", con tarjetas de tutorías "Completadas" visibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías".
 3. Hacer clic en el área general de una tarjeta de tutoría con estado "Completada".

**Expected Results:**
 - Se muestra un modal superpuesto a la pantalla "Historial de Tutorías".
 - Se visualiza un modal con los detalles de la tutoría, incluyendo campos como título de la oferta de la tutoría, "Tutor:", "Fecha:", "Hora:", "Duración:".
 - El "Estado:" se muestra como "Completada".
 - En la parte inferior del modal se visualiza únicamente el botón "Cerrar".
 - No se visualiza el botón "Calificar" ni estrellas de calificación (si el modal es en modo lectura y ya se calificó).

## ID: CP-HU-40-R3
**Título:** Cerrar el modal de detalle de tutoría
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y visualizando el modal "Detalle de la Tutoría" desde la pantalla "Historial de Tutorías".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías".
 3. Hacer clic en una tarjeta de tutoría (Completada o Inasistencia) para abrir el modal de detalle.
 4. Hacer clic en el botón "Cerrar" dentro del modal "Detalle de la Tutoría".

**Expected Results:**
 - La ventana modal desaparece.
 - La pantalla "Historial de Tutorías" vuelve a ser completamente visible, mostrando el listado de tarjetas de tutorías y los controles de paginación, sin ningún modal superpuesto.

## ID: CP-HU-40-R4
**Título:** Ver detalles de una tutoría con estado "Inasistencia"
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla "Historial de Tutorías", con tarjetas de tutorías con estado "Inasistencia" visibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías".
 3. Hacer clic en una tarjeta de tutoría que muestre el recuadro rojo con el texto "El tutor reportó inasistencia para esta sesión".

**Expected Results:**
 - Se muestra un modal superpuesto a la pantalla "Historial de Tutorías".
 - Se visualiza un modal con los detalles de la tutoría, incluyendo campos como título de la oferta de la tutoría, "Tutor:", "Fecha:", "Hora:", "Duración:".
 - El "Estado:" se muestra como "Inasistencia".
 - En la parte inferior del modal se visualiza únicamente el botón "Cerrar".

## ID: CP-HU-40-R5
**Título:** Navegar a una página específica del historial de tutorías
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla "Historial de Tutorías", con múltiples páginas de resultados disponibles en la paginación.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías".
 3. Hacer clic en el número de página '2' (o cualquier número de página disponible diferente de la actual) de los controles de paginación.

**Expected Results:**
 - El listado de tarjetas de tutorías se actualiza para mostrar los registros correspondientes a la página seleccionada (página 2).
 - El número de página '2' se resalta con un fondo oscuro, indicando que es la página activa.
 - Permanece en la pantalla "Historial de Tutorías".

## ID: CP-HU-40-R6
**Título:** Navegar a la siguiente página del historial de tutorías
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla "Historial de Tutorías", con una página siguiente disponible en la paginación (no en la última página).

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías" y asegurarse de estar en la primera página (o una página intermedia).
 3. Hacer clic en el control de paginación '>'.

**Expected Results:**
 - El listado de tarjetas de tutorías se actualiza para mostrar los registros de la siguiente página.
 - El número de la página activa (ej. '2') se resalta con un fondo oscuro.
 - Permanece en la pantalla "Historial de Tutorías".

## ID: CP-HU-40-R7
**Título:** Navegar a la página anterior del historial de tutorías
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla "Historial de Tutorías", con una página anterior disponible en la paginación (no en la primera página).

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías" y asegurarse de estar en la segunda página (o una página posterior a la primera).
 3. Hacer clic en el control de paginación '<'.

**Expected Results:**
 - El listado de tarjetas de tutorías se actualiza para mostrar los registros de la página anterior.
 - El número de la página activa (ej. '1') se resalta con un fondo oscuro.
 - Permanece en la pantalla "Historial de Tutorías".

## ID: CP-HU-40-EXTRA-01
**Título:** Verificación de ausencia de elementos "Ordenar" y "Estado" en la pantalla de historial
**Prioridad:** Baja
**Tipo:** Funcional / UI
**Pre-condiciones:** Estudiante logueado y en la pantalla "Historial de Tutorías".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla "Historial de Tutorías".
 3. Observar los elementos presentes en la interfaz de la pantalla.

**Expected Results:**
 - No se visualiza ningún control o label con el texto "Ordenar:".
 - No se visualiza ningún control o label con el texto "Estado:".
