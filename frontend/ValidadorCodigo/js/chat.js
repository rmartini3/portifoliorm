// chat.js - Módulo responsável por gerenciar a adição e exibição de mensagens na caixa de chat.

// Obtém a referência para o elemento HTML da caixa de chat.
// Elemento: chatBox
const chatBox = document.getElementById('chatBox');

// Mapeamento que define informações padrão para diferentes tipos de remetente de mensagem.
// Isso permite padronizar nomes, ícones e, futuramente, adicionar outros atributos.
const senderInfo = {
    'assistant-message': { name: 'Assistente', icon: 'fas fa-robot' }, // Informações para mensagens do assistente.
    'user-message': { name: 'Você', icon: 'fas fa-user' },           // Informações para mensagens do usuário.
};

/**
 * Gerencia a adição de novas mensagens à interface do chat.
 */
class ChatManager {
    /**
     * Adiciona uma nova mensagem à caixa de chat.
     *
     * @param {string} htmlContent - O conteúdo HTML da mensagem a ser exibida.
     * @param {string} senderClass - A classe CSS que define o estilo e o tipo de remetente (ex: 'assistant-message', 'user-message', 'warning').
     * @param {string} [specificSenderName=null] - (Opcional) Um nome específico para o remetente, se diferente do padrão.
     * @element chatBox
     */
    adicionarMensagem(htmlContent, senderClass, specificSenderName = null) {
        // Obtém as informações do remetente com base na 'senderClass'.
        // Se a classe não estiver no 'senderInfo', usa as informações do assistente como fallback.
        const info = senderInfo[senderClass] || senderInfo['assistant-message'];
        
        // Determina o nome real do remetente: usa 'specificSenderName' se fornecido, senão usa o nome padrão.
        const actualSenderName = specificSenderName || info.name;
        // Obtém o ícone do remetente, se disponível.
        const senderIcon = info.icon ? `<i class="${info.icon}"></i>` : '';

        // Cria um novo elemento DIV para a mensagem.
        const messageDiv = document.createElement('div');
        // Define as classes CSS para o DIV da mensagem, incluindo a classe específica do remetente.
        messageDiv.className = `message ${senderClass}`;
        
        // Preenche o conteúdo HTML do DIV da mensagem.
        messageDiv.innerHTML = `
            <div class="message-header">
                <span>${senderIcon} ${actualSenderName}</span> <!-- Exibe o ícone e o nome do remetente. -->
                <span class="timestamp">${new Date().toLocaleTimeString()}</span> <!-- Exibe a hora atual. -->
            </div>
            <div class="message-content">${htmlContent}</div> <!-- Conteúdo principal da mensagem. -->
        `;
        
        // Adiciona a nova mensagem ao final da caixa de chat.
        chatBox.appendChild(messageDiv);
        
        // Rola a caixa de chat para o final para garantir que a mensagem mais recente seja visível.
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Exporta uma instância única da classe ChatManager para que outros módulos possam usá-la.
export const chatManager = new ChatManager();