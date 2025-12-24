'use client'

import { useEffect, useState } from 'react'
import { AuthSync } from '@/components/auth-sync'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // Check if we have a user token in localStorage
    const token = localStorage.getItem('__clerk_db_jwt')
    setIsAuth(!!token)
  }, [])

  if (!isAuth) {
    return <AuthSync />
  }

  return <>{children}</>
}