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


// ==================== Carrossel de Nutrição Personalizada (LOOP INFINITO CORRIGIDO) ====================
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.getElementById('nutrition-carousel');
    if (!carouselContainer) return;

    const track = document.getElementById('nutrition-track');
    let originalCards = Array.from(track.children);
    const prevBtn = document.getElementById('nutrition-prev');
    const nextBtn = document.getElementById('nutrition-next');

    if (originalCards.length === 0) return;

    let isTransitioning = false;
    let cardsToShow = 3;
    let currentIndex = 0; // Este índice será relativo aos cards ORIGINAIS

    // Função para re-construir o carrossel (útil para resize)
    function setupCarousel() {
        // Limpa o track para reconstruir com os clones corretos
        track.innerHTML = '';
        originalCards.forEach(card => track.appendChild(card));
        
        updateCardsToShow();

        const clonesStart = originalCards.slice(-cardsToShow).map(card => card.cloneNode(true));
        const clonesEnd = originalCards.slice(0, cardsToShow).map(card => card.cloneNode(true));

        track.prepend(...clonesStart);
        track.append(...clonesEnd);

        // Posição inicial (mostrando os primeiros cards originais)
        currentIndex = 0;
        repositionTrack();
    }
    
    function getCardWidth() {
        const card = track.querySelector('.nutrition-card');
        if (!card) return 0;
        const cardMargin = parseInt(window.getComputedStyle(track).gap);
        return card.offsetWidth + cardMargin;
    }
    
    function updateCardsToShow() {
        if (window.innerWidth <= 768) {
            cardsToShow = 1;
        } else if (window.innerWidth <= 992) {
            cardsToShow = 2;
        } else {
            cardsToShow = 3;
        }
    }

    function repositionTrack() {
        const offset = cardsToShow * getCardWidth();
        track.style.transform = `translateX(-${offset}px)`;
    }

    function moveCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Atualiza o índice com base nos cards originais
        currentIndex += direction;
        
        track.classList.add('transitioning');
        
        const offset = (cardsToShow + currentIndex) * getCardWidth();
        track.style.transform = `translateX(-${offset}px)`;

        // Listener de transição para o "salto mágico" do loop
        track.addEventListener('transitionend', () => {
            if (currentIndex === originalCards.length) { // Chegou ao fim (nos clones)
                track.classList.remove('transitioning');
                currentIndex = 0;
                repositionTrack();
            }
            if (currentIndex === -1) { // Chegou ao início (nos clones)
                track.classList.remove('transitioning');
                currentIndex = originalCards.length - 1;
                const endOffset = (cardsToShow + currentIndex) * getCardWidth();
                track.style.transform = `translateX(-${endOffset}px)`;
            }
            isTransitioning = false;
        }, { once: true }); // {once: true} é a chave! Garante que o listener só rode uma vez por clique.
    }

    nextBtn.addEventListener('click', () => moveCarousel(1));
    prevBtn.addEventListener('click', () => moveCarousel(-1));
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupCarousel(); // Recria tudo para garantir que funcione perfeitamente
        }, 250);
    });

    // Inicialização
    setupCarousel();
});




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


// ==================== Lógica do Modal de Detalhes do Card ====================
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('card-detail-modal');
    const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');
    const modalBody = modalOverlay.querySelector('.modal-body');
    const saibaMaisBtns = document.querySelectorAll('.nutrition-card .btn-saiba-mais');

    saibaMaisBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que o botão faça alguma ação padrão
            const card = event.target.closest('.nutrition-card');
            
            // Clona o conteúdo relevante do card para o modal
            const cardContent = {
                icon: card.querySelector('.card-icon') ? card.querySelector('.card-icon').outerHTML : '',
                title: card.querySelector('h3') ? card.querySelector('h3').outerHTML : '',
                image: card.querySelector('.card-image') ? card.querySelector('.card-image').outerHTML : '',
                description: card.querySelector('p') ? card.querySelector('p').outerHTML : ''
            };

            // Adicione mais detalhes se necessário. Por exemplo:
            // const fullDescription = card.dataset.fullDescription || cardContent.description;
            // O ideal seria ter um "data-full-description" no HTML do card
            // para um texto mais longo no modal.

            // Preenche o modal com o conteúdo do card
            modalBody.innerHTML = `
                <div style="text-align: center;">
                    ${cardContent.icon}
                    ${cardContent.title}
                </div>
                ${cardContent.image}
                ${cardContent.description}
                <p>Detalhes adicionais sobre este serviço podem ser inseridos aqui para uma experiência mais completa ao usuário. Explore os benefícios de uma ${cardContent.title.replace(/<\/?h3>/g, '').toLowerCase()} para a sua saúde e bem-estar.</p>
            `;

            // Abre o modal
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open'); // Adiciona classe para desfoque do body
        });
    });

    // Fecha o modal ao clicar no botão de fechar ou no overlay
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) { // Só fecha se clicar diretamente no overlay
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // Fecha o modal ao pressionar a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
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

