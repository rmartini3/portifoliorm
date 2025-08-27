
# Instruções Copilot para o Projeto de Portfólio

## Visão Geral
Este é um projeto simples de portfólio pessoal. O ponto de entrada principal é o arquivo `index.html` na raiz do repositório. O diretório `Projetos/` está presente, mas atualmente vazio.

## Estrutura do Projeto
- `index.html`: Arquivo HTML principal. Contém toda a marcação e CSS inline para a página inicial do portfólio.
- `Projetos/`: Destinado a subpáginas de projetos ou ativos. Atualmente vazio.

## Padrões e Convenções
- Todo o estilo está atualmente dentro da tag `<style>` em `index.html`. Não há arquivos externos de CSS ou JS.
- Imagens são referenciadas por caminhos absolutos ou relativos. Certifique-se de que os caminhos das imagens estejam corretos e acessíveis a partir do local do HTML.
- Use HTML semântico sempre que possível. Melhorias de acessibilidade (ex: atributo `alt` em imagens) são recomendadas.
- Para layout e espaçamento, prefira CSS ao invés de `<br>`.

## Fluxo de Trabalho do Desenvolvedor
- Não há ferramentas de build, frameworks ou gerenciadores de pacotes. Todo o desenvolvimento é feito editando manualmente HTML/CSS.
- Para visualizar alterações, abra o `index.html` diretamente em um navegador web.
- Não há testes automatizados ou scripts presentes.

## Como Estender o Projeto
- Para adicionar novos projetos, crie subpáginas ou ativos dentro do diretório `Projetos/` e faça o link a partir do `index.html`.
- Para folhas de estilo ou scripts maiores, considere criar e linkar arquivos `.css` ou `.js` externos.

## Exemplo: Adicionando um Projeto
1. Crie um novo arquivo HTML em `Projetos/` (ex: `Projetos/meu-projeto.html`).
2. Adicione um link para esse arquivo no `index.html`.

## Arquivos Importantes
- `index.html`: Ponto de entrada principal e exemplo de todas as convenções atuais.

---

Se adicionar novas convenções ou fluxos de trabalho, atualize este arquivo para ajudar futuros agentes de IA e desenvolvedores.
