// SyntaxValidator.js - Módulo responsável por validar a sintaxe de diferentes linguagens de programação
// utilizando serviços externos (W3C para HTML/CSS) e validação nativa para JavaScript.

import { chatManager } from '../../Projetos/ValidadorCodigo/js/chat.js'; // Importa o gerenciador de chat para exibir mensagens.

/**
 * Classe responsável pela validação da sintaxe de códigos HTML, CSS e JavaScript.
 * Interage com o LanguageDetector para verificar a linguagem e com serviços W3C para validação externa.
 */
export class SyntaxValidator {
    /**
     * Construtor da classe SyntaxValidator.
     * @param {LanguageDetector} languageDetector - Uma instância de LanguageDetector para identificar a linguagem do código.
     */
    constructor(languageDetector) {
        this.languageDetector = languageDetector; // Atribui o detector de linguagem para uso interno.
        this.languageWarningTimeout = null; // Para controlar o tempo de exibição do banner de aviso.
    }

    /**
     * Valida a sintaxe do código fornecido com base na linguagem selecionada.
     * Inclui uma verificação de incompatibilidade de linguagem e utiliza validadores específicos.
     * @param {string} code - O trecho de código a ser validado.
     * @param {string} selectedLanguage - A linguagem que o usuário selecionou no dropdown (ex: 'html', 'css', 'javascript').
     * @param {HTMLElement} languageWarningBanner - O elemento HTML do banner de aviso de linguagem.
     * @element chatBox, languageWarningBanner
     */
    async validate(code, selectedLanguage, languageWarningBanner) {
        // Tenta detectar a linguagem real do código.
        const detectedLanguage = this.languageDetector.detectLanguage(code);

        // Se a linguagem detectada não for 'unknown' E for diferente da selecionada pelo usuário,
        // exibe um aviso de incompatibilidade.
        if (detectedLanguage !== 'unknown' && detectedLanguage !== selectedLanguage) {
            const detectedName = this.languageDetector.getLanguageName(detectedLanguage); // Nome da linguagem detectada.
            const selectedName = this.languageDetector.getLanguageName(selectedLanguage); // Nome da linguagem selecionada.
            // Mensagem de erro amigável.
            const errorMessage = `Atenção: Você selecionou <strong>${selectedName}</strong>, mas o código parece ser <strong>${detectedName}</strong>. A validação será feita para <strong>${selectedName}</strong>.`;
            this.showLanguageMismatchError(errorMessage, languageWarningBanner);
            // IMPORTANTE: Não retornamos aqui. Permitimos que a validação prossiga para a `selectedLanguage`.
            // O `app.js` é responsável por verificar o estado do `languageWarningBanner` e interromper as
            // validações subsequentes (indentação, POO/UML) se ele estiver ativo.
        } else {
            // Se a linguagem for compatível ou detectada como 'unknown' (e não há conflito),
            // escondemos qualquer banner de aviso anterior.
            this.hideLanguageWarningBanner(languageWarningBanner);
        }
        
        // Direciona a validação para o método específico da linguagem selecionada.
        switch (selectedLanguage) {
            case 'html':
                chatManager.adicionarMensagem('Analisando HTML com o validador W3C...', 'assistant-message info');
                await this.validateHTML_W3C(code);
                break;
            case 'css':
                chatManager.adicionarMensagem('Analisando CSS com o validador W3C Jigsaw...', 'assistant-message info');
                await this.validateCSS_W3C(code);
                break;
            case 'javascript':
                chatManager.adicionarMensagem('Analisando JavaScript (sintaxe básica)...', 'assistant-message info');
                this.validateJavaScript(code);
                break;
            default:
                // Mensagem para linguagens não suportadas pela validação de sintaxe.
                chatManager.adicionarMensagem(
                    `<p class="warning">⚠️ Linguagem "${this.languageDetector.getLanguageName(selectedLanguage)}" não suportada para validação de sintaxe. Por favor, selecione HTML, CSS ou JavaScript.</p>`,
                    'assistant-message'
                );
                break;
        }
    }

