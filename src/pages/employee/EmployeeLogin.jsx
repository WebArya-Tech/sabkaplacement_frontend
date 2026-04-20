import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/EmployeeFooter'

export default function EmployeeLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/employee/home')
  }

  return (
    <div className="min-h-screen bg-[#f0f6f9]">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white border border-[#d6eaf2] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#317FA4] text-center">Employer Login</h1>
          <p className="text-sm text-gray-500 text-center mt-1">Employee portal access ke liye login karein</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA]"
                placeholder="hr@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3385AA]"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3385AA] hover:bg-[#317FA4] text-white font-bold py-2.5 rounded-lg transition-colors"
            >
              Login to Employee Panel
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
