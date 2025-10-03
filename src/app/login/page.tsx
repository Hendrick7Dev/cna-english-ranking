'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '@/lib/auth'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!password.trim()) {
      setMessage({ type: 'error', text: 'Digite a senha' })
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.append('password', password)
      
      const result = await loginAction(formData)
      
      if (result && !result.success) {
        setMessage({ type: 'error', text: result.message || 'Erro no login' })
      }
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-foreground">Acesso ao Dashboard</h1>
          <p className="text-muted-foreground">Digite a senha para acessar o painel administrativo</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">🔑 Login</CardTitle>
          </CardHeader>
          <CardContent>
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Senha de Administrador
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-lg"
                  disabled={isPending}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                disabled={!password.trim() || isPending}
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  "🚀 Acessar Dashboard"
                )}
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-xl">💡</div>
                <div>
                  <h4 className="font-semibold text-foreground">Informação</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Esta área é restrita apenas para administradores. 
                    Alunos podem acessar apenas o ranking público.
                  </p>
                </div>
              </div>
            </div>

            {/* Link to Public Ranking */}
            <div className="mt-4 text-center">
              <a 
                href="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Voltar ao Ranking Público
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
