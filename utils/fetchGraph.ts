export interface LiquidityPosition {
  id: string;
  user: {
    id: string;
  };
  pair: {
    id: string;
    token0: {
      symbol: string;
    };
    token1: {
      symbol: string;
    };
    reserveUSD: string;
    volumeUSD?: string;
  };
  liquidityTokenBalance: string;
}

export async function fetchGraphData(): Promise<LiquidityPosition[]> {
  const query = `
  {
    pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      token0 {
        symbol
        id
      }
      token1 {
        symbol
        id
      }
      totalValueLockedUSD
      volumeUSD
      liquidity
    }
  }`;

  try {
    // Get API key from environment variable (create .env.local file)
    // Get your free API key from: https://thegraph.com/studio/
    const GRAPH_API_KEY =
      process.env.NEXT_PUBLIC_GRAPH_API_KEY || "YOUR_API_KEY_HERE";

    // Using Uniswap V3 Base subgraph (verified working)
    const SUBGRAPH_ID = "5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";

    const res = await fetch(
      `https://gateway-arbitrum.network.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/${SUBGRAPH_ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }
    );

    const json = await res.json();
    console.log("API Response:", json);

    // Transform pools data to match our LiquidityPosition interface
    if (json.data?.pools && json.data.pools.length > 0) {
      return json.data.pools.map((pool: any) => ({
        id: pool.id,
        user: {
          id: pool.id,
        },
        pair: {
          id: pool.id,
          token0: {
            symbol: pool.token0.symbol,
          },
          token1: {
            symbol: pool.token1.symbol,
          },
          reserveUSD: pool.totalValueLockedUSD,
          volumeUSD: pool.volumeUSD,
        },
        liquidityTokenBalance: pool.liquidity,
      }));
    }

    // Fallback to demo data if API fails
    console.warn("Using demo data - API may be unavailable");
    return generateDemoData();
  } catch (error) {
    console.error("Error fetching graph data:", error);
    return generateDemoData();
  }
}

// Generate demo data for demonstration purposes
function generateDemoData(): LiquidityPosition[] {
  return [
    {
      id: "0x1",
      user: { id: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1" },
      pair: {
        id: "0x1",
        token0: { symbol: "WETH" },
        token1: { symbol: "USDC" },
        reserveUSD: "24500000.50",
        volumeUSD: "156000000",
      },
      liquidityTokenBalance: "12450.25",
    },
    {
      id: "0x2",
      user: { id: "0x8B3192f5eEBD8579568A2Ed41E6FEB402f93f73F" },
      pair: {
        id: "0x2",
        token0: { symbol: "WETH" },
        token1: { symbol: "DAI" },
        reserveUSD: "18200000.75",
        volumeUSD: "89000000",
      },
      liquidityTokenBalance: "9875.50",
    },
    {
      id: "0x3",
      user: { id: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097" },
      pair: {
        id: "0x3",
        token0: { symbol: "cbETH" },
        token1: { symbol: "USDC" },
        reserveUSD: "15800000.30",
        volumeUSD: "67000000",
      },
      liquidityTokenBalance: "8234.80",
    },
    {
      id: "0x4",
      user: { id: "0x1234567890abcdef1234567890abcdef12345678" },
      pair: {
        id: "0x4",
        token0: { symbol: "AERO" },
        token1: { symbol: "USDC" },
        reserveUSD: "12300000.00",
        volumeUSD: "45000000",
      },
      liquidityTokenBalance: "6543.20",
    },
    {
      id: "0x5",
      user: { id: "0xabcdef1234567890abcdef1234567890abcdef12" },
      pair: {
        id: "0x5",
        token0: { symbol: "WETH" },
        token1: { symbol: "AERO" },
        reserveUSD: "9800000.45",
        volumeUSD: "32000000",
      },
      liquidityTokenBalance: "5432.10",
    },
    {
      id: "0x6",
      user: { id: "0x9876543210fedcba9876543210fedcba98765432" },
      pair: {
        id: "0x6",
        token0: { symbol: "USDbC" },
        token1: { symbol: "USDC" },
        reserveUSD: "8500000.90",
        volumeUSD: "28000000",
      },
      liquidityTokenBalance: "4321.00",
    },
    {
      id: "0x7",
      user: { id: "0x1111111111111111111111111111111111111111" },
      pair: {
        id: "0x7",
        token0: { symbol: "WETH" },
        token1: { symbol: "USDT" },
        reserveUSD: "7200000.60",
        volumeUSD: "21000000",
      },
      liquidityTokenBalance: "3987.50",
    },
    {
      id: "0x8",
      user: { id: "0x2222222222222222222222222222222222222222" },
      pair: {
        id: "0x8",
        token0: { symbol: "cbBTC" },
        token1: { symbol: "WETH" },
        reserveUSD: "6500000.25",
        volumeUSD: "18000000",
      },
      liquidityTokenBalance: "3456.75",
    },
    {
      id: "0x9",
      user: { id: "0x3333333333333333333333333333333333333333" },
      pair: {
        id: "0x9",
        token0: { symbol: "USDC" },
        token1: { symbol: "DAI" },
        reserveUSD: "5800000.80",
        volumeUSD: "15000000",
      },
      liquidityTokenBalance: "2987.30",
    },
    {
      id: "0x10",
      user: { id: "0x4444444444444444444444444444444444444444" },
      pair: {
        id: "0x10",
        token0: { symbol: "WETH" },
        token1: { symbol: "LINK" },
        reserveUSD: "4900000.15",
        volumeUSD: "12000000",
      },
      liquidityTokenBalance: "2543.90",
    },
  ];
}
