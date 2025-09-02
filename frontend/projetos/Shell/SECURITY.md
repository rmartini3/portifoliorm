
## 🔐 SECURITY.md

```markdown
# Segurança – Linux System Assistant 🔐

Este documento descreve as práticas de segurança adotadas e como relatar vulnerabilidades relacionadas ao script `assistente.sh`.

## 🧭 Escopo

Este script executa comandos administrativos com privilégios elevados (`sudo`). Portanto, é recomendado:

- Executar apenas em ambientes confiáveis
- Auditar o código antes de uso em produção
- Evitar execução automática sem supervisão

## ⚠️ Riscos Potenciais

- **Remoção de arquivos**: As funções de limpeza podem apagar caches, logs e arquivos temporários. Use com cautela.
- **Reinício de serviços**: A otimização reinicia serviços de rede e sessão, o que pode afetar usuários conectados.
- **Execução como root**: Algumas funções exigem `sudo`, o que pode representar riscos se o script for modificado maliciosamente.

## 🛡️ Boas Práticas

- Mantenha o script atualizado
- Execute com usuários autorizados
- Revise permissões e comandos antes de aplicar em servidores

## 📣 Relatar Vulnerabilidades

Se você identificar uma vulnerabilidade ou comportamento inseguro, por favor:

1. Crie uma issue no repositório (se público)
2. Descreva o problema com detalhes e, se possível, forneça uma correção sugerida

## ✅ Histórico de Segurança

Nenhuma vulnerabilidade conhecida até o momento.

---

Este documento será atualizado conforme novas práticas ou riscos forem identificados.
