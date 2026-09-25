const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>{const aberto=header.classList.toggle('open');toggle.setAttribute('aria-expanded',String(aberto));toggle.setAttribute('aria-label',aberto?'Fechar menu':'Abrir menu');toggle.textContent=aberto?'×':'☰';});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menu');if(toggle)toggle.textContent='☰';}));
document.getElementById('year')&&(document.getElementById('year').textContent=new Date().getFullYear());
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>30);
onScroll();window.addEventListener('scroll',onScroll,{passive:true});

const BPR_API_URL='https://script.google.com/macros/s/AKfycbzy_hY26RyZ4GQXgOk9kDjqtQyoUcEF-lslp_bySeq_oJsoJBftPdsQm4boGUkGddZl-g/exec';

function texto(item,...chaves){
  for(const chave of chaves){
    if(item&&item[chave]!==undefined&&String(item[chave]).trim()) return String(item[chave]).trim();
  }
  return '';
}
function esc(valor){
  return String(valor??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function imagemDrive(item,tamanho=1200){
  const url=texto(item,'imagem_url','url_imagem','foto_url','url');
  if(url) return url;
  const id=texto(item,'imagem_drive_id','imagem_id','id_imagem','foto_id','drive_id','arquivo_id');
  return id?`https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${tamanho}`:'';
}
function aplicarConfig(config={}){
  const nome=texto(config,'nome_site');
  const subtitulo=texto(config,'subtitulo');
  if(nome) document.title=`${nome} — Desde 1977`;
  const hero=document.querySelector('.hero h1');
  if(hero&&subtitulo) hero.textContent=subtitulo;
}
function aplicarHome(itens=[]){
  itens.forEach(item=>{
    const chave=texto(item,'chave','slug','id','secao').toLowerCase();
    const titulo=texto(item,'titulo','nome');
    const conteudo=texto(item,'texto','conteudo','descricao','valor');
    if(!chave) return;
    const alvo=document.querySelector(`[data-api-home="${CSS.escape(chave)}"]`);
    if(alvo) alvo.textContent=conteudo||titulo;
  });
}
function aplicarReconhecimentos(itens=[]){
  if(!itens.length) return;
  const grid=document.querySelector('.recognition-grid');
  if(!grid) return;
  grid.innerHTML=itens.map(item=>`<article><b>${esc(texto(item,'ano','data'))}</b><h3>${esc(texto(item,'titulo','nome','reconhecimento'))}</h3><p>${esc(texto(item,'descricao','texto','conteudo'))}</p></article>`).join('');
}
function aplicarTimeline(itens=[]){
  if(!itens.length) return;
  const grid=document.querySelector('.timeline-row');
  if(!grid) return;
  grid.innerHTML=itens.slice(0,6).map(item=>`<article><b>${esc(texto(item,'ano','data'))}</b><span>${esc(texto(item,'titulo','evento','nome','descricao'))}</span></article>`).join('');
}
function aplicarEquipe(itens=[]){
  if(!itens.length) return;
  const grid=document.querySelector('.team-grid');
  if(!grid) return;
  const cards=[...grid.querySelectorAll('.team-card')];
  itens.forEach((item,i)=>{
    const card=cards[i];
    if(!card) return;
    const nome=card.querySelector('h3');
    const funcao=card.querySelector('span');
    const descricao=card.querySelector('p');
    if(nome) nome.textContent=texto(item,'nome')||nome.textContent;
    if(funcao) funcao.textContent=texto(item,'funcao','cargo','papel')||funcao.textContent;
    if(descricao) descricao.textContent=texto(item,'descricao','texto','bio')||descricao.textContent;
  });
}
function aplicarAgenda(itens=[]){
  if(!itens.length) return;
  const grid=document.querySelector('.agenda-grid');
  if(!grid) return;
  const primeiro=grid.querySelector('article');
  const item=itens[0];
  if(!primeiro||!item) return;
  const data=primeiro.querySelector('span');
  const titulo=primeiro.querySelector('h3');
  const local=primeiro.querySelector('p');
  if(data) data.textContent=texto(item,'data','periodo','ano')||data.textContent;
  if(titulo) titulo.textContent=texto(item,'titulo','evento','nome')||titulo.textContent;
  const lugar=[texto(item,'local'),texto(item,'cidade')].filter(Boolean).join(' · ');
  if(local&&lugar) local.textContent=lugar;
}
function aplicarEspetaculos(itens=[]){
  if(!itens.length) return;
  const grid=document.querySelector('#espetaculos .cards');
  if(!grid) return;
  grid.innerHTML=itens.map(item=>{
    const img=imagemDrive(item);
    const style=img?` style="background-image:url('${esc(img)}')"`:'';
    return `<article><div class="show-photo"${style}><span>${esc(texto(item,'credito','credito_foto','legenda')||'ACERVO BPR')}</span></div><h3>${esc(texto(item,'titulo','nome','espetaculo'))}</h3><p class="show-meta">${esc(texto(item,'subtitulo','descricao_curta','ano','descricao'))}</p></article>`;
  }).join('');
}
function aplicarAcervo(itens=[]){
  if(!itens.length) return;
  const fotos=document.querySelectorAll('.archive-photo');
  itens.slice(0,fotos.length).forEach((item,i)=>{
    const img=imagemDrive(item);
    if(img) fotos[i].style.backgroundImage=`url("${img}")`;
    const label=fotos[i].querySelector('span');
    if(label) label.textContent=texto(item,'titulo','nome','categoria','legenda')||label.textContent;
  });
}
function aplicarDadosBPR(site={}){
  aplicarConfig(site.config);
  aplicarHome(site.home);
  aplicarReconhecimentos(site.reconhecimentos);
  aplicarTimeline(site.timeline);
  aplicarEquipe(site.equipe);
  aplicarAgenda(site.agenda);
  aplicarEspetaculos(site.espetaculos);
  aplicarAcervo(site.acervo);
}
async function carregarDadosBPR(){
  try{
    const resposta=await fetch(BPR_API_URL,{cache:'no-store'});
    if(!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);
    const dados=await resposta.json();
    if(!dados.success||!dados.site) throw new Error(dados.erro||'Resposta inválida da API.');
    aplicarDadosBPR(dados.site);
    document.documentElement.dataset.contentSource='api';
    return dados.site;
  }catch(erro){
    console.error('Conteúdo dinâmico indisponível; mantendo conteúdo institucional de fallback.',erro);
    document.documentElement.dataset.contentSource='fallback';
    return null;
  }
}

function iniciarAnimacoes(){
  if(!('IntersectionObserver' in window)) return;
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('main section>*,.cards article,.team-grid article,.recognition-grid article,.timeline article').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=Math.min(i%5,4)*55+'ms';observer.observe(el)});
}

carregarDadosBPR().finally(iniciarAnimacoes);
