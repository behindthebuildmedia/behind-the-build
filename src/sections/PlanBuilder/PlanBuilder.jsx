import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

export default function PlanBuilder({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'VIDEO EDITING',
    plan: 'GROWTH',
    location: '',
    requirements: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Read preselected state from localStorage when mounting
  useEffect(() => {
    const savedService = localStorage.getItem('selectedService');
    const savedPlan = localStorage.getItem('selectedPlan');

    if (savedService) {
      setFormData(prev => ({ ...prev, service: savedService.toUpperCase() }));
      localStorage.removeItem('selectedService');
    }
    if (savedPlan) {
      setFormData(prev => ({ ...prev, plan: savedPlan.toUpperCase() }));
      localStorage.removeItem('selectedPlan');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.location.trim()) errors.location = 'Project location is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const bookingPayload = {
      client_name: formData.name,
      company_name: formData.company || null,
      email: formData.email,
      phone: formData.phone,
      region: 'India',
      services: [
        {
          service: formData.service,
          plan: formData.plan
        }
      ],
      budget: formData.plan === 'STARTER' ? 'Starter Price' : formData.plan === 'GROWTH' ? 'Growth Price' : 'Custom Budget',
      timeline: 'Monthly Deliverables',
      project_description: `Location: ${formData.location}\n\nRequirements:\n${formData.requirements || 'None'}`
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const requestUrl = `${API_URL}/api/bookings`;
      
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
      });

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textError = await response.text();
        console.error('[API Error] Received non-JSON response body:', textError);
        throw new Error(`Server returned a non-JSON response (${response.status}).`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Unable to submit your project request. Please try again.');
      }

      if (onSuccess) {
        onSuccess(data.booking_id || data.bookingId);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmissionError('Unable to submit your project request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="build-plan" className="py-24 bg-brand-white border-t border-brand-charcoal/5 relative overflow-hidden select-none font-sans text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading and info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <ScrollReveal yOffset={10} duration={0.6}>
                <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
                  START A PROJECT
                </span>
              </ScrollReveal>
              
              <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
                  LET'S BUILD SOMETHING.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.24} yOffset={15} duration={0.6} className="pt-2">
                <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-semibold max-w-sm">
                  Select your service, fill in your details, and we'll get back to you with a custom proposal in 60 minutes.
                </p>
              </ScrollReveal>
            </div>

            <div className="pt-8 border-t border-[#E6E6E6] space-y-4">
              <span className="text-[9px] font-mono font-black text-brand-charcoal/40 uppercase tracking-widest block">
                CONTACT
              </span>
              <p className="text-sm font-bold text-brand-charcoal">
                hello@behindthebuild.in
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-brand-white border border-[#E6E6E6] p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                  placeholder="e.g. Nikhil Sen"
                />
                {formErrors.name && (
                  <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.name}</span>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                  placeholder="e.g. nikhil@company.com"
                />
                {formErrors.email && (
                  <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.email}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                  placeholder="e.g. +91 98765 43210"
                />
                {formErrors.phone && (
                  <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.phone}</span>
                )}
              </div>

              {/* Company / Brand Name */}
              <div className="flex flex-col">
                <label htmlFor="company" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                  placeholder="e.g. Behind The Build"
                />
              </div>

              {/* Select Service */}
              <div className="flex flex-col">
                <label htmlFor="service" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Select Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold cursor-pointer"
                >
                  <option value="VIDEO EDITING">VIDEO EDITING</option>
                  <option value="SOCIAL MEDIA MARKETING">SOCIAL MEDIA MARKETING</option>
                  <option value="DESIGN">DESIGN</option>
                  <option value="TECH EVENT COVERAGE">TECH EVENT COVERAGE</option>
                  <option value="DIGITAL MARKETING">DIGITAL MARKETING</option>
                  <option value="CUSTOM PARTNERSHIP">CUSTOM PARTNERSHIP</option>
                </select>
              </div>

              {/* Select Plan */}
              <div className="flex flex-col">
                <label htmlFor="plan" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Select Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold cursor-pointer"
                >
                  <option value="STARTER">STARTER</option>
                  <option value="GROWTH">GROWTH</option>
                  <option value="CUSTOM">CUSTOM / NOT SURE</option>
                </select>
              </div>

              {/* Location */}
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="location" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Project Location (City / Remote)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                  placeholder="e.g. Mumbai, India / Remote"
                />
                {formErrors.location && (
                  <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.location}</span>
                )}
              </div>

              {/* Requirements */}
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="requirements" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                  Project Details & Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows="4"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold resize-none"
                  placeholder="Describe your project, editing deliverables, shoot parameters, or social goals..."
                />
              </div>

              {submissionError && (
                <div className="md:col-span-2 text-xs text-[#C8041C] font-semibold">
                  {submissionError}
                </div>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#212121] hover:bg-[#C8041C] text-brand-white py-4.5 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Icons.Loader className="w-3.5 h-3.5 animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT INQUIRY</span>
                      <Icons.ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
