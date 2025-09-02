// app.js - Script principal que coordena a interface e a comunicação com o back-end.

// --- Importação de Módulos (Somente para a UI e Lógica não-crítica) ---
// Note que as classes de validação foram removidas, pois a lógica está agora no servidor.
import { chatManager } from './chat.js';
import { LanguageTips } from './LanguageTips.js';
import { ThemeManager } from './ThemeManager.js';

// URL do nosso servidor back-end
const BACKEND_URL = 'http://localhost:3001';

// --- Evento de Carregamento do DOM ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded!');

    // --- Referências aos Elementos do DOM (incomuns) ---
    // Atribui elementos HTML a constantes com verificações de segurança.
    const languageSelect = document.getElementById('languageSelect');
    const codeInput = document.getElementById('codeInput');
    const validateButton = document.getElementById('runButton');
    const checkIndentation = document.getElementById('checkIndentation');
    const checkOOP = document.getElementById('checkOOP');
    const currentLanguageSpan = document.getElementById('currentLanguage');
    const tipOfTheDayP = document.getElementById('tipOfTheDay');
    const exampleBtn = document.querySelector('.example-btn');
    const clearButton = document.getElementById('clearButton');
    const chatBox = document.getElementById('chatBox');
    const popupOverlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.querySelector('.popup .close-btn');
    const popupTitle = document.getElementById('popupTitle');
    const popupExplanation = document.getElementById('popupExplanation');
    const popupExampleCode = document.getElementById('popup-exemplo');
    const copyButton = document.getElementById('copyButton');
    const useExampleButton = document.getElementById('useExampleButton');
    const languageWarningBanner = document.getElementById('language-warning-banner');
    const themeToggle = document.getElementById('themeToggle');
    const loaderOverlay = document.getElementById('loader-overlay');

    // --- Instanciação de Classes Locais (UI e Lógica Leve) ---
    const languageTips = new LanguageTips();
    const themeManager = new ThemeManager();

    // --- Funções Auxiliares de UI ---
    function showLoader() {
        if (loaderOverlay) {
            loaderOverlay.classList.remove('hidden');
        }
    }

    function hideLoader() {
        if (loaderOverlay) {
            loaderOverlay.classList.add('hidden');
        }
    }

    function openPopup(language) {
        if (popup && popupOverlay && popupTitle && popupExplanation && popupExampleCode) {
            const exampleData = languageTips.getExample(language);
            popupTitle.textContent = exampleData.title;
            popupExplanation.textContent = exampleData.explanation;
            popupExampleCode.textContent = exampleData.code;
            popup.style.display = 'block';
            popupOverlay.style.display = 'block';
        }
    }

    function closePopup() {
        if (popup && popupOverlay) {
            popup.style.display = 'none';
            popupOverlay.style.display = 'none';
        }
    }

    function clearChat() {
        if (chatBox) {
            chatBox.innerHTML = '';
            const welcomeMessage = `
                <div class="message assistant-message">
                    <div class="message-header">
                        <span><i class="fas fa-robot"></i> Assistente</span>
                        <span class="timestamp">${new Date().toLocaleTimeString()}</span>
                    </div>
                    <p>Olá! Cole seu código e clique em "Validar Código" para verificar sua sintaxe, indentação e princípios POO/UML.</p>
                </div>`;
            chatBox.innerHTML = welcomeMessage;
        }
    }

    function updateLanguageInfo(language) {
        if (languageSelect) {
            const tip = languageTips.getRandomTip(language);
            const languageName = languageSelect.options[languageSelect.selectedIndex].text;
            if (currentLanguageSpan) currentLanguageSpan.textContent = languageName;
            if (tipOfTheDayP) tipOfTheDayP.innerHTML = `💡 Dica: ${tip}`;
        }
    }

    function handleCopyButtonState(buttonElement) {
        if (buttonElement) {
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => {
                if (buttonElement) {
                    buttonElement.innerHTML = originalText;
                }
            }, 2000);
        }
    }

    // --- Nova Função de Validação (Comunicação com o Back-end) ---
    async function handleValidation() {
        if (!codeInput || !languageSelect || !checkIndentation || !checkOOP) {
            chatManager.adicionarMensagem("Erro: Elementos da interface não encontrados. Por favor, recarregue a página.", 'assistant-message error');
            return;
        }

        const selectedLanguage = languageSelect.value;
        const codeToValidate = codeInput.value;
        const options = {
            checkIndentation: checkIndentation.checked,
            checkOOP: checkOOP.checked
        };

        if (!codeToValidate.trim()) {
            chatManager.adicionarMensagem("Por favor, insira um trecho de código para validar.", 'assistant-message warning');
            return;
        }

        showLoader();

        const userMessageHtml = `<pre class="code-example">${codeToValidate}</pre>`;
        chatManager.adicionarMensagem(userMessageHtml, 'user-message', 'Você');
        chatManager.adicionarMensagem('Enviando código para validação no servidor...', 'assistant-message info');

        try {
            const response = await fetch(`${BACKEND_URL}/api/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: codeToValidate, language: selectedLanguage, options })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Erro de servidor: ${response.status}`);
            }

            const data = await response.json();
            
            // Exibe os resultados recebidos do servidor no chat
            if (data.validationResults && data.validationResults.length > 0) {
                data.validationResults.forEach(result => {
                    if (result.type === 'syntax') {
                        // A sua lógica de exibição de resultados precisa ser adaptada para o novo formato
                        // A lógica do SyntaxValidator precisa ser exposta para cá.
                        chatManager.adicionarMensagem(result.messages, 'assistant-message');
                    } else if (result.type === 'indentation') {
                        chatManager.adicionarMensagem(result.result, 'assistant-message');
                    } else if (result.type === 'oop') {
                        chatManager.adicionarMensagem(result.result, 'assistant-message');
                    }
                });
            } else {
                 chatManager.adicionarMensagem("Nenhum problema encontrado no código!", 'assistant-message success');
            }

        } catch (error) {
            chatManager.adicionarMensagem(`<p class="error">❌ Erro na comunicação com o servidor: ${error.message}.</p>`, 'assistant-message error');
        } finally {
            hideLoader();
        }
    }

    // --- "Ouvintes" de Eventos (Event Listeners) ---
    // Adiciona a lógica de interação a cada elemento da interface.
    if (validateButton) validateButton.addEventListener('click', handleValidation);
    if (clearButton) clearButton.addEventListener('click', clearChat);
    if (languageSelect) languageSelect.addEventListener('change', (event) => {
        updateLanguageInfo(event.target.value);
    });

    if (exampleBtn) exampleBtn.addEventListener('click', () => {
        if (languageSelect) openPopup(languageSelect.value);
    });
    if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
    if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
    if (copyButton) copyButton.addEventListener('click', () => {
        if (popupExampleCode) {
            navigator.clipboard.writeText(popupExampleCode.textContent).then(() => {
                handleCopyButtonState(copyButton);
            }).catch(err => {
                console.error('Falha ao copiar o código: ', err);
                chatManager.adicionarMensagem('Erro ao copiar o código. Tente novamente.', 'assistant-message error');
            });
        }
    });

    if (useExampleButton) useExampleButton.addEventListener('click', () => {
        if (codeInput && popupExampleCode) {
            codeInput.value = popupExampleCode.textContent;
            closePopup();
            codeInput.scrollIntoView({ behavior: 'smooth' });
        }
    });

    if (languageWarningBanner) {
        languageWarningBanner.addEventListener('click', () => {
            // Removemos a chamada ao SyntaxValidator.hideLanguageWarningBanner
            // pois o banner agora é controlado pelo servidor.
        });
    }

    if (themeToggle) themeToggle.addEventListener('click', () => {
        themeManager.toggleTheme();
    });

    // --- Chamadas Iniciais ao Carregar a Página ---
    if (languageSelect) updateLanguageInfo(languageSelect.value);
    themeManager.loadTheme();
    clearChat();
});