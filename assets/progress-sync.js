// assets/progress-sync.js
import {
  doc, getDoc, setDoc, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const waitAuth = () =>
  new Promise(resolve => {
    if (window.__MAP__?.auth) {
      window.__MAP__.onAuthStateChanged(window.__MAP__.auth, user => {
        if (user) resolve(user);
      });
    }
  });

// Detectar unidad desde la URL
const UNIT_ID = (location.pathname.split('/').filter(Boolean).pop() || 'index')
  .replace('index.html', '') || 'unidad0';

const STORAGE_KEY = `progress:${UNIT_ID}`;
const $ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Debounce simple
const debounce = (fn, ms = 600) => {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

function readCheckedFromDOM() {
  return $('input[type="checkbox"][data-progress-id]')
    .filter(el => el.checked)
    .map(el => el.dataset.progressId);
}

function applyCheckedToDOM(ids = []) {
  const set = new Set(ids);
  $('input[type="checkbox"][data-progress-id]').forEach(el => {
    el.checked = set.has(el.dataset.progressId);
  });
}

// Fallback local
function saveLocal(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}
function loadLocal() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

// Guardar remoto
const saveRemote = debounce(async (uid, ids) => {
  const { db } = window.__MAP__;
  const ref = doc(db, 'users', uid, 'progress', UNIT_ID);
  await setDoc(ref, { checked: ids, updatedAt: Date.now(), ts: serverTimestamp() }, { merge: true });
}, 600);

(async function initProgressSync() {
  $('input[type="checkbox"]').forEach((el, idx) => {
    if (!el.dataset.progressId) {
      const autoId = `${UNIT_ID}-chk-${String(idx + 1).padStart(2, '0')}`;
      el.setAttribute('data-progress-id', autoId);
    }
  });

  applyCheckedToDOM(loadLocal());

  const user = await waitAuth();
  const uid = user.uid;
  const { db } = window.__MAP__;
  const ref = doc(db, 'users', uid, 'progress', UNIT_ID);

  const snap = await getDoc(ref);
  const remoteIds = snap.exists() ? (snap.data().checked || []) : [];
  const localIds = loadLocal();

  if (localIds.length && !remoteIds.length) {
    applyCheckedToDOM(localIds);
    await setDoc(ref, { checked: localIds, updatedAt: Date.now(), ts: serverTimestamp() }, { merge: true });
  } else {
    applyCheckedToDOM(remoteIds);
    saveLocal(remoteIds);
  }

  onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      const server = docSnap.data().checked || [];
      applyCheckedToDOM(server);
      saveLocal(server);
    }
  });

  $('input[type="checkbox"][data-progress-id]').forEach(el => {
    el.addEventListener('change', () => {
      const ids = readCheckedFromDOM();
      saveLocal(ids);
      saveRemote(uid, ids);
    });
  });
})();
