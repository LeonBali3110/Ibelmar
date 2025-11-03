const LANG_KEY = "lang";
const supported = ["es", "ca"];

const dict = {
  es: {
    nav_inicio: "Inicio",
    nav_info: "Información",
    nav_servicios: "Servicios",
    nav_contacto: "Contacto",
    hero_title: "Mantenimiento de equipos informáticos y redes",
    hero_subtitle: "Para empresas y particulares. Servicio profesional, rápido y confiable.",
    hero_cta: "Solicitar presupuesto",
    info_title: "Quiénes somos",
    info_text:
      "Somos un equipo especializado en mantenimiento de equipos informáticos, redes y seguridad. Trabajamos con empresas y particulares ofreciendo soluciones a medida.",
    stat_years: "Años de experiencia",
    stat_sla: "Tiempo de respuesta",
    stat_clients: "Clientes",
    services_title: "Servicios",
    contact_title: "Contacto",
    contact_text: "Atendemos de lunes a viernes de 9:00 a 18:00.",
    contact_phone: "Teléfono",
    contact_email: "Email",
    contact_address: "Dirección",
    form_name: "Nombre",
    form_email: "Email",
    form_message: "Mensaje",
    form_submit: "Enviar",
    form_sent: "Gracias. Tu mensaje ha sido enviado.",
    admin_title: "Panel de administración",
    admin_user: "Usuario",
    admin_pass: "Contraseña",
    admin_login: "Acceder",
    admin_login_fail: "Credenciales no válidas.",
    admin_section_hero: "Inicio",
    admin_section_info: "Información",
    admin_section_services: "Servicios",
    admin_section_contact: "Contacto",
    admin_hero_title: "Título",
    admin_hero_subtitle: "Subtítulo",
    admin_hero_cta: "Texto CTA",
    admin_info_title: "Título",
    admin_info_text: "Descripción",
    admin_contact_phone: "Teléfono",
    admin_contact_email: "Email",
    admin_contact_address: "Dirección",
    admin_add_service: "Añadir servicio",
    admin_reset: "Restablecer",
    admin_save: "Guardar cambios",
    admin_saved: "Contenido guardado.",
  },
  ca: {
    nav_inicio: "Inici",
    nav_info: "Informació",
    nav_servicios: "Serveis",
    nav_contacto: "Contacte",
    hero_title: "Manteniment d'equips informàtics i xarxes",
    hero_subtitle: "Per a empreses i particulars. Servei professional, ràpid i fiable.",
    hero_cta: "Sol·licitar pressupost",
    info_title: "Qui som",
    info_text:
      "Som una empresa dedicada al manteniment d’equips informàtics i xarxes. Fem serveis a empreses i particulars. Disposem de botiga – Taller. Som associats de la cadena BEEP Informàtica.",
    stat_years: "Anys d'experiència",
    stat_sla: "Temps de resposta",
    stat_clients: "Clients",
    services_title: "Serveis",
    contact_title: "Contacte",
    contact_text: "Atenem de dilluns a divendres de 9:00 a 18:00.",
    contact_phone: "Telèfon",
    contact_email: "Email",
    contact_address: "Adreça",
    form_name: "Nom",
    form_email: "Email",
    form_message: "Missatge",
    form_submit: "Enviar",
    form_sent: "Gràcies. El teu missatge s'ha enviat.",
    admin_title: "Panell d'administració",
    admin_user: "Usuari",
    admin_pass: "Contrasenya",
    admin_login: "Accedir",
    admin_login_fail: "Credencials no vàlides.",
    admin_section_hero: "Inici",
    admin_section_info: "Informació",
    admin_section_services: "Serveis",
    admin_section_contact: "Contacte",
    admin_hero_title: "Títol",
    admin_hero_subtitle: "Subtítol",
    admin_hero_cta: "Text CTA",
    admin_info_title: "Títol",
    admin_info_text: "Descripció",
    admin_contact_phone: "Telèfon",
    admin_contact_email: "Email",
    admin_contact_address: "Adreça",
    admin_add_service: "Afegir servei",
    admin_reset: "Restablir",
    admin_save: "Desar canvis",
    admin_saved: "Contingut desat.",
  },
};

let current = localStorage.getItem(LANG_KEY) || "es";
if (!supported.includes(current)) current = "es";
localStorage.setItem(LANG_KEY, current);

export function getLang() {
  return current;
}
export function setLang(lang) {
  if (!supported.includes(lang)) return;
  current = lang;
  localStorage.setItem(LANG_KEY, current);
}
export function t(key) {
  return dict[current][key] || key;
}
export function onLangChange(cb) {
  window.addEventListener("lang:change", cb);
}
export function triggerLangChange() {
  window.dispatchEvent(new CustomEvent("lang:change", { detail: { lang: current } }));
}

