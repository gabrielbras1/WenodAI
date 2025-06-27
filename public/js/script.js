document.addEventListener('DOMContentLoaded', function() {

    // Lógica para o menu mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fecha o menu mobile quando um link é clicado
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Adiciona a classe 'scrolled' ao nav durante o scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Destaque do link ativo durante o scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Lógica para o formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Enviando...';
            submitButton.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Obrigado pelo seu contato! Retornaremos em breve.');
                    contactForm.reset();
                } else {
                    alert('Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Ocorreu um erro de rede. Por favor, verifique a sua conexão e tente novamente.');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Animações com ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 2000,
            delay: 200,
            reset: true
        });

        sr.reveal('.hero-content, .section-title, .section-subtitle', {});
        sr.reveal('.problem-card, .feature-card, .result-card', { interval: 200 });
        sr.reveal('.step', { interval: 200, origin: 'left' });
        sr.reveal('.contact-info', { origin: 'left' });
        sr.reveal('.contact-form', { origin: 'right' });
    }

});

// Add ScrollReveal library
const scrollRevealScript = document.createElement('script');
scrollRevealScript.src = 'https://unpkg.com/scrollreveal';
document.head.appendChild(scrollRevealScript);
