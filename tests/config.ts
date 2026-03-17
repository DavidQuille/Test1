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
export const BANDEJA_ENTRADA_URL = `${BASE_URL}/bandeja`;
export const ENCUENTRA_TUTORIA_URL = `${BASE_URL}/encuentra-tutoria`;
export const TUTOR_REGISTRO_URL = `${BASE_URL}/tutor/registro`;
export const OFERTA_HU09_PRIMARIA_URL = `${BASE_URL}/ofertas/62f81f9d-c966-4012-943d-f8b902cc9612`;
export const OFERTA_HU09_SECUNDARIA_URL = `${BASE_URL}/ofertas/9f12b5d2-d828-43fa-b732-f946f301642d`;
export const MIS_SOLICITUDES_URL = `${BASE_URL}/dashboard/solicitudes`;
