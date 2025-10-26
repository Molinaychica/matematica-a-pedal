// assets/load-header.js
(async function () {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  // 1) Inyectar header
  const hdr = await fetch("/matematica-a-pedal/assets/header.html");
  placeholder.innerHTML = await hdr.text();

  // 2) Cargar datos de navegación
  const navRes = await fetch("/matematica-a-pedal/assets/nav.json");
  const navData = await navRes.json();

  // 3) Construir lista de unidades y bloques
  const unitsList = document.getElementById("units-list");
  if (unitsList && navData?.unidades?.length) {
    unitsList.innerHTML = navData.unidades.map(u => {
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

  // 4) Marcar activo (subrayado) si estás dentro de una unidad
  const path = location.pathname;
  const active = navData.unidades.find(u => path.includes(`/${u.id}/`));
  if (active) {
    const link = [...document.querySelectorAll('#units-list a')].find(a => a.getAttribute('href') === active.href);
    if (link) link.style.textDecoration = 'underline';
  }
})();
