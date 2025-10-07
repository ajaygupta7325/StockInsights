import { NextResponse } from "next/server"

/**
 * GET /api/stocks?symbol=AAPL
 * Fetches real-time/near-real-time price. Uses Alpha Vantage/Finnhub if API key exists, else returns mock.
 *
 * Env options:
 * - ALPHA_VANTAGE_API_KEY
 * - FINNHUB_API_KEY
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const symbol = (searchParams.get("symbol") || "AAPL").toUpperCase()

  try {
    // Try Alpha Vantage
    if (process.env.ALPHA_VANTAGE_API_KEY) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        symbol,
      )}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
      const res = await fetch(url)
      const json = await res.json()
      const quote = json["Global Quote"]
      if (quote) {
        return NextResponse.json({
          provider: "alpha-vantage",
          symbol,
          price: Number(quote["05. price"]),
          change: Number(quote["09. change"]),
          changePercent: Number((quote["10. change percent"] || "0").replace("%", "")),
          raw: quote,
        })
      }
    }

    // Try Finnhub
    if (process.env.FINNHUB_API_KEY) {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${
        process.env.FINNHUB_API_KEY
      }`
      const res = await fetch(url)
      const json = await res.json()
      if (json && typeof json.c === "number") {
        return NextResponse.json({
          provider: "finnhub",
          symbol,
          price: json.c,
          change: json.d,
          changePercent: json.dp,
          raw: json,
        })
      }
    }

    // Fallback mock
    const base = 100 + Math.random() * 100
    const delta = (Math.random() - 0.5) * 2
    return NextResponse.json({
      provider: "mock",
      symbol,
      price: Number((base + delta).toFixed(2)),
      change: Number(delta.toFixed(2)),
      changePercent: Number(((delta / base) * 100).toFixed(2)),
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}
