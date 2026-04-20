import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import CopyNavbar from "../../components copy/Navbar";

const ResumeQuality = () => {
  // Benefits comparison data
  const benefits = [
    { feature: 'Apply to Jobs on Sabkaplacement with resume', free: true, paid: true },
    { feature: 'Detailed resume analysis to know your strengths', free: false, paid: true },
    { feature: 'Tips to craft error-free resume to impress recruiters', free: false, paid: true },
    { feature: 'Know gaps and improvement areas from Sabkaplacement experts', free: false, paid: true },
    { feature: 'A new handwritten resume from our professional writers', free: false, paid: false },
    { feature: 'Guaranteed Interview call or shortlist from recruiters', free: false, paid: false }
  ];

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: 'Upload Your Resume',
      description: 'After payment confirmation, you will get a screen to upload your existing Resume'
    },
    {
      step: 2,
      title: 'Our Team will Analyze',
      description: 'An automated Tools will be run on your resume to highlight the gap.'
    },
    {
      step: 3,
      title: 'Detailed Report',
      description: 'We will send you a detailed report within 4 business days'
    }
  ];

  // Features data
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
        </svg>
      ),
      title: 'Visual Appeal',
      description: 'Is your resume neat and clearly organized?',
      detail: 'Recruiters spend an average of 7.4 seconds reviewing a resume, you need to ensure your resume manages to make an impression.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
        </svg>
      ),
      title: 'Resume Strategy',
      description: 'Does your resume\'s writing position you as a professional who will add value to an organization?',
      detail: ''
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
      ),
      title: 'Writing & Mechanics',
      description: 'Resume is easy to understand, no mistakes, should depict an achiever',
      detail: ''
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
        </svg>
      ),
      title: 'Detailed Report of your resume',
      description: 'Thorough analysis of your resume by highlighting specific areas of improvement',
      detail: ''
    }
  ];

  // Recommended services
  const recommendedServices = [
    {
      title: 'Visual Resume',
      description: 'Use Visuals to enhance and highlight your experience',
      detail: 'Get our experts to write your Resume. Over 95% satisfaction rate of Resumes created by Sabkaplacement Experts.',
      link: '/visual-resume',
      buttonText: 'KNOW MORE'
    },
    {
      title: 'Resume Display',
      description: 'Increase your profile views upto 3 times',
      detail: 'Get a Featured Profile and increase your visibility to recruiters up to 3 times. Profile enhancement by Sabkaplacement Expert for better response.',
      link: '/resume-builder',
      buttonText: 'KNOW MORE'
    }
  ];

  const price = 814;
  const originalPrice = 1017;
  const discountPercent = 20;

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

      {/* Promo Banner - Yellow */}
      <section className="bg-yellow-400 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-900 font-bold text-sm sm:text-base">
            Flat 20% OFF on All Services
          </p>
          <p className="text-gray-800 text-xs sm:text-sm font-medium">
            Promo code FASTJOB20, Limited Period Offer
          </p>
        </div>
      </section>

      {/* Hero Section - Blue Background */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Why does your resume require reviews?
              </h1>
              <p className="text-lg text-blue-100">
                Know the gaps in your resume and understand why you are missing out on opportunity.
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <div className="h-16 w-16 bg-blue-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content - Features */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Get your resume reviewed by Sabkaplacement experts and increase your chances of getting shortlisted
                </h2>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#47AEC7]">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{feature.description}</p>
                        {feature.detail && (
                          <p className="text-sm text-gray-500">{feature.detail}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Comparison Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Benefits of buying Resume Critique
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-2 sm:px-4 text-sm font-bold text-gray-700">Benefit/Advantage</th>
                          <th className="text-center py-4 px-2 sm:px-4 text-sm font-bold text-gray-700">Free User</th>
                          <th className="text-center py-4 px-2 sm:px-4 text-sm font-bold text-gray-700">Paid User</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benefits.map((benefit, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-2 sm:px-4 text-sm text-gray-700">{benefit.feature}</td>
                            <td className="py-4 px-2 sm:px-4 text-center">
                              {benefit.free ? (
                                <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-2 sm:px-4 text-center bg-blue-50">
                              {benefit.paid ? (
                                <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Price Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 lg:sticky lg:top-24">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">₹ {price}*</span>
                    <span className="text-gray-400 line-through text-lg">₹ {originalPrice}*</span>
                    <span className="text-[#47AEC7] font-bold text-sm">{discountPercent}%Off</span>
                  </div>
                  <p className="text-xs text-gray-500">(*Applicable Taxes may apply)</p>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg text-lg">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
            3 easy steps to get Review on your Resume
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
                    {step.step === 1 && (
                      <svg className="w-16 h-16 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {step.step === 2 && (
                      <svg className="w-16 h-16 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
                        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                      </svg>
                    )}
                    {step.step === 3 && (
                      <svg className="w-16 h-16 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {step.step}. {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Packs Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-[#47AEC7]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg">
                Know More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Services */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Recommended Services for you
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {recommendedServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700 font-medium mb-3">{service.description}</p>
                <p className="text-sm text-gray-600 mb-6">{service.detail}</p>
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 bg-blue-900 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition-colors"
                >
                  {service.buttonText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            ))}
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
                <span className="text-lg font-bold text-red-600">MasterCard</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-lg font-bold text-blue-900">VISA</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-sm font-bold text-[#47AEC7]">Verified by VISA</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded">
                <span className="text-sm font-bold text-gray-700">AMERICAN EXPRESS SafeKey</span>
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

export default ResumeQuality;



