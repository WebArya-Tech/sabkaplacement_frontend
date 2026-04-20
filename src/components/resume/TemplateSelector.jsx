import React from 'react';

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
    return (
        <div className="mb-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Select Template</h3>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => onSelect('modern')}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'modern'
                            ? 'border-[#3385AA] bg-[#EAF4F8]'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                    <div className="h-20 w-full bg-gray-100 rounded flex flex-col p-2 gap-1 overflow-hidden">
                        <div className="h-3 bg-[#3385AA] w-2/3 rounded-sm"></div>
                        <div className="h-1 bg-gray-300 w-full rounded-sm mt-1"></div>
                        <div className="h-1 bg-gray-300 w-4/5 rounded-sm"></div>
                    </div>
                    <span className="block mt-2 text-xs font-semibold text-gray-700">Modern</span>
                    
                    {selectedTemplate === 'modern' && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-[#3385AA] rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                    )}
                </button>

                <button
                    onClick={() => onSelect('classic')}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'classic'
                            ? 'border-[#4a5568] bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                    <div className="h-20 w-full bg-gray-50 rounded flex flex-col p-2 items-center gap-1 overflow-hidden border border-gray-100">
                        <div className="h-2 bg-gray-800 w-1/2 rounded-sm mb-1"></div>
                        <div className="h-0.5 bg-gray-300 w-full rounded-sm"></div>
                        <div className="h-1 bg-gray-400 w-3/4 rounded-sm mt-1"></div>
                    </div>
                    <span className="block mt-2 text-xs font-semibold text-gray-700">Classic</span>

                    {selectedTemplate === 'classic' && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TemplateSelector;
