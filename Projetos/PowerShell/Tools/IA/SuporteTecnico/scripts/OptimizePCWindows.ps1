# encoding: utf-8
Clear-Host

function Get-SystemInfo {
    $dateTime = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
    $os = (Get-CimInstance Win32_OperatingSystem).Caption
    $user = $env:USERNAME

    Write-Host "`n===== Informações do Sistema ==============================="
    Write-Host "Data e Hora: $dateTime"
    Write-Host "Sistema Operacional: $os"
    Write-Host "Usuário: $user"
    Write-Host "============================================================`n"
}

function Select-MainOption {
    Write-Host "Menu Principal:"
    Write-Host ""
    Write-Host "1 - Limpeza"
    Write-Host "2 - Otimização"
    Write-Host "3 - Monitoramento"
    Write-Host "4 - Reparo"
    Write-Host ""
    return (Read-Host "Selecione uma opção: ")
}

function Select-SubOption ($category) {
    switch ($category) {
        1 {
            Write-Host "`n--- Tipo de Limpeza ----------------------------------------"
            Write-Host "1) Básica"
            Write-Host "2) Completa"
            Write-Host "3) Cache dos Aplicativos da Loja"
            Write-Host "4) Cache dos Programas MSI"
        }
        2 {
            Write-Host "`n--- Tipo de Otimização ------------------------------------"
            Write-Host "1) Aplicativos e Programas"
            Write-Host "2) Rede"
            Write-Host "3) WMI"
            Write-Host "4) Windows Search"
            Write-Host "5) Vídeo"
            Write-Host "6) Som"
        }
        3 {
            Write-Host "`n--- Tipo de Monitoramento ----------------------------------"
            Write-Host "1) Aplicativos e Programas"
            Write-Host "2) Rede"
            Write-Host "3) WMI"
            Write-Host "4) Windows Search"
            Write-Host "5) Vídeo"
            Write-Host "6) Som"
        }
        4 {
            Write-Host "`n--- Tipo de Reparo -----------------------------------------"
            Write-Host "1) Componentes Nativos do Windows"
            Write-Host "2) Aplicativos da Loja"
            Write-Host "3) Programas MSI"
        }
    }
    Write-Host ""
    return (Read-Host "Selecione o subtipo: ")
}

# Funções de Limpeza
function Clear-Basic {
    Write-Host "Impacto: Remove arquivos temporários e da lixeira. Recomendado fechar arquivos abertos."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Limpeza básica concluída.`n"
}

function Clear-Full {
    Write-Host "`nImpacto: Remove arquivos temporários, cache e lixeira. Pode apagar dados não salvos."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
    Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    Write-Host "Limpeza completa concluída.`n"
}

function Clear-AppCache {
    Write-Host "`nImpacto: Pode reiniciar aplicativos e apagar sessões."
    Get-ChildItem "$env:LOCALAPPDATA\Packages" -Recurse -Include "*Cache*" | Remove-Item -Force -ErrorAction SilentlyContinue
    Write-Host "Cache dos aplicativos limpo.`n"
}

function Clear-MSI {
    Write-Host "`nImpacto: Pode impedir reinstalações offline de programas MSI."
    Remove-Item "C:\Windows\Installer\$PatchCache$" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Cache dos instaladores MSI limpo.`n"
}

# Funções de Otimização
function Optimize-Apps {
    Write-Host "`nImpacto: Pode encerrar processos em segundo plano. Salve seu trabalho."
    Get-Process | Where-Object { $_.CPU -lt 1 -and $_.Name -notmatch "System|Idle|explorer|powershell" } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Aplicativos otimizados.`n"
}

function Optimize-Network {
    Write-Host "`nImpacto: Pode causar desconexão temporária."
    ipconfig /flushdns
    netsh int ip reset
    netsh winsock reset
    Write-Host "Rede otimizada.`n"
}

function Optimize-WMI {
    Write-Host "`nImpacto: Pode afetar ferramentas de monitoramento temporariamente."
    net stop winmgmt /y
    winmgmt /resetrepository
    net start winmgmt
    Write-Host "WMI otimizado.`n"
}

function Optimize-Search {
    Write-Host "`nImpacto: Pode causar lentidão temporária na busca."
    Stop-Service "WSearch" -Force
    Start-Service "WSearch"
    Write-Host "Windows Search otimizado.`n"
}

function Optimize-Video {
    Write-Host "`nImpacto: Pode reiniciar serviços gráficos."
    Restart-Service "GraphicsPerfSvc" -ErrorAction SilentlyContinue
    Write-Host "Vídeo otimizado.`n"
}

function Optimize-Sound {
    Write-Host "`nImpacto: Pode interromper o áudio temporariamente."
    Restart-Service "Audiosrv" -ErrorAction SilentlyContinue
    Write-Host "Som otimizado.`n"
}

# Funções de Monitoramento
function Monitor-Apps {
    Write-Host "`nMonitorando processos com maior uso de CPU..."
    Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, ID
    Write-Host ""
}

function Monitor-Network {
    Write-Host "`nMonitorando latência de rede..."
    Test-Connection "8.8.8.8" -Count 4 | Select-Object Address, ResponseTime, Status
    Write-Host ""
}

function Monitor-WMI {
    Write-Host "`nMonitorando status do WMI..."
    Get-WmiObject Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber
    Write-Host ""
}

function Monitor-Search {
    Write-Host "`nMonitorando serviço de busca..."
    Get-Service "WSearch" | Select-Object Status, StartType
    Write-Host ""
}

function Monitor-Video {
    Write-Host "`nMonitorando controlador de vídeo..."
    Get-WmiObject Win32_VideoController | Select-Object Name, DriverVersion, Status
    Write-Host ""
}

function Monitor-Sound {
    Write-Host "`nMonitorando dispositivos de áudio..."
    Get-PnpDevice -Class Media | Select-Object FriendlyName, Status
    Write-Host ""
}

# Funções de Reparo
function Repair-Windows {
    Write-Host "`nImpacto: Pode reiniciar serviços e levar vários minutos."
    sfc /scannow
    DISM /Online /Cleanup-Image /RestoreHealth
    Write-Host "Componentes do Windows reparados.`n"
}

function Repair-StoreApps {
    Write-Host "`nImpacto: Pode apagar configurações e exigir novo login."
    Get-AppxPackage -AllUsers | ForEach-Object {
        Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml" -ErrorAction SilentlyContinue
    }
    Write-Host "Aplicativos da Loja reparados.`n"
}

function Repair-MSI {
    Write-Host "Impacto: Pode exigir permissões administrativas e reinicialização."
    $apps = Get-WmiObject Win32_Product | Where-Object { $null -ne $_.Name }
    foreach ($app in $apps) {
        Write-Host "Reparando: $($app.Name)"
        $app.Reinstall()
    }
    Write-Host "Programas MSI reparados.`n"
}

# Execução Principal
Get-SystemInfo
$main = Select-MainOption
$sub = Select-SubOption $main

switch ($main) {
    1 {
        switch ($sub) {
            1 { Clear-Basic }
            2 { Clear-Full }
            3 { Clear-AppCache }
            4 { Clear-MSI }
            default { Write-Host "Subtipo inválido.`n" }
        }
    }
    2 {
        switch ($sub) {
            1 { Optimize-Apps }
            2 { Optimize-Network }
            3 { Optimize-WMI }
            4 { Optimize-Search }
            5 { Optimize-Video }
            6 { Optimize-Sound }
            default { Write-Host "Subtipo inválido.`n" }
        }
    }
    3 {
        switch ($sub) {
            1 { Monitor-Apps }
            2 { Monitor-Network }
            3 { Monitor-WMI }
            4 { Monitor-Search }
            5 { Monitor-Video }
            6 { Monitor-Sound }
            default { Write-Host "Subtipo inválido.`n" }
        }
    }
    4 {
        switch ($sub) {
            1 { Repair-Windows }
            2 { Repair-StoreApps }
            3 { Repair-MSI }
            default { Write-Host "Subtipo inválido.`n" }
        }
    }
    default {
        Write-Host "Opção principal inválida.`n"
    }
}

Write-Host "Processo finalizado. Obrigado por utilizar o assistente!`n"
