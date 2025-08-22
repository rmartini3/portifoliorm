# encoding: utf-8
Clear-Host

function Get-SystemInfo {
    $dateTime = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
    $os = (Get-CimInstance Win32_OperatingSystem).Caption
    $user = $env:USERNAME

    Write-Host "`n===== Informa��es do Sistema ==============================="
    Write-Host "Data e Hora: $dateTime"
    Write-Host "Sistema Operacional: $os"
    Write-Host "Usu�rio: $user"
    Write-Host "============================================================`n"
}

function Select-MainOption {
    Write-Host "Menu Principal:"
    Write-Host ""
    Write-Host "1 - Limpeza"
    Write-Host "2 - Otimiza��o"
    Write-Host "3 - Monitoramento"
    Write-Host "4 - Reparo"
    Write-Host ""
    return (Read-Host "Selecione uma op��o: ")
}

function Select-SubOption ($category) {
    switch ($category) {
        1 {
            Write-Host "`n--- Tipo de Limpeza ----------------------------------------"
            Write-Host "1) B�sica"
            Write-Host "2) Completa"
            Write-Host "3) Cache dos Aplicativos da Loja"
            Write-Host "4) Cache dos Programas MSI"
        }
        2 {
            Write-Host "`n--- Tipo de Otimiza��o ------------------------------------"
            Write-Host "1) Aplicativos e Programas"
            Write-Host "2) Rede"
            Write-Host "3) WMI"
            Write-Host "4) Windows Search"
            Write-Host "5) V�deo"
            Write-Host "6) Som"
        }
        3 {
            Write-Host "`n--- Tipo de Monitoramento ----------------------------------"
            Write-Host "1) Aplicativos e Programas"
            Write-Host "2) Rede"
            Write-Host "3) WMI"
            Write-Host "4) Windows Search"
            Write-Host "5) V�deo"
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

# Fun��es de Limpeza
function Clear-Basic {
    Write-Host "Impacto: Remove arquivos tempor�rios e da lixeira. Recomendado fechar arquivos abertos."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Limpeza b�sica conclu�da.`n"
}

function Clear-Full {
    Write-Host "`nImpacto: Remove arquivos tempor�rios, cache e lixeira. Pode apagar dados n�o salvos."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
    Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    Write-Host "Limpeza completa conclu�da.`n"
}

function Clear-AppCache {
    Write-Host "`nImpacto: Pode reiniciar aplicativos e apagar sess�es."
    Get-ChildItem "$env:LOCALAPPDATA\Packages" -Recurse -Include "*Cache*" | Remove-Item -Force -ErrorAction SilentlyContinue
    Write-Host "Cache dos aplicativos limpo.`n"
}

function Clear-MSI {
    Write-Host "`nImpacto: Pode impedir reinstala��es offline de programas MSI."
    Remove-Item "C:\Windows\Installer\$PatchCache$" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Cache dos instaladores MSI limpo.`n"
}

# Fun��es de Otimiza��o
function Optimize-Apps {
    Write-Host "`nImpacto: Pode encerrar processos em segundo plano. Salve seu trabalho."
    Get-Process | Where-Object { $_.CPU -lt 1 -and $_.Name -notmatch "System|Idle|explorer|powershell" } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Aplicativos otimizados.`n"
}

function Optimize-Network {
    Write-Host "`nImpacto: Pode causar desconex�o tempor�ria."
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
    Write-Host "`nImpacto: Pode causar lentid�o tempor�ria na busca."
    Stop-Service "WSearch" -Force
    Start-Service "WSearch"
    Write-Host "Windows Search otimizado.`n"
}

function Optimize-Video {
    Write-Host "`nImpacto: Pode reiniciar servi�os gr�ficos."
    Restart-Service "GraphicsPerfSvc" -ErrorAction SilentlyContinue
    Write-Host "V�deo otimizado.`n"
}

function Optimize-Sound {
    Write-Host "`nImpacto: Pode interromper o �udio temporariamente."
    Restart-Service "Audiosrv" -ErrorAction SilentlyContinue
    Write-Host "Som otimizado.`n"
}

# Fun��es de Monitoramento
function Monitor-Apps {
    Write-Host "`nMonitorando processos com maior uso de CPU..."
    Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, ID
    Write-Host ""
}

function Monitor-Network {
    Write-Host "`nMonitorando lat�ncia de rede..."
    Test-Connection "8.8.8.8" -Count 4 | Select-Object Address, ResponseTime, Status
    Write-Host ""
}

function Monitor-WMI {
    Write-Host "`nMonitorando status do WMI..."
    Get-WmiObject Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber
    Write-Host ""
}

function Monitor-Search {
    Write-Host "`nMonitorando servi�o de busca..."
    Get-Service "WSearch" | Select-Object Status, StartType
    Write-Host ""
}

function Monitor-Video {
    Write-Host "`nMonitorando controlador de v�deo..."
    Get-WmiObject Win32_VideoController | Select-Object Name, DriverVersion, Status
    Write-Host ""
}

function Monitor-Sound {
    Write-Host "`nMonitorando dispositivos de �udio..."
    Get-PnpDevice -Class Media | Select-Object FriendlyName, Status
    Write-Host ""
}

# Fun��es de Reparo
function Repair-Windows {
    Write-Host "`nImpacto: Pode reiniciar servi�os e levar v�rios minutos."
    sfc /scannow
    DISM /Online /Cleanup-Image /RestoreHealth
    Write-Host "Componentes do Windows reparados.`n"
}

function Repair-StoreApps {
    Write-Host "`nImpacto: Pode apagar configura��es e exigir novo login."
    Get-AppxPackage -AllUsers | ForEach-Object {
        Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml" -ErrorAction SilentlyContinue
    }
    Write-Host "Aplicativos da Loja reparados.`n"
}

function Repair-MSI {
    Write-Host "Impacto: Pode exigir permiss�es administrativas e reinicializa��o."
    $apps = Get-WmiObject Win32_Product | Where-Object { $null -ne $_.Name }
    foreach ($app in $apps) {
        Write-Host "Reparando: $($app.Name)"
        $app.Reinstall()
    }
    Write-Host "Programas MSI reparados.`n"
}

# Execu��o Principal
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
            default { Write-Host "Subtipo inv�lido.`n" }
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
            default { Write-Host "Subtipo inv�lido.`n" }
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
            default { Write-Host "Subtipo inv�lido.`n" }
        }
    }
    4 {
        switch ($sub) {
            1 { Repair-Windows }
            2 { Repair-StoreApps }
            3 { Repair-MSI }
            default { Write-Host "Subtipo inv�lido.`n" }
        }
    }
    default {
        Write-Host "Op��o principal inv�lida.`n"
    }
}

Write-Host "Processo finalizado. Obrigado por utilizar o assistente!`n"
