import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ExternalLink, Award } from 'lucide-react';

function CertificationsPage({ t }) {
  return (
    <div className="min-h-screen py-8 px-2 sm:px-4">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">{t.certificationsTitle}</h2>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.certificationsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {t.certificationsList.map((cert, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold">{cert.title}</h3>
                    <p className="text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.professionalProfilesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-muted-foreground">
              {t.professionalProfiles.map((profile, index) => (
                <li key={index} className="mb-2">
                  <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                    {profile.name} <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CertificationsPage;
