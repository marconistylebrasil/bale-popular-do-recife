const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>header.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));
document.getElementById('year')&&(document.getElementById('year').textContent=new Date().getFullYear());
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>30);
onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('main section>*,.cards article,.team-grid article,.recognition-grid article,.timeline article').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=Math.min(i%5,4)*55+'ms';observer.observe(el)});
