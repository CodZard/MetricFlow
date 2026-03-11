import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const trafficData = [
  { day: 'Mon', visits: 2400, unique: 1800 },
  { day: 'Tue', visits: 2800, unique: 2100 },
  { day: 'Wed', visits: 2600, unique: 1950 },
  { day: 'Thu', visits: 3200, unique: 2400 },
  { day: 'Fri', visits: 3800, unique: 2900 },
  { day: 'Sat', visits: 3100, unique: 2300 },
  { day: 'Sun', visits: 2900, unique: 2200 },
]

const revenueData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 4500, expenses: 2600, profit: 1900 },
  { month: 'Mar', revenue: 5200, expenses: 2800, profit: 2400 },
  { month: 'Apr', revenue: 5800, expenses: 3000, profit: 2800 },
  { month: 'May', revenue: 6200, expenses: 3200, profit: 3000 },
  { month: 'Jun', revenue: 6800, expenses: 3400, profit: 3400 },
  { month: 'Jul', revenue: 7500, expenses: 3600, profit: 3900 },
]

const usersData = [
  { month: 'Jan', users: 800 },
  { month: 'Feb', users: 1100 },
  { month: 'Mar', users: 1400 },
  { month: 'Apr', users: 1800 },
  { month: 'May', users: 2100 },
  { month: 'Jun', users: 2400 },
  { month: 'Jul', users: 2800 },
]

const deviceData = [
  { name: 'Desktop', value: 58, color: '#86efac' },
  { name: 'Mobile', value: 35, color: '#1f2937' },
  { name: 'Tablet', value: 7, color: '#d1fae5' },
]

const browserData = [
  { name: 'Chrome', value: 45, color: '#86efac' },
  { name: 'Safari', value: 28, color: '#1f2937' },
  { name: 'Firefox', value: 15, color: '#d1fae5' },
  { name: 'Edge', value: 8, color: '#6ee7b7' },
  { name: 'Other', value: 4, color: '#a7f3d0' },
]

type Tab = 'Traffic' | 'Devices' | 'Browsers'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Traffic')

  const stats = [
    { label: 'Total Visits', value: '22,400', change: '+12.5% vs last week', up: true, icon: '👁️' },
    { label: 'Unique Visitors', value: '16,900', change: '+8.3% vs last week', up: true, icon: '👥' },
    { label: 'Page Views', value: '89,300', change: '+15.2% vs last week', up: true, icon: '📈' },
    { label: 'Click Rate', value: '3.24%', change: '-2.1% vs last week', up: false, icon: '🖱️' },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Detailed insights into your business performance</p>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            📅 Last 7 days
          </button>
          <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            ⬇️ Export
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="space-y-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 flex justify-between items-center hover:shadow-md transition-all duration-200">
            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
              <p className={`text-sm mt-1 ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                {s.up ? '↑' : '↓'} {s.change}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-xl">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-4">
        {(['Traffic', 'Devices', 'Browsers'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab ? 'bg-green-500 text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'Traffic' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Traffic Overview</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#86efac" strokeWidth={2} dot={false} name="Total Visits" />
                <Line type="monotone" dataKey="unique" stroke="#1f2937" strokeWidth={2} dot={false} name="Unique Visitors" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Revenue Overview</h3>
              <div className="flex gap-1">
                {['7 Days', '30 Days', '90 Days', '1 Year'].map(t => (
                  <button key={t} className="text-xs px-2 py-1 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">{t}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#86efac" strokeWidth={2} dot={false} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} dot={false} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} dot={false} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Active Users</h3>
            <p className="text-xs text-gray-400 mb-3">Monthly active user growth</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="users" fill="#86efac" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'Devices' && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={80} outerRadius={130} dataKey="value">
                {deviceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {deviceData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Browsers' && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Browser Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={browserData} cx="50%" cy="50%" outerRadius={130} dataKey="value">
                {browserData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {browserData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}