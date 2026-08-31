// Minimal JS: progressive enhancements for scaffold
document.addEventListener('DOMContentLoaded',()=>{
  // Simple handler for the interest form (non-submitting demo)
  const form=document.querySelector('.interest-form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      alert('Thanks — this is a demo scaffold. I will wire up submissions when you choose a backend.');
    });
  }
  // mark active nav link
  const navLinks = document.querySelectorAll('.nav a');
  if(navLinks.length){
    const path = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(a=>{
      const href = a.getAttribute('href');
      if(href === path) a.classList.add('active');
    });
  }

  // collapsible sidebar
  const sidebar = document.querySelector('.sidebar');
  const app = document.querySelector('.app');
  const navOpen = document.querySelector('.nav-open');
  const navClose = document.querySelector('.nav-close');
  const collapsibleQuery = window.matchMedia('(max-width: 1499px)');

  function setCollapsed(coll){
    if(!sidebar || !app) return;
    if(coll){
      sidebar.classList.add('collapsed');
      document.documentElement.classList.add('nav-collapsed');
      app.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
      document.documentElement.classList.remove('nav-collapsed');
      app.classList.remove('collapsed');
    }
    if(collapsibleQuery.matches){
      try{ localStorage.setItem('mv_nav_collapsed', coll? '1':'0') }catch(e){}
    }
  }

  function syncSidebarMode(){
    if(!sidebar || !app) return;
    if(collapsibleQuery.matches){
      let stored = '0';
      try{ stored = localStorage.getItem('mv_nav_collapsed') || '0' }catch(e){}
      setCollapsed(stored === '1');
    } else {
      setCollapsed(false);
    }
  }

  if(navOpen) navOpen.addEventListener('click',()=> setCollapsed(false));
  if(navClose) navClose.addEventListener('click',()=> setCollapsed(true));

  syncSidebarMode();
  if(collapsibleQuery.addEventListener){
    collapsibleQuery.addEventListener('change', syncSidebarMode);
  } else if(collapsibleQuery.addListener){
    collapsibleQuery.addListener(syncSidebarMode);
  }

  document.addEventListener('click',e=>{
    const toggle = e.target.closest('.about-dropdown-toggle');
    if(!toggle) return;
    const panelId = toggle.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    if(panel) panel.hidden = isExpanded;
  });

  // Fit card to viewport by scaling proportionally (preserve design proportions)
  function fitCardToViewport(){
    const card = document.querySelector('.card');
    const wrapper = document.querySelector('.card-wrapper');
    if(!card || !wrapper) return;
    const designW = 980;
    const designH = 920;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / designW, vh / designH);
    card.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', ()=>{
    clearTimeout(window._fitCardTO);
    window._fitCardTO = setTimeout(fitCardToViewport,80);
  });
  // initial fit
  fitCardToViewport();

  // close when link clicked on small screens
  navLinks.forEach(a=>{
    a.addEventListener('click',()=>{
      if(collapsibleQuery.matches) setCollapsed(true);
    })
  });
});
