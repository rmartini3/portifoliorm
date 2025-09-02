import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { User, Briefcase, Wrench, Trophy, Phone, ExternalLink } from 'lucide-react';

function Presentation({ language, t, setActiveSection }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3001/api/page/apresentacao?lang=${language}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados.');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) {
    return <div className="flex justify-center items-center py-8"><span className="loader" aria-label="Carregando..." /></div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8" role="alert">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.portfolioTitle}
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold mb-2">{t.portfolioSubtitle1}</h2>
        <h2 className="text-lg md:text-2xl text-muted-foreground mb-8">{t.portfolioSubtitle2}</h2>
          <div className="mt-8 flex justify-center">
            <div className="presentation-content">
              <img src="/public/foto-perfil.jpeg" alt="Foto de Rafael Martini" className="profile-img" />
              <div>
                <h1 style={{fontFamily: 'Orbitron, Montserrat, Arial, sans-serif', color: 'var(--primary, #2563eb)'}} tabIndex="0">{data.title}</h1>
                <p style={{fontFamily: 'Roboto, Arial, sans-serif'}} tabIndex="0">{data.description}</p>
                <div className="flex gap-4 mt-2">
                  {data.links && data.links.map(link => (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener" className="footer-link">{link.label}</a>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button className="nav-link" onClick={() => setActiveSection('sobre')}>{t.sobre || 'Sobre'}</button>
                  <button className="nav-link" onClick={() => setActiveSection('habilidades')}>{t.habilidades || 'Habilidades'}</button>
                  <button className="nav-link" onClick={() => setActiveSection('experiencia')}>{t.experiencia || 'Experiência'}</button>
                  <button className="nav-link" onClick={() => setActiveSection('certificacoes')}>{t.certificacoes || 'Certificações'}</button>
                  <button className="nav-link" onClick={() => setActiveSection('contato')}>{t.contato || 'Contato'}</button>
                </div>
              </div>
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('about')}>
            <CardHeader>
              <User className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>{t.aboutCardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.aboutCardDescription}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('experience')}>
            <CardHeader>
              <Briefcase className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>{t.experienceCardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.experienceCardDescription}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('skills')}>
            <CardHeader>
              <Wrench className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>{t.skillsCardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.skillsCardDescription}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('certifications')}>
            <CardHeader>
              <Trophy className="w-8 h-8 text-yellow-600 mb-2" />
              <CardTitle>{t.certificationsCardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.certificationsCardDescription}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('contact')}>
            <CardHeader>
              <Phone className="w-8 h-8 text-teal-600 mb-2" />
              <CardTitle>{t.contactCardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.contactCardDescription}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('projects')}>
            <CardHeader>
              <ExternalLink className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>{t.projects.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.projects.cardDescription1}</p>
              <Button variant="link" className="mt-4 p-0" onClick={() => window.open(t.projects.cardLink, '_blank')}>
                {t.projects.viewProjects}
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
