import { useState } from 'react'

const reports = [
  { title: 'Monthly Revenue Report', desc: 'Complete revenue breakdown for March 2026', date: '3/1/2026', type: 'Revenue', size: '2.4 MB' },
  { title: 'User Growth Report', desc: 'User acquisition and retention analysis', date: '3/1/2026', type: 'Users', size: '1.8 MB' },
  { title: 'Sales Performance Q1', desc: 'Q1 2026 sales performance and targets', date: '2/28/2026', type: 'Sales', size: '3.1 MB' },
  { title: 'Traffic Analytics Report', desc: 'Website traffic and conversion analysis', date: '2/15/2026', type: 'Traffic', size: '1.2 MB' },
  { title: 'Customer Retention Report', desc: 'Churn analysis and retention metrics', date: '2/1/2026', type: 'Customers', size: '2.7 MB' },
]

const typeColors: Record<string, string> = {
  Revenue: 'bg-green-100 text-green-700',
  Users: 'bg-blue-100 text-blue-700',
  Sales: 'bg-purple-100 text-purple-700',
  Traffic: 'bg-yellow-100 text-yellow-700',
  Customers: 'bg-red-100 text-red-700',
}

export default function ReportsPage() {
  const [search, setSearch] = useState('')

  const filtered = reports.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Download and view your business reports</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 hover:scale-105 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
          + Generate Report
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text" placeholder="Search reports..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 transition-colors"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl shrink-0">📋</div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[r.type]}`}>{r.type}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                    <span className="text-xs text-gray-400">{r.size}</span>
                  </div>
                </div>
              </div>
              <button className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
                ⬇️ Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}