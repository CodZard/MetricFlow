import { useState } from 'react'

const initialCustomers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@techstart.com', plan: 'Pro', status: 'Active', joined: '1/15/2026', spent: '$580' },
  { id: 2, name: 'Marcus Lee', email: 'marcus@scaleup.com', plan: 'Starter', status: 'Active', joined: '2/3/2026', spent: '$0' },
  { id: 3, name: 'Aisha Patel', email: 'aisha@innovate.com', plan: 'Enterprise', status: 'Active', joined: '1/28/2026', spent: '$1,980' },
  { id: 4, name: 'James Wilson', email: 'james@growthco.com', plan: 'Pro', status: 'Inactive', joined: '12/10/2025', spent: '$290' },
  { id: 5, name: 'Linda Chen', email: 'linda@buildit.com', plan: 'Pro', status: 'Active', joined: '3/1/2026', spent: '$145' },
  { id: 6, name: 'David Okafor', email: 'david@launchpad.com', plan: 'Starter', status: 'Active', joined: '3/5/2026', spent: '$0' },
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [customers] = useState(initialCustomers)

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">{customers.length} total customers</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 hover:scale-105 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
          + Add Customer
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Customers', value: customers.length, color: 'text-gray-900' },
          { label: 'Active', value: customers.filter(c => c.status === 'Active').length, color: 'text-green-600' },
          { label: 'Inactive', value: customers.filter(c => c.status === 'Inactive').length, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text" placeholder="Search customers..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 transition-colors"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full text-sm min-w-[600px]">
      <thead>
        <tr className="text-left text-gray-400 border-b border-gray-100 bg-gray-50">
          <th className="px-5 py-3 font-medium">Name</th>
          <th className="px-5 py-3 font-medium">Plan</th>
          <th className="px-5 py-3 font-medium">Status</th>
          <th className="px-5 py-3 font-medium">Joined</th>
          <th className="px-5 py-3 font-medium">Spent</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(c => (
          <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs shrink-0">
                  {c.name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                c.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                c.plan === 'Pro' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>{c.plan}</span>
            </td>
            <td className="px-5 py-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}>{c.status}</span>
            </td>
            <td className="px-5 py-3 text-gray-500">{c.joined}</td>
            <td className="px-5 py-3 text-gray-900 font-medium">{c.spent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}