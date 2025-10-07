"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, ChevronDown, ChevronsUpDown, Clock, LineChart, PieChart, Search, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TechnicalAnalysis } from "@/components/technical-analysis"
import { FundamentalAnalysis } from "@/components/fundamental-analysis"

export default function Analysis() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStock, setSelectedStock] = useState("AAPL")

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
              <Link href="/analysis" className="text-primary transition-colors hover:text-primary/80">
                Analysis
              </Link>
              <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
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
          <h1 className="text-2xl font-bold tracking-tight">Analysis</h1>
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
        <div className="flex items-center gap-4">
          <div className="text-lg font-medium">Selected Stock: {selectedStock}</div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ChevronsUpDown className="h-4 w-4" />
            Change Stock
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </div>
        <Tabs defaultValue="technical" className="space-y-4">
          <TabsList>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Technical Analysis
            </TabsTrigger>
            <TabsTrigger value="fundamental" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Fundamental Analysis
            </TabsTrigger>
            <TabsTrigger value="comparative" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Comparative Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Analysis</CardTitle>
                <CardDescription>Analyze {selectedStock} using technical indicators and chart patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <TechnicalAnalysis stockSymbol={selectedStock} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Moving Averages</CardTitle>
                  <CardDescription>Simple and exponential moving averages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">SMA (20)</p>
                      </div>
                      <p className="text-sm">$187.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">SMA (50)</p>
                      </div>
                      <p className="text-sm">$182.32</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">SMA (200)</p>
                      </div>
                      <p className="text-sm">$175.89</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">EMA (12)</p>
                      </div>
                      <p className="text-sm">$189.21</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">EMA (26)</p>
                      </div>
                      <p className="text-sm">$184.76</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Oscillators</CardTitle>
                  <CardDescription>Momentum indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">RSI (14)</p>
                      </div>
                      <p className="text-sm">62.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">MACD</p>
                      </div>
                      <p className="text-sm">4.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">MACD Signal</p>
                      </div>
                      <p className="text-sm">2.87</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Stochastic %K</p>
                      </div>
                      <p className="text-sm">78.32</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Stochastic %D</p>
                      </div>
                      <p className="text-sm">72.18</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Volatility & Volume</CardTitle>
                  <CardDescription>Volatility and volume indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Bollinger Bands Width</p>
                      </div>
                      <p className="text-sm">12.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">ATR (14)</p>
                      </div>
                      <p className="text-sm">3.87</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Volume</p>
                      </div>
                      <p className="text-sm">45.2M</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">OBV</p>
                      </div>
                      <p className="text-sm">1.23B</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Volume MA (20)</p>
                      </div>
                      <p className="text-sm">52.7M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="fundamental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fundamental Analysis</CardTitle>
                <CardDescription>Analyze {selectedStock} using financial statements and ratios</CardDescription>
              </CardHeader>
              <CardContent>
                <FundamentalAnalysis stockSymbol={selectedStock} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Valuation Ratios</CardTitle>
                  <CardDescription>Key valuation metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">P/E Ratio</p>
                      </div>
                      <p className="text-sm">32.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Forward P/E</p>
                      </div>
                      <p className="text-sm">28.76</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">PEG Ratio</p>
                      </div>
                      <p className="text-sm">2.34</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">P/S Ratio</p>
                      </div>
                      <p className="text-sm">7.89</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">P/B Ratio</p>
                      </div>
                      <p className="text-sm">45.67</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Profitability</CardTitle>
                  <CardDescription>Profitability metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Gross Margin</p>
                      </div>
                      <p className="text-sm">43.31%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Operating Margin</p>
                      </div>
                      <p className="text-sm">30.42%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Net Profit Margin</p>
                      </div>
                      <p className="text-sm">25.88%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">ROE</p>
                      </div>
                      <p className="text-sm">156.39%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">ROA</p>
                      </div>
                      <p className="text-sm">24.72%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Growth</CardTitle>
                  <CardDescription>Growth metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Revenue Growth (YoY)</p>
                      </div>
                      <p className="text-sm">8.12%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">EPS Growth (YoY)</p>
                      </div>
                      <p className="text-sm">10.45%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Dividend Growth (5Y)</p>
                      </div>
                      <p className="text-sm">7.32%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">EBITDA Growth</p>
                      </div>
                      <p className="text-sm">9.87%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Free Cash Flow Growth</p>
                      </div>
                      <p className="text-sm">12.54%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="comparative" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparative Analysis</CardTitle>
                <CardDescription>Compare {selectedStock} with industry peers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  {/* Comparative analysis chart would go here */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Comparative analysis visualization</p>
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
