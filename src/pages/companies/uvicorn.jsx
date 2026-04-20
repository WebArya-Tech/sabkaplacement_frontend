import { useState, useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import CopyNavbar from "../../components copy/Navbar";

const categories = [
  { id: 1, label: "Healthcare", count: "701 Companies" },
  { id: 2, label: "Unicorns", count: "94 Companies", selected: true },
  { id: 3, label: "B2C", count: "2.5K+ Companies" },
  { id: 4, label: "Internet", count: "246 Companies" },
  { id: 5, label: "Manufacturing", count: "1.1K+ Companies" },
  { id: 6, label: "FinTech", count: "312 Companies" },
  { id: 7, label: "EdTech", count: "189 Companies" },
  { id: 8, label: "SaaS", count: "430 Companies" },
];

const companies = [
  {
    id: 1,
    name: "Mamaearth",
    rating: 3.8,
    reviews: "258 reviews",
    tags: ["Startup", "Beauty & Personal Care"],
    color: "#e67e22",
    initials: "ME",
    bgColor: "#fff3e0",
    activeJobs: 42,
  },
  {
    id: 2,
    name: "BRND.ME",
    rating: 3.7,
    reviews: "199 reviews",
    tags: ["Startup", "Internet", "Unicorn"],
    founded: "2021",
    color: "#8B6914",
    initials: "BM",
    bgColor: "#fdf6e3",
    activeJobs: 18,
  },
  {
    id: 3,
    name: "Swiggy",
    rating: 3.7,
    reviews: "5.5K+ reviews",
    tags: ["Startup", "Internet", "Graduated Unicorn"],
    color: "#ff6600",
    initials: "SW",
    bgColor: "#fff3eb",
    activeJobs: 127,
  },
  {
    id: 4,
    name: "Razorpay",
    rating: 3.4,
    reviews: "701 reviews",
    tags: ["FinTech / Payments", "Soonicorn", "Unicorn"],
    color: "#3395FF",
    initials: "RP",
    bgColor: "#e8f2ff",
    activeJobs: 89,
  },
  {
    id: 5,
    name: "Glance",
    rating: 3.3,
    reviews: "117 reviews",
    tags: ["Startup", "Internet", "Unicorn"],
    founded: "2017",
    color: "#e91e8c",
    initials: "GL",
    bgColor: "#fce4f3",
    activeJobs: 34,
  },
  {
    id: 6,
    name: "Moglix",
    rating: 3.3,
    reviews: "686 reviews",
    tags: ["Startup", "Internet", "Unicorn"],
    founded: "2015",
    color: "#c0392b",
    initials: "MX",
    bgColor: "#fdecea",
    activeJobs: 56,
  },
  {
    id: 7,
    name: "Branch Metrics",
    rating: 2.8,
    reviews: "7 reviews",
    tags: ["Startup", "Advertising & Marketing"],
    color: "#1a7a4a",
    initials: "BM",
    bgColor: "#e8f5ee",
    activeJobs: 12,
  },
  {
    id: 8,
    name: "Cardekho.Com",
    rating: 3.6,
    reviews: "991 reviews",
    tags: ["Corporate", "Internet", "Unicorn"],
    color: "#e84118",
    initials: "CD",
    bgColor: "#fdecea",
    activeJobs: 74,
  },
  {
    id: 9,
    name: "Groww",
    rating: 3.6,
    reviews: "342 reviews",
    tags: ["Startup", "FinTech / Payments", "Unicorn"],
    color: "#00b386",
    initials: "GW",
    bgColor: "#e0f7f2",
    activeJobs: 63,
  },
  {
    id: 10,
    name: "Flipkart",
    rating: 3.9,
    reviews: "12.8K+ reviews",
    tags: ["Corporate", "Internet", "Graduated Unicorn"],
    color: "#2874f0",
    initials: "FK",
    bgColor: "#e8effd",
    activeJobs: 312,
  },
  {
    id: 11,
    name: "Incred",
    rating: 3.9,
    reviews: "490 reviews",
    tags: ["Corporate", "NBFC", "Soonicorn", "Unicorn"],
    color: "#6c3483",
    initials: "IC",
    bgColor: "#f4ecfb",
    activeJobs: 28,
  },
  {
    id: 12,
    name: "Livspace",
    rating: 3.3,
    reviews: "1.7K+ reviews",
    tags: ["Startup", "Architecture / Interior Design"],
    color: "#d35400",
    initials: "LS",
    bgColor: "#fdf0e6",
    activeJobs: 45,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400 text-sm">★</span>
      <span className="text-sm font-semibold text-gray-800">{rating}</span>
    </div>
  );
}

function CompanyLogo({ company }) {
  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm"
      style={{ backgroundColor: company.bgColor, color: company.color, border: `2px solid ${company.color}22` }}
    >
      {company.initials}
    </div>
  );
}

function CompanyCard({ company }) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 relative overflow-hidden group"
    >
      {/* Subtle hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(135deg, #f0f7ff 0%, transparent 60%)" }}
      />

      <div className="flex items-start gap-3 relative">
        <CompanyLogo company={company} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-[15px] leading-tight truncate">{company.name}</h3>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={company.rating} />
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-500 text-xs">{company.reviews}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {company.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: tag === "Unicorn" ? "#eef2ff" : tag === "Graduated Unicorn" ? "#f0fdf4" : tag === "Soonicorn" ? "#fff7ed" : "#f8fafc",
                  color: tag === "Unicorn" ? "#4f46e5" : tag === "Graduated Unicorn" ? "#16a34a" : tag === "Soonicorn" ? "#ea580c" : "#64748b",
                  borderColor: tag === "Unicorn" ? "#c7d2fe" : tag === "Graduated Unicorn" ? "#bbf7d0" : tag === "Soonicorn" ? "#fed7aa" : "#e2e8f0",
                }}
              >
                {tag}
              </span>
            ))}
            {company.founded && (
              <span className="text-xs px-2 py-0.5 rounded-full border bg-gray-50 text-gray-500 border-gray-200">
                Founded: {company.founded}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-medium text-blue-600">{company.activeJobs} active jobs</span>
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Unicorn() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 5
      );
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -250 : 250, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-[70px] md:pt-[80px]">
      <CopyNavbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Companies actively hiring</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Discover top companies & explore open roles</p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              <span>Filters</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Category Slider */}
        <div className="relative mb-4 sm:mb-6">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center transition-all duration-200 ${
              canScrollLeft ? "opacity-100 hover:shadow-lg cursor-pointer" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-0 sm:px-10 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl border-2 text-left transition-all duration-200 min-w-[130px] sm:min-w-[150px] ${
                  selectedCategory === cat.id
                    ? "border-gray-800 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold text-xs sm:text-sm ${selectedCategory === cat.id ? "text-gray-900" : "text-gray-700"}`}>
                    {cat.label}
                  </span>
                  {selectedCategory === cat.id && (
                    <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center ml-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-medium text-blue-600">{cat.count}</span>
                  <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center transition-all duration-200 ${
              canScrollRight ? "opacity-100 hover:shadow-lg cursor-pointer" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Results count */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
          Showing <span className="text-gray-900 font-semibold">94 companies</span>
        </p>

        {/* Company Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {companies.map((company, index) => (
            <div
              key={company.id}
              style={{
                animationDelay: `${index * 60}ms`,
                animation: "fadeSlideUp 0.4s ease both",
              }}
            >
              <CompanyCard company={company} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all duration-200 hover:shadow-md active:scale-95">
            View more companies
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <Footer />
    </div>
  );
}
