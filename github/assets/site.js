/* Jessica Business Korean — shared config, data, header/footer, demo auth.
   ─────────────────────────────────────────────────────────────
   SET THESE BEFORE LAUNCH:
   CONFIG.checkoutUrl  → your Digistore24 order-form link
   CONFIG.videoBase    → your video host (e.g. Bunny Stream / Vimeo)
   ───────────────────────────────────────────────────────────── */
window.CONFIG = {
  brand: 'Jessica Business Korean',
  domain: 'jessicabusinesskorean.com',
  course: 'Business Korean for SUCCESS',
  price: 84.99,
  listPrice: null,           // strike-through "regular" price — edit or set null
  currency: 'USD',
  guaranteeDays: 60,
  // Digistore24 voucher that reduces the $148 list price to $84.99 (create it in Digistore24 → Marketing → Vouchers)
  voucher: 'LAUNCH',
  // Korean business registration number / VAT ID shown on legal.html
  vatId: '102-12-94603 (Korean business registration no.)',
  // Digistore24 order form. Replace PRODUCT_ID with your product number.
  // Affiliates' links (…?aff=NAME) are handled automatically by Digistore24.
  checkoutUrl: 'https://www.checkout-ds24.com/product/738726',
  supportEmail: 'jessicaheart0912@gmail.com',
  // Offer countdown: evergreen per-visitor timer (hours) stored in localStorage
  offerHours: 72,
};

// 33 lessons, real durations (seconds). `free` = preview without purchase.
window.LESSONS = [
  // Part 0 — Welcome
  { id: 1, part: 0, t: 'Welcome', ko: '', d: 66, free: true },
  { id: 2, part: 0, t: 'Meet Your Instructor', ko: '', d: 72 },
  { id: 3, part: 0, t: 'Why Business Korean Is Hard', ko: '', d: 78 },
  { id: 4, part: 0, t: 'Course Roadmap', ko: '', d: 120 },
  // Part 1
  { id: 5, part: 1, t: 'Part 1 Intro · Basics', ko: '기초', d: 27 },
  { id: 6, part: 1, ch: 1, t: 'First Greetings', ko: '첫인사', d: 151, free: true },
  { id: 7, part: 1, ch: 2, t: 'Honorifics & Titles', ko: '존댓말 & 호칭', d: 177 },
  { id: 8, part: 1, ch: 3, t: 'Arriving & Leaving', ko: '출퇴근 인사', d: 127 },
  { id: 9, part: 1, ch: 4, t: 'Asking, Thanking, Apologizing', ko: '부탁 · 감사 · 사과', d: 161 },
  // Part 2
  { id: 10, part: 2, t: 'Part 2 Intro · Communication', ko: '소통', d: 34 },
  { id: 11, part: 2, ch: 5, t: 'Small Talk', ko: '스몰토크', d: 140 },
  { id: 12, part: 2, ch: 6, t: 'Phone Calls', ko: '전화 응대', d: 157 },
  { id: 13, part: 2, ch: 7, t: 'Video Meetings', ko: '화상회의', d: 139 },
  { id: 14, part: 2, ch: 8, t: 'Writing Emails', ko: '이메일', d: 174 },
  { id: 15, part: 2, ch: 9, t: 'Work Chat', ko: '업무 메신저', d: 158 },
  // Part 3
  { id: 16, part: 3, t: 'Part 3 Intro · Workflows', ko: '업무', d: 42 },
  { id: 17, part: 3, ch: 10, t: 'Running Meetings', ko: '회의 진행', d: 151 },
  { id: 18, part: 3, ch: 11, t: 'Reporting to Your Boss', ko: '보고하기', d: 139 },
  { id: 19, part: 3, ch: 12, t: 'Scheduling', ko: '일정 조율', d: 156 },
  { id: 20, part: 3, ch: 13, t: 'Presentations', ko: '프레젠테이션', d: 137 },
  { id: 21, part: 3, ch: 14, t: 'Making Proposals', ko: '제안하기', d: 161 },
  { id: 22, part: 3, ch: 15, t: 'Negotiating & Saying No', ko: '협상 & 거절', d: 160 },
  { id: 23, part: 3, ch: 16, t: 'Client Care', ko: '고객 응대', d: 162 },
  // Part 4
  { id: 24, part: 4, t: 'Part 4 Intro · Relationships', ko: '관계', d: 41 },
  { id: 25, part: 4, ch: 17, t: 'Reading Nunchi', ko: '눈치 읽기', d: 140 },
  { id: 26, part: 4, ch: 18, t: 'Company Dinners', ko: '회식', d: 157 },
  { id: 27, part: 4, ch: 19, t: 'Business Cards & Networking', ko: '명함 & 네트워킹', d: 130 },
  { id: 28, part: 4, ch: 20, t: 'Opinions & Feedback', ko: '의견 & 피드백', d: 149 },
  { id: 29, part: 4, ch: 21, t: 'Holidays & Life Events', ko: '명절 & 경조사', d: 151 },
  { id: 30, part: 4, ch: 22, t: 'Interviews & Career', ko: '면접 & 커리어', d: 157 },
  { id: 31, part: 4, t: 'Final Review · Top 8 Phrases', ko: '총정리', d: 60 },
  { id: 32, part: 4, t: 'Your Mission', ko: '미션', d: 37 },
  { id: 33, part: 4, t: 'Closing', ko: '감사합니다', d: 30 },
];
window.PARTS = [
  { n: 0, en: 'Welcome', ko: '시작', sub: 'Start here', c: 'pur' },
  { n: 1, en: 'Basics', ko: '기초', sub: 'Survive your first week', c: 'red' },
  { n: 2, en: 'Communication', ko: '소통', sub: 'Sound natural on every channel', c: 'yel' },
  { n: 3, en: 'Workflows', ko: '업무', sub: 'Meet, report, propose, close', c: 'blu' },
  { n: 4, en: 'Relationships', ko: '관계', sub: 'Read the room, build trust', c: 'grn' },
];
// Demo media: only the free previews exist locally. In production point every
// lesson at your video host (see README → Video hosting).
window.MEDIA = { 1: 'media/welcome.mp4', 6: 'media/ch01.mp4' };
window.POSTER = { 1: 'media/welcome.jpg', 6: 'media/ch01.jpg' };

