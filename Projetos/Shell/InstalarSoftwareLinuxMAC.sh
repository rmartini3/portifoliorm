#!/usr/bin/env bash
# INSTALADOR MULTIPLATAFORMA - macOS, Debian e Ubuntu
# Autor: [Seu Nome]
# Versão: 2.0

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variáveis globais
DRY_RUN=false
PACKAGES=""
PACKAGE_MANAGER=""
OS_TYPE=""
LOG_FILE="install_suite.log"

show_help() {
    cat << EOF
Uso: $(basename "$0") [OPÇÕES]

Opções:
    -p, --packages LISTA  Lista de pacotes separados por vírgula
    --dry-run            Simular instalação sem executar
    -h, --help           Mostrar esta ajuda
    --log                Gerar arquivo de log

Exemplos:
    $(basename "$0") -p "wget,curl,vim"
    $(basename "$0") -p "nodejs,python3" --dry-run
EOF
}

log_message() {
    local message="$1"
    echo -e "${BLUE}[LOG]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $message"
    if [ "$ENABLE_LOG" = true ]; then
        echo "[LOG] $(date '+%Y-%m-%d %H:%M:%S') - $message" >> "$LOG_FILE"
    fi
}

detect_os() {
    case "$(uname -s)" in
        Darwin)
            OS_TYPE="macos"
            PACKAGE_MANAGER="brew"
            ;;
        Linux)
            if [ -f /etc/debian_version ] || [ -f /etc/lsb-release ]; then
                OS_TYPE="debian"
                PACKAGE_MANAGER="apt"
            else
                log_message "${RED}Sistema Linux não suportado${NC}"
                exit 1
            fi
            ;;
        *)
            log_message "${RED}Sistema operacional não suportado${NC}"
            exit 1
            ;;
    esac
    log_message "Sistema detectado: $OS_TYPE"
}

check_dependencies() {
    case "$PACKAGE_MANAGER" in
        brew)
            if ! command -v brew &> /dev/null; then
                log_message "${YELLOW}Homebrew não encontrado. Instalando...${NC}"
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            fi
            ;;
        apt)
            if ! command -v sudo &> /dev/null; then
                log_message "${YELLOW}sudo não encontrado. Instalando...${NC}"
                apt update && apt install -y sudo
            fi
            ;;
    esac
}

install_packages() {
    local packages=$1
    IFS=',' read -ra package_array <<< "$packages"
    
    log_message "Iniciando instalação de: ${package_array[*]}"
    
    case "$PACKAGE_MANAGER" in
        brew)
            if $DRY_RUN; then
                log_message "${GREEN}DRY-RUN:${NC} brew install ${package_array[*]}"
            else
                brew install "${package_array[@]}"
            fi
            ;;
        apt)
            if $DRY_RUN; then
                log_message "${GREEN}DRY-RUN:${NC} sudo apt install -y ${package_array[*]}"
            else
                sudo apt update
                sudo apt install -y "${package_array[@]}"
            fi
            ;;
    esac
}

install_special_cases() {
    # Casos especiais para pacotes com nomes diferentes entre sistemas
    local package=$1
    
    case "$package" in
        "notepadplusplus")
            if [ "$OS_TYPE" = "macos" ]; then
                echo "notepad-plus-plus"
            else
                echo "notepadqq"
            fi
            ;;
        "7zip")
            if [ "$OS_TYPE" = "macos" ]; then
                echo "p7zip"
            else
                echo "p7zip-full"
            fi
            ;;
        *)
            echo "$package"
            ;;
    esac
}

process_packages() {
    local packages=$1
    local processed_packages=()
    
    IFS=',' read -ra package_array <<< "$packages"
    
    for pkg in "${package_array[@]}"; do
        processed_pkg=$(install_special_cases "$pkg")
        processed_packages+=("$processed_pkg")
    done
    
    echo "${processed_packages[*]}" | tr ' ' ','
}

main() {
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -p|--packages)
                PACKAGES="$2"
                shift 2
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            --log)
                ENABLE_LOG=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                log_message "${RED}Opção desconhecida: $1${NC}"
                show_help
                exit 1
                ;;
        esac
    done

    if [ -z "$PACKAGES" ]; then
        log_message "${RED}Nenhum pacote especificado${NC}"
        show_help
        exit 1
    fi

    # Iniciar log
    if [ "$ENABLE_LOG" = true ]; then
        > "$LOG_FILE"
    fi

    detect_os
    check_dependencies
    
    # Processar pacotes com casos especiais
    PROCESSED_PACKAGES=$(process_packages "$PACKAGES")
    
    log_message "Pacotes a serem instalados: $PROCESSED_PACKAGES"
    install_packages "$PROCESSED_PACKAGES"
    
    log_message "${GREEN}Instalação concluída com sucesso!${NC}"
}

# Execução principal
main "$@"