# Reporte de Scripts de Prueba Automatizados (S1)
> Generado el: 2026-02-27
url: https://politutorias-frontend.vercel.app/encuentra-tutoria

## ID: CP-HU-05-R1
**Título:** Visualización detallada del perfil del tutor en la pantalla de oferta
**Prioridad:** Alta
**Tipo:** Funcional
**Pre-condiciones:** Estudiante logueado y existe al menos una oferta de tutoría publicada.

**Steps:**
 1. Iniciar sesión como Estudiante.
 2. Navegar a la pantalla principal 'Inicio' o donde se listan las ofertas de tutoría.
 3. Seleccionar y hacer clic en una tarjeta de oferta de tutoría para acceder a la pantalla de 'Detalle de la Oferta'.
 4. Observar las secciones de información del tutor presentadas en la pantalla.

**Expected Results:**
 - Se carga la pantalla de 'Detalle de la Oferta'.
 - Se visualizan claramente las secciones 'Sobre el Tutor' y 'Experiencia'.
 - En la sección 'Sobre el Tutor', se muestra:
     - Una imagen de perfil del tutor.
     - El nombre del tutor (ej: 'Juan Pérez').
     - La información académica del tutor (ej: 'FIM - Mecánica ☁️ 9° Semestre').
     - El rating del tutor (ej: '4.8 (15 reseñas)').
     - Una descripción bibliográfica del tutor (ej: 'Soy un apasionado por la mecánica y las matemáticas aplicadas...').
     - Las materias que domina el tutor, listadas como tags (ej: 'Cálculo Vectorial', 'Física I', 'Estática', 'Dinámica', 'Termodinámica').
 - En la sección 'Experiencia', se muestran:
     - Entradas de historial con el Rol, Institución/Lugar y Fechas (ej: 'Ayudante de Cátedra - Estática, EPN, Facultad de Mecánica, 2024 — Presente').
     - Entradas de historial adicionales (ej: 'Tutor Particular - Cálculo y Física, Independiente, 2023 — Presente').
 - No se visualizan detalles específicos de la oferta (ej: precio, modalidad, indicaciones de la reunión) ni opciones directas para contactar por WhatsApp en esta vista del perfil del tutor, solo su información personal y académica.