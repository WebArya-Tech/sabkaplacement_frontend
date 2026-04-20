import { Link } from "react-router-dom";

const JobCard = ({ job, isSelected, onToggleSelect, onHide, onSave, isSaved, tabContext, matchScore }) => {
  return (
    <div className={`bg-white border rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-200 cursor-pointer ${
      tabContext === "top-candidate" ? "border-[#47AEC7] hover:border-[#3a9db5]" : "border-gray-200 hover:border-[#47AEC7]/40"
    } hover:scale-[1.015]`}>

      {/* Tab Badge Row */}
      {tabContext === "top-candidate" && (
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#eaf6fb] text-[#47AEC7] text-xs font-semibold rounded-full border border-[#47AEC7]">
            ? Top Candidate
          </span>
          <span className="text-xs text-[#47AEC7] font-medium">{matchScore}% match</span>
        </div>
      )}
      {tabContext === "profile" && matchScore && (
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <div className="h-1.5 w-20 sm:w-24 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#47AEC7] rounded-full" style={{ width: `${matchScore}%` }} />
          </div>
          <span className="text-xs text-[#47AEC7] font-semibold">{matchScore}% match</span>
        </div>
      )}

      {/* Main Row: Checkbox + Content */}
      <div className="flex gap-2 sm:gap-3">

        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(job.id)}
            className="w-4 h-4 text-[#317FA4] border-gray-300 rounded focus:ring-[#47AEC7] cursor-pointer"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Header: Title + Logo */}
          <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <Link to={`/apply/${job.id}`}> 
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1a3c4b] hover:text-[#47AEC7] transition-colors mb-1 leading-snug line-clamp-2">
                  {job.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 flex-wrap mt-0.5">
                <span className="text-sm font-bold text-[#317FA4]">{job.company}</span>
                {job.rating && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{job.rating}</span>
                    {job.reviews && (
                      <span className="text-xs text-gray-400 hidden sm:inline">({job.reviews} reviews)</span>
                    )}
                  </>
                )}
              </div>
              {job.postedBy && (
                <p className="text-xs text-gray-500 mt-0.5 truncate">Posted by {job.postedBy}</p>
              )}
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 ml-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#EAF4F8] to-[#47AEC7] rounded-xl flex items-center justify-center shadow-md border border-[#d6eaf2]">
                <span className="text-lg sm:text-xl font-extrabold text-[#317FA4]">{job.logo}</span>
              </div>
            </div>
          </div>

          {/* Job Meta: Experience / Salary / Location */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
            <div className="flex items-center gap-1 min-w-0">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{job.experience}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{job.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
            {job.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, window?.innerWidth < 480 ? 3 : 6).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#eaf4f8] text-[#317FA4] text-xs rounded-full border border-[#d6eaf2] font-semibold shadow-sm hover:bg-[#d6eaf2] transition-colors"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 6 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full border border-gray-200 font-semibold">
                +{job.skills.length - 6}
              </span>
            )}
          </div>

          {/* Footer: Posted date + Actions */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#eaf4f8] flex-wrap">
            <span className="text-xs text-gray-400">{job.posted}</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => onHide && onHide(job.id)}
                className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-red-500 transition-colors py-1"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <span>Hide</span>
              </button>
              <button
                onClick={() => onSave && onSave(job.id)}
                className={`flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors py-1 ${isSaved ? "text-[#47AEC7]" : "text-gray-400 hover:text-[#47AEC7]"}`}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobCard;
