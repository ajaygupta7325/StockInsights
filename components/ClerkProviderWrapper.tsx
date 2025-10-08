"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { Suspense } from "react"

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ClerkProvider>
  )
}