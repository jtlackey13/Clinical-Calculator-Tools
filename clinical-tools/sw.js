const CACHE = 'clinical-tools-v3';
// Add new calculator pages to this list as you build them.
const ASSETS = [
  './index.html',
  './manifest.json',
  './calculators/aa-gradient.html',
  './calculators/capnography-co.html',
  './calculators/central-line-depth.html',
  './calculators/corrected-anion-gap.html',
  './calculators/cpo.html',
  './calculators/crrt-cvvh.html',
  './calculators/dead-space.html',
  './calculators/loading-dose.html',
  './calculators/lvot-vti.html',
  './calculators/maintenance-rate.html',
  './calculators/mechanical-power.html',
  './calculators/neuraxial-depth.html',
  './calculators/o2-delivery-fick.html',
  './calculators/papi.html',
  './calculators/pasp-tr-velocity.html',
  './calculators/pfp-ratio.html',
  './calculators/pvr.html',
  './calculators/resp-score.html',
  './calculators/save-score.html',
  './calculators/shunt-fraction.html',
  './calculators/sodium-correction.html',
  './calculators/stewart-figge.html',
  './calculators/svr.html',
  './calculators/vbg-to-abg.html',
  './calculators/vis-score.html',
  './calculators/warfarin.html',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const resClone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, resClone));
      return res;
    }).catch(() => cached))
  );
});
