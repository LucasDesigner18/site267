document.addEventListener('DOMContentLoaded', function() {
    // Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Iniciar slideshow automático com intervalo baseado no dispositivo
    let slideInterval;
    function startSlideShow() {
        if (window.matchMedia("(max-width: 767px)").matches) {
            // Mobile - intervalo mais lento
            slideInterval = setInterval(nextSlide, 8000);
        } else {
            // Desktop/Tablet - intervalo normal
            slideInterval = setInterval(nextSlide, 5000);
        }
    }
    
    showSlide(0);
    startSlideShow();
    
    // Navegação por botões
    document.querySelector('.prev-slide').addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    document.querySelector('.next-slide').addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Navegação por swipe (apenas mobile)
    if (window.matchMedia("(max-width: 767px)").matches) {
        const slideshow = document.querySelector('.slideshow');
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideshow.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        slideshow.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
                resetInterval();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide();
                resetInterval();
            }
        }
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }
    
    // Animação dos contadores
    const counters = document.querySelectorAll('.stat-number');
    const speed = window.matchMedia("(max-width: 767px)").matches ? 100 : 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    animateCounters();
    
    // FAQ - abrir e fechar resposta
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            
            // Fecha todos antes
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = null;
            });
            
            // Abre se estava fechado
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    
    // Botão do WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-float');
    whatsappButton.addEventListener('click', function() {
        // Rastreamento do Google Analytics (opcional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': 'Botão Flutuante'
            });
        }
    });
});


// Animações ao rolar a tela (scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});
