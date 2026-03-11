import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type Page = 'dashboard' | 'analytics' | 'customers' | 'reports' | 'billing' | 'notifications' | 'settings' | 'security'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { user, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const mainMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: '▦' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ]

  const settingsMenu = [
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'help', label: 'Help & Support', icon: '❓' },
  ]

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} min-h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 shrink-0`}>
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold text-sm">M</div>
            <span className="font-semibold text-white">MetricFlow</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white transition-colors p-1">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* MAIN MENU */}
      <div className="flex-1 px-3 py-4">
        {!collapsed && <p className="text-xs text-gray-500 font-medium px-3 mb-3 uppercase tracking-wider">Main Menu</p>}
        <nav className="space-y-1">
          {mainMenu.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-green-500/20 text-green-400 font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* SETTINGS MENU */}
        <div className="mt-6">
          {!collapsed && <p className="text-xs text-gray-500 font-medium px-3 mb-3 uppercase tracking-wider">Settings</p>}
          <nav className="space-y-1">
            {settingsMenu.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-green-500/20 text-green-400 font-medium'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* USER */}
      <div className="border-t border-gray-800 px-3 py-4">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.email?.[0].toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={signOut} className="text-gray-500 hover:text-red-400 transition-colors text-sm">→</button>
          )}
        </div>
      </div>
    </div>
  )
}