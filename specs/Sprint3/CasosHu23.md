
# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-03-13

url: https://politutorias-frontend.vercel.app/bandeja

## ID: CP-HU-23-R1
**Título:** Rechazo de solicitud de tutoría con motivo predefinido exitoso
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Conflicto de horarios con otra tutoría".
 6. Hacer clic en el botón "Confirmar Rechazo".

**Expected Results:**
 - El modal "Rechazar solicitud de tutoría" desaparece.
 - Se visualiza una alerta inferior azul con el texto exacto: "Solicitud rechazada".
 - En la pestaña "Pendientes", la solicitud del estudiante (ej. "Valeria Sánchez") ya no aparece.
 - El contador numérico de la pestaña "Pendientes" se reduce en 1.
 - En la pestaña "Respondidas", la solicitud del estudiante (ej. "Valeria Sánchez") ahora es visible y su contador se incrementa.

## ID: CP-HU-23-R2
**Título:** Rechazo de solicitud de tutoría con motivo 'Otro' sin comentario (exitoso)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Otro".
 6. Dejar el campo de texto "Comentario adicional (opcional)" completamente vacío.
 7. Hacer clic en el botón "Confirmar Rechazo".

**Expected Results:**
 - El modal "Rechazar solicitud de tutoría" desaparece.
 - Se visualiza una alerta inferior azul con el texto exacto: "Solicitud rechazada".
 - En la pestaña "Pendientes", la solicitud del estudiante (ej. "Valeria Sánchez") ya no aparece.
 - El contador numérico de la pestaña "Pendientes" se reduce en 1.
 - En la pestaña "Respondidas", la solicitud del estudiante (ej. "Valeria Sánchez") ahora es visible y su contador se incrementa.

## ID: CP-HU-23-R3
**Título:** Rechazo de solicitud de tutoría con motivo 'Otro' y comentario (exitoso)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Otro".
 6. Ingresar en el campo "Comentario adicional (opcional)" el texto: "No podré atender esta semana debido a un cruce de horarios.".
 7. Hacer clic en el botón "Confirmar Rechazo".

**Expected Results:**
 - El sistema procesa el rechazo guardando el texto ingresado en el comentario.
 - El modal "Rechazar solicitud de tutoría" desaparece.
 - Se visualiza una alerta inferior azul con el texto exacto: "Solicitud rechazada".
 - En la pestaña "Pendientes", la solicitud del estudiante (ej. "Valeria Sánchez") ya no aparece.
 - El contador numérico de la pestaña "Pendientes" se reduce en 1.
 - En la pestaña "Respondidas", la solicitud del estudiante (ej. "Valeria Sánchez") ahora es visible y su contador se incrementa.

## ID: CP-HU-23-R4
**Título:** Cancelar rechazo con motivo predefinido seleccionado
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Imprevisto personal".
 6. Hacer clic en el botón "Cancelar" ubicado en la parte inferior izquierda del modal.

**Expected Results:**
 - El sistema interrumpe la acción de rechazo.
 - La ventana modal "Rechazar solicitud de tutoría" se cierra inmediatamente.
 - La pantalla 'T. Bandeja de Entrada (Solicitud Pendiente Desplegada)' permanece inalterada.
 - La solicitud (ej. "Valeria Sánchez") continúa visible en la pestaña "Pendientes" y su fila sigue desplegada.
 - Los contadores numéricos de las pestañas ("Pendientes", "Expiradas", "Respondidas") no sufren alteraciones.

## ID: CP-HU-23-R5
**Título:** Cancelar rechazo con motivo 'Otro' seleccionado sin comentario
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Otro".
 6. Dejar el campo de texto "Comentario adicional (opcional)" vacío.
 7. Hacer clic en el botón "Cancelar".

**Expected Results:**
 - El sistema interrumpe la acción de rechazo.
 - La ventana modal expandida "Rechazar solicitud de tutoría" se cierra inmediatamente.
 - La pantalla 'T. Bandeja de Entrada (Solicitud Pendiente Desplegada)' permanece inalterada.
 - La solicitud (ej. "Valeria Sánchez") continúa visible en la pestaña "Pendientes" y su fila sigue desplegada.
 - Los contadores numéricos de las pestañas no sufren alteraciones.

## ID: CP-HU-23-R6
**Título:** Cancelar rechazo con motivo 'Otro' seleccionado con comentario
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Otro".
 6. Ingresar en el campo de texto "Comentario adicional (opcional)" el texto: "Revisar agenda".
 7. Hacer clic en el botón "Cancelar".

**Expected Results:**
 - El sistema interrumpe la acción de rechazo y descarta el texto escrito en el comentario.
 - La ventana modal "Rechazar solicitud de tutoría" se cierra inmediatamente.
 - La pantalla 'T. Bandeja de Entrada (Solicitud Pendiente Desplegada)' permanece inalterada.
 - La solicitud (ej. "Valeria Sánchez") continúa visible en la pestaña "Pendientes" y su fila sigue desplegada.
 - Los contadores numéricos de las pestañas no sufren alteraciones.

## ID: CP-HU-23-R7
**Título:** Bloqueo de ingreso de caracteres en comentario adicional al exceder el límite
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El Tutor se encuentra logueado y en la pantalla de Bandeja de Entrada con solicitudes pendientes. El modal 'Rechazar solicitud de tutoría' está abierto y el radio button "Otro" ha sido seleccionado, mostrando el campo "Comentario adicional (opcional)".

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la pantalla 'Bandeja de Entrada'.
 3. Desplegar los detalles de una solicitud de tutoría pendiente (ej. la de "Valeria Sánchez").
 4. Hacer clic en el botón "Rechazar" (fondo blanco).
 5. Hacer clic en el radio button "Otro".
 6. Ingresar en el campo de texto "Comentario adicional (opcional)" el texto: "C" repetido 301 veces sin espacios.

**Expected Results:**
 - El sistema bloquea el ingreso adicional de texto después del caracter número 300.
 - El contador inferior muestra exactamente "300/300".
 - No se permite sobrepasar el límite de 300 caracteres visualmente ni funcionalmente en el campo.