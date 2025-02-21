export interface GameEvent {
  id: number
  title: string
  description: string
  year: number
  longImpact: number // Percentage impact on portfolio if going long
  shortImpact: number // Percentage impact on portfolio if going short
  stockSymbol: string
  relatedCompany: string
}

export const globalEvents: GameEvent[] = [
  {
    id: 1,
    title: "Global Pandemic",
    description:
      "A new virus strain causes worldwide lockdowns. Healthcare and tech companies surge while travel industry suffers.",
    year: 2020,
    longImpact: 45, // Tech stocks soared
    shortImpact: -30,
    stockSymbol: "ZOOM",
    relatedCompany: "Zoom Video Communications",
  },
  {
    id: 2,
    title: "Green Energy Revolution",
    description:
      "Major nations announce aggressive carbon reduction targets. Renewable energy stocks surge while oil companies decline.",
    year: 2021,
    longImpact: 60,
    shortImpact: -25,
    stockSymbol: "TSLA",
    relatedCompany: "Tesla Inc.",
  },
  {
    id: 3,
    title: "Cryptocurrency Crash",
    description: "Major cryptocurrency exchange collapse leads to market-wide panic in digital assets.",
    year: 2022,
    longImpact: -70,
    shortImpact: 80,
    stockSymbol: "COIN",
    relatedCompany: "Coinbase",
  },
  {
    id: 4,
    title: "AI Breakthrough",
    description: "Revolutionary AI model demonstrates human-level reasoning, causing tech stocks to soar.",
    year: 2023,
    longImpact: 90,
    shortImpact: -40,
    stockSymbol: "NVDA",
    relatedCompany: "NVIDIA",
  },
  {
    id: 5,
    title: "Trade War Escalation",
    description: "Major economies impose new tariffs, disrupting global supply chains.",
    year: 2024,
    longImpact: -20,
    shortImpact: 30,
    stockSymbol: "FDX",
    relatedCompany: "FedEx",
  },
  {
    id: 6,
    title: "Space Tourism Takes Off",
    description: "First successful commercial space flight leads to surge in space-related stocks.",
    year: 2025,
    longImpact: 55,
    shortImpact: -35,
    stockSymbol: "SPCE",
    relatedCompany: "Virgin Galactic",
  },
  {
    id: 7,
    title: "Quantum Computing Milestone",
    description: "First practical quantum computer demonstrated, revolutionizing cryptography and computing.",
    year: 2026,
    longImpact: 75,
    shortImpact: -45,
    stockSymbol: "IBM",
    relatedCompany: "IBM",
  },
  {
    id: 8,
    title: "Global Water Crisis",
    description: "Severe drought affects major agricultural regions, impacting food and water stocks.",
    year: 2027,
    longImpact: 40,
    shortImpact: -30,
    stockSymbol: "AWK",
    relatedCompany: "American Water Works",
  },
  {
    id: 9,
    title: "Fusion Energy Success",
    description: "First sustainable fusion reactor achieved, promising unlimited clean energy.",
    year: 2028,
    longImpact: 100,
    shortImpact: -60,
    stockSymbol: "NEE",
    relatedCompany: "NextEra Energy",
  },
  {
    id: 10,
    title: "Mars Colony Established",
    description: "First permanent human settlement on Mars leads to space industry boom.",
    year: 2029,
    longImpact: 120,
    shortImpact: -50,
    stockSymbol: "SPCE",
    relatedCompany: "Virgin Galactic",
  },
]

export interface Player {
  id: string
  name: string
  portfolio: {
    cash: number
    stocks: number
    property: number
    fixedDeposits: number
  }
}

export const initialPlayers: Player[] = [
  {
    id: "user",
    name: "You",
    portfolio: { cash: 100000, stocks: 0, property: 0, fixedDeposits: 0 },
  },
  {
    id: "ai1",
    name: "AI Player 1",
    portfolio: { cash: 100000, stocks: 0, property: 0, fixedDeposits: 0 },
  },
  {
    id: "ai2",
    name: "AI Player 2",
    portfolio: { cash: 100000, stocks: 0, property: 0, fixedDeposits: 0 },
  },
  {
    id: "ai3",
    name: "AI Player 3",
    portfolio: { cash: 100000, stocks: 0, property: 0, fixedDeposits: 0 },
  },
]

