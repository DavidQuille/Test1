# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27

url: https://politutorias-frontend.vercel.app/tutor/registro 

## ID: CP-HU-41-R1
**Título:** Verificar bloqueo de navegación al intentar avanzar sin seleccionar horarios
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Asegurarse de que no haya ningún bloque de horario seleccionado en la cuadrícula.
 4. Hacer clic en el botón 'Siguiente Perfil Profesional'.

**Expected Results:**
 - El sistema bloquea la navegación.
 - Se muestra el texto rojo 'Selecciona al menos un horario disponible' encima de la cuadrícula.

---

## ID: CP-HU-41-R2
**Título:** Verificar la selección visual y actualización del contador al hacer clic en un bloque horario
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Hacer clic en el bloque de horario 'Lun a 09:00' en la cuadrícula.

**Expected Results:**
 - El bloque horario 'Lun a 09:00' cambia visualmente de color blanco a azul oscuro.
 - Se muestra un ícono '✓' blanco en el centro del bloque seleccionado.
 - Aparece el texto verde centrado sobre la cuadrícula: '✓ 1 horario seleccionado'.

---

## ID: CP-HU-41-R3
**Título:** Verificar avance al Paso 3 'Perfil Profesional' con al menos un horario seleccionado
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Hacer clic en el bloque de horario 'Mar a las 10:00' en la cuadrícula para seleccionarlo.
 4. Verificar que se muestra el texto verde '✓ 1 horario seleccionado'.
 5. Hacer clic en el botón 'Siguiente Perfil Profesional'.

**Expected Results:**
 - El sistema redirige a la pantalla del Paso 3.
 - Se visualiza el paso '3 Perfil Profesional' resaltado.
 - Se muestra el título 'Detalles Profesionales'.
 - Se muestra el subtítulo 'Añade tu experiencia y materias para destacar'.
 - Se visualiza el botón 'Finalizar Registro'.

---

## ID: CP-HU-41-R4
**Título:** Verificar la deselección de un bloque horario y la actualización del contador
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro), con al menos dos bloques de horario seleccionados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar los bloques de horario 'Mié de 11:00' y 'Mié de 12:00' en la cuadrícula.
 4. Verificar que se muestra el texto verde '✓ 2 horarios seleccionados'.
 5. Hacer clic nuevamente en el bloque horario 'Mié de 11:00' para deseleccionarlo.

**Expected Results:**
 - El bloque horario 'Mié de 11:00' vuelve a ser de color blanco.
 - El ícono '✓' blanco desaparece del bloque deseleccionado.
 - El contador superior verde disminuye su número en tiempo real, mostrando '✓ 1 horario seleccionado'.

---

## ID: CP-HU-41-ADD-01
**Título:** Verificar la navegabilidad hacia atrás al Paso 1 'Datos Básicos'
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Hacer clic en el botón inferior izquierdo '← Atrás Datos Básicos'.

**Expected Results:**
 - El sistema redirige a la pantalla del Paso 1 'Datos Básicos'.
 - Toda la información previamente ingresada por el usuario en los campos del Paso 1 se conserva intacta.

---

## ID: CP-HU-41-ADD-02
**Título:** Verificar selección de múltiples horarios en diferentes días de la semana
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar 'Lun 09:00', 'Mar 14:00', 'Mié 11:00', 'Jue 15:00' y 'Vie 16:00' en la cuadrícula.
 4. Verificar el contador de horarios seleccionados.

**Expected Results:**
 - Cada bloque horario seleccionado cambia a color azul oscuro con ícono '✓'.
 - El contador superior muestra '✓ 5 horarios seleccionados'.
 - El sistema permite navegar a Paso 3 con clic en 'Siguiente Perfil Profesional'.

---

## ID: CP-HU-41-ADD-03
**Título:** Verificar selección de todos los horarios de un día específico
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar todos los horarios del miércoles (Mié 07:00, 08:00, 09:00... hasta 20:00).
 4. Verificar el contador total de horarios seleccionados.

**Expected Results:**
 - Los 14 bloques horarios del miércoles cambian a color azul oscuro con ícono '✓'.
 - El contador superior muestra '✓ 14 horarios seleccionados'.
 - La cuadrícula muestra toda la columna del miércoles resaltada en azul.

---

## ID: CP-HU-41-ADD-04
**Título:** Verificar selección de múltiples horarios en rango matutino (07:00-11:00)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar horarios solo en el rango matutino: Lun 09:00, Mar 10:00, Mié 11:00.
 4. Verificar que el contador muestre '✓ 3 horarios seleccionados'.
 5. Intentar avanzar a Paso 3 con el botón 'Siguiente Perfil Profesional'.

