document.addEventListener("DOMContentLoaded", function() {

    // =========================================
    // --- 1. АНИМАЦИИ ПРИ СКРОЛАЊЕ ---
    // =========================================
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-right');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Анимацијата се пушта кога 15% од елементот е на екран
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // =========================================
    // --- 2. ЛОГИКА ЗА ХЕДЕРОТ (SCROLL) ---
    // =========================================
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

    // =========================================
    // --- 3. SEARCH PANEL ЛОГИКА ---
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
    // --- 4. SHOPPING BAG (CART) ЛОГИКА ---
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

    // =========================================
    // --- 5. MOBILE MENU & ACCORDION ЛОГИКА ---
    // =========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');

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

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Логика за хармоника (Accordion) со 'v' и '^' стрелки
    const accordionHeaders = document.querySelectorAll('.m-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.m-icon');
            
            // Затвори ги сите други отворени
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.nextElementSibling.style.maxHeight = null;
                    otherHeader.nextElementSibling.style.padding = '0 30px';
                    // Враќа во 'v' за затворено
                    const otherIcon = otherHeader.querySelector('.m-icon');
                    if (otherIcon) otherIcon.textContent = 'v';
                }
            });
            
            // Отвори/Затвори го моменталниот
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = '0 30px';
                icon.textContent = 'v'; // Затворено е 'v'
            } else {
                // Пресметување висина за мазна транзиција
                content.style.padding = '15px 30px';
                content.style.maxHeight = content.scrollHeight + 60 + "px"; 
                icon.textContent = '^'; // Отворено е '^'
            }
        });
    });

}); // Крај на DOMContentLoaded