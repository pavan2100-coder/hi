// Mock data generation for the analytics dashboard

export function generateMockData() {
  const baseRevenue = 125000
  const baseUsers = 45000
  const baseConversions = 2850
  const baseGrowth = 15.8

  // Add some random variation to simulate real-time updates
  const variation = () => 0.9 + Math.random() * 0.2

  return {
    totalRevenue: Math.round(baseRevenue * variation()),
    totalUsers: Math.round(baseUsers * variation()),
    totalConversions: Math.round(baseConversions * variation()),
    growthRate: Number((baseGrowth * variation()).toFixed(1)),
    
    growthTrends: [
      { month: 'Jan', revenue: 75000, users: 28000 },
      { month: 'Feb', revenue: 82000, users: 31000 },
      { month: 'Mar', revenue: 89000, users: 35000 },
      { month: 'Apr', revenue: 95000, users: 38000 },
      { month: 'May', revenue: 108000, users: 42000 },
      { month: 'Jun', revenue: 125000, users: 45000 }
    ],
    
    dailyConversions: [
      { day: 'Mon', conversions: 420 },
      { day: 'Tue', conversions: 380 },
      { day: 'Wed', conversions: 450 },
      { day: 'Thu', conversions: 520 },
      { day: 'Fri', conversions: 490 },
      { day: 'Sat', conversions: 380 },
      { day: 'Sun', conversions: 320 }
    ],
    
    trafficSources: [
      { name: 'Google Ads', value: 35 },
      { name: 'Facebook', value: 25 },
      { name: 'Instagram', value: 20 },
      { name: 'LinkedIn', value: 12 },
      { name: 'Email', value: 8 }
    ]
  }
}

export function generateCampaignData() {
  const campaigns = [
    'Summer Sale 2024',
    'Black Friday Deals',
    'Brand Awareness Q2',
    'Product Launch - Widget Pro',
    'Holiday Shopping Guide',
    'Back to School Special',
    'Spring Collection Preview',
    'Customer Retention Campaign',
    'Mobile App Promotion',
    'B2B Lead Generation',
    'Social Media Boost',
    'Email Newsletter Drive',
    'Influencer Collaboration',
    'Content Marketing Push',
    'Video Ad Campaign'
  ]

  const statuses = ['Active', 'Paused', 'Completed']

  return campaigns.map((campaign, index) => {
    const impressions = Math.floor(Math.random() * 100000) + 10000
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01))
    const conversions = Math.floor(clicks * (Math.random() * 0.15 + 0.02))
    const cpc = Math.random() * 3 + 0.5
    const revenue = conversions * (Math.random() * 100 + 20)

    return {
      id: index + 1,
      campaign,
      impressions,
      clicks,
      conversions,
      revenue,
      ctr: clicks / impressions,
      cpc,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    }
  })
}