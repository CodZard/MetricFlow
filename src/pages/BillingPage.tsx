import { useState } from 'react'

export default function BillingPage() {
  const [currentPlan] = useState('Pro')

  const plans = [
    { name: 'Starter', price: '$0', desc: 'Perfect for individuals', features: ['5 dashboards', '1 user', 'Basic analytics', 'Email support'] },
    { name: 'Pro', price: '$29', desc: 'For growing teams', features: ['Unlimited dashboards', '10 users', 'Advanced analytics', 'Priority support', 'API access'] },
    { name: 'Enterprise', price: '$99', desc: 'For large organizations', features: ['Everything in Pro', 'Unlimited users', 'Custom integrations', 'Dedicated support'] },
  ]

  const invoices = [
    { id: 'INV-001', date: '3/1/2026', amount: '$29.00', status: 'Paid' },
    { id: 'INV-002', date: '2/1/2026', amount: '$29.00', status: 'Paid' },
    { id: 'INV-003', date: '1/1/2026', amount: '$29.00', status: 'Paid' },
    { id: 'INV-004', date: '12/1/2025', amount: '$29.00', status: 'Paid' },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your subscription and invoices</p>
      </div>

      {/* CURRENT PLAN */}
      <div className="bg-green-500 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-green-100 text-sm">Current Plan</p>
            <p className="text-3xl font-bold mt-1">{currentPlan}</p>
            <p className="text-green-100 text-sm mt-1">$29/month · Renews April 1, 2026</p>
          </div>
          <button className="bg-white text-green-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
            Manage Plan
          </button>
        </div>
      </div>

      {/* PLANS */}
      <h2 className="font-semibold text-gray-900 mb-4">Available Plans</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {plans.map(p => (
          <div key={p.name} className={`rounded-xl border p-5 transition-all duration-200 hover:shadow-md ${currentPlan === p.name ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-white'}`}>
            <p className="font-semibold text-gray-900">{p.name}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{p.price}<span className="text-sm font-normal text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-400 mt-1 mb-4">{p.desc}</p>
            <ul className="space-y-1.5 mb-4">
              {p.features.map(f => (
                <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPlan === p.name
                ? 'bg-green-500 text-white cursor-default'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
              {currentPlan === p.name ? 'Current Plan' : 'Switch Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* INVOICES */}
      <h2 className="font-semibold text-gray-900 mb-4">Invoice History</h2>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-900">{inv.id}</td>
                <td className="px-5 py-3 text-gray-500">{inv.date}</td>
                <td className="px-5 py-3 text-gray-900">{inv.amount}</td>
                <td className="px-5 py-3">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">{inv.status}</span>
                </td>
                <td className="px-5 py-3">
                  <button className="text-xs text-green-600 hover:underline">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}