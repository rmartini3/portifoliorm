// ThemeManager: Handles theme switching and persistence
class ThemeManager {
    constructor() {
        this.themeToggleBtns = document.querySelectorAll('.theme-toggle');
        this.vintageCss = document.getElementById('vintage-css');
        this.init();
    }
    setTheme(theme) {
        document.body.classList.remove('dark', 'vintage-theme', 'modern-theme');
        if (theme === 'dark') document.body.classList.add('dark');
        if (theme === 'vintage') {
            document.body.classList.add('vintage-theme');
            if (this.vintageCss) this.vintageCss.disabled = false;
        } else {
            if (this.vintageCss) this.vintageCss.disabled = true;
            document.body.classList.add('modern-theme');
        }
        localStorage.setItem('theme', theme);
        this.updateIcon(theme);
    }
    updateIcon(theme) {
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = theme === 'vintage' ? '🕰️' : (theme === 'dark' ? '🌙' : '🌞');
    }
    init() {
        const savedTheme = localStorage.getItem('theme') || 'modern';
        this.setTheme(savedTheme);
        this.themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const nextTheme = btn.dataset.theme;
                this.setTheme(nextTheme);
            });
        });
    }
}

export default ThemeManager;
