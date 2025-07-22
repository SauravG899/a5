"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Globe, BarChart3 } from "lucide-react"
import { LineChart, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Line, Bar } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Synthetic tech stock data
const stockData = {
  AAPL: {
    name: { en: "Apple Inc.", fr: "Apple Inc." },
    symbol: "AAPL",
    logo: "https://www.vectorlogo.zone/logos/apple/apple-icon.svg",
    currentPrice: 175.43,
    change: 2.34,
    changePercent: 1.35,
    marketCap: 2800000000000,
    priceHistory: [
      { date: "2024-01", price: 185.64, month: { en: "Jan 2024", fr: "Jan 2024" } },
      { date: "2024-02", price: 182.31, month: { en: "Feb 2024", fr: "Fév 2024" } },
      { date: "2024-03", price: 169.12, month: { en: "Mar 2024", fr: "Mar 2024" } },
      { date: "2024-04", price: 169.89, month: { en: "Apr 2024", fr: "Avr 2024" } },
      { date: "2024-05", price: 189.98, month: { en: "May 2024", fr: "Mai 2024" } },
      { date: "2024-06", price: 214.1, month: { en: "Jun 2024", fr: "Jun 2024" } },
      { date: "2024-07", price: 218.54, month: { en: "Jul 2024", fr: "Jul 2024" } },
      { date: "2024-08", price: 225.77, month: { en: "Aug 2024", fr: "Aoû 2024" } },
      { date: "2024-09", price: 220.82, month: { en: "Sep 2024", fr: "Sep 2024" } },
      { date: "2024-10", price: 225.37, month: { en: "Oct 2024", fr: "Oct 2024" } },
      { date: "2024-11", price: 224.23, month: { en: "Nov 2024", fr: "Nov 2024" } },
      { date: "2024-12", price: 175.43, month: { en: "Dec 2024", fr: "Déc 2024" } },
    ],
  },
  GOOGL: {
    name: { en: "Alphabet Inc.", fr: "Alphabet Inc." },
    symbol: "GOOGL",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
    currentPrice: 138.21,
    change: -1.87,
    changePercent: -1.33,
    marketCap: 1750000000000,
    priceHistory: [
      { date: "2024-01", price: 140.93, month: { en: "Jan 2024", fr: "Jan 2024" } },
      { date: "2024-02", price: 139.28, month: { en: "Feb 2024", fr: "Fév 2024" } },
      { date: "2024-03", price: 151.11, month: { en: "Mar 2024", fr: "Mar 2024" } },
      { date: "2024-04", price: 157.54, month: { en: "Apr 2024", fr: "Avr 2024" } },
      { date: "2024-05", price: 173.56, month: { en: "May 2024", fr: "Mai 2024" } },
      { date: "2024-06", price: 179.58, month: { en: "Jun 2024", fr: "Jun 2024" } },
      { date: "2024-07", price: 181.18, month: { en: "Jul 2024", fr: "Jul 2024" } },
      { date: "2024-08", price: 164.74, month: { en: "Aug 2024", fr: "Aoû 2024" } },
      { date: "2024-09", price: 153.78, month: { en: "Sep 2024", fr: "Sep 2024" } },
      { date: "2024-10", price: 166.27, month: { en: "Oct 2024", fr: "Oct 2024" } },
      { date: "2024-11", price: 171.69, month: { en: "Nov 2024", fr: "Nov 2024" } },
      { date: "2024-12", price: 138.21, month: { en: "Dec 2024", fr: "Déc 2024" } },
    ],
  },
  MSFT: {
    name: { en: "Microsoft Corp.", fr: "Microsoft Corp." },
    symbol: "MSFT",
    logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg",
    currentPrice: 415.26,
    change: 5.67,
    changePercent: 1.38,
    marketCap: 3100000000000,
    priceHistory: [
      { date: "2024-01", price: 397.58, month: { en: "Jan 2024", fr: "Jan 2024" } },
      { date: "2024-02", price: 403.52, month: { en: "Feb 2024", fr: "Fév 2024" } },
      { date: "2024-03", price: 421.43, month: { en: "Mar 2024", fr: "Mar 2024" } },
      { date: "2024-04", price: 400.37, month: { en: "Apr 2024", fr: "Avr 2024" } },
      { date: "2024-05", price: 427.12, month: { en: "May 2024", fr: "Mai 2024" } },
      { date: "2024-06", price: 446.34, month: { en: "Jun 2024", fr: "Jun 2024" } },
      { date: "2024-07", price: 432.24, month: { en: "Jul 2024", fr: "Jul 2024" } },
      { date: "2024-08", price: 417.0, month: { en: "Aug 2024", fr: "Aoû 2024" } },
      { date: "2024-09", price: 416.06, month: { en: "Sep 2024", fr: "Sep 2024" } },
      { date: "2024-10", price: 413.47, month: { en: "Oct 2024", fr: "Oct 2024" } },
      { date: "2024-11", price: 422.54, month: { en: "Nov 2024", fr: "Nov 2024" } },
      { date: "2024-12", price: 415.26, month: { en: "Dec 2024", fr: "Déc 2024" } },
    ],
  },
  AMZN: {
    name: { en: "Amazon.com Inc.", fr: "Amazon.com Inc." },
    symbol: "AMZN",
    logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg",
    currentPrice: 171.45,
    change: 3.21,
    changePercent: 1.91,
    marketCap: 1800000000000,
    priceHistory: [
      { date: "2024-01", price: 155.2, month: { en: "Jan 2024", fr: "Jan 2024" } },
      { date: "2024-02", price: 153.75, month: { en: "Feb 2024", fr: "Fév 2024" } },
      { date: "2024-03", price: 180.38, month: { en: "Mar 2024", fr: "Mar 2024" } },
      { date: "2024-04", price: 179.83, month: { en: "Apr 2024", fr: "Avr 2024" } },
      { date: "2024-05", price: 186.43, month: { en: "May 2024", fr: "Mai 2024" } },
      { date: "2024-06", price: 193.61, month: { en: "Jun 2024", fr: "Jun 2024" } },
      { date: "2024-07", price: 188.4, month: { en: "Jul 2024", fr: "Jul 2024" } },
      { date: "2024-08", price: 176.39, month: { en: "Aug 2024", fr: "Aoû 2024" } },
      { date: "2024-09", price: 178.5, month: { en: "Sep 2024", fr: "Sep 2024" } },
      { date: "2024-10", price: 186.4, month: { en: "Oct 2024", fr: "Oct 2024" } },
      { date: "2024-11", price: 197.93, month: { en: "Nov 2024", fr: "Nov 2024" } },
      { date: "2024-12", price: 171.45, month: { en: "Dec 2024", fr: "Déc 2024" } },
    ],
  },
  TSLA: {
    name: { en: "Tesla Inc.", fr: "Tesla Inc." },
    symbol: "TSLA",
    logo: "https://www.vectorlogo.zone/logos/tesla/tesla-icon.svg",
    currentPrice: 248.98,
    change: -12.45,
    changePercent: -4.76,
    marketCap: 790000000000,
    priceHistory: [
      { date: "2024-01", price: 207.83, month: { en: "Jan 2024", fr: "Jan 2024" } },
      { date: "2024-02", price: 193.57, month: { en: "Feb 2024", fr: "Fév 2024" } },
      { date: "2024-03", price: 175.79, month: { en: "Mar 2024", fr: "Mar 2024" } },
      { date: "2024-04", price: 155.45, month: { en: "Apr 2024", fr: "Avr 2024" } },
      { date: "2024-05", price: 174.31, month: { en: "May 2024", fr: "Mai 2024" } },
      { date: "2024-06", price: 182.47, month: { en: "Jun 2024", fr: "Jun 2024" } },
      { date: "2024-07", price: 219.16, month: { en: "Jul 2024", fr: "Jul 2024" } },
      { date: "2024-08", price: 238.59, month: { en: "Aug 2024", fr: "Aoû 2024" } },
      { date: "2024-09", price: 250.22, month: { en: "Sep 2024", fr: "Sep 2024" } },
      { date: "2024-10", price: 269.19, month: { en: "Oct 2024", fr: "Oct 2024" } },
      { date: "2024-11", price: 352.56, month: { en: "Nov 2024", fr: "Nov 2024" } },
      { date: "2024-12", price: 248.98, month: { en: "Dec 2024", fr: "Déc 2024" } },
    ],
  },
}

