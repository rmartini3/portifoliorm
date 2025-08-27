# Diagramas da GUI

## Fluxo GUI Console

        +--------------------+
        |  Script GUI com Log|
        +--------------------+
        |                    |
        |  Form Principal    |
        |  TabControl        | <- Limpeza, Otimização, etc.
        |                    |
        +--------------------+
                 |
                 v
       +-------------------+
       |  Aba Selecionada  |
       |  Botões clicáveis | <- Add_Click({Função})
       +-------------------+
                 |
                 v
       +--------------------+
       |  Chamada de Função |
       |  Clear-Basic()     |
       +--------------------+
                 |
                 v
       +--------------------+
       |  Log na GUI        | <- Write-Log(TextBox)
       |  TextBox Multilinha|
       +--------------------+
