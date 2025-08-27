import React, { useEffect, useState } from 'react';
import './App.css';
import Presentation from './components/Presentation.jsx';
import SkillsPage from './components/SkillsPage.jsx';
import ExperiencePage from './components/ExperiencePage.jsx';
import CertificationsPage from './components/CertificationsPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import Projects from './components/Projects.jsx';
import LanguageToggle from './components/LanguageToggle.jsx';
import Header from './components/Header';
import Footer from './components/Footer';


const API_URL = 'http://localhost:3001/api';

function Section({ section, language }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/page/${section}?lang=${language}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados.');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [section, language]);
  if (loading) {
    return <div className="flex justify-center items-center py-8"><span className="loader" aria-label="Carregando..." /></div>;
  }
  if (error) {
    return <div className="text-red-600 text-center py-8" role="alert">{error}</div>;
  }
  return (
    <section className="presentation-content section fade-in">
      {section === 'apresentacao' && (
        <img src="/public/foto-perfil.jpeg" alt="Foto de Rafael Martini" className="profile-img" />
      )}
      <div>
        <h1 style={{fontFamily: 'Orbitron, Montserrat, Arial, sans-serif', color: 'var(--primary, #2563eb)'}} tabIndex="0">{data.title}</h1>
        <p style={{fontFamily: 'Roboto, Arial, sans-serif'}} tabIndex="0">{data.description}</p>
        <div className="flex gap-4 mt-2">
          {data.links && data.links.map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener" className="footer-link">{link.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
/* Loader CSS */
// Adicione ao seu CSS global ou App.css:
// .loader {
//   border: 4px solid #f3f3f3;
//   border-top: 4px solid #2563eb;
//   border-radius: 50%;
//   width: 32px;
//   height: 32px;
//   animation: spin 1s linear infinite;
// }
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'pt');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });
  const [activeSection, setActiveSection] = useState('apresentacao');
  const [t, setT] = useState({});

  // Carrega tradução e persiste idioma
  useEffect(() => {
    fetch(`${API_URL}/translation/${language}`)
      .then(res => res.json())
      .then(setT);
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  // Alternância de tema persistente e aplicação da classe correta
  useEffect(() => {
    document.body.className = theme === 'vintage' ? 'vintage-theme' : theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300`}>
      <Header
        t={t}
        setActiveSection={setActiveSection}
        theme={theme}
        setTheme={setTheme}
        LanguageToggle={{ changeLanguage: setLanguage }}
        activeSection={activeSection}
      />
      <main className="container mx-auto px-4 py-8 fade-in">
        <Section section={activeSection} language={language} />
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;