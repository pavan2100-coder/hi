'use client'

import { 
  BarChart3, 
  Calendar, 
  Database, 
  Home, 
  PieChart, 
  Settings, 
  TrendingUp,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Overview', icon: Home, current: true },
  { name: 'Analytics', icon: BarChart3, current: false },
  { name: 'Campaigns', icon: TrendingUp, current: false },
  { name: 'Audience', icon: Users, current: false },
  { name: 'Reports', icon: PieChart, current: false },
  { name: 'Data Sources', icon: Database, current: false },
  { name: 'Calendar', icon: Calendar, current: false },
  { name: 'Settings', icon: Settings, current: false },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 min-h-screen">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "default" : "ghost"}
            className={cn(
              "w-full justify-start space-x-3",
              item.current && "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Button>
        ))}
      </nav>
    </aside>
  )
}