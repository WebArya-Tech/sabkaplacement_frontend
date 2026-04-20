import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import CopyNavbar from "../../components copy/Navbar";

const VisualResume = () => {
  const [selectedExperience, setSelectedExperience] = useState('0-1');
  const [selectedDelivery, setSelectedDelivery] = useState('regular');
  const [includeCoverLetter, setIncludeCoverLetter] = useState(true);

  // Experience levels for hero buttons
  const experienceLevels = [
    { id: 'entry', label: 'ENTRY-LEVEL', subtext: '(Exp: 0 to 3 years)' },
    { id: 'mid', label: 'MID-LEVEL', subtext: '(Exp: 3 to 8 years)' },
    { id: 'senior', label: 'SENIOR-LEVEL', subtext: '(Exp: 8 to 15 years)' },
    { id: 'executive', label: 'EXECUTIVE-LEVEL', subtext: '(Exp: 15 years and above)' }
  ];

  // Benefits comparison data
  const benefits = [
    { feature: 'CV visible to all recruiters', free: true, paid: true },
    { feature: 'Impress recruiters in 7.4 seconds', free: false, paid: true },
    { feature: 'Grab attention with visually appealing resume', free: false, paid: true },
    { feature: 'Highlight skills valued by recruiters in your domain', free: false, paid: true },
    { feature: 'Showcase your career path with attractive timelines', free: false, paid: true },
    { feature: 'Attractive & Recruiter-friendly resume format', free: false, paid: true },
    { feature: 'Error-free resume through 65+ quality checks*', free: false, paid: true },
    { feature: 'Get active customer support', free: false, paid: true }
  ];

  // Delivery options
  const deliveryOptions = [
    { id: 'regular', label: 'Regular 8 working days', price: 0 },
    { id: 'express', label: 'Express 4 working days', price: 1271 },
    { id: 'superExpress', label: 'Super Express 2 working days', price: 2203 }
  ];

  // Process steps
  const processSteps = [
    { step: 1, title: 'Resume writer gets assigned and calls you to discuss your expectations & asks for relevant visuals*' },
    { step: 2, title: 'You receive a mail asking for relevant visuals to be sent' },
    { step: 3, title: 'You Receive the First Draft, give feedback and resume writer send you the updated resume' },
    { step: 4, title: 'You approve resume draft and Your resume is sent for activation of other paid services if any.' }
  ];

  // Delivery time table
  const deliveryTimes = [
    { variant: 'Regular', firstVersion: '8 Working Days', finalDelivery: '14 Working Days' },
    { variant: 'Express', firstVersion: '4 Working Days', finalDelivery: '10 Working Days' },
    { variant: 'Super Express', firstVersion: '2 Working Days', finalDelivery: '6 Working Days' }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: 'The resume looks crispy and informative',
      content: 'The resume looks crispy and informative, thank you for the effort',
      author: 'Pradeep Satri',
      role: 'IT & Information Security'
    },
    {
      quote: 'Thanks for making it a near perfect resume',
      content: 'Thanks Pragya... You were truly expert and understand your job to the perfection...thanks for making it a near perfect resume....cant ask for more...We can consider this assignment as Completed to the...read more',
      author: 'Anonymous',
      role: 'Strategic & Top Management'
    },
    {
      quote: 'Absolutely fabulous job on creating the competitive resume of mine',
      content: 'As discussed, we are good to go with the format given. Thank you so much for your absolutely fabulous job on creating the competitive resume of mine.',
      author: 'Pradeep Dasari',
      role: 'Human Resources'
    }
  ];

  // Calculate total price
  const basePrice = 2204;
  const coverLetterPrice = includeCoverLetter ? 0 : 0;
  const deliveryPrice = deliveryOptions.find(opt => opt.id === selectedDelivery)?.price || 0;
  const totalPrice = basePrice + coverLetterPrice + deliveryPrice;

  return (
    <div className="min-h-screen">
      <CopyNavbar />
      {/* Floating Contact Buttons */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-white shadow-2xl rounded-l-xl border border-gray-200 overflow-hidden">
          <button className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition-colors border-b border-gray-200">
            <svg className="w-5 h-5 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-600 font-medium">TALK TO US</div>
              <div className="text-sm font-bold text-[#47AEC7]">1800-572-5557</div>
              <div className="text-xs text-gray-500">Toll Free</div>
            </div>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-700">CALL ME BACK</div>
            </div>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Stand out with a <span className="text-[#47AEC7]">Visually Appealing Resume</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Grab attention with a resume that reflects your job readiness
              </p>
              
              {/* Experience Level Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                {experienceLevels.map((level) => (
                  <button
                    key={level.id}
                    className="bg-white border-2 border-gray-300 rounded-lg p-3 sm:p-4 hover:border-[#47AEC7] hover:bg-[#e6f7fa] transition-all text-center group"
                  >
                    <div className="font-bold text-sm sm:text-base text-gray-800 group-hover:text-[#47AEC7]">
                      {level.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{level.subtext}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full">
                <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                    <div>
                      <div className="h-3 bg-white/80 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-white/60 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-2 bg-white/40 rounded"></div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-white/30 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                  SAP SAP FICO SAPERNA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Banner */}
      <div className="bg-yellow-400 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-900 font-semibold text-sm sm:text-base">
            1.51L Got shortlisted after using this service+
          </p>
        </div>
      </div>

      {/* Benefits + Pricing Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center lg:text-left">
            Benefits of buying Visual Resume service from Sabkaplacement
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="text-left px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-700">Benefits on Sabkaplacement</th>
                        <th className="text-center px-4 py-4 text-xs sm:text-sm font-semibold text-gray-700">Free Resume</th>
                        <th className="text-center px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-white bg-gray-800 rounded-t-lg">
                          Sabkaplacement Visual Resume
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {benefits.map((benefit, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700">{benefit.feature}</td>
                          <td className="px-4 py-4 text-center">
                            {benefit.free ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                              </svg>
                            )}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-center bg-[#e6f7fa]">
                            {benefit.paid ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                              </svg>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pricing Sidebar - Sticky on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Buy Visual Resume Service</h3>
                
                {/* Experience Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Choose Experience:</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5-8">5-8 Years</option>
                    <option value="8-15">8-15 Years</option>
                    <option value="15+">15+ Years</option>
                  </select>
                </div>

                {/* Price Display */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-gray-400 line-through text-lg">₹2,754</span>
                    <span className="text-3xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}*</span>
                  </div>
                  <p className="text-xs text-gray-500">*Applicable taxes may apply</p>
                </div>

                {/* Cover Letter Checkbox */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCoverLetter}
                      onChange={(e) => setIncludeCoverLetter(e.target.checked)}
                      className="w-4 h-4 text-[#47AEC7] border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Including free cover letter</span>
                  </label>
                </div>

                {/* Delivery Options */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Options:</label>
                  <div className="space-y-2">
                    {deliveryOptions.map((option) => (
                      <label key={option.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={selectedDelivery === option.id}
                          onChange={(e) => setSelectedDelivery(e.target.value)}
                          className="w-4 h-4 text-[#47AEC7] border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 flex-1">{option.label}</span>
                        {option.price > 0 && (
                          <span className="text-sm font-semibold text-gray-900">₹{option.price}</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buy Now Button */}
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">
                  Buy Now
                </button>

                {/* Offer Banner */}
                <div className="mt-4 bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center gap-2">
                  <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">OFFER</span>
                  <span className="text-sm text-[#47AEC7] font-medium">Buy combo to get upto 15% off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
            How our customers are getting benefitted?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 mb-6">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                  <circle cx="80" cy="80" r="70" stroke="#3b82f6" strokeWidth="8" fill="none"
                    strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <svg className="w-8 h-8 text-[#47AEC7] mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                    <div className="text-2xl font-bold text-gray-900">1.51L</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-medium">Got shortlisted after using this service*</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 mb-6">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                  <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="8" fill="none"
                    strokeDasharray="440" strokeDashoffset="100" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <div className="text-2xl font-bold text-gray-900">77.07%</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-medium">More recruiters show interest on Sabkaplacement created resumes*</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 mb-6">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                  <circle cx="80" cy="80" r="70" stroke="#f59e0b" strokeWidth="8" fill="none"
                    strokeDasharray="440" strokeDashoffset="22" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <svg className="w-8 h-8 text-amber-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-medium">Customers satisfaction rate</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-8">
            *The figure has been calculated till 28<sup>th</sup> Feb' 25. Next update will be done soon
          </p>
        </div>
      </section>

      {/* Features Section - Teal Background */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">In-house team of experts with over 10 years of experience</h3>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Visually appealing Resume format</h3>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Over 95% satisfaction rate</h3>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Multiple detailed telephonic consultations with Resume Writer</h3>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">First draft in 8 working days</h3>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Free Cover Letter to introduce yourself to prospective recruiters in an impactful and crisp manner</h3>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-white text-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              See Visual Resume Samples
            </button>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
            <span className="text-red-600">How</span> it works?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      {step.step === 1 && <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>}
                      {step.step === 2 && <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>}
                      {step.step === 3 && <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>}
                      {step.step === 4 && <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>}
                    </svg>
                  </div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    STEP {step.step}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Delivery Time Table */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Resume Delivery Time</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-red-600">First Version:</span> Time to delivery first cut
          </p>
          <p className="text-sm text-gray-600 mb-8">
            <span className="font-semibold text-[#47AEC7]">Expected Final Delivery:</span> Calculated based on 2 iterations
          </p>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Resume Variant</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">First Version</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Final Delivery*</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryTimes.map((time, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{time.variant}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{time.firstVersion}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{time.finalDelivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-xs text-gray-600">
              * <span className="font-semibold">Working Days:</span> Resume Writing team works from Mon - Fri
            </p>
            <p className="text-xs text-gray-600">
              ** We do not restrict iterations for any customer. On an average people take 2 iterations to finalize resume
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
            What our customers are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <span className="text-4xl text-red-500 font-serif">"</span>
                  <h3 className="text-lg font-bold text-gray-900 inline">{testimonial.quote}</h3>
                  <span className="text-4xl text-red-500 font-serif">"</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 text-[#47AEC7] font-semibold hover:text-[#3a9bb5] transition-colors border border-[#47AEC7] px-6 py-2 rounded-lg hover:bg-[#e6f7fa]">
              View all testimonials
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Services */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            <span className="text-pink-600">Recommended services</span> for you
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* RecruiterConnection */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">RecruiterConnection</h3>
              <p className="text-gray-600 mb-4">Expand your reach amongst recruiters</p>
              <p className="text-sm text-gray-600 mb-6">
                Search our database of recruiters and contact recruiters who hire in your domain/industry.
              </p>
              <Link to="/services" className="inline-block bg-[#1f6170] text-white font-semibold px-6 py-2 rounded hover:bg-[#2d8a9f] transition-colors">
                Find Recruiters
                <svg className="inline w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Jobs on Mail and SMS */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jobs on Mail and SMS</h3>
              <p className="text-gray-600 mb-4">Know about job openings in real time and be an early applicant</p>
              <p className="text-sm text-gray-600 mb-6">
                Let our experts send the best jobs for you on mail and sms. Be an early applicant and never miss out on any relevant job opening
              </p>
              <Link to="/services" className="inline-block bg-[#1f6170] text-white font-semibold px-6 py-2 rounded hover:bg-[#2d8a9f] transition-colors">
                Get Jobs on Mails and SMS
                <svg className="inline w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information Banner */}
      <section className="py-8 bg-[#e6f7fa] border-y border-[#d1f2f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-bold text-gray-900 mb-2">Delivery Information</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            If not availed with resume writing, these services will be processed 8 working days after we receive your updated resume. 
            In case we do not receive a response in 7 days, we will use your last updated Sabkaplacement resume. However, if you avail these 
            services with resume writing, these services will be processed within 8 working days after you approve your final resume.
          </p>
        </div>
      </section>

      {/* Value Packs Banner */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Get Benefits of all Job Search Services through our Value Packs
              </h2>
              <p className="text-gray-700 mb-6">
                Rank Higher in recruiter searches, Get instant relevant Jobs and reach out to recruiters to increase your chances of getting a Call!
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-6">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                  <svg className="w-5 h-5 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Resume Display</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                  <svg className="w-5 h-5 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Jobs on Mail and SMS</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                  <svg className="w-5 h-5 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Recruiter Connection</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">*GST Extra</p>
              <button className="bg-[#47AEC7] hover:bg-[#3a9bb5] text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg">
                Know More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Security */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Buy Safely with Sabkaplacement</p>
            <p className="text-xs text-gray-500 mb-4">We support secure payment methods</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-lg font-bold text-blue-900">MasterCard</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-lg font-bold text-blue-700">VISA</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-sm font-bold text-red-600">SafeKey</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-lg font-bold text-[#47AEC7]">Maestro</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-lg font-bold text-purple-600">RuPay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisualResume;



