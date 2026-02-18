
const translations={
en:{hero:"Luxury Chauffeur & VIP Transfers Across Europe"},
ar:{hero:"خدمات نقل فاخرة وسائق خاص في أوروبا"}
};

function setLang(lang){
document.documentElement.dir = lang==="ar"?"rtl":"ltr";
document.querySelectorAll("[data-i18n]").forEach(el=>{
el.innerText=translations[lang][el.dataset.i18n];
});
}

window.onload=function(){
const counters=document.querySelectorAll('.counter');
counters.forEach(counter=>{
let target=+counter.dataset.target;
let count=0;
let interval=setInterval(()=>{
count+=target/100;
if(count>=target){counter.innerText=target;clearInterval(interval)}
else{counter.innerText=Math.ceil(count)}
},20);
});
}
