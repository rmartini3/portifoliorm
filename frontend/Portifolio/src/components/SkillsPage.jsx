import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Wrench, TrendingUp } from 'lucide-react';

function SkillsPage({ t }) {
  return (
    <div className="min-h-screen py-8 px-2 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{fontFamily: 'Orbitron, Montserrat, Arial, sans-serif', color: 'var(--primary, #2563eb)'}} tabIndex="0">{t.skillsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-6 h-6" />
                {t.technicalAndBehavioralSkillsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
      <ul className="list-disc pl-5 text-muted-foreground space-y-1" style={{fontFamily: 'Roboto, Arial, sans-serif'}}>
                {t.technicalAndBehavioralSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                {t.managementAndMethodologiesTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {t.managementAndMethodologies.map((methodology, index) => (
                  <li key={index}>{methodology}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;
