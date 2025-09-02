// IndentationValidator.js - Módulo responsável por verificar a consistência da indentação em um trecho de código.

/**
 * Classe responsável por validar a indentação de um código.
 * Atualmente, verifica se há uma mistura de espaços e tabs, ou se a indentação é consistente.
 */
export class IndentationValidator {
    /**
     * Inicia o processo de validação de indentação.
     * @param {string} code - O trecho de código a ser validado.
     * @returns {string} Uma string HTML com o resultado da validação (sucesso, erro ou informação).
     */
    validate(code) {
        // A lógica de validação agora é unificada em validateGeneralIndentation,
        // pois a validação específica para Python foi removida.
        return this.validateGeneralIndentation(code);
    }

    /**
     * Realiza uma validação geral da consistência da indentação (espaços vs. tabs).
     * @param {string} code - O trecho de código a ser validado.
     * @returns {string} Uma string HTML formatada com o resultado.
     */
    validateGeneralIndentation(code) {
        const lines = code.split('\n'); // Divide o código em linhas para análise individual.
        let spaces = 0; // Contador para linhas que começam com espaços.
        let tabs = 0;   // Contador para linhas que começam com tabs.

        // Itera sobre cada linha do código.
        for (const line of lines) {
            // Ignora linhas que estão vazias ou contêm apenas espaços em branco para evitar falsos positivos.
            if (!line.trim()) continue;

            // Verifica se a linha começa com um espaço.
            if (line.startsWith(' ')) spaces++;
            // Verifica se a linha começa com um tab.
            if (line.startsWith('\t')) tabs++;
        }

        // --- Lógica de determinação do resultado ---

        // Se houver detecção de ambos (espaços e tabs), a indentação é considerada inconsistente.
        if (spaces > 0 && tabs > 0) {
            return '<p class="error">❌ Indentação inconsistente: mistura de espaços e tabs detectada. Por favor, use apenas um tipo de indentação (espaços ou tabs).</p>';
        }
        // Se apenas um tipo de indentação for detectado (ou se não houver linhas indentadas), é consistente.
        if (spaces > 0 || tabs > 0) {
            const indentType = spaces > 0 ? 'espaços' : 'tabs'; // Determina qual tipo de indentação foi usado.
            return `<p class="success">✅ Indentação consistente (usando ${indentType}).</p>`;
        }
        // Se nenhuma indentação for detectada em nenhuma linha, o código pode não ter blocos indentados
        // ou está todo alinhado à esquerda, o que é considerado consistente por não haver conflito.
        return '<p class="info">ℹ️ Nenhuma indentação explícita (espaços ou tabs) detectada ou consistente para código sem blocos. Considerado OK.</p>';
    }
}