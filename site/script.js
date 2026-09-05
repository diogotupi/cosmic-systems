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
