// ThemeManager.js - Módulo responsável por alternar entre temas claro e escuro.

/**
 * Classe responsável por gerenciar a alternância entre temas.
 * Atualmente suporta temas 'light' (padrão) e 'dark'.
 */
export class ThemeManager {
    constructor() {
        this.htmlElement = document.documentElement;
        this.themeKey = 'app-theme';
    }

    /**
     * Carrega o tema salvo no localStorage ou define o tema padrão.
     * @element htmlElement
     */
    loadTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('light'); // Tema padrão
        }
    }

    /**
     * Alterna o tema atual para o oposto.
     * @element htmlElement
     */
    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    /**
     * Define o tema da aplicação.
     * @param {string} themeName - O nome do tema a ser aplicado ('light' ou 'dark').
     * @element htmlElement
     */
    setTheme(themeName) {
        this.htmlElement.setAttribute('data-theme', themeName);
        localStorage.setItem(this.themeKey, themeName);
    }
}