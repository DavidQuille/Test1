# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27
url: https://politutorias-frontend.vercel.app/encuentra-tutoria

## ID: CP-HU-27-R1
**Título:** Filtrar ofertas por precio con rango con coincidencias
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, incluyendo algunas en el rango de $5.00 a $20.00.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$5.00' a '$20.00' y liberar el control para aplicar el filtro.

**Expected Results:**
 - El listado de ofertas se actualiza.
 - **VALIDACIÓN VISUAL:** El listado se actualiza mostrando SOLAMENTE las ofertas que están dentro del rango de precio seleccionado ($5-$20) como: "Introducción a la Lógica de Programación" ($5/h), "Nivelación de Matemáticas Básicas" ($7/h), "Cálculo de una Variable" ($10/h), "Probabilidad y Estadística" ($15/h), "Termodinámica" ($18.5/h), "Base de Datos" ($19/h), "Diseño Orientado a Objetos" ($20/h).
 - **VALIDACIÓN CRÍTICA:** NO aparecen ofertas fuera del rango como "Fundamentos de Algoritmos" ($21/h), "Estructuras de Datos" ($22/h), "Desarrollo Web" ($25/h), "Inteligencia Artificial" ($30/h).
 - El slider refleja los valores de '$5.00' a '$20.00'.
 - Se muestra el filtro activo como chip/badge "$5 - $20" con opción de eliminar (x).

---

## ID: CP-HU-27-R2
**Título:** Filtrar ofertas por precio con rango sin coincidencias
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, pero ninguna de ellas se encuentra dentro del rango de $1 a $4.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$1' a '$4' y liberar el control para aplicar el filtro.

**Expected Results:**
 - La lista de ofertas se vacía completamente.
 - **VALIDACIÓN VISUAL:** NO se muestran ofertas en el listado (0 resultados).
 - Se muestra el mensaje exacto: 'No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda.'.
 - El slider mantiene los valores de '$1' a '$4' seleccionados.
 - Se muestra el filtro activo como chip/badge "$1 - $4" con opción de eliminar (x).

---

## ID: CP-HU-27-ADD1
**Título:** Filtrar ofertas por precio en rango alto con coincidencias
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, incluyendo algunas en el rango de $18.00 a $20.00.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$18.00' a '$20.00' y liberar el control para aplicar el filtro.

**Expected Results:**
 - El listado de ofertas se actualiza.
 - **VALIDACIÓN VISUAL:** SOLAMENTE se muestran las ofertas de precio alto en el rango disponible: ofertas entre $18/h y $20/h.
 - **VALIDACIÓN CRÍTICA:** NO aparecen ofertas de menor precio como "Cálculo de una Variable" ($10/h), "Probabilidad y Estadística" ($15/h), "Introducción a la Lógica" ($5/h), etc.
 - El slider refleja los valores de '$18.00' a '$20.00'.
 - Se muestra el filtro activo como chip/badge "$18 - $20" con opción de eliminar (x).

---

## ID: CP-HU-27-ADD2
**Título:** Filtrar ofertas por precio en rango medio con coincidencias
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, incluyendo algunas entre $10.00 y $15.00.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$10.00' a '$15.00' y liberar el control para aplicar el filtro.

**Expected Results:**
 - El listado de ofertas se actualiza correctamente.
 - **VALIDACIÓN VISUAL:** SOLAMENTE se muestran ofertas en el rango: "Cálculo de una Variable" ($10/h), "Física Mecánica" ($10/h), "Cálculo Diferencial e Integral" ($12.5/h), "Cálculo Vectorial y Multivariable" ($13/h), "Probabilidad y Estadística para Ingeniería" ($15/h), "Estadística y Probabilidad Aplicada" ($15/h).
 - **VALIDACIÓN CRÍTICA:** NO aparecen ofertas fuera del rango como "Nivelación de Matemáticas" ($7/h), "Microeconomía" ($16/h), "Circuitos Eléctricos" ($17.5/h), etc.
 - El slider refleja los valores de '$10.00' a '$15.00'.

