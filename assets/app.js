// ============================================
// VIP Coach Transfers - assets/app.js
// - Language switch (EN/CZ/AR)
// - Nested i18n keys support (e.g. nav.home, badges.0)
// - Placeholder translation via data-i18n-placeholder
// - RTL support for Arabic
// - WhatsApp auto-links
// - Active nav highlight
// ============================================

(function () {
  const LANG_KEY = "vipct_lang";
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en", "cz", "ar"];
  const WA_NUMBER = "420775091730";

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    return SUPPORTED.includes(saved) ? saved : DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(LANG_KEY, lang);
    applyLanguage(lang);
    setLangButtons(lang);
  }

  // Supports dot notation like "nav.home" and arrays like "badges.0"
  function getValue(obj, path) {
    return path.split(".").reduce((acc, part) => {
      if (acc == null) return undefined;
      if (/^\d+$/.test(part)) return acc[Number(part)];
      return acc[part];
    }, obj);
  }

  function setLangButtons(lang) {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function applyLanguage(lang) {
    if (!window.I18N || !window.I18N[lang]) return;
    const dict = window.I18N[lang];

    // Set document lang (CZ should be "cs" technically)
    document.documentElement.lang = (lang === "cz" ? "cs" : lang);

    // RTL for Arabic
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }

    // Translate text nodes
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const val = getValue(dict, key);
      if (typeof val === "string") el.textContent = val;
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const val = getValue(dict, key);
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });

    // Translate nav links if dict.nav exists and you use data-nav="home" etc.
    if (dict.nav) {
      Object.keys(dict.nav).forEach((k) => {
        const el = document.querySelector(`[data-nav='${k}']`);
        if (el) el.textContent = dict.nav[k];
      });
    }

    // WhatsApp links (data-wa)
    document.querySelectorAll("[data-wa]").forEach((el) => {
      el.setAttribute("href", `https://wa.me/${WA_NUMBER}`);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  function highlightActiveNav() {
    const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const map = {
      "index.html": "home",
      "services.html": "services",
      "fleet.html": "fleet",
      "programs.html": "programs",
      "quote.html": "quote",
      "contact.html": "contact",
      "thankyou.html": "quote"
    };
    const key = map[current] || "home";

    document.querySelectorAll(".links a").forEach((a) => a.classList.remove("active"));
    const active = document.querySelector(`.links a[data-page='${key}']`);
    if (active) active.classList.add("active");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Language buttons
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });

    const lang = getLang();
    setLangButtons(lang);
    applyLanguage(lang);
    highlightActiveNav();
  });
})();
