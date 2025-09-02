<#
OTIMIZADOR WINDOWS PROFISSIONAL
Autor: [Seu Nome]
Versão: 3.0
#>

param(
    [ValidateSet('Limpeza','Otimizacao','Monitoramento','Reparo')]
    [string]$Modo,
    [switch]$Silent,
    [switch]$Log
)

function Write-Log {
    param($mensagem)
    if ($Log) {
        Add-Content -Path "optimize_log.txt" -Value "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $mensagem"
    }
    if (-not $Silent) {
        Write-Host $mensagem
    }
}

class Optimizer {
    static [void] LimpezaBasica() {
        Write-Log "Executando limpeza básica..."
        Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
        Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    }

    static [void] OtimizarRede() {
        Write-Log "Otimizando configurações de rede..."
        netsh int tcp set global autotuninglevel=normal
        netsh int tcp set global rss=enabled
    }

    static [void] RepararWindows() {
        Write-Log "Reparando componentes do Windows..."
        sfc /scannow
        DISM /Online /Cleanup-Image /RestoreHealth
    }
}

# Interface interativa melhorada
if (-not $Modo) {
    $opcoes = @('Limpeza', 'Otimizacao', 'Monitoramento', 'Reparo', 'Sair')
    $modo = $opcoes | ForEach-Object { [PSCustomObject]@{Opcao=$_} } | 
            Out-GridView -Title "Selecione o modo de operação" -OutputMode Single
    $Modo = $modo.Opcao
}

switch ($Modo) {
    'Limpeza' { [Optimizer]::LimpezaBasica() }
    'Otimizacao' { [Optimizer]::OtimizarRede() }
    'Reparo' { [Optimizer]::RepararWindows() }
    'Sair' { exit }
}

Write-Log "Operação concluída com sucesso"