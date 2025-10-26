// assets/load-header.js
(async function () {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  // fuerza a no usar cache del header
  const res = await fetch("/matematica-a-pedal/assets/header.html?v=3", { cache: "no-store" });
  placeholder.innerHTML = await res.text();

  // --- si tu header.html tiene el dropdown, este bloque lo deja funcionando ---
  const dd = document.querySelector('.dropdown');
  if (dd) {
    const btn = dd.querySelector('button');
    const menu = dd.querySelector('.dropdown-menu');
    btn?.addEventListener('click', ()=>{
      const open = menu.style.display === 'block';
      menu.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', (e)=>{
      if(!dd.contains(e.target)) { menu.style.display = 'none'; btn.setAttribute('aria-expanded','false'); }
    });
  }
})();
