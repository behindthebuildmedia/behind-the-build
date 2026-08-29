import { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { ArrowRight, CheckCircle2, Loader } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

export default function StartProjectFlow({ currentPath }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    requirements: '',
    plan: 'GROWTH'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Map route param to service data keys
  const routeServiceKey = currentPath.startsWith('/start-a-project/') 
    ? currentPath.split('/').pop() 
    : '';

  const serviceDataKey = routeServiceKey === 'event-coverage' 
    ? 'tech-events-coverage' 
    : routeServiceKey;

  const activeService = servicesData[serviceDataKey];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentPath === '/start-a-project') {
      document.title = 'Start a Project | Behind the Build';
    } else if (activeService) {
      document.title = `Start a ${activeService.name} Project | Behind the Build`;
    } else if (currentPath === '/project-submitted') {
      document.title = 'Project Inquiry Received | Behind the Build';
    }
  }, [currentPath, activeService]);

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
          service: activeService.name,
          plan: formData.plan
        }
      ],
      budget: formData.plan === 'STARTER' ? 'Starter Price' : 'Growth Price',
      timeline: 'Monthly Deliverables',
      project_description: `Location: ${formData.location}\n\nRequirements:\n${formData.requirements || 'None'}`
    };

    try {
      const requestUrl = '/api/bookings';
      
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

      // Store selection details for success screen
      localStorage.setItem('submitted_service', activeService.name);
      localStorage.setItem('submitted_plan', formData.plan);

      // Redirect to success route
      window.history.pushState(null, '', '/project-submitted');
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmissionError('Unable to submit your project request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 4: SUCCESS PAGE RENDER
  if (currentPath === '/project-submitted') {
    const serviceName = localStorage.getItem('submitted_service') || 'Brand Building';
    const planName = localStorage.getItem('submitted_plan') || 'CUSTOM';

    return (
      <div className="bg-brand-white text-[#212121] pt-28 pb-16 min-h-screen font-sans text-left flex items-center">
        <div className="max-w-xl mx-auto px-6 md:px-12 w-full space-y-12">
          
          <ScrollReveal delay={0} yOffset={15} className="flex justify-start">
            <CheckCircle2 className="w-16 h-16 text-[#C8041C] stroke-[1.25px]" />
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal delay={0.12} yOffset={25}>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none">
                PROJECT RECEIVED.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.24} yOffset={15}>
              <p className="text-xs sm:text-sm text-[#212121]/60 leading-relaxed font-semibold">
                Thanks for reaching out to Behind The Build. We've received your project details and will get back to you shortly.
              </p>
            </ScrollReveal>
          </div>

          {/* Reference Block */}
          <ScrollReveal delay={0.35} yOffset={15} className="border border-[#E6E6E6] bg-[#FAF9F9] p-6 space-y-3">
            <span className="text-[10px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
              PROJECT SUMMARY
            </span>
            <div className="space-y-1.5 text-xs font-semibold text-[#212121]/80">
              <div className="flex justify-between">
                <span className="text-[#212121]/50">SERVICE:</span>
                <span>{serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#212121]/50">PLAN:</span>
                <span>{planName}</span>
              </div>
            </div>
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

  // STEP 3: FORM VIEW RENDER
  if (activeService) {
    const starterPrice = activeService.pricing.starter ? activeService.pricing.starter.price : 'Custom';
    const growthPrice = activeService.pricing.growth ? activeService.pricing.growth.price : 'Custom';

    return (
      <div className="bg-brand-white text-[#212121] pt-28 pb-16 min-h-screen font-sans text-left">
        <div className="max-w-4xl mx-auto px-6 md:px-12 w-full space-y-16">
          
          {/* Header Area */}
          <div className="space-y-4 pt-8">
            <ScrollReveal yOffset={10} duration={0.6}>
              <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
                START A PROJECT
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
                {activeService.name}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.24} yOffset={15} duration={0.6} className="pt-2">
              <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-semibold max-w-xl">
                Tell us a little about your project. We'll get back to you with the right plan.
              </p>
            </ScrollReveal>
          </div>

          <hr className="border-[#E6E6E6]" />

          {/* Form and selectors */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side form fields */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
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
                  placeholder="e.g. Acme Corp"
                />
              </div>

              {/* Project Location */}
              <div className="flex flex-col md:col-span-2">
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
                {formErrors.location && (
                  <span className="text-xs text-[#C8041C] mt-1 font-semibold">{formErrors.location}</span>
                )}
              </div>

              {/* Project Details & Requirements */}
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
                  placeholder="Describe your visual style, timeline, features or marketing objectives..."
                />
              </div>
            </div>

            {/* Right side pricing plan selector */}
            <div className="lg:col-span-5 space-y-6 w-full">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/65 block">
                SELECT A PLAN
              </span>
              
              <div className="flex flex-col gap-4">
                {/* Starter Plan option */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, plan: 'STARTER' }))}
                  className={`w-full p-6 text-left border rounded-xl transition-all duration-300 flex flex-col justify-between ${
                    formData.plan === 'STARTER'
                      ? 'border-[#C8041C] bg-[#FAF9F9]'
                      : 'border-[#E6E6E6] bg-brand-white hover:border-brand-charcoal/20'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-black tracking-widest text-[#212121]/45 uppercase block">
                      STARTER
                    </span>
                    <span className="text-xl font-black text-brand-charcoal leading-none block">
                      {starterPrice}
                    </span>
                  </div>
                </button>

                {/* Growth Plan option */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, plan: 'GROWTH' }))}
                  className={`w-full p-6 text-left border rounded-xl transition-all duration-300 flex flex-col justify-between relative ${
                    formData.plan === 'GROWTH'
                      ? 'border-[#C8041C] bg-[#FAF9F9]'
                      : 'border-[#E6E6E6] bg-brand-white hover:border-brand-charcoal/20'
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-[8px] font-mono font-bold bg-[#C8041C] text-brand-white px-2 py-0.5 tracking-wider uppercase">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-black tracking-widest text-[#212121]/45 uppercase block">
                      GROWTH
                    </span>
                    <span className="text-xl font-black text-brand-charcoal leading-none block">
                      {growthPrice}
                    </span>
                  </div>
                </button>
              </div>

              {submissionError && (
                <div className="text-xs text-[#C8041C] font-semibold">
                  {submissionError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#212121] hover:bg-[#C8041C] text-brand-white py-4.5 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-3.5 h-3.5 animate-spin" />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT REQUEST</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={(e) => handleSpaNav(e, '/start-a-project')}
                className="w-full py-4 text-xs font-mono font-black uppercase tracking-widest text-[#212121]/50 hover:text-[#C8041C] transition-colors block text-center"
              >
                ← BACK TO SERVICES
              </button>
            </div>

          </form>

        </div>
      </div>
    );
  }

  // STEP 1: SERVICE SELECTION PAGE
  const servicesList = [
    {
      num: '01',
      title: 'VIDEO EDITING',
      desc: 'Professional short-form editing for brands, founders, products and technology companies.',
      path: '/start-a-project/video-editing'
    },
    {
      num: '02',
      title: 'SOCIAL MEDIA MARKETING',
      desc: 'Strategy, content and management designed to build a consistent digital presence.',
      path: '/start-a-project/social-media-marketing'
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'Creative design systems that make your brand look consistent and recognizable.',
      path: '/start-a-project/design'
    },
    {
      num: '04',
      title: 'TECH EVENT COVERAGE',
      desc: 'Professional photo and video coverage for launches, conferences, campus and technology events.',
      path: '/start-a-project/event-coverage'
    },
    {
      num: '05',
      title: 'DIGITAL MARKETING',
      desc: 'Strategic digital marketing designed to grow your visibility, reach and audience.',
      path: '/start-a-project/digital-marketing'
    }
  ];

  return (
    <div className="bg-brand-white text-[#212121] pt-28 pb-16 min-h-screen font-sans text-left">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Hero Area */}
        <div className="space-y-4 pt-8">
          <ScrollReveal yOffset={10} duration={0.6}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#C8041C] block">
              START A PROJECT
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.12} yOffset={25} duration={0.6}>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05]">
              LET'S BUILD<br />SOMETHING.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.24} yOffset={15} duration={0.6} className="pt-2">
            <p className="text-xs sm:text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-semibold max-w-2xl">
              Tell us what you're building and we'll figure out the right way to bring it to life.
            </p>
          </ScrollReveal>
        </div>

        <hr className="border-[#E6E6E6]" />

        {/* Categories Block */}
        <div className="space-y-8">
          <ScrollReveal delay={0} yOffset={15}>
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#212121]/50 block">
              WHAT ARE YOU LOOKING FOR?
            </span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {servicesList.map((service, idx) => (
              <ScrollReveal key={idx} delay={0.1 * idx} className="flex flex-col h-full w-full">
                <a
                  href={service.path}
                  onClick={(e) => handleSpaNav(e, service.path)}
                  className="group relative bg-brand-white border border-[#E6E6E6] p-8 rounded-xl flex flex-col justify-between transition-all duration-300 w-full h-full transform hover:-translate-y-1.5 hover:border-[#C8041C]/35 hover:bg-[#FAF9F9] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
                  style={{ minHeight: '260px' }}
                >
                  <div className="space-y-4">
                    <span className="text-2xl font-mono font-black text-[#C8041C] leading-none select-none block">
                      {service.num}
                    </span>
                    <h3 className="text-lg font-black tracking-wider uppercase text-brand-charcoal leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-semibold">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#212121] transition-all duration-300">
                    <span>SELECT</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:text-[#C8041C] text-[#212121]/50" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
