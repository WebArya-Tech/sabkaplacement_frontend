const BASE_URL = 'http://localhost:5000/api';

const authHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const createResume = async (resumeData) => {
    const res = await fetch(`${BASE_URL}/resume`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(resumeData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create resume');
    return data;
};

export const getResumes = async () => {
    const res = await fetch(`${BASE_URL}/resume`, {
        headers: authHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch resumes');
    return data.data;
};

export const getResumeById = async (id) => {
    const res = await fetch(`${BASE_URL}/resume/${id}`, {
        headers: authHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch resume');
    return data.data;
};

export const updateResume = async (id, resumeData) => {
    const res = await fetch(`${BASE_URL}/resume/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(resumeData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update resume');
    return data;
};

export const deleteResume = async (id) => {
    const res = await fetch(`${BASE_URL}/resume/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete resume');
    return data;
};

export const generateResumePdf = async (resumeData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/resume/generate/pdf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ resumeData })
    });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to generate PDF');
    }
    
    // Returns blob
    return await res.blob();
};
