// assets/toc.js — versión con modo inline (índice arriba)
document.addEventListener("DOMContentLoaded", () => {
  const tocMode = document.body.dataset.toc || "sidebar";
  const main = document.querySelector("main");
  if (!main) return;

  // Buscar todos los h2 con id
  const headers = main.querySelectorAll("h2[id]");
  if (headers.length === 0) return;

  // Crear índice
  const toc = document.createElement("nav");
  toc.className = "toc";
  toc.style.border = "1px solid #FFD580";
  toc.style.borderRadius = "12px";
  toc.style.padding = "14px";
  toc.style.background = "#FFF6E6";
  toc.style.fontFamily = "'Roboto Mono', monospace";
  toc.style.color = "#7f6000";
  toc.style.lineHeight = "1.6";
  toc.innerHTML = "<h3 style='color:#783f04;margin-top:0;'>📘 Índice de la unidad</h3>";

  const list = document.createElement("ol");
  headers.forEach((h) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = h.textContent;
    a.href = "#" + h.id;
    a.style.color = "#7f6000";
    a.style.textDecoration = "none";
    a.addEventListener("mouseover", () => (a.style.textDecoration = "underline"));
    a.addEventListener("mouseout", () => (a.style.textDecoration = "none"));
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.appendChild(list);

  if (tocMode === "inline") {
  // Modo inline: el índice se inserta justo después del encabezado principal
  // (buscamos el primer h1 dentro del main)
  const h1 = main.querySelector("h1");
  if (h1 && h1.parentElement) {
    h1.parentElement.insertAdjacentElement("afterend", toc);
  } else {
    main.insertBefore(toc, main.firstChild);
  }

  // Ajustar ancho y centrado igual que el contenido
  toc.style.maxWidth = "980px";
  toc.style.margin = "18px auto";
}
 else {
    // Modo sidebar: disposición en dos columnas
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexWrap = "wrap";
    wrapper.style.gap = "24px";
    const content = document.createElement("div");
    content.style.flex = "1 1 680px";
    const children = Array.from(main.childNodes);
    children.forEach((ch) => content.appendChild(ch));
    wrapper.appendChild(toc);
    wrapper.appendChild(content);
    main.appendChild(wrapper);
  }
});
