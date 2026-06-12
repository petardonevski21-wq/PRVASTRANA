// Селектирање на елементите за менаџирање со формите
const signInBlock = document.getElementById('signInBlock');
const registerBlock = document.getElementById('registerBlock');

const toRegisterBtn = document.getElementById('toRegisterBtn');
const toSignInBtn = document.getElementById('toSignInBtn');

function showRegister() {
    signInBlock.classList.remove('active');
    registerBlock.classList.add('active');
}

function showSignIn() {
    registerBlock.classList.remove('active');
    signInBlock.classList.add('active');
}

if (toRegisterBtn) {
    toRegisterBtn.addEventListener('click', showRegister);
}

if (toSignInBtn) {
    toSignInBtn.addEventListener('click', showSignIn);
}

// HEADER SCROLL
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
// --- SEARCH PANEL ЛОГИКА ---
// =========================================
const searchBtn = document.querySelector('.icon-btn[aria-label="Search"]');
const searchPanel = document.getElementById('searchPanel');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseBtn = document.getElementById('searchCloseBtn');

function openSearch() {
    searchPanel.classList.add('active');
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeSearch() {
    searchPanel.classList.remove('active');
    searchOverlay.classList.remove('active');
    document.body.style.overflow = ''; 
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
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = ''; 
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

// =========================================
// --- MOBILE MENU & ACCORDION ЛОГИКА ---
// =========================================

const hamburgerBtn = document.querySelector('.hamburger-btn');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function openMobileMenu() {
    mobileMenuPanel.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuPanel.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Accordion (слајдинг) ефект за линковите внатре во менито
const accordionBtns = document.querySelectorAll('.mobile-accordion-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Ако нема content (пр. About Us, Contact), не прави ништо
        const content = this.nextElementSibling;
        if (!content) return;

        // Затворање на сите други отворени
        accordionBtns.forEach(otherBtn => {
            if (otherBtn !== this) {
                otherBtn.classList.remove('active');
                if (otherBtn.nextElementSibling) {
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            }
        });

        // Тоглирање на моменталното
        this.classList.toggle('active');
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});