// PooUmlValidator.js - Módulo responsável por validar a presença de princípios de Programação Orientada a Objetos (POO)
// e conceitos relacionados a UML (como classes, herança) em um trecho de código JavaScript.

/**
 * Classe para validar a aplicação de conceitos de POO/UML em códigos.
 * Atualmente focado em JavaScript.
 */
export class PooUmlValidator {
    /**
     * Valida o código para características de POO/UML com base na linguagem selecionada.
     * @param {string} code - O trecho de código a ser validado.
     * @param {string} language - A linguagem do código (ex: 'javascript', 'html', 'css').
     * @returns {string} Uma string HTML com o resultado da validação.
     */
    validate(code, language) {
        switch(language) {
            case 'javascript':
                return this.validateJavaScriptOOP(code);
            // Casos para outras linguagens (como Java, Python) foram removidos conforme requisitos.
            default:
                // Para linguagens onde POO/UML não é aplicável diretamente (ex: HTML, CSS),
                // retorna uma mensagem informativa.
                return `<div class="oop-invalid"><p class="info">
                            ℹ️ Validação POO/UML não é aplicável diretamente para a linguagem <strong>${language.toUpperCase()}</strong>.
                        </p></div>`;
        }
    }

    /**
     * Valida a presença de características de POO em código JavaScript.
     * Utiliza expressões regulares para detectar padrões comuns de classes, objetos, herança e encapsulamento.
     * @param {string} code - O trecho de código JavaScript.
     * @returns {string} Uma string HTML formatada com os resultados da detecção de POO.
     */
    validateJavaScriptOOP(code) {
        // Detecção de classes ES6: procura pela palavra-chave 'class ' (com espaço para evitar 'className', etc.).
        let hasClasses = /class\s+[A-Za-z_]\w*\s*\{/.test(code);
        
        // Detecção de objetos literais (com propriedades e valores) ou criação de instâncias com 'new'.
        // {prop: val} ou new Constructor().
        let hasObjects = (/{[^}]*:\s*[^}]*}/.test(code) && code.includes(':')) || /new\s+[A-Za-z_]\w*\s*\(/.test(code);
        
        // Detecção de herança via palavra-chave 'extends'.
        let hasInheritance = /\bextends\s+[A-Za-z_]\w*/.test(code);
        
        // Detecção de encapsulamento básico:
        // 1. Uso de 'this.' para propriedades/métodos de instância (indica membros de objeto/classe).
        // 2. Ou uso de closures para simular encapsulamento (funções que retornam outras funções/objetos
        //    com variáveis internas "privadas"). O regex aqui é um pouco simplificado, procurando
        //    uma função que declara `var`, `let` ou `const` internamente.
        let hasEncapsulation = /\bthis\.[A-Za-z_]\w*/.test(code) || 
                                (/\bfunction\s*\w*\s*\([^)]*\)\s*\{[\s\S]*?(var|let|const)\s/g.test(code));

        // Gera e retorna o resultado formatado com base nas características detectadas.
        return this.generateOOPResult(hasClasses, hasObjects, hasInheritance, hasEncapsulation);
    }

    /**
     * Gera uma string HTML formatada com base nas características de POO detectadas.
     * @param {boolean} hasClasses - Indica se classes foram detectadas.
     * @param {boolean} hasObjects - Indica se objetos/instâncias foram detectados.
     * @param {boolean} hasInheritance - Indica se herança foi detectada.
     * @param {boolean} hasEncapsulation - Indica se encapsulamento foi detectado.
     * @returns {string} Uma string HTML com a lista de características POO.
     */
    generateOOPResult(hasClasses, hasObjects, hasInheritance, hasEncapsulation) {
        const detectedFeatures = []; // Array para armazenar as características detectadas.

        // Adiciona as características ao array se forem detectadas.
        if (hasClasses) detectedFeatures.push('Classes (ES6)');
        if (hasObjects) detectedFeatures.push('Objetos Literais / Instâncias');
        if (hasInheritance) detectedFeatures.push('Herança (via `extends`)');
        if (hasEncapsulation) detectedFeatures.push('Encapsulamento (`this.` / Closures)');

        // Se alguma característica foi detectada, gera uma lista de sucesso.
        if (detectedFeatures.length > 0) {
            let oopDetails = '<div class="oop-valid">';
            oopDetails += '<p class="success">✅ Características de POO detectadas:</p><ul>';
            // Mapeia cada característica para um item de lista.
            detectedFeatures.forEach(feature => {
                oopDetails += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
            });
            oopDetails += '</ul><p class="info">Boas práticas de organização de código!</p></div>';
            return oopDetails;
        } else {
            // Se nenhuma característica POO foi detectada, gera uma mensagem de aviso.
            return `<div class="oop-invalid"><p class="warning">
                        ⚠️ Poucas ou nenhuma característica de Programação Orientada a Objetos (POO) detectada. 
                        Considere usar classes, objetos, herança ou encapsulamento para organizar seu código JavaScript.
                    </p></div>`;
        }
    }
}