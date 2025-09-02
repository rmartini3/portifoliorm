// LanguageManager: Handles language switching and navigation
class LanguageManager {
    constructor() {
        this.langToggle = document.getElementById('lang-toggle');
        this.init();
    }
    setLanguage(lang) {
        let url = window.location.pathname;
        if (lang === 'pt') url = url.replace(/(_en|_es)?\.html$/, '.html');
        if (lang === 'en') url = url.replace(/(_es)?\.html$/, '_en.html');
        if (lang === 'es') url = url.replace(/(_en)?\.html$/, '_es.html');
        window.location.href = url;
    }
    init() {
        if (this.langToggle) {
            this.langToggle.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }
}

export default LanguageManager;
