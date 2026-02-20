# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-12

url: http://localhost:3001/encuentra-tutoria


## ID: CP-HU-03-R1
**Título:** Verificación de la visualización inicial de ofertas en la Página 1
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado en el sistema y existen al menos 13 ofertas de tutorías publicadas para ser visualizadas.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Encuentra tu Tutoría' (Home Estudiante).

**Expected Results:**
 - Se visualiza la pantalla 'Encuentra tu Tutoría'.
 - Se visualiza '13 resultados' en la cabecera.
 - Se muestran 10 tarjetas de oferta.
 - La primera tarjeta de oferta muestra el título 'Desarrollo Web con React y Node.js, el precio '$25/h', la modalidad 'Virtual' con su icono, las etiquetas 'Programación' y 'Desarrollo Web', el tutor 'María Fernanda González' con su foto.
 - Los controles de paginación muestran '< 1 2 >' al pie de página.
 - El botón '1' de paginación se muestra activo (con fondo sólido).
 - El botón '2' de paginación se muestra inactivo (con fondo blanco/borde).

---

## ID: CP-HU-03-R2
**Título:** Verificación de la navegación a la Página 2 de ofertas mediante paginación
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El estudiante está logueado, en la pantalla 'Encuentra tu Tutoría', visualizando las ofertas de la Página 1, y existen al menos 13 ofertas de tutorías publicadas.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla 'Encuentra tu Tutoría' (Home Estudiante), visualizando la Página 1 de ofertas.
 3. Hacer clic en el botón de paginación número '2'.

**Expected Results:**
 - La lista de ofertas se actualiza.
 - Se muestran las tarjetas de oferta correspondientes a los resultados 11 al 13 (diferentes a las de la página 1).
 - En los controles de paginación, el botón '1' pasa a estar inactivo.
 - En los controles de paginación, el botón '2' se activa.
 - Los botones de navegación '<' y '>' se mantienen visibles.

---