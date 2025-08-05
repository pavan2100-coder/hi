'use client'

import { DivideIcon as LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'e: string
  value: number
  format: 'currency' | 'number' | 'percentage'
  change: string
  icon: LucideIcon
  color: 'blue' | 'green' | 'orange' | 'purple'
  isLoading?: boolean
  animationDelay?: number
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  purple: 'from-purple-500 to-purple-600'
}

export function MetricCard({
  title,
  value,
  format,
  change,
  icon: Icon,
  color,
  isLoading = false,
  animationDelay = 0
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(val)
      case 'percentage':
        return `${val.toFixed(1)}%`
      default:
        return new Intl.NumberFormat('en-US').format(val)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700",
        "transform transition-all duration-500 hover:scale-105 hover:shadow-lg",
        "animate-in slide-in-from-bottom-4"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {formatValue(value)}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            {change} from last month
          </p>
        </div>
        <div className={cn(
          "p-3 rounded-lg bg-gradient-to-br",
          colorClasses[color]
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}