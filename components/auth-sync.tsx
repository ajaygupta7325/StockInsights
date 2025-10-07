"use client"

import { useEffect } from "react"

/**
 * Client helper to call /api/auth once after sign-in to ensure the user exists in Prisma.
 * Place in protected pages if desired.
 */
export function AuthSync() {
  useEffect(() => {
    fetch("/api/auth", { method: "POST" }).catch(() => {})
  }, [])
  return null
}
