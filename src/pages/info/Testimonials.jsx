import { useState } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      image: "👩‍💼",
      category: "job-seeker",
      rating: 5,
      text: "I found my dream job in just 2 weeks! The platform is so easy to use and completely free. I applied to multiple companies without any cost. Highly recommend!",
      company: "Google",
    },
    {
      id: 2,
      name: "Rahul Verma",
      role: "HR Manager at TechCorp",
      image: "👨‍💼",
      category: "employer",
      rating: 5,
      text: "As an employer, this platform has been a game-changer. We've hired 15+ employees without paying any recruitment fees. The quality of candidates is excellent!",
      company: "TechCorp Solutions",
    },
    {
      id: 3,
      name: "Anjali Patel",
      role: "Data Scientist at Microsoft",
      image: "👩‍🔬",
      category: "job-seeker",
      rating: 5,
      text: "After months of searching on paid platforms, I found this gem. Applied to 20+ companies for free and got 3 offers! Now working at Microsoft. Thank you!",
      company: "Microsoft",
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Founder at StartupXYZ",
      image: "👨‍💻",
      category: "employer",
      rating: 5,
      text: "Started posting jobs here as a startup with limited budget. Not only did we find amazing talent, but the entire process was free. Built our whole team of 10!",
      company: "StartupXYZ",
    },
    {
      id: 5,
      name: "Sneha Reddy",
      role: "UX Designer at Amazon",
      image: "👩‍🎨",
      category: "job-seeker",
      rating: 5,
      text: "The resume builder helped me create a professional CV. Got interview calls within days. This platform truly cares about helping people find jobs.",
      company: "Amazon",
    },
    {
      id: 6,
      name: "Arjun Mehta",
      role: "CTO at InnovateCo",
      image: "👨‍🏫",
      category: "employer",
      rating: 5,
      text: "We've tried all the major job portals. This one gives us the best ROI because it's FREE! Quality candidates, easy posting, and great support.",
      company: "InnovateCo",
    },
    {
      id: 7,
      name: "Kavya Nair",
      role: "Marketing Manager at Flipkart",
      image: "👩‍💼",
      category: "job-seeker",
      rating: 5,
      text: "Career change was daunting, but the resources here made it easier. Landed a marketing role at Flipkart. The interview tips were incredibly helpful!",
      company: "Flipkart",
    },
    {
      id: 8,
      name: "Rohan Gupta",
      role: "Full Stack Developer at Paytm",
      image: "👨‍💻",
      category: "job-seeker",
      rating: 5,
      text: "Fresh graduate here. No money for premium job portals. This platform gave me equal opportunity. Got placed at Paytm with 8 LPA package!",
      company: "Paytm",
    },
    {
      id: 9,
      name: "Deepika Iyer",
      role: "Talent Acquisition Lead",
      image: "👩‍💼",
      category: "employer",
      rating: 5,
      text: "Managing recruitment for 50+ positions annually. This platform saves us lakhs in recruitment costs while delivering top-tier talent consistently.",
      company: "Wipro",
    },
  ];

  const filteredTestimonials = activeCategory === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-16">
      {/* Hero Section */}
        <CopyNavbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full shadow-lg mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-bold">SUCCESS STORIES</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Success Stories & Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how thousands of job seekers and employers achieved their goals using our free platform
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Happy Job Seekers" },
              { number: "5,000+", label: "Employers" },
              { number: "95%", label: "Success Rate" },
              { number: "₹0", label: "Cost to Users" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Stories
          </button>
          <button
            onClick={() => setActiveCategory("job-seeker")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeCategory === "job-seeker"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            👤 Job Seekers
          </button>
          <button
            onClick={() => setActiveCategory("employer")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeCategory === "employer"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🏢 Employers
          </button>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{testimonial.image}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic mb-4">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified User
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Testimonials CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Watch Success Stories</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Hear directly from job seekers who transformed their careers and employers who built amazing teams using our platform.
              </p>
              <div className="space-y-4">
                {[
                  "Real stories from real users",
                  "Video interviews and testimonials",
                  "Career transformation journeys",
                  "Employer success stories",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                ▶️ Watch Videos
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-10 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-xl font-bold">Featured Video</p>
                <p className="text-blue-100 mt-2">How Priya landed her dream job at Google</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Share Your Success Story!</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Did you find your dream job or hire amazing talent through our platform? 
            We'd love to hear from you and inspire others!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-green-600 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-xl">
              Submit Your Story
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300">
              Give Feedback
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Testimonials;