window.fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
window.money = (n) => '$' + n.toFixed(2).replace(/\.00$/, '');

/* ───────── Demo auth (front-end only) ─────────
   In production, access should be granted by Digistore24's IPN / webhook
   creating an account on your server. See README → "Payment & access".   */
window.AUTH = {
  key: 'jbk_user',
  get() { try { return JSON.parse(localStorage.getItem(this.key)); } catch (e) { return null; } },
  // Real auth: token issued by /api/login or /api/activate (Netlify Functions)
  login(email, token) { const u = { email, token, since: Date.now() }; localStorage.setItem(this.key, JSON.stringify(u)); return u; },
  async api(path, body) {
    const u = this.get();
    const r = await fetch(path, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', ...(u && u.token ? { authorization: 'Bearer ' + u.token } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (r.status === 401 && !body) { this.logout(); location.href = 'login.html'; }
    if (!r.ok) throw new Error(j.error || 'Something went wrong');
    return j;
  },
  logout() { localStorage.removeItem(this.key); },
  require() { if (!this.get()) { location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop()); } },
};
window.PROGRESS = {
  key: 'jbk_progress',
  all() { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) { return {}; } },
  set(id, v) { const a = this.all(); a[id] = v; localStorage.setItem(this.key, JSON.stringify(a)); },
  done(id) { return !!this.all()[id]; },
  count() { return Object.values(this.all()).filter(Boolean).length; },
};

