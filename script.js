const tickerItems = document.querySelectorAll('.ticker-item');
let currentIndex = 0;

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

// Суптилна анимација за појавување при скролање (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15, // Активирај кога 15% од елементот ќе се види на екран
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Додај ја класата active за да почне CSS транзицијата
                entry.target.classList.add('active');
                // Престани да го следиш елементот откако ќе се појави
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    const panels = document.querySelectorAll('.accordion-panel');

panels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}
const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        /* 1. НА САМИОТ ВРВ (под 40px) - Врати сè во нормала, проѕирно и под лентата */
        if (currentScroll <= 40) {
            header.classList.remove('scrolled');
            header.classList.remove('hide-header');
            lastScroll = currentScroll;
            return;
        }

        /* 2. СКРОЛАЊЕ НАДОЛУ - МАЗНО КРИЕЊЕ */
        if (currentScroll > lastScroll) {
            // Само му даваме команда да излизга нагоре (-120%).
            // НЕ додаваме .scrolled тука! Така нема да "светне" бело пред да се скрие, 
            // туку мазно ќе си замине нагоре дури и од Херо секцијата.
            header.classList.add('hide-header');
        } 
        
        /* 3. СКРОЛАЊЕ НАГОРЕ - ПОЈАВУВАЊЕ БЕЛО МЕНИ */
        else {
            header.classList.add('scrolled');
            header.classList.remove('hide-header');
        }

        lastScroll = currentScroll;
    });


    // --- Твојот претходен JS код останува ист ---
// ... 

// =========================================
// --- НОВО: SEARCH PANEL ЛОГИКА ---
// =========================================

// Ја таргетираме постоечката Search икона во хедерот според нејзиниот aria-label
const searchBtn = document.querySelector('.icon-btn[aria-label="Search"]');
const searchPanel = document.getElementById('searchPanel');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');

function openSearch() {
    searchPanel.classList.add('active');
    searchOverlay.classList.add('active');
    // Го спречуваме скролањето на страната додека е отворено пребарувањето
    document.body.style.overflow = 'hidden'; 
}

function closeSearch() {
    searchPanel.classList.remove('active');
    searchOverlay.classList.remove('active');
    // Го враќаме скролањето во нормала
    document.body.style.overflow = ''; 
}

// Додаваме Event Listeners
if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
}

if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearch);
}

// Ако корисникот кликне на темната позадина надвор од панелот, истиот ќе се затвори
if (searchOverlay) {
    searchOverlay.addEventListener('click', closeSearch);
}
// =========================================
// --- НОВО: SHOPPING BAG (CART) ЛОГИКА ---
// =========================================

// Ја таргетираме постоечката Cart икона во хедерот
const cartBtn = document.querySelector('.icon-btn[aria-label="Cart"]');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartCloseBtn = document.getElementById('cartCloseBtn');

function openCart() {
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
    // Спречува скролање на главната страна
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
    // Враќа скролање
    document.body.style.overflow = ''; 
}

// Event Listeners
if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
}

if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCart);
}

// Затворање при клик на темната позадина
if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
}

// =========================================
// --- НОВО: MOBILE MENU LOGIC ---
// =========================================

const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');

function openMobileMenu() {
    if (mobileMenuPanel && mobileMenuOverlay) {
        mobileMenuPanel.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Спречува скролање позади
    }
}

function closeMobileMenu() {
    if (mobileMenuPanel && mobileMenuOverlay) {
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Accordion логика внатре во мобилното мени
const mobileAccordions = document.querySelectorAll('.m-accordion-btn');

mobileAccordions.forEach(btn => {
    btn.addEventListener('click', function() {
        const content = this.nextElementSibling;
        
        // Ако сакаш да се затвораат другите кога отвораш едно
        document.querySelectorAll('.m-accordion-content').forEach(item => {
            if (item !== content) {
                item.classList.remove('open');
            }
        });

        content.classList.toggle('open');
    });
});