---

## ID: CP-HU-27-ADD3
**Título:** Filtrar ofertas por precio mínimo exacto
**Prioridad:** Alta
**Tipo:** Límite/Boundary
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, incluyendo ofertas al precio mínimo de $5.00.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$5.00' a '$5.00' (valor único) y liberar el control para aplicar el filtro.

**Expected Results:**
 - El listado se filtra correctamente.
 - **VALIDACIÓN VISUAL:** SOLAMENTE se muestra la oferta "Introducción a la Lógica de Programación" ($5/h).
 - **VALIDACIÓN CRÍTICA:** NO aparece ninguna otra oferta, incluyendo "Nivelación de Matemáticas" ($7/h), "Macroeconomía" ($9/h), etc.
 - El slider refleja el valor '$5.00' en ambos extremos.
 - Se muestra el filtro activo como chip/badge "$5 - $5" con opción de eliminar (x).

---

## ID: CP-HU-27-ADD4
**Título:** Filtrar ofertas por precio máximo disponible
**Prioridad:** Alta 
**Tipo:** Límite/Boundary
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, incluyendo ofertas al precio máximo de $20.00.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$20.00' a '$20.00' (valor único) y liberar el control para aplicar el filtro.

**Expected Results:**
 - El listado se filtra correctamente.
 - **VALIDACIÓN VISUAL:** SOLAMENTE se muestran las ofertas con precio de $20/h.
 - **VALIDACIÓN CRÍTICA:** NO aparecen ofertas de menor precio como "Probabilidad y Estadística" ($15/h), "Cálculo de una Variable" ($10/h), "Introducción a la Lógica" ($5/h), etc.
 - El slider refleja el valor '$20.00' en ambos extremos.
 - Se muestra el filtro activo como chip/badge "$20 - $20" con opción de eliminar (x).

---

## ID: CP-HU-27-ADD5
**Título:** Filtrar ofertas con rango completo (todo el espectro disponible)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Verificar que el slider está en el rango completo de '$5.00' a '$20.00' por defecto.

**Expected Results:**
 - Se muestran todas las ofertas disponibles en el rango de precios del sistema.
 - **VALIDACIÓN VISUAL:** Todas las ofertas desde "Introducción a la Lógica de Programación" ($5/h) hasta las ofertas de $20/h están visibles.
 - El slider refleja los valores de '$5.00' a '$20.00'.
 - Se mantiene la paginación con todas las páginas accesibles.

---

## ID: CP-HU-27-ADD6
**Título:** Filtrar ofertas con rango muy estrecho sin coincidencias
**Prioridad:** Media
**Tipo:** Edge Case
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles, pero ninguna entre $11 y $12.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$11.00' a '$12.00' y liberar el control para aplicar el filtro.

**Expected Results:**
 - La lista de ofertas se vacía completamente.
 - **VALIDACIÓN VISUAL:** NO se muestran ofertas en el listado (0 resultados).
 - Se muestra el mensaje: 'No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda.'.
 - El slider mantiene los valores de '$11.00' a '$12.00' seleccionados.

---

## ID: CP-HU-27-ADD7
**Título:** Filtrar ofertas en rango medio-alto
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas disponibles entre $16 y $19.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$16.00' a '$19.00' y liberar el control para aplicar el filtro.

**Expected Results:**
 - El listado se actualiza correctamente.
 - **VALIDACIÓN VISUAL:** SOLAMENTE se muestran ofertas en el rango $16-$19.
 - **VALIDACIÓN CRÍTICA:** NO aparecen ofertas como "Probabilidad y Estadística" ($15/h), "Diseño Orientado a Objetos" ($20/h), etc.
 - El slider refleja los valores de '$16.00' a '$19.00'.
 - Se incluyen correctamente las ofertas en este rango de precio.

---

