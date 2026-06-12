/* =========================================
   HEADER SCROLL + FILTER BAR SYNC LOGIC
========================================= */
const header = document.querySelector('.site-header');
const filterBar = document.querySelector('.filter-bar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;

    // Кога сме на самиот врв (помалку од 10px скролнато)
    if (currentScroll <= 10) {
        header.classList.remove('scrolled');
        header.classList.remove('hide-header');
        if (filterBar) filterBar.classList.remove('shift-up'); // Го враќа филтерот под менито
        lastScroll = currentScroll;
        return;
    }

    // Скролање надолу - го сокрива главното мени со анимација и го качува филтерот најгоре (top: 0)
    if (currentScroll > lastScroll) {
        header.classList.add('hide-header');
        if (filterBar) filterBar.classList.add('shift-up');
    } 
    // Скролање нагоре - го враќа белото мени надолe и го спушта филтерот под него
    else {
        header.classList.add('scrolled');
        header.classList.remove('hide-header');
        if (filterBar) filterBar.classList.remove('shift-up');
    }
    
    lastScroll = currentScroll;
});


/* =========================================
   TICKER ANIMATION (ANNOUNCEMENT BAR)
========================================= */
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


/* =========================================
   REVEAL ON SCROLL ANIMATION
========================================= */
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


/* =========================================
   ACCORDION MENU HOVER LOGIC
========================================= */
const panels = document.querySelectorAll('.accordion-panel');

panels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
    });
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

if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
}

if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearch);
}

if (searchOverlay) {
    searchOverlay.addEventListener('click', closeSearch);
}

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

if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
}

if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
}

// =========================================================================
// --- ЛОГИКА ЗА МОБИЛНО СТРАНИЧНО МЕНИ (СЛИКА kateg.JPG) ---
// =========================================================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavPanel = document.getElementById('mobileNavPanel');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavCloseBtn = document.getElementById('mobileNavCloseBtn');

// Отворање на мобилното мени
function openMobileNav() {
    if (mobileNavPanel && mobileNavOverlay) {
        mobileNavPanel.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Спречува скролање во позадина
    }
}

// Затворање на мобилното мени
function closeMobileNav() {
    if (mobileNavPanel && mobileNavOverlay) {
        mobileNavPanel.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Враќа нормално скролање
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
if (mobileNavCloseBtn) mobileNavCloseBtn.addEventListener('click', closeMobileNav);
if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);


// --- АНИМАЦИЈА И СИНХРОНИЗАЦИЈА ЗА ХАРМОНИКАТА (ACCORDION LOGIC) ---
const mobAccordionTriggers = document.querySelectorAll('.mob-accordion-trigger');

mobAccordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        const currentItem = this.parentElement;
        const isOpen = currentItem.classList.contains('active');
        
        // КЛУЧНО БАРАЊЕ: Кога ќе се упали едно, сите други се гасат автоматски
        document.querySelectorAll('.mob-accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Ако не била отворена ставката, отвори ја сега
        if (!isOpen) {
            currentItem.classList.add('active');
        }
    });
});