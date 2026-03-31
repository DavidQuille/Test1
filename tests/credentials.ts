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
  TUTOR_REGISTRO: {
    email: 'd.q1@epn.edu.ec',
    password: '123456',
    name: 'Tutor Registro',
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
export const TUTOR_REG = CREDENTIALS.TUTOR_REGISTRO;
export const STUDENT = CREDENTIALS.STUDENT;

export const getCredentialsByUrl = (url: string) => {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes('encuentra')) {
    return STUDENT;
  }

  if (normalizedUrl.includes('/tutor/registro')) {
    return TUTOR_REG;
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

export const getNextTutorRegisterEmail = (index: number = 1) => {
  return {
    email: `d.q${index}@epn.edu.ec`,
    password: '123456',
    name: `Tutor Registro ${index}`,
    role: 'Tutor',
  };
};
