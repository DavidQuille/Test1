# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27

url: https://politutorias-frontend.vercel.app/tutor/registro 

## ID: CP-HU-34-R1
**Título:** Registro exitoso de Datos Básicos del Tutor
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Daniela Castro' en el campo 'Nombre Completo'.
 3. Ingresar '593991234567' en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema redirige al Paso 2.
 - Se visualiza paso '2 Disponibilidad' resaltado en la barra superior.
 - Se visualiza el título 'Define tu Horario'.
 - Se visualiza el subtítulo 'Selecciona los bloques horarios en los que puedes dar clases'.
 - Se visualiza una cuadrícula con encabezados ('Lun' a 'Dom', '7:00' a '20:00').
 - Se visualiza el botón 'Siguiente Perfil Profesional'.

---

## ID: CP-HU-34-R2
**Título:** Validación de campos obligatorios vacíos al registrar Datos Básicos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Dejar el campo 'Nombre Completo' vacío.
 3. Dejar el campo 'Número de WhatsApp' vacío.
 4. Dejar el dropdown 'Facultad' sin seleccionar.
 5. Dejar el dropdown 'Semestre Actual' sin seleccionar.
 6. Dejar el campo 'Biografía Corta' vacío.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema permanece en la pantalla "Completa tu Perfil".
 - Se muestra el mensaje de error exacto 'El nombre es obligatorio' en rojo debajo de 'Nombre Completo'.
 - Se muestra el mensaje de error exacto 'El número de WhatsApp es obligatorio' en rojo debajo de 'Número de WhatsApp'.
 - Se muestra el mensaje de error exacto 'Selecciona tu facultad' en rojo debajo del dropdown 'Facultad'.
 - Se muestra el mensaje de error exacto 'Selecciona tu semestre' en rojo debajo del dropdown 'Semestre Actual'.
 - Se muestra el mensaje de error exacto 'La biografía es obligatoria' en rojo debajo de 'Biografía Corta'.

---

## ID: CP-HU-34-R3
**Título:** Validación de 'Nombre Completo' con menos de 3 caracteres
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Jo' en el campo 'Nombre Completo'.
 3. Ingresar '593991234567' en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema permanece en la pantalla "Completa tu Perfil".
 - Se muestra el mensaje en rojo 'Mínimo 3 caracteres' debajo de 'Nombre Completo'.

---

## ID: CP-HU-34-R4
**Título:** Validación de 'Nombre Completo' con más de 60 caracteres
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Este es un nombre muy largo que definitivamente excede los sesenta caracteres para una prueba de longitud máxima' en el campo 'Nombre Completo'.
 3. Ingresar '593991234567' en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema limita el ingreso a 60 caracteres en el campo 'Nombre Completo'.
 - Se muestra el contador '60/60' debajo del campo 'Nombre Completo'.
 - No permite más digitación ni pegar texto en el campo 'Nombre Completo'.
 - El sistema permanece en la pantalla "Completa tu Perfil".

---

## ID: CP-HU-34-R5
**Título:** Validación de 'Nombre Completo' con caracteres no permitidos (números y especiales)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Intentar ingresar números o caracteres especiales (ej: 'Juan123$' o 'María@!') en el campo 'Nombre Completo'.
 3. Ingresar '593991234567' en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema bloquea el ingreso de caracteres no permitidos (números y especiales) en el campo 'Nombre Completo'.
 - Solo aparecen letras y espacios en la pantalla para el campo 'Nombre Completo'.
 - El sistema permanece en la pantalla "Completa tu Perfil".

---

## ID: CP-HU-34-R6
**Título:** Validación de 'Número de WhatsApp' con menos de 10 dígitos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Daniela Castro' en el campo 'Nombre Completo'.
 3. Ingresar '593991234' (un número con menos de 10 dígitos) en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema permanece en la pantalla "Completa tu Perfil".
 - Se muestra el mensaje en rojo 'Ingresa un número válido (10-13 dígitos)' debajo del campo 'Número de WhatsApp'.

---

## ID: CP-HU-34-R7
**Título:** Validación de 'Número de WhatsApp' con más de 13 dígitos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Daniela Castro' en el campo 'Nombre Completo'.
 3. Ingresar '59399123456789' (un número con más de 13 dígitos) en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema permanece en la pantalla "Completa tu Perfil".
 - Se muestra el mensaje en rojo 'Ingresa un número válido (10-13 dígitos)' debajo del campo 'Número de WhatsApp'.

---

## ID: CP-HU-34-R8
**Título:** Validación de 'Número de WhatsApp' con caracteres no numéricos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Daniela Castro' en el campo 'Nombre Completo'.
 3. Intentar ingresar letras o caracteres especiales (ej: '593abcd123' o '593-99123') en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema bloquea el ingreso de letras y caracteres especiales en el campo 'Número de WhatsApp'.
 - Solo aparecen números en la pantalla para el campo 'Número de WhatsApp'.
 - El sistema permanece en la pantalla "Completa tu Perfil".

---

## ID: CP-HU-34-R9
**Título:** Validación de 'Biografía Corta' con menos de 20 caracteres
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Daniela Castro' en el campo 'Nombre Completo'.
 3. Ingresar '593991234567' en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Soy un tutor nuevo.' (un texto con menos de 20 caracteres) en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema permanece en la pantalla "Completa tu Perfil".
 - Se muestra el mensaje en rojo 'Mínimo 20 caracteres' debajo de 'Biografía Corta'.

---

## ID: CP-HU-34-R10
**Título:** Validación de 'Biografía Corta' con más de 300 caracteres
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado en la interfaz 'Completa tu Perfil'.

**Steps:**
 1. Iniciar sesión como Tutor y navegar a la interfaz "Completa tu Perfil".
 2. Ingresar 'Daniela Castro' en el campo 'Nombre Completo'.
 3. Ingresar '593991234567' en el campo 'Número de WhatsApp'.
 4. Seleccionar 'FIS - Sistemas' del dropdown 'Facultad'.
 5. Seleccionar '4° Semestre' del dropdown 'Semestre Actual'.
 6. Ingresar 'Este es un texto de biografía muy extenso diseñado específicamente para superar el límite de trescientos caracteres y comprobar que el sistema bloquea correctamente cualquier intento de ingreso adicional una vez alcanzado el tope máximo permitido por el contador. Este texto debe exceder los 300 caracteres para verificar el comportamiento de bloqueo y la visualización del contador de caracteres.' en el campo 'Biografía Corta'.
 7. Hacer clic en el botón 'Siguiente Disponibilidad'.

**Expected Results:**
 - El sistema limita el ingreso a 300 caracteres en el campo 'Biografía Corta'.
 - Se muestra el contador '300/300' debajo del campo 'Biografía Corta'.
 - No permite más digitación ni pegar texto en el campo 'Biografía Corta'.
 - El sistema permanece en la pantalla "Completa tu Perfil".

---