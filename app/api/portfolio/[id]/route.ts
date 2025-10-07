import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { updatePortfolioSchema, type UpdatePortfolioInput } from "@/lib/validators"

/**
 * GET /api/portfolio/:id - get item
 * PUT /api/portfolio/:id - update item
 * DELETE /api/portfolio/:id - delete item
 */

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const appUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!appUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const item = await prisma.portfolio.findFirst({ where: { id: params.id, userId: appUser.id } })
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({ item })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const appUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!appUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const body = (await req.json()) as UpdatePortfolioInput
    const parsed = updatePortfolioSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const existing = await prisma.portfolio.findFirst({ where: { id: params.id, userId: appUser.id } })
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const updated = await prisma.portfolio.update({
      where: { id: params.id },
      data: parsed.data,
    })
    return NextResponse.json({ item: updated })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const appUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!appUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

    // Ensure ownership
    const existing = await prisma.portfolio.findFirst({ where: { id: params.id, userId: appUser.id } })
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

    await prisma.portfolio.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
