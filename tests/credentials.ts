/**
 * Credenciales para pruebas automatizadas
 * Usa cualquiera de estas cuentas según el rol requerido
 */

export const CREDENTIALS = {
  TUTOR_1: {
    email: 'daniel.v@epn.edu.ec',
    password: '123456',
    name: 'Daniel Valdiviezo',
    role: 'Tutor',
  },
  TUTOR_2: {
    email: 'maria.g@epn.edu.ec',
    password: '123456',
    name: 'María García',
    role: 'Tutor',
  },
  STUDENT: {
    email: 'patricio.c@epn.edu.ec',
    password: '123456',
    name: 'Patricio Chancusig',
    role: 'Estudiante',
  },
};

// Alias por rol
export const TUTOR = CREDENTIALS.TUTOR_1;
export const STUDENT = CREDENTIALS.STUDENT;

export const getCredentialsByUrl = (url: string) => {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes('encuentra')) {
    return STUDENT;
  }

  if (
    normalizedUrl.includes('/dashboard/tutor') ||
    normalizedUrl.includes('/tutor/') ||
    normalizedUrl.includes('/bandeja')
  ) {
    return TUTOR;
  }

  return STUDENT;
};
