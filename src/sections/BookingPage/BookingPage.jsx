import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight, CheckCircle2, Loader } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

export default function BookingPage({ currentPath }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    requirements: '',
    referenceLink: '',
    preferredStartDate: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Direct access to general /book page without service parameter
  const isDirectBook = currentPath === '/book';

  // For /book dropdown selections
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('video-editing');
  const [selectedPlanSlug, setSelectedPlanSlug] = useState('growth');

  const isSuccessPage = currentPath === '/booking-success';
  
  const routeServiceKey = !isSuccessPage && currentPath.startsWith('/book/') 
    ? currentPath.split('?')[0].split('/').pop() 
    : '';

  const serviceKeyClean = routeServiceKey === 'event-coverage' 
    ? 'tech-events-coverage' 
    : routeServiceKey;

  const activeService = servicesData[serviceKeyClean];

  // Retrieve plan parameter from query string
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = (urlParams.get('plan') || 'starter').toLowerCase();
  
  let selectedPlan = null;
  if (activeService && activeService.pricing) {
    if (planParam === 'growth') {
      selectedPlan = activeService.pricing.growth;
    } else {
      selectedPlan = activeService.pricing.starter;
    }
  }

  // Resolve service and plan based on path
  const activeServiceResolved = isDirectBook 
    ? servicesData[selectedServiceSlug] 
    : activeService;

  const selectedPlanResolved = isDirectBook
    ? (activeServiceResolved && activeServiceResolved.pricing
        ? (selectedPlanSlug === 'growth' ? activeServiceResolved.pricing.growth : activeServiceResolved.pricing.starter)
        : null)
    : selectedPlan;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSuccessPage) {
      document.title = 'Booking Confirmed | Behind the Build';
    } else if (isDirectBook) {
      document.title = 'Book a Plan | Behind the Build';
    } else if (activeServiceResolved && selectedPlanResolved) {
      document.title = `Book ${activeServiceResolved.name} - ${selectedPlanResolved.planName} | Behind the Build`;
    }
  }, [isSuccessPage, isDirectBook, activeServiceResolved, selectedPlanResolved]);

  const handleSpaNav = (e, path) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.requirements.trim()) errors.requirements = 'Project details are required';

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
      region: formData.location || 'Remote',
      services: [
        {
          service: activeServiceResolved.name,
          serviceSlug: isDirectBook ? selectedServiceSlug : routeServiceKey,
          plan: selectedPlanResolved.planName,
          price: selectedPlanResolved.price,
          location: formData.location || 'Remote',
          referenceLink: formData.referenceLink || 'None',
          preferredStartDate: formData.preferredStartDate || 'Flexible'
        }
      ],
      budget: selectedPlanResolved.price,
      timeline: formData.preferredStartDate || 'Flexible',
      project_description: formData.requirements
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
        throw new Error(data.error || data.message || 'Unable to submit your request. Please try again.');
      }

      // Store success info
      localStorage.setItem('success_booking_id', data.booking_id || data.bookingId || 'BTB-2026-00124');
      localStorage.setItem('success_service', activeServiceResolved.name);
      localStorage.setItem('success_plan', selectedPlanResolved.planName);
      localStorage.setItem('success_amount', selectedPlanResolved.price);

      // Redirect to booking-success
      window.history.pushState(null, '', '/booking-success');
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      console.error('Booking submission failed:', err);
      setSubmissionError('Unable to complete your booking. Please check details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS PAGE
  if (isSuccessPage) {
    const bookingId = localStorage.getItem('success_booking_id') || 'BTB-2026-00124';
    const serviceName = localStorage.getItem('success_service') || 'Brand Building';
    const planName = localStorage.getItem('success_plan') || 'Growth';
    const amount = localStorage.getItem('success_amount') || 'Custom';

    return (
      <div className="bg-brand-white text-[#212121] pt-28 pb-16 min-h-screen font-sans text-left flex items-center">
        <div className="max-w-xl mx-auto px-6 md:px-12 w-full space-y-12">
          
          <ScrollReveal delay={0} yOffset={15} className="flex justify-start">
            <CheckCircle2 className="w-16 h-16 text-[#C8041C] stroke-[1.25px]" />
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal delay={0.12} yOffset={25}>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
                THANK YOU.<br />YOUR PROJECT IS IN.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.24} yOffset={15}>
              <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold">
                We've received your booking details. Our team will review your requirements and get back to you shortly.
              </p>
            </ScrollReveal>
          </div>

          {/* Details Block */}
          <ScrollReveal delay={0.35} yOffset={15} className="border border-[#E6E6E6] bg-[#FAF9F9] p-6 space-y-4 rounded-xl">
            <div className="space-y-2 text-xs font-semibold text-[#212121]/80">
              <div className="flex justify-between pb-2 border-b border-[#E6E6E6]">
                <span className="text-[#212121]/45 font-mono">BOOKING ID</span>
                <span className="font-mono text-brand-red font-bold">{bookingId}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#212121]/45">SERVICE</span>
                <span>{serviceName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#212121]/45">PLAN</span>
                <span>{planName}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6E6E6]">
                <span className="text-[#212121]/45">AMOUNT</span>
                <span className="font-bold text-[#212121]">{amount}</span>
              </div>
            </div>
            
            <p className="text-[10px] sm:text-xs text-[#212121]/50 leading-relaxed pt-2">
              * We've sent a confirmation email to your email address.
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal delay={0.45} yOffset={15} className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={(e) => handleSpaNav(e, '/')}
              className="bg-[#212121] text-brand-white hover:bg-[#C8041C] px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
            >
              <span>BACK TO HOME</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new Event('popstate'));
                setTimeout(() => {
                  const element = document.querySelector('#work');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }, 150);
              }}
              className="border-2 border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-brand-white px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
            >
              <span>VIEW OUR WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </ScrollReveal>

        </div>
      </div>
    );
  }

  // BOOKING FORM PAGE
  if (!activeServiceResolved || !selectedPlanResolved) {
    return (
      <div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">
        LOADING BOOKING...
      </div>
    );
  }

  return (
    <div className="bg-brand-white text-[#212121] pt-28 pb-16 min-h-screen font-sans text-left">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Header Block */}
        <div className="space-y-4 pt-8">
          <ScrollReveal yOffset={10} duration={0.6}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              BOOKING DETAILS
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
              LET'S BUILD SOMETHING.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.24} yOffset={15} duration={0.6} className="pt-2">
            <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-semibold max-w-xl">
              Tell us about your project and we'll get back to you shortly.
            </p>
          </ScrollReveal>
        </div>

        <hr className="border-[#E6E6E6]" />

        {/* Selected Plan Summary Banner */}
        <ScrollReveal delay={0.1} yOffset={15} className="border border-[#E6E6E6] bg-[#FAF9F9] p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 flex flex-col justify-start">
            <span className="text-[9px] font-mono font-black text-[#212121]/45 uppercase tracking-widest block leading-none">
              SERVICE
            </span>
            {isDirectBook ? (
              <select
                value={selectedServiceSlug}
                onChange={(e) => setSelectedServiceSlug(e.target.value)}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-3 py-1.5 rounded text-xs font-black text-brand-charcoal uppercase focus:outline-none focus:border-[#C8041C] transition-all cursor-pointer w-full max-w-[200px]"
              >
                <option value="video-editing">VIDEO EDITING</option>
                <option value="social-media-marketing">SOCIAL MEDIA MARKETING</option>
                <option value="design">DESIGN</option>
                <option value="website-design">WEBSITE DESIGN</option>
                <option value="tech-events-coverage">TECH EVENT COVERAGE</option>
                <option value="digital-marketing">DIGITAL MARKETING</option>
              </select>
            ) : (
              <span className="text-sm font-black text-brand-charcoal uppercase block mt-1.5">
                {activeServiceResolved.name}
              </span>
            )}
          </div>
          
          <div className="space-y-1 flex flex-col justify-start">
            <span className="text-[9px] font-mono font-black text-[#212121]/45 uppercase tracking-widest block leading-none">
              PLAN
            </span>
            {isDirectBook ? (
              <select
                value={selectedPlanSlug}
                onChange={(e) => setSelectedPlanSlug(e.target.value)}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-3 py-1.5 rounded text-xs font-black text-brand-charcoal uppercase focus:outline-none focus:border-[#C8041C] transition-all cursor-pointer w-full max-w-[120px]"
              >
                <option value="starter">STARTER</option>
                <option value="growth">GROWTH</option>
              </select>
            ) : (
              <span className="text-sm font-black text-brand-charcoal uppercase block mt-1.5">
                {selectedPlanResolved.planName}
              </span>
            )}
          </div>

          <div className="space-y-1 flex flex-col justify-start">
            <span className="text-[9px] font-mono font-black text-[#212121]/45 uppercase tracking-widest block leading-none">
              PRICE
            </span>
            <span className="text-sm font-black text-[#C8041C] uppercase block mt-1.5">
              {selectedPlanResolved.price} <span className="text-[10px] text-brand-charcoal/45 font-semibold">/ {selectedPlanResolved.billing}</span>
            </span>
          </div>
        </ScrollReveal>

        {/* Booking Form Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form Inputs */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                Full Name *
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
                Email Address *
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
                Phone Number *
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
                placeholder="e.g. Acme Corp"
              />
            </div>

            {/* Project Location */}
            <div className="flex flex-col">
              <label htmlFor="location" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                Project Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="e.g. Bangalore / Remote"
              />
            </div>

            {/* Preferred Start Date */}
            <div className="flex flex-col">
              <label htmlFor="preferredStartDate" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                Preferred Start Date (Optional)
              </label>
              <input
                type="text"
                id="preferredStartDate"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="e.g. Mid-September 2026"
              />
            </div>

            {/* Reference / Portfolio Link */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="referenceLink" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                Reference / Portfolio Link (Optional)
              </label>
              <input
                type="text"
                id="referenceLink"
                name="referenceLink"
                value={formData.referenceLink}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="e.g. https://behance.net/brand"
              />
            </div>

            {/* Project Details / Requirements */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="requirements" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                Project Details / Requirements *
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows="5"
                value={formData.requirements}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold resize-none"
                placeholder="Describe your design parameters, video hooks, marketing goals, pages list..."
              />
              {formErrors.requirements && (
                <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.requirements}</span>
              )}
            </div>

          </div>

          {/* Right Action Column */}
          <div className="lg:col-span-4 space-y-6 w-full">
            <div className="border border-[#E6E6E6] p-6 space-y-4 rounded-xl">
              <h4 className="text-[10px] font-mono font-black text-brand-charcoal/45 uppercase tracking-widest leading-none">
                TERMS
              </h4>
              <p className="text-[11px] text-[#212121]/60 leading-relaxed font-semibold">
                By submitting this request, you agree to Behind The Build reviewing your project and contacting you via email or phone within 24 hours.
              </p>
            </div>

            {submissionError && (
              <div className="text-xs text-[#C8041C] font-semibold">
                {submissionError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#212121] hover:bg-[#C8041C] text-brand-white py-4.5 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-3.5 h-3.5 animate-spin" />
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM BOOKING</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => handleSpaNav(e, isDirectBook ? '/' : `/services/${routeServiceKey}`)}
              className="w-full py-4 text-xs font-mono font-black uppercase tracking-widest text-[#212121]/50 hover:text-[#C8041C] transition-colors block text-center"
            >
              ← BACK TO PLAN SELECTOR
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
