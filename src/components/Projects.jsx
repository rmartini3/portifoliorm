// src/components/Projects.jsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.jsx'
import { ExternalLink } from 'lucide-react'

function Projects({ t }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{t.projects.cardTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Projeto 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Projetos no GitHub</CardTitle>
            <CardDescription>Veja todos os projetos e exemplos no repositório.</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="https://github.com/rmartini3/portifoliorm/tree/master/Projetos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
              Ver projetos
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </CardContent>
        </Card>
        {/* Projeto 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Scripts PowerShell</CardTitle>
            <CardDescription>Automação de tarefas de TI, otimização de PCs e segurança.</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="https://github.com/rmartini3/PowerShell-OptimizePC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
              Ver projeto
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </CardContent>
        </Card>
        {/* Projeto 3 */}
        <Card>
          <CardHeader>
            <CardTitle>Shell Scripts Linux</CardTitle>
            <CardDescription>Scripts para otimização, backup e segurança em ambientes Linux.</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="https://github.com/rmartini3/Shell-OptimizePC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
              Ver projeto
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </CardContent>
        </Card>
      </div>
      {/* Botão Manus VSCode para projetos futuros */}
      <div className="flex justify-center mt-8">
        <a href="#" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition">
          <Code className="mr-2 w-5 h-5" />
          Manus VSCode (em breve)
        </a>
      </div>
    </section>
  )
}

export default Projects
