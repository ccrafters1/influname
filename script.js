document.addEventListener('DOMContentLoaded', function() {
    // Menú Móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.classList.contains('menu-toggle')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Desplazamiento suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de desplazamiento del encabezado
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Filtrado de portafolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Eliminar clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Slider de testimonios
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto deslizamiento para testimonios
    setInterval(function() {
        if (document.hasFocus()) {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
    }, 5000);
    
    // Validación de formulario
    const contactForm = document.getElementById('brandContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Validación de email
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = 'red';
                }
            }
            
            if (isValid) {
                // En una aplicación real, enviarías los datos del formulario a un servidor
                // Para este ejemplo, solo mostraremos un mensaje de éxito
                const formData = new FormData(contactForm);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log('Formulario enviado:', formValues);
                
                // Mostrar mensaje de éxito
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>¡Mensaje Enviado Exitosamente!</h3>
                        <p>Gracias por tu interés. Me pondré en contacto contigo dentro de 48 horas.</p>
                    </div>
                `;
            }
        });
    }
    
    // Animación al desplazarse
    function animateOnScroll() {
        const elements = document.querySelectorAll('.stat-box, .service-card, .portfolio-item, .feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Establecer estado inicial para animación
    document.querySelectorAll('.stat-box, .service-card, .portfolio-item, .feature').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar y desplazarse
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});