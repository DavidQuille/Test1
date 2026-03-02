/**
 * Configuración de URLs para las pruebas
 * Cambia entre local y producción según necesites
 */

// URL base - cambiar entre estas dos según donde quieras ejecutar
// Local: http://localhost:3001
// Producción: https://politutorias-frontend.vercel.app

//export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://politutorias-frontend.vercel.app';

export const DASHBOARD_TUTOR_URL = `${BASE_URL}/dashboard/tutor`;
export const ENCUENTRA_TUTORIA_URL = `${BASE_URL}/encuentra-tutoria`;
export const TUTOR_REGISTRO_URL = `${BASE_URL}/tutor/registro`;
