"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { GameEvent } from "@/components/game/event"
import { Portfolio } from "@/components/game/portfolio"
import { ChatbotModal } from "@/components/game/chatbot-modal"
import { LeaderBoard } from "@/components/game/leaderboard"
import { WorldMap } from "@/components/game/world-map"
import { Button } from "@/components/ui/button"
import { MessageCircle, Globe } from "lucide-react"
import { globalEvents, initialPlayers, type Player } from "@/lib/game-data"
import { localScenarios } from "@/lib/local-scenarios"
import { motion, AnimatePresence } from "framer-motion"

type InvestmentChoice = "long" | "short" | "tbill"

interface Investment {
  country: string
  stockId: string
  action: "long" | "short" | "treasury"
  amount: number
}

export default function PlayPage() {
  const [currentEvent, setCurrentEvent] = useState(0)
  const [showEvent, setShowEvent] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isWorldMapOpen, setIsWorldMapOpen] = useState(false)
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [gameOver, setGameOver] = useState(false)
  const [userInvestments, setUserInvestments] = useState<Investment[]>([])

  const handleInvestmentChoice = (choice: InvestmentChoice) => {
    const event = globalEvents[currentEvent]
    const updatedPlayers = players.map((player) => {
      if (player.id === "user") {
        return applyInvestmentChoice(player, choice, event)
      } else {
        // AI players make random choices
        const aiChoice = ["long", "short", "tbill"][Math.floor(Math.random() * 3)] as InvestmentChoice
        return applyInvestmentChoice(player, aiChoice, event)
      }
    })

    setPlayers(updatedPlayers)
    setShowEvent(false)

    // Progress to next event after a delay
    setTimeout(() => {
      if (currentEvent < globalEvents.length - 1) {
        setCurrentEvent((prev) => prev + 1)
        setShowEvent(true)
        updateInvestments()
      } else {
        setGameOver(true)
      }
    }, 1000)
  }

  const applyInvestmentChoice = (player: Player, choice: InvestmentChoice, event: (typeof globalEvents)[0]): Player => {
    const updatedPortfolio = { ...player.portfolio }
    const investmentAmount = updatedPortfolio.cash

    switch (choice) {
      case "long":
        updatedPortfolio.stocks += investmentAmount * (1 + event.longImpact / 100)
        updatedPortfolio.cash = 0
        break
      case "short":
        updatedPortfolio.stocks += investmentAmount * (1 + event.shortImpact / 100)
        updatedPortfolio.cash = 0
        break
      case "tbill":
        updatedPortfolio.fixedDeposits += investmentAmount * 1.05 // 5% safe return
        updatedPortfolio.cash = 0
        break
    }

    return {
      ...player,
      portfolio: updatedPortfolio,
    }
  }

  const handleCountryInvestment = (country: string, stockId: string, action: "long" | "short" | "treasury") => {
    const userPlayer = players.find((p) => p.id === "user")!
    const investmentAmount = userPlayer.portfolio.cash * 0.1 // Invest 10% of cash

    if (investmentAmount > 0) {
      setUserInvestments((prev) => [...prev, { country, stockId, action, amount: investmentAmount }])

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === "user"
            ? { ...player, portfolio: { ...player.portfolio, cash: player.portfolio.cash - investmentAmount } }
            : player,
        ),
      )
    }
  }

  const updateInvestments = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === "user") {
          const updatedPortfolio = { ...player.portfolio }

          userInvestments.forEach((investment) => {
            const scenario = localScenarios.find((s) => s.country === investment.country)!
            if (investment.action === "treasury") {
              updatedPortfolio.fixedDeposits += investment.amount * (1 + scenario.treasuryYield)
            } else {
              const stock = scenario.stocks.find((s) => s.id === investment.stockId)!
              const performance = stock.yearlyPerformance[currentEvent]
              const impact = investment.action === "long" ? 1 + performance : 1 - performance
              updatedPortfolio.stocks += investment.amount * impact
            }
          })

          return { ...player, portfolio: updatedPortfolio }
        }
        return player
      }),
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      <div className="container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Investment Simulator</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsWorldMapOpen(true)} className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                World Map
              </Button>
              <Button variant="outline" onClick={() => setIsChatOpen(true)} className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Ask Advisor
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Portfolio
                portfolio={players.find((p) => p.id === "user")!.portfolio}
                currentEvent={currentEvent}
                investments={userInvestments}
              />
              <LeaderBoard players={players} />
            </div>

            <AnimatePresence>
              {showEvent && !gameOver && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GameEvent event={globalEvents[currentEvent]} onChoice={handleInvestmentChoice} />
                </motion.div>
              )}
              {gameOver && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GameOver players={players} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ChatbotModal open={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <AnimatePresence>
        {isWorldMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-card p-6 rounded-lg shadow-lg max-w-3xl w-full"
            >
              <WorldMap
                onInvest={handleCountryInvestment}
                currentYear={currentEvent}
                onClose={() => setIsWorldMapOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function GameOver({ players }: { players: Player[] }) {
  const sortedPlayers = [...players].sort(
    (a, b) =>
      Object.values(b.portfolio).reduce((sum, val) => sum + val, 0) -
      Object.values(a.portfolio).reduce((sum, val) => sum + val, 0),
  )

  const userRank = sortedPlayers.findIndex((p) => p.id === "user") + 1

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
      <p className="text-lg mb-4">
        You finished in {userRank}
        {getOrdinalSuffix(userRank)} place.
      </p>
      <LeaderBoard players={sortedPlayers} />
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Play Again
      </Button>
    </div>
  )
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

