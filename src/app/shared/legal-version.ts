/**
 * Versión y datos de contacto de los documentos legales.
 *
 * `LEGAL_VERSION` es el mismo valor que la API de Escape Room Logger guarda
 * junto a cada consentimiento (variable `PRIVACY_POLICY_VERSION`). Al publicar
 * un cambio en la política o en los términos hay que **subirla aquí y en el
 * backend a la vez**: es lo que permite acreditar qué redacción aceptó cada
 * persona y lo que hace que la app vuelva a pedir la aceptación.
 *
 * Antes la página mostraba `new Date()` como fecha de actualización, de modo
 * que decía haberse actualizado hoy cualquier día que se visitara y no había
 * forma de saber qué texto estaba vigente.
 */
export const LEGAL_VERSION = '2026-10-16';

/** Fecha de la última revisión, en texto, para mostrarla en la cabecera. */
export const LEGAL_LAST_UPDATED = '16 de octubre de 2026';

/** Canal para ejercer los derechos y para las solicitudes de retirada. */
export const LEGAL_CONTACT_EMAIL = 'info@carajillolabs.com';
