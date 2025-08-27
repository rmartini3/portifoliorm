# ==========================================
# Script de Manutenção - Interface Gráfica com Log
# ==========================================

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# ----------------------------
# Função para criar log na GUI
# ----------------------------
$form = New-Object System.Windows.Forms.Form
$form.Text = "Assistente de Manutenção"
$form.Size = New-Object System.Drawing.Size(600,500)
$form.StartPosition = "CenterScreen"

# Criar TextBox para log
$txtLog = New-Object System.Windows.Forms.TextBox
$txtLog.Multiline = $true
$txtLog.ScrollBars = "Vertical"
$txtLog.ReadOnly = $true
$txtLog.Size = New-Object System.Drawing.Size(560,150)
$txtLog.Location = New-Object System.Drawing.Point(10,330)
$form.Controls.Add($txtLog)

# Função para escrever no log
function Write-Log($text) {
    $txtLog.AppendText("$text`r`n")
    $txtLog.Refresh() # força atualização imediata
}

# ----------------------------
# Funções do script
# ----------------------------

# Funções de Limpeza
function Clear-Basic {
    Write-Log "Impacto: Remove arquivos temporários e da lixeira."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Log "Limpeza básica concluída.`n"
}

function Clear-Full {
    Write-Log "Impacto: Remove arquivos temporários, cache e lixeira."
    Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
    Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    Write-Log "Limpeza completa concluída.`n"
}

function Clear-AppCache {
    Write-Log "Impacto: Pode reiniciar aplicativos e apagar sessões."
    Get-ChildItem "$env:LOCALAPPDATA\Packages" -Recurse -Include "*Cache*" | Remove-Item -Force -ErrorAction SilentlyContinue
    Write-Log "Cache dos aplicativos limpo.`n"
}

function Clear-MSI {
    Write-Log "Impacto: Pode impedir reinstalações offline de programas MSI."
    Remove-Item "C:\Windows\Installer\$PatchCache$" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Log "Cache MSI limpo.`n"
}

# Funções de Otimização
function Optimize-Apps {
    Write-Log "Impacto: Pode encerrar processos em segundo plano. Salve seu trabalho."
    Get-Process | Where-Object { $_.CPU -lt 1 -and $_.Name -notmatch "System|Idle|explorer|powershell" } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Log "Aplicativos otimizados.`n"
}

function Optimize-Network {
    Write-Log "Impacto: Pode causar desconexão temporária."
    ipconfig /flushdns
    netsh int ip reset
    netsh winsock reset
    Write-Log "Rede otimizada.`n"
}

function Optimize-WMI {
    Write-Log "Impacto: Pode afetar ferramentas de monitoramento temporariamente."
    net stop winmgmt /y
    winmgmt /resetrepository
    net start winmgmt
    Write-Log "WMI otimizado.`n"
}

function Optimize-Search {
    Write-Log "Impacto: Pode causar lentidão temporária na busca."
    Stop-Service "WSearch" -Force
    Start-Service "WSearch"
    Write-Log "Windows Search otimizado.`n"
}

function Optimize-Video {
    Write-Log "Impacto: Pode reiniciar serviços gráficos."
    Restart-Service "GraphicsPerfSvc" -ErrorAction SilentlyContinue
    Write-Log "Vídeo otimizado.`n"
}

function Optimize-Sound {
    Write-Log "Impacto: Pode interromper o áudio temporariamente."
    Restart-Service "Audiosrv" -ErrorAction SilentlyContinue
    Write-Log "Som otimizado.`n"
}

# Funções de Monitoramento
function Monitor-Apps {
    Write-Log "Monitorando processos com maior uso de CPU..."
    Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, ID | ForEach-Object { Write-Log "$($_.Name) CPU:$($_.CPU) ID:$($_.ID)" }
}

function Monitor-Network {
    Write-Log "Monitorando latência de rede..."
    Test-Connection "8.8.8.8" -Count 4 | ForEach-Object { Write-Log "Endereço: $($_.Address) Tempo: $($_.ResponseTime)ms Status: $($_.Status)" }
}

function Monitor-WMI {
    Write-Log "Monitorando status do WMI..."
    Get-WmiObject Win32_OperatingSystem | ForEach-Object { Write-Log "OS: $($_.Caption) Versão: $($_.Version) Build: $($_.BuildNumber)" }
}

