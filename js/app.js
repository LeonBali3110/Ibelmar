import { getLang, setLang, t, onLangChange, triggerLangChange } from "i18n";

const CONTENT_KEY = "siteContent";

const defaultContent = {
  hero: {
    title: {
      es: "Mantenimiento de equipos informáticos y redes",
      ca: "Manteniment d'equips informàtics i xarxes",
    },
    subtitle: {
      es: "Para empresas y particulares. Servicio profesional, rápido y confiable.",
      ca: "Per a empreses i particulars. Servei professional, ràpid i fiable.",
    },
    cta: { es: "Solicitar presupuesto", ca: "Sol·licitar pressupost" },
  },
  info: {
    title: { es: "Quiénes somos", ca: "Qui som" },
    text: {
      es: "Somos una empresa dedicacda al mantenimiento de equipos informáticos y redes. Damos servicio a Empresas y particulares.  Disponemos también de tienda-taller. Estamos asociados a BEEP Informàtica. Ofrecemos un servicio profesional y muy cercano al cliente, soluciones personalizadas.",
      ca: "Som una empresa dedicada al manteniment d’equips informàtics i xarxes. Fem serveis a empreses i particulars. Disposem de botiga – Taller. Som associats de la cadena BEEP Informàtica.",
    },
    stats: {
      years: "10+",
      sla: "24h",
      clients: "120+",
    },
  },
  services: [
    {
      title: { es: "Mantenimiento", ca: "Manteniment" },
      desc: {
        es: "Utilizamos herramientas de diagnostico para anticiparnos a posibles fallos, los prevenimos, dado el caso, buscamos la causa,   lo solucionamos y conseguimos que vuelva a estar operativo.",
        ca: "Utilitzem eines de diagnòstic per anticipar-nos a possibles errors i prevenir-los. Si cal, busquem la causa, ho solucionem i aconseguim que torni a estar operatiu.",
      },
    },
    {
      title: { es: "Redes y cableado", ca: "Xarxes i cablejat" },
      desc: {
        es: "Verificamos el buen estado de una red informática, Identificamos  y resolvemos cualquier fallo o riesgo que se encuentre para así garantizar el funcionamiento óptimo de su red informática.",
        ca: "Verifiquem el bon estat d'una xarxa informàtica, identifiquem i resolem qualsevol error o risc que es trobe per garantir el funcionament òptim de la seva xarxa informàtica.",
      },
    },
    {
      title: { es: "Soporte remoto y onsite", ca: "Suport remot i presencial" },
      desc: {
        es: "Atención rápida por remoto y visitas programadas cuando sea necesario. Telefónica o por email.",
        ca: "Atenció ràpida per remot i visites programades quan calgui. Telefònica o per email.",
      },
    },
  ],
  contact: {
    phone: "+34 977 176 776",
    email: "info@ibelmar.com",
    address: "Av. Penedés 3 Local 1, 43720 L'Arboç del Penedés, Tarragona",
  },
  background: {
    // default background matches the CSS fallback
    image: "Imagenes/mantenimiento1.jpeg",
  },
  socials: {
    instagram: "https://ig.me/m/informaticabelmar",
    whatsapp: "https://wa.me/34659249445",
    maps: "https://www.google.com/maps/place/Inform%C3%A1tica+Belmar/@41.2651672,1.5979316,15z/data=!4m2!3m1!1s0x0:0xdd9d7b4044dea339?sa=X&ved=2ahUKEwiH1ISPwvzmAhUCyYUKHXy6Ah8Q_BIwCnoECAwQCg",
  },
};

function loadContent() {
  const raw = localStorage.getItem(CONTENT_KEY);
  if (!raw) return defaultContent;
  try {
    const data = JSON.parse(raw);
    return { ...defaultContent, ...data };
  } catch {
    return defaultContent;
  }
}
export function saveContent(content) {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  render(); // refresh UI
}

let content = loadContent();

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderNavTexts() {
  document.querySelectorAll("[data-nav=inicio]").forEach(el => (el.textContent = t("nav_inicio")));
  document.querySelectorAll("[data-nav=informacion]").forEach(el => (el.textContent = t("nav_info")));
  document.querySelectorAll("[data-nav=servicios]").forEach(el => (el.textContent = t("nav_servicios")));
  document.querySelectorAll("[data-nav=contacto]").forEach(el => (el.textContent = t("nav_contacto")));
}

function renderHero() {
  setText("hero-title", content.hero.title[getLang()]);
  setText("hero-subtitle", content.hero.subtitle[getLang()]);
  const ctaEl = document.getElementById("hero-cta");
  if (ctaEl) ctaEl.textContent = content.hero.cta[getLang()];
}

function renderInfo() {
  setText("info-title", content.info.title[getLang()]);
  setText("info-text", content.info.text[getLang()]);
  setText("stat-years", content.info.stats.years);
  setText("stat-years-label", t("stat_years"));
  setText("stat-sla", content.info.stats.sla);
  setText("stat-sla-label", t("stat_sla"));
  setText("stat-clients", content.info.stats.clients);
  setText("stat-clients-label", t("stat_clients"));
}

