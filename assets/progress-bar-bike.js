// assets/progress-bar-bike.js
(function () {
  const $all = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Construye el bloque de progreso
  function ensureUI() {
    let host = document.getElementById('unit-progress');
    if (!host) {
      // si no existe, lo insertamos antes del primer h2
      const firstH2 = document.querySelector('main h2, .page-content h2, section h2');
      host = document.createElement('div');
      host.id = 'unit-progress';
      (firstH2?.parentNode || document.body).insertBefore(host, firstH2 || null);
    }
    if (host.dataset.ready) return host;

    host.classList.add('unit-progress');
    host.innerHTML = `
      <div class="unit-progress__top">
        <span>Progreso de la unidad</span>
        <span class="unit-progress__label">0%</span>
      </div>
      <div class="unit-progress__bar">
        <div class="unit-progress__fill"></div>
        <div class="unit-progress__bike" aria-hidden="true" title="Tu avance">
          <span>🚲</span>
        </div>
      </div>
    `;
    host.dataset.ready = "1";
    return host;
  }

  function readProgress() {
    const checks = $all('input[type="checkbox"][data-progress-id]');
    const done   = checks.filter(el => el.checked).length;
    const total  = checks.length || 1;
    const pct    = Math.round(100 * done / total);
    return { pct, done, total };
  }

  function updateUI() {
    const host = ensureUI();
    const { pct } = readProgress();

    const label = host.querySelector('.unit-progress__label');
    const fill  = host.querySelector('.unit-progress__fill');
    const bike  = host.querySelector('.unit-progress__bike');

    label.textContent = `${pct}%`;
    fill.style.width  = `${pct}%`;
    // Posicionamos la bici sobre la barra (0% a 100%), con un pequeño margen
    bike.style.left   = `${pct}%`;
  }

  // Inicial
  document.addEventListener('DOMContentLoaded', () => {
    ensureUI(); updateUI();

    // 1) Reaccionar a cambios de checkboxes (locales)
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[type="checkbox"][data-progress-id]')) updateUI();
    });

    // 2) Si progress-sync.js emite este evento, nos actualizamos también (remotos)
    window.addEventListener('map:progress-updated', updateUI);
  });
})();
