import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

/**
 * GET /api/predictions?symbol=AAPL
 * Returns mock predictions (or latest saved one if present).
 * POST /api/predictions - Create a mock prediction entry (admin/demo).
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const symbol = (searchParams.get("symbol") || "AAPL").toUpperCase()

  // Check DB for latest stored prediction
  const latest = await prisma.prediction.findFirst({
    where: { symbol },
    orderBy: { createdAt: "desc" },
  })
  if (latest) return NextResponse.json({ symbol, predictedPrice: latest.predictedPrice, confidence: latest.confidence })

  // Otherwise generate a mock prediction
  const price = 150 + Math.random() * 100
  const variance = (Math.random() - 0.5) * 10
  const predicted = Number((price + variance).toFixed(2))
  const confidence = Number((70 + Math.random() * 25).toFixed(2))
  return NextResponse.json({ symbol, predictedPrice: predicted, confidence })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { symbol: string; predictedPrice: number; confidence: number }
    if (!body?.symbol || typeof body.predictedPrice !== "number" || typeof body.confidence !== "number") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 })
    }

    const created = await prisma.prediction.create({
      data: {
        symbol: body.symbol.toUpperCase(),
        predictedPrice: body.predictedPrice,
        confidence: body.confidence,
      },
    })

    return NextResponse.json({ prediction: created }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
