import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getAllStudents } from "@/db"
import { StudentActions } from "./student-actions"

function getLevelColor(level: string) {
  switch (level) {
    case "Advanced":
      return "bg-primary text-primary-foreground"
    case "Intermediate":
      return "bg-secondary text-secondary-foreground"
    case "Elementary":
      return "bg-accent text-accent-foreground"
    case "Beginner":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default async function StudentsPage() {
  // Buscar dados reais do banco
  const students = await getAllStudents()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">👥 Gerenciar Alunos</h1>
          <p className="text-muted-foreground">Visualize e gerencie todos os alunos cadastrados</p>
        </div>
        <Link href="/dashboard/students/add">
          <Button className="bg-secondary hover:bg-secondary/90">➕ Adicionar Aluno</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">👥</div>
              <div>
                <div className="text-2xl font-bold text-primary">{students.length}</div>
                <p className="text-sm text-muted-foreground">Total de Alunos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌟</div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {students.filter((s) => s.level === "Advanced").length}
                </div>
                <p className="text-sm text-muted-foreground">Advanced</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">⭐</div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {students.filter((s) => s.level === "Intermediate").length}
                </div>
                <p className="text-sm text-muted-foreground">Intermediate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">✨</div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {students.filter((s) => s.level === "Elementary" || s.level === "Beginner").length}
                </div>
                <p className="text-sm text-muted-foreground">Elementary/Beginner</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">👥 Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">Nome</TableHead>
                <TableHead className="text-center font-bold">Pontos</TableHead>
                <TableHead className="text-center font-bold">Nível</TableHead>
                <TableHead className="text-center font-bold">Data de Ingresso</TableHead>
                <TableHead className="text-center font-bold">Status</TableHead>
                <TableHead className="text-center font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-semibold">{student.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-primary">{student.points}</span>
                      <span className="text-sm text-muted-foreground">pts</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getLevelColor(student.level)}>{student.level}</Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {new Date(student.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={student.is_active ? "default" : "secondary"}>
                      {student.is_active ? "🟢 Ativo" : "🔴 Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <StudentActions student={student} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
