'use client'

import { useEffect, useState } from 'react'
import { MetricCard } from '@/components/ui/MetricCard'
import { generateMockData } from '@/lib/mockData'
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react'

export function DashboardOverview() {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    users: 0,
    conversions: 0,
    growth: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const data = generateMockData()
      setMetrics({
        revenue: data.totalRevenue,
        users: data.totalUsers,
        conversions: data.totalConversions,
        growth: data.growthRate
      })
      setIsLoading(false)
    }, 1000)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const data = generateMockData()
      setMetrics({
        revenue: data.totalRevenue,
        users: data.totalUsers,
        conversions: data.totalConversions,
        growth: data.growthRate
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      title: 'Total Revenue',
      value: metrics.revenue,
      format: 'currency',
      change: '+12.5%',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: metrics.users,
      format: 'number',
      change: '+8.2%',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Conversions',
      value: metrics.conversions,
      format: 'number',
      change: '+15.1%',
      icon: Target,
      color: 'orange'
    },
    {
      title: 'Growth Rate',
      value: metrics.growth,
      format: 'percentage',
      change: '+3.4%',
      icon: TrendingUp,
      color: 'purple'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards.map((metric, index) => (
        <MetricCard
          key={metric.title}
          {...metric}
          isLoading={isLoading}
          animationDelay={index * 100}
        />
      ))}
    </div>
  )
}