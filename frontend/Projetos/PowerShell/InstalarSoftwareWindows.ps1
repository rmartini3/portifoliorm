<#
INSTALADOR DE PACOTES WINDOWS - VERSÃO AVANÇADA
Autor: [Seu Nome]
Data: $(Get-Date -Format 'dd/MM/yyyy')
Uso: .\install_suite.ps1 -Packages "7zip,notepadplusplus" -Provider chocolatey
#>

param(
    [string]$Packages = "",
    [ValidateSet('chocolatey','winget')]
    [string]$Provider = "chocolatey",
    [switch]$DryRun,
    [switch]$Force
)

$ErrorActionPreference = "Stop"

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Install-Chocolatey {
    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "Instalando Chocolatey..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    }
}

function Install-Winget {
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        Write-Host "Winget não encontrado. Instalando..." -ForegroundColor Yellow
        $releases_url = "https://api.github.com/repos/microsoft/winget-cli/releases/latest"
        $download_url = (Invoke-RestMethod -Uri $releases_url).assets.browser_download_url -match '.msixbundle'
        Invoke-WebRequest -Uri $download_url -OutFile "winget.msixbundle"
        Add-AppxPackage -Path "winget.msixbundle"
        Remove-Item "winget.msixbundle"
    }
}

function Install-Package {
    param($pkg, $provider)
    
    switch ($provider) {
        'chocolatey' { 
            if ($Force) { choco install $pkg -y --force }
            else { choco install $pkg -y }
        }
        'winget' { winget install --id $pkg --silent --accept-package-agreements }
    }
}

# Execução principal
try {
    if (-not $Packages) {
        Write-Host "Erro: Nenhum pacote especificado" -ForegroundColor Red
        exit 1
    }

    if (-not (Test-Admin)) {
        Write-Host "Requer elevação de administrador" -ForegroundColor Red
        exit 1
    }

    $pkgList = $Packages.Split(",") | Where-Object { $_ -ne "" }

    # Instalar provider se necessário
    if (-not $DryRun) {
        switch ($Provider) {
            'chocolatey' { Install-Chocolatey }
            'winget' { Install-Winget }
        }
    }

    foreach ($pkg in $pkgList) {
        Write-Host "Instalando $pkg usando $Provider..." -ForegroundColor Cyan
        
        if ($DryRun) {
            Write-Host "[SIMULAÇÃO] Instalando: $pkg" -ForegroundColor Green
        } else {
            Install-Package -pkg $pkg -provider $Provider
            Write-Host "$pkg instalado com sucesso!" -ForegroundColor Green
        }
    }
}
catch {
    Write-Host "Erro durante a instalação: $_" -ForegroundColor Red
    exit 1
}