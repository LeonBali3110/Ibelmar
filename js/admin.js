import { getLang, t } from "i18n";
import { getContent, setContent, saveContent, render } from "app";

const adminOpen = document.getElementById("admin-open");
const adminModal = document.getElementById("admin-modal");
const adminClose = document.getElementById("admin-close");
const adminBackdrop = document.getElementById("admin-close-backdrop");

const loginForm = document.getElementById("admin-login");
const editorForm = document.getElementById("admin-editor");
const loginFeedback = document.getElementById("admin-login-feedback");
const saveFeedback = document.getElementById("admin-save-feedback");

const heroTitleInput = document.getElementById("heroTitleInput");
const heroSubtitleInput = document.getElementById("heroSubtitleInput");
const heroCtaInput = document.getElementById("heroCtaInput");

const infoTitleInput = document.getElementById("infoTitleInput");
const infoTextInput = document.getElementById("infoTextInput");

const contactPhoneInput = document.getElementById("contactPhoneInput");
const contactEmailInput = document.getElementById("contactEmailInput");
const contactAddressInput = document.getElementById("contactAddressInput");

const statYearsInput = document.getElementById("admin-stat-years");
const statSlaInput = document.getElementById("admin-stat-sla");
const statClientsInput = document.getElementById("admin-stat-clients");

const instagramInput = document.getElementById("instagramInput");
const whatsappInput = document.getElementById("whatsappInput");
const mapsInput = document.getElementById("mapsInput");
const backgroundFileInput = document.getElementById("backgroundFileInput");
const backgroundPreview = document.getElementById("backgroundPreview");

const servicesEditor = document.getElementById("servicesEditor");
const addServiceBtn = document.getElementById("addServiceBtn");
const resetContentBtn = document.getElementById("resetContentBtn");
const saveContentBtn = document.getElementById("saveContentBtn");

// Demo credentials (replace with real auth in production):
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

function openModal() {
  adminModal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  adminModal.setAttribute("aria-hidden", "true");
}

function fillEditorFields() {
  const data = getContent();

  heroTitleInput.value = data.hero.title[getLang()] || "";
  heroSubtitleInput.value = data.hero.subtitle[getLang()] || "";
  heroCtaInput.value = data.hero.cta[getLang()] || "";

  infoTitleInput.value = data.info.title[getLang()] || "";
  infoTextInput.value = data.info.text[getLang()] || "";

  contactPhoneInput.value = data.contact.phone || "";
  contactEmailInput.value = data.contact.email || "";
  contactAddressInput.value = data.contact.address || "";

  instagramInput.value = data.socials.instagram || "";
  whatsappInput.value = data.socials.whatsapp || "";
  mapsInput.value = data.socials.maps || "";
  // background preview (keep existing image shown but don't change it)
  const bg = (data.background && data.background.image) || "";
  if (backgroundPreview) {
    if (bg) {
      backgroundPreview.src = bg;
      backgroundPreview.style.display = "block";
    } else {
      backgroundPreview.src = "";
      backgroundPreview.style.display = "none";
    }
  }

  // stats
  statYearsInput && (statYearsInput.value = (data.info && data.info.stats && data.info.stats.years) || "");
  statSlaInput && (statSlaInput.value = (data.info && data.info.stats && data.info.stats.sla) || "");
  statClientsInput && (statClientsInput.value = (data.info && data.info.stats && data.info.stats.clients) || "");

  renderServicesEditor(data.services);
}

function renderServicesEditor(services) {
  servicesEditor.innerHTML = "";
  services.forEach((svc, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "service-edit";

    const tLabel = document.createElement("label");
    tLabel.textContent = `Título (${getLang().toUpperCase()})`;
    const tInput = document.createElement("input");
    tInput.type = "text";
    tInput.value = svc.title[getLang()] || "";

    const dLabel = document.createElement("label");
    dLabel.textContent = `Descripción (${getLang().toUpperCase()})`;
    const dInput = document.createElement("textarea");
    dInput.rows = 3;
    dInput.value = svc.desc[getLang()] || "";

    const actions = document.createElement("div");
    actions.className = "form-actions";
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn";
    removeBtn.textContent = "Eliminar";
    removeBtn.addEventListener("click", () => {
      const data = getContent();
      const next = [...data.services.slice(0, idx), ...data.services.slice(idx + 1)];
      setContent({ ...data, services: next });
      renderServicesEditor(next);
    });

    wrap.append(tLabel, tInput, dLabel, dInput, actions);
    actions.append(removeBtn);
    servicesEditor.appendChild(wrap);

    // Persist changes on input
    tInput.addEventListener("input", () => {
      const data = getContent();
      data.services[idx].title[getLang()] = tInput.value;
      saveContent(data);
    });
    dInput.addEventListener("input", () => {
      const data = getContent();
      data.services[idx].desc[getLang()] = dInput.value;
      saveContent(data);
    });
  });
}

function ensureLoggedIn() {
  const token = localStorage.getItem("adminToken");
  return token === "ok";
}

function bindAdmin() {
  adminOpen?.addEventListener("click", () => {
    openModal();
    // Show login or editor depending on auth
    if (ensureLoggedIn()) {
      loginForm.classList.add("hidden");
      editorForm.classList.remove("hidden");
      fillEditorFields();
    } else {
      loginForm.classList.remove("hidden");
      editorForm.classList.add("hidden");
      loginFeedback.textContent = "";
    }
  });
  adminClose?.addEventListener("click", closeModal);
  adminBackdrop?.addEventListener("click", closeModal);

  loginForm?.addEventListener("submit", e => {
    e.preventDefault();
    const user = document.getElementById("admin-user").value.trim();
    const pass = document.getElementById("admin-pass").value;
    if (user === DEMO_USER && pass === DEMO_PASS) {
      localStorage.setItem("adminToken", "ok");
      loginFeedback.textContent = "";
      loginForm.classList.add("hidden");
      editorForm.classList.remove("hidden");
      fillEditorFields();
      // closeModal(); // cerrar modal tras iniciar sesión
    } else {
      loginFeedback.textContent = t("admin_login_fail");
    }
  });

  addServiceBtn?.addEventListener("click", () => {
    const data = getContent();
    const newSvc = {
      title: { es: "Nuevo servicio", ca: "Nou servei" },
      desc: { es: "Descripción del servicio.", ca: "Descripció del servei." },
    };
    const next = [...data.services, newSvc];
    setContent({ ...data, services: next });
    renderServicesEditor(next);
  });


  resetContentBtn?.addEventListener("click", () => {
    localStorage.removeItem("siteContent");
    const data = getContent(); // old reference; reload explicitly
    const fresh = {
      hero: { ...data.hero },
      info: { ...data.info },
      services: [...data.services],
      contact: { ...data.contact },
      socials: { ...data.socials },
    };
    // Actually reset to default by replacing content with default from app.js load cycle
    window.location.reload();
  });

  editorForm?.addEventListener("submit", e => {
    e.preventDefault();
    const data = getContent();
    data.hero.title[getLang()] = heroTitleInput.value;
    data.hero.subtitle[getLang()] = heroSubtitleInput.value;
    data.hero.cta[getLang()] = heroCtaInput.value;

    data.info.title[getLang()] = infoTitleInput.value;
    data.info.text[getLang()] = infoTextInput.value;

    // stats
    if (!data.info.stats) data.info.stats = { years: "", sla: "", clients: "" };
    data.info.stats.years = statYearsInput ? statYearsInput.value : data.info.stats.years;
    data.info.stats.sla = statSlaInput ? statSlaInput.value : data.info.stats.sla;
    data.info.stats.clients = statClientsInput ? statClientsInput.value : data.info.stats.clients;

    data.contact.phone = contactPhoneInput.value;
    data.contact.email = contactEmailInput.value;
    data.contact.address = contactAddressInput.value;

    data.socials.instagram = instagramInput.value;
    data.socials.whatsapp = whatsappInput.value;
    data.socials.maps = mapsInput.value;

    // background: only overwrite if a new file was uploaded (data URL)
    if (!data.background) data.background = {};
    if (typeof pickedBackgroundDataUrl !== 'undefined' && pickedBackgroundDataUrl) {
      data.background.image = pickedBackgroundDataUrl;
    }

    saveContent(data);
    render();
    saveFeedback.textContent = t("admin_saved");
    setTimeout(() => (saveFeedback.textContent = ""), 2000);
    // closeModal(); // cerrar modal tras guardar cambios
  });
}

// Background handling: file upload only
let pickedBackgroundDataUrl = null;
backgroundFileInput?.addEventListener("change", e => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    pickedBackgroundDataUrl = reader.result;
    if (backgroundPreview) {
      backgroundPreview.src = pickedBackgroundDataUrl;
      backgroundPreview.style.display = "block";
    }
  };
  reader.readAsDataURL(f);
});

document.addEventListener("DOMContentLoaded", () => {
  bindAdmin();
});