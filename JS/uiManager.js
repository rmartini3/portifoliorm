// uiManager.js: Handles UI interactions and animations

export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth'
        });
        // Efeito de destaque
        section.style.boxShadow = '0 0 0 4px rgba(58, 123, 213, 0.5)';
        section.style.transition = 'box-shadow 0.5s ease';
        setTimeout(() => {
            section.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        }, 1500);
    }
}

export function revealSections() {
    const sections = document.querySelectorAll('.secao-card, .conteudo-secao');
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}

export function initUI() {
    // Menu responsivo
    document.querySelectorAll('.menu-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.menu-principal').classList.toggle('active');
        });
    });

    // Acessibilidade: foco e aria nos cards
    document.querySelectorAll('.card').forEach(card => {
        card.setAttribute('tabIndex', '0');
        const title = card.querySelector('.card-title');
        if (title) card.setAttribute('aria-label', title.textContent);
    });

    // Animação suave nos cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('focus', () => {
            card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.16)';
        });
        card.addEventListener('blur', () => {
            card.style.boxShadow = '';
        });
    });

    // Efeito de digitação no título
    const title = document.querySelector('.titulo-principal');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        let i = 0;
        const typeEffect = setInterval(() => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeEffect);
            }
        }, 80);
    }

    // Configurar botões de navegação
    document.querySelectorAll('.computer-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('onclick').split("'")[1];
            scrollToSection(target);
        });
    });

    // Formulário de contato
    const form = document.querySelector('.formulario-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            form.reset();
        });
    }

    // Animação inicial
    setTimeout(() => {
        const hero = document.querySelector('.apresentacao-hero');
        if (hero) {
            hero.style.opacity = 1;
            hero.style.transform = 'translateY(0)';
        }
    }, 300);

    // Verificar seções visíveis ao carregar
    revealSections();
    window.addEventListener('scroll', revealSections);
}
