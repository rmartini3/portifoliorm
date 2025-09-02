#!/bin/bash

# encoding: UTF-8
clear

# Detecta distribuição
detect_distro() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
    else
        DISTRO="unknown"
    fi
}

# Detecta sistema de init
detect_init_system() {
    if command -v systemctl >/dev/null 2>&1; then
        INIT_SYSTEM="systemd"
    elif command -v rc-service >/dev/null 2>&1; then
        INIT_SYSTEM="openrc"
    elif [ -f /etc/init.d/networking ]; then
        INIT_SYSTEM="sysvinit"
    else
        INIT_SYSTEM="unknown"
    fi
}

# Instala pacotes essenciais
install_packages() {
    echo "📦 Instalando pacotes necessários..."
    if [[ "$DISTRO" == "ubuntu" || "$DISTRO" == "debian" ]]; then
        sudo apt update
        sudo apt install -y curl htop lsb-release
    elif [[ "$DISTRO" == "centos" || "$DISTRO" == "rhel" || "$DISTRO" == "fedora" ]]; then
        sudo yum update -y
        sudo yum install -y curl htop redhat-lsb
    else
        echo "❌ Distribuição não suportada automaticamente."
    fi
}

# Informações do sistema
get_system_info() {
    echo -e "\n===== Informações do Sistema ==============================="
    echo "🕒 Data e Hora: $(date '+%d/%m/%Y %H:%M:%S')"
    echo "🖥️ Sistema Operacional: $(lsb_release -d | cut -f2)"
    echo "👤 Usuário: $USER"
    echo "🔧 Init System: $INIT_SYSTEM"
    echo "============================================================"
}

# Menu principal
main_menu() {
    echo -e "\nMenu Principal:"
    echo "1️⃣ - Limpeza"
    echo "2️⃣ - Otimização"
    echo "3️⃣ - Monitoramento"
    echo "4️⃣ - Reparo"
    read -p "Selecione uma opção: " main_option
}

# Submenu
sub_menu() {
    case $main_option in
        1)
            echo -e "\n--- Tipo de Limpeza ----------------------------------------"
            echo "1) Básica"
            echo "2) Completa"
            read -p "Selecione o subtipo: " sub_option
            ;;
        2)
            echo -e "\n--- Tipo de Otimização ------------------------------------"
            echo "1) DNS"
            echo "2) Serviços"
            read -p "Selecione o subtipo: " sub_option
            ;;
        3)
            echo -e "\n--- Tipo de Monitoramento ----------------------------------"
            echo "1) Processos"
            echo "2) Disco"
            read -p "Selecione o subtipo: " sub_option
            ;;
        4)
            echo -e "\n--- Tipo de Reparo -----------------------------------------"
            echo "1) Pacotes quebrados"
            echo "2) Repositórios"
            read -p "Selecione o subtipo: " sub_option
            ;;
        *)
            echo "❌ Opção inválida."
            exit 1
            ;;
    esac
}

# Funções de limpeza
clear_basic() {
    echo "🧹 Limpando cache do usuário..."
    rm -rf ~/.cache/*
    echo "✅ Limpeza básica concluída."
}

clear_full() {
    echo "🧹 Limpando cache, logs e lixeira..."
    sudo rm -rf /var/tmp/*
    sudo rm -rf /tmp/*
    rm -rf ~/.cache/*
    rm -rf ~/.local/share/Trash/*
    echo "✅ Limpeza completa concluída."
}

# Funções de otimização
optimize_dns() {
    echo "🔧 Limpando cache DNS..."
    if command -v systemd-resolve >/dev/null 2>&1; then
        sudo systemd-resolve --flush-caches
        echo "✅ DNS otimizado via systemd-resolve."
    elif command -v resolvectl >/dev/null 2>&1; then
        sudo resolvectl flush-caches
        echo "✅ DNS otimizado via resolvectl."
    else
        echo "⚠️ Nenhum comando de limpeza de DNS disponível."
    fi
}

optimize_services() {
    echo "🔧 Reiniciando serviços de rede..."
    case "$INIT_SYSTEM" in
        systemd)
            sudo systemctl restart NetworkManager || sudo systemctl restart networking
            sudo systemctl restart systemd-logind
            ;;
        openrc)
            sudo rc-service networking restart
            ;;
        sysvinit)
            sudo /etc/init.d/networking restart
            ;;
        *)
            echo "⚠️ Sistema de init desconhecido. Não foi possível reiniciar serviços automaticamente."
            ;;
    esac
    echo "✅ Serviços otimizados."
}

# Funções de monitoramento
monitor_processes() {
    echo "📊 Processos com maior uso de CPU:"
    ps -eo pid,comm,%cpu --sort=-%cpu | head -n 10
}

monitor_disk() {
    echo "💾 Uso de disco:"
    df -h | grep -v tmpfs
}

# Funções de reparo
repair_packages() {
    echo "🛠️ Reparando pacotes quebrados..."
    if [[ "$DISTRO" == "ubuntu" || "$DISTRO" == "debian" ]]; then
        sudo apt --fix-broken install -y
    elif [[ "$DISTRO" == "centos" || "$DISTRO" == "rhel" || "$DISTRO" == "fedora" ]]; then
        sudo yum-complete-transaction --cleanup-only
    fi
    echo "✅ Reparo concluído."
}

repair_repos() {
    echo "🔄 Atualizando repositórios..."
    if [[ "$DISTRO" == "ubuntu" || "$DISTRO" == "debian" ]]; then
        sudo apt update
    elif [[ "$DISTRO" == "centos" || "$DISTRO" == "rhel" || "$DISTRO" == "fedora" ]]; then
        sudo yum check-update
    fi
    echo "✅ Repositórios atualizados."
}

# Execução principal
detect_distro
detect_init_system
install_packages
get_system_info
main_menu
sub_menu

case $main_option in
    1)
        case $sub_option in
            1) clear_basic ;;
            2) clear_full ;;
            *) echo "❌ Subtipo inválido." ;;
        esac
        ;;
    2)
        case $sub_option in
            1) optimize_dns ;;
            2) optimize_services ;;
            *) echo "❌ Subtipo inválido." ;;
        esac
        ;;
    3)
        case $sub_option in
            1) monitor_processes ;;
            2) monitor_disk ;;
            *) echo "❌ Subtipo inválido." ;;
        esac
        ;;
    4)
        case $sub_option in
            1) repair_packages ;;
            2) repair_repos ;;
            *) echo "❌ Subtipo inválido." ;;
        esac
        ;;
esac

echo -e "\n🏁 Processo finalizado. Obrigado por utilizar o assistente!"