window.buyUrl = () => {
  // Visitors arriving with ?aff=ID are sent through Digistore24's promolink so the affiliate is credited.
  const aff = new URLSearchParams(location.search).get('aff') || localStorage.getItem('jbk_aff');
  if (aff) { localStorage.setItem('jbk_aff', aff); return 'https://www.checkout-ds24.com/redir/738726/' + encodeURIComponent(aff) + '/' + (CONFIG.voucher ? '?voucher=' + encodeURIComponent(CONFIG.voucher) : ''); }
  return CONFIG.checkoutUrl + (CONFIG.voucher ? '?voucher=' + encodeURIComponent(CONFIG.voucher) : '');
};

/* ───────── Header & footer ───────── */
function __jbkChrome() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const u = AUTH.get();
  const mk = '<span class="mk"><i style="background:var(--red)"></i><i style="background:var(--yel)"></i><i style="background:var(--blu)"></i><i style="background:var(--grn)"></i></span>';
  const logo = `<a class="logo" href="index.html">${mk}<span>Jessica Business Korean<small>현장에서 통하는 비즈니스 한국어</small></span></a>`;
  const h = document.getElementById('site-header');
  if (h) {
    const inApp = h.dataset.mode === 'app';
    h.outerHTML = `<header class="site-h"><div class="band"></div><div class="wrap">${logo}
      <nav>${inApp
        ? `<a href="classroom.html" class="${page === 'classroom.html' ? 'on' : ''}">Classroom</a><a href="resources.html" class="${page === 'resources.html' ? 'on' : ''}">Downloads</a><a href="faq.html">Help</a>`
        : `<a href="index.html#curriculum">Curriculum</a><a href="index.html#preview">Free preview</a><a href="index.html#instructor">Instructor</a><a href="faq.html" class="${page === 'faq.html' ? 'on' : ''}">FAQ</a>`}</nav>
      <div class="acts">${u
        ? `<a class="btn btn-ghost btn-sm" href="classroom.html">My classroom</a>${inApp ? '<button class="btn btn-ink btn-sm" id="logout">Log out</button>' : ''}`
        : `<a class="btn btn-ghost btn-sm" href="login.html">Log in</a><a class="btn btn-buy btn-sm" href="${buyUrl()}" data-buy>Enroll · ${money(CONFIG.price)}</a>`}</div>
    </div></header>`;
    const lo = document.getElementById('logout');
    if (lo) lo.onclick = () => { AUTH.logout(); location.href = 'index.html'; };
  }
  const f = document.getElementById('site-footer');
  if (f) f.outerHTML = `<footer class="site-f"><div class="band"></div><div class="wrap">
    <div>${logo}<p style="margin-top:14px;font-size:15px;max-width:320px">Real Korean for the Korean workplace — by interpreter &amp; business-language instructor Jessica Lee (이주현).</p></div>
    <div><h4>Course</h4><a href="index.html#curriculum">Curriculum</a><a href="index.html#preview">Free preview</a><a href="classroom.html">Classroom</a><a href="resources.html">Downloads</a></div>
    <div><h4>Support</h4><a href="faq.html">FAQ</a><a href="faq.html#refund">Refund policy</a><a href="contact.html">Contact us</a><a href="mailto:${CONFIG.supportEmail}">${CONFIG.supportEmail}</a></div>
    <div><h4>Legal</h4><a href="terms.html">Terms &amp; Conditions</a><a href="terms.html#privacy">Privacy Policy</a><a href="contact.html">Contact us</a><a href="legal.html">Legal information</a></div>
    <div class="fine">© 2026 Jessica Lee (이주현). All rights reserved. · Payments are processed securely by our authorized reseller.</div>
  </div></footer>`;
  document.querySelectorAll('[data-buy]').forEach((a) => (a.href = buyUrl()));
  document.querySelectorAll('[data-vat]').forEach((e) => (e.textContent = CONFIG.vatId));
  document.querySelectorAll('[data-g]').forEach((e) => (e.textContent = CONFIG.guaranteeDays));
  document.querySelectorAll('[data-mail]').forEach((a) => { a.href = 'mailto:' + CONFIG.supportEmail; a.textContent = CONFIG.supportEmail; });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', __jbkChrome); else __jbkChrome();

window.toast = (msg) => {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2400);
};
