// assets/load-header.js
(async function () {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;
  const res = await fetch("/matematica-a-pedal/assets/header.html");
  placeholder.innerHTML = await res.text();
})();
