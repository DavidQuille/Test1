# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27

url: http://localhost:3001/tutor/registro

## ID: CP-HU-42-R1
**Título:** Finalización Exitosa del Registro de Perfil de Tutor
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales" (Paso 3 del wizard), con todos los campos obligatorios del perfil debidamente llenados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales" (Paso 3 del wizard).
 3. Asegurarse de que todos los campos obligatorios del perfil (ej. Nombre Completo, Biografía Corta, Número WhatsApp) estén debidamente llenados.
 4. (Opcional) Dejar vacíos los campos de "Nueva Experiencia" o "Materias", si son considerados opcionales.
 5. Hacer clic en el botón 'Finalizar Registro'.

**Expected Results:**
 - El sistema finaliza el proceso de registro sin arrojar alertas.
 - El sistema redirige a una pantalla posterior o dashboard (dependiendo del flujo post-registro).
 - Se muestra una pantalla con el mensaje "¡Perfil creado! Ahora puedes publicar tus ofertas de tutorías."

## ID: CP-HU-42-R2
**Título:** Ignorar Acción de 'Guardar' al Dejar Campos de Experiencia Vacíos en Modal
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales".

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Hacer clic en el botón '+ Añadir Experiencia' para abrir el modal 'Nueva Experiencia'.
 4. Dejar todos los campos del modal 'Nueva Experiencia' (ej. Puesto, Institución, Fechas) vacíos.
 5. Hacer clic en el botón 'Guardar' dentro del modal 'Nueva Experiencia'.

**Expected Results:**
 - La acción de guardar se ignora silenciosamente.
 - No aparece ningún mensaje de error.
 - El modal 'Nueva Experiencia' permanece en pantalla.

## ID: CP-HU-42-R3
**Título:** Validar y Mantener Formato de Fecha MM/AAAA en Campos de Experiencia
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", con el modal 'Nueva Experiencia' abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Abrir el modal 'Nueva Experiencia' (haciendo clic en '+ Añadir Experiencia' si no está abierto).
 4. Ingresar la fecha '03/2024' en el campo 'Fecha Inicio'.
 5. Mover el foco al campo 'Fecha Fin'.

**Expected Results:**
 - El sistema valida y mantiene el formato de la fecha.
 - El campo 'Fecha Inicio' muestra la fecha digitada con el slash incluido, ej: '03/2024'.

## ID: CP-HU-42-R4
**Título:** Bloquear Ingreso de Caracteres No-Numéricos en Campos de Fecha
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", con el modal 'Nueva Experiencia' abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Abrir el modal 'Nueva Experiencia' (haciendo clic en '+ Añadir Experiencia' si no está abierto).
 4. Intentar ingresar los caracteres 'Hola' en el campo 'Fecha Inicio'.
 5. Intentar ingresar 'Presentes' (con 's' al final) en el campo 'Fecha Fin'.
 6. Intentar ingresar '12-2024' en el campo 'Fecha Fin'.

**Expected Results:**
 - El sistema bloquea el ingreso de caracteres no-numéricos y signos (salvo '/').
 - Las letras y signos no se muestran al teclear en el campo 'Fecha Inicio'.
 - En el campo 'Fecha Fin', solo se permite la palabra exacta 'Presente', y no permite 'Presentes'.
 - El campo 'Fecha Fin' no permite el ingreso de '-'.

## ID: CP-HU-42-R5
**Título:** Mostrar Error por Exceso de Caracteres en Campos de Fecha (Máximo 7)
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", con el modal 'Nueva Experiencia' abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Abrir el modal 'Nueva Experiencia' (haciendo clic en '+ Añadir Experiencia' si no está abierto).
 4. Ingresar la fecha '12/20255' en el campo 'Fecha Inicio'.
 5. Mover el foco al campo 'Fecha Fin' o intentar continuar.

**Expected Results:**
 - El sistema detecta que la fecha excede los 7 caracteres del formato MM/AAAA.
 - Se muestra el mensaje de error en rojo 'Máximo 7 caracteres' debajo del campo de fecha.

## ID: CP-HU-42-R6
**Título:** Añadir Materia como Etiqueta ('Pill')
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", en la sección para añadir materias.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Localizar la sección para añadir materias.
 4. Ingresar 'Cálculo' en el campo de texto 'Escribe una Materia(Ej. Cálculo, Física...)'.
 5. Hacer clic en el botón '+ Agregar'.

**Expected Results:**
 - El campo de texto 'Escribe una Materia(Ej. Cálculo, Física...)' se limpia.
 - Aparece un elemento visual (etiqueta o 'pill') de color celeste claro con el texto 'Cálculo'.
 - La etiqueta incluye una 'x' a la derecha que permite eliminar la materia.

## ID: CP-HU-42-R7
**Título:** Navegación hacia Atrás del Paso 3 ('Detalles Profesionales') al Paso 2 ('Disponibilidad')
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales" (Paso 3 del wizard), con bloques horarios seleccionados previamente en el Paso 2.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales" (Paso 3 del wizard).
 3. Asegurarse de que se han seleccionado previamente bloques horarios en la pantalla "Disponibilidad" (Paso 2).
 4. Hacer clic en el botón inferior izquierdo de '← Atrás Disponibilidad' o en el paso '2 Disponibilidad' del menú superior.

