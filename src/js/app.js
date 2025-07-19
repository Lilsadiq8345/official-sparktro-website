window.initHeaderInteractions = function initHeaderInteractions() {
    // Dropdowns (desktop)
    document.querySelectorAll('[data-dropdown-trigger]').forEach(btn => {
        const id = btn.getAttribute('data-dropdown-trigger');
        const panel = document.querySelector(`[data-dropdown="${id}"]`);
        if (!panel) return;
        btn.addEventListener('click', e => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            // Close others
            document.querySelectorAll('[data-dropdown-trigger][aria-expanded="true"]').forEach(o => {
                if (o !== btn) { o.setAttribute('aria-expanded', 'false'); const pid = o.getAttribute('data-dropdown-trigger'); const pp = document.querySelector(`[data-dropdown="${pid}"]`); pp && pp.classList.add('hidden'); o.querySelector('[data-caret]')?.classList.remove('rotate-180'); }
            });
            btn.setAttribute('aria-expanded', String(!expanded));
            panel.classList.toggle('hidden', expanded);
            btn.querySelector('[data-caret]')?.classList.toggle('rotate-180', !expanded);
        });
        // Close on outside click
        document.addEventListener('click', evt => {
            if (!panel.contains(evt.target) && !btn.contains(evt.target)) {
                panel.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('[data-caret]')?.classList.remove('rotate-180');
            }
        });
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileMenuButton');
    const mobilePanel = document.getElementById('mobileMenuPanel');
    if (mobileBtn && mobilePanel) {
        const toggle = (open) => {
            mobilePanel.classList.toggle('hidden', !open);
            mobileBtn.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('overflow-hidden', open);
        };
        mobileBtn.addEventListener('click', () => {
            toggle(mobileBtn.getAttribute('aria-expanded') !== 'true');
        });
        mobilePanel.querySelectorAll('[data-close],[data-close-overlay]').forEach(el => {
            el.addEventListener('click', () => toggle(false));
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
    }
};