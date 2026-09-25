const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>header.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));
document.getElementById('year')&&(document.getElementById('year').textContent=new Date().getFullYear());
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>30);
onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});

document.querySelectorAll('main section>*,.cards article,.team-grid article,.recognition-grid article,.timeline article').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=Math.min(i%5,4)*55+'ms';observer.observe(el)});
// API de conteúdo do Balé Popular do Recife
const BPR_API_URL = 'https://script.google.com/macros/s/AKfycbzy_hY26RyZ4GQXgOk9kDjqtQyoUcEF-lslp_bySeq_oJsoJBftPdsQm4boGUkGddZl-g/exec';

async function carregarDadosBPR() {
  try {
    const resposta = await fetch(BPR_API_URL);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (!dados.success) {
      throw new Error(dados.erro || 'A API retornou um erro.');
    }

    console.log('Dados do BPR carregados:', dados.site);

    return dados.site;

  } catch (erro) {
    console.error('Erro ao carregar os dados do BPR:', erro);
    return null;
  }
}

carregarDadosBPR();
