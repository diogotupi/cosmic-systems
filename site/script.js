async function loadBrand() {
  try {
    const res = await fetch('./brand.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const brand = await res.json();

    // Colors → CSS variables
    if (brand.primaryColor) document.documentElement.style.setProperty('--primary', brand.primaryColor);
    if (brand.accentColor) document.documentElement.style.setProperty('--accent', brand.accentColor);

    // Page title
    const titleEl = document.querySelector('[data-brand-title]');
    if (titleEl) {
      titleEl.textContent = `${brand.companyName || 'Cosmic Systems'} — ${brand.tagline || 'Sites e sistemas sob medida'}`;
    }
    document.title = titleEl?.textContent || document.title;

    // Bind simple text fields
    document.querySelectorAll('[data-brand]').forEach(el => {
      const key = el.getAttribute('data-brand');
      if (key && brand[key]) el.textContent = brand[key];
    });

    // WhatsApp: same link across CTAs
    const number = (brand.whatsappE164 || '').replace(/[^\d]/g, '');
    const text = encodeURIComponent(brand.whatsappMessage || '');
    const waHref = number ? `https://wa.me/${number}${text ? `?text=${text}` : ''}` : 'https://wa.me/';
    ['nav-whatsapp', 'hero-whatsapp', 'cta-whatsapp'].forEach(id => {
      const a = document.getElementById(id);
      if (a) {
        a.href = waHref;
        if (id !== 'nav-whatsapp' && brand.heroCtaLabel) a.textContent = brand.heroCtaLabel;
        if (id === 'nav-whatsapp') a.textContent = 'WhatsApp';
      }
    });

  } catch (err) {
    console.error('Erro ao carregar brand.json', err);
  } finally {
    // Year
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }
}

loadBrand();

function initVideoCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.video-slide'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (slides.length === 0) return;

    let index = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));

    const setIndex = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        const video = slide.querySelector('video');
        if (!video) return;
        if (active) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    };

    prev?.addEventListener('click', () => setIndex(index - 1));
    next?.addEventListener('click', () => setIndex(index + 1));
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const i = Number(dot.getAttribute('data-carousel-dot'));
        if (!Number.isNaN(i)) setIndex(i);
      });
    });

    setIndex(index);
  });
}

initVideoCarousels();
