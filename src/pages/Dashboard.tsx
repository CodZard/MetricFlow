import BillingPage from './BillingPage'
import ReportsPage from './ReportsPage'
import CustomersPage from './CustomersPage'
import NotificationsPage from './NotificationsPage'
import SettingsPage from './SettingsPage'
import AnalyticsPage from './AnalyticsPage'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Analytics } from '../types'
import { useAuth } from '../hooks/useAuth'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import Sidebar from '../components/Sidebar'

type Page = 'dashboard' | 'analytics' | 'customers' | 'reports' | 'billing' | 'notifications' | 'settings' | 'security'

export default function Dashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<Analytics[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ revenue: '', users: '', sales: '' })
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  useEffect(() => { fetchAnalytics() }, [])

  const fetchAnalytics = async () => {
    const { data } = await supabase.from('analytics').select('*').order('created_at', { ascending: true })
    setAnalytics(data || [])
    setLoading(false)
  }

  const addData = async () => {
    if (!form.revenue || !form.users || !form.sales) return
    await supabase.from('analytics').insert({
      user_id: user?.id,
      revenue: parseFloat(form.revenue),
      users: parseInt(form.users),
      sales: parseInt(form.sales),
    })
    setForm({ revenue: '', users: '', sales: '' })
    setShowForm(false)
    fetchAnalytics()
  }

  const deleteData = async (id: string) => {
    await supabase.from('analytics').delete().eq('id', id)
    fetchAnalytics()
  }

  const totalRevenue = analytics.reduce((s, a) => s + a.revenue, 0)
  const totalUsers = analytics.reduce((s, a) => s + a.users, 0)
  const totalSales = analytics.reduce((s, a) => s + a.sales, 0)

  const renderPage = () => {
    if (currentPage === 'dashboard') return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Your analytics overview</p>
          </div>
          <button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600 hover:scale-105 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
            + Add Data
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Total Users', value: totalUsers.toLocaleString(), color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Sales', value: totalSales.toLocaleString(), color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200`}>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="created_at" tick={{ fontSize: 10 }} tickFormatter={v => new Date(v).toLocaleDateString()} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Users & Sales</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="created_at" tick={{ fontSize: 10 }} tickFormatter={v => new Date(v).toLocaleDateString()} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" radius={[4,4,0,0]} />
                <Bar dataKey="sales" fill="#a855f7" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Analytics Records</h3>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : analytics.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No data yet. Click "Add Data" to get started.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Revenue</th>
                  <th className="pb-3 font-medium">Users</th>
                  <th className="pb-3 font-medium">Sales</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {analytics.map(row => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
                    <td className="py-3 text-green-600 font-medium">${row.revenue.toLocaleString()}</td>
                    <td className="py-3 text-blue-600">{row.users.toLocaleString()}</td>
                    <td className="py-3 text-purple-600">{row.sales.toLocaleString()}</td>
                    <td className="py-3">
                      <button onClick={() => deleteData(row.id)} className="text-red-400 hover:text-red-600 text-xs transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )

    // Placeholder pages
    if (currentPage === 'analytics') return <AnalyticsPage />
    if (currentPage === 'settings') return <SettingsPage />
    if (currentPage === 'notifications') return <NotificationsPage />
    if (currentPage === 'customers') return <CustomersPage />
    if (currentPage === 'reports') return <ReportsPage />
    if (currentPage === 'billing') return <BillingPage />

const pageTitles: Record<string, string> = {
  customers: 'Customers', reports: 'Reports',
  billing: 'Billing', notifications: 'Notifications', settings: 'Settings', security: 'Security'
}
return (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">{pageTitles[currentPage]}</h1>
    <p className="text-gray-400 mt-2">Coming soon...</p>
  </div>
)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 overflow-auto">
        {/* TOP NAV */}
        <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <button onClick={() => setCurrentPage('dashboard')} className="font-semibold text-gray-900 hover:text-green-500 transition-colors">
            MetricFlow
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{user?.email}</span>
          </div>
        </nav>

        {renderPage()}
      </div>

      {/* ADD DATA MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-gray-900 mb-4">Add Analytics Data</h3>
            <div className="space-y-3">
              {[
                { label: 'Revenue ($)', key: 'revenue', placeholder: '5000' },
                { label: 'Users', key: 'users', placeholder: '120' },
                { label: 'Sales', key: 'sales', placeholder: '45' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    type="number" placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm">Cancel</button>
              <button onClick={addData} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 px-6 rounded-lg text-sm font-medium">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}