**Expected Results:**
 - Los bloques horarios de mañana (07:00-11:00) están seleccionados.
 - El sistema permite avanzar correctamente al Paso 3.
 - No hay ningún horario seleccionado en rangos vespertino o nocturno.

---

## ID: CP-HU-41-ADD-05
**Título:** Verificar selección de múltiples horarios en rango vespertino (12:00-17:00)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar horarios solo en el rango vespertino: Lun 12:00, Mar 14:00, Mié 17:00.
 4. Verificar que el contador muestre '✓ 3 horarios seleccionados'.
 5. Intentar avanzar a Paso 3 con el botón 'Siguiente Perfil Profesional'.

**Expected Results:**
 - Los bloques horarios de tarde (12:00-17:00) están seleccionados.
 - El sistema permite avanzar correctamente al Paso 3.
 - No hay ningún horario seleccionado en rangos matutino o nocturno.

---

## ID: CP-HU-41-ADD-06
**Título:** Verificar selección de múltiples horarios en rango nocturno (18:00-20:00)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar horarios solo en el rango nocturno: Lun 18:00, Vie 19:00, Sáb 20:00.
 4. Verificar que el contador muestre '✓ 3 horarios seleccionados'.
 5. Hacer clic en el botón 'Siguiente Perfil Profesional'.

**Expected Results:**
 - Los bloques horarios de noche (18:00-20:00) están seleccionados.
 - El sistema permite avanzar correctamente al Paso 3.
 - No hay ningún horario seleccionado en rangos matutino o vespertino.

---

## ID: CP-HU-41-ADD-07
**Título:** Verificar deselección total después de múltiples selecciones
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro) con múltiples horarios ya seleccionados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar múltiples horarios: Lun 09:00, Mar 14:00, Mié 11:00, Jue 15:00.
 4. Verificar que el contador muestre '✓ 4 horarios seleccionados'.
 5. Deseleccionar todos uno por uno haciendo clic nuevamente en cada bloque.
 6. Verificar el estado final sin selecciones.

**Expected Results:**
 - Cada clic en un bloque seleccionado lo deselecciona (vuelve a blanco).
 - El icono '✓' desaparece de cada bloque deseleccionado.
 - El contador disminuye: 4 → 3 → 2 → 1 → 0.
 - Cuando el contador llega a 0, el texto debe mostrar el estado inicial (sin horarios seleccionados).

---

## ID: CP-HU-41-ADD-08
**Título:** Verificar que error persiste al intentar avanzar nuevamente sin selecciones
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro) después de ver el error de validación.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Hacer clic en 'Siguiente Perfil Profesional' sin seleccionar ningún horario.
 4. Verificar que aparece el error 'Selecciona al menos un horario disponible'.
 5. Intentar hacer clic nuevamente en 'Siguiente Perfil Profesional' sin seleccionar horarios.

**Expected Results:**
 - El mensaje de error aparece nuevamente en la misma ubicación.
 - El navegación sigue bloqueada.
 - El usuario permanece en el Paso 2 sin poder avanzar.

---

## ID: CP-HU-41-ADD-09
**Título:** Verificar selección de horarios después de mostrar mensaje de error
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro) con el mensaje de error visible.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Hacer clic en 'Siguiente Perfil Profesional' sin seleccionar ningún horario.
 4. Verificar que aparece el error 'Selecciona al menos un horario disponible'.
 5. Seleccionar un horario, por ejemplo 'Lun 09:00'.
 6. Verificar que el error desaparece y se muestra el contador '✓ 1 horario seleccionado'.
 7. Hacer clic en 'Siguiente Perfil Profesional' para avanzar.

**Expected Results:**
 - El mensaje de error desaparece tan pronto como se selecciona un horario.
 - El contador verde aparecer '✓ 1 horario seleccionado'.
 - El sistema permite avanzar correctamente al Paso 3 'Perfil Profesional'.

---

## ID: CP-HU-41-ADD-10
**Título:** Verificar selección de máximo número de horarios (todos disponibles)
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** El tutor ha iniciado sesión y se encuentra en la interfaz "Define tu Horario" (Paso 2 del proceso de registro).

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz "Define tu Horario" (Paso 2).
 3. Seleccionar todos los bloques horarios disponibles en la cuadrícula (7 días × 14 horas = 98 horarios).
 4. Verificar el contador total.
 5. Verificar que el botón 'Siguiente Perfil Profesional' permanece funcional.

**Expected Results:**
 - Todos los bloques horarios se pueden seleccionar sin límite de máximo.
 - El contador muestra '✓ 98 horarios seleccionados'.
 - El sistema permite avanzar correctamente al Paso 3 con todos los horarios seleccionados.
 - La interfaz mantiene el rendimiento sin congelarse.