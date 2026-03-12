# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27
url: https://politutorias-frontend.vercel.app/encuentra-tutoria


## ID: CP-HU-32-R1
**Título:** Verificar la visualización de los detalles de una oferta al hacer clic en su tarjeta.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla 'E. Home Estudiante' (sección de búsqueda de tutorías) con ofertas visibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla principal de "E. Home Estudiante".
 3. Localizar una tarjeta de oferta (ej: la oferta de "Cálculo Vectorial").
 4. Hacer clic en la tarjeta de oferta "Cálculo Vectorial".

**Expected Results:**
 - El sistema carga la información detallada de la oferta.
 - En la cabecera, se visualiza el botón 'Volver' a la izquierda y el logo 'PoliTutorias' a la derecha.
 - La sección principal muestra el icono de libro junto al título de la materia 'Cálculo Vectorial'.
 - Se muestra la modalidad 'Virtual y Presencial'.
 - Se visualiza un párrafo descriptivo de la clase.
 - Se muestra el título 'Categorías' con los tags 'Matemática' y 'Formación Básica'.
 - Se visualiza el título 'Disponibilidad Semanal' listando Lunes de 14:00 a 15:00, Miércoles de 14:00 a 15:00 y Viernes de 09:00 a 10:00.
 - En el panel lateral, se visualiza el 'Precio por hora' de $10.
 - La sección "Sobre el Tutor" NO se muestra.
 - La sección "Experiencia" NO se muestra.
 - La sección "Contactar por WhatsApp" NO se muestra.

## ID: CP-HU-32-R2
**Título:** Verificar el regreso a la lista principal de ofertas desde la pantalla de detalles.
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de "Detalles de la Oferta" para una tutoría.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla principal de "E. Home Estudiante".
 3. Hacer clic en una tarjeta de oferta (ej: la oferta de "Cálculo Vectorial") para visualizar sus detalles.
 4. Hacer clic en el botón 'Volver' ubicado en la cabecera superior izquierda.

**Expected Results:**
 - El sistema redirige a la pantalla principal de listado de ofertas ('E. Home Estudiante').
 - Se visualiza el listado de tarjetas de oferta.