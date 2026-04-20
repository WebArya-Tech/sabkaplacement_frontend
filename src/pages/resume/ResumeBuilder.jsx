import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import TemplateSelector from '../../components/resume/TemplateSelector';
import ResumeForm from '../../components/resume/ResumeForm';
import ResumePreview from '../../components/resume/ResumePreview';
import { generateResumePdf } from '../../services/resumeApi';

const initialResumeState = {
    title: 'My Professional Resume',
    template: 'modern',
    personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', github: '', summary: '' },
    education: [],
    experience: [],
    skills: [],
    projects: []
};

const ResumeBuilder = () => {
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState(initialResumeState);
    const [isGenerating, setIsGenerating] = useState(false);

    // Require authentication and pre-fill some data if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
            // Redirect to login if unauthenticated
            navigate('/login', { state: { intent: 'resume-builder' }, replace: true });
            return;
        }

        try {
            const parsedUser = JSON.parse(userStr);
            setResumeData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    fullName: parsedUser.name || '',
                    email: parsedUser.email || '',
                    phone: parsedUser.phone || ''
                }
            }));
        } catch (e) {
            console.error("Error parsing user data");
        }
    }, [navigate]);

    const handleTemplateSelect = (template) => {
        setResumeData(prev => ({ ...prev, template }));
    };

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        try {
            const blob = await generateResumePdf(resumeData);
            
            // Create a link to download the blob
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${resumeData.personalInfo.fullName ? resumeData.personalInfo.fullName.replace(/\\s+/g, '_') : 'Resume'}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            alert('Failed to generate PDF: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f6f9] flex flex-col">
            <Navbar />

            {/* Header Area */}
            <div className="bg-white border-b border-[#d6eaf2] pt-6 pb-4 px-4 sticky top-[70px] md:top-[80px] z-40 shadow-sm">
                <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#317FA4]">Resume Builder</h1>
                        <p className="text-sm text-gray-500 mt-1">Fill out your details to instantly generate an ATS-friendly PDF.</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleDownloadPDF} 
                            disabled={isGenerating}
                            className="bg-[#317FA4] hover:bg-[#297EA2] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating PDF...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download PDF
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Side: Form Controls */}
                <div className="flex flex-col gap-6 lg:h-[calc(100vh-200px)] lg:overflow-y-auto pr-2 scrollbar-hide">
                    <TemplateSelector selectedTemplate={resumeData.template} onSelect={handleTemplateSelect} />
                    <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                </div>

                {/* Right Side: Live Sticky Preview */}
                <div className="hidden lg:block relative h-[calc(100vh-200px)]">
                    <div className="sticky top-0 h-full w-full bg-gray-200 rounded-xl overflow-hidden overflow-y-auto shadow-inner p-4 flex justify-center">
                        <div className="transform origin-top scale-[0.60] xl:scale-[0.75] 2xl:scale-95 transition-transform pb-20">
                            <div className="w-[800px] hover:shadow-2xl transition-shadow bg-white pb-32">
                                <ResumePreview resumeData={resumeData} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default ResumeBuilder;
