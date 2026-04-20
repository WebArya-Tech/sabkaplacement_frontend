import { useState } from "react";
import Footer from "../../components/Footer";
import EmployeeNavbar from "../../components/EmployeeNavbar";

const PostJob = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyWebsite: "",
    companySize: "",
    jobTitle: "",
    jobType: "Full-time",
    experience: "",
    location: "",
    workMode: "Office",
    salary: "",
    skills: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-[#d6eaf2] bg-white px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#317FA4] focus:ring-4 focus:ring-[#dff1f8]";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f9fc] pb-16">
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#cdeefa] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-[#e3d9ff] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-96 h-64 w-64 rounded-full bg-[#d5f5e9] blur-3xl" />

      <EmployeeNavbar />
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#cfe7f1] bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(20,78,106,0.45)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex rounded-full border border-[#bfe0ed] bg-[#eaf6fb] px-4 py-1 text-xs font-bold tracking-[0.16em] text-[#1f6d8b]">
                EMPLOYER HIRING STUDIO
              </p>
              <h1 className="mt-4 text-3xl font-black leading-tight text-[#317FA4] sm:text-4xl">
                Publish A Job That Attracts Better Candidates
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#446071] sm:text-base">
                Complete this form once and your role gets presented in a clean, candidate-first format with stronger visibility.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d6eaf2] bg-[#f7fcff] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Estimated Time</p>
              <p className="mt-1 text-lg font-bold text-[#317FA4]">3 - 5 minutes</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {submitted && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 shadow-sm">
                  <p className="text-sm font-semibold">Job posted successfully. Your opening is now live for candidates.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <section className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-bold text-[#317FA4]">Company Information</h2>
                  <p className="mt-1 text-sm text-gray-600">Let candidates quickly understand who is hiring.</p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Company Name *
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className={fieldClassName}
                        placeholder="TechCorp Solutions"
                      />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                      Company Email *
                      <input
                        type="email"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        required
                        className={fieldClassName}
                        placeholder="hr@company.com"
                      />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                      Company Website
                      <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        className={fieldClassName}
                        placeholder="https://company.com"
                      />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                      Company Size
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className={fieldClassName}
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </label>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-bold text-[#317FA4]">Role Details</h2>
                  <p className="mt-1 text-sm text-gray-600">The clearer the role, the better the applications.</p>

                  <div className="mt-5 space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Job Title *
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                        className={fieldClassName}
                        placeholder="Senior React Developer"
                      />
                    </label>

                    <div className="grid gap-4 md:grid-cols-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Job Type *
                        <select
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleChange}
                          required
                          className={fieldClassName}
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </label>

                      <label className="block text-sm font-semibold text-gray-700">
                        Experience Required *
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                          className={fieldClassName}
                          placeholder="2-4 years"
                        />
                      </label>

                      <label className="block text-sm font-semibold text-gray-700">
                        Work Mode *
                        <select
                          name="workMode"
                          value={formData.workMode}
                          onChange={handleChange}
                          required
                          className={fieldClassName}
                        >
                          <option value="Office">Office</option>
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Location *
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className={fieldClassName}
                          placeholder="Mumbai, Maharashtra"
                        />
                      </label>

                      <label className="block text-sm font-semibold text-gray-700">
                        Salary Range
                        <input
                          type="text"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                          className={fieldClassName}
                          placeholder="INR 10-15 LPA"
                        />
                      </label>
                    </div>

                    <label className="block text-sm font-semibold text-gray-700">
                      Required Skills *
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        className={fieldClassName}
                        placeholder="React, JavaScript, Node.js"
                      />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                      Job Description *
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`${fieldClassName} resize-none`}
                        placeholder="Describe responsibilities, expected outcomes, and role goals."
                      />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                      Requirements
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={4}
                        className={`${fieldClassName} resize-none`}
                        placeholder="Mention mandatory qualifications and must-have criteria."
                      />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                      Benefits And Perks
                      <textarea
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        rows={4}
                        className={`${fieldClassName} resize-none`}
                        placeholder="Medical, remote allowance, growth plan, etc."
                      />
                    </label>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm sm:p-6">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#1d73b0] via-[#317FA4] to-[#7444d8] px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
                  >
                    Publish Job Now
                  </button>
                  <p className="mt-3 text-center text-xs font-medium tracking-wide text-gray-500">
                    NO PAYMENT REQUIRED. YOUR JOB GOES LIVE IMMEDIATELY.
                  </p>
                </section>
              </form>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <section className="rounded-2xl border border-[#d6eaf2] bg-white p-5 shadow-sm">
                  <h3 className="text-base font-bold text-[#317FA4]">Posting Checklist</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-[#eaf4f8] text-center text-xs font-bold leading-5 text-[#317FA4]">1</span>
                      Use a clear job title and role level.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-[#eaf4f8] text-center text-xs font-bold leading-5 text-[#317FA4]">2</span>
                      Mention location and work mode accurately.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-[#eaf4f8] text-center text-xs font-bold leading-5 text-[#317FA4]">3</span>
                      Add salary and benefits for higher conversion.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-[#eaf4f8] text-center text-xs font-bold leading-5 text-[#317FA4]">4</span>
                      Keep description short, specific and outcome-driven.
                    </li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-[#d6eaf2] bg-gradient-to-b from-[#eef8fd] to-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#317FA4]">Why This Design</p>
                  <h3 className="mt-2 text-base font-bold text-[#317FA4]">Built for faster posting and cleaner hiring flow</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    The form is sectioned to reduce fatigue, improve completion rate, and make role details easier to scan.
                  </p>
                </section>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PostJob;

