export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏆</div>
            <h1 className="text-2xl font-bold">Teen UP 2</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-accent transition-colors font-medium">
              🏆 Ranking
            </a>
            <a href="/login" className="hover:text-accent transition-colors font-medium">
              🔐 Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
