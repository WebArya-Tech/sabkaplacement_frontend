const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-[#D6EAF2] transition-all cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          {/* Company Logo */}
          <div className="w-14 h-14 rounded flex items-center justify-center bg-gradient-to-br from-[#eaf4f8] to-[#d6eaf2] flex-shrink-0 overflow-hidden">
            {company.logoImage ? (
              <img
                src={company.logoImage}
                alt={company.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full rounded flex items-center justify-center bg-gradient-to-br ${company.logoColor}`}>
                <span className="text-white font-bold text-lg">{company.logo}</span>
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">{company.name}</h3>

            {/* Rating */}
            {company.rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{company.rating}</span>
                </div>
                <span className="text-sm text-gray-500">| {company.reviews} reviews</span>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              {company.type && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{company.type}</span>
              )}
              {company.industry && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{company.industry}</span>
              )}
            </div>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0 ml-4">
          <svg className="w-6 h-6 text-[#317FA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
