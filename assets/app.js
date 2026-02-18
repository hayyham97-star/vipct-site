window.addEventListener("scroll",()=>{
document.querySelector("header")
.classList.toggle("scrolled",window.scrollY>60)
})

function setLang(lang){
localStorage.setItem("lang",lang)
const t=translations[lang]
document.querySelectorAll("[data-i18n]").forEach(el=>{
el.innerText=t[el.dataset.i18n]
})
document.documentElement.dir=lang==="ar"?"rtl":"ltr"
}

setLang(localStorage.getItem("lang")||"en")

const counters=document.querySelectorAll(".counter")
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const counter=entry.target
const target=+counter.getAttribute("data-target")
let c=0
const inc=target/200
const update=()=>{
if(c<target){
c+=inc
counter.innerText=Math.ceil(c)
setTimeout(update,10)
}else{
counter.innerText=target
}
}
update()
observer.unobserve(counter)
}
})
})

counters.forEach(c=>observer.observe(c))
