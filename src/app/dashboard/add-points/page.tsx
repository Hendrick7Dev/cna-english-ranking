import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllStudents, getAllActivities, getRecentPointEntries } from "@/db"
import { AddPointsForm } from "./add-points-form"

export default async function AddPointsPage() {
  // Buscar dados reais do banco
  const [students, activities, recentEntries] = await Promise.all([
    getAllStudents(),
    getAllActivities(),
    getRecentPointEntries(5)
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">⭐ Adicionar Pontos</h1>
        <p className="text-muted-foreground">Recompense os alunos por suas atividades e conquistas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <AddPointsForm students={students} activities={activities} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Estatísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Alunos ativos:</span>
                <span className="font-bold text-accent">{students.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Atividades disponíveis:</span>
                <span className="font-bold text-primary">{activities.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Entradas recentes:</span>
                <span className="font-bold text-secondary">{recentEntries.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🕒 Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentEntries.length > 0 ? (
                recentEntries.map((entry) => (
                  <div key={entry.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{entry.student_name}</p>
                        <p className="text-xs text-muted-foreground">{entry.activity_description}</p>
                        {entry.notes && (
                          <p className="text-xs text-muted-foreground italic">"{entry.notes}"</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary">+{entry.points_awarded}</p>
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
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <div className="text-2xl mb-2">📝</div>
                  <p className="text-sm">Nenhuma atividade recente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
