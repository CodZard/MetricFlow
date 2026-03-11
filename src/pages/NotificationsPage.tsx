import { useState } from 'react'

const initialNotifications = [
  { id: 1, title: 'Welcome!', message: 'Thanks for joining our platform. Get started by adding your first analytics data.', date: '3/10/2026', read: false, type: 'info' },
  { id: 2, title: 'New Feature', message: "We've added advanced analytics to your dashboard. Check it out!", date: '3/9/2026', read: false, type: 'success' },
  { id: 3, title: 'Security Alert', message: 'Please enable two-factor authentication for enhanced security.', date: '3/8/2026', read: true, type: 'warning' },
  { id: 4, title: 'Monthly Report', message: 'Your March monthly report is ready to view.', date: '3/7/2026', read: true, type: 'info' },
  { id: 5, title: 'New User Registered', message: 'A new user has joined your platform.', date: '3/6/2026', read: true, type: 'success' },
]

const typeColors: Record<string, string> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })))
  const markRead = (id: number) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id: number) => setNotifications(notifications.filter(n => n.id !== id))

  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-sm text-green-600 hover:underline font-medium">
            ✓ Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <p className="text-4xl mb-3">🔔</p>
            <p className="text-gray-400 text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`bg-white rounded-xl border p-4 flex gap-4 transition-all duration-200 hover:shadow-md ${!n.read ? 'border-green-100' : 'border-gray-100'}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${typeColors[n.type]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className={`text-sm font-medium ${!n.read ? 'text-gray-900' : 'text-gray-500'}`}>{n.title}</p>
                  <span className="text-xs text-gray-400 shrink-0">{n.date}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{n.message}</p>
                <div className="flex gap-3 mt-2">
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="text-xs text-green-600 hover:underline">
                      Mark read
                    </button>
                  )}
                  <button onClick={() => deleteNotif(n.id)} className="text-xs text-red-400 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}