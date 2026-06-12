document.addEventListener("DOMContentLoaded", function() {
    // Го наоѓаме секој елемент со класата 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Се пали кога 15% од елементот е видлив
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Додава класа за да се појави
                entry.target.classList.add('visible');
                // Престанува да го следи откако ќе се појави
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    let lastScrollTop = 0;
    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Кога сме на самиот врв од страната (на почеток)
        if (scrollTop <= 50) {
            header.classList.remove("hidden");
            header.classList.remove("scrolled"); // Ја трга белата позадина
            return;
        }

        // Штом почнеш да скролаш, стави му бела позадина за да се чита
        header.classList.add("scrolled");

        // Споредува дали скролаш надоле или нагоре
        if (scrollTop > lastScrollTop) {
            // Скролаш надоле - скриј го менито
            header.classList.add("hidden");
        } else {
            // Скролаш нагоре - покажи го менито
            header.classList.remove("hidden");
        }

        lastScrollTop = scrollTop;
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


// =========================================
// --- MOBILE MENU ЛОГИКА ---
// =========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

function openMobileMenu() {
    if (mobileMenuPanel && mobileMenuOverlay) {
        mobileMenuPanel.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeMobileMenu() {
    if (mobileMenuPanel && mobileMenuOverlay) {
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// =========================================
// --- МОБИЛНИ ПАЃАЧКИ МЕНИЈА (ACCORDION) ---
// =========================================
const mobileDropdownHeaders = document.querySelectorAll('.mobile-dropdown-header');

mobileDropdownHeaders.forEach(header => {
    const toggleBtn = header.querySelector('.mobile-toggle-btn');
    
    header.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const submenu = header.nextElementSibling;
        
        if (submenu.classList.contains('active')) {
            submenu.classList.remove('active');
            if (toggleBtn) toggleBtn.style.transform = 'rotate(0deg)';
        } else {
            // Ги затвораме претходно отворените за беспрекорен преглед
            document.querySelectorAll('.mobile-submenu').forEach(sub => sub.classList.remove('active'));
            document.querySelectorAll('.mobile-toggle-btn').forEach(btn => btn.style.transform = 'rotate(0deg)');
            
            submenu.classList.add('active');
            if (toggleBtn) toggleBtn.style.transform = 'rotate(180deg)';
        }
    });
});