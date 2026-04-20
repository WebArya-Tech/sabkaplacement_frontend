import { useState } from 'react'
import EmployeeNavbar from '../../components/EmployeeNavbar'
import Footer from '../../components/EmployeeFooter'

const allNotifications = [
  {
    id: 1,
    title: 'New job matches available',
    message: '12 new frontend roles were added matching your profile. Check them out now.',
    type: 'Job Alert',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Interview scheduled',
    message: 'TechNova Labs invited you for an interview on Monday at 11:00 AM. Please confirm your availability.',
    type: 'Interview Call',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 3,
    title: 'Recruiter message',
    message: 'A recruiter from StackBridge sent you a message about your application for React Developer.',
    type: 'Message',
    time: '3 hrs ago',
    read: false,
  },
  {
    id: 4,
    title: 'Application viewed',
    message: 'Your application for Senior Frontend Developer at Infosys was viewed by the recruiter.',
    type: 'Job Alert',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 5,
    title: 'Profile strength improved',
    message: 'Your profile strength is now 82%. Add a cover photo to reach 90% and get more visibility.',
    type: 'Message',
    time: '2 days ago',
    read: true,
  },
  {
    id: 6,
    title: 'Interview feedback received',
    message: 'You received feedback from your interview at Razorpay. Tap to view the full report.',
    type: 'Interview Call',
    time: '3 days ago',
    read: true,
  },
]

const typeConfig = {
  'Job Alert': {
    badge: 'bg-sky-100 text-sky-700',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    dot: 'bg-sky-500',
    bg: 'from-sky-50 to-white',
  },
  'Interview Call': {
    badge: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    dot: 'bg-emerald-500',
    bg: 'from-emerald-50 to-white',
  },
  Message: {
    badge: 'bg-violet-100 text-violet-700',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    dot: 'bg-violet-500',
    bg: 'from-violet-50 to-white',
  },
}

const tabs = ['All', 'Job Alert', 'Interview Call', 'Message']

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All')
  const [items, setItems] = useState(allNotifications)

  const filtered = activeTab === 'All' ? items : items.filter((n) => n.type === activeTab)
  const unreadCount = items.filter((n) => !n.read).length

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })))
  const markRead = (id) => setItems(items.map((n) => n.id === id ? { ...n, read: true } : n))
  const dismiss = (id) => setItems(items.filter((n) => n.id !== id))

  return (
    <div className="min-h-screen bg-[#f4f9fc]">
      <EmployeeNavbar />

      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#317FA4] flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5">{unreadCount}</span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Stay updated with alerts, interviews and messages.</p>
          </div>
          {/* Removed 'Mark all as read' button as requested */}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 mb-4 sm:mb-6 scrollbar-hide">
          {tabs.map((tab) => {
            const count = tab === 'All' ? items.length : items.filter((n) => n.type === tab).length
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#3385AA] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3385AA] hover:text-[#3385AA]'
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d6eaf2] p-10 text-center shadow-sm">
            <div className="w-14 h-14 bg-[#eaf4f8] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">No notifications here</p>
            <p className="text-xs text-gray-400 mt-1">Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-2.5 sm:space-y-3">
            {filtered.map((item) => {
              const cfg = typeConfig[item.type]
              return (
                <article
                  key={item.id}
                  className={`relative bg-gradient-to-r ${cfg.bg} rounded-xl sm:rounded-2xl border ${item.read ? 'border-[#d6eaf2]' : 'border-[#3385AA]/30'} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
                >
                  {/* Unread indicator strip */}
                  {!item.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3385AA] rounded-l-xl sm:rounded-l-2xl" />
                  )}

                  <div className="px-4 sm:px-5 py-3.5 sm:py-4 ml-1">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center ${cfg.badge} mt-0.5`}>
                        {cfg.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 sm:justify-between mb-1">
                          <h2 className={`text-sm sm:text-base font-bold leading-tight ${item.read ? 'text-gray-700' : 'text-[#317FA4]'} pr-2`}>
                            {item.title}
                          </h2>
                          <div className="flex items-center gap-2 sm:flex-shrink-0">
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold ${cfg.badge}`}>
                              {item.type}
                            </span>
                            {!item.read && (
                              <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0 sm:hidden`} />
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {item.message}
                        </p>

                        <div className="flex items-center justify-between mt-2 sm:mt-2.5">
                          <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.time}
                          </span>

                          <div className="flex items-center gap-2">
                            {!item.read && (
                              <button
                                onClick={() => markRead(item.id)}
                                className="text-[10px] sm:text-xs text-[#3385AA] font-semibold hover:underline"
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={() => dismiss(item.id)}
                              className="p-1 text-gray-300 hover:text-red-400 transition-colors rounded"
                              title="Dismiss"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

