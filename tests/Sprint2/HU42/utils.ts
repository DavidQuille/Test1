/**
 * Utilidades para generar datos aleatorios para pruebas
 */

/**
 * Lista de nombres comunes para tutores
 */
const NOMBRES = [
  'Daniela Castro',
  'Juan Mendoza',
  'María García',
  'Carlos López',
  'Ana Rodríguez',
  'Roberto Silva',
  'Patricia Fernández',
  'Diego Martínez',
  'Laura Gómez',
  'Miguel Ramírez',
  'Sofía Torres',
  'Andrés Pérez',
  'Isabella Sánchez',
  'Fernando Ruiz',
  'Valentina Moreno',
];

/**
 * Genera un nombre aleatorio de la lista
 */
export function getNombreAleatorio(): string {
  return NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
}

/**
 * Genera un número de WhatsApp válido en formato EC (593)
 * Formato: 593 + 9 dígitos = 593XXXXXXXXX (12 dígitos totales)
 */
export function getNumeroWhatsAppAleatorio(): string {
  const prefijo = '593';
  const operador = Math.floor(Math.random() * 9).toString(); // 0-9
  const numero = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0'); // 8 dígitos restantes
  
  return `${prefijo}${operador}${numero}`;
}

/**
 * Genera una biografía aleatoria
 */
export function getBiografiaAleatoria(): string {
  const biografias = [
    'Tengo más de 5 años de experiencia en desarrollo de software y me encanta enseñar conceptos complejos de forma clara.',
    'Ingeniero especializado en programación con 3 años tutelando estudiantes universitarios.',
    'Profesional con experiencia en matemáticas avanzadas, listo para ayudarte a dominar esta materia.',
    'Educador apasionado con enfoque en el aprendizaje personalizado y comprensión profunda.',
    'Experto en física y cálculo con metodología didáctica comprobada.',
    'Tutor dedicado con amplia experiencia en algoritmos y estructuras de datos.',
    'Especialista en ciencias con capacidad para hacer los conceptos accesibles y entretenidos.',
  ];
  
  return biografias[Math.floor(Math.random() * biografias.length)];
}
