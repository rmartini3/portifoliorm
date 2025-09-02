// LanguageDetector.js - Módulo responsável por identificar a linguagem de um trecho de código.

/**
 * Classe para detectar automaticamente a linguagem (HTML, CSS, JavaScript) de um tre dado trecho de código.
 */
export class LanguageDetector {
    /**
     * Tenta detectar a linguagem do código fornecido.
     * A ordem de detecção é importante para evitar falsos positivos (ex: JS com tags HTML em strings).
     * @param {string} code - O trecho de código a ser analisado.
     * @returns {string} O código da linguagem detectada ('html', 'css', 'javascript') ou 'unknown'.
     */
    detectLanguage(code) {
        const cleanCode = code.trim(); // Remove espaços em branco do início e fim.
        if (cleanCode === '') return 'unknown'; // Retorna 'unknown' se o código estiver vazio.

        // Ordem de verificação é importante: HTML é o mais "abrangente", JS e CSS podem ter
        // substrings que parecem HTML se não forem verificados cuidadosamente.

        // 1. Verificar HTML: Geralmente o mais distinto.
        if (this.isHTML(cleanCode)) return 'html';
        // 2. Verificar JavaScript: Pode conter padrões que se assemelham a CSS ou HTML em strings.
        if (this.isJavaScript(cleanCode)) return 'javascript';
        // 3. Verificar CSS: Padrões bem específicos.
        if (this.isCSS(cleanCode)) return 'css';

        return 'unknown'; // Se nenhuma das linguagens for detectada.
    }

    /**
     * Verifica se o código é HTML.
     * @param {string} code - O trecho de código.
     * @returns {boolean} Verdadeiro se for HTML, falso caso contrário.
     */
    isHTML(code) {
        // Padrões comuns e distintivos de HTML.
        const htmlPatterns = [
            /^<!DOCTYPE html>/i, // Declaração DOCTYPE.
            /<html[\s>]/i,       // Tag <html>.
            /<body[\s>]/i,       // Tag <body>.
            /<head[\s>]/i,       // Tag <head>.
            /<title>/i,          // Tag <title>.
            /<\/html>/i          // Tag de fechamento </html>.
        ];
        // Conta quantos padrões HTML são encontrados no código.
        const htmlScore = htmlPatterns.filter(pattern => pattern.test(code)).length;
        // Considera HTML se pelo menos 2 padrões forem encontrados.
        // Isso ajuda a evitar que trechos curtos de texto ou strings com <> sejam identificados como HTML.
        return htmlScore >= 2;
    }

    /**
     * Verifica se o código é CSS.
     * @param {string} code - O trecho de código.
     * @returns {boolean} Verdadeiro se for CSS, falso caso contrário.
     */
    isCSS(code) {
        // Esta RegEx procura por um seletor CSS válido (ex: .classe, #id, tag, [attr="value"])
        // antes de um bloco de regras { ... }. 'm' para multilinhas.
        const cssSelectorPattern = /^\s*([a-zA-Z0-9\s.#*-_>+~:\\[\]="'"]+)\s*\{[^}]*\}/m;

        // Esta RegEx procura por regras CSS "@" (at-rules) como @media, @keyframes, @import, etc.
        const atRulePattern = /@media|@keyframes|@import|@font-face|@charset|@layer|@container/;

        // A detecção é positiva se encontrar um seletor CSS ou uma regra '@'.
        if (cssSelectorPattern.test(code) || atRulePattern.test(code)) {
            // É importante verificar se não é HTML ao mesmo tempo,
            // pois HTML pode conter blocos <style> que pareceriam CSS.
            // Aqui, estamos detectando CSS puro, fora de um contexto HTML.
            return !this.isHTML(code); 
        }

        return false;
    }

    /**
     * Verifica se o código é JavaScript.
     * @param {string} code - O trecho de código.
     * @returns {boolean} Verdadeiro se for JavaScript, falso caso contrário.
     */
    isJavaScript(code) {
        // Padrões comuns e distintivos de JavaScript.
        const jsPatterns = [
            /=>/,                         // Arrow functions (ES6+).
            /\.addEventListener/,         // Event listeners (DOM manipulation).
            /const\s+|let\s+|var\s+/,     // Declarações de variáveis.
            /^function\s+\w+/,            // Declaração de função tradicional.
            /console\.log/,               // Saída para o console.
            /document\./,                 // Acesso ao objeto document (DOM).
            /window\./,                   // Acesso ao objeto window.
            /import\s+.*from/,            // Módulos ES6 (import).
            /export\s+/,                  // Módulos ES6 (export).
            /new\s+\w+\(/,                // Criação de instâncias de classes/funções construtoras.
            /\(function\(\)\{/            // IIFE (Immediately Invoked Function Expression).
        ];
        // Conta quantos padrões JavaScript são encontrados.
        const jsScore = jsPatterns.filter(pattern => pattern.test(code)).length;
        // Considera JavaScript se pelo menos 1 padrão for encontrado E não for HTML.
        // A verificação `!this.isHTML(code)` é crucial para evitar que scripts inline em HTML
        // sejam detectados como JavaScript puro (o que causaria um falso positivo se o objetivo
        // fosse detectar o tipo de arquivo principal).
        return jsScore >= 1 && !this.isHTML(code);
    }

    /**
     * Retorna o nome amigável de uma linguagem dado seu código.
     * @param {string} langCode - O código da linguagem (ex: 'html', 'css', 'javascript', 'unknown').
     * @returns {string} O nome completo da linguagem ou o próprio código se não for reconhecido.
     */
    getLanguageName(langCode) {
        const names = {
            'html': 'HTML',
            'css': 'CSS',
            'javascript': 'JavaScript',
            'unknown': 'Desconhecida'
        };
        // Retorna o nome amigável do mapeamento ou o código da linguagem se não houver um nome mapeado.
        return names[langCode] || langCode;
    }
}