import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { requireAuth, logout } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificar autenticação antes de renderizar
  await requireAuth()
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border shadow-lg">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-2xl">⚙️</div>
              <h2 className="text-xl font-bold text-primary">Dashboard</h2>
            </div>

            <nav className="space-y-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-3 text-left">
                  📊 Visão Geral
                </Button>
              </Link>

              <Link href="/dashboard/students">
                <Button variant="ghost" className="w-full justify-start gap-3 text-left">
                  👥 Gerenciar Alunos
                </Button>
              </Link>

              <Link href="/dashboard/add-points">
                <Button variant="ghost" className="w-full justify-start gap-3 text-left">
                  ⭐ Adicionar Pontos
                </Button>
              </Link>

              <div className="pt-4 border-t border-border space-y-2">
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                    🏆 Ver Ranking
                  </Button>
                </Link>
                <form action={logout}>
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="w-full justify-start gap-3 bg-transparent text-destructive hover:bg-destructive/10"
                  >
                    🚪 Sair
                  </Button>
                </form>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
