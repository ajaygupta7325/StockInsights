import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "StockInsights",
  description: "Stock analysis and portfolio management",
  generator: "v0.app",
}

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // If Clerk key missing, show a helpful message (no crash)
  if (!clerkPublishableKey) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <div className="min-h-svh flex items-center justify-center p-6">
            <div className="max-w-xl space-y-4 text-center">
              <h1 className="text-2xl font-semibold">Clerk is not configured</h1>
              <p className="text-muted-foreground">
                Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY. Set your Clerk API keys in your environment.
              </p>
              <ul className="text-left list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
                <li>CLERK_SECRET_KEY</li>
              </ul>
              <p className="text-sm text-muted-foreground">After setting the variables, refresh this page.</p>
            </div>
          </div>
          <Analytics />
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ClerkProvider publishableKey={clerkPublishableKey}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  )
}
