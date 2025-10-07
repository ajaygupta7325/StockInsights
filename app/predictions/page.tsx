"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronsUpDown,
  Clock,
  LineChart,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictionChart } from "@/components/prediction-chart"

export default function Predictions() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [timeframe, setTimeframe] = useState("30")

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
              <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
                Portfolio
              </Link>
              <Link href="/predictions" className="text-primary transition-colors hover:text-primary/80">
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
          <h1 className="text-2xl font-bold tracking-tight">Predictions</h1>
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
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-lg font-medium">Selected Stock: {selectedStock}</div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ChevronsUpDown className="h-4 w-4" />
            Change Stock
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="text-sm font-medium">Prediction Timeframe:</div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="180">180 Days</SelectItem>
                <SelectItem value="365">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs defaultValue="price" className="space-y-4">
          <TabsList>
            <TabsTrigger value="price" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Price Prediction
            </TabsTrigger>
            <TabsTrigger value="trend" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trend Analysis
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scenario Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="price" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Prediction</CardTitle>
                <CardDescription>
                  {selectedStock} price forecast for the next {timeframe} days using machine learning models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionChart stockSymbol={selectedStock} timeframe={Number.parseInt(timeframe)} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Summary</CardTitle>
                  <CardDescription>Key prediction metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Current Price</p>
                      </div>
                      <p className="text-sm">$198.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Predicted Price (30 days)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm">$215.32</p>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Potential Return</p>
                      </div>
                      <p className="text-sm text-green-500">+8.5%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Confidence Level</p>
                      </div>
                      <p className="text-sm">78%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Prediction Model</p>
                      </div>
                      <p className="text-sm">Ensemble ML</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Price Range</CardTitle>
                  <CardDescription>Predicted price ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Optimistic Case</p>
                      </div>
                      <p className="text-sm">$230.45</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Base Case</p>
                      </div>
                      <p className="text-sm">$215.32</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Conservative Case</p>
                      </div>
                      <p className="text-sm">$190.78</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Volatility Estimate</p>
                      </div>
                      <p className="text-sm">±8.2%</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Support Level</p>
                      </div>
                      <p className="text-sm">$185.00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Market Factors</CardTitle>
                  <CardDescription>Key factors influencing prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Technical Indicators</p>
                      </div>
                      <p className="text-sm text-green-500">Bullish</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Sentiment Analysis</p>
                      </div>
                      <p className="text-sm text-green-500">Positive</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Market Trend</p>
                      </div>
                      <p className="text-sm text-green-500">Upward</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Sector Performance</p>
                      </div>
                      <p className="text-sm text-green-500">Strong</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Economic Outlook</p>
                      </div>
                      <p className="text-sm">Stable</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="trend" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Long-term trend analysis for {selectedStock}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  {/* Trend analysis chart would go here */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Trend analysis visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scenarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scenario Analysis</CardTitle>
                <CardDescription>Different scenarios for {selectedStock} based on market conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  {/* Scenario analysis chart would go here */}
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Scenario analysis visualization</p>
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
