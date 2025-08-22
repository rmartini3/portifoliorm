# ==========================================
# Script de Manutenção - Interface Gráfica
# ==========================================

# ----------------------------
# Funções do script
# ----------------------------

# Funções de Limpeza
function Clear-Basic {
    Write-Host "Impacto: Remove arquivos temporários e da lixeira. Feche arquivos abertos."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Limpeza básica concluída.`n"
}

function Clear-Full {
    Write-Host "Impacto: Remove arquivos temporários, cache e lixeira. Pode apagar dados não salvos."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
    Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    Write-Host "Limpeza completa concluída.`n"
}

function Clear-AppCache {
    Write-Host "Impacto: Pode reiniciar aplicativos e apagar sessões."
    Get-ChildItem "$env:LOCALAPPDATA\Packages" -Recurse -Include "*Cache*" | Remove-Item -Force -ErrorAction SilentlyContinue
    Write-Host "Cache dos aplicativos limpo.`n"
}

function Clear-MSI {
    Write-Host "Impacto: Pode impedir reinstalações offline de programas MSI."
    Remove-Item "C:\Windows\Installer\$PatchCache$" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Cache MSI limpo.`n"
}

# Funções de Otimização
function Optimize-Apps {
    Write-Host "Impacto: Pode encerrar processos em segundo plano. Salve seu trabalho."
    Get-Process | Where-Object { $_.CPU -lt 1 -and $_.Name -notmatch "System|Idle|explorer|powershell" } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Aplicativos otimizados.`n"
}

function Optimize-Network {
    Write-Host "Impacto: Pode causar desconexão temporária."
    ipconfig /flushdns
    netsh int ip reset
    netsh winsock reset
    Write-Host "Rede otimizada.`n"
}

function Optimize-WMI {
    Write-Host "Impacto: Pode afetar ferramentas de monitoramento temporariamente."
    net stop winmgmt /y
    winmgmt /resetrepository
    net start winmgmt
    Write-Host "WMI otimizado.`n"
}

function Optimize-Search {
    Write-Host "Impacto: Pode causar lentidão temporária na busca."
    Stop-Service "WSearch" -Force
    Start-Service "WSearch"
    Write-Host "Windows Search otimizado.`n"
}

function Optimize-Video {
    Write-Host "Impacto: Pode reiniciar serviços gráficos."
    Restart-Service "GraphicsPerfSvc" -ErrorAction SilentlyContinue
    Write-Host "Vídeo otimizado.`n"
}

function Optimize-Sound {
    Write-Host "Impacto: Pode interromper o áudio temporariamente."
    Restart-Service "Audiosrv" -ErrorAction SilentlyContinue
    Write-Host "Som otimizado.`n"
}

# Funções de Monitoramento
function Monitor-Apps {
    Write-Host "Monitorando processos com maior uso de CPU..."
    Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, ID
}

function Monitor-Network {
    Write-Host "Monitorando latência de rede..."
    Test-Connection "8.8.8.8" -Count 4 | Select-Object Address, ResponseTime, Status
}

function Monitor-WMI {
    Write-Host "Monitorando status do WMI..."
    Get-WmiObject Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber
}

function Monitor-Search {
    Write-Host "Monitorando serviço de busca..."
    Get-Service "WSearch" | Select-Object Status, StartType
}

function Monitor-Video {
    Write-Host "Monitorando controlador de vídeo..."
    Get-WmiObject Win32_VideoController | Select-Object Name, DriverVersion, Status
}

function Monitor-Sound {
    Write-Host "Monitorando dispositivos de áudio..."
    Get-PnpDevice -Class Media | Select-Object FriendlyName, Status
}

# Funções de Reparo
function Repair-Windows {
    Write-Host "Impacto: Pode reiniciar serviços e levar vários minutos."
    sfc /scannow
    DISM /Online /Cleanup-Image /RestoreHealth
    Write-Host "Componentes do Windows reparados.`n"
}

function Repair-StoreApps {
    Write-Host "Impacto: Pode apagar configurações e exigir novo login."
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

# =============================
# Interface Gráfica
# =============================

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$form = New-Object System.Windows.Forms.Form
$form.Text = "Assistente de Manutenção"
$form.Size = New-Object System.Drawing.Size(600,450)
$form.StartPosition = "CenterScreen"

$tabControl = New-Object System.Windows.Forms.TabControl
$tabControl.Size = New-Object System.Drawing.Size(580,400)
$tabControl.Location = New-Object System.Drawing.Point(10,10)
$form.Controls.Add($tabControl)

# -----------------------------
# Função para criar botões de forma rápida
# -----------------------------
function Add-Button($tab, $text, $x, $y, $action) {
    $btn = New-Object System.Windows.Forms.Button
    $btn.Text = $text
    $btn.Size = New-Object System.Drawing.Size(150,40)
    $btn.Location = New-Object System.Drawing.Point($x,$y)
    $btn.Add_Click($action)
    $tab.Controls.Add($btn)
}

# -----------------------------
# Aba Limpeza
# -----------------------------
$tabClean = New-Object System.Windows.Forms.TabPage
$tabClean.Text = "Limpeza"
$tabControl.TabPages.Add($tabClean)

Add-Button $tabClean "Básica" 20 20 { Clear-Basic }
Add-Button $tabClean "Completa" 200 20 { Clear-Full }
Add-Button $tabClean "Cache da Loja" 20 80 { Clear-AppCache }
Add-Button $tabClean "Cache MSI" 200 80 { Clear-MSI }

# -----------------------------
# Aba Otimização
# -----------------------------
$tabOptimize = New-Object System.Windows.Forms.TabPage
$tabOptimize.Text = "Otimização"
$tabControl.TabPages.Add($tabOptimize)

Add-Button $tabOptimize "Aplicativos" 20 20 { Optimize-Apps }
Add-Button $tabOptimize "Rede" 200 20 { Optimize-Network }
Add-Button $tabOptimize "WMI" 20 80 { Optimize-WMI }
Add-Button $tabOptimize "Windows Search" 200 80 { Optimize-Search }
Add-Button $tabOptimize "Vídeo" 20 140 { Optimize-Video }
Add-Button $tabOptimize "Som" 200 140 { Optimize-Sound }

# -----------------------------
# Aba Monitoramento
# -----------------------------
$tabMonitor = New-Object System.Windows.Forms.TabPage
$tabMonitor.Text = "Monitoramento"
$tabControl.TabPages.Add($tabMonitor)

Add-Button $tabMonitor "Aplicativos" 20 20 { Monitor-Apps }
Add-Button $tabMonitor "Rede" 200 20 { Monitor-Network }
Add-Button $tabMonitor "WMI" 20 80 { Monitor-WMI }
Add-Button $tabMonitor "Windows Search" 200 80 { Monitor-Search }
Add-Button $tabMonitor "Vídeo" 20 140 { Monitor-Video }
Add-Button $tabMonitor "Som" 200 140 { Monitor-Sound }

# -----------------------------
# Aba Reparo
# -----------------------------
$tabRepair = New-Object System.Windows.Forms.TabPage
$tabRepair.Text = "Reparo"
$tabControl.TabPages.Add($tabRepair)

Add-Button $tabRepair "Windows" 20 20 { Repair-Windows }
Add-Button $tabRepair "Aplicativos da Loja" 200 20 { Repair-StoreApps }
Add-Button $tabRepair "Programas MSI" 20 80 { Repair-MSI }

# =============================
# Mostrar formulário
# =============================
$form.ShowDialog()
