const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.about-main, .metrics, .section-heading, .journey-grid, .project-line, .lesson-grid, .classroom-gallery, .gallery, .review-grid, .review-context, .credentials-grid');
if ('IntersectionObserver' in window && !reduced) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}), {threshold:0.08});
 revealTargets.forEach(el => {el.classList.add('reveal-ready');observer.observe(el)});
}
let ticking=false;
function updateProgress(){const extent=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(extent>0?scrollY/extent*100:0)+'%';ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true}},{passive:true});updateProgress();
if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(el=>sectionObserver.observe(el))}
const modal=document.querySelector('#lightbox');let returnFocus;
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;modal.querySelector('img').src=button.dataset.image;modal.querySelector('img').alt=button.querySelector('img').alt;modal.querySelector('p').textContent=button.dataset.caption;modal.showModal();document.body.style.overflow='hidden'}));
modal.querySelector('.close-dialog').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});modal.addEventListener('close',()=>{document.body.style.overflow='';returnFocus?.focus()});
document.querySelector('#year').textContent=new Date().getFullYear();
