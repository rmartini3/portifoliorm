// src/components/ManusVSCode.jsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.jsx'
import { Code } from 'lucide-react'

function ManusVSCode({ t }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t.projects.howToLinkManusVSCode}</CardTitle>
          <CardDescription>{t.projects.noOfficialExtension}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>{t.projects.agentMode}</strong></li>
            <li><strong>{t.projects.aiLLMExtensions}</strong></li>
            <li><strong>{t.projects.remoteDevEnvironment}</strong></li>
            <li><strong>{t.projects.apiIntegration}</strong></li>
          </ul>
          <p className="mt-4">{t.summaryDesc}</p>
        </CardContent>
      </Card>
    </section>
  )
}

export default ManusVSCode
