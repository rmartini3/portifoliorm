import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const AboutMe = ({ t }) => {
  return (
    <div className="min-h-screen py-8 px-2 sm:px-4">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">{t.aboutMeTitle}</h2>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.aboutMeCardTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              {t.aboutMeParagraph1}
            </p>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 rounded-r-lg mb-4">
              <p className="text-muted-foreground italic">
                {t.aboutMeParagraph2}
              </p>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">{t.professionalObjectiveTitle}</h3>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.professionalObjectiveParagraph}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutMe;