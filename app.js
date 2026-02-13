(function(){
  const LANG_KEY = "vipct_lang";
  const DEFAULT_LANG = "en";
  const supported = ["en","cz","ar"];

  function getLang(){
    const url = new URL(window.location.href);
    const qp = url.searchParams.get("lang");
    const saved = localStorage.getItem(LANG_KEY);
    const lang = (qp && supported.includes(qp)) ? qp : (saved && supported.includes(saved) ? saved : DEFAULT_LANG);
    return lang;
  }

  function setLang(lang){
    localStorage.setItem(LANG_KEY, lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }

  function t(lang){ return window.I18N[lang] || window.I18N[DEFAULT_LANG]; }

  function applyText(){
    const lang = getLang();
    const dict = t(lang);

    document.documentElement.lang = lang === "cz" ? "cs" : lang;
    document.body.classList.toggle("rtl", lang === "ar");

    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
    });

    const map = dict.nav;
    for (const k of Object.keys(map)){
      const el = document.querySelector(`[data-nav='${k}']`);
      if(el) el.textContent = map[k];
    }

    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      const value = key.split(".").reduce((acc,part)=> acc && acc[part], dict);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-wa]").forEach(a=>{
      a.setAttribute("href","https://wa.me/420775091730");
    });
  }

  function setActiveNav(){
    const path = window.location.pathname.split("/").pop() || "index.html";
    const key = ({
      "index.html":"home",
      "services.html":"services",
      "fleet.html":"fleet",
      "programs.html":"programs",
      "quote.html":"quote",
      "contact.html":"contact",
      "":"home"
    })[path] || "home";

    document.querySelectorAll(".links a").forEach(a=>a.classList.remove("active"));
    const active = document.querySelector(`.links a[data-page='${key}']`);
    if(active) active.classList.add("active");
  }

  window.addEventListener("DOMContentLoaded", ()=>{
    applyText();
    setActiveNav();
  });
})();
