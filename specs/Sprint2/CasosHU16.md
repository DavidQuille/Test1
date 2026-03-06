# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27
url: https://politutorias-frontend.vercel.app/encuentra-tutoria

## ID: CP-HU-16-R1
**Título:** Visualización inicial de ofertas sin filtro de día aplicado
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría".

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Asegurarse de que ningún día de la semana se encuentre seleccionado en la sección "Disponibilidad".

**Expected Results:**
 - El sistema carga la interfaz "Encuentra tu Tutoría".
 - Se muestran todas las ofertas de la base de datos sin restricciones de día, tal como se define en el criterio "Visualización Inicial sin Filtro".

---

## ID: CP-HU-16-R2
**Título:** Filtrar ofertas exitosamente por un día de la semana con coincidencias
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Existen ofertas de tutoría disponibles para el día 'Mar'.

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Mar' en la sección "Disponibilidad".

**Expected Results:**
 - El botón 'Mar' aparece resaltado.
 - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Mar', tal como se define en el criterio "Filtrado Exitoso por Día".

---

## ID: CP-HU-16-R3
**Título:** Filtrar ofertas por un día sin coincidencias y mostrar mensaje
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". NO existen ofertas de tutoría disponibles para el día 'Dom'.

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Dom' en la sección "Disponibilidad".

**Expected Results:**
 - La lista de ofertas se vacía.
 - Se muestra el mensaje "No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda", tal como se define en el criterio "Sin Ofertas para el Día Seleccionado".
---

## ID: CP-HU-16-ADD1
**Título:** Limpiar filtro de disponibilidad usando botón X
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Un filtro de día ha sido seleccionado previamente (ejemplo: Mar).

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Mar' en la sección "Disponibilidad".
 4. Hacer clic en el botón X (icono de remover) junto al filtro activo de 'Mar'.

**Expected Results:**
 - El filtro de 'Mar' se desactiva.
 - El botón X desaparece de la interfaz.
 - La lista de ofertas vuelve a mostrar todas las ofertas disponibles (37 resultados), tal como se define en el criterio "Limpieza de Filtro".

---

## ID: CP-HU-16-ADD2
**Título:** Cambiar filtro de disponibilidad sin deseleccionar el anterior
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Un filtro de día ha sido seleccionado previamente (ejemplo: Mar).

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Mar' en la sección "Disponibilidad".
 4. Hacer clic en el botón 'Jue' sin deseleccionar primero el filtro de 'Mar'.

**Expected Results:**
 - El filtro anterior de 'Mar' se reemplaza con el filtro de 'Jue'.
 - El botón 'Jue' aparece resaltado.
 - La lista de ofertas se actualiza mostrando únicamente las que tienen disponibilidad el día 'Jue' (6 resultados), tal como se define en el criterio "Cambio de Filtro".

---

## ID: CP-HU-16-ADD3
**Título:** Deseleccionar un filtro haciendo clic nuevamente en el mismo día
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Un filtro de día ha sido seleccionado (ejemplo: Sáb).

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Sáb' en la sección "Disponibilidad".
 4. Hacer clic nuevamente en el botón 'Sáb' para deseleccionarlo.

**Expected Results:**
 - El filtro de 'Sáb' se desactiva.
 - El botón 'Sáb' deja de estar resaltado.
 - La lista de ofertas vuelve a mostrar todas las ofertas disponibles (37 resultados), tal como se define en el criterio "Deselección de Filtro".

---

## ID: CP-HU-16-ADD4
**Título:** Filtrar ofertas exitosamente por un día con coincidencias (Lun)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Existen ofertas de tutoría disponibles para el día 'Lun'.

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Lun' en la sección "Disponibilidad".

**Expected Results:**
 - El botón 'Lun' aparece resaltado.
 - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Lun' (12 resultados), tal como se define en el criterio "Filtrado Exitoso por Día".

---

## ID: CP-HU-16-ADD5
**Título:** Filtrar ofertas por un día sin coincidencias (Dom)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". NO existen ofertas de tutoría disponibles para el día 'Dom'.

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Dom' en la sección "Disponibilidad".

**Expected Results:**
 - La lista de ofertas se vacía.
 - Se muestra el mensaje "No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda", tal como se define en el criterio "Sin Ofertas para el Día Seleccionado".

---

## ID: CP-HU-16-ADD6
**Título:** Filtrar ofertas exitosamente por un día con coincidencias (Mié)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Existen ofertas de tutoría disponibles para el día 'Mié'.

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Mié' en la sección "Disponibilidad".

**Expected Results:**
 - El botón 'Mié' aparece resaltado.
 - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Mié' (12 resultados), tal como se define en el criterio "Filtrado Exitoso por Día".

---

## ID: CP-HU-16-ADD7
**Título:** Filtrar ofertas exitosamente por un día con coincidencias (Vie)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Estudiante logueado y en la interfaz "Encuentra tu Tutoría". Existen ofertas de tutoría disponibles para el día 'Vie'.

**Steps:**
 1. Iniciar sesión en el sistema como Estudiante.
 2. Navegar a la interfaz de "Encuentra tu Tutoría".
 3. Hacer clic en el botón 'Vie' en la sección "Disponibilidad".

**Expected Results:**
 - El botón 'Vie' aparece resaltado.
 - La lista de ofertas se filtra mostrando únicamente las que tienen disponibilidad el día 'Vie', tal como se define en el criterio "Filtrado Exitoso por Día".

