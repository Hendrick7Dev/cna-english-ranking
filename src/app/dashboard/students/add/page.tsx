import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AddStudentForm } from "./add-student-form"

export default function AddStudentPage() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">➕ Adicionar Novo Aluno</h1>
          <p className="text-muted-foreground">Cadastre um novo aluno no sistema de ranking</p>
        </div>
        <Link href="/dashboard/students">
          <Button variant="outline">← Voltar para Lista</Button>
        </Link>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <AddStudentForm />
      </div>
    </div>
  )
}
