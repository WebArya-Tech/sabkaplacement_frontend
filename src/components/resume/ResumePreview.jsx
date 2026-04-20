import React from 'react';

const ResumePreview = ({ resumeData }) => {
    
    const renderModern = () => {
        return (
            <div className="bg-white" style={{ fontFamily: "'Inter', sans-serif", color: "#333", fontSize: "14px", lineHeight: "1.5" }}>
                {/* Header */}
                <header style={{ borderBottom: "2px solid #3385AA", paddingBottom: "20px", marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "32px", color: "#111", margin: "0 0 5px 0", textTransform: "uppercase", fontWeight: "700", letterSpacing: "1px" }}>
                        {resumeData.personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", fontSize: "13px", color: "#555" }}>
                        {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
                        {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
                        {resumeData.personalInfo.address && <span>📍 {resumeData.personalInfo.address}</span>}
                        {resumeData.personalInfo.linkedin && <span><b>in</b> {resumeData.personalInfo.linkedin}</span>}
                        {resumeData.personalInfo.github && <span><b>GH</b> {resumeData.personalInfo.github}</span>}
                    </div>
                </header>

                {/* Summary */}
                {resumeData.personalInfo.summary && (
                    <div style={{ marginBottom: "25px" }}>
                        <div style={{ fontSize: "14px", textAlign: "justify", whiteSpace: "pre-wrap" }}>{resumeData.personalInfo.summary}</div>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience && resumeData.experience.length > 0 && (
                    <div style={{ marginBottom: "25px" }}>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#3385AA", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #eee", paddingBottom: "5px", marginBottom: "15px" }}>Experience</div>
                        {resumeData.experience.map((exp, idx) => (
                            <div key={idx} style={{ marginBottom: "15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                                    <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#222", margin: "0" }}>{exp.position || 'Position'}</h3>
                                    <span style={{ fontSize: "13px", color: "#666", fontStyle: "italic" }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                </div>
                                <h4 style={{ fontSize: "14px", color: "#3385AA", fontWeight: "600", margin: "0" }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</h4>
                                {exp.description && <p style={{ fontSize: "13.5px", margin: "5px 0 0 0", whiteSpace: "pre-wrap" }}>{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {resumeData.education && resumeData.education.length > 0 && (
                    <div style={{ marginBottom: "25px" }}>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#3385AA", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #eee", paddingBottom: "5px", marginBottom: "15px" }}>Education</div>
                        {resumeData.education.map((edu, idx) => (
                            <div key={idx} style={{ marginBottom: "15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                                    <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#222", margin: "0" }}>{edu.degree || 'Degree'}</h3>
                                    <span style={{ fontSize: "13px", color: "#666", fontStyle: "italic" }}>{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <h4 style={{ fontSize: "14px", color: "#3385AA", fontWeight: "600", margin: "0" }}>{edu.institution || 'Institution'}</h4>
                                {edu.gpa && <p style={{ fontSize: "13.5px", margin: "5px 0 0 0" }}><strong>GPA/Score:</strong> {edu.gpa}</p>}
                                {edu.description && <p style={{ fontSize: "13.5px", margin: "5px 0 0 0", whiteSpace: "pre-wrap" }}>{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects && resumeData.projects.length > 0 && (
                    <div style={{ marginBottom: "25px" }}>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#3385AA", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #eee", paddingBottom: "5px", marginBottom: "15px" }}>Projects</div>
                        {resumeData.projects.map((proj, idx) => (
                            <div key={idx} style={{ marginBottom: "15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                                    <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#222", margin: "0" }}>{proj.title || 'Project Name'} {proj.link && <span style={{ fontSize: "12px", color: "#3385AA", fontWeight: "normal" }}>({proj.link})</span>}</h3>
                                </div>
                                {proj.description && <p style={{ fontSize: "13.5px", margin: "5px 0 0 0", whiteSpace: "pre-wrap" }}>{proj.description}</p>}
                                {proj.technologies && proj.technologies.filter(t => t).length > 0 && (
                                    <div style={{ fontSize: "12px", color: "#666", fontStyle: "italic", marginTop: "3px" }}>Tech Stack: {proj.technologies.filter(t => t).join(', ')}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills && resumeData.skills.filter(s => s).length > 0 && (
                    <div style={{ marginBottom: "25px" }}>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#3385AA", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #eee", paddingBottom: "5px", marginBottom: "15px" }}>Key Skills</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {resumeData.skills.filter(s => s).map((skill, idx) => (
                                <span key={idx} style={{ background: "#EAF4F8", color: "#317FA4", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "600" }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderClassic = () => {
        return (
            <div className="bg-white" style={{ fontFamily: "serif", color: "#000", fontSize: "14px", lineHeight: "1.4" }}>
                {/* Header */}
                <header style={{ textAlign: "center", marginBottom: "25px" }}>
                    <h1 style={{ fontSize: "28px", margin: "0 0 5px 0", fontWeight: "700" }}>
                        {resumeData.personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div style={{ fontSize: "12px", color: "#333", marginTop: "8px" }}>
                        {[
                            resumeData.personalInfo.email,
                            resumeData.personalInfo.phone,
                            resumeData.personalInfo.address,
                            resumeData.personalInfo.linkedin,
                            resumeData.personalInfo.github
                        ].filter(Boolean).join(' | ')}
                    </div>
                </header>

                {/* Summary */}
                {resumeData.personalInfo.summary && (
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700", borderBottom: "2px solid #000", paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Professional Summary</div>
                        <div style={{ fontSize: "13px", textAlign: "justify" }}>{resumeData.personalInfo.summary}</div>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience && resumeData.experience.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700", borderBottom: "2px solid #000", paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Experience</div>
                        {resumeData.experience.map((exp, idx) => (
                            <div key={idx} style={{ marginBottom: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0" }}>{exp.position || 'Position'}</h3>
                                    <span style={{ fontSize: "12px", fontStyle: "italic" }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <h4 style={{ fontSize: "13px", fontStyle: "italic", margin: "0" }}>{exp.company}</h4>
                                    {exp.location && <span style={{ fontSize: "12px" }}>{exp.location}</span>}
                                </div>
                                {exp.description && <p style={{ fontSize: "13px", margin: "3px 0 0 0" }}>{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {resumeData.education && resumeData.education.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700", borderBottom: "2px solid #000", paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Education</div>
                        {resumeData.education.map((edu, idx) => (
                            <div key={idx} style={{ marginBottom: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0" }}>{edu.institution || 'Institution'}</h3>
                                    <span style={{ fontSize: "12px", fontStyle: "italic" }}>{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <h4 style={{ fontSize: "13px", fontStyle: "italic", margin: "0" }}>{edu.degree || 'Degree'}</h4>
                                    {edu.gpa && <span style={{ fontSize: "12px" }}>GPA: {edu.gpa}</span>}
                                </div>
                                {edu.description && <p style={{ fontSize: "13px", margin: "3px 0 0 0" }}>{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects && resumeData.projects.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700", borderBottom: "2px solid #000", paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Projects</div>
                        {resumeData.projects.map((proj, idx) => (
                            <div key={idx} style={{ marginBottom: "12px" }}>
                                <h3 style={{ fontSize: "13px", fontWeight: "600", margin: "0" }}>
                                    {proj.title || 'Project Name'} {proj.link && <span style={{ fontSize: "11px", fontWeight: "normal" }}>({proj.link})</span>}
                                </h3>
                                {proj.description && <p style={{ fontSize: "13px", margin: "3px 0 0 0" }}>{proj.description}</p>}
                                {proj.technologies && proj.technologies.length > 0 && (
                                    <p style={{ fontSize: "13px", margin: "3px 0 0 0", fontStyle: "italic" }}>Technologies: {proj.technologies.join(', ')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700", borderBottom: "2px solid #000", paddingBottom: "2px", marginBottom: "10px", textTransform: "uppercase" }}>Skills</div>
                        <div style={{ fontSize: "13px" }}>
                            <strong>Core Competencies:</strong> {resumeData.skills.join(', ')}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-white shadow-2xl p-8" style={{ minHeight: '842px' }}>
            {resumeData.template === 'classic' ? renderClassic() : renderModern()}
        </div>
    );
};

export default ResumePreview;