**Expected Results:**
 - El sistema redirige a la pantalla del Paso 2 ('Disponibilidad').
 - Todos los bloques horarios previamente seleccionados en la cuadrícula de la pantalla "Disponibilidad" se conservan intactos.


## ID: CP-HU-42-ADD1
**Título:** Guardar una experiencia exitosa con todos los campos completos
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", en el modal 'Nueva Experiencia' abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Hacer clic en el botón '+ Añadir Experiencia' para abrir el modal 'Nueva Experiencia'.
 4. Ingresar 'Tutor de Programación' en el campo 'Puesto / Rol'.
 5. Ingresar 'Universidad Local' en el campo 'Lugar'.
 6. Ingresar '06/2023' en el campo 'Fecha Inicio'.
 7. Ingresar 'Presente' en el campo 'Fecha Fin'.
 8. Hacer clic en el botón 'Guardar' dentro del modal.

**Expected Results:**
 - El modal se cierra correctamente.
 - La experiencia se agrega a la lista de experiencias.
 - Se visualiza la entrada con 'Tutor de Programación' como Puesto, 'Universidad Local' como Lugar.
 - Se muestra el periodo con las fechas ingresadas.

## ID: CP-HU-42-ADD2
**Título:** Eliminar una experiencia agregada
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", con al menos una experiencia agregada.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Localizar una experiencia agregada en la sección "Experiencia".
 4. Hacer clic en el botón '×' (Eliminar experiencia) de la experiencia.

**Expected Results:**
 - La experiencia se elimina inmediatamente de la lista.
 - No aparece ningún mensaje de confirmación o error.
 - La lista de experiencias se actualiza correctamente.

## ID: CP-HU-42-ADD3
**Título:** Eliminar una materia agregada
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", con al menos una materia agregada.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Agregar la materia 'Cálculo' en el campo de texto y hacer clic en '+ Agregar'.
 4. Verificar que aparece la etiqueta 'Cálculo'.
 5. Hacer clic en el botón '×' de la etiqueta 'Cálculo'.

**Expected Results:**
 - La etiqueta 'Cálculo' se elimina de la lista de materias.
 - El campo de texto se limpia.
 - No aparece ningún mensaje de error.

## ID: CP-HU-42-ADD4
**Título:** Cancelar el modal de Nueva Experiencia sin guardar datos
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", en el modal 'Nueva Experiencia' abierto con datos parcialmente ingresados.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Hacer clic en el botón '+ Añadir Experiencia' para abrir el modal 'Nueva Experiencia'.
 4. Ingresar datos en algunos campos (ej. 'Tutor' en Puesto).
 5. Hacer clic en el botón 'Cancelar' del modal.

**Expected Results:**
 - El modal se cierra correctamente.
 - No se agrega experiencia alguna a la lista.
 - Se regresa a la vista principal de "Detalles Profesionales".
 - No aparece ningún mensaje de error.

## ID: CP-HU-42-ADD5
**Título:** Intentar agregar una materia sin escribir nada en el campo
**Prioridad:** Media
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", en la sección de materias.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Dejar el campo de text 'Escribe una materia...' vacío.
 4. Hacer clic en el botón '+ Agregar'.

**Expected Results:**
 - No se agrega materia alguna a la lista.
 - No aparece ninguna etiqueta o mensaje de error.
 - El campo permanece vacío y listo para una nueva entrada.

## ID: CP-HU-42-ADD6
**Título:** Agregar múltiples materias exitosamente
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", en la sección de materias.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Agregar la materia 'Física' y hacer clic en '+ Agregar'.
 4. Agregar la materia 'Química' y hacer clic en '+ Agregar'.
 5. Agregar la materia 'Álgebra' y hacer clic en '+ Agregar'.
 6. Verificar que todas las materias aparecen como etiquetas en la lista.

**Expected Results:**
 - Se visualizan tres etiquetas (pills) con los textos 'Física', 'Química' y 'Álgebra'.
 - Cada etiqueta tiene un botón '×' para eliminarla.
 - El campo de text se limpia después de cada agregación.
 - No aparece ningún mensaje de error.

## ID: CP-HU-42-ADD7
**Título:** Validar comportamiento del campo Fecha Fin con "Presente"
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Tutor logueado y en la interfaz de "Detalles Profesionales", en el modal 'Nueva Experiencia' abierto.

**Steps:**
 1. Iniciar sesión como Tutor.
 2. Navegar a la interfaz de "Detalles Profesionales".
 3. Abrir el modal 'Nueva Experiencia' (haciendo clic en '+ Añadir Experiencia' si no está abierto).
 4. Ingresar '06/2023' en el campo 'Fecha Inicio'.
 5. Ingresar exactamente 'Presente' en el campo 'Fecha Fin'.
 6. Proceder a llenar los otros campos (Puesto, Lugar) y guardar.

**Expected Results:**
 - El sistema acepta la palabra 'Presente' como valor válido para el campo 'Fecha Fin'.
 - La experiencia se guarda exitosamente.
 - El periodo se muestra como '06/2023 — Presente' o similar en la lista de experiencias.
