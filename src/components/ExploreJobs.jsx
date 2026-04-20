import { useState } from "react";
import { Link } from "react-router-dom";

const domains = [
  {
    id: 1,
    title: "Product Companies Jobs",
    subtitle: "FAANG, unicorns & product-led orgs",
    count: "2,400+ openings",
    to: "/companies/product",
    color: "#3385AA",
    lightBg: "#EBF5FB",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#EBF5FB" />
        <rect x="14" y="18" width="20" height="14" rx="3" stroke="#3385AA" strokeWidth="2.2" />
        <path d="M19 18v-2a5 5 0 0 1 10 0v2" stroke="#3385AA" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24" cy="25" r="2.5" fill="#3385AA" />
        <path d="M24 27.5v2" stroke="#3385AA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    badge: "Highest Paid",
    badgeColor: "#10B981",
  },
  {
    id: 2,
    title: "E-Commerce Companies Jobs",
    subtitle: "Retail tech, logistics & marketplace",
    count: "1,800+ openings",
    to: "/companies",
    color: "#7C3AED",
    lightBg: "#F5F3FF",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#F5F3FF" />
        <path d="M13 15h2l2.5 11.5h11L31 19H17" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20.5" cy="31.5" r="1.5" fill="#7C3AED" />
        <circle cx="28.5" cy="31.5" r="1.5" fill="#7C3AED" />
        <path d="M17 22h14" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    badge: "Fast Growing",
    badgeColor: "#7C3AED",
  },
  {
    id: 3,
    title: "Fintech/EdTech Companies Jobs",
    subtitle: "Payments, insurance & online learning",
    count: "1,200+ openings",
    to: "/companies/fintech",
    color: "#F59E0B",
    lightBg: "#FFFBEB",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="22" fill="#FFFBEB" />
        <rect x="13" y="22" width="22" height="13" rx="2.5" stroke="#F59E0B" strokeWidth="2.2" />
        <path d="M17 22v-4a7 7 0 0 1 14 0v4" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M21 28h6M24 26v4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    badge: "High Demand",
    badgeColor: "#F59E0B",
  },
];

export default function ExploreJobs() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      className="w-full py-16 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            <span className="font-black">Explore jobs</span>{" "}
            <span className="font-normal" style={{ color: "#3385AA" }}>based on trending domains</span>
          </h2>
          <div className="mt-3 mx-auto" style={{ width: 56, height: 3, borderRadius: 2, background: "linear-gradient(90deg,#3385AA,#2a6d8f)" }} />
          <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
            Discover thousands of opportunities across India's fastest-growing sectors
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((d) => {
            const isHov = hovered === d.id;
            return (
              <Link
                key={d.id}
                to={d.to}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                className="group block relative bg-white rounded-2xl overflow-hidden"
                style={{
                  boxShadow: isHov
                    ? `0 20px 40px -8px ${d.color}30, 0 4px 16px rgba(0,0,0,0.08)`
                    : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
                  transform: isHov ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  border: `1.5px solid ${isHov ? d.color + "50" : "#E5E7EB"}`,
                  textDecoration: "none",
                }}
              >
                {/* Top color bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg,${d.color},${d.color}88)`,
                    transform: isHov ? "scaleX(1)" : "scaleX(0.6)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease",
                  }}
                />

                <div className="p-6">
                  {/* Icon + Badge row */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Animated icon container */}
                    <div
                      className="relative"
                      style={{
                        transform: isHov ? "rotate(-6deg) scale(1.1)" : "rotate(0deg) scale(1)",
                        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    >
                      {d.icon}
                    </div>
                    {/* Badge */}
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: d.badgeColor + "18",
                        color: d.badgeColor,
                        border: `1px solid ${d.badgeColor}30`,
                      }}
                    >
                      {d.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <h3
                    className="text-lg font-extrabold leading-snug mb-1 transition-colors duration-300"
                    style={{ color: isHov ? d.color : "#111827" }}
                  >
                    {d.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{d.subtitle}</p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-bold flex items-center gap-1"
                      style={{ color: d.color }}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      {d.count}
                    </span>

                    {/* View all jobs + arrow */}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold transition-colors duration-300"
                        style={{ color: d.color }}
                      >
                        View all jobs
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isHov ? d.color : d.lightBg,
                          transform: isHov ? "translateX(3px)" : "translateX(0)",
                        }}
                      >
                        <svg
                          className="w-3.5 h-3.5 transition-colors duration-300"
                          fill="none"
                          stroke={isHov ? "#fff" : d.color}
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated bg blob on hover */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -24,
                    right: -24,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: d.color + "0d",
                    transform: isHov ? "scale(1.6)" : "scale(1)",
                    transition: "transform 0.5s ease",
                    pointerEvents: "none",
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
