document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. HEADER SCROLL (SMOOTH SHOW/HIDE)
    // =========================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hide-header');
        } else {
            header.classList.remove('hide-header');
        }
        lastScroll = currentScroll;
    });

    // =========================================
    // 2. REVEAL ON SCROLL ANIMATIONS
    // =========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // =========================================
    // 3. SEARCH PANEL ЛОГИКА
    // =========================================
    const searchBtn = document.querySelector('.icon-btn[aria-label="Search"]');
    const searchPanel = document.getElementById('searchPanel');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');

    function openSearch() {
        if (searchPanel && searchOverlay) {
            searchPanel.classList.add('active');
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeSearch() {
        if (searchPanel && searchOverlay) {
            searchPanel.classList.remove('active');
            searchOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

    // =========================================
    // 4. CART PANEL (SHOPPING BAG) ЛОГИКА
    // =========================================
    const cartBtn = document.querySelector('.icon-btn[aria-label="Cart"]');
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    function openCart() {
        if (cartPanel && cartOverlay) {
            cartPanel.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeCart() {
        if (cartPanel && cartOverlay) {
            cartPanel.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

});

// =========================================
    // 5. МОБИЛНО МЕНИ ЛОГИКА (ИСТО КАКО НА ГЛАВНАТА)
    // =========================================
    const mobileMenuOpenBtn = document.getElementById('mobileMenuOpenBtn');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');

    if (mobileMenuOpenBtn && mobileMenuCloseBtn && mobileMenuPanel) {
        mobileMenuOpenBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });

        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }

    // Ажурирана логика за акордеоните (ЕКСКЛУЗИВНО ЗАТВОРАЊЕ)
    const mobileAccordions = document.querySelectorAll('.mobile-accordion-btn');

    mobileAccordions.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            
            // Оваа јамка ги наоѓа сите други акордеони и ги затвора пред да го отвори новиот
            document.querySelectorAll('.mobile-accordion').forEach(acc => {
                if (acc !== parent) {
                    acc.classList.remove('active');
                }
            });

            // Го отвора или затвора кликнатиот акордеон
            parent.classList.toggle('active');
        });
    });