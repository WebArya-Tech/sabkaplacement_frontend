import { useEffect, useState } from 'react'
import TrainerNavbar from '../../components/TrainerNavbar'
import Footer from '../../components/EmployeeFooter'
import { getTrainerProfile, updateTrainerProfile } from '../../services/trainerApi'

const typeColors = {
  assignment: 'bg-purple-100 text-purple-700 border-purple-200',
  enrollment:  'bg-[#d0eaf5] text-[#317FA4] border-[#b8ddef]',
  rating:      'bg-amber-100 text-amber-700 border-amber-200',
  message:     'bg-blue-100 text-blue-700 border-blue-200',
}
const typeLabels = { assignment: 'Assignment', enrollment: 'Enrollment', rating: 'Rating', message: 'Message' }

export default function TrainerNotifications() {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter]               = useState('all')
  const [showUnread, setShowUnread]       = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getTrainerProfile()
      .then((profile) => setNotifications(Array.isArray(profile.notifications) ? profile.notifications : []))
      .catch((err) => setError(err.message || 'Failed to load notifications'))
  }, [])

  const unreadCount = notifications.filter(n => n.unread).length

  const displayed = notifications.filter(n => {
    if (showUnread && !n.unread) return false
    if (filter !== 'all' && n.type !== filter) return false
    return true
  })

  const persist = async (next) => {
    setNotifications(next)
    try {
      await updateTrainerProfile({ notifications: next })
    } catch (err) {
      setError(err.message || 'Failed to update notifications')
    }
  }

  const markAllRead = () => persist(notifications.map(n => ({ ...n, unread: false })))
  const markRead    = (id) => persist(notifications.map(n => (n._id || n.id) === id ? { ...n, unread: false } : n))
  const deleteN     = (id) => persist(notifications.filter(n => (n._id || n.id) !== id))

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <TrainerNavbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#317FA4] via-[#317FA4] to-[#3385AA] py-8 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Notifications</h1>
            <p className="text-white/70 text-sm">
              {unreadCount > 0 ? <><span className="text-white font-bold">{unreadCount}</span> unread notifications</> : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl border border-white/20 transition-all">
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-[#d6eaf2] shadow-sm p-4 mb-5 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {['all','assignment','enrollment','rating','message'].map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${filter === t ? 'bg-[#317FA4] text-white border-[#317FA4]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                {t === 'all' ? 'All' : typeLabels[t]}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer select-none">
            <div onClick={() => setShowUnread(v => !v)}
              className={`w-9 h-5 rounded-full transition-all cursor-pointer flex items-center px-0.5 ${showUnread ? 'bg-[#eaf4f9]0' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${showUnread ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            Unread only
          </label>
        </div>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
        {/* Notification list */}
        {displayed.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d6eaf2] p-12 text-center">
            <p className="text-4xl mb-3">🔔</p>
            <p className="text-gray-500 text-sm font-semibold">No notifications here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map(n => (
              <div key={n._id || n.id}
                className={`bg-white rounded-2xl border shadow-sm px-4 py-3.5 flex gap-4 items-start group transition-all hover:shadow-md ${n.unread ? 'border-[#b8ddef] bg-[#eaf4f9]/30' : 'border-[#d6eaf2]'}`}>
                {/* Unread dot */}
                <div className="flex-shrink-0 mt-1 relative">
                  <span className="text-xl leading-none">{n.icon}</span>
                  {n.unread && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#eaf4f9]0 rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-xs font-bold px-2 py-0.5 rounded-full border ${typeColors[n.type]}`}>{typeLabels[n.type]}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                  <p className="text-sm font-bold text-[#317FA4]">{n.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{n.desc}</p>
                </div>
                <div className="flex-shrink-0 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {n.unread && (
                    <button onClick={() => markRead(n._id || n.id)} title="Mark as read"
                      className="w-7 h-7 rounded-lg bg-[#eaf4f9] hover:bg-[#d0eaf5] text-[#3385AA] flex items-center justify-center transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </button>
                  )}
                  <button onClick={() => deleteN(n._id || n.id)} title="Delete"
                    className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
