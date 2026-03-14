import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import {
  LayoutDashboard, BarChart2, Users, FileText, CreditCard,
  Bell, Settings, Shield, HelpCircle, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react'

type Page = 'dashboard' | 'analytics' | 'customers' | 'reports' | 'billing' | 'notifications' | 'settings' | 'security'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const { user, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const mainMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  const settingsMenu = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ]

  const handleNavigate = (page: Page) => {
    onNavigate(page)
    onClose()
  }

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed md:relative z-30 md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${collapsed ? 'w-16' : 'w-64'}
        min-h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 shrink-0
      `}>
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold text-sm">M</div>
              <span className="font-semibold text-white">MetricFlow</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition-colors p-1 hidden md:block w-64"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* MAIN MENU */}
        <div className="flex-1 px-3 py-4">
          {!collapsed && <p className="text-xs text-gray-500 font-medium px-3 mb-3 uppercase tracking-wider">Main Menu</p>}
          <nav className="space-y-1">
            {mainMenu.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id as Page)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-green-500/20 text-green-400 font-medium'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              )
            })}
          </nav>

          <div className="mt-6">
            {!collapsed && <p className="text-xs text-gray-500 font-medium px-3 mb-3 uppercase tracking-wider">Settings</p>}
            <nav className="space-y-1">
              {settingsMenu.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id as Page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-green-500/20 text-green-400 font-medium'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                )
              })}
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
              <button onClick={signOut} className="text-gray-500 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}