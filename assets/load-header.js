// assets/load-header.js
(async function () {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  // 1) Inyectar header (sin caché)
  const hdr = await fetch("/matematica-a-pedal/assets/header.html?v=4", { cache: "no-store" });
  placeholder.innerHTML = await hdr.text();

  // 2) Cargar datos de navegación
  let nav;
  try {
    const navRes = await fetch("/matematica-a-pedal/assets/nav.json?v=2", { cache: "no-store" });
    nav = await navRes.json();
  } catch (e) {
    console.warn("No se pudo cargar nav.json", e);
    return;
  }

  // 3) Pintar lista de unidades + bloques en el dropdown
  const unitsList = document.getElementById("units-list");
  if (unitsList && Array.isArray(nav?.unidades)) {
    unitsList.innerHTML = nav.unidades.map(u => {
      const bloques = (u.bloques || [])
        .map(b => `<a href="${u.href}${b.hash}" style="color:#7f6000;text-decoration:none;padding:4px 0;display:block;">• ${b.title}</a>`)
        .join("");
      return `
        <div style="border:1px solid #FFD580;border-radius:10px;padding:8px;">
          <a href="${u.href}" style="color:#783f04;text-decoration:none;font-weight:700;">${u.title}</a>
          ${bloques ? `<div style="margin-top:6px;padding-left:6px;">${bloques}</div>` : ""}
        </div>
      `;
    }).join("");
  }

  // 4) Dropdown: abrir/cerrar
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

  // 5) Marcar activo si estás en una unidad
  const path = location.pathname;
  const active = nav.unidades?.find(u => path.includes(`/${u.id}/`));
  if (active) {
    const link = [...document.querySelectorAll('#units-list a')].find(a => a.getAttribute('href') === active.href);
    if (link) link.style.textDecoration = 'underline';
  }
})();
