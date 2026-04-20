import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
    title: 'Upload Courses',
    desc: 'Share video lectures, notes, and study material with thousands of learners.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.874M9 20H4v-2a4 4 0 015-3.874m0 0a4 4 0 118 0m-8 0A4 4 0 019 12a4 4 0 014 4" />
      </svg>
    ),
    title: 'Track Students',
    desc: 'Monitor enrolments, engagement, and progress from a dedicated dashboard.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Earn Recognition',
    desc: 'Build your profile, gain credibility, and grow your professional brand.',
  },
];

const TrainerSection = () => (
  <section
    className="relative overflow-hidden"
    style={{ background: 'linear-gradient(120deg,#317FA4 0%,#1a4f70 50%,#317FA4 100%)' }}
  >
    {/* subtle wave lines */}
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 20, 40, 60, 80, 100, 120].map((offset, i) => (
        <path
          key={i}
          d={`M0,${100 + offset} C250,${60 + offset} 500,${160 + offset} 750,${80 + offset} S1050,${30 + offset} 1200,${120 + offset}`}
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      ))}
    </svg>

    <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
      {/* header row */}
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#7fd3f0]">
            For Trainers
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Become a Trainer on{' '}
            <span className="text-[#47AEC7]">Sabka Placement</span>
          </h2>
          <p className="mt-2 text-base text-white/75 sm:text-lg">
            Share your knowledge with thousands of learners and help them land their dream jobs.
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            to="/trainer/register"
            className="rounded-xl bg-[#3385AA] px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2a6d8f] hover:shadow-xl text-center"
          >
            Register as Trainer
          </Link>
          <Link
            to="/trainer/login"
            className="rounded-xl border border-white/40 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 text-center"
          >
            Trainer Sign In
          </Link>
        </div>
      </div>

      {/* feature cards */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#3385AA]/60 text-white">
              {f.icon}
            </div>
            <div>
              <p className="font-semibold text-white">{f.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrainerSection;
