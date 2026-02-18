// Sticky header
window.addEventListener("scroll",()=>{
  document.querySelector("header")
  .classList.toggle("scrolled",window.scrollY>50)
})

// Scroll animation
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible")
    }
  })
})

document.querySelectorAll(".card").forEach(el=>{
  observer.observe(el)
})

// Language switch
function setLang(lang){
  localStorage.setItem("lang",lang)
  const t = translations[lang]
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.innerText = t[el.dataset.i18n]
  })
  document.documentElement.dir = lang==="ar"?"rtl":"ltr"
}

const savedLang = localStorage.getItem("lang") || "en"
setLang(savedLang)

const counters = document.querySelectorAll(".counter");
counters.forEach(counter=>{
  const update=()=>{
    const target=+counter.getAttribute("data-target")
    const c=+counter.innerText
    const inc=target/200
    if(c<target){
      counter.innerText=Math.ceil(c+inc)
      setTimeout(update,10)
    }else{
      counter.innerText=target
    }
  }
  update()
})
