document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Add scrolled class to nav on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
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

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
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

    // Scroll reveal animations
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

});

// Add ScrollReveal library
const scrollRevealScript = document.createElement('script');
scrollRevealScript.src = 'https://unpkg.com/scrollreveal';
document.head.appendChild(scrollRevealScript);
