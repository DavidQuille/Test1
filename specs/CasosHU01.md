# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-12

url: https://politutorias-frontend.vercel.app/dashboard/tutor


## ID: CP-HU-01-R1
**Título:** Publicación exitosa de una oferta de tutoría
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Ingresar en el campo 'Título de la Oferta': 'Cálculo Vectorial'.
 5. Ingresar en el campo 'Precio por Hora ($)': '10'.
 6. Seleccionar en el campo 'Modalidad': 'Presencial'.
 7. Seleccionar en el campo 'Categorías': 'Matemáticas'.
 8. Ingresar en el campo 'Descripción de la Oferta': 'Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie.'.
 9. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - El sistema publica la oferta.
 - La modal 'Nueva Oferta de Tutoría' se cierra.
 - Se visualiza el perfil del tutor en el Dashboard con un mensaje de 'Oferta creada'.

---

## ID: CP-HU-01-R2
**Título:** Bloqueo por título de oferta vacío
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Dejar el campo 'Título de la Oferta' vacío.
 5. Ingresar en el campo 'Precio por Hora ($)': '10'.
 6. Seleccionar en el campo 'Modalidad': 'Presencial'.
 7. Seleccionar en el campo 'Categorías': 'Matemáticas'.
 8. Ingresar en el campo 'Descripción de la Oferta': 'Clases de matemáticas avanzadas para universitarios.'.
 9. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - La modal 'Nueva Oferta de Tutoría' permanece abierta.
 - El campo 'Título de la Oferta' muestra un borde rojo.
 - Se muestra el mensaje de error exacto: 'Escribe el título de la materia' debajo del campo 'Título de la Oferta'.

---

## ID: CP-HU-01-R3
**Título:** Bloqueo por precio por hora inválido (fuera de rango o vacío)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Ingresar en el campo 'Título de la Oferta': 'Física I'.
 5. Ingresar en el campo 'Precio por Hora ($)': '3' (valor fuera del rango $5-$20).
 6. Seleccionar en el campo 'Modalidad': 'Presencial'.
 7. Seleccionar en el campo 'Categorías': 'Ciencias Exactas'.
 8. Ingresar en el campo 'Descripción de la Oferta': 'Tutorías personalizadas de Física I para estudiantes universitarios.'.
 9. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - La modal 'Nueva Oferta de Tutoría' permanece abierta.
 - El campo 'Precio por Hora ($)' muestra un borde rojo.
 - Se muestra el mensaje de error exacto: 'Ingresa un precio' debajo del campo 'Precio por Hora ($)'.

---

## ID: CP-HU-01-R4
**Título:** Bloqueo por categorías de oferta vacías
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Ingresar en el campo 'Título de la Oferta': 'Programación en Python'.
 5. Ingresar en el campo 'Precio por Hora ($)': '15'.
 6. Seleccionar en el campo 'Modalidad': 'Presencial'.
 7. Dejar el campo 'Categorías' vacío.
 8. Ingresar en el campo 'Descripción de la Oferta': 'Clases de Python desde cero hasta nivel intermedio.'.
 9. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - La modal 'Nueva Oferta de Tutoría' permanece abierta.
 - El campo 'Categorías' muestra un borde rojo.
 - Se muestra el mensaje de error exacto: 'Selecciona al menos una categoría' debajo del campo 'Categorías'.

---

## ID: CP-HU-01-R5
**Título:** Bloqueo por descripción de oferta vacía
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Ingresar en el campo 'Título de la Oferta': 'Álgebra Lineal'.
 5. Ingresar en el campo 'Precio por Hora ($)': '12'.
 6. Seleccionar en el campo 'Modalidad': 'Presencial'.
 7. Seleccionar en el campo 'Categorías': 'Matemáticas'.
 8. Dejar el campo 'Descripción de la Oferta' vacío.
 9. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - La modal 'Nueva Oferta de Tutoría' permanece abierta.
 - El campo 'Descripción de la Oferta' muestra un borde rojo.
 - Se muestra el mensaje de error exacto: 'Agrega una descripción' debajo del campo 'Descripción de la Oferta'.

---

## ID: CP-HU-01-R6
**Título:** Cancelar la publicación de oferta con el botón 'Cancelar'
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Ingresar en el campo 'Título de la Oferta': 'Prueba de Cancelación'.
 5. Hacer clic en el botón 'Cancelar'.

