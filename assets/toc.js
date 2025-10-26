// assets/toc.js
(function(){
  const headings = Array.from(document.querySelectorAll('h2[id]'));
  if (!headings.length) return;

  // Crear contenedor TOC
  const aside = document.createElement('aside');
  aside.setAttribute('aria-label','Índice de la unidad');
  aside.style.cssText = "position:sticky; top:12px; align-self:start; border:1px solid #FFD580; border-radius:12px; padding:10px; background:#FFF6E6; color:#7f6000;";

  const h = document.createElement('div');
  h.textContent = "Índice de la unidad";
  h.style.cssText = "color:#783f04; font-weight:700; margin-bottom:8px;";
  aside.appendChild(h);

  const ul = document.createElement('ul');
  ul.style.cssText = "list-style:none; padding-left:0; margin:0; display:flex; flex-direction:column; gap:6px;";
  headings.forEach(ho => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${ho.id}`;
    a.textContent = ho.textContent.trim();
    a.style.cssText = "text-decoration:none; color:#7f6000;";
    li.appendChild(a);
    ul.appendChild(li);
  });
  aside.appendChild(ul);

  // Insertarlo a la izquierda del main (layout simple de 2 columnas)
  const main = document.querySelector('main');
  if (!main) return;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = "display:grid; grid-template-columns: 280px 1fr; gap:16px;";
  main.parentNode.insertBefore(wrapper, main);
  wrapper.appendChild(aside);
  wrapper.appendChild(main);
})();
