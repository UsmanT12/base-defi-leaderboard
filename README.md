# Base DeFi Leaderboard 🧱

A live leaderboard displaying top liquidity providers on Base chain.

> **⚠️ Note:** Currently displaying demo data. See [SUBGRAPH_SETUP.md](./SUBGRAPH_SETUP.md) for instructions on connecting to live subgraph data from The Graph Network.

## 🚀 Features

- **Real-time Data**: Designed to fetch live liquidity positions from Base DeFi protocols
- **Top 10 Leaderboard**: Ranked by liquidity token balance
- **Summary Stats**: Total liquidity, top trading pair, and unique providers
- **BaseScan Integration**: Click-through links to view wallets on BaseScan
- **Dark Mode UI**: Modern, responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: The Graph (configurable for any Base protocol)
- **Blockchain**: Base (Ethereum L2)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

This project is designed to work with subgraphs from Base DeFi protocols via [The Graph](https://thegraph.com).

**Current Status:** Using demo data for demonstration purposes.

**To connect to live data:**

1. Get an API key from [The Graph Studio](https://thegraph.com/studio/)
2. See [SUBGRAPH_SETUP.md](./SUBGRAPH_SETUP.md) for detailed setup instructions
3. Update the endpoint in `utils/fetchGraph.ts`

Supported protocols: Aerodrome, Uniswap V3, BaseSwap, and any other Base protocol with a subgraph.

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

To switch to a different protocol or connect to live data:

1. **Get Graph API Key**: Sign up at [thegraph.com/studio](https://thegraph.com/studio/)
2. **Update Endpoint**: Edit `utils/fetchGraph.ts` with your API key and subgraph ID
3. **Adjust Query**: Modify the GraphQL query to match your subgraph schema
4. **Update Types**: Adjust TypeScript interfaces if the data structure differs

See [SUBGRAPH_SETUP.md](./SUBGRAPH_SETUP.md) for detailed instructions.

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.
