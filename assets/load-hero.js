// assets/load-hero.js
(async function () {
  const placeholder = document.getElementById("hero-placeholder");
  if (!placeholder) return;

  // Cargar hero.html sin usar caché
  const res = await fetch("/matematica-a-pedal/assets/hero.html?v=1", { cache: "no-store" });
  placeholder.innerHTML = await res.text();
})();
