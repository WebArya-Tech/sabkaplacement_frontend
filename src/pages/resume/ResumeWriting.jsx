import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const ResumeWriting = () => {
  const [selectedExperience, setSelectedExperience] = useState("0-1");
  const [selectedDelivery, setSelectedDelivery] = useState("regular");
  const [includeCoverLetter, setIncludeCoverLetter] = useState(false);

  const experienceLevels = [
    { id: "entry", label: "ENTRY-LEVEL", exp: "(Exp: 0 to 3 years)", color: "blue" },
    { id: "mid", label: "MID-LEVEL", exp: "(Exp: 3 to 8 years)", color: "blue" },
    { id: "senior", label: "SENIOR-LEVEL", exp: "(Exp: 8 to 15 years)", color: "blue" },
    { id: "executive", label: "EXECUTIVE-LEVEL", exp: "(Exp: 15 years and above)", color: "blue" }
  ];

  const benefits = [
    { feature: "CV visible to all recruiters", free: true, paid: true },
    { feature: "Impress recruiters with professionally written resume", free: false, paid: true },
    { feature: "Stand out as the right candidate for the job", free: false, paid: true },
    { feature: "Highlight skills valued by recruiters in your domain", free: false, paid: true },
    { feature: "Attractive & Recruiter-friendly resume format", free: false, paid: true },
    { feature: "Error-free resume through 65+ quality checks*", free: false, paid: true },
    { feature: "Get active customer support", free: false, paid: true },
    { feature: "Guaranteed interview call from Recruiters", free: false, paid: false }
  ];

  const deliveryOptions = [
    { id: "regular", label: "Regular 8 working days", price: 0 },
    { id: "express", label: "Express 4 working days", price: 102 },
    { id: "super", label: "Super Express 2 working days", price: 1864 }
  ];

  const steps = [
    { num: 1, title: "Resume writer gets assigned and calls you to discuss your expectations & asks for relevant details", icon: "👤" },
    { num: 2, title: "You Receive the First Draft and give feedback to resume writer", icon: "📄" },
    { num: 3, title: "Resume writer sends you resume draft", icon: "📃" },
    { num: 4, title: "You approve resume draft and your resume is sent for activation of other paid services if any", icon: "✅" }
  ];

  const deliveryTime = [
    { variant: "Regular", first: "8 Working Days", final: "14 Working Days" },
    { variant: "Express", first: "4 Working Days", final: "10 Working Days" },
    { variant: "Super Express", first: "2 Working Days", final: "6 Working Days" }
  ];

  const testimonials = [
    {
      title: "Accurate and appealing resume",
      text: "Thanks for helping me with an accurate and appealing resume. You were very supportive in communication of expectations and deliverables of the same in the resume.",
      name: "SADHANA SEWALAL VERMA",
      role: "Production & Manufacturing"
    },
    {
      title: "Helpful for me in writing an ATS compliant resume",
      text: "The service has been helpful for me in writing an ATS compliant resume and giving me job suggestions.",
      name: "Kaustuv Bhattacharya",
      role: "Content / Journalism"
    },
    {
      title: "Increasing chances of resume selection",
      text: "Good for increasing chances of resume selection",
      name: "Manish Himanshu",
      role: "IT Software - QA & Testing"
    }
  ];

  const basePrice = 1323;
  const coverLetterPrice = 0;
  const deliveryPrice = deliveryOptions.find(d => d.id === selectedDelivery)?.price || 0;
  const totalPrice = basePrice + (includeCoverLetter ? coverLetterPrice : 0) + deliveryPrice;

  return (
    <div className="min-h-screen">
      <CopyNavbar />
      {/* Floating Contact Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <button className="bg-white shadow-lg border border-gray-200 rounded-lg p-3 hover:shadow-xl transition-all flex flex-col items-center gap-1 group">
          <svg className="w-6 h-6 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-[10px] font-medium text-gray-600 group-hover:text-[#47AEC7]">TALK TO US</span>
          <span className="text-xs font-bold text-[#47AEC7]">1800-572-5557</span>
          <span className="text-[9px] text-gray-500">Toll Free</span>
        </button>
        <button className="bg-white shadow-lg border border-gray-200 rounded-lg p-3 hover:shadow-xl transition-all flex flex-col items-center gap-1 group">
          <svg className="w-6 h-6 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[10px] font-medium text-gray-600 group-hover:text-[#47AEC7]">CALL ME BACK</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#e6f7fa]0 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Enhance your Resume to <span className="text-[#47AEC7]">Impress Recruiters</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Showcase your job readiness with a professionally written resume
              </p>
              
              {/* Experience Level Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {experienceLevels.map((level) => (
                  <button
                    key={level.id}
                    className="bg-white border-2 border-[#47AEC7] hover:bg-[#e6f7fa] rounded-lg p-4 text-center transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="font-bold text-[#47AEC7] text-sm mb-1">{level.label}</div>
                    <div className="text-xs text-gray-600">{level.exp}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" 
                  alt="Professional Meeting" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-4">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xl font-bold text-gray-900">
              1.51L Got shortlisted after using this service*
            </p>
          </div>
        </div>
      </section>

      {/* Benefits & Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Benefits of buying Text Resume service from Sabkaplacement
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Table */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b">
                <div className="p-4 font-semibold text-gray-700">Benefits on Sabkaplacement</div>
                <div className="p-4 text-center font-semibold text-gray-700 border-l">Free Resume</div>
                <div className="p-4 text-center font-semibold text-white bg-gray-800 border-l">Sabkaplacement Text Resume</div>
              </div>
              
              {benefits.map((benefit, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="p-4 text-sm text-gray-700">{benefit.feature}</div>
                  <div className="p-4 border-l flex items-center justify-center">
                    {benefit.free ? (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="p-4 bg-[#e6f7fa] border-l flex items-center justify-center">
                    {benefit.paid ? (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buy Text Resume Service</h3>
              
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Choose Experience:</label>
                <select 
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#47AEC7]"
                >
                  <option value="0-1">0-1 Years</option>
                  <option value="1-3">1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5-8">5-8 Years</option>
                  <option value="8-15">8-15 Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>

              <div className="bg-[#e6f7fa] rounded-lg p-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500 line-through">₹1,653</span>
                  <span className="text-3xl font-bold text-[#47AEC7]">₹ {totalPrice.toLocaleString()}*</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">*Applicable taxes may apply</p>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeCoverLetter}
                    onChange={(e) => setIncludeCoverLetter(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#47AEC7] focus:ring-blue-500"
                  />
                  Including cover letter
                </label>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Delivery Options:</label>
                <div className="space-y-2">
                  {deliveryOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedDelivery === option.id}
                        onChange={(e) => setSelectedDelivery(e.target.value)}
                        className="w-4 h-4 text-[#47AEC7] focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                        {option.price > 0 && ` (₹${option.price})`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How our customers are getting benefitted?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-full flex items-center justify-center mb-4 relative">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">1.51L</div>
                  <div className="text-sm text-gray-600 mt-2">Got shortlisted after<br />using this service*</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-full flex items-center justify-center mb-4 relative">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">77.07%</div>
                  <div className="text-sm text-gray-600 mt-2">More recruiters<br />show interest on<br />Sabkaplacement created<br />resumes*</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-full flex items-center justify-center mb-4 relative">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600 mt-2">Customers<br />satisfaction rate</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-orange-600 mt-8 text-center">
            *The figure has been calculated till 28th Feb '26. Next update will be done soon
          </p>
        </div>
      </section>

      {/* Features Section - Teal Background */}
      <section className="bg-gradient-to-br from-teal-500 to-teal-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <div>
                  <h3 className="text-xl font-semibold mb-2">In-house team of experts with over 10 years of experience</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Attractive and Recruiter friendly resume format</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Over 95% satisfaction rate</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Introduce yourself to prospective recruiters with an impactful and crisp Cover Letter*</h3>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold shadow-lg transition-colors">
                View Entry Level Resume Samples
              </button>
            </div>
          </div>

          <p className="text-sm text-white/90">
            *Please note that the Cover Letter is delivered two days after you approve your resume
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-red-600 mb-12">How it works?</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="text-sm font-semibold text-gray-500 mb-3">STEP {step.num}</div>
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 border-4 border-gray-300 rounded-full flex items-center justify-center">
                <div className="text-5xl">{step.icon}</div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{step.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Time Table */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resume Delivery Time</h2>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">First Version:</span> Time to delivery first out
          </p>
          <p className="text-sm text-gray-600 mb-8">
            <span className="font-semibold">Expected Final Delivery:</span> Calculated based on 2 Iterations
          </p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b">
              <div className="p-4 font-semibold text-gray-700">Resume Variant</div>
              <div className="p-4 text-center font-semibold text-gray-700 border-l">First Version</div>
              <div className="p-4 text-center font-semibold text-gray-700 border-l">Final Delivery*</div>
            </div>
            
            {deliveryTime.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b last:border-b-0 hover:bg-gray-50">
                <div className="p-4">
                  <span className="text-[#47AEC7] font-medium">{item.variant}</span>
                </div>
                <div className="p-4 text-center border-l text-gray-700">{item.first}</div>
                <div className="p-4 text-center border-l text-gray-700">{item.final}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>* <span className="font-semibold">Working Days:</span> Resume Writing team works from Mon - Fri</p>
            <p>** We do not restrict iterations for any customer. On an average people take 2 iterations to finalize resume</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What our customers are saying</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl text-orange-400">"</span>
                <h3 className="font-bold text-gray-900 pt-2">{testimonial.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-[#47AEC7] hover:text-blue-700 font-semibold inline-flex items-center gap-2">
            View all testimonials
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Recommended Services */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-red-600 mb-12">Recommended services for you</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#47AEC7] mb-3">RecruiterConnection</h3>
              <p className="text-gray-600 mb-4">Expand your reach amongst recruiters</p>
              <p className="text-sm text-gray-500 mb-6">
                Search our database of recruiters and contact recruiters who hire in your domain/industry.
              </p>
              <button className="bg-[#1f6170] hover:bg-[#2d8a9f] text-white px-6 py-3 rounded font-semibold inline-flex items-center gap-2">
                Find Recruiters
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#47AEC7] mb-3">Jobs on Mail and SMS</h3>
              <p className="text-gray-600 mb-4">Know about job openings in real time and be an early applicant</p>
              <p className="text-sm text-gray-500 mb-6">
                Let our experts send the best jobs for you on mail and sms. Be an early applicant and never miss out on any relevant job opening
              </p>
              <button className="bg-[#1f6170] hover:bg-[#2d8a9f] text-white px-6 py-3 rounded font-semibold inline-flex items-center gap-2">
                Get Jobs on Mails and SMS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="bg-[#e6f7fa] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Delivery Information</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            If not availed with resume writing, these services will be processed 8 working days after we receive your updated resume. 
            In case we do not receive a response in 7 days, we will use your last updated Sabkaplacement resume. However, if you avail 
            these services with resume writing, these services will be processed within 8 working days after you approve your final resume.
          </p>
        </div>
      </section>

      {/* Value Packs Banner */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Benefits of all Job Search Services through our Value Packs
                </h2>
                <p className="text-gray-600">
                  Rank Higher in recruiter searches, Get instant relevant Jobs and reach out to recruiters to increase your chances of getting a Call!
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume Display
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Jobs on Mail and SMS
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-[#47AEC7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Recruiter Connection
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">*GST Extra</p>
              </div>
            </div>
            <button className="bg-[#47AEC7] hover:bg-[#3a9bb5] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-colors">
              Know More
            </button>
          </div>
        </div>
      </section>

      {/* Payment Security */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-700 font-semibold mb-4">Buy Safely with Sabkaplacement</p>
            <p className="text-sm text-gray-600 mb-4">We support secure payment methods</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img src="https://via.placeholder.com/80x30/FF6600/FFFFFF?text=MasterCard" alt="MasterCard" className="h-8" />
              <img src="https://via.placeholder.com/80x30/1A1F71/FFFFFF?text=Visa" alt="Visa" className="h-8" />
              <img src="https://via.placeholder.com/80x30/000000/FFFFFF?text=SafeKey" alt="SafeKey" className="h-8" />
              <img src="https://via.placeholder.com/80x30/0066CC/FFFFFF?text=Maestro" alt="Maestro" className="h-8" />
              <img src="https://via.placeholder.com/80x30/FF9900/FFFFFF?text=RuPay" alt="RuPay" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResumeWriting;


