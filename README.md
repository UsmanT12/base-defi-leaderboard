# Base DeFi Leaderboard 🧱

A live leaderboard displaying top liquidity pools from Aerodrome Finance on Base chain.

> **✅ Live Data:** Connected to Aerodrome Finance, the leading DEX on Base. Add your Graph API key to `.env.local` to fetch real-time data.

## 🚀 Features

- **Real-time Data**: Fetches live liquidity pool data from Aerodrome Finance on Base
- **Top 10 Pools**: Ranked by Total Value Locked (TVL) in USD
- **Summary Stats**: Total liquidity, top trading pair, and unique pool count
- **BaseScan Integration**: Click-through links to view pool contracts on BaseScan
- **Dark Mode UI**: Modern, responsive design with Tailwind CSS
- **Aerodrome Finance**: Connected to the #1 DEX on Base by TVL

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: The Graph Network (Aerodrome Finance subgraph)
- **DEX**: Aerodrome Finance (Leading DEX on Base)
- **Blockchain**: Base (Ethereum L2)

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file and add your Graph API key
cp .env.example .env.local
# Edit .env.local and add: NEXT_PUBLIC_GRAPH_API_KEY=your_api_key_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Get your free API key:** [The Graph Studio](https://thegraph.com/studio/)

## 🏗️ Project Structure

```
base-defi-leaderboard/
├── pages/
│   ├── _app.tsx           # App wrapper
│   └── index.tsx          # Main leaderboard page
├── utils/
│   └── fetchGraph.ts      # GraphQL query utility
├── styles/
│   └── globals.css        # Global styles + Tailwind
└── package.json
```

## 🔗 Data Source

This project fetches real-time data from **Aerodrome Finance** via [The Graph Network](https://thegraph.com).

**Current Configuration:**

- **Protocol**: Aerodrome Finance (Base's #1 DEX by TVL)
- **Subgraph ID**: `GENunSHWLBXm59mBSgPzQ8metBEp9YDfdqwFr91Av1UM`
- **Endpoint**: `https://gateway.thegraph.com/api/subgraphs/id/`
- **Top Pools**: WETH/USDC ($83M+), WETH/cbBTC ($53M+), USDC/cbBTC ($31M+)

**Setup Instructions:**

1. Get a free API key from [The Graph Studio](https://thegraph.com/studio/)
2. Create `.env.local` in the project root:
   ```bash
   NEXT_PUBLIC_GRAPH_API_KEY=your_api_key_here
   ```
3. Restart the dev server - live data will load automatically!

**Want to use a different protocol?** Update the `SUBGRAPH_ID` in `utils/fetchGraph.ts`. Compatible with any Base DEX that has a Graph subgraph (Uniswap V3, BaseSwap, etc.).

## 📊 GraphQL Query Example

```graphql
{
  pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
    id
    token0 {
      symbol
    }
    token1 {
      symbol
    }
    totalValueLockedUSD
    liquidity
  }
}
```

## 🎨 Customization

### Switch to a Different DEX

To use Uniswap V3, BaseSwap, or another protocol:

1. Find the subgraph on [The Graph Explorer](https://thegraph.com/explorer)
2. Copy the Subgraph ID
3. Update `SUBGRAPH_ID` in `utils/fetchGraph.ts`
4. Verify the GraphQL schema matches (most DEXs use similar structures)

### Example: Switch to Uniswap V3

```typescript
// In utils/fetchGraph.ts
const SUBGRAPH_ID = "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV"; // Uniswap V3 Base
```

No other code changes needed - the query structure is compatible!

## � About Aerodrome Finance

[Aerodrome Finance](https://aerodrome.finance) is the leading decentralized exchange (DEX) on Base, featuring:

- **$168M+ Total Value Locked** (highest on Base)
- **57.7M+ queries** on The Graph in the past 30 days
- **Concentrated Liquidity Pools** with efficient capital utilization
- **Native to Base**: Built specifically for the Base ecosystem

## �📝 License

MIT

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.
