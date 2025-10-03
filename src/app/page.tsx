import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getStudentsRanking, getTopPerformersByPunctuality } from "@/db"

function getRankingColor(position: number) {
  if (position === 1) return "bg-yellow-100 border-yellow-300 text-yellow-800"
  if (position === 2) return "bg-gray-100 border-gray-300 text-gray-800"
  if (position === 3) return "bg-orange-100 border-orange-300 text-orange-800"
  return "bg-card border-border text-card-foreground"
}

function getRankingIcon(position: number) {
  if (position === 1) return "🥇"
  if (position === 2) return "🥈"
  if (position === 3) return "🥉"
  return `${position}º`
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

function getBadgeForLevel(level: string) {
  switch (level) {
    case "Advanced":
      return "🌟"
    case "Intermediate":
      return "⭐"
    case "Elementary":
      return "✨"
    case "Beginner":
      return "💫"
    default:
      return "💫"
  }
}

export default async function RankingPage() {
  // Buscar dados reais do banco
  const [studentsRanking, topPerformersList] = await Promise.all([
    getStudentsRanking(),
    getTopPerformersByPunctuality()
  ])
  
  // Calcular estatísticas
  const totalStudents = studentsRanking.length
  const averagePoints = totalStudents > 0 
    ? Math.round(studentsRanking.reduce((acc, student) => acc + student.calculatedPoints, 0) / totalStudents)
    : 0
  const topPerformers = topPerformersList.length

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="hero-gradient rounded-2xl p-8 text-center space-y-6 pulse-glow-effect">
        <div className="float-animation">
          <h1 className="text-5xl font-bold text-foreground text-balance mb-4">
            🏆 <span className="sparkle-effect inline-block">TEEN UP 2 LEAGUE</span> 🏆
          </h1>
        </div>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
        The competition is on! Show your determination, overcome challenges and secure your place on the semester podium.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="sparkle-effect bg-accent/30 px-4 py-2 rounded-full border border-accent/50">
            <span className="text-white font-semibold">🚀 Your journey to mastery 🚀</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center glow-effect border-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl sparkle-effect">👥</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{totalStudents}</div>
            <p className="text-sm text-muted-foreground">Active Students</p>
          </CardContent>
        </Card>

        <Card className="text-center glow-effect border-secondary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl sparkle-effect">⚡</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{averagePoints}</div>
            <p className="text-sm text-muted-foreground">Average Points</p>
          </CardContent>
        </Card>

        <Card className="text-center glow-effect border-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl sparkle-effect">🎯</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{topPerformers}</div>
            <p className="text-sm text-muted-foreground">Top Performers</p>
            {topPerformers > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs text-muted-foreground">⏰ No delays</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {topPerformersList.slice(0, 3).map((student) => (
                    <Badge key={student.id} className="bg-green-500 text-white text-xs px-2 py-1">
                      {student.name}
                    </Badge>
                  ))}
                  {topPerformersList.length > 3 && (
                    <Badge className="bg-accent text-accent-foreground text-xs px-2 py-1">
                      +{topPerformersList.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xl glow-effect border-primary/30">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <span className="sparkle-effect">🏆</span> Student Ranking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-border">
                <TableHead className="text-center font-bold text-foreground">🏅 Position</TableHead>
                <TableHead className="font-bold text-foreground">👤 Name</TableHead>
                <TableHead className="text-center font-bold text-foreground">✨ Points</TableHead>
                <TableHead className="text-center font-bold text-foreground">📚 Level</TableHead>
                <TableHead className="text-center font-bold text-foreground">🎖️ Badge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsRanking.length > 0 ? (
                studentsRanking.map((student, index) => {
                  const position = index + 1
                  const badge = getBadgeForLevel(student.level)
                  return (
                    <TableRow
                      key={student.id}
                      className={`hover:bg-muted/50 transition-all duration-300 border-border ${
                        position <= 3 ? "glow-effect" : ""
                      }`}
                    >
                      <TableCell className="text-center font-bold text-lg">
                        <span className={position <= 3 ? "sparkle-effect text-2xl" : ""}>
                          {getRankingIcon(position)}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-lg text-foreground">{student.name}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg font-bold text-accent">{student.calculatedPoints}</span>
                          <span className="text-sm text-muted-foreground">pts</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getLevelColor(student.level)}>{student.level}</Badge>
                      </TableCell>
                      <TableCell className="text-center text-2xl sparkle-effect">{badge}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="space-y-4">
                      <div className="text-6xl">📚</div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          No students registered yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Start by adding students to the system to see the ranking!
                        </p>
                        <a 
                          href="/dashboard/students/add"
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          ➕ Add First Student
                        </a>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="top3-gradient border-accent/30 shadow-2xl glow-effect">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            <span className="sparkle-effect">🎉</span> Congratulations to our Top 3!{" "}
            <span className="sparkle-effect">🎉</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {studentsRanking.length >= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studentsRanking.slice(0, 3).map((student, index) => (
                <div
                  key={student.id}
                  className={`text-center p-6 bg-card rounded-xl border-2 transition-all duration-300 ${
                    index === 0
                      ? "border-yellow-400/50 glow-effect"
                      : index === 1
                        ? "border-gray-400/50 pulse-glow-effect"
                        : "border-orange-400/50 pulse-glow-effect"
                  }`}
                >
                  <div className={`text-5xl mb-4 ${index === 0 ? "float-animation" : "sparkle-effect"}`}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{student.name}</h3>
                  <p className="text-3xl font-bold text-accent mb-3">{student.calculatedPoints} pts</p>
                  <Badge className={`${getLevelColor(student.level)} text-sm px-3 py-1`}>{student.level}</Badge>
                  {index === 0 && <div className="mt-4 text-yellow-400 sparkle-effect">⭐ Class Champion ⭐</div>}
                </div>
              ))}
            </div>
          ) : studentsRanking.length > 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Top {studentsRanking.length} Students
              </h3>
              <p className="text-muted-foreground">
                Add more students to see the complete Top 3!
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Waiting for the first students
              </h3>
              <p className="text-muted-foreground">
                The Top 3 will be displayed when there are at least 3 students registered
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Footer */}
      <footer className="mt-12 pt-8 border-t border-border/50">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold text-foreground">Teacher Leonardo Hendrick</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Professional English Learning System
          </p>
        </div>
      </footer>
    </div>
  )
}