const translations = {
  en: {
    title: "Tech Stock Dashboard",
    subtitle: "Interactive analysis of major technology stocks",
    priceChart: "Stock Price Trends",
    priceChartDesc: "Historical price movements over the past 12 months",
    marketCapChart: "Market Capitalization Comparison",
    marketCapChartDesc: "Current market cap comparison of selected tech companies",
    selectStock: "Select Stock",
    selectCurrency: "Currency",
    selectTimeframe: "Time Period",
    currentPrice: "Current Price",
    change: "Change",
    marketCap: "Market Cap",
    price: "Price",
    month: "Month",
    last6months: "Last 6 Months",
    last12months: "Last 12 Months",
    dataNote: "Note: This dashboard uses synthetic data for demonstration purposes.",
    language: "Language",
  },
  fr: {
    title: "Tableau de Bord Actions Tech",
    subtitle: "Analyse interactive des principales actions technologiques",
    priceChart: "Tendances des Prix des Actions",
    priceChartDesc: "Mouvements historiques des prix au cours des 12 derniers mois",
    marketCapChart: "Comparaison de Capitalisation Boursière",
    marketCapChartDesc: "Comparaison actuelle de la capitalisation boursière des entreprises tech sélectionnées",
    selectStock: "Sélectionner Action",
    selectCurrency: "Devise",
    selectTimeframe: "Période",
    currentPrice: "Prix Actuel",
    change: "Variation",
    marketCap: "Cap. Boursière",
    price: "Prix",
    month: "Mois",
    last6months: "6 Derniers Mois",
    last12months: "12 Derniers Mois",
    dataNote: "Note: Ce tableau de bord utilise des données synthétiques à des fins de démonstration.",
    language: "Langue",
  },
}

