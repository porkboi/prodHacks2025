import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-2xl px-4 py-8">
        <div className="grid gap-8">
          {/* Profile Header */}
          <div className="flex gap-8 items-start">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Profile picture"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">Jane Doe</h1>
              <div className="flex gap-4 text-sm text-primary mb-6">
                <span>100 Following</span>
                <span>200 Followers</span>
              </div>

              {/* Statistics */}
              <div className="grid gap-3">
                <Card className="p-3 bg-secondary/20">
                  <span className="flex items-center gap-2">🔥 342 day streak</span>
                </Card>
                <Card className="p-3 bg-secondary/20">
                  <span className="flex items-center gap-2">💰 $290,978 total made</span>
                </Card>
                <Card className="p-3 bg-secondary/20">
                  <span className="flex items-center gap-2">🏆 5984th ranking</span>
                </Card>
              </div>
            </div>
          </div>

          {/* Buffet Bar */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">Buffet Bar 🤑💰</h2>
            <div className="space-y-2">
              <div className="relative">
                <Progress value={64} className="h-8" />
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Profile"
                  width={24}
                  height={24}
                  className="absolute right-0 top-1 rounded-full border-2 border-white"
                />
              </div>
              <p className="text-center text-sm">
                You in the 64 percentile! Truly a Mark Cuban. Keep going to become Warren Buffet 👑
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

