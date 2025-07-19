(function () {
    const header = document.querySelector('[data-component="site-header"]');
    if (!header) return;

    /* ---------------- Desktop Dropdowns ---------------- */
    const triggers = header.querySelectorAll('[data-dropdown-trigger]');
    function closeAll(except) {
        triggers.forEach(btn => {
            const id = btn.dataset.dropdownTrigger;
            const panel = header.querySelector(`[data-dropdown="${id}"]`);
            if (id !== except) {
                btn.setAttribute('aria-expanded', 'false');
                panel.removeAttribute('data-open');
            }
        });
    }
    triggers.forEach(btn => {
        const id = btn.dataset.dropdownTrigger;
        const panel = header.querySelector(`[data-dropdown="${id}"]`);
        btn.addEventListener('click', () => {
            const open = btn.getAttribute('aria-expanded') === 'true';
            if (open) {
                closeAll(null);
            } else {
                closeAll(id);
                btn.setAttribute('aria-expanded', 'true');
                panel.setAttribute('data-open', 'true');
                // focus first item after small delay
                setTimeout(() => panel.querySelector('a')?.focus(), 30);
            }
        });
        panel.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeAll(null);
                btn.focus();
            }
        });
    });
    document.addEventListener('click', e => {
        if (!header.contains(e.target)) closeAll(null);
    });

    /* ---------------- Mobile Drawer ---------------- */
    const mobileBtn = document.getElementById('mobileMenuButton');
    const mobilePanel = document.getElementById('mobileMenuPanel');
    const overlay = mobilePanel?.querySelector('[data-close-overlay]');
    const closeBtn = mobilePanel?.querySelector('[data-close]');

    function toggleMobile(force) {
        const isOpen = mobilePanel.getAttribute('data-open') === 'true';
        const next = force !== undefined ? force : !isOpen;
        mobilePanel.setAttribute('data-open', String(next));
        mobileBtn.setAttribute('aria-expanded', String(next));
        mobileBtn.dataset.open = next ? 'true' : 'false';
        document.documentElement.classList.toggle('is-locked', next);
        if (next) {
            setTimeout(() => mobilePanel.querySelector('a,summary,button')?.focus(), 250);
        } else {
            mobileBtn.focus();
        }
    }
    mobileBtn?.addEventListener('click', () => toggleMobile());
    overlay?.addEventListener('click', () => toggleMobile(false));
    closeBtn?.addEventListener('click', () => toggleMobile(false));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobilePanel.getAttribute('data-open') === 'true') {
            toggleMobile(false);
        }
    });
    mobilePanel.querySelectorAll('[data-mobile-link]').forEach(link => {
        link.addEventListener('click', () => toggleMobile(false));
    });

    /* ---------------- Sticky Scroll Hide/Reveal (optional) ---------------- */
    let lastY = window.scrollY;
    let accum = 0;
    const threshold = 32;
    function onScroll() {
        const y = window.scrollY;
        const delta = y - lastY;
        accum = (Math.abs(delta) > 6) ? accum + delta : accum * 0.8;
        if (y <= 0) {
            header.dataset.hidden = 'false';
        } else {
            if (accum > threshold) {
                header.dataset.hidden = 'true';  // hide when scrolling down
                accum = 0;
            } else if (accum < -threshold) {
                header.dataset.hidden = 'false'; // show when scrolling up
                accum = 0;
            }
        }
        lastY = y;
    }
    // Enable hide/show behavior: remove if not desired
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------------- Active link sync (auto if URL changes) ---------------- */
    function setActiveLink() {
        const path = window.location.pathname.replace(/\/$/, '');
        header.querySelectorAll('.nav-link').forEach(a => {
            const href = a.getAttribute('href')?.replace(/\/$/, '');
            if (href && href === path) {
                a.dataset.active = 'true';
            } else {
                a.removeAttribute('data-active');
            }
        });
    }
    setActiveLink();

})();
