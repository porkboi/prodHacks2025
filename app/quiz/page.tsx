import { NavBar } from "@/components/nav-bar"
import { FinancialEducation } from "@/components/financial-education"
import { Quiz } from "@/components/quiz"

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg mb-2">Financial Analysis:</h2>
          <p className="text-sm text-gray-600 max-w-3xl">
            Investing in an early-stage AI startup can be an exciting opportunity, but before making a decision,
            it&apos;s essential to understand key financial concepts that influence the outcome.
          </p>
        </div>
        <FinancialEducation />
        <Quiz />
      </div>
    </main>
  )
}