## ID: CP-HU-27-ADD8
**Título:** Filtrar ofertas cambiando de un rango con resultados a uno sin resultados
**Prioridad:** Media
**Tipo:** Flujo de Trabajo
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas filtradas previamente.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$5.00' a '$15.00' (con ofertas).
 5. Verificar que se muestran ofertas.
 6. Cambiar el slider de "Precio" para seleccionar el rango de '$1.00' a '$4.00' (sin ofertas - fuera del rango disponible).

**Expected Results:**
 - Inicialmente se muestran ofertas en el rango $5-$15.
 - Al cambiar al rango $1-$4 (fuera del rango del sistema), la lista se vacía completamente.
 - **VALIDACIÓN VISUAL:** La transición entre mostrar ofertas y lista vacía es fluida.
 - Se muestra el mensaje: 'No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda.'.
 - El slider refleja correctamente los nuevos valores '$1.00' a '$4.00'.

---

## ID: CP-HU-27-ADD9
**Título:** Filtrar ofertas por rango que incluye ofertas de múltiples páginas
**Prioridad:** Media
**Tipo:** Paginación
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría" con ofertas distribuidas en múltiples páginas.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$8.00' a '$18.00' y liberar el control para aplicar el filtro.
 5. Verificar las ofertas en la página 1.
 6. Navegar a las páginas siguientes si están disponibles.

**Expected Results:**
 - Se muestran ofertas en el rango especificado desde múltiples páginas originales.
 - **VALIDACIÓN VISUAL:** SOLAMENTE las ofertas en el rango $8-$18.
 - **VALIDACIÓN CRÍTICA:** NO aparecen ofertas como "Introducción a la Lógica" ($5/h), ofertas de $20/h, etc.
 - La paginación se ajusta al número de resultados filtrados.

---

## ID: CP-HU-27-ADD10
**Título:** Resetear filtro de precio después de aplicar un filtro específico
**Prioridad:** Alta
**Tipo:** Funcional/Reset
**Pre-condiciones:** El estudiante está logueado, se encuentra en la interfaz "Encuentra tu Tutoría" y ha aplicado previamente un filtro de precio específico.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$7.00' a '$12.00'.
 5. Verificar que se muestran solo ofertas filtradas.
 6. Ajustar el slider de "Precio" para volver al rango completo '$5.00' a '$20.00'.

**Expected Results:**
 - Inicialmente se muestran solo ofertas en el rango $7-$12.
 - Al resetear el filtro, se muestran todas las ofertas disponibles en el rango completo del sistema.
 - **VALIDACIÓN VISUAL:** La transición de lista filtrada a lista completa es correcta.
 - El slider refleja los valores completos de '$5.00' a '$20.00'.

---

## ID: CP-HU-27-ADD11
**Título:** Limpiar filtro de precio usando el botón "X" del filtro activo
**Prioridad:** Alta
**Tipo:** Funcional/Limpieza
**Pre-condiciones:** El estudiante está logueado, se encuentra en la interfaz "Encuentra tu Tutoría" y tiene un filtro de precio activo aplicado.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Ajustar el slider de "Precio" para seleccionar el rango de '$10.00' a '$20.00'.
 5. Verificar que aparece el filtro activo como chip/badge "$10 - $20" con una "X".
 6. Hacer clic en el botón "X" del filtro activo de precio.

**Expected Results:**
 - El filtro de precio se elimina completamente.
 - **VALIDACIÓN VISUAL:** El chip/badge del filtro "$10 - $20" desaparece de la interfaz.
 - El listado vuelve a mostrar todas las ofertas disponibles (22 resultados).
 - El slider vuelve a su estado original mostrando el rango completo '$5.00' a '$30.00'.
 - **VALIDACIÓN CRÍTICA:** Se muestran tanto ofertas que estaban fuera del filtro como "Nivelación de Matemáticas" ($7/h), "Estructuras de Datos" ($22/h), "Desarrollo Web" ($25/h), "Inteligencia Artificial" ($30/h), como las que estaban dentro del filtro.

---

## ID: CP-HU-27-ADD12
**Título:** Limpiar todos los filtros usando el botón "Limpiar todos"
**Prioridad:** Alta
**Tipo:** Funcional/Limpieza Global
**Pre-condiciones:** El estudiante está logueado, se encuentra en la interfaz "Encuentra tu Tutoría" y tiene múltiples filtros aplicados incluyendo el filtro de precio.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Aplicar un filtro de precio seleccionando el rango de '$10.00' a '$18.00'.
 4. Aplicar filtros adicionales (modalidad, disponibilidad, área de conocimiento).
 5. Verificar que se muestran múltiples filtros activos incluyendo el de precio.
 6. Hacer clic en el botón "Limpiar todos".

**Expected Results:**
 - Todos los filtros se eliminan completamente, incluyendo el de precio.
 - **VALIDACIÓN VISUAL:** Todos los chips/badges de filtros activos desaparecen de la interfaz.
 - El listado vuelve a mostrar todas las ofertas disponibles sin restricción.
 - El slider de precio vuelve a su rango completo '$5.00' a '$20.00'.
 - Todos los demás filtros (modalidad, disponibilidad, área) vuelven a su estado inicial.
 - **VALIDACIÓN CRÍTICA:** Se muestran ofertas de todos los precios disponibles en el sistema: desde "Introducción a la Lógica de Programación" ($5/h) hasta las ofertas de $20/h.

---

## ID: CP-HU-27-ADD13
**Título:** Verificar persistencia del filtro de precio al navegar entre páginas
**Prioridad:** Media
**Tipo:** Navegación/Persistencia
**Pre-condiciones:** El estudiante está logueado, se encuentra en la interfaz "Encuentra tu Tutoría" con un filtro de precio aplicado que genera múltiples páginas de resultados.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Aplicar un filtro de precio de '$8.00' a '$15.00'.
 4. Verificar que está en la página 1 con ofertas filtradas.
 5. Navegar a la página 2 usando la paginación si está disponible.
 6. Navegar a la página 3 si está disponible.
 7. Regresar a la página 1.

**Expected Results:**
 - El filtro de precio se mantiene activo al navegar entre páginas.
 - **VALIDACIÓN VISUAL:** El chip/badge del filtro "$8 - $15" permanece visible en todas las páginas.
 - El slider mantiene los valores '$8.00' a '$15.00' en todas las páginas.
 - **VALIDACIÓN CRÍTICA:** En todas las páginas SOLAMENTE aparecen ofertas dentro del rango de precio especificado ($8-$15).
 - La URL puede incluir parámetros que reflejan el filtro aplicado.
 - El número total de resultados se mantiene consistente entre las páginas.

---

## ID: CP-HU-27-ADD14  
**Título:** Validar límites del slider de precio en valores extremos
**Prioridad:** Alta
**Tipo:** Límites/Boundary
**Pre-condiciones:** El estudiante está logueado y se encuentra en la interfaz "Encuentra tu Tutoría".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la interfaz "Encuentra tu Tutoría".
 3. Localizar el slider de "Precio".
 4. Intentar mover el slider mínimo por debajo de $5.00.
 5. Intentar mover el slider máximo por encima de $20.00.
 6. Verificar los valores límite aceptados por el sistema.

**Expected Results:**
 - El slider no permite valores menores a $5.00 en el extremo inferior.
 - El slider no permite valores mayores a $20.00 en el extremo superior.
 - **VALIDACIÓN VISUAL:** Los valores mostrados se mantienen dentro de los límites: $5.00 - $20.00.
 - Si se intenta forzar valores fuera del rango, el sistema los corrige automáticamente a los límites válidos.
 - **VALIDACIÓN CRÍTICA:** El filtro funciona correctamente incluso cuando se intentan aplicar valores extremos.

---