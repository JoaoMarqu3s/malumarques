document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU HAMBÚRGUER (MOBILE/TABLET) ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.header__nav-link');

    // Abre/Fecha o menu ao clicar no botão
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (ótimo para one-page sites)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerButton.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- LÓGICA DA ANIMAÇÃO DE ENTRADA (SOMENTE DESKTOP) ---
    const logoContainer = document.querySelector('.header__logo-container');
    const nav = document.querySelector('.header__nav');
    const ctaContainer = document.querySelector('.header__cta-container');

    // Verifica o tamanho da tela antes de rodar a animação
    if (window.innerWidth >= 1024 && logoContainer) {
        
        // Inicia a animação da logo
        logoContainer.classList.add('header__logo-container--animated');

        // Quando a animação da logo terminar, inicia a da navegação e CTA
        logoContainer.addEventListener('animationend', (event) => {
            if (event.animationName === 'logoFadeInSlide') {
                logoContainer.classList.remove('header__logo-container--animated');
                logoContainer.classList.add('final-position');

                setTimeout(() => {
                    nav.classList.add('header__nav--animated');
                    ctaContainer.classList.add('header__cta-container--animated');
                }, 100);
            }
        });
    } else if (logoContainer) {
        // Em telas menores, apenas mostra os elementos sem animação
        logoContainer.style.opacity = 1;
        // O restante (nav, cta) é controlado pelo CSS do mobile
    }
});



// Carrossel de Slide da seção Nutrição Personalizada
let currentSlide = 0;
const cards = document.querySelectorAll(".nutrition-card");
const totalSlides = cards.length;
const carouselTrack = document.getElementById("carousel-track");

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + (2 * 15); // card width + 2*margin (15px from CSS)
    const offset = (carouselTrack.offsetWidth / 2) - (cardWidth / 2); // Center the active card
    carouselTrack.style.transform = `translateX(${-currentSlide * cardWidth + offset}px)`;

    cards.forEach((card, index) => {
        card.classList.remove("active");
        if (index === currentSlide) {
            card.classList.add("active");
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Event listeners para os botões do carrossel
document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);
        
        // Inicializar o carrossel
        updateCarousel();
    }
});


// Carrossel de Depoimentos
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;
const dots = document.querySelectorAll('.dot');
let testimonialInterval;

function updateTestimonials() {
    // Atualizar cards
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentTestimonial) {
            card.classList.add('active');
        }
    });
    
    // Atualizar dots
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentTestimonial) {
            dot.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonials();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonials();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 3000); // 3 segundos
}

function stopTestimonialAutoplay() {
    clearInterval(testimonialInterval);
}

// Event listeners para depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const nextTestimonialBtn = document.getElementById('testimonial-next');
    const prevTestimonialBtn = document.getElementById('testimonial-prev');
    
    if (nextTestimonialBtn && prevTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', () => {
            stopTestimonialAutoplay();
            nextTestimonial();
            startTestimonialAutoplay();
        });
        
        prevTestimonialBtn.addEventListener('click', () => {
            stopTestimonialAutoplay();
            prevTestimonial();
            startTestimonialAutoplay();
        });
        
        // Event listeners para os dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopTestimonialAutoplay();
                goToTestimonial(index);
                startTestimonialAutoplay();
            });
        });
        
        // Inicializar depoimentos
        updateTestimonials();
        startTestimonialAutoplay();
        
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        const testimonialCarousel = document.querySelector('.testimonials-carousel');
        if (testimonialCarousel) {
            testimonialCarousel.addEventListener('mouseenter', stopTestimonialAutoplay);
            testimonialCarousel.addEventListener('mouseleave', startTestimonialAutoplay);
        }
    }
});


// Botão Flutuante
let floatingButtonOpen = false;

function toggleFloatingButton() {
    const mainBtn = document.getElementById('floating-main-btn');
    const options = document.getElementById('floating-options');
    
    if (floatingButtonOpen) {
        // Fechar
        mainBtn.classList.remove('active');
        options.classList.remove('show');
        floatingButtonOpen = false;
    } else {
        // Abrir
        mainBtn.classList.add('active');
        options.classList.add('show');
        floatingButtonOpen = true;
    }
}

// Event listener para o botão flutuante
document.addEventListener('DOMContentLoaded', function() {
    const floatingMainBtn = document.getElementById('floating-main-btn');
    
    if (floatingMainBtn) {
        floatingMainBtn.addEventListener('click', toggleFloatingButton);
        
        // Fechar quando clicar fora
        document.addEventListener('click', function(event) {
            const floatingButton = document.getElementById('floating-button');
            if (floatingButtonOpen && !floatingButton.contains(event.target)) {
                toggleFloatingButton();
            }
        });
    }
});

