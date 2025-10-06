"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  ChevronDown,
  ChevronsUpDown,
  Clock,
  DollarSign,
  LineChart,
  PieChart,
  Plus,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioPerformance } from "@/components/portfolio-performance"
import { PortfolioAllocation } from "@/components/portfolio-allocation"

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">StockInsight</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/stocks" className="transition-colors hover:text-foreground/80">
                Stocks
              </Link>
              <Link href="/analysis" className="transition-colors hover:text-foreground/80">
                Analysis
              </Link>
              <Link href="/portfolio" className="text-primary transition-colors hover:text-primary/80">
                Portfolio
              </Link>
              <Link href="/predictions" className="transition-colors hover:text-foreground/80">
                Predictions
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  className="pl-8 md:w-[300px] lg:w-[400px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button className="h-8">Profile</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Clock className="h-4 w-4" />
              Last updated: 5 mins ago
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$124,568.00</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-green-500">+12.5% YTD</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Change</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+$1,245.32</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-green-500">+1.01% today</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+$24,568.00</div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-xs text-green-500">+24.6% all time</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,432.00</div>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">12.4% of portfolio</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Portfolio Overview
            </TabsTrigger>
            <TabsTrigger value="allocation" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Asset Allocation
            </TabsTrigger>
            <TabsTrigger value="holdings" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Holdings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-5">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your portfolio performance over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PortfolioPerformance />
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                  <CardDescription>Your best performing stocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">AAPL</p>
                        <p className="text-xs text-muted-foreground">Apple Inc.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-green-500">+24.5%</p>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">MSFT</p>
                        <p className="text-xs text-muted-foreground">Microsoft Corporation</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-green-500">+18.2%</p>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">NVDA</p>
                        <p className="text-xs text-muted-foreground">NVIDIA Corporation</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-green-500">+45.7%</p>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">AMZN</p>
                        <p className="text-xs text-muted-foreground">Amazon.com, Inc.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-green-500">+12.3%</p>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">GOOGL</p>
                        <p className="text-xs text-muted-foreground">Alphabet Inc.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-red-500">-2.1%</p>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Investment
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="allocation" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Breakdown of your portfolio by asset class</CardDescription>
                </CardHeader>
                <CardContent>
                  <PortfolioAllocation />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Allocation Details</CardTitle>
                  <CardDescription>Detailed breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Technology</p>
                      </div>
                      <p className="text-sm">45.2%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Healthcare</p>
                      </div>
                      <p className="text-sm">15.8%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Financials</p>
                      </div>
                      <p className="text-sm">12.4%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Consumer Discretionary</p>
                      </div>
                      <p className="text-sm">8.7%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Cash</p>
                      </div>
                      <p className="text-sm">12.4%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Other</p>
                      </div>
                      <p className="text-sm">5.5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="holdings" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Holdings</CardTitle>
                  <CardDescription>All stocks in your portfolio</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ChevronsUpDown className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
                    <div>Symbol</div>
                    <div>Shares</div>
                    <div>Avg. Cost</div>
                    <div>Current Price</div>
                    <div>Total Return</div>
                  </div>
                  <div className="grid grid-cols-5 border-b px-4 py-3">
                    <div className="font-medium">AAPL</div>
                    <div>50</div>
                    <div>$150.25</div>
                    <div>$198.45</div>
                    <div className="text-green-500">+32.1%</div>
                  </div>
                  <div className="grid grid-cols-5 border-b px-4 py-3">
                    <div className="font-medium">MSFT</div>
                    <div>30</div>
                    <div>$280.50</div>
                    <div>$340.25</div>
                    <div className="text-green-500">+21.3%</div>
                  </div>
                  <div className="grid grid-cols-5 border-b px-4 py-3">
                    <div className="font-medium">NVDA</div>
                    <div>20</div>
                    <div>$450.75</div>
                    <div>$820.30</div>
                    <div className="text-green-500">+82.0%</div>
                  </div>
                  <div className="grid grid-cols-5 border-b px-4 py-3">
                    <div className="font-medium">AMZN</div>
                    <div>15</div>
                    <div>$130.20</div>
                    <div>$145.30</div>
                    <div className="text-green-500">+11.6%</div>
                  </div>
                  <div className="grid grid-cols-5 border-b px-4 py-3">
                    <div className="font-medium">GOOGL</div>
                    <div>25</div>
                    <div>$140.50</div>
                    <div>$137.80</div>
                    <div className="text-red-500">-1.9%</div>
                  </div>
                  <div className="grid grid-cols-5 px-4 py-3">
                    <div className="font-medium">JNJ</div>
                    <div>40</div>
                    <div>$160.30</div>
                    <div>$155.20</div>
                    <div className="text-red-500">-3.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

