import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { InteractiveCharts } from '@/components/dashboard/InteractiveCharts'
import { DataTable } from '@/components/dashboard/DataTable'
import { FiltersPanel } from '@/components/dashboard/FiltersPanel'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 space-y-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  ADmyBRAND Insights Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  AI-powered analytics for your digital marketing campaigns
                </p>
              </div>
              
              <FiltersPanel />
              <DashboardOverview />
              <InteractiveCharts />
              <DataTable />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}