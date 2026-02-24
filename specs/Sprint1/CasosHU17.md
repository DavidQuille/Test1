# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-12

url: http://localhost:3001/encuentra-tutoria


## ID: CP-HU-17-R1
**Título:** Búsqueda exitosa de tutorías por materia o tutor
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante debe estar logueado y en la interfaz "Encuentra tu Tutoría" con ofertas disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Ingresar el término 'Cálculo' en el campo de texto 'Buscar por materia, tutor...'.
 4. Hacer clic en el botón con el icono de lupa (o presionar Enter).

**Expected Results:**
 - El contador superior derecho se actualiza a "X resultados" (siendo X la cantidad de coincidencias).
 - El grid de resultados se actualiza, mostrando exclusivamente las tarjetas que contienen el término 'Cálculo' en el Título de la materia o en el Nombre del Tutor.
 - Las tarjetas resultantes mantienen la estructura completa: Título, Precio, Modalidad, Descripción, Etiquetas, Horario, Tutor y Rating.

---

## ID: CP-HU-17-R2
**Título:** Búsqueda de tutorías sin coincidencias
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante debe estar logueado y en la interfaz "Encuentra tu Tutoría" con ofertas disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Ingresar el término 'Astronomía' en el campo de texto 'Buscar por materia, tutor...'.
 4. Hacer clic en el botón con el icono de lupa (o presionar Enter).

**Expected Results:**
 - El contador superior derecho indica "0 resultados".
 - El grid de tarjetas se oculta.
 - En el área central se visualiza un círculo de fondo gris claro conteniendo el ícono de una lupa (azul/gris).
 - Se visualiza el mensaje principal en negrita: "**No se encontraron ofertas**".
 - Se visualiza el subtexto explicativo: "**Intenta ajustar tus filtros de búsqueda**".
 - No se visualizan tarjetas de oferta ni botones adicionales de acción (como "Limpiar filtros").

---

## ID: CP-HU-17-R3
**Título:** Búsqueda con campo de texto vacío
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante debe estar logueado y en la interfaz "Encuentra tu Tutoría" con ofertas disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Asegurarse de que el campo de texto 'Buscar por materia, tutor...' esté vacío.
 4.  Presionar Enter

**Expected Results:**
 - La lista muestra todas las ofertas disponibles.
 - El contador superior derecho indica "13 resultados".
 - Las tarjetas se visualizan ordenadas según el criterio por defecto.