**Expected Results:**
 - La modal 'Nueva Oferta de Tutoría' se cierra.
 - El sistema redirige al perfil del tutor en el Dashboard.
 - Se muestra el botón '+ Nueva Oferta' en el Dashboard.

---

## ID: CP-HU-01-R7
**Título:** Cancelar la publicación de oferta con el botón 'X' (cerrar modal)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas".
 3. Hacer clic en el botón "+ Nueva Oferta" para abrir la modal 'Nueva Oferta de Tutoría'.
 4. Ingresar en el campo 'Título de la Oferta': 'Prueba de Cierre con X'.
 5. Hacer clic en el botón 'X' para cerrar la modal.

**Expected Results:**
 - La modal 'Nueva Oferta de Tutoría' se cierra.
 - El sistema redirige al perfil del tutor en el Dashboard.
 - Se muestra el botón '+ Nueva Oferta' en el Dashboard.

## ID: CP-HU-01-R8
**Título:** Truncado automático por límite máximo en Título (80 caracteres)
**Prioridad:** Media
**Tipo:** Funcional / UI
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas" y abrir la modal.
 3. Intentar escribir o pegar en el campo 'Título de la Oferta' el texto: 'Curso completo de Cálculo Vectorial y Ecuaciones Diferenciales para Ingeniería de Software' (90 caracteres).
 4. Observar el comportamiento del campo y el contador.

**Expected Results:**
 - El sistema trunca el texto automáticamente a los 80 caracteres.
 - No se permite ingresar caracteres adicionales más allá del límite.
 - El contador visual debajo del campo muestra **"80/80"**.

---

## ID: CP-HU-01-R9
**Título:** Bloqueo por límite máximo de categorías (Máx. 5)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas" y abrir la modal.
 3. Seleccionar 5 categorías: 'Matemática', 'Física', 'Química', 'Álgebra' y 'Cálculo'.
 4. Intentar seleccionar una sexta categoría (ej. 'Estadística').

**Expected Results:**
 - El sistema no permite marcar la sexta categoría.
 - La selección se mantiene en 5 elementos.
 - El contador visual de categorías permanece en **"5/5"**.

---

## ID: CP-HU-01-R10
**Título:** Truncado automático por límite máximo en Descripción (250 caracteres)
**Prioridad:** Media
**Tipo:** Funcional / UI
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas" y abrir la modal.
 3. Intentar pegar en el campo 'Descripción de la Oferta' el texto: 'En este curso intensivo aprenderás a dominar las integrales dobles y triples, así como el análisis vectorial completo. Incluye resolución de exámenes pasados, talleres prácticos semanales y acceso a grabaciones de las clases para repaso constante previo al examen.' (263 caracteres).
 4. Observar el comportamiento del campo y el contador.

**Expected Results:**
 - El sistema trunca el texto en el carácter 250 (terminando en "...constante pre").
 - El contador visual muestra **"250/250"**.
 - No se permiten más entradas de teclado en ese campo.

---

## ID: CP-HU-01-R11
**Título:** Bloqueo por Título de oferta demasiado corto (menor a 3 caracteres)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas" y abrir la modal.
 3. Ingresar en el campo 'Título de la Oferta': **'Fe'** (2 caracteres).
 4. Completar los campos: Precio '10', Modalidad 'Presencial', Categoría 'Matemáticas' y una descripción válida.
 5. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - La modal permanece abierta.
 - El campo 'Título de la Oferta' muestra un borde rojo.
 - El contador indica **'2/80'**.
 - Aparece el mensaje de error: **'Mínimo 3 caracteres'** debajo del campo.

---

## ID: CP-HU-01-R12
**Título:** Bloqueo por Descripción de oferta demasiado corta (menor a 20 caracteres)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Usuario Tutor logueado y en la interfaz 'Nueva Oferta de Tutoría'.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la sección "Mis Ofertas" y abrir la modal.
 3. Ingresar un Título válido (ej. 'Cálculo Vectorial').
 4. Ingresar en el campo 'Descripción de la Oferta': **'Clases rápidas.'** (15 caracteres).
 5. Completar los demás campos con datos válidos.
 6. Hacer clic en el botón 'Publicar Oferta'.

**Expected Results:**
 - La modal permanece abierta.
 - El campo 'Descripción de la Oferta' muestra un borde rojo.
 - El contador indica **'15/250'**.
 - Aparece el mensaje de error: **'Mínimo 20 caracteres'** debajo del campo.