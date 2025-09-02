#!/usr/bin/env bash
# INSTALADOR NOC PROFISSIONAL
# Autor: [Seu Nome]
# Data: $(date +'%d/%m/%Y')

set -e

declare -A LANG_SUPPORT=(
    ["pt_BR"]="Portuguese (Brazil)"
    ["en_US"]="English (US)"
    ["es_ES"]="Spanish"
)

show_help() {
    cat << EOF
Uso: $0 [OPÇÕES]

Opções:
    --zabbix      Instalar Zabbix Agent
    --grafana     Instalar Grafana
    --glpi        Instalar GLPI
    --all         Instalar todos componentes
    --lang LANG   Definir idioma (pt_BR, en_US, es_ES)
    --silent      Modo silencioso
    --help        Mostrar ajuda
EOF
}

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

setup_environment() {
    export DEBIAN_FRONTEND=noninteractive
    LANG=${LANG:-"pt_BR"}
    
    log "Configurando ambiente $LANG"
    locale-gen $LANG.UTF-8
    update-locale LANG=$LANG.UTF-8
}

install_zabbix() {
    log "Instalando Zabbix Agent"
    wget https://repo.zabbix.com/zabbix/6.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.0-4+ubuntu22.04_all.deb
    dpkg -i zabbix-release_6.0-4+ubuntu22.04_all.deb
    apt update
    apt install -y zabbix-agent2 zabbix-agent2-plugin-*
    systemctl enable zabbix-agent2
}

install_grafana() {
    log "Instalando Grafana"
    apt install -y software-properties-common
    add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
    wget -q -O - https://packages.grafana.com/gpg.key | apt-key add -
    apt update
    apt install -y grafana
    systemctl enable grafana-server
}

install_glpi() {
    log "Instalando GLPI"
    apt install -y apache2 mariadb-server php php-mysql php-curl php-gd php-xml php-mbstring
    wget https://github.com/glpi-project/glpi/releases/download/10.0.7/glpi-10.0.7.tgz
    tar -xzf glpi-10.0.7.tgz -C /var/www/html/
    chown -R www-data:www-data /var/www/html/glpi/
}

# Processamento de argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        --all) INSTALL_ALL=true ;;
        --zabbix) INSTALL_ZABBIX=true ;;
        --grafana) INSTALL_GRAFANA=true ;;
        --glpi) INSTALL_GLPI=true ;;
        --lang) LANG="$2"; shift ;;
        --silent) SILENT=true ;;
        --help) show_help; exit 0 ;;
        *) echo "Opção inválida: $1"; exit 1 ;;
    esac
    shift
done

# Execução principal
setup_environment

${INSTALL_ALL:-false} && {
    INSTALL_ZABBIX=true
    INSTALL_GRAFANA=true
    INSTALL_GLPI=true
}

${INSTALL_ZABBIX:-false} && install_zabbix
${INSTALL_GRAFANA:-false} && install_grafana
${INSTALL_GLPI:-false} && install_glpi

log "Instalação concluída"