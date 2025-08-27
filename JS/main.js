// Função para rolagem suave
        function scrollToSection(sectionId) {
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

        // Animação de scroll
        function revealSections() {
            const sections = document.querySelectorAll('.secao-card, .conteudo-secao');
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    section.style.opacity = 1;
                    section.style.transform = 'translateY(0)';
                    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            });
        }

        // Inicializar
        document.addEventListener('DOMContentLoaded', () => {
            // Animação inicial
            setTimeout(() => {
                document.querySelector('.apresentacao-hero').style.opacity = 1;
                document.querySelector('.apresentacao-hero').style.transform = 'translateY(0)';
            }, 300);
            
            // Verificar seções visíveis ao carregar
            revealSections();
            
            // Adicionar evento de scroll
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
        });