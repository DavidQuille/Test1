
url: http://localhost:3001/encuentra-tutoria

## ID: CP-HU-22-R1-01
**Título:** Verificar carga de reseñas adicionales (no todas) al hacer clic en 'Ver más reseñas'.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado, en la sección 'Reseñas de Estudiantes' de la pantalla detalle de oferta del tutor que tiene un total de 8 reseñas, de las cuales 3 son visibles inicialmente y el botón 'Ver más reseñas' está presente.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla detalle de oferta del tutor para un tutor que tenga 8 reseñas en total.
 3. Desplazarse a la sección 'Reseñas de Estudiantes'.
 4. Verificar que se visualiza el texto "Mostrando 3 de 8 reseñas" en la parte inferior de la lista de reseñas.
 5. Hacer clic en el botón 'Ver más reseñas'.

**Expected Results:**
 - La pantalla detalle de oferta del tutor permanece visible.
 - La sección 'Reseñas de Estudiantes' se mantiene visible.
 - La lista de reseñas individuales se expande, mostrando comentarios adicionales hacia abajo (ej. se cargan 3 reseñas más, totalizando 6 reseñas visibles).
 - El texto contador se actualiza dinámicamente, por ejemplo, a "Mostrando 6 de 8 reseñas".
 - Cada nueva reseña mostrada incluye: Iniciales/Avatar del estudiante, Fecha de la reseña, Calificación otorgada en estrellas, título de la oferta de la tutoría a la cual asistió el estudiante, y el Comentario o retroalimentación escrita.
 - El botón 'Ver más reseñas' permanece visible en la parte inferior de la lista, ya que aún quedan reseñas por cargar (ej. 2 reseñas pendientes).

## ID: CP-HU-22-R1-02
**Título:** Verificar carga de todas las reseñas restantes y desaparición del botón 'Ver más reseñas'.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado, en la sección 'Reseñas de Estudiantes' de la pantalla detalle de oferta del tutor que tiene un total de 8 reseñas, de las cuales 6 son visibles y el botón 'Ver más reseñas' está presente.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla detalle de oferta del tutor para un tutor que tenga 8 reseñas en total.
 3. Asegurarse de que la sección 'Reseñas de Estudiantes' muestre 6 de 8 reseñas (puede ser un estado posterior a una carga previa o preconfigurado).
 4. Verificar que se visualiza el texto "Mostrando 6 de 8 reseñas" y que el botón 'Ver más reseñas' es visible.
 5. Hacer clic en el botón 'Ver más reseñas'.

**Expected Results:**
 - La pantalla detalle de oferta del tutor permanece visible.
 - La sección 'Reseñas de Estudiantes' se mantiene visible.
 - La lista de reseñas individuales se expande, mostrando los comentarios adicionales restantes (ej. las últimas 2 reseñas, totalizando 8 reseñas visibles).
 - El texto contador se actualiza dinámicamente a "Mostrando 8 de 8 reseñas".
 - Las nuevas reseñas mostradas incluyen: Iniciales/Avatar del estudiante, Fecha de la reseña, Calificación otorgada en estrellas, título de la oferta de la tutoría a la cual asistió el estudiante, y el Comentario o retroalimentación escrita.
 - El botón 'Ver más reseñas' desaparece de la parte inferior de la lista, ya que todas las reseñas han sido cargadas.

## ID: CP-HU-22-R2-01
**Título:** Verificar la vista inicial de la sección 'Reseñas de Estudiantes' sin interacción adicional.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado, en la pantalla detalle de oferta del tutor con al menos 3 reseñas disponibles (ej. 8 reseñas en total).

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla detalle de oferta del tutor de un tutor que tenga reseñas disponibles (ej. 8 reseñas en total).
 3. Desplazarse a la sección 'Reseñas de Estudiantes'.
 4. (No realizar ninguna acción adicional en la sección de reseñas).

**Expected Results:**
 - La pantalla detalle de oferta del tutor permanece visible.
 - Se visualiza el encabezado 'Reseñas de Estudiantes'.
 - Se visualiza el resumen de calificaciones, incluyendo la calificación promedio '4.6' con su representación en estrellas (5 estrellas llenas y 1 media estrella), y el texto '8 reseñas'.
 - Se visualizan las barras de desglose de estrellas: '5 estrellas 63%', '4 estrellas 38%', '3 estrellas 0%', '2 estrellas 0%', '1 estrella 0%'.
 - Se visualizan las tres tarjetas de métricas del tutor: '9 Tutorías completadas', '4 Materias impartidas', y '89% Estudiantes que califican'.
 - Se visualiza el texto 'Mostrando 3 de 8 reseñas'.
 - Se visualizan las 3 reseñas individuales mostradas por defecto, que son:
     - `SO` Sofía Mendoza, con 5 estrellas, "Tutoría: Álgebra Lineal", "Juan es el mejor tutor que he tenido. Explica de forma muy clara y directa.", con fecha '28 feb 2026'.
     - `AN` Andrés Morales, con 5 estrellas, "Tutoría: Estática", "Juan explica los problemas paso a paso. Muy recomendado para Estática.", con fecha '25 feb 2026'.
     - `VA` Valeria Sánchez, con 3.5 estrellas, "Tutoría: Física I", "Muy buena clase, aunque empezamos un poco tarde. Los ejercicios fueron muy útiles.", con fecha '18 feb 2026'.
 - El botón 'Ver más reseñas' es visible en la parte inferior de la lista de reseñas.