function Monitor-Search {
    Write-Log "Monitorando serviço de busca..."
    Get-Service "WSearch" | ForEach-Object { Write-Log "Status: $($_.Status) StartType: $($_.StartType)" }
}

function Monitor-Video {
    Write-Log "Monitorando controlador de vídeo..."
    Get-WmiObject Win32_VideoController | ForEach-Object { Write-Log "Nome: $($_.Name) Driver: $($_.DriverVersion) Status: $($_.Status)" }
}

function Monitor-Sound {
    Write-Log "Monitorando dispositivos de áudio..."
    Get-PnpDevice -Class Media | ForEach-Object { Write-Log "Dispositivo: $($_.FriendlyName) Status: $($_.Status)" }
}

# Funções de Reparo
function Repair-Windows {
    Write-Log "Impacto: Pode reiniciar serviços e levar vários minutos."
    sfc /scannow
    DISM /Online /Cleanup-Image /RestoreHealth
    Write-Log "Componentes do Windows reparados.`n"
}

function Repair-StoreApps {
    Write-Log "Impacto: Pode apagar configurações e exigir novo login."
    Get-AppxPackage -AllUsers | ForEach-Object {
        Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml" -ErrorAction SilentlyContinue
    }
    Write-Log "Aplicativos da Loja reparados.`n"
}

function Repair-MSI {
    Write-Log "Impacto: Pode exigir permissões administrativas e reinicialização."
    $apps = Get-WmiObject Win32_Product | Where-Object { $null -ne $_.Name }
    foreach ($app in $apps) {
        Write-Log "Reparando: $($app.Name)"
        $app.Reinstall()
    }
    Write-Log "Programas MSI reparados.`n"
}

# =============================
# Interface Gráfica com abas e botões
# =============================

$tabControl = New-Object System.Windows.Forms.TabControl
$tabControl.Size = New-Object System.Drawing.Size(560,300)
$tabControl.Location = New-Object System.Drawing.Point(10,10)
$form.Controls.Add($tabControl)

# Função auxiliar para adicionar botões
function Add-Button($tab, $text, $x, $y, $action) {
    $btn = New-Object System.Windows.Forms.Button
    $btn.Text = $text
    $btn.Size = New-Object System.Drawing.Size(150,40)
    $btn.Location = New-Object System.Drawing.Point($x,$y)
    $btn.Add_Click($action)
    $tab.Controls.Add($btn)
}

# Abas
$tabClean = New-Object System.Windows.Forms.TabPage
$tabClean.Text = "Limpeza"
$tabControl.TabPages.Add($tabClean)
Add-Button $tabClean "Básica" 20 20 { Clear-Basic }
Add-Button $tabClean "Completa" 200 20 { Clear-Full }
Add-Button $tabClean "Cache da Loja" 20 80 { Clear-AppCache }
Add-Button $tabClean "Cache MSI" 200 80 { Clear-MSI }

$tabOptimize = New-Object System.Windows.Forms.TabPage
$tabOptimize.Text = "Otimização"
$tabControl.TabPages.Add($tabOptimize)
Add-Button $tabOptimize "Aplicativos" 20 20 { Optimize-Apps }
Add-Button $tabOptimize "Rede" 200 20 { Optimize-Network }
Add-Button $tabOptimize "WMI" 20 80 { Optimize-WMI }
Add-Button $tabOptimize "Windows Search" 200 80 { Optimize-Search }
Add-Button $tabOptimize "Vídeo" 20 140 { Optimize-Video }
Add-Button $tabOptimize "Som" 200 140 { Optimize-Sound }

$tabMonitor = New-Object System.Windows.Forms.TabPage
$tabMonitor.Text = "Monitoramento"
$tabControl.TabPages.Add($tabMonitor)
Add-Button $tabMonitor "Aplicativos" 20 20 { Monitor-Apps }
Add-Button $tabMonitor "Rede" 200 20 { Monitor-Network }
Add-Button $tabMonitor "WMI" 20 80 { Monitor-WMI }
Add-Button $tabMonitor "Windows Search" 200 80 { Monitor-Search }
Add-Button $tabMonitor "Vídeo" 20 140 { Monitor-Video }
Add-Button $tabMonitor "Som" 200 140 { Monitor-Sound }

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
