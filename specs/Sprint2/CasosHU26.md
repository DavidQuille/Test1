# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27
url: https://politutorias-frontend.vercel.app/encuentra-tutoria

## ID: CP-HU-26-R1
**Título:** Filtrar ofertas por modalidad 'Todas'
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles de distintas modalidades.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Hacer clic en el botón filtro 'Todas' en la sección 'Modalidad'.

**Expected Results:**
 - El listado de ofertas se actualiza.
 - Se muestran todas las ofertas sin restricción de modalidad.
 - El botón 'Todas' aparece visualmente resaltado.

## ID: CP-HU-26-R2
**Título:** Filtrar ofertas por modalidad 'Presencial'
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles de distintas modalidades.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Hacer clic en el botón filtro 'Presencial' en la sección 'Modalidad'.

**Expected Results:**
 - El listado de ofertas se actualiza.
 - Se muestran las ofertas que tienen las modalidades 'Presencial' y 'Ambos'.
 - Se excluyen las ofertas únicamente 'Virtual'.

## ID: CP-HU-26-R3
**Título:** Filtrar ofertas por modalidad 'Virtual'
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles de distintas modalidades.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Hacer clic en el botón filtro 'Virtual' en la sección 'Modalidad'.

**Expected Results:**
 - El listado de ofertas se actualiza.
 - Se muestran las ofertas que tienen las modalidades 'Virtual' y 'Ambos'.
 - Se excluyen las ofertas únicamente 'Presencial'.

## ID: CP-HU-26-R4
**Título:** Filtrar ofertas por modalidad 'Ambos'
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles con modalidad 'Ambos'.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría'.
 3. Hacer clic en el botón filtro 'Ambos' en la sección 'Modalidad'.

**Expected Results:**
 - El listado de ofertas se actualiza.
 - Se muestran únicamente las ofertas que tienen la modalidad 'Ambos'.

## ID: CP-HU-26-ADD1
**Título:** Limpiar filtro de modalidad utilizando la X
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con un filtro de modalidad aplicado.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Hacer clic en un botón filtro de modalidad (ej: 'Presencial') en la sección 'Modalidad'.
 4. Verificar que aparece la "X" junto al filtro aplicado.
 5. Hacer clic en la "X" para limpiar el filtro.

**Expected Results:**
 - El filtro se limpia correctamente.
 - El botón de modalidad deja de estar resaltado.
 - Se muestran todas las ofertas nuevamente sin restricción de modalidad.
 - La sección con el filtro aplicado desaparece.

## ID: CP-HU-26-ADD2
**Título:** Limpiar todos los filtros utilizando el botón 'Limpiar todos'
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con un filtro de modalidad aplicado.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Hacer clic en un botón filtro de modalidad (ej: 'Virtual') en la sección 'Modalidad'.
 4. Verificar que aparece el botón 'Limpiar todos'.
 5. Hacer clic en el botón 'Limpiar todos'.

**Expected Results:**
 - Todos los filtros se limpian correctamente.
 - Todos los botones de filtro dejan de estar resaltados.
 - Se muestran todas las ofertas nuevamente sin restricción de modalidad.
 - La sección con filtros aplicados desaparece completamente.

## ID: CP-HU-26-ADD3
**Título:** Cambiar de un filtro a otro sin limpiar primero
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles de distintas modalidades.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Hacer clic en el botón filtro 'Presencial' en la sección 'Modalidad'.
 4. Sin limpiar el filtro anterior, hacer clic en el botón filtro 'Virtual'.

**Expected Results:**
 - El filtro cambia automáticamente de 'Presencial' a 'Virtual'.
 - El botón 'Presencial' deja de estar resaltado.
 - El botón 'Virtual' aparece visualmente resaltado.
 - El listado de ofertas se actualiza mostrando solo las ofertas con modalidad 'Virtual' y 'Ambos'.
 - Se excluyen las ofertas únicamente 'Presencial'.