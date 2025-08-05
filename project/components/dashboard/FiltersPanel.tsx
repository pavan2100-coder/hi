'use client'

import { useState } from 'react'
import { Calendar, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange'
import { MultiSelect } from '@/components/ui/MultiSelect'

const campaignOptions = [
  { label: 'Summer Sale 2024', value: 'summer-sale' },
  { label: 'Black Friday', value: 'black-friday' },
  { label: 'Brand Awareness', value: 'brand-awareness' },
  { label: 'Product Launch', value: 'product-launch' }
]

const channelOptions = [
  { label: 'Google Ads', value: 'google-ads' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Email', value: 'email' }
]

export function FiltersPanel() {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  const handleExport = (format: 'csv' | 'pdf') => {
    // Simulate export functionality
    console.log(`Exporting data as ${format.toUpperCase()}...`)
    // In a real app, this would trigger the actual export
  }

  return (
    <Card className="mb-6 animate-in slide-in-from-top duration-500">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Filters:
            </span>
          </div>
          
          <DatePickerWithRange />
          
          <MultiSelect
            options={campaignOptions}
            value={selectedCampaigns}
            onChange={setSelectedCampaigns}
            placeholder="Select campaigns"
          />
          
          <MultiSelect
            options={channelOptions}
            value={selectedChannels}
            onChange={setSelectedChannels}
            placeholder="Select channels"
          />
          
          <div className="flex items-center space-x-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('csv')}
              className="space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('pdf')}
              className="space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>PDF</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}