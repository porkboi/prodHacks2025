import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-4xl px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to WealthQuest</h1>
          <p className="text-xl text-muted-foreground">
            Learn about investing through interactive quizzes and real-time stock analysis
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/quiz">Start Learning</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/analysis">Analyze Stocks</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

