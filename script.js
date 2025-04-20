// Slideshow
document.addEventListener('DOMContentLoaded', function() {
    // Configuração do slideshow
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
    
    // Iniciar slideshow automático
    showSlide(0);
    setInterval(nextSlide, 5000);
    
    // Animação dos contadores
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
        
        function updateCount() {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        }
    });
    
    // Lazy loading para imagens
    const lazyLoadBackgrounds = document.querySelectorAll('.lazy-load');
    const lazyLoadBackgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyloadBackground = entry.target;
                lazyloadBackground.classList.add('loaded');
                lazyLoadBackgroundObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px 200px 0px' });
    
    lazyLoadBackgrounds.forEach((lazyloadBackground) => {
        lazyLoadBackgroundObserver.observe(lazyloadBackground);
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

document.addEventListener('DOMContentLoaded', function() {
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

    // Iniciar slideshow automático
    showSlide(0);
    setInterval(nextSlide, 5000);

    // Setas de navegação
    document.querySelector('.prev-slide').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    document.querySelector('.next-slide').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Carrossel principal
    const slideshow = document.querySelector('.slideshow');
    const slides = slideshow.querySelectorAll('.slide');
    const prevButton = slideshow.querySelector('.prev-slide');
    const nextButton = slideshow.querySelector('.next-slide');
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

    // Iniciar slideshow automático
    showSlide(0);
    let slideInterval = setInterval(nextSlide, 5000);

    // Botões de navegação
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    // Reinicia intervalo quando clica nas setas
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
});

// FAQ - abrir e fechar resposta
document.addEventListener('DOMContentLoaded', function () {
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
});
