import React, { useEffect } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";

// Revisar Header: garantir acessibilidade, navegação e integração dinâmica
function Header({ t, setActiveSection, theme, setTheme, LanguageToggle, activeSection }) {
  useEffect(() => {
    // Atualiza idioma no App ao trocar
    if (LanguageToggle && LanguageToggle.changeLanguage) {
      LanguageToggle.changeLanguage('pt');
    }
  }, [LanguageToggle]);

  return (
    <header className="header flex justify-between items-center py-4 px-6 bg-header shadow-md">
      <nav className="flex gap-4">
        <button
          className={`nav-btn${activeSection === 'apresentacao' ? ' active' : ''}`}
          onClick={() => setActiveSection('apresentacao')}
        >{t.apresentacao || 'Apresentação'}</button>
        <button
          className={`nav-btn${activeSection === 'habilidades' ? ' active' : ''}`}
          onClick={() => setActiveSection('habilidades')}
        >{t.habilidades || 'Habilidades'}</button>
        <button
          className={`nav-btn${activeSection === 'certificacoes' ? ' active' : ''}`}
          onClick={() => setActiveSection('certificacoes')}
        >{t.certificacoes || 'Certificações'}</button>
        <button
          className={`nav-btn${activeSection === 'experiencia' ? ' active' : ''}`}
          onClick={() => setActiveSection('experiencia')}
        >{t.experiencia || 'Experiência'}</button>
        <button
          className={`nav-btn${activeSection === 'contato' ? ' active' : ''}`}
          onClick={() => setActiveSection('contato')}
        >{t.contato || 'Contato'}</button>
      </nav>
      <div className="flex gap-2 items-center">
        <button
          className={`theme-btn${theme === 'light' ? ' active' : ''}`}
          aria-label={t.modoClaro || 'Modo claro'}
          onClick={() => setTheme('light')}
        >
          <Sun className="w-6 h-6" fill="currentColor" />
        </button>
        <button
          className={`theme-btn${theme === 'dark' ? ' active' : ''}`}
          aria-label={t.modoEscuro || 'Modo escuro'}
          onClick={() => setTheme('dark')}
        >
          <Moon className="w-6 h-6" fill="currentColor" />
        </button>
        <button
          className={`theme-btn${theme === 'vintage' ? ' active' : ''}`}
          aria-label={t.modoVintage || 'Modo vintage'}
          onClick={() => setTheme('vintage')}
        >
          <Sparkles className="w-6 h-6" fill="currentColor" />
        </button>
        <select
          className="lang-toggle"
          aria-label={t.selecionarIdioma || 'Selecionar idioma'}
          value={t.lang || 'pt'}
          onChange={e => LanguageToggle.changeLanguage(e.target.value)}
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
