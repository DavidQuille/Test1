# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-12

url: https://politutorias-frontend.vercel.app/dashboard/tutor


## ID: CP-HU-02-R1
**Título:** Visualización del Dashboard de Tutor con ofertas publicadas
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema con al menos una oferta de tutoría publicada previamente.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas de Tutorías" (o la página de inicio por defecto del tutor, donde se carga el dashboard).

**Expected Results:**
 - La página "T. Inicio Tutor (Oferta Creada)" se carga correctamente.
 - Se visualiza el logo/texto "Poli Tutorías" en la parte superior izquierda.
 - Se visualiza el botón/texto "Cerrar Sesión" en la parte superior derecha.
 - Se visualiza el título principal de la sección: "Mis Ofertas de Tutorías".
 - Se visualiza el botón "+ Nueva Oferta" en la esquina superior derecha del área de contenido.
 - Se visualiza una tarjeta de oferta con el título "Cálculo en una Variable".
 - Dentro de la tarjeta de oferta "Cálculo en una Variable" se visualiza: Ícono "Presencial", descripción "Me enfoco en ejercicios de MRU.", etiquetas de categoría ("Matemática", "Formación Básica", "Preparación de Exámenes", "Resolución de Ejercicios", "Laboratorios") y el precio "$10/h".

---

## ID: CP-HU-02-R2
**Título:** Redirección al modal de creación de oferta desde el dashboard con ofertas
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema, con al menos una oferta de tutoría publicada, y en la sección "Mis Ofertas de Tutorías".

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas de Tutorías".
 3. Hacer clic en el botón "+ Nueva Oferta".

**Expected Results:**
 - Se visualiza un modal superpuesto a la pantalla actual para la creación de una nueva oferta de tutoría.

---

## ID: CP-HU-02-R3
**Título:** Visualización del Dashboard de Tutor sin ofertas publicadas (Estado Vacío)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en el sistema sin ofertas de tutoría publicadas previamente.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas de Tutorías" (o la página de inicio por defecto del tutor, donde se carga el dashboard).

**Expected Results:**
 - La página "T. Inicio Tutor (Sin Ofertas)" se carga correctamente.
 - **Cabecera:** Se visualiza el logo "Poli Tutorías" en la parte superior izquierda y el botón "Cerrar Sesión" en la parte superior derecha.
 - **Área Central:** Se visualiza el título "Mis Ofertas de Tutorías" y el botón "+ Nueva Oferta".
 - **Contenedor de Estado Vacío:**
     - Se visualiza el ícono de un libro abierto.
     - Se visualiza el mensaje central: "No tienes ofertas activas".
     - Se visualiza el subtexto: "Publica tu primera oferta para que los estudiantes te encuentren".
     - Se visualiza el botón central: "+ Crear mi primera oferta".
