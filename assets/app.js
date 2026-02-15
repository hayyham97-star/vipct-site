// ===============================
// VIP Coach Transfers - Premium App.js
// ===============================

(function(){

  const DEFAULT_LANG = "en";
  const WA_NUMBER = "420775091730";

  // -------------------------
  // Language System
  // -------------------------

  function getSavedLang(){
    return localStorage.getItem("vipct_lang") || DEFAULT_LANG;
  }

  function saveLang(lang){
    localStorage.setItem("vipct_lang", lang);
  }

  function applyLanguage(lang){
    if(!window.I18N || !window.I18N[lang]) return;

    const dict = window.I18N[lang];

    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(dict[key]) el.textContent = dict[key];
    });

    document.documentElement.lang = lang;

    if(lang === "ar"){
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }

    saveLang(lang);
  }

  function initLanguageSwitcher(){
    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const lang = btn.getAttribute("data-lang");
        applyLanguage(lang);
      });
    });
  }

  // -------------------------
  // WhatsApp Auto Link
  // -------------------------

  function initWhatsAppLinks(){
    document.querySelectorAll("[data-wa]").forEach(el=>{
      el.setAttribute("href", `https://wa.me/${WA_NUMBER}`);
      el.setAttribute("target", "_blank");
    });
  }

  // -------------------------
  // Sticky Header Effect
  // -------------------------

  function initStickyHeader(){
    const header = document.querySelector("header");

    window.addEventListener("scroll", ()=>{
      if(window.scrollY > 50){
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
  }

  // -------------------------
  // Smooth Page Transitions
  // -------------------------

  function initPageTransitions(){

    document.body.classList.add("fade-in");

    document.querySelectorAll("a").forEach(link=>{
      if(link.hostname === window.location.hostname && !link.hasAttribute("target")){
        link.addEventListener("click", function(e){
          const href = this.getAttribute("href");

          if(href && !href.startsWith("#")){
            e.preventDefault();
            document.body.classList.add("fade-out");

            setTimeout(()=>{
              window.location.href = href;
            }, 300);
          }
        });
      }
    });
  }

  // -------------------------
  // Scroll Animations
  // -------------------------

  function initScrollAnimations(){

    const elements = document.querySelectorAll(".card, .sectionTitle, .heroCard");

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("animate");
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el=>{
      el.classList.add("hidden");
      observer.observe(el);
    });
  }

  // -------------------------
  // Loading Screen
  // -------------------------

  function initLoadingScreen(){

    const loader = document.createElement("div");
    loader.id = "pageLoader";
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">VIP</div>
        <div class="loader-spinner"></div>
      </div>
    `;

    document.body.appendChild(loader);

    window.addEventListener("load", ()=>{
      loader.classList.add("hide");
      setTimeout(()=>{
        loader.remove();
      }, 600);
    });
  }

  // -------------------------
  // Active Nav Highlight
  // -------------------------

  function highlightActiveNav(){
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("[data-page]").forEach(link=>{
      if(link.getAttribute("href") === currentPage){
        link.classList.add("active");
      }
    });
  }

  // -------------------------
  // Initialize Everything
  // -------------------------

  document.addEventListener("DOMContentLoaded", ()=>{

    initLoadingScreen();
    initLanguageSwitcher();
    initWhatsAppLinks();
    initStickyHeader();
    initPageTransitions();
    initScrollAnimations();
    highlightActiveNav();

    applyLanguage(getSavedLang());
  });

})();
