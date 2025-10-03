"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { deleteStudent } from "@/lib/actions"
import type { Student } from "@/db/types"

interface StudentActionsProps {
  student: Student
}

export function StudentActions({ student }: StudentActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    startTransition(async () => {
      const result = await deleteStudent(student.id)
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        setShowConfirm(false)
        // Auto-hide success message after 3 seconds
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: result.message })
        setShowConfirm(false)
        // Auto-hide error message after 5 seconds
        setTimeout(() => setMessage(null), 5000)
      }
    })
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  return (
    <div className="space-y-2">
      {/* Message Display */}
      {message && (
        <div className={`p-2 rounded text-xs ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-300 text-green-800' 
            : 'bg-red-100 border border-red-300 text-red-800'
        }`}>
          <div className="flex items-center gap-1">
            <span>{message.type === 'success' ? '✅' : '❌'}</span>
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-primary hover:bg-primary/10 bg-transparent"
          disabled={isPending}
        >
          ✏️ Editar
        </Button>
        
        {showConfirm ? (
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10 bg-transparent"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-destructive"></div>
              ) : (
                "✅ Confirmar"
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:bg-muted/10 bg-transparent"
              onClick={handleCancel}
              disabled={isPending}
            >
              ❌ Cancelar
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10 bg-transparent"
            onClick={handleDelete}
            disabled={isPending}
          >
            🗑️ Excluir
          </Button>
        )}
      </div>
    </div>
  )
}
