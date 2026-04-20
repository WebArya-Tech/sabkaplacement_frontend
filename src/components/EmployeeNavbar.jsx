import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard',   to: '/employee/dashboard'   },
  { label: 'Post Job',    to: '/employee/post-job'    },
  { label: 'Manage Jobs', to: '/employee/manage-jobs' },
]

export default function EmployeeNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const notifications = [
    { id: 1, text: '3 new applications received', time: '5 min ago', unread: true },
    { id: 2, text: 'Interview scheduled with Rahul', time: '1 hr ago', unread: true },
    { id: 3, text: 'Your job post is live', time: '3 hrs ago', unread: false },
  ]
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="w-full bg-white border-b border-[#d6eaf2] shadow-sm sticky top-0 z-40 m-0 p-0">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/employee/dashboard" className="flex items-center flex-shrink-0">
          <img src="/logo.jpeg" alt="Sabka Placement" className="h-11 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.to)
            return (
              <li key={item.to}>
                <Link to={item.to}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-[#317FA4] bg-[#eaf4f8]"
                      : "text-gray-600 hover:text-[#317FA4] hover:bg-[#f4fafc]"
                  }`}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right — Notif + Logout */}
        <div className="hidden md:flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => setNotifOpen(p => !p)}
              className="relative p-2 rounded-xl hover:bg-[#eaf4f8] transition-colors">
              <svg className="w-5 h-5 text-[#317FA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#d6eaf2] z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#d6eaf2] flex items-center justify-between bg-[#f8fbfd]">
                    <h3 className="text-sm font-bold text-[#317FA4]">Notifications</h3>
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  </div>
                  <ul>
                    {notifications.map(n => (
                      <li key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-[#f7fbfd] transition-colors ${n.unread ? 'bg-[#f0f8fc]' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-[#3385AA]' : 'bg-gray-300'}`} />
                          <div>
                            <p className="text-sm text-gray-800 font-medium">{n.text}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2.5 text-center bg-[#f8fbfd]">
                    <Link to="/employee/notifications" onClick={() => setNotifOpen(false)} className="text-xs font-semibold text-[#3385AA] hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#eaf4f8] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#317FA4] to-[#3385AA] flex items-center justify-center text-white select-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#d6eaf2] z-50 overflow-hidden">
                  {/* Profile header */}
                  <div className="px-4 py-3 bg-[#f8fbfd] border-b border-[#d6eaf2] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#317FA4] to-[#3385AA] flex items-center justify-center text-white select-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#317FA4]">My Company</p>
                      <p className="text-xs text-gray-500">Employer Account</p>
                    </div>
                  </div>
                  {/* Links */}
                  <div className="p-2">
                    <Link to="/employee/company-profile" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#eaf4f8] hover:text-[#317FA4] transition-colors">
                      <svg className="w-4 h-4 text-[#3385AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Company Profile
                    </Link>
                  </div>
                  {/* Logout */}
                  <div className="p-2 border-t border-[#d6eaf2]">
                    <button
                      onClick={() => { setProfileOpen(false); navigate('/') }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button type="button" onClick={() => setMenuOpen(p => !p)}
          className="md:hidden p-2 rounded-xl hover:bg-[#eaf4f8] transition-colors">
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#d6eaf2] bg-white px-4 py-3 space-y-1 shadow-lg">
          {/* Notification Bell for Mobile */}
          <div className="flex items-center justify-end mb-2">
            <button onClick={() => setNotifOpen(p => !p)}
              className="relative p-2 rounded-xl hover:bg-[#eaf4f8] transition-colors">
              <svg className="w-5 h-5 text-[#317FA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          {/* Notification Dropdown for Mobile */}
          {notifOpen && (
            <div className="w-full bg-white rounded-2xl shadow-xl border border-[#d6eaf2] z-50 overflow-hidden mb-2">
              <div className="px-4 py-3 border-b border-[#d6eaf2] flex items-center justify-between bg-[#f8fbfd]">
                <h3 className="text-sm font-bold text-[#317FA4]">Notifications</h3>
                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">{unreadCount} new</span>
              </div>
              <ul>
                {notifications.map(n => (
                  <li key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-[#f7fbfd] transition-colors ${n.unread ? 'bg-[#f0f8fc]' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-[#3385AA]' : 'bg-gray-300'}`} />
                      <div>
                        <p className="text-sm text-gray-800 font-medium">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2.5 text-center bg-[#f8fbfd]">
                <Link to="/employee/notifications" onClick={() => { setNotifOpen(false); setMenuOpen(false); }} className="text-xs font-semibold text-[#3385AA] hover:underline">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
          {navItems.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors block ${
                isActive(item.to)
                  ? 'text-[#317FA4] bg-[#eaf4f8]'
                  : 'text-gray-700 hover:text-[#317FA4] hover:bg-[#f4fafc]'
              }`}>
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#d6eaf2] space-y-1">
            <Link to="/employee/company-profile" onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#eaf4f8] hover:text-[#317FA4] transition-colors">
              Company Profile
            </Link>
            <button onClick={() => { setMenuOpen(false); navigate('/') }}
              className="block w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
