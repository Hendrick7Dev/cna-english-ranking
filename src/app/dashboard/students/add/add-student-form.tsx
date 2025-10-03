"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { createStudent } from "@/lib/actions"

export function AddStudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner",
    points: "0",
  })
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Nome é obrigatório' })
      return
    }

    startTransition(async () => {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name.trim())
      formDataToSend.append('level', formData.level)
      formDataToSend.append('points', formData.points)

      const result = await createStudent(formDataToSend)
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        // Reset form
        setFormData({
          name: "",
          level: "Beginner",
          points: "0",
        })
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card>
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">👤 Dados do Aluno</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-300 text-green-800' 
                : 'bg-red-100 border border-red-300 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                <span>{message.type === 'success' ? '✅' : '❌'}</span>
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Nome Completo *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome completo do aluno"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="text-lg"
              disabled={isPending}
            />
          </div>

          {/* Level Field */}
          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-semibold">
              Nível de Inglês *
            </Label>
            <Select 
              value={formData.level} 
              onValueChange={(value) => handleInputChange("level", value)}
              disabled={isPending}
            >
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Selecione o nível do aluno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">🌱 Beginner (Iniciante)</SelectItem>
                <SelectItem value="Elementary">✨ Elementary (Básico)</SelectItem>
                <SelectItem value="Intermediate">⭐ Intermediate (Intermediário)</SelectItem>
                <SelectItem value="Advanced">🌟 Advanced (Avançado)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Points Field */}
          <div className="space-y-2">
            <Label htmlFor="points" className="text-sm font-semibold">
              Pontos Iniciais
            </Label>
            <Input
              id="points"
              type="number"
              placeholder="0"
              value={formData.points}
              onChange={(e) => handleInputChange("points", e.target.value)}
              min="0"
              className="text-lg"
              disabled={isPending}
            />
            <p className="text-sm text-muted-foreground">
              Pontos iniciais do aluno (padrão: 0)
            </p>
          </div>

          {/* Info Card */}
          <Card className="bg-muted/30 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-primary">Informações Importantes</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• O aluno começará com os pontos especificados no ranking</li>
                    <li>• O nível pode ser alterado posteriormente</li>
                    <li>• O nome deve ser único no sistema</li>
                    <li>• Todos os campos marcados com * são obrigatórios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 flex-1"
              disabled={!formData.name.trim() || isPending}
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                "✅ Salvar Aluno"
              )}
            </Button>
            <Link href="/dashboard/students" className="flex-1">
              <Button type="button" variant="outline" className="w-full bg-transparent" disabled={isPending}>
                ❌ Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
