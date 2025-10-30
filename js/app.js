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
      es: "Somos un equipo especializado en mantenimiento de equipos informáticos, redes y seguridad. Trabajamos con empresas y particulares ofreciendo soluciones a medida.",
      ca: "Som un equip especialitzat en manteniment d'equips informàtics, xarxes i seguretat. Treballem amb empreses i particulars oferint solucions a mida.",
    },
    stats: {
      years: "10+",
      sla: "24h",
      clients: "120+",
    },
  },
  services: [
    {
      title: { es: "Mantenimiento preventivo", ca: "Manteniment preventiu" },
      desc: {
        es: "Revisiones periódicas de hardware y software para evitar incidencias.",
        ca: "Revisions periòdiques de hardware i software per evitar incidències.",
      },
    },
    {
      title: { es: "Redes y cableado", ca: "Xarxes i cablejat" },
      desc: {
        es: "Diseño, instalación y optimización de redes para oficinas y hogares.",
        ca: "Disseny, instal·lació i optimització de xarxes per a oficines i llars.",
      },
    },
    {
      title: { es: "Soporte remoto y onsite", ca: "Suport remot i presencial" },
      desc: {
        es: "Atención rápida por remoto y visitas programadas cuando sea necesario.",
        ca: "Atenció ràpida per remot i visites programades quan calgui.",
      },
    },
  ],
  contact: {
    phone: "+34 600 000 000",
    email: "info@empresa-it.es",
    address: "Carrer Exemple, 123, Barcelona",
  },
  socials: {
    instagram: "https://instagram.com/",
    whatsapp: "https://wa.me/600000000",
    maps: "https://maps.google.com/?q=Carrer%20Exemple%20123%20Barcelona",
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