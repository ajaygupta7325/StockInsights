import { NextResponse } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Public routes (no auth)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/stocks(.*)",
  "/api/predictions(.*)",
])

export default clerkMiddleware((auth, req) => {
  // Allow public routes through
  if (isPublicRoute(req)) return

  // For protected routes, redirect to sign-in if not authenticated
  const { userId } = auth()
  if (!userId) {
    const url = new URL("/sign-in", req.url)
    // Optional: preserve intended URL to support post-login redirect
    url.searchParams.set("redirect_url", req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Run middleware on all routes except static files and _next
    "/((?!.+\\..+|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
}
