// JS de interação para rolagem suave, animações e efeitos do portfólio

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth'
        });
        section.style.boxShadow = '0 0 0 4px rgba(58, 123, 213, 0.5)';
        section.style.transition = 'box-shadow 0.5s ease';
        setTimeout(() => {
            section.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        }, 1500);
    }
}

function revealSections() {
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


import ThemeManager from './themeManager.js';
import LanguageManager from './languageManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa tema (claro/escuro/vintage)
    new ThemeManager();

    // Inicializa troca de idioma
    new LanguageManager();

    // Animação inicial
    setTimeout(() => {
        const hero = document.querySelector('.apresentacao-hero');
        if (hero) {
            hero.style.opacity = 1;
            hero.style.transform = 'translateY(0)';
        }
    }, 300);

    // Revela seções ao carregar e ao rolar
    revealSections();
    window.addEventListener('scroll', revealSections);

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

    // Botões de navegação
    document.querySelectorAll('.computer-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('onclick')?.split("'")[1];
            if (target) scrollToSection(target);
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

    // Troca de idioma dinâmica (botão ou seletor)
    const langBtn = document.getElementById('btn-lang');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = langBtn.dataset.lang || 'pt';
            const nextLang = currentLang === 'pt' ? 'en' : currentLang === 'en' ? 'es' : 'pt';
            langBtn.dataset.lang = nextLang;
            langBtn.textContent = nextLang.toUpperCase();
            carregarConteudoDinamico(nextLang);
        });
        // Carregar conteúdo dinâmico ao iniciar
        const initialLang = langBtn.dataset.lang || 'pt';
        carregarConteudoDinamico(initialLang);
    }

    // Seletor de idioma (caso exista)
    const langSelect = document.getElementById('lang-toggle');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            carregarConteudoDinamico(e.target.value);
        });
        carregarConteudoDinamico(langSelect.value);
    }

    // Botões de tema (claro/escuro/vintage)
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextTheme = btn.dataset.theme;
            document.body.classList.remove('dark', 'vintage-theme', 'modern-theme');
            if (nextTheme === 'dark') document.body.classList.add('dark');
            if (nextTheme === 'vintage') document.body.classList.add('vintage-theme');
            if (nextTheme === 'modern') document.body.classList.add('modern-theme');
            localStorage.setItem('theme', nextTheme);
        });
    });
});

function carregarConteudoDinamico(lang) {
    // Detecta página
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    if (!page) return;
    fetch(`/api/page/${page}?lang=${lang}`)
        .then(res => res.json())
        .then(data => {
            if (!data || typeof data !== 'object') return;
            // Apresentação
            if (page === 'apresentacao') {
                document.querySelector('.titulo-principal').textContent = data.titulo || '';
                document.querySelector('.apresentacao-texto').textContent = data.texto || '';
                document.querySelector('.destaque p').textContent = data.destaque || '';
                document.querySelector('h3').textContent = data.objetivo_titulo || '';
                document.querySelector('h3 + p').textContent = data.objetivo_texto || '';
            }
            // Habilidades
            if (page === 'habilidades') {
                document.querySelector('.titulo-principal').textContent = data.titulo || '';
                const cards = document.querySelectorAll('.habilidade-card');
                if (cards.length && data.cards) {
                    cards[0].querySelector('h3').textContent = data.cards[0].titulo || '';
                    cards[0].querySelector('ul').innerHTML = (data.cards[0].itens || []).map(item => `<li>${item}</li>`).join('');
                    cards[1].querySelector('h3').textContent = data.cards[1].titulo || '';
                    cards[1].querySelector('ul').innerHTML = (data.cards[1].itens || []).map(item => `<li>${item}</li>`).join('');
                    cards[2].querySelector('h3').textContent = data.cards[2].titulo || '';
                    cards[2].querySelector('ul').innerHTML = (data.cards[2].itens || []).map(item => `<li>${item}</li>`).join('');
                }
            }
            // Experiência
            if (page === 'experiencia') {
                document.querySelector('.titulo-principal').textContent = data.titulo || '';
                const items = document.querySelectorAll('.experiencia-item');
                if (items.length && data.experiencias) {
                    items.forEach((item, idx) => {
                        if (data.experiencias[idx]) {
                            item.querySelector('h3').textContent = data.experiencias[idx].cargo || '';
                            item.querySelector('p').innerHTML = `<strong>Empresa:</strong> ${data.experiencias[idx].empresa} | <strong>Período:</strong> ${data.experiencias[idx].periodo} | ${data.experiencias[idx].local}`;
                            item.querySelector('ul').innerHTML = (data.experiencias[idx].atividades || []).map(a => `<li>${a}</li>`).join('');
                        }
                    });
                }
            }
            // Certificações
            if (page === 'certificacoes') {
                document.querySelector('.titulo-principal').textContent = data.titulo || '';
                const certs = document.querySelectorAll('.certificado-item');
                if (certs.length && data.certificados) {
                    certs.forEach((cert, idx) => {
                        if (data.certificados[idx]) {
                            cert.querySelector('div').innerHTML = `<strong>${data.certificados[idx].titulo}</strong><br><span>${data.certificados[idx].emissor}</span>`;
                        }
                    });
                }
                // Perfis profissionais
                const perfis = document.querySelectorAll('ul li a.link');
                if (perfis.length && data.perfis) {
                    perfis.forEach((a, idx) => {
                        if (data.perfis[idx]) {
                            a.textContent = data.perfis[idx].nome;
                            a.href = data.perfis[idx].url;
                        }
                    });
                }
            }
            // Contato
            if (page === 'contato') {
                document.querySelector('.titulo-principal').textContent = data.titulo || '';
                const info = document.querySelectorAll('ul li');
                if (info.length && data.contato) {
                    info[0].innerHTML = `<strong>Telefone:</strong> ${data.contato.telefone}`;
                    info[1].innerHTML = `<strong>Email:</strong> ${data.contato.email}`;
                    info[2].innerHTML = `<strong>LinkedIn:</strong> <a href="${data.contato.linkedin}" target="_blank">${data.contato.linkedin}</a>`;
                }
            }
        })
        .catch(() => {});
}
