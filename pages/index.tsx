import { useEffect, useState } from "react";
import { fetchGraphData, LiquidityPosition } from "../utils/fetchGraph";

export default function Home() {
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchGraphData();
      setPositions(data);
      setLoading(false);
    })();
  }, []);

  // Calculate summary stats
  const totalLiquidity = positions.reduce(
    (sum, pos) => sum + parseFloat(pos.pair.reserveUSD || "0"),
    0
  );

  const uniqueProviders = new Set(positions.map((p) => p.user.id)).size;

  const pairCounts = positions.reduce((acc, pos) => {
    const pairName = `${pos.pair.token0.symbol}/${pos.pair.token1.symbol}`;
    acc[pairName] = (acc[pairName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topPair =
    Object.entries(pairCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Base DeFi Leaderboard
        </h1>

        {/* Info Banner - Only show if using demo data */}
        {positions.length > 0 && positions[0].id === "0x1" && (
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-300 text-sm">
              📊 <strong>Demo Mode:</strong> Displaying sample liquidity data
              from Base DeFi protocols. Add your API key to{" "}
              <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code>{" "}
              to connect to live data.
            </p>
          </div>
        )}

        {/* Success Banner - Show when using live data */}
        {positions.length > 0 && positions[0].id !== "0x1" && (
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-6">
            <p className="text-green-300 text-sm">
              ✅ <strong>Live Data:</strong> Connected to Uniswap V3 on Base via
              The Graph Network
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading leaderboard data…</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-gray-700 transition">
                <div className="text-gray-400 text-sm mb-1">
                  Total Liquidity
                </div>
                <div className="text-2xl font-bold text-green-400">
                  ${(totalLiquidity / 1_000_000).toFixed(2)}M
                </div>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-gray-700 transition">
                <div className="text-gray-400 text-sm mb-1">Top Pair</div>
                <div className="text-2xl font-bold text-blue-400">
                  {topPair}
                </div>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-gray-700 transition">
                <div className="text-gray-400 text-sm mb-1">
                  Unique Providers
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  {uniqueProviders}
                </div>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-800/50">
                      <th className="py-4 px-6 text-gray-400 text-sm font-semibold">
                        Rank
                      </th>
                      <th className="py-4 px-6 text-gray-400 text-sm font-semibold">
                        User Address
                      </th>
                      <th className="py-4 px-6 text-gray-400 text-sm font-semibold">
                        Pool
                      </th>
                      <th className="py-4 px-6 text-gray-400 text-sm font-semibold text-right">
                        Liquidity Tokens
                      </th>
                      <th className="py-4 px-6 text-gray-400 text-sm font-semibold text-right">
                        Reserve (USD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos, i) => (
                      <tr
                        key={pos.id}
                        className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                      >
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-sm font-semibold">
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <a
                            href={`https://basescan.org/address/${pos.user.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 hover:underline font-mono text-sm"
                          >
                            {pos.user.id.slice(0, 6)}…{pos.user.id.slice(-4)}
                          </a>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm font-medium">
                            {pos.pair.token0.symbol}/{pos.pair.token1.symbol}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-mono">
                          {parseFloat(pos.liquidityTokenBalance).toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-right font-semibold text-green-400">
                          $
                          {parseFloat(pos.pair.reserveUSD).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                Sample data from Base DeFi protocols •{" "}
                <a
                  href="https://thegraph.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Powered by The Graph
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
