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
    const root = carousel.closest('.card') || carousel.parentElement;
    const track = carousel.querySelector('.video-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.video-slide'));
    const dots = Array.from((root || document).querySelectorAll('[data-carousel-dot]')).filter(
      (dot) => root && root.contains(dot)
    );
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!track || slides.length === 0) return;

    let index = 0;
    const mq = window.matchMedia('(min-width: 900px)');

    const playVisible = () => {
      const sideBySide = mq.matches;
      slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (!video) return;
        if (sideBySide || i === index) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    const setIndex = (nextIndex) => {
      index = ((nextIndex % slides.length) + slides.length) % slides.length;
      if (!mq.matches) {
        track.style.transform = `translateX(-${index * 100}%)`;
      } else {
        track.style.transform = 'none';
      }
      playVisible();
      dots.forEach((dot) => {
        const active = Number(dot.getAttribute('data-carousel-dot')) === index;
        dot.classList.toggle('is-active', active);
      });
    };

    prev?.addEventListener('click', (e) => {
      e.preventDefault();
      setIndex(index - 1);
    });
    next?.addEventListener('click', (e) => {
      e.preventDefault();
      setIndex(index + 1);
    });
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const i = Number(dot.getAttribute('data-carousel-dot'));
        if (!Number.isNaN(i)) setIndex(i);
      });
    });
    mq.addEventListener('change', () => setIndex(index));

    setIndex(0);
  });
}

initVideoCarousels();
