import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, Wrench, Trophy, Phone } from 'lucide-react';

const Home = ({ t, setActiveSection }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.portfolioTitle}
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-2">{t.portfolioSubtitle1}</h2>
          <h2 className="text-lg md:text-2xl text-muted-foreground mb-8">{t.portfolioSubtitle2}</h2>
          <div className="mt-8 flex justify-center">
            <img
              src="/foto-perfil.jpeg"
              alt="Foto de perfil profissional"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-primary object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <Code className="w-8 h-8 text-orange-600 mb-2" />
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
};

export default Home;