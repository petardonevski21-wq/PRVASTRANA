document.addEventListener('DOMContentLoaded', () => {
    // 1. Логика за копчињата за големина (SIZE)
    const sizeButtons = document.querySelectorAll('.size-btn:not(.disabled)');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            addToCartBtn.textContent = 'Add to Bag';
        });
    });

    // 2. Логика за табовите со анимација (TABS)
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 3. TICKER ANIMATION (ANNOUNCEMENT BAR)
    const tickerItems = document.querySelectorAll('.ticker-item');
    let currentIndex = 0;

    if (tickerItems.length > 0) {
        tickerItems[0].classList.add('active');
        setInterval(() => {
            tickerItems[currentIndex].classList.remove('active');
            tickerItems[currentIndex].classList.add('exit');
            currentIndex = (currentIndex + 1) % tickerItems.length;
            tickerItems[currentIndex].classList.add('active');
            setTimeout(() => {
                tickerItems.forEach(item => item.classList.remove('exit'));
            }, 800);
        }, 5000);
    }

    // 4. REVEAL ON SCROLL ANIMATION
    const revealElements = document.querySelectorAll('.reveal-up');
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

    // 5. ACCORDION MENU HOVER LOGIC
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        });
    });

    // 6. HEADER SCROLL (SMOOTH SHOW/HIDE)
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        // Скролање надоле: сокриј го хедерот
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hide-header');
        } 
        // Скролање нагоре: покажи го хедерот
        else {
            header.classList.remove('hide-header');
        }

        lastScroll = currentScroll;
    });

    // =========================================
    // --- SEARCH PANEL ЛОГИКА ---
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
    // --- SHOPPING BAG (CART) ЛОГИКА ---
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
// --- МОБИЛНО МЕНИ ЛОГИКА ---
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