import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

function ExperiencePage({ t }) {
  const experiences = [
    {
      title: t.fieldServicesAnalystTitle,
      company: t.fieldServicesAnalystCompany,
      period: t.fieldServicesAnalystPeriod,
      location: t.fieldServicesAnalystLocation,
      responsibilities: [
        t.fieldServicesAnalystResp1, t.fieldServicesAnalystResp2, t.fieldServicesAnalystResp3, t.fieldServicesAnalystResp4,
        t.fieldServicesAnalystResp5, t.fieldServicesAnalystResp6, t.fieldServicesAnalystResp7
      ],
      tools: t.fieldServicesAnalystTools.split(', ').map(tool => tool.trim())
    },
    {
      title: t.supportTechnicianTitle,
      company: t.supportTechnicianCompany,
      period: t.supportTechnicianPeriod,
      location: t.supportTechnicianLocation,
      responsibilities: [
        t.supportTechnicianResp1, t.supportTechnicianResp2, t.supportTechnicianResp3, t.supportTechnicianResp4,
        t.supportTechnicianResp5
      ],
      tools: t.supportTechnicianTools.split(', ').map(tool => tool.trim())
    },
    {
      title: t.fullTechnicalSupportAnalystTitle,
      company: t.fullTechnicalSupportAnalystCompany,
      period: t.fullTechnicalSupportAnalystPeriod,
      location: t.fullTechnicalSupportAnalystLocation,
      responsibilities: [
        t.fullTechnicalSupportAnalystResp1, t.fullTechnicalSupportAnalystResp2, t.fullTechnicalSupportAnalystResp3,
        t.fullTechnicalSupportAnalystResp4, t.fullTechnicalSupportAnalystResp5
      ],
      tools: t.fullTechnicalSupportAnalystTools.split(', ').map(tool => tool.trim())
    }
  ];

  return (
    <div className="min-h-screen py-8 px-2 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">{t.experienceTitle}</h2>
        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  <strong>{t.companyLabel}:</strong> {exp.company} | <strong>{t.periodLabel}:</strong> {exp.period} | {exp.location}
                </p>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg font-semibold mb-2">{t.responsibilitiesLabel}:</h4>
                <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
                <h4 className="text-lg font-semibold mb-2">{t.toolsLabel}:</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.tools.map((tool, toolIndex) => (
                    <Badge key={toolIndex} variant="secondary">{tool}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperiencePage;