function renderServices() {
  setText("services-title", t("services_title"));
  const wrap = document.getElementById("services-list");
  if (!wrap) return;
  wrap.innerHTML = "";
  content.services.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "service-card";
    const h3 = document.createElement("h3");
    h3.textContent = s.title[getLang()];
    const p = document.createElement("p");
    p.textContent = s.desc[getLang()];
    card.append(h3, p);
    wrap.appendChild(card);
  });
}

function renderContact() {
  setText("contact-title", t("contact_title"));
  setText("contact-text", t("contact_text"));
  setText("contact-phone-label", t("contact_phone") + ":");
  setText("contact-email-label", t("contact_email") + ":");
  setText("contact-address-label", t("contact_address") + ":");
  setText("contact-phone", content.contact.phone);
  setText("contact-email", content.contact.email);
  setText("contact-address", content.contact.address);

  const ig = document.getElementById("link-instagram");
  const wa = document.getElementById("link-whatsapp");
  const gm = document.getElementById("link-maps");
  if (ig) ig.href = content.socials.instagram || "#";
  if (wa) wa.href = content.socials.whatsapp || "#";
  if (gm) gm.href = content.socials.maps || "#";
  const mapFrame = document.getElementById("maps-embed");
  if (mapFrame) {
    const base = content.socials.maps || "";
    const embed = base.replace("maps.google.com/?q=", "maps.google.com/maps?q=");
    mapFrame.src = embed ? (embed.includes("output=embed") ? embed : `${embed}&output=embed`) : "";
  }
}

function renderFooter() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // traducir los enlaces del pie de página
  const footerMap = {
    informacion: "nav_info",
    servicios: "nav_servicios",
    contacto: "nav_contacto",
  };
  document.querySelectorAll("[data-footer]").forEach(el => {
    const key = el.getAttribute("data-footer");
    const tkey = footerMap[key];
    if (tkey) el.textContent = t(tkey);
  });
}

function applyBackground() {
  const el = document.getElementById("parte1");
  if (!el) return;
  const bg = content.background && content.background.image ? content.background.image : "";
  if (bg) {
    // preload the image first; if it fails, keep the CSS fallback
    const img = new Image();
    img.onload = () => {
      // keep the same linear-gradient overlay used in the stylesheet
      const gradient = "linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))";
      el.style.backgroundImage = `${gradient}, url('${bg}')`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.style.backgroundRepeat = "no-repeat";
    };
    img.onerror = () => {
      // failed loading admin image -> remove inline style so stylesheet fallback is used
      el.style.backgroundImage = "";
      console.warn("Background image failed to load:", bg);
    };
    img.src = bg;
  } else {
    // no admin background configured -> use stylesheet default
    el.style.backgroundImage = "";
  }
}

function renderFormTexts() {
  setText("form-name-label", t("form_name"));
  setText("form-email-label", t("form_email"));
  setText("form-message-label", t("form_message"));
  setText("form-submit", t("form_submit"));
}

function renderAdminTexts() {
  setText("admin-title", t("admin_title"));
  setText("admin-user-label", t("admin_user"));
  setText("admin-pass-label", t("admin_pass"));
  setText("admin-login-btn", t("admin_login"));
  setText("admin-section-hero", t("admin_section_hero"));
  setText("admin-section-info", t("admin_section_info"));
  setText("admin-section-services", t("admin_section_services"));
  setText("admin-section-contact", t("admin_section_contact"));
  setText("admin-hero-title-label", t("admin_hero_title"));
  setText("admin-hero-subtitle-label", t("admin_hero_subtitle"));
  setText("admin-hero-cta-label", t("admin_hero_cta"));
  setText("admin-info-title-label", t("admin_info_title"));
  setText("admin-info-text-label", t("admin_info_text"));
  setText("admin-contact-phone-label", t("admin_contact_phone"));
  setText("admin-contact-email-label", t("admin_contact_email"));
  setText("admin-contact-address-label", t("admin_contact_address"));
  const addBtn = document.getElementById("addServiceBtn");
  if (addBtn) addBtn.textContent = t("admin_add_service");
  const resetBtn = document.getElementById("resetContentBtn");
  if (resetBtn) resetBtn.textContent = t("admin_reset");
  const saveBtn = document.getElementById("saveContentBtn");
  if (saveBtn) saveBtn.textContent = t("admin_save");
}

export function render() {
  renderNavTexts();
  renderHero();
  renderInfo();
  renderServices();
  renderContact();
  renderFooter();
  applyBackground();
  renderFormTexts();
  renderAdminTexts();
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = getLang().toUpperCase();
}

function setupLangToggle() {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next = getLang() === "es" ? "ca" : "es";
    setLang(next);
    btn.textContent = next.toUpperCase();
    triggerLangChange();
    render();
  });

  onLangChange(() => {
    render();
  });
}

function setupNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  // Close nav on link click (mobile)
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href")?.substring(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    feedback.textContent = t("form_sent");
    form.reset();
    // In real-world, send via fetch to backend
  });
}

export function getContent() {
  return content;
}
export function setContent(newContent) {
  content = newContent;
  saveContent(newContent);
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  setupLangToggle();
  setupNavToggle();
  setupSmoothAnchors();
  setupContactForm();
});
