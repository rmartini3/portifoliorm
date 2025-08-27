# Diagramas do Script

## Fluxo Console

        +--------------------+
        |  Script Console    |
        +--------------------+
        |                    |
        |  Menu Principal    |  <- Read-Host
        |  1- Limpeza        |
        |  2- Otimização     |
        |  3- Monitoramento  |
        |  4- Reparo         |
        |                    |
        +--------------------+
                 |
                 v
      +-----------------------+
      |  Submenu (opção)      | <- Read-Host
      |  Ex: Limpeza Básica   |
      +-----------------------+
                 |
                 v
       +-------------------+
       |  Chamada de Função |
       |  Clear-Basic()     |
       +-------------------+
                 |
                 v
        +----------------+
        |  Saída no       |
        |  Console        | <- Write-Host
        +----------------+
