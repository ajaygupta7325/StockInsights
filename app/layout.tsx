import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ClerkProviderWrapper } from "@/components/ClerkProviderWrapper"

export const metadata: Metadata = {
  title: "StockInsights",
  description: "Stock analysis and portfolio management",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
        <Analytics />
      </body>
    </html>
  )
}
