/* Butterfly Beauty Pro — shared interactions */
(function () {
  // Sticky nav state
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('[data-hero]');
  function onScroll() {
    if (!nav) return;
    var threshold = hero ? hero.offsetHeight - 90 : 60;
    if (window.scrollY > threshold) nav.classList.add('solid');
    else nav.classList.remove('solid');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // WhatsApp booking links — a ready-to-send opener for the AI agent.
  // This auto-sends as one tap (the customer doesn't fill anything in), so it
  // reads as a complete, natural message and invites the agent to follow up.
  var WA_PHONE = '85264661381';
  // No emoji in the message: the butterfly (U+1F98B) renders as a U+FFFD
  // replacement char on devices / WhatsApp clients lacking the glyph.
  var WA_DEFAULT =
    '您好，我想預約 Butterfly Beauty Pro 的護理療程，麻煩智能助理幫我推薦合適療程並安排時間，謝謝！';
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var msg = el.getAttribute('data-wa-msg') || WA_DEFAULT;
    el.setAttribute('href', 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // Reveal on scroll — visible by default; hidden start applied only after
  // a double rAF confirms the page is painting (skips paused/backgrounded
  // captures, which would otherwise freeze transitions at opacity:0).
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(function (el) {
      if (el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  }
  function armReveals() {
    document.documentElement.classList.add('reveal-on');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView, { passive: true });
    revealInView();
    setTimeout(revealInView, 400);
    setTimeout(revealInView, 1200);
  }
  requestAnimationFrame(function () { requestAnimationFrame(armReveals); });
})();
