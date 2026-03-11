import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type Tab = 'Profile' | 'Notifications' | 'Security'

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('Profile')
  const [profile, setProfile] = useState({
    fullName: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    company: '',
    role: '',
  })
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    weekly: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings and preferences</p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6 border-b border-gray-100 pb-1">
        {(['Profile', 'Notifications', 'Security'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab ? 'bg-green-500/10 text-green-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab === 'Profile' && '👤'}
            {tab === 'Notifications' && '🔔'}
            {tab === 'Security' && '🛡️'}
            {tab}
          </button>
        ))}
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'Profile' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Profile Information</h2>
          <p className="text-sm text-gray-400 mb-6">Update your personal information and profile picture</p>

          {/* AVATAR */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Profile Picture</p>
              <p className="text-xs text-gray-400 mb-2">JPG, PNG or GIF. Max 2MB.</p>
              <div className="flex gap-2">
                <button className="text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Upload</button>
                <button className="text-sm text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            {[
              { label: 'Full Name', key: 'fullName', placeholder: 'John Doe' },
              { label: 'Company', key: 'company', placeholder: 'Demo Company' },
              { label: 'Role', key: 'role', placeholder: 'Admin' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={profile[f.key as keyof typeof profile]}
                  onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-100 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105"
            >
              {saved ? '✓ Saved!' : '💾 Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS TAB */}
      {activeTab === 'Notifications' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Notification Preferences</h2>
          <p className="text-sm text-gray-400 mb-6">Choose how you want to be notified</p>

          <div className="space-y-0">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications in your browser' },
              { key: 'marketing', label: 'Marketing Emails', desc: 'Receive updates about new features and offers' },
              { key: 'weekly', label: 'Weekly Reports', desc: 'Receive weekly summary reports' },
            ].map((item, i, arr) => (
              <div key={item.key} className={`flex justify-between items-center py-4 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                  className={`w-11 h-6 rounded-full transition-all duration-200 relative ${notifications[item.key as keyof typeof notifications] ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${notifications[item.key as keyof typeof notifications] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECURITY TAB */}
      {activeTab === 'Security' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Change Password</h2>
            <p className="text-sm text-gray-400 mb-6">Update your password to keep your account secure</p>
            <div className="space-y-4">
              {[
                { label: 'Current Password', placeholder: '••••••••' },
                { label: 'New Password', placeholder: '••••••••' },
                { label: 'Confirm New Password', placeholder: '••••••••' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    type="password" placeholder={f.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-400 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-105">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
            <button className="border border-green-500 text-green-600 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
              Enable 2FA
            </button>
          </div>

          <div className="bg-red-50 rounded-xl border border-red-100 p-6">
            <h2 className="font-semibold text-red-700 mb-1">Danger Zone</h2>
            <p className="text-sm text-red-400 mb-4">Once you delete your account, there is no going back.</p>
            <button className="border border-red-400 text-red-500 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-red-100 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}