    /**
     * Valida a sintaxe HTML usando o serviço de validação "Nu Html Checker" do W3C.
     * @param {string} code - O código HTML a ser validado.
     * @element chatBox
     */
    async validateHTML_W3C(code) {
        try {
            // Faz uma requisição POST para o validador Nu Html Checker.
            const response = await fetch('https://validator.w3.org/nu/?out=json', {
                method: 'POST',
                headers: { 'Content-Type': 'text/html; charset=UTF-8' }, // Define o tipo de conteúdo como HTML.
                body: code // O corpo da requisição é o código HTML a ser validado.
            });

            // Verifica se a requisição foi bem-sucedida.
            if (!response.ok) {
                throw new Error(`Serviço W3C HTML retornou status ${response.status}.`);
            }

            const data = await response.json(); // Converte a resposta para JSON.
            // Filtra as mensagens para incluir apenas erros e avisos.
            const errorsAndWarnings = data.messages.filter(msg => msg.type === 'error' || msg.type === 'warning');

            if (errorsAndWarnings.length === 0) {
                // Se não houver erros ou avisos, o código é considerado válido.
                chatManager.adicionarMensagem('<p class="success">✅ Sintaxe HTML válida de acordo com o W3C.</p>', 'assistant-message');
            } else {
                // Se houver erros ou avisos, formata-os para exibição.
                let messagesHtml = errorsAndWarnings.map(msg =>
                    `<div class="error-item ${msg.type}">
                        <p class="error-title">${msg.type === 'error' ? '❌ Erro' : '⚠️ Aviso'} na linha ${msg.lastLine || msg.firstLine}:</p>
                        <p class="error-detail">${this.escapeHtml(msg.message)}</p>
                        ${msg.extract ? `<pre class="code-example">${this.escapeHtml(msg.extract)}</pre>` : ''}
                    </div>`
                ).join(''); // Concatena todas as mensagens formatadas.
                chatManager.adicionarMensagem(messagesHtml, 'assistant-message');
            }
        } catch (error) {
            // Captura e exibe erros que ocorrem durante a comunicação com o serviço W3C.
            chatManager.adicionarMensagem(`<p class="error">❌ Erro ao contatar o serviço de validação W3C HTML: ${this.escapeHtml(error.message)}. Por favor, tente novamente.</p>`, 'assistant-message');
        }
    }

    /**
     * Valida a sintaxe CSS usando o serviço "Jigsaw CSS Validator" do W3C.
     * @param {string} code - O código CSS a ser validado.
     * @element chatBox
     */
    async validateCSS_W3C(code) {
        const formData = new FormData(); // Cria um objeto FormData para enviar os dados.
        formData.append("text", code);      // Adiciona o código CSS.
        formData.append("output", "json");  // Solicita a saída em formato JSON.
        formData.append("profile", "css3"); // Define o perfil de validação para CSS3.

        try {
            // Faz uma requisição POST para o validador Jigsaw CSS.
            const response = await fetch('https://jigsaw.w3.org/css-validator/validator', {
                method: 'POST',
                body: formData // O corpo da requisição é o FormData.
            });

            // Verifica se a requisição foi bem-sucedida.
            if (!response.ok) {
                throw new Error(`Serviço W3C CSS retornou status ${response.status}.`);
            }

            const data = await response.json(); // Converte a resposta para JSON.
            // O Jigsaw retorna erros e avisos em objetos separados, combinamos em um único array.
            const allMessages = [
                ...(data.cssvalidation.errors || []),
                ...(data.cssvalidation.warnings || [])
            ];

            if (allMessages.length === 0) {
                // Se não houver erros ou avisos, o código é considerado válido.
                chatManager.adicionarMensagem('<p class="success">✅ Sintaxe CSS válida de acordo com o W3C.</p>', 'assistant-message');
            } else {
                // Se houver erros ou avisos, formata-os para exibição.
                let messagesHtml = allMessages.map(msg => {
                    const typeClass = msg.type === 'error' ? 'error' : 'warning'; // Define a classe CSS com base no tipo.
                    const typeText = msg.type === 'error' ? '❌ Erro' : '⚠️ Aviso'; // Define o texto do tipo.
                    return `<div class="error-item ${typeClass}">
                                <p class="error-title">${typeText} na linha ${msg.line}:</p>
                                <p class="error-detail">${this.escapeHtml(msg.message)}</p>
                            </div>`;
                }).join(''); // Concatena todas as mensagens formatadas.
                chatManager.adicionarMensagem(messagesHtml, 'assistant-message');
            }
        } catch (error) {
            // Captura e exibe erros que ocorrem durante a comunicação com o serviço W3C.
            chatManager.adicionarMensagem(`<p class="error">❌ Erro ao contatar o serviço de validação W3C CSS: ${this.escapeHtml(error.message)}. Verifique sua conexão ou tente novamente.</p>`, 'assistant-message');
        }
    }

    /**
     * Valida a sintaxe JavaScript usando o construtor Function.
     * Este método é simples e eficaz para detectar erros de sintaxe básicos sem executar o código.
     * @param {string} code - O código JavaScript a ser validado.
     * @element chatBox
     */
    validateJavaScript(code) {
        try {
            // Tenta criar uma nova função com o código. Se houver um erro de sintaxe,
            // o construtor 'new Function()' lançará uma exceção.
            new Function(code);
            chatManager.adicionarMensagem('<p class="success">✅ Sintaxe JavaScript válida.</p>', 'assistant-message');
        } catch (e) {
            // Captura o erro de sintaxe e o formata para exibição no chat.
            const errorMessage = `<div class="error-item error">
                                    <p class="error-title">❌ Erro de Sintaxe JavaScript:</p>
                                    <p class="error-detail">${this.escapeHtml(e.message)}</p>
                                    <p class="info">Dica: Verifique a pontuação, chaves e parênteses.</p>
                                  </div>`;
            chatManager.adicionarMensagem(errorMessage, 'assistant-message');
        }
    }

    /**
     * Exibe um banner de aviso na parte superior da tela informando sobre uma incompatibilidade de linguagem.
     * O banner se esconde automaticamente após um tempo.
     * @param {string} message - A mensagem a ser exibida no banner.
     * @param {HTMLElement} languageWarningBanner - O elemento HTML do banner de aviso.
     * @element languageWarningBanner
     */
    showLanguageMismatchError(message, languageWarningBanner) {
        // Limpa qualquer timeout anterior para evitar múltiplos banners ou ocultações prematuras.
        if (this.languageWarningTimeout) {
            clearTimeout(this.languageWarningTimeout);
        }

        // Define o conteúdo HTML do banner.
        languageWarningBanner.innerHTML = `⚠️ <strong style="color: #9f6000;">Atenção:</strong> ${message} <span style="font-size: 0.9em; opacity: 0.8;">(Clique para fechar)</span>`;
        languageWarningBanner.classList.remove('hidden'); // Remove a classe 'hidden' para exibir o banner.
        languageWarningBanner.classList.add('active'); // Adiciona a classe 'active' para indicar que está visível.

        // Define um timeout para ocultar o banner automaticamente após 7 segundos.
        this.languageWarningTimeout = setTimeout(() => {
            this.hideLanguageWarningBanner(languageWarningBanner);
        }, 7000); // 7 segundos
    }

    /**
     * Oculta o banner de aviso de incompatibilidade de linguagem.
     * @param {HTMLElement} languageWarningBanner - O elemento HTML do banner de aviso.
     * @element languageWarningBanner
     */
    hideLanguageWarningBanner(languageWarningBanner) {
        languageWarningBanner.classList.add('hidden'); // Adiciona a classe 'hidden' para iniciar a transição de ocultamento.
        languageWarningBanner.classList.remove('active'); // Remove a classe 'active'.
        languageWarningBanner.textContent = ''; // Limpa o texto para reutilização.
        if (this.languageWarningTimeout) {
            clearTimeout(this.languageWarningTimeout); // Limpa o timeout se o banner for fechado manualmente.
            this.languageWarningTimeout = null;
        }
    }

    /**
     * Escapa caracteres HTML especiais em uma string para evitar problemas de segurança (XSS)
     * e garantir que o texto seja exibido corretamente no HTML.
     * @param {string} unsafe - A string contendo caracteres potencialmente não seguros.
     * @returns {string} A string com os caracteres HTML escapados.
     */
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")  // Escapa o caractere '&'
            .replace(/</g, "&lt;")   // Escapa o caractere '<'
            .replace(/>/g, "&gt;")   // Escapa o caractere '>'
            .replace(/"/g, "&quot;") // Escapa o caractere '"'
            .replace(/'/g, "&#039;"); // Escapa o caractere "'"
    }
}