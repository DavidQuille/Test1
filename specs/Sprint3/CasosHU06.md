# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-13

url: https://politutorias-frontend.vercel.app/encuentra-tutoria

## ID: CP-HU-06-R1
**Título:** Verificación de botón "Solicitar Tutoría" inactivo al no seleccionar horarios
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría, sin ningún horario seleccionado en "Disponibilidad Semanal".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría.
 3. Asegurarse de que ningún chip de horario esté seleccionado en la sección "Disponibilidad Semanal".
 N. Verificar el estado del botón "Solicitar Tutoría".

**Expected Results:**
 - El usuario permanece en la pantalla "E. Detalle Oferta".
 - El botón "Solicitar Tutoría" se muestra en un estado visual deshabilitado, impidiendo la interacción del usuario para abrir el modal de solicitud.

---

## ID: CP-HU-06-R2
**Título:** Verificación de alerta por solicitud previa de horario
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta, con una solicitud activa previa para el horario "Miércoles 14:00".

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría.
 3. Seleccionar el chip del horario "14:00" en la fila del "Miércoles" dentro de la sección "Disponibilidad Semanal".
 N. Observar el comportamiento del sistema.

**Expected Results:**
 - El botón "Solicitar Tutoría" no se habilita.
 - Se visualiza inmediatamente una alerta inferior con el texto exacto: "Horario ya solicitado. Ya tienes una solicitud activa para Miércoles 14:00."

---

## ID: CP-HU-06-R3
**Título:** Solicitud exitosa de tutoría con una sola modalidad y mensaje lleno
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría con una única modalidad configurada y con horarios disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con una única modalidad configurada.
 3. Seleccionar el horario "Lunes 9 mar · 14:00" en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría".
 5. En el modal "Solicitar Tutoría", ingresar "Requiero ayuda urgente con este tema para mi examen." en el campo "Mensaje para el tutor *".
 N. Hacer clic en el botón "Enviar Solicitud".

**Expected Results:**
 - Se superpone el modal "Solicitar Tutoría" mostrando la foto y nombre del tutor, el chip de "Horarios seleccionados", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud". No se visualiza selector de modalidad.
 - El modal se cierra.
 - Se visualiza en la pantalla principal una notificación de éxito con el texto exacto: "¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto."

---

## ID: CP-HU-06-R4
**Título:** Verificación de mensaje obligatorio en solicitud de tutoría (una modalidad)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría con una única modalidad configurada y con horarios disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con una única modalidad configurada.
 3. Seleccionar el horario "Lunes 9 mar · 14:00" en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría".
 5. En el modal "Solicitar Tutoría", dejar el campo de texto "Mensaje para el tutor *" completamente vacío.
 N. Hacer clic en el botón "Enviar Solicitud".

**Expected Results:**
 - Se superpone el modal "Solicitar Tutoría" mostrando la foto y nombre del tutor, el chip de "Horarios seleccionados", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud". No se visualiza selector de modalidad.
 - El sistema impide el envío.
 - El borde del campo de texto "Mensaje para el tutor *" cambia a color rojo.
 - Justo debajo del campo de texto se muestra el mensaje de error exacto: "El mensaje es obligatorio."

---

## ID: CP-HU-06-R5
**Título:** Verificación de modalidad obligatoria en solicitud de tutoría (dual modalidad)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría con modalidades "Virtual/Presencial" configuradas y con horarios disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con modalidades "Virtual/Presencial" configuradas.
 3. Seleccionar el horario "Lunes 9 mar · 14:00" en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría".
 5. En el modal "Solicitar Tutoría", dejar la sección "Modalidad *" sin seleccionar.
 6. Ingresar "Necesito repasar integrales." en el campo de texto "Mensaje para el tutor *".
 N. Hacer clic en el botón "Enviar Solicitud".

**Expected Results:**
 - Se superpone el modal "Solicitar Tutoría" mostrando la información del tutor, los "Horarios seleccionados", la sección obligatoria "Modalidad *" con los botones "Virtual" y "Presencial", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud".
 - El sistema impide el envío.
 - Justo debajo de los botones de selección "Virtual" y "Presencial" se muestra el mensaje de error exacto en color rojo: "Selecciona la modalidad".

---

## ID: CP-HU-06-R6
**Título:** Solicitud exitosa de tutoría con dual modalidad, modalidad y mensaje llenos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría con modalidades "Virtual/Presencial" configuradas y con horarios disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con modalidades "Virtual/Presencial" configuradas.
 3. Seleccionar el horario "Lunes 9 mar · 14:00" en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría".
 5. En el modal "Solicitar Tutoría", seleccionar el botón "Virtual" en la sección "Modalidad *".
 6. Ingresar "Necesito repasar integrales." en el campo de texto "Mensaje para el tutor *".
 N. Hacer clic en el botón "Enviar Solicitud".

**Expected Results:**
 - Se superpone el modal "Solicitar Tutoría" mostrando la información del tutor, los "Horarios seleccionados", la sección obligatoria "Modalidad *" con los botones "Virtual" y "Presencial", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud".
 - El modal se cierra.
 - Se visualiza una notificación de éxito con el texto exacto: "¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto."

---

## ID: CP-HU-06-R7
**Título:** Verificación de mensaje obligatorio en solicitud de tutoría (dual modalidad, modalidad seleccionada)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría con modalidades "Virtual/Presencial" configuradas y con horarios disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con modalidades "Virtual/Presencial" configuradas.
 3. Seleccionar el horario "Lunes 9 mar · 14:00" en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría".
 5. En el modal "Solicitar Tutoría", seleccionar el botón "Presencial" en la sección "Modalidad *".
 6. Dejar el campo de texto "Mensaje para el tutor *" completamente vacío.
 N. Hacer clic en el botón "Enviar Solicitud".

**Expected Results:**
 - Se superpone el modal "Solicitar Tutoría" mostrando la información del tutor, los "Horarios seleccionados", la sección obligatoria "Modalidad *" con los botones "Virtual" y "Presencial", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud".
 - El sistema impide el envío.
 - El borde del campo de texto "Mensaje para el tutor *" cambia a color rojo.
 - Justo debajo del campo de texto se muestra el mensaje de error exacto: "El mensaje es obligatorio."

---

## ID: CP-HU-06-R8
**Título:** Verificación de mensajes y modalidad obligatorios en solicitud de tutoría (dual modalidad)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en la pantalla de Detalle de Oferta de una tutoría con modalidades "Virtual/Presencial" configuradas y con horarios disponibles.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría con modalidades "Virtual/Presencial" configuradas.
 3. Seleccionar el horario "Lunes 9 mar · 14:00" en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría".
 5. En el modal "Solicitar Tutoría", dejar la sección "Modalidad *" sin seleccionar.
 6. Dejar el campo de texto "Mensaje para el tutor *" completamente vacío.
 N. Hacer clic en el botón "Enviar Solicitud".

**Expected Results:**
 - Se superpone el modal "Solicitar Tutoría" mostrando la información del tutor, los "Horarios seleccionados", la sección obligatoria "Modalidad *" con los botones "Virtual" y "Presencial", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud".
 - El sistema impide el envío.
 - Debajo de los botones de selección "Virtual" y "Presencial" se muestra el mensaje de error exacto en color rojo: "Selecciona la modalidad".
 - El borde del campo de texto "Mensaje para el tutor *" cambia a color rojo.
 - Debajo del campo de texto se muestra el mensaje de error exacto: "El mensaje es obligatorio."

---

## ID: CP-HU-06-ADD01
**Título:** Verificación de bloqueo por límite máximo de caracteres en mensaje de solicitud
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y en el modal "Solicitar Tutoría" (ya sea de una o dual modalidad).

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla de "Detalle de Oferta" de una tutoría.
 3. Seleccionar al menos un horario en la sección "Disponibilidad Semanal".
 4. Hacer clic en el botón "Solicitar Tutoría" para abrir el modal.
 5. En el modal "Solicitar Tutoría", ingresar "A" repetido 501 veces sin espacios en el campo de texto "Mensaje para el tutor *".
 N. Intentar ingresar un carácter adicional.

**Expected Results:**
 - El sistema bloquea el ingreso adicional de texto.
 - El contador inferior muestra exactamente "500/500".
 - No se permite sobrepasar el límite visual ni funcionalmente al teclear.
