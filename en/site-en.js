const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');if(toggle&&nav)toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open')});const y=document.querySelector('#year');if(y)y.textContent=new Date().getFullYear();
// Institutional credits in the global footer.
(function renderInstitutionalCredits(){
  const footer=document.querySelector('footer');
  if(!footer||footer.querySelector('.bpr-credits'))return;
  const section=document.createElement('section');
  section.className='bpr-credits';
  section.setAttribute('aria-label','ADMINISTRATION & PRODUCTION');
  section.innerHTML=`<h2>ADMINISTRATION & PRODUCTION</h2><div class="bpr-credit-groups"><div class="bpr-credit-group"><h3>ADMINISTRATION</h3><img src="https://drive.google.com/thumbnail?id=19UUGBzOJn7wtX47lxnQ4gxZCWUh0PkpW&sz=w700" alt="IBEA – Instituto Brasílica" loading="lazy"></div><div class="bpr-credit-group"><h3>PRODUCTION</h3><div class="bpr-credit-logos"><img src="https://drive.google.com/thumbnail?id=19aP-CUqbk-nlE-AR0c0zGKVRR_3gbCiD&sz=w700" alt="BPR Produções" loading="lazy"><img src="https://drive.google.com/thumbnail?id=1JREnjWVJfDrkjtrtdY6ulq71YYXfJLYb&sz=w700" alt="Coletivo Delas" loading="lazy"></div></div></div>`;
  footer.prepend(section);
})();
