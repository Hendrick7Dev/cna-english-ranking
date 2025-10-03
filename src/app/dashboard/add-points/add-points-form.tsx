"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { addPoints } from "@/lib/actions"
import type { Student, PointActivity } from "@/db/types"

interface AddPointsFormProps {
  students: Student[]
  activities: PointActivity[]
}

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

export function AddPointsForm({ students, activities }: AddPointsFormProps) {
  const [formData, setFormData] = useState({
    student_id: "",
    activity_id: "",
    points_awarded: "",
    notes: "",
  })
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const selectedStudent = students.find((s) => s.id.toString() === formData.student_id)
  const selectedActivity = activities.find((a) => a.id.toString() === formData.activity_id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!selectedStudent || !selectedActivity) {
      setMessage({ type: 'error', text: 'Por favor, selecione um aluno e uma atividade' })
      return
    }

    const pointsToAdd = formData.points_awarded ? parseInt(formData.points_awarded) : selectedActivity.point_value

    if (pointsToAdd <= 0) {
      setMessage({ type: 'error', text: 'Pontos devem ser maiores que zero' })
      return
    }

    startTransition(async () => {
      const formDataToSend = new FormData()
      formDataToSend.append('student_id', formData.student_id)
      formDataToSend.append('activity_id', formData.activity_id)
      formDataToSend.append('points_awarded', pointsToAdd.toString())
      formDataToSend.append('notes', formData.notes)

      const result = await addPoints(formDataToSend)
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        // Reset form
        setFormData({
          student_id: "",
          activity_id: "",
          points_awarded: "",
          notes: "",
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
      <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">🎯 Adicionar Pontos</CardTitle>
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

          {/* Student Selection */}
          <div className="space-y-2">
            <Label htmlFor="student" className="text-sm font-semibold">
              Selecionar Aluno *
            </Label>
            <Select 
              value={formData.student_id} 
              onValueChange={(value) => handleInputChange("student_id", value)}
              disabled={isPending}
            >
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Escolha um aluno" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span>{student.name}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge className={getLevelColor(student.level)} variant="secondary">
                          {student.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{student.points} pts</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Activity Selection */}
          <div className="space-y-2">
            <Label htmlFor="activity" className="text-sm font-semibold">
              Tipo de Atividade *
            </Label>
            <Select 
              value={formData.activity_id} 
              onValueChange={(value) => handleInputChange("activity_id", value)}
              disabled={isPending}
            >
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Escolha uma atividade" />
              </SelectTrigger>
              <SelectContent>
                {activities.map((activity) => (
                  <SelectItem key={activity.id} value={activity.id.toString()}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📚</span>
                      <span>{activity.description}</span>
                      <Badge variant="outline" className="ml-auto">
                        +{activity.point_value} pts
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Points */}
          <div className="space-y-2">
            <Label htmlFor="points_awarded" className="text-sm font-semibold">
              Pontos Personalizados (Opcional)
            </Label>
            <Input
              id="points_awarded"
              type="number"
              placeholder={selectedActivity ? `Padrão: ${selectedActivity.point_value} pontos` : "Digite os pontos"}
              value={formData.points_awarded}
              onChange={(e) => handleInputChange("points_awarded", e.target.value)}
              min="1"
              max="100"
              className="text-lg"
              disabled={isPending}
            />
            <p className="text-sm text-muted-foreground">
              Deixe em branco para usar a pontuação padrão da atividade
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold">
              Observações (Opcional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre o desempenho do aluno..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
              disabled={isPending}
            />
          </div>

          {/* Preview */}
          {selectedStudent && selectedActivity && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2">📋 Resumo da Pontuação</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Aluno:</span>
                    <span className="font-semibold">{selectedStudent.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atividade:</span>
                    <span className="font-semibold">
                      📚 {selectedActivity.description}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pontos atuais:</span>
                    <span className="font-semibold">{selectedStudent.points} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pontos a adicionar:</span>
                    <span className="font-semibold text-secondary">
                      +{formData.points_awarded || selectedActivity.point_value} pts
                    </span>
                  </div>
                  <hr className="border-primary/20" />
                  <div className="flex justify-between text-lg">
                    <span>Nova pontuação:</span>
                    <span className="font-bold text-primary">
                      {selectedStudent.points +
                        (parseInt(formData.points_awarded) || selectedActivity.point_value)}{" "}
                      pts
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6"
            disabled={!formData.student_id || !formData.activity_id || isPending}
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adicionando...
              </>
            ) : (
              "✅ Adicionar Pontos"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
