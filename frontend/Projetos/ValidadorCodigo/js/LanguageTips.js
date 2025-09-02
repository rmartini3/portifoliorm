// LanguageTips.js - Módulo responsável por fornecer dicas e exemplos de código para diferentes linguagens.

/**
 * Classe que armazena e gerencia dicas e exemplos de código para HTML, CSS e JavaScript.
 */
export class LanguageTips {
    constructor() {
        /**
         * Objeto contendo arrays de dicas de programação para cada linguagem.
         * @type {Object.<string, string[]>}
         */
        this.tips = {
            html: [
                "Sempre inclua `<!DOCTYPE html>` no início do seu documento HTML.",
                "Feche todas as tags HTML corretamente para evitar problemas de renderização.",
                "Use atributos `alt` em imagens (`<img>`) para acessibilidade e SEO.",
                "Estruture seu HTML com semântica (tags como `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`).",
                "Evite usar estilos inline (ex: `<p style='color:red;'>`) para melhor separação de responsabilidades.",
                "Use tags `<a>` para links e `<button>` para ações interativas."
            ],
            css: [
                "Use unidades relativas (em, rem, %, vw, vh) para layouts responsivos e escaláveis.",
                "Mantenha a especificidade dos seletores CSS baixa para facilitar a manutenção e evitar `!important`.",
                "Utilize variáveis CSS (`--variavel: valor;`) para cores, fontes e valores repetitivos.",
                "Considere o uso de Flexbox ou Grid para layout moderno e eficiente.",
                "Otimize suas folhas de estilo, removendo CSS não utilizado para melhorar a performance.",
                "Sempre valide seu CSS para garantir compatibilidade entre navegadores."
            ],
            javascript: [
                "Prefira `const` e `let` em vez de `var` para gerenciamento de escopo mais previsível.",
                "Sempre use comparação estrita (`===` em vez de `==`) para evitar coerção de tipo inesperada.",
                "Trate erros com blocos `try...catch` para tornar seu código mais robusto.",
                "Familiarize-se com funções assíncronas (`async/await`) para lidar com operações não-bloqueantes.",
                "Mantenha suas funções pequenas e focadas em uma única tarefa (Princípio de Responsabilidade Única).",
                "Use módulos (`import`/`export`) para organizar seu código em partes reutilizáveis."
            ],
        };

        /**
         * Objeto contendo exemplos de código formatados para cada linguagem.
         * Cada exemplo inclui um título, explicação e o código.
         * @type {Object.<string, {title: string, explanation: string, code: string}>}
         */
        this.examples = {
            html: {
                title: 'Exemplo de Código HTML Básico',
                explanation: 'Demonstra a estrutura fundamental de uma página HTML com elementos básicos.',
                code: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Bem-vindo!</h1>
    </header>
    <main>
        <p>Este é um parágrafo de exemplo em HTML.</p>
        <button id="meuBotao">Clique-me</button>
    </main>
    <footer>
        <p>&copy; 2023</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>`
            },
            css: {
                title: 'Exemplo de Estilização CSS',
                explanation: 'Apresenta regras CSS para estilizar elementos de uma página web.',
                code: `body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7f6;
    color: #333;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #0056b3;
    text-align: center;
    margin-bottom: 25px;
}

.card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 30px;
    margin: 20px auto;
    max-width: 600px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
}

button:hover {
    background-color: #218838;
}`
            },
            javascript: {
                title: 'Exemplo de Código JavaScript Interativo',
                explanation: 'Uma demonstração de manipulação do DOM e lógica básica em JavaScript.',
                code: `// Função para exibir uma saudação personalizada
function showGreeting(name) {
    console.log(\`Olá, \${name}! Bem-vindo ao validador.\`);
    const greetingElement = document.getElementById('greetingMessage');
    if (greetingElement) {
        greetingElement.textContent = \`Olá, \${name}! Validando seu código...\`;
    }
}

// Adiciona um listener ao botão 'meuBotao'
document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById('meuBotao');
    if (myButton) {
        myButton.addEventListener('click', () => {
            alert('Botão clicado via JavaScript!');
            showGreeting('Usuário');
        });
    }

    // Exemplo de manipulação de array e loop
    const items = ['item A', 'item B', 'item C'];
    items.forEach((item, index) => {
        console.log(\`Processando \${item} no índice \${index}\`);
    });
});

// Exemplo de função assíncrona
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(\`Erro HTTP! Status: \${response.status}\`);
        }
        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    } catch (error) {
        console.error('Falha ao buscar dados:', error);
        return null;
    }
}

// Uso da função assíncrona (com um URL de exemplo)
// fetchData('https://jsonplaceholder.typicode.com/todos/1');
`
            }
        };
    }

    /**
     * Retorna um objeto de exemplo de código para a linguagem especificada.
     * Se a linguagem não tiver um exemplo direto, retorna um exemplo HTML como fallback.
     * @param {string} language - O código da linguagem (ex: 'html', 'css', 'javascript').
     * @returns {{title: string, explanation: string, code: string}} O objeto de exemplo.
     */
    getExample(language) {
        // Retorna o exemplo específico da linguagem ou o exemplo HTML como fallback.
        return this.examples[language] || this.examples['html'];
    }

    /**
     * Retorna uma dica aleatória para a linguagem especificada.
     * Se a linguagem não tiver dicas diretas, retorna uma dica HTML como fallback.
     * @param {string} language - O código da linguagem (ex: 'html', 'css', 'javascript').
     * @returns {string} Uma string contendo uma dica aleatória.
     */
    getRandomTip(language) {
        // Seleciona o array de dicas da linguagem específica ou usa as dicas HTML como fallback.
        const selectedTips = this.tips[language] || this.tips['html'];
        // Gera um índice aleatório dentro do comprimento do array de dicas.
        const randomIndex = Math.floor(Math.random() * selectedTips.length);
        // Retorna a dica no índice aleatório.
        return selectedTips[randomIndex];
    }
}