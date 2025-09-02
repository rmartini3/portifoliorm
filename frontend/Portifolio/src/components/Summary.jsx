import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

const Summary = ({ t }) => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{t.professionalSummaryTitle}</h2>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-muted-foreground mb-4">
              {t.professionalSummaryParagraph1}
            </p>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 rounded-r-lg mb-4">
              <p className="text-muted-foreground italic">
                {t.professionalSummaryHighlight}
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              {t.professionalSummaryParagraph2}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.academicBackgroundTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>
                <strong>{t.academicBackgroundCourse}</strong> - {t.academicBackgroundInstitution} ({t.academicBackgroundPeriod})
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Summary;


