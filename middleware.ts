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

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes through
  if (isPublicRoute(req)) return

  try {
    // For protected routes, redirect to sign-in if not authenticated
    const { userId } = await auth()
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url)
      // Preserve the intended URL for post-login redirect
      const returnUrl = req.url
      signInUrl.searchParams.set("redirect_url", returnUrl)
      return NextResponse.redirect(signInUrl)
    }
    
    // User is authenticated, allow the request to proceed
    return NextResponse.next()
  } catch (error) {
    console.error("Auth error:", error)
    // If there's an error, redirect to sign-in as a fallback
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
})

// Match all paths that should be protected
const protectedPaths = [
  "/portfolio(.*)",
  "/dashboard(.*)",
  "/analysis(.*)",
  "/api/portfolio(.*)",
  "/api/auth(.*)",
]

export const config = {
  matcher: [
    // Only run middleware on explicitly protected paths to avoid
    // intercepting Next.js static assets, _next paths, and public routes.
    "/portfolio(.*)",
    "/dashboard(.*)",
    "/analysis(.*)",
    "/api/portfolio(.*)",
    "/api/auth(.*)",
  ],
}
