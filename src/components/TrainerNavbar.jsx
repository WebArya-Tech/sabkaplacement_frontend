import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard',     to: '/trainer/dashboard',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'My Courses',    to: '/trainer/courses',       icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { label: 'Students',      to: '/trainer/students',      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
]

export default function TrainerNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const notifications = [
    { id: 1, text: '2 students submitted assignments', time: '10 min ago', unread: true },
    { id: 2, text: 'New student enrolled in React Basics', time: '1 hr ago', unread: true },
    { id: 3, text: 'Course "JS Advanced" got 5★ rating', time: '3 hrs ago', unread: false },
  ]
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="w-full bg-white border-b border-[#d6eaf2] shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/trainer/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.jpeg" alt="Sabka Placement" className="h-10 w-auto object-contain" />
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

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-2">

          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => { setNotifOpen(p => !p); setProfileOpen(false) }}
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
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-[#317FA4]' : 'bg-gray-300'}`} />
                          <div>
                            <p className="text-sm text-gray-800 font-medium">{n.text}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2.5 text-center bg-[#f8fbfd]">
                    <Link to="/trainer/notifications" onClick={() => setNotifOpen(false)} className="text-xs font-semibold text-[#3385AA] hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3385AA] to-[#317FA4] flex items-center justify-center text-white font-bold text-sm shadow-sm hover:shadow-md transition-shadow">
              T
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#d6eaf2] z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-[#eaf4f9] to-[#eaf4f9] border-b border-[#d6eaf2]">
                    <p className="text-sm font-bold text-[#317FA4]">Trainer Account</p>
                    <p className="text-xs text-gray-500 truncate">trainer@example.com</p>
                  </div>
                  <div className="py-1">
                    <Link to="/trainer/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eaf4f8] hover:text-[#317FA4] transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      My Profile
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={() => { setProfileOpen(false); navigate('/') }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(p => !p)}
          className="md:hidden p-2 rounded-xl hover:bg-[#eaf4f8] transition-colors">
          <svg className="w-5 h-5 text-[#317FA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#d6eaf2] bg-white px-4 py-3 space-y-1">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive(item.to)
                  ? 'text-[#317FA4] bg-[#eaf4f8]'
                  : 'text-gray-700 hover:text-[#317FA4] hover:bg-[#f4fafc]'
              }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </Link>
          ))}
          <Link to="/trainer/notifications" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#eaf4f8] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Notifications
          </Link>
          <Link to="/trainer/profile" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#eaf4f8] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            My Profile
          </Link>
          <button onClick={() => { setMenuOpen(false); navigate('/') }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 w-full transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}
