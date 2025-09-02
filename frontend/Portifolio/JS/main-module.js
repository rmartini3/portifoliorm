// main-module.js: Central orchestrator for portfolio modules
import ThemeManager from './themeManager.js';
import LanguageManager from './languageManager.js';
import { initUI } from './uiManager.js';

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new LanguageManager();
    initUI();
});
