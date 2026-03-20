# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-13

url: http://localhost:3001/bandeja

## ID: CP-HU-08-R1
**Título:** Confirmar Tutoría Virtual exitosamente con enlace válido.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Virtual' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Virtual'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", ingresar "https://zoom.us/j/123456789" en el campo de texto "Enlace de la reunión *".
 6. Hacer clic en el botón "Confirmar".

**Expected Results:**
 - La ventana modal se cierra.
 - El sistema procesa la aceptación, cambiando internamente el estado a "Aceptada".
 - Se regresa a la pantalla "T. Bandeja de Entrada".
 - La solicitud recién aceptada desaparece de la lista de la pestaña "Pendientes".
 - El contador numérico de la pestaña "Pendientes" se reduce en uno.
 - El contador de la pestaña "Respondidas" se incrementa en uno.

---

## ID: CP-HU-08-R2
**Título:** Intentar confirmar Tutoría Virtual sin ingresar el enlace de reunión obligatorio.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Virtual' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Virtual'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", dejar el campo de texto "Enlace de la reunión *" completamente vacío.
 6. Hacer clic en el botón "Confirmar".

**Expected Results:**
 - El sistema impide la confirmación y el modal "Confirmar Tutoría" permanece abierto en pantalla.
 - Debajo del campo de texto de enlace, se muestra el mensaje de error exacto en rojo: "El enlace de reunión es obligatorio.".

---

## ID: CP-HU-08-R3
**Título:** Intentar confirmar Tutoría Virtual con un enlace de reunión URL inválida.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Virtual' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Virtual'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", ingresar "zoom.us/j/1234" en el campo de texto "Enlace de la reunión *".
 6. Hacer clic en el botón "Confirmar".

**Expected Results:**
 - El sistema impide la confirmación y el modal "Confirmar Tutoría" permanece abierto en pantalla.
 - Debajo del campo de texto de enlace, se muestra el mensaje de error exacto en rojo: "Ingresa una URL válida (debe comenzar con https:// o http://).".

---

## ID: CP-HU-08-R4
**Título:** Cancelar la confirmación de una Tutoría Virtual.
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Virtual' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Virtual'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. Hacer clic en el botón "Cancelar" situado en la parte inferior izquierda del modal "Confirmar Tutoría".

**Expected Results:**
 - La ventana modal "Confirmar Tutoría" se cierra inmediatamente.
 - Se descarta la información ingresada en el modal.
 - La pantalla base de "T. Bandeja de Entrada" permanece inalterada.
 - La solicitud original se mantiene en estado "Pendiente" y su fila completamente desplegada.
 - No hay alteraciones en los contadores numéricos de las pestañas.

---

## ID: CP-HU-08-R5
**Título:** Confirmar Tutoría Presencial exitosamente con lugar de encuentro válido.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Presencial' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Presencial'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", ingresar "Edificio H, Aula 205, Campus Principal" en el campo de texto "Lugar de encuentro *".
 6. Hacer clic en el botón "Confirmar".

**Expected Results:**
 - La ventana modal se cierra.
 - El sistema procesa la aceptación, cambiando internamente el estado a "Aceptada".
 - Se regresa a la pantalla "T. Bandeja de Entrada".
 - La solicitud recién aceptada desaparece de la lista de la pestaña "Pendientes".
 - El contador numérico de la pestaña "Pendientes" se reduce en uno.
 - El contador de la pestaña "Respondidas" se incrementa en uno.

---

## ID: CP-HU-08-R6
**Título:** Intentar confirmar Tutoría Presencial sin ingresar el lugar de encuentro obligatorio.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Presencial' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Presencial'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", dejar el campo de texto "Lugar de encuentro *" completamente vacío.
 6. Hacer clic en el botón "Confirmar".

**Expected Results:**
 - El sistema impide la confirmación y el modal "Confirmar Tutoría" permanece abierto en pantalla.
 - Debajo del campo de texto de lugar, se muestra el mensaje de error exacto en rojo: "El lugar de encuentro es obligatorio.".

---

## ID: CP-HU-08-R7
**Título:** Intentar confirmar Tutoría Presencial con un lugar de encuentro de menos de 10 caracteres.
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Presencial' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Presencial'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", ingresar "Aula 1" en el campo de texto "Lugar de encuentro *".
 6. Hacer clic en el botón "Confirmar".

**Expected Results:**
 - El sistema impide la confirmación y el modal "Confirmar Tutoría" permanece abierto en pantalla.
 - Debajo del campo de texto de lugar, se muestra el mensaje de error exacto en rojo: "Mínimo 10 caracteres para el lugar.".

---

## ID: CP-HU-08-R8
**Título:** Cancelar la confirmación de una Tutoría Presencial.
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Presencial' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Presencial'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. Hacer clic en el botón "Cancelar" situado en la parte inferior izquierda del modal "Confirmar Tutoría".

**Expected Results:**
 - La ventana modal "Confirmar Tutoría" se cierra inmediatamente.
 - Se descarta la información ingresada en el modal.
 - La pantalla base de "T. Bandeja de Entrada" permanece inalterada.
 - La solicitud original se mantiene en estado "Pendiente" y su fila completamente desplegada.
 - No hay alteraciones en los contadores numéricos de las pestañas.

---

## ID: CP-HU-08-Extra-01
**Título:** Verificar el límite máximo de 100 caracteres en el campo "Lugar de encuentro".
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la pantalla "T. Bandeja de Entrada". Una solicitud de tutoría pendiente con modalidad 'Presencial' está visible y sus detalles desplegados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla "T. Bandeja de Entrada".
 3. Desplegar los detalles de una solicitud pendiente con modalidad 'Presencial'.
 4. Hacer clic en el botón "Aceptar" en la fila de la solicitud desplegada.
 5. En el modal "Confirmar Tutoría", intentar ingresar 101 caracteres (ej. la letra "B" repetida 101 veces sin espacios) en el campo de texto "Lugar de encuentro *".

**Expected Results:**
 - El sistema bloquea el ingreso adicional de texto después del caracter 100.
 - El campo de texto "Lugar de encuentro *" muestra exactamente 100 caracteres.
 - El contador inferior del campo "Lugar de encuentro *" muestra exactamente "100/100".
 - No se permite sobrepasar este límite visual ni funcionalmente.