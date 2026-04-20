import React from 'react';

const ResumeForm = ({ resumeData, setResumeData }) => {

    const handleChange = (section, field, value, index = null) => {
        setResumeData(prev => {
            const newData = { ...prev };
            if (index !== null) {
                newData[section][index][field] = value;
            } else {
                newData[section][field] = value;
            }
            return newData;
        });
    };

    const addEntry = (section, emptyObj) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], emptyObj]
        }));
    };

    const removeEntry = (section, index) => {
        setResumeData(prev => {
            const newArr = [...prev[section]];
            newArr.splice(index, 1);
            return { ...prev, [section]: newArr };
        });
    };

    // Skills handler string splitting by comma
    const handleSkillsChange = (e) => {
        const val = e.target.value;
        setResumeData(prev => ({
            ...prev,
            skills: val.split(',').map(s => s.trim())
        }));
    };

    return (
        <div className="space-y-6">
            
            {/* PERSONAL INFO */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-[#3385AA] mb-4 uppercase tracking-wider border-b pb-2">Personal info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                        <input type="text" value={resumeData.personalInfo.fullName} onChange={e => handleChange('personalInfo', 'fullName', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="e.g. Ashutosh Yadav" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                        <input type="email" value={resumeData.personalInfo.email} onChange={e => handleChange('personalInfo', 'email', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="e.g. email@example.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
                        <input type="text" value={resumeData.personalInfo.phone} onChange={e => handleChange('personalInfo', 'phone', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="e.g. +91 9876543210" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                        <input type="text" value={resumeData.personalInfo.address} onChange={e => handleChange('personalInfo', 'address', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="e.g. City, Country" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">LinkedIn Profile</label>
                        <input type="text" value={resumeData.personalInfo.linkedin} onChange={e => handleChange('personalInfo', 'linkedin', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="linkedin.com/in/username" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">GitHub Profile</label>
                        <input type="text" value={resumeData.personalInfo.github} onChange={e => handleChange('personalInfo', 'github', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="github.com/username" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Professional Summary</label>
                        <textarea rows="5" value={resumeData.personalInfo.summary} onChange={e => handleChange('personalInfo', 'summary', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="A short bio highlighting your best skills and goals..."></textarea>
                    </div>
                </div>
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-sm font-bold text-[#3385AA] uppercase tracking-wider">Experience</h3>
                    <button onClick={() => addEntry('experience', { company: '', position: '', startDate: '', endDate: '', location: '', description: '' })} className="text-xs font-bold text-[#3385AA] hover:underline bg-[#EAF4F8] px-3 py-1 rounded">+ Add New</button>
                </div>
                
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-100 bg-gray-50 rounded-xl relative">
                        <button onClick={() => removeEntry('experience', index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-md"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Job Title</label>
                                <input type="text" value={exp.position} onChange={e => handleChange('experience', 'position', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Company</label>
                                <input type="text" value={exp.company} onChange={e => handleChange('experience', 'company', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Start Date</label>
                                    <input type="text" placeholder="Jan 2020" value={exp.startDate} onChange={e => handleChange('experience', 'startDate', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">End Date</label>
                                    <input type="text" placeholder="Present" value={exp.endDate} onChange={e => handleChange('experience', 'endDate', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Location</label>
                                <input type="text" value={exp.location} onChange={e => handleChange('experience', 'location', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Description / Acheivements</label>
                                <textarea rows="2" value={exp.description} onChange={e => handleChange('experience', 'description', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                ))}
                {resumeData.experience.length === 0 && <p className="text-sm text-gray-400 italic">No experience added yet.</p>}
            </div>

            {/* EDUCATION */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-sm font-bold text-[#3385AA] uppercase tracking-wider">Education</h3>
                    <button onClick={() => addEntry('education', { institution: '', degree: '', startDate: '', endDate: '', gpa: '', description: '' })} className="text-xs font-bold text-[#3385AA] hover:underline bg-[#EAF4F8] px-3 py-1 rounded">+ Add New</button>
                </div>

                {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-100 bg-gray-50 rounded-xl relative">
                        <button onClick={() => removeEntry('education', index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-md"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Institution / School</label>
                                <input type="text" value={edu.institution} onChange={e => handleChange('education', 'institution', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Degree</label>
                                <input type="text" value={edu.degree} onChange={e => handleChange('education', 'degree', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Start Year</label>
                                    <input type="text" value={edu.startDate} onChange={e => handleChange('education', 'startDate', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">End Year</label>
                                    <input type="text" value={edu.endDate} onChange={e => handleChange('education', 'endDate', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">GPA / Score</label>
                                <input type="text" value={edu.gpa} onChange={e => handleChange('education', 'gpa', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SKILLS */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-[#3385AA] mb-4 uppercase tracking-wider border-b pb-2">Skills</h3>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Add Skills (Comma separated)</label>
                    <textarea rows="2" value={resumeData.skills.join(', ')} onChange={handleSkillsChange} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#3385AA]" placeholder="e.g. React, Node.js, JavaScript, MongoDB, Python"></textarea>
                </div>
            </div>

            {/* PROJECTS */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-sm font-bold text-[#3385AA] uppercase tracking-wider">Projects</h3>
                    <button onClick={() => addEntry('projects', { title: '', link: '', description: '', technologies: [] })} className="text-xs font-bold text-[#3385AA] hover:underline bg-[#EAF4F8] px-3 py-1 rounded">+ Add New</button>
                </div>

                {resumeData.projects.map((proj, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-100 bg-gray-50 rounded-xl relative">
                        <button onClick={() => removeEntry('projects', index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-md"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Project Name</label>
                                    <input type="text" value={proj.title} onChange={e => handleChange('projects', 'title', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Live / GitHub Link</label>
                                    <input type="text" value={proj.link} onChange={e => handleChange('projects', 'link', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Technologies Used (Comma separated)</label>
                                <input type="text" value={proj.technologies ? proj.technologies.join(', ') : ''} onChange={e => {
                                    handleChange('projects', 'technologies', e.target.value.split(',').map(s=>s.trim()), index)
                                }} className="w-full px-3 py-1.5 text-sm border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Description</label>
                                <textarea rows="2" value={proj.description} onChange={e => handleChange('projects', 'description', e.target.value, index)} className="w-full px-3 py-1.5 text-sm border rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ResumeForm;