const currencyRates = {
  USD: 1,
  CAD: 1.35,
  EUR: 0.85,
}

const formatCurrency = (value: number, currency: string) => {
  const convertedValue = value * currencyRates[currency as keyof typeof currencyRates]
  const symbol = currency === "USD" ? "$" : currency === "CAD" ? "C$" : "€"
  return `${symbol}${convertedValue.toFixed(2)}`
}

const formatMarketCap = (value: number, currency: string, lang: string) => {
  const convertedValue = value * currencyRates[currency as keyof typeof currencyRates]
  const trillion = lang === "en" ? "T" : "B"
  return `${currency === "USD" ? "$" : currency === "CAD" ? "C$" : "€"}${(convertedValue / 1000000000000).toFixed(2)}${trillion}`
}

export default function TechStockDashboard() {
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [currency, setCurrency] = useState("USD")
  const [timeframe, setTimeframe] = useState("last12months")

  const t = translations[language]
  const currentStock = stockData[selectedStock as keyof typeof stockData]

  // Filter data based on timeframe
  const getFilteredData = () => {
    if (timeframe === "last6months") {
      return currentStock.priceHistory.slice(-6)
    }
    return currentStock.priceHistory
  }

  // Prepare market cap comparison data
  const marketCapData = Object.values(stockData).map((stock) => ({
    name: stock.name[language],
    symbol: stock.symbol,
    marketCap: (stock.marketCap * currencyRates[currency as keyof typeof currencyRates]) / 1000000000000,
    fill:
      stock.symbol === "AAPL"
        ? "#007AFF"
        : stock.symbol === "GOOGL"
          ? "#4285F4"
          : stock.symbol === "MSFT"
            ? "#00BCF2"
            : stock.symbol === "AMZN"
              ? "#FF9900"
              : "#CC0000",
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t.title}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-slate-600" />
            <Select value={language} onValueChange={(value: "en" | "fr") => setLanguage(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t.selectStock}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedStock} onValueChange={setSelectedStock}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(stockData).map(([symbol, stock]) => (
                    <SelectItem key={symbol} value={symbol}>
                      <span className="flex items-center gap-2">
                        <img src={stock.logo} alt={symbol + ' logo'} className="w-5 h-5 object-contain" />
                        {symbol} - {stock.name[language]}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t.selectCurrency}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t.selectTimeframe}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last6months">{t.last6months}</SelectItem>
                  <SelectItem value="last12months">{t.last12months}</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Current Stock Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{currentStock.name[language]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{t.currentPrice}:</span>
                <span className="font-semibold">{formatCurrency(currentStock.currentPrice, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{t.change}:</span>
                <div className="flex items-center gap-1">
                  {currentStock.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${currentStock.change > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {currentStock.changePercent > 0 ? "+" : ""}
                    {currentStock.changePercent}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart - Stock Price Trends */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <CardTitle>{t.priceChart}</CardTitle>
              </div>
              <CardDescription>{t.priceChartDesc}</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <ChartContainer
                config={{
                  price: {
                    label: t.price,
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[350px] max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getFilteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                    <XAxis
                      dataKey={`month.${language}`}
                      tick={{ fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                      minTickGap={10}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatCurrency(value, currency)}
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [formatCurrency(Number(value), currency), t.price]}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bar Chart - Market Cap Comparison */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <CardTitle>{t.marketCapChart}</CardTitle>
              </div>
              <CardDescription>{t.marketCapChartDesc}</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <ChartContainer
                config={{
                  marketCap: {
                    label: t.marketCap,
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[350px] max-w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketCapData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <XAxis dataKey="symbol" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} interval={0} minTickGap={10} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `${currency === "USD" ? "$" : currency === "CAD" ? "C$" : "€"}${value.toFixed(1)}T`
                      }
                    />
                    <Tooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name, props) => [
                            formatMarketCap(Number(value) * 1000000000000, currency, language),
                            t.marketCap,
                          ]}
                          labelFormatter={(label, payload) => {
                            const item = payload?.[0]?.payload
                            return item ? `${item.name} (${item.symbol})` : label
                          }}
                        />
                      }
                    />
                    <Bar dataKey="marketCap" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Data Note */}
        <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 dark:text-amber-200">{t.dataNote}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
