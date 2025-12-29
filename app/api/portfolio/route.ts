import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { createPortfolioSchema, type CreatePortfolioInput } from "@/lib/validators"

/**
 * GET /api/portfolio - list current user's portfolio items
 * POST /api/portfolio - create a portfolio item
 */

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const items = await prisma.portfolio.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ items })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const body = (await req.json()) as CreatePortfolioInput
    const parsed = createPortfolioSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const created = await prisma.portfolio.create({
      data: {
        userId: user.id,
        symbol: parsed.data.symbol.toUpperCase(),
        quantity: parsed.data.quantity,
        avgPrice: parsed.data.avgPrice,
      },
    })
    return NextResponse.json({ item: created }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
