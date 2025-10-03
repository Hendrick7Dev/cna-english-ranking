import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDashboardStats } from "@/db"

export default async function DashboardPage() {
  // Buscar dados reais do banco
  const dashboardStats = await getDashboardStats()
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard CNA</h1>
          <p className="text-muted-foreground">Gerencie o sistema de ranking dos alunos</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/students/add">
            <Button className="bg-secondary hover:bg-secondary/90">➕ Novo Aluno</Button>
          </Link>
          <Link href="/dashboard/add-points">
            <Button>⭐ Adicionar Pontos</Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <div className="text-2xl">👥</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Alunos cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
            <div className="text-2xl">⚡</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{dashboardStats.averagePoints}</div>
            <p className="text-xs text-muted-foreground">Pontos por aluno</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Atividades</CardTitle>
            <div className="text-2xl">📚</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{dashboardStats.totalActivities}</div>
            <p className="text-xs text-muted-foreground">Atividades cadastradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
            <div className="text-2xl">🏆</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.totalPoints}</div>
            <p className="text-xs text-muted-foreground">Pontos distribuídos</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">📋 Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardStats.recentEntries.length > 0 ? (
              dashboardStats.recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary">{entry.student_name}</h4>
                    <p className="text-sm text-muted-foreground">{entry.activity_description}</p>
                    {entry.notes && (
                      <p className="text-xs text-muted-foreground italic mt-1">"{entry.notes}"</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-secondary">+{entry.points_awarded} pts</div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">📝</div>
                <p>Nenhuma atividade registrada ainda</p>
                <p className="text-sm">Comece adicionando pontos aos alunos!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">👥 Gerenciar Alunos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Adicione novos alunos, edite informações ou remova alunos do sistema.
            </p>
            <div className="flex gap-3">
              <Link href="/dashboard/students">
                <Button variant="outline">Ver Todos</Button>
              </Link>
              <Link href="/dashboard/students/add">
                <Button>Adicionar Novo</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/5 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-secondary">⭐ Sistema de Pontos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Adicione pontos aos alunos por atividades, participação e conquistas.
            </p>
            <div className="flex gap-3">
              <Link href="/dashboard/add-points">
                <Button className="bg-secondary hover:bg-secondary/90">Adicionar Pontos</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Ver Ranking</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
