const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* Any button-group with class .mode (map Live/Domestic/International,
   chart 7D/30D/3M/6M/1Y/ALL) toggles active only within its own group */
$$('.mode').forEach(group => {
  group.querySelectorAll('button').forEach(b => b.onclick = () => {
    group.querySelectorAll('button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
});

/* Airline / OTA source tabs */
$$('.source-tabs b').forEach(b => b.onclick = () => {
  $$('.source-tabs b').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
});

/* Light / dark theme */
const theme = $('#theme');
if (theme) {
  theme.onclick = () => {
    document.body.classList.toggle('dark');
    theme.textContent = document.body.classList.contains('dark') ? '🌞' : '🌙';
  };
}

/* Dashboard search: filter route/airline rows */
const search = $('#search');
if (search) {
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    $$('.route-line,.air').forEach(row => {
      row.style.display = (!q || row.textContent.toLowerCase().includes(q)) ? 'grid' : 'none';
    });
  });
}

/* Live indicator pulse */
setInterval(() => {
  const dot = $('.live i');
  if (!dot) return;
  dot.style.transform = 'scale(1.7)';
  setTimeout(() => dot.style.transform = 'scale(1)', 250);
}, 2500);

/* KPI number count-up animation */
$$('[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const start = target - 3;
  let t = 0;
  const timer = setInterval(() => {
    t += 1;
    const v = start + (target - start) * (t / 20);
    el.textContent = v.toFixed(2);
    if (t >= 20) clearInterval(timer);
  }, 35);
});

/* View All Flights button (decorative, scrolls to routes) */
const viewAllBtn = document.querySelector('.map-stats button');
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', () => {
    document.querySelector('.three-grid')?.scrollIntoView({behavior:'smooth', block:'start'});
  });
}
