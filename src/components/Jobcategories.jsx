import { useState, useRef, useCallback } from "react";

const levelColors = {
  Beginner: { bg: "#DCFCE7", color: "#16A34A" },
  Intermediate: { bg: "#FEF9C3", color: "#CA8A04" },
  Advanced: { bg: "#FEE2E2", color: "#DC2626" },
};

const categories = [
  {
    id: 1,
    title: "Data Analytics & BI",
    salary: "₹10 LPA",
    salaryGrowth: "24%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="2" y="13" width="4" height="8" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="8" y="9" width="4" height="12" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="14" y="5" width="4" height="16" rx="1" fill="currentColor"/>
        <rect x="20" y="1" width="4" height="20" rx="1" fill="currentColor"/>
        <path d="M3 10 L9 7 L15 4 L21 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    courses: [
      { name: "Python for Data Science", tag: "Most Popular", dot: "#4B8BBE", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=220&fit=crop&q=80", skills: ["NumPy & Pandas", "Matplotlib", "Statistical Analysis", "ML Basics"], duration: "8 weeks", level: "Beginner" },
      { name: "Tableau Mastery", tag: "Top Rated", dot: "#E87722", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop&q=80", skills: ["Dashboards", "Calculated Fields", "Data Blending", "LOD Expressions"], duration: "6 weeks", level: "Intermediate" },
      { name: "Microsoft Power BI", tag: "In Demand", dot: "#F2C811", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop&q=80", skills: ["Power Query", "DAX Formulas", "Data Modeling", "Reports"], duration: "6 weeks", level: "Beginner" },
      { name: "SQL for Analytics", tag: "Beginner", dot: "#4CAF50", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=220&fit=crop&q=80", skills: ["Joins & Subqueries", "Window Functions", "CTEs", "Query Optimization"], duration: "4 weeks", level: "Beginner" },
      { name: "Advanced Excel", tag: "Essential", dot: "#217346", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=220&fit=crop&q=80", skills: ["Pivot Tables", "VLOOKUP & INDEX", "Macros & VBA", "Chart Design"], duration: "3 weeks", level: "Beginner" },
      { name: "R for Statistics", tag: "Intermediate", dot: "#875FC1", img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=220&fit=crop&q=80", skills: ["ggplot2", "dplyr & tidyr", "Statistical Tests", "R Markdown"], duration: "7 weeks", level: "Intermediate" },
      { name: "Machine Learning A-Z", tag: "Trending", dot: "#FF6B35", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop&q=80", skills: ["Regression Models", "Classification", "Clustering", "Neural Networks"], duration: "10 weeks", level: "Advanced" },
      { name: "Google BigQuery", tag: "Cloud", dot: "#29B5E8", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=220&fit=crop&q=80", skills: ["SQL on BigQuery", "Data Pipelines", "Cloud Storage", "Looker Studio"], duration: "5 weeks", level: "Intermediate" },
    ],
    companies: [
      { name: "Deloitte", color: "#86BC25" }, { name: "KPMG", color: "#00338D" },
      { name: "Accenture", color: "#A100FF" }, { name: "Infosys", color: "#007CC3" },
      { name: "Gartner", color: "#E8001C" }, { name: "Nielsen", color: "#E4002B" },
    ],
  },
  {
    id: 2,
    title: "Data Engineering",
    salary: "₹14 LPA",
    salaryGrowth: "31%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    courses: [
      { name: "Apache Spark", tag: "Advanced", dot: "#E87722", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop&q=80", skills: ["RDDs & DataFrames", "Spark SQL", "Streaming", "MLlib"], duration: "8 weeks", level: "Advanced" },
      { name: "Apache Kafka", tag: "Hot Skill", dot: "#875FC1", img: "https://images.unsplash.com/photo-1518432031352-d6fc5734c3d1?w=400&h=220&fit=crop&q=80", skills: ["Topics & Partitions", "Producers & Consumers", "Kafka Streams", "Connect API"], duration: "6 weeks", level: "Intermediate" },
      { name: "Apache Airflow", tag: "Workflow", dot: "#00BCD4", img: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=220&fit=crop&q=80", skills: ["DAGs", "Operators", "Scheduling", "Task Dependencies"], duration: "5 weeks", level: "Intermediate" },
      { name: "dbt Core", tag: "Transform", dot: "#FF5252", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=220&fit=crop&q=80", skills: ["Models", "Tests & Docs", "Macros", "Jinja Templating"], duration: "4 weeks", level: "Intermediate" },
      { name: "Snowflake", tag: "Cloud DW", dot: "#29B5E8", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=220&fit=crop&q=80", skills: ["Virtual Warehouses", "Time Travel", "Data Sharing", "Snowpipe"], duration: "5 weeks", level: "Intermediate" },
      { name: "Hadoop Ecosystem", tag: "Big Data", dot: "#FFCA28", img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d63?w=400&h=220&fit=crop&q=80", skills: ["HDFS", "MapReduce", "Hive & Pig", "YARN"], duration: "7 weeks", level: "Intermediate" },
    ],
    companies: [
      { name: "Amazon", color: "#232F3E" }, { name: "Flipkart", color: "#2874F0" },
      { name: "Walmart", color: "#0071CE" }, { name: "Razorpay", color: "#3395FF" },
      { name: "PayPal", color: "#003087" }, { name: "Uber", color: "#1a1a1a" },
    ],
  },
  {
    id: 3,
    title: "Backend Development",
    salary: "₹13 LPA",
    salaryGrowth: "27%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 9l2 2-2 2M12 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    courses: [
      { name: "Node.js & Express", tag: "Popular", dot: "#68A063", img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=220&fit=crop&q=80", skills: ["REST APIs", "Middleware", "JWT Auth", "DB Integration"], duration: "7 weeks", level: "Intermediate" },
      { name: "Django REST API", tag: "Python", dot: "#44B78B", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop&q=80", skills: ["DRF Serializers", "ViewSets", "JWT Auth", "ORM Queries"], duration: "7 weeks", level: "Intermediate" },
      { name: "Spring Boot", tag: "Java", dot: "#6DB33F", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=220&fit=crop&q=80", skills: ["Spring MVC", "JPA & Hibernate", "Spring Security", "Microservices"], duration: "9 weeks", level: "Intermediate" },
      { name: "Laravel PHP", tag: "Web", dot: "#FF2D20", img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=220&fit=crop&q=80", skills: ["Eloquent ORM", "Blade Templates", "API Resources", "Laravel Auth"], duration: "7 weeks", level: "Intermediate" },
      { name: "FastAPI Python", tag: "Modern", dot: "#009688", img: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&h=220&fit=crop&q=80", skills: ["Pydantic Models", "Async Endpoints", "OAuth2", "OpenAPI Docs"], duration: "5 weeks", level: "Intermediate" },
      { name: "Go Language", tag: "Trending", dot: "#00ACD7", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop&q=80", skills: ["Goroutines", "Channels", "REST with Gin", "Concurrency"], duration: "8 weeks", level: "Advanced" },
    ],
    companies: [
      { name: "Google", color: "#4285F4" }, { name: "Microsoft", color: "#00A4EF" },
      { name: "Atlassian", color: "#0052CC" }, { name: "Swiggy", color: "#FC8019" },
      { name: "Zomato", color: "#E23744" }, { name: "CRED", color: "#1C1C1C" },
    ],
  },
  {
    id: 4,
    title: "Frontend Development",
    salary: "₹12 LPA",
    salaryGrowth: "28%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 9l-2 2 2 2M15 9l2 2-2 2M13 7l-2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    courses: [
      { name: "ReactJS Complete", tag: "Most Popular", dot: "#61DAFB", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop&q=80", skills: ["Hooks & Context", "React Router", "Redux Toolkit", "Testing Library"], duration: "8 weeks", level: "Intermediate" },
      { name: "Angular Framework", tag: "Enterprise", dot: "#DD0031", img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=220&fit=crop&q=80", skills: ["Components & Modules", "RxJS", "Angular CLI", "Dependency Injection"], duration: "9 weeks", level: "Intermediate" },
      { name: "JavaScript ES2024", tag: "Core Skill", dot: "#F7DF1E", img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=220&fit=crop&q=80", skills: ["ES6+ Features", "Async/Await", "Closures & Scope", "DOM Manipulation"], duration: "6 weeks", level: "Beginner" },
      { name: "jQuery & AJAX", tag: "Classic", dot: "#0769AD", img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=220&fit=crop&q=80", skills: ["DOM Traversal", "Event Handling", "AJAX Calls", "Animations"], duration: "4 weeks", level: "Beginner" },
      { name: "Bootstrap 5", tag: "UI Design", dot: "#7952B3", img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=220&fit=crop&q=80", skills: ["Grid System", "Components", "Utilities", "Custom Theming"], duration: "3 weeks", level: "Beginner" },
      { name: "Vue.js 3", tag: "Progressive", dot: "#42B883", img: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=400&h=220&fit=crop&q=80", skills: ["Composition API", "Vuex/Pinia", "Vue Router", "Directives"], duration: "7 weeks", level: "Intermediate" },
      { name: "TypeScript", tag: "Strongly Typed", dot: "#3178C6", img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=220&fit=crop&q=80", skills: ["Types & Interfaces", "Generics", "Decorators", "Advanced Patterns"], duration: "5 weeks", level: "Intermediate" },
      { name: "Tailwind CSS", tag: "Utility First", dot: "#38BDF8", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=220&fit=crop&q=80", skills: ["Utility Classes", "Responsive Design", "Custom Config", "Component Patterns"], duration: "3 weeks", level: "Beginner" },
    ],
    companies: [
      { name: "Backbase", color: "#E53935" }, { name: "Progress", color: "#5CB85C" },
      { name: "Postman", color: "#FF6C37" }, { name: "BrowserStack", color: "#E95420" },
      { name: "Hasura", color: "#1EB4D4" }, { name: "Freshworks", color: "#23A94C" },
    ],
  },
  {
    id: 5,
    title: "Full Stack",
    salary: "₹16 LPA",
    salaryGrowth: "35%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="2" y="10" width="20" height="5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="2" y="17" width="20" height="5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="6" cy="5.5" r="1" fill="currentColor"/>
        <circle cx="6" cy="12.5" r="1" fill="currentColor"/>
        <circle cx="6" cy="19.5" r="1" fill="currentColor"/>
      </svg>
    ),
    courses: [
      { name: "MERN Stack", tag: "Highest Paid", dot: "#61DAFB", img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=220&fit=crop&q=80", skills: ["MongoDB", "Express.js", "React", "Node.js"], duration: "12 weeks", level: "Intermediate" },
      { name: "MEAN Stack", tag: "Enterprise", dot: "#DD0031", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=220&fit=crop&q=80", skills: ["MongoDB", "Express.js", "Angular", "Node.js"], duration: "12 weeks", level: "Intermediate" },
      { name: "Next.js Full Stack", tag: "Modern", dot: "#7C3AED", img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&h=220&fit=crop&q=80", skills: ["SSR & SSG", "API Routes", "Prisma ORM", "Auth.js"], duration: "8 weeks", level: "Advanced" },
      { name: "Nuxt.js Full Stack", tag: "Vue Based", dot: "#42B883", img: "https://images.unsplash.com/photo-1543966888-7c1dc482a810?w=400&h=220&fit=crop&q=80", skills: ["Server-Side Rendering", "Nuxt API", "Pinia State", "Composables"], duration: "8 weeks", level: "Intermediate" },
      { name: "Django + React", tag: "Python", dot: "#44B78B", img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=220&fit=crop&q=80", skills: ["DRF Backend", "React Frontend", "JWT Auth", "REST Integration"], duration: "10 weeks", level: "Intermediate" },
      { name: "Laravel + Vue", tag: "PHP", dot: "#FF2D20", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=220&fit=crop&q=80", skills: ["Laravel API", "Vue 3 Frontend", "InertiaJS", "Sanctum Auth"], duration: "10 weeks", level: "Intermediate" },
    ],
    companies: [
      { name: "Zoho", color: "#E42527" }, { name: "Chargebee", color: "#FF7A59" },
      { name: "Clevertap", color: "#F4664A" }, { name: "Innovaccer", color: "#0070F3" },
      { name: "Druva", color: "#00A1E4" }, { name: "TCS", color: "#0055A5" },
    ],
  },
  {
    id: 6,
    title: "Mobile Applications",
    salary: "₹13 LPA",
    salaryGrowth: "30%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="10" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="19" r="1" fill="currentColor"/>
        <rect x="9" y="8" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    courses: [
      { name: "React Native", tag: "Cross Platform", dot: "#61DAFB", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=220&fit=crop&q=80", skills: ["Navigation", "Native Modules", "AsyncStorage", "Push Notifications"], duration: "9 weeks", level: "Intermediate" },
      { name: "Flutter & Dart", tag: "Google", dot: "#54C5F8", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=220&fit=crop&q=80", skills: ["Widgets", "State Management", "BLoC Pattern", "Platform Channels"], duration: "9 weeks", level: "Intermediate" },
      { name: "Android Native", tag: "Java/Kotlin", dot: "#3DDC84", img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=220&fit=crop&q=80", skills: ["Activities & Fragments", "RecyclerView", "Room Database", "Retrofit"], duration: "10 weeks", level: "Intermediate" },
      { name: "iOS with Swift", tag: "Apple", dot: "#FA7343", img: "https://images.unsplash.com/photo-1621274161781-27beec695f6d?w=400&h=220&fit=crop&q=80", skills: ["UIKit", "SwiftUI", "Core Data", "Networking"], duration: "10 weeks", level: "Intermediate" },
      { name: "Kotlin Android", tag: "Modern", dot: "#B125EA", img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400&h=220&fit=crop&q=80", skills: ["Coroutines", "Jetpack Compose", "MVVM Architecture", "Hilt DI"], duration: "9 weeks", level: "Intermediate" },
      { name: "Ionic Framework", tag: "Hybrid", dot: "#3880FF", img: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=400&h=220&fit=crop&q=80", skills: ["Angular/React Base", "Capacitor", "Native Plugins", "App Deployment"], duration: "7 weeks", level: "Beginner" },
    ],
    companies: [
      { name: "Ola", color: "#24A300" }, { name: "PhonePe", color: "#5F259F" },
      { name: "Paytm", color: "#00B9F1" }, { name: "BYJU'S", color: "#663399" },
      { name: "Meesho", color: "#9B1FE8" }, { name: "Sharechat", color: "#FF6B35" },
    ],
  },
];

export default function JobCategories() {
  const [activeId, setActiveId] = useState(4);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const tabsRef = useRef(null);
  const carouselRef = useRef(null);

  const activeCategory = categories.find((c) => c.id === activeId);

  const scrollTabs = (dir) => {
    if (tabsRef.current) tabsRef.current.scrollLeft += dir * 200;
  };

  const scrollCards = (dir) => {
    if (carouselRef.current) carouselRef.current.scrollLeft += dir * 260;
  };

  const handleTabChange = useCallback((id) => {
    setActiveId(id);
    setSelectedCourse(null);
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse((prev) => (prev?.name === course.name ? null : course));
  };

  return (
    <section className="w-full bg-white py-14 px-4">
      {/* Header — centered */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
          style={{ background: '#EBF5FB', color: '#3385AA' }}
        >
          Skill-Based Learning
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Explore Courses by{" "}
          <span style={{ color: "#3385AA" }}>Role</span>
        </h2>
        <div className="mt-3 mx-auto" style={{ width: 56, height: 3, borderRadius: 2, background: 'linear-gradient(90deg,#3385AA,#2a6d8f)' }} />
        <p className="mt-4 text-gray-500 text-base max-w-2xl mx-auto">
          Master in-demand skills with curated courses for every tech role. Land your dream job faster.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative flex items-center">
          <button
            onClick={() => scrollTabs(-1)}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3385AA] hover:text-[#3385AA] transition-colors mr-3 bg-white shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={tabsRef}
            className="flex gap-0 overflow-x-auto flex-1"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 px-6 py-3 transition-all duration-200 min-w-[130px] focus:outline-none"
                style={{
                  borderBottom: activeId === cat.id ? "2.5px solid #3385AA" : "2.5px solid transparent",
                  color: activeId === cat.id ? "#3385AA" : "#6B7280",
                }}
              >
                <span>{cat.icon}</span>
                <span className="text-xs font-semibold whitespace-nowrap text-center leading-tight">
                  {cat.title}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTabs(1)}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#3385AA] hover:text-[#3385AA] transition-colors ml-3 bg-white shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div style={{ borderBottom: "1px solid #E5E7EB", marginTop: -1 }} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* Left: Course Cards Carousel */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
            {/* Right fade */}
            <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

            {/* Prev btn */}
            <button
              onClick={() => scrollCards(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:border-[#3385AA] hover:text-[#3385AA] transition-all"
              style={{ marginLeft: -2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next btn */}
            <button
              onClick={() => scrollCards(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:border-[#3385AA] hover:text-[#3385AA] transition-all"
              style={{ marginRight: -2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrollable cards */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto px-6 pb-2"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {activeCategory.courses.map((course, i) => {
                const isSelected = selectedCourse?.name === course.name;
                return (
                  <div
                    key={i}
                    onClick={() => handleCourseClick(course)}
                    className="flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      width: 220, height: 180,
                      outline: isSelected ? "2.5px solid #3385AA" : "none",
                      boxShadow: isSelected ? "0 0 0 3px rgba(51,133,170,0.25)" : undefined,
                    }}
                  >
                    {/* Background image */}
                    <img
                      src={course.img}
                      alt={course.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)" }} />

                    {/* Tag badge top-left */}
                    <div
                      className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-bold"
                      style={{ background: course.dot + "dd", color: "#fff", fontSize: 10, letterSpacing: "0.05em" }}
                    >
                      {course.tag}
                    </div>

                    {/* Selected checkmark */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center shadow" style={{ background: "#3385AA" }}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-white font-bold text-sm leading-snug mb-2">{course.name}</div>
                      <div
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: "rgba(255,255,255,0.18)", color: "#fff", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)" }}
                      >
                        View Details
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {activeCategory.courses.map((_, i) => (
              <div key={i} className="h-1.5 rounded-full" style={{ width: i === 0 ? '20px' : '6px', background: i === 0 ? '#3385AA' : '#D1D5DB', transition: 'all 0.3s ease' }} />
            ))}
          </div>

          {/* Selected Course Detail Panel */}
          {selectedCourse && (
            <div
              className="mt-5 rounded-2xl overflow-hidden transition-all duration-300"
              style={{ border: "1.5px solid #3385AA", background: "#f0f7fb" }}
            >
              {/* Banner */}
              <div className="relative h-28 overflow-hidden">
                <img
                  src={selectedCourse.img}
                  alt={selectedCourse.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.35) 55%,transparent 100%)" }} />
                <div className="absolute inset-0 px-6 flex flex-col justify-center">
                  <span
                    className="self-start px-2.5 py-0.5 rounded-md text-xs font-bold mb-1.5"
                    style={{ background: selectedCourse.dot + "cc", color: "#fff" }}
                  >
                    {selectedCourse.tag}
                  </span>
                  <h3 className="text-white text-xl font-extrabold leading-tight">{selectedCourse.name}</h3>
                </div>
                {/* Badges top-right */}
                <div className="absolute top-4 right-5 flex gap-2">
                  {selectedCourse.level && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: levelColors[selectedCourse.level]?.bg, color: levelColors[selectedCourse.level]?.color }}
                    >
                      {selectedCourse.level}
                    </span>
                  )}
                  {selectedCourse.duration && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-gray-700">
                      ⏱ {selectedCourse.duration}
                    </span>
                  )}
                </div>
                {/* Close */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute bottom-4 right-5 w-6 h-6 rounded-full bg-white bg-opacity-90 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-5">
                {selectedCourse.skills?.length > 0 && (
                  <>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">What You'll Learn</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedCourse.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg text-sm font-semibold"
                          style={{
                            background: selectedCourse.dot + "1a",
                            color: ["#FFFFFF", "#F7DF1E", "#FFCA28"].includes(selectedCourse.dot) ? "#374151" : selectedCourse.dot,
                            border: `1px solid ${selectedCourse.dot}40`,
                          }}
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex gap-5 text-sm text-gray-500">
                    {selectedCourse.duration && <span>📅 {selectedCourse.duration}</span>}
                    {selectedCourse.level && <span>🎯 {selectedCourse.level}</span>}
                  </div>
                  <button
                    className="px-6 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "linear-gradient(135deg,#3385AA,#2a6d8f)" }}
                  >
                    Enroll Now →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>


      </div>

      <style>{`
        div[ref]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}