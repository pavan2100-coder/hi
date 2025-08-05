'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, Filter, Download, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { generateCampaignData } from '@/lib/mockData'

type SortField = 'campaign' | 'impressions' | 'clicks' | 'conversions' | 'revenue' | 'ctr' | 'cpc'
type SortDirection = 'asc' | 'desc'

export function DataTable() {
  const [data, setData] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('revenue')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const campaigns = generateCampaignData()
    setData(campaigns)
  }, [])

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status.toLowerCase() === statusFilter.toLowerCase())
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return sortDirection === 'asc' 
        ? aValue - bValue 
        : bValue - aValue
    })

    return filtered
  }, [data, searchTerm, sortField, sortDirection, statusFilter])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map(item => item.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on rows:`, selectedRows)
    setSelectedRows([])
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  const formatNumber = (value: number) => 
    new Intl.NumberFormat('en-US').format(value)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <Card className="animate-in slide-in-from-bottom duration-700 border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">Campaign Performance</CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage and analyze your marketing campaigns
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedRows.length > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{selectedRows.length} selected</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAction('pause')}>
                      Pause Campaigns
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('activate')}>
                      Activate Campaigns
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('delete')}>
                      Delete Campaigns
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Filters Row */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-4 w-12">
                  <Checkbox
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                {[
                  { key: 'campaign', label: 'Campaign' },
                  { key: 'impressions', label: 'Impressions' },
                  { key: 'clicks', label: 'Clicks' },
                  { key: 'conversions', label: 'Conversions' },
                  { key: 'revenue', label: 'Revenue' },
                  { key: 'ctr', label: 'CTR' },
                  { key: 'cpc', label: 'CPC' }
                ].map(({ key, label }) => (
                  <th key={key} className="text-left py-4 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(key as SortField)}
                      className="p-0 h-auto font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      {label}
                      <ArrowUpDown className={`ml-1 h-3 w-3 ${sortField === key ? 'text-blue-600' : ''}`} />
                    </Button>
                  </th>
                ))}
                <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300 w-16">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr 
                  key={item.id}
                  className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 ${
                    selectedRows.includes(item.id) ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectRow(item.id, checked as boolean)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{item.campaign}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">ID: {item.id}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-sm">{formatNumber(item.impressions)}</td>
                  <td className="py-4 px-4 font-mono text-sm">{formatNumber(item.clicks)}</td>
                  <td className="py-4 px-4 font-mono text-sm">{formatNumber(item.conversions)}</td>
                  <td className="py-4 px-4 font-semibold font-mono">{formatCurrency(item.revenue)}</td>
                  <td className="py-4 px-4 font-mono text-sm">{(item.ctr * 100).toFixed(2)}%</td>
                  <td className="py-4 px-4 font-mono text-sm">{formatCurrency(item.cpc)}</td>
                  <td className="py-4 px-4">
                    <Badge 
                      className={getStatusColor(item.status)}
                      variant="secondary"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of{' '}
            {filteredAndSortedData.length} results
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-9"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let page: number
                if (totalPages <= 7) {
                  page = i + 1
                } else if (currentPage <= 4) {
                  page = i + 1
                } else if (currentPage >= totalPages - 3) {
                  page = totalPages - 6 + i
                } else {
                  page = currentPage - 3 + i
                }
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-9 h-9"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-9"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}