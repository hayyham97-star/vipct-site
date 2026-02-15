// =============================
// VIP Coach Transfers - app.js
// =============================

(function(){

  const DEFAULT_LANG = "en";

  // --- Get saved language ---
  function getSavedLang(){
    return localStorage.getItem("vipct_lang") || DEFAULT_LANG;
  }

  function saveLang(lang){
    localStorage.setItem("vipct_lang", lang);
  }

  // --- Apply language ---
  function applyLanguage(lang){
    if(!window.I18N || !window.I18N[lang]) return;

    const dict = window.I18N[lang];

    // Replace text for elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(dict[key]){
        el.textContent = dict[key];
      }
    });

    // Update document language
    document.documentElement.lang = lang;

    // RTL support for Arabic
    if(lang === "ar"){
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }

    saveLang(lang);
  }

  // --- Language buttons ---
  function initLanguageSwitcher(){
    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const lang = btn.getAttribute("data-lang");
        applyLanguage(lang);
      });
    });
  }

  // --- Highlight active navigation ---
  function highlightActiveNav(){
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("[data-page]").forEach(link=>{
      if(link.getAttribute("href") === currentPage){
        link.classList.add("active");
      }
    });
  }

  // --- WhatsApp Auto-Link ---
  function initWhatsAppLinks(){
    const number = "420775091730";
    document.querySelectorAll("[data-wa]").forEach(el=>{
      el.setAttribute("href", `https://wa.me/${number}`);
      el.setAttribute("target", "_blank");
    });
  }

  // --- Initialize ---
  document.addEventListener("DOMContentLoaded", ()=>{
    initLanguageSwitcher();
    highlightActiveNav();
    initWhatsAppLinks();

    const savedLang = getSavedLang();
    applyLanguage(savedLang);
  });

})();
