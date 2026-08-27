import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight, Loader } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

export default function BookingPage({ currentPath }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    requirements: '',
    timeline: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const isSuccessPage = currentPath === '/booking-success';

  // Parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service'); // e.g. 'video-editing'
  const planParam = (urlParams.get('plan') || 'starter').toLowerCase();

  // Route fallback key (handles /booking/video-editing or /book/video-editing style)
  const routeServiceKey = serviceParam || (!isSuccessPage && (currentPath.startsWith('/book/') || currentPath.startsWith('/booking/'))
    ? currentPath.split('?')[0].split('/').pop() 
    : '');

  // Direct access to general /booking page without service parameter
  const isDirectBook = !isSuccessPage && !routeServiceKey;

  // Dropdown states (used when isDirectBook is true)
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('video-editing');
  const [selectedPlanSlug, setSelectedPlanSlug] = useState('starter');

  const serviceKeyClean = (routeServiceKey === 'event-coverage' || routeServiceKey === 'tech-event-coverage' || routeServiceKey === 'tech-events-coverage')
    ? 'tech-events-coverage' 
    : routeServiceKey;

  const activeService = servicesData[serviceKeyClean];

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

    const priceText = selectedPlanResolved.price + (selectedPlanResolved.billing ? ` / ${selectedPlanResolved.billing}` : '');

    const bookingPayload = {
      // New columns layout compatibility
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company_name: formData.company.trim() || null,
      project_location: formData.location.trim() || 'Remote',
      project_details: formData.requirements.trim(),
      project_timeline: formData.timeline.trim() || 'Flexible',
      service: activeServiceResolved.name,
      plan: selectedPlanResolved.planName,
      price: priceText,

      // Legacy/Standard fields mapping
      client_name: formData.name.trim(),
      region: formData.location.trim() || 'Remote',
      services: [
        {
          service: activeServiceResolved.name,
          serviceSlug: isDirectBook ? selectedServiceSlug : routeServiceKey,
          plan: selectedPlanResolved.planName,
          price: priceText,
          location: formData.location.trim() || 'Remote',
          preferredStartDate: formData.timeline.trim() || 'Flexible'
        }
      ],
      budget: priceText,
      timeline: formData.timeline.trim() || 'Flexible',
      project_description: formData.requirements.trim()
    };

    try {
      console.log("Booking submission started");
      console.log("Booking payload:", bookingPayload);

      const API_URL = import.meta.env.VITE_API_URL || '';
      const requestUrl = `${API_URL}/api/bookings`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 20000);

      let response;
      try {
        response = await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingPayload),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeoutId);
      }

      console.log("Booking API response status:", response.status);

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textError = await response.text();
        console.error('[API Error] Received non-JSON response body:', textError);
        throw new Error(`Server returned a non-JSON response (${response.status}).`);
      }

      console.log("Booking API response data:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Unable to submit your request. Please try again.');
      }

      // Store success info
      const finalBookingId = data.booking_id || data.bookingId || 'BTB-2026-0001';
      localStorage.setItem('success_booking_id', finalBookingId);
      localStorage.setItem('success_service', activeServiceResolved.name);
      localStorage.setItem('success_plan', selectedPlanResolved.planName);
      localStorage.setItem('success_amount', priceText);
      localStorage.setItem('success_email', formData.email.trim().toLowerCase());

      // Trigger background email sending (Vercel-compatible serverless-safe async call)
      if (data.emailPayload) {
        const emailRequestUrl = `${API_URL}/api/bookings/send-emails`;
        fetch(emailRequestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            booking_id: finalBookingId,
            emailPayload: data.emailPayload
          })
        }).then(emailResponse => {
          console.log('[Background Email] Sent trigger result:', emailResponse.status);
        }).catch(emailErr => {
          console.error('[Background Email Exception] Trigger failed:', emailErr);
        });
      }

      // Redirect to booking-success
      window.history.pushState(null, '', '/booking-success');
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      console.error("Booking submission error:", err);
      if (err.name === 'AbortError') {
        setSubmissionError('Unable to submit your booking right now. Please try again.');
      } else {
        setSubmissionError(err.message || 'Unable to submit your booking right now. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS PAGE
  if (isSuccessPage) {
    const bookingId = localStorage.getItem('success_booking_id') || 'BTB-2026-0001';
    const serviceName = localStorage.getItem('success_service') || 'Brand Building';
    const planName = localStorage.getItem('success_plan') || 'Growth';
    const amount = localStorage.getItem('success_amount') || 'Custom';
    const emailVal = localStorage.getItem('success_email') || 'customer@email.com';

    return (
      <div className="bg-brand-white text-[#212121] pt-32 pb-24 min-h-screen font-sans text-left flex items-center select-none">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Heading & Workflow */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Success Indicator & Red Label */}
              <ScrollReveal delay={0} yOffset={15} className="space-y-6">
                <div className="w-16 h-16 rounded-full border border-[#C8041C] flex items-center justify-center text-[#C8041C]">
                  <svg className="w-6 h-6 stroke-[2px] stroke-current fill-none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                
                <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
                  BOOKING CONFIRMATION
                </span>
              </ScrollReveal>

              {/* Headline & Sub-headline */}
              <div className="space-y-4">
                <ScrollReveal delay={0.12} yOffset={25}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#212121] leading-[1.05]">
                    YOUR PROJECT<br />
                    <span className="text-[#C8041C]">IS IN MOTION.</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.24} yOffset={15} className="space-y-2 pt-2">
                  <h3 className="text-base font-bold text-[#212121]">
                    Thank you for choosing Behind The Build.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold max-w-xl">
                    Your project details have been received. Our team will review your requirements and get back to you shortly.
                  </p>
                </ScrollReveal>
              </div>

              <hr className="border-[#E6E6E6]" />

              {/* What Happens Next Block */}
              <div className="space-y-8">
                <ScrollReveal delay={0.3} yOffset={15}>
                  <h4 className="text-xs font-mono font-black uppercase tracking-widest text-[#212121]/45">
                    WHAT HAPPENS NEXT?
                  </h4>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <ScrollReveal delay={0.35} yOffset={15} className="space-y-3">
                    <span className="text-3xl font-mono font-black text-[#C8041C] block leading-none">01</span>
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#212121]">PROJECT REVIEW</h5>
                    <p className="text-xs text-[#212121]/60 leading-relaxed font-semibold">
                      Our team will review your project requirements.
                    </p>
                  </ScrollReveal>

                  {/* Step 2 */}
                  <ScrollReveal delay={0.4} yOffset={15} className="space-y-3">
                    <span className="text-3xl font-mono font-black text-[#C8041C] block leading-none">02</span>
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#212121]">TEAM CONTACT</h5>
                    <p className="text-xs text-[#212121]/60 leading-relaxed font-semibold">
                      We'll contact you using the details provided.
                    </p>
                  </ScrollReveal>

                  {/* Step 3 */}
                  <ScrollReveal delay={0.45} yOffset={15} className="space-y-3">
                    <span className="text-3xl font-mono font-black text-[#C8041C] block leading-none">03</span>
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#212121]">PROJECT START</h5>
                    <p className="text-xs text-[#212121]/60 leading-relaxed font-semibold">
                      Once everything is confirmed, we'll move forward with your project.
                    </p>
                  </ScrollReveal>
                </div>
              </div>

            </div>

            {/* Right Column: Booking Details Card */}
            <div className="lg:col-span-5 w-full">
              <ScrollReveal delay={0.2} yOffset={25} className="border border-[#E6E6E6] bg-[#FAF9F9] p-8 space-y-6 rounded-xl w-full">
                
                <h4 className="text-[10px] font-mono font-black text-[#212121]/45 uppercase tracking-widest leading-none pb-2 border-b border-[#E6E6E6]">
                  BOOKING DETAILS
                </h4>

                <div className="space-y-4 text-xs font-semibold text-[#212121]/80">
                  
                  {/* ID */}
                  <div className="flex flex-col py-1 space-y-1">
                    <span className="text-[9px] font-mono text-[#212121]/45 uppercase tracking-widest font-black">BOOKING ID</span>
                    <span className="font-mono text-[#C8041C] text-sm font-bold">{bookingId}</span>
                  </div>

                  <hr className="border-[#E6E6E6]/60" />

                  {/* Service */}
                  <div className="flex flex-col py-1 space-y-1">
                    <span className="text-[9px] font-mono text-[#212121]/45 uppercase tracking-widest font-black">SERVICE</span>
                    <span className="text-[#212121] uppercase text-xs font-black tracking-wide">{serviceName}</span>
                  </div>

                  <hr className="border-[#E6E6E6]/60" />

                  {/* Package */}
                  <div className="flex flex-col py-1 space-y-1">
                    <span className="text-[9px] font-mono text-[#212121]/45 uppercase tracking-widest font-black">PACKAGE</span>
                    <span className="text-[#212121] uppercase text-xs font-black tracking-wide">{planName}</span>
                  </div>

                  <hr className="border-[#E6E6E6]/60" />

                  {/* Price */}
                  <div className="flex flex-col py-1 space-y-1">
                    <span className="text-[9px] font-mono text-[#212121]/45 uppercase tracking-widest font-black">PRICE</span>
                    <span className="text-[#C8041C] text-xs font-black tracking-wide">{amount}</span>
                  </div>

                  <hr className="border-[#E6E6E6]/60" />

                  {/* Customer Email */}
                  <div className="flex flex-col py-1 space-y-1">
                    <span className="text-[9px] font-mono text-[#212121]/45 uppercase tracking-widest font-black">CUSTOMER EMAIL</span>
                    <span className="text-[#212121] text-xs font-mono">{emailVal}</span>
                  </div>

                </div>

              </ScrollReveal>
            </div>

          </div>

          <hr className="border-[#E6E6E6]" />

          {/* Action CTAs */}
          <ScrollReveal delay={0.5} yOffset={15} className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <button
              onClick={(e) => handleSpaNav(e, '/')}
              className="bg-[#212121] text-brand-white hover:bg-[#C8041C] px-10 py-5 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto rounded-full hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(200,4,28,0.25)] group"
            >
              <span>BACK TO HOME</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
            </button>

            <a
              href="/#work"
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
              className="text-xs font-mono font-black uppercase tracking-widest text-[#212121] hover:text-[#C8041C] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW OUR WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </ScrollReveal>

        </div>
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
              BOOK YOUR PROJECT
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
              BOOK YOUR PROJECT.
            </h1>
          </ScrollReveal>
        </div>

        <hr className="border-[#E6E6E6]" />

        {/* Selected Plan Summary Banner */}
        <ScrollReveal delay={0.1} yOffset={15} className="border border-[#E6E6E6] bg-[#FAF9F9] p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 flex flex-col justify-start">
            <span className="text-[9px] font-mono font-black text-[#212121]/45 uppercase tracking-widest block leading-none">
              Selected Service:
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
              <span className="text-sm font-black text-brand-charcoal uppercase block mt-1.5 leading-none">
                {activeServiceResolved.name}
              </span>
            )}
          </div>
          
          <div className="space-y-1 flex flex-col justify-start">
            <span className="text-[9px] font-mono font-black text-[#212121]/45 uppercase tracking-widest block leading-none">
              Selected Package:
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
              <span className="text-sm font-black text-brand-charcoal uppercase block mt-1.5 leading-none">
                {selectedPlanResolved.planName}
              </span>
            )}
          </div>

          <div className="space-y-1 flex flex-col justify-start">
            <span className="text-[9px] font-mono font-black text-[#212121]/45 uppercase tracking-widest block leading-none">
              Price:
            </span>
            <span className="text-sm font-black text-[#C8041C] uppercase block mt-1.5 leading-none">
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
                FULL NAME *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="Your full name"
              />
              {formErrors.name && (
                <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.name}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="you@company.com"
              />
              {formErrors.email && (
                <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.email}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                PHONE NUMBER *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="+91 XXXXX XXXXX"
              />
              {formErrors.phone && (
                <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.phone}</span>
              )}
            </div>

            {/* Company / Brand Name */}
            <div className="flex flex-col">
              <label htmlFor="company" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                COMPANY / BRAND NAME
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="Your company or brand"
              />
            </div>

            {/* Project Location */}
            <div className="flex flex-col">
              <label htmlFor="location" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                PROJECT LOCATION
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="City / Remote"
              />
            </div>

            {/* Project Timeline */}
            <div className="flex flex-col">
              <label htmlFor="timeline" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                PROJECT TIMELINE
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold"
                placeholder="e.g. 2 weeks / Ongoing / Specific dates"
              />
            </div>

            {/* Project Details & Requirements */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="requirements" className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65">
                PROJECT DETAILS & REQUIREMENTS *
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows="5"
                value={formData.requirements}
                onChange={handleInputChange}
                className="mt-2 bg-[#FAF9F9] border border-[#E6E6E6] px-4 py-3 rounded-lg text-sm text-brand-charcoal focus:outline-none focus:border-[#C8041C] transition-all font-semibold resize-none"
                placeholder="Tell us about your project, requirements, timeline, goals, or anything else we should know."
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
                  <span>SUBMIT BOOKING</span>
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
