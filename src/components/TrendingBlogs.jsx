import { useRef, useState } from "react";

const blogs = [
  {
    id: 1,
    title: "TCS Internship 2026: Eligibility, Stipend & Apply",
    category: "Internship",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&q=80",
  },
  {
    id: 2,
    title: "TCS Interview Questions for Freshers with Answers",
    category: "Interview Tips",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
  },
  {
    id: 3,
    title: "Declaration in Resume: Format & Examples 2026",
    category: "Resume Tips",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
  },
  {
    id: 4,
    title: "Top 10 High Paying Jobs in India for Freshers",
    category: "Career Guide",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
  },
  {
    id: 5,
    title: "How to Write a Professional Resume in 2026",
    category: "Resume Tips",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    id: 6,
    title: "Wipro Recruitment 2026: Eligibility & Process",
    category: "Placement",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    id: 7,
    title: "Infosys InfyTQ 2026: Registration, Syllabus & Tips",
    category: "Campus",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
  },
  {
    id: 8,
    title: "Soft Skills Every Fresher Must Have in 2026",
    category: "Skills",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
];

export default function TrendingBlogs() {
  const scrollRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 330, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#f5f7fb] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Centered heading only */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl tracking-tight text-gray-600">
            Trending&nbsp;
            <span className="font-extrabold text-gray-900">Blogs</span>
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="hidden sm:flex absolute left-0 z-10 h-11 w-11 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-200 hover:bg-[#3385AA] hover:text-white hover:scale-110"
            style={{ top: "100px", transform: "translateY(-50%) translateX(-50%)" }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="hidden sm:flex absolute right-0 z-10 h-11 w-11 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-200 hover:bg-[#3385AA] hover:text-white hover:scale-110"
            style={{ top: "100px", transform: "translateY(-50%) translateX(50%)" }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-3 px-1 sm:px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {blogs.map((blog) => {
              const isHovered = hoveredId === blog.id;
              return (
                <div
                  key={blog.id}
                  onMouseEnter={() => setHoveredId(blog.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white"
                  style={{
                    width: "clamp(240px, 75vw, 300px)",
                    boxShadow: isHovered ? "0 16px 40px rgba(51,133,170,0.22)" : "0 2px 12px rgba(0,0,0,0.08)",
                    transform: isHovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
                    transition: "transform 0.32s cubic-bezier(.4,0,.2,1), box-shadow 0.32s cubic-bezier(.4,0,.2,1)",
                    border: isHovered ? "1.5px solid rgba(51,133,170,0.3)" : "1.5px solid transparent",
                  }}
                >
                  <div className="overflow-hidden" style={{ height: "180px" }}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                      style={{ transform: isHovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.5s cubic-bezier(.4,0,.2,1)" }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold leading-snug" style={{ color: isHovered ? "#3385AA" : "#111827", transition: "color 0.2s ease" }}>
                      {blog.title}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-400">{blog.category}</span>
                      <span className="text-xs font-semibold" style={{ color: isHovered ? "#3385AA" : "#d1d5db", transition: "color 0.2s ease" }}>Read more →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
