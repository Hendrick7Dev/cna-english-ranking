import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "CNA English Ranking",
  description: "Sistema de ranking gamificado para alunos do CNA English",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <header className="bg-primary text-primary-foreground shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold">🏆</div>
                  <h1 className="text-2xl font-bold">CNA English Ranking</h1>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/" className="hover:text-accent transition-colors">
                    🏆 Ranking
                  </a>
                  <a href="/login" className="hover:text-accent transition-colors">
                    🔐 Admin
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="min-h-screen bg-background">{children}</main>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
