/**
 * Configuración de URLs para las pruebas
 * Cambia entre local y producción según necesites
 */

// URL base - cambiar entre estas dos según donde quieras ejecutar
// Local: http://localhost:3001
// Producción: https://politutorias-frontend.vercel.app

export const BASE_URL = 'http://localhost:3001';
//export const BASE_URL = 'https://politutorias-frontend.vercel.app';

export const DASHBOARD_TUTOR_URL = `${BASE_URL}/dashboard/tutor`;
export const BANDEJA_ENTRADA_URL = `${BASE_URL}/bandeja`;
export const ENCUENTRA_TUTORIA_URL = `${BASE_URL}/encuentra-tutoria`;
export const TUTOR_REGISTRO_URL = `${BASE_URL}/tutor/registro`;
export const OFERTA_HU09_PRIMARIA_URL = `${BASE_URL}/ofertas/b2c3d4e5-f6a7-4890-b234-567890abcdef`;
export const OFERTA_HU09_SECUNDARIA_URL = `${BASE_URL}/ofertas/3ec326b2-188f-45e4-a546-ba7826c8150d`;
export const MIS_SOLICITUDES_URL = `${BASE_URL}/dashboard/solicitudes`;
