import { Globe } from 'lucide-react'

function LanguageToggle({ changeLanguage }) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-5 h-5 text-muted-foreground" />
      <button
        onClick={() => changeLanguage('pt-br')}
        className="text-sm hover:underline"
        aria-label="Mudar para Português"
      >
        🇧🇷
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className="text-sm hover:underline"
        aria-label="Switch to English"
      >
        🇺🇸
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className="text-sm hover:underline"
        aria-label="Cambiar a Español"
      >
        🇪🇸
      </button>
    </div>
  )
}

export default LanguageToggle
// src/components/LanguageToggle.jsx