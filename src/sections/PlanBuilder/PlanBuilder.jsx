import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { useReducedMotion } from '../../hooks/useReducedMotion';

import editingImg from '../../assets/images/services/editing.webp';
import eventsImg from '../../assets/images/services/events.webp';
import socialImg from '../../assets/images/services/social.webp';

const RICH_SERVICES = [
  {
    id: 'video-editing',
    name: 'VIDEO EDITING',
    title: 'TURN RAW FOOTAGE INTO POWERFUL STORIES',
    desc: 'Professional short-form editing for brands, founders, products and technology companies.',
    image: editingImg,
    deliverables: [
      'Short-form vertical reels',
      'Founder & profile videos',
      'Product & technology demos',
      'Educational content',
      'Captions & subtitles',
      'Motion graphics',
      'Sound design',
      'Basic color correction'
    ],
    plans: [
      { 
        id: 'starter', 
        name: 'Starter', 
        price: '₹6,000', 
        period: 'month', 
        desc: 'Essential content package',
        highlights: ['8 videos', 'Standard subtitles', 'Sound design']
      },
      { 
        id: 'growth', 
        name: 'Growth', 
        price: '₹9,000', 
        period: 'month', 
        desc: 'Enhanced content package',
        isPopular: true, 
        highlights: ['12 videos', 'Product videos', 'Motion graphics']
      },
      { 
        id: 'scale', 
        name: 'Scale', 
        price: '₹14,000', 
        period: 'month', 
        desc: 'Full content package',
        highlights: ['20 videos', 'Educational content', 'Advanced graphics']
      }
    ],
    ctaText: 'Choose Video Editing'
  },
  {
    id: 'event-coverage',
    name: 'EVENT COVERAGE',
    title: 'CAPTURE EVERY IMPORTANT MOMENT',
    desc: 'Professional visual coverage for events, launches, campus programs, corporate events and brand experiences.',
    image: eventsImg,
    note: 'Larger events or requirements involving multiple photographers/cameras, extensive editing, same-day delivery or travel can be quoted separately.',
    deliverables: [
      'Professional event photography',
      'Edited/high-quality photographs',
      'Key moments & candid coverage',
      'Professional video coverage',
      'Event highlight footage',
      'Multiple camera coverage',
      'Highlight video delivery',
      'Social media reels cuts'
    ],
    plans: [
      { 
        id: '1-3-hours', 
        name: '1–3 HOURS', 
        price: 'Starting from ₹10,000', 
        period: 'session', 
        desc: 'Short event session',
        highlights: ['Event photography', 'Candid coverage', 'Basic post-production']
      },
      { 
        id: '3-5-hours', 
        name: '3–5 HOURS', 
        price: 'Starting from ₹14,000', 
        period: 'session', 
        desc: 'Half-day event package',
        isPopular: true,
        highlights: ['Photo + Videography', 'Short-form reels', 'Highlight video']
      },
      { 
        id: '6-hours', 
        name: '6 HOURS', 
        price: 'Starting from ₹18,000', 
        period: 'session', 
        desc: 'Full-day event coverage',
        highlights: ['Full event coverage', 'Photographer + Videographer', 'Priority same-week delivery']
      }
    ],
    ctaText: 'Plan Event Coverage'
  },
  {
    id: 'social-media-design',
    name: 'SOCIAL MEDIA & DESIGN',
    title: "BUILD YOUR BRAND'S SOCIAL PRESENCE",
    desc: 'Social strategy and creative design combined into one service.',
    image: socialImg,
    deliverables: [
      'Social media strategy',
      'Content planning & calendar',
      'Instagram content execution',
      'Reels/content planning',
      'Content scheduling & posting',
      'Social media post designs',
      'Carousel designs & stories templates',
      'Promotional & event creatives'
    ],
    plans: [
      { 
        id: 'starter', 
        name: 'Starter', 
        price: '₹5,000', 
        period: 'month', 
        desc: 'Essential feed setup',
        highlights: ['Instagram strategy', 'Content calendar', 'Carousel posts']
      },
      { 
        id: 'growth', 
        name: 'Growth', 
        price: '₹8,000', 
        period: 'month', 
        desc: 'Enhanced distribution',
        isPopular: true,
        highlights: ['Competitor research', 'Posting strategy', 'Reach analysis']
      },
      { 
        id: 'scale', 
        name: 'Scale', 
        price: '₹12,000', 
        period: 'month', 
        desc: 'Full organic optimization',
        highlights: ['Advanced strategy', 'Continuous content loops', 'Deep monthly reports']
      }
    ],
    ctaText: 'Choose Social Media & Design'
  }
];

export default function PlanBuilder({ onSuccess }) {
  const [step, setStep] = useState(1); // 1 = Configurator, 2 = Form, 3 = Summary Review
  const [direction, setDirection] = useState(1);
  const [activeServiceId, setActiveServiceId] = useState('video-editing');
  const [selectedPlanId, setSelectedPlanId] = useState('growth');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    requirements: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const { isMobile } = useResponsive();
  const shouldReduceMotion = useReducedMotion();

  // Derived active service and active plan
  const activeService = RICH_SERVICES.find(s => s.id === activeServiceId) || RICH_SERVICES[0];
  const activePlan = activeService.plans.find(p => p.id === selectedPlanId) || activeService.plans[1] || activeService.plans[0];

  const handleServiceChange = (id) => {
    setActiveServiceId(id);
    const serviceObj = RICH_SERVICES.find(s => s.id === id);
    const hasGrowth = serviceObj.plans.some(p => p.id === 'growth');
    const hasHours = serviceObj.plans.some(p => p.id === '3-5-hours');
    
    if (hasGrowth) {
      setSelectedPlanId('growth');
    } else if (hasHours) {
      setSelectedPlanId('3-5-hours');
    } else {
      setSelectedPlanId(serviceObj.plans[0].id);
    }
  };

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

  const handleContinueToForm = () => {
    setDirection(1);
    setStep(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setDirection(1);
      setStep(3);
    }
  };

  const handleBackToStep = (targetStep) => {
    setDirection(-1);
    setStep(targetStep);
  };

  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    if (!validateForm()) {
      setStep(2);
      return;
    }
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
          plan: activePlan.name
        }
      ],
      budget: `${activePlan.price} / ${activePlan.period}`,
      timeline: activeServiceId === 'event-coverage' ? 'Flexible Delivery' : 'Monthly Deliverables',
      project_description: `Location: ${formData.location}\nDate: ${formData.date || 'N/A'}\n\nRequirements:\n${formData.requirements || 'None'}`
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

  const stepVariants = {
    initial: (dir) => ({
      opacity: 0,
      y: dir > 0 ? 15 : -15,
      transition: { duration: 0.3, ease: 'easeOut' }
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -15 : 15,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  return (
    <section id="services" className="pt-12 pb-2 bg-white border-t border-brand-charcoal/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full text-center">
        
        {/* Header */}
        {step === 1 && (
          <div className="mb-12 space-y-4 max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C] font-sans">04 / SERVICES</p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal font-sans">
              OUR SERVICES<span className="text-[#C8041C]">.</span>
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-brand-charcoal uppercase font-sans tracking-wide">
              "CREATE. EDIT. SHARE."
            </p>
            <p className="text-sm sm:text-base text-brand-charcoal/60 leading-relaxed font-sans max-w-md mx-auto">
              Professional content solutions for modern brands.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="configurator"
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8 text-left"
            >
              {/* Service Navigation Tabs */}
              <div className="flex flex-row justify-center gap-8 md:gap-16 border-b border-brand-charcoal/10 pb-6 max-w-4xl mx-auto overflow-x-auto scrollbar-none whitespace-nowrap px-4 w-full">
                {RICH_SERVICES.map((service) => {
                  const isActive = activeServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceChange(service.id)}
                      className="relative py-4 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider cursor-pointer focus:outline-none group shrink-0"
                    >
                      <div className={`flex items-center gap-2 transition-colors duration-300 ${
                        isActive ? 'text-[#C8041C]' : 'text-brand-charcoal/60 hover:text-[#C8041C]'
                      }`}>
                        {service.id === 'video-editing' && <Icons.Film className="w-4 h-4 shrink-0" />}
                        {service.id === 'event-coverage' && <Icons.Camera className="w-4 h-4 shrink-0" />}
                        {service.id === 'social-media-design' && <Icons.Share2 className="w-4 h-4 shrink-0" />}
                        <span>{service.name}</span>
                      </div>
                      {isActive ? (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8041C] origin-center"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      ) : (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C8041C] transition-all duration-300 ease-out group-hover:w-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main Service Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
                {/* Left Side: Content & Deliverables */}
                <div className="lg:col-span-7 space-y-10">
                  <div className="space-y-4">
                    <motion.h3 
                      key={`${activeServiceId}-title`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal font-sans leading-[1.05]"
                    >
                      {activeService.title}
                    </motion.h3>
                    <p className="text-sm sm:text-base text-brand-charcoal/70 leading-relaxed font-sans max-w-xl">
                      {activeService.desc}
                    </p>
                  </div>

                  {/* "WHAT WE DO" Deliverables */}
                  <div className="space-y-6 pt-6 border-t border-brand-charcoal/5">
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#C8041C] uppercase block">
                      WHAT WE DO
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {activeService.deliverables.map((item, idx) => {
                        const displayNum = String(idx + 1).padStart(2, '0');
                        return (
                          <div key={idx} className="flex items-start gap-4 py-2.5 border-b border-brand-charcoal/5">
                            <span className="text-[10px] font-sans font-bold text-[#C8041C] mt-0.5">
                              {displayNum}
                            </span>
                            <span className="text-xs sm:text-sm font-sans text-brand-charcoal/70 leading-tight">
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {activeService.note && (
                    <p className="text-[10px] text-brand-charcoal/45 italic leading-relaxed pt-2 font-sans">
                      * {activeService.note}
                    </p>
                  )}
                </div>

                {/* Right Side: Image */}
                <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-brand-charcoal/10">
                  <motion.img
                    key={activeService.image}
                    src={activeService.image}
                    alt={activeService.name}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Plans Section */}
              <div className="space-y-10 pt-10 border-t border-brand-charcoal/5 max-w-6xl mx-auto">
                <div className="text-center space-y-2">
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brand-charcoal font-sans">
                    CHOOSE YOUR PLAN
                  </h4>
                  <p className="text-xs text-brand-charcoal/50 font-sans uppercase tracking-widest">
                    Transparent, simple pricing retainers
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {activeService.plans.map((plan) => {
                    const isPlanActive = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        className={`relative border bg-brand-white p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between h-[360px] ${
                          isPlanActive
                            ? 'border-[#C8041C] shadow-lg shadow-brand-red/5'
                            : 'border-brand-charcoal/10'
                        }`}
                      >
                        {plan.isPopular && (
                          <span className="absolute -top-3.5 left-8 px-3 py-1 bg-gradient-to-r from-[#C8041C] to-[#8A0314] text-white text-[8px] font-sans font-bold uppercase tracking-widest rounded-full">
                            Popular
                          </span>
                        )}

                        <div className="space-y-4">
                          <div>
                            <h5 className="text-lg font-bold tracking-tight text-brand-charcoal uppercase">
                              {plan.name}
                            </h5>
                            <p className="text-xs text-brand-charcoal/50 font-sans lowercase block mt-0.5">
                              {plan.desc}
                            </p>
                          </div>

                          <div className="pt-2">
                            <span className="text-3xl font-extrabold text-brand-charcoal tracking-tight leading-none">
                              {plan.price}
                            </span>
                            <span className="text-[10px] text-brand-charcoal/40 font-sans lowercase ml-1">
                              / {plan.period}
                            </span>
                          </div>

                          <ul className="space-y-2 pt-4 border-t border-brand-charcoal/5">
                            {plan.highlights.map((highlight, hIdx) => (
                              <li key={hIdx} className="text-xs text-brand-charcoal/70 flex items-center gap-2 font-sans">
                                <span className="w-1.5 h-1.5 bg-[#C8041C] rounded-full shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`w-full py-3 text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 border ${
                            isPlanActive
                              ? 'bg-gradient-to-r from-[#C8041C] to-[#8A0314] border-[#C8041C] text-white'
                              : 'bg-transparent border-brand-charcoal/20 text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-charcoal/5'
                          }`}
                        >
                          {isPlanActive ? 'SELECTED' : 'SELECT PLAN'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="flex justify-center w-full pt-0">
                <button
                  onClick={handleContinueToForm}
                  className="w-[290px] h-[44px] bg-white border border-brand-charcoal text-brand-charcoal rounded-[22px] px-6 text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-[#C8041C] hover:to-[#8A0314] hover:border-[#C8041C] hover:text-white flex justify-between items-center group cursor-pointer"
                >
                  <span>CHOOSE {activeService.name}</span>
                  <span className="font-sans text-sm transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    →
                  </span>
                </button>
              </div>

            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="booking-form"
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl mx-auto text-left"
            >
              {/* Top Progress bar */}
              <div className="space-y-2 mb-10">
                <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/40">
                  <span>Step 2 of 3</span>
                  <span className="text-[#C8041C]">50% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-brand-charcoal/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-[#C8041C] rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-3 mb-10">
                <button
                  onClick={() => handleBackToStep(1)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8041C] hover:text-[#C8041C]/80 transition-colors focus-ring mb-2 mb-2"
                >
                  <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back to Services
                </button>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-[1.05] font-sans">
                  LET'S TALK ABOUT YOUR <span className="text-[#C8041C]">PROJECT.</span>
                </h2>
                <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-sans font-normal max-w-xl">
                  Tell us about your goals and we'll prepare the perfect creative production plan.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Form Inputs */}
                <div className="lg:col-span-8 bg-brand-white border border-brand-charcoal/5 p-5 sm:p-10 rounded-[24px] shadow-sm">
                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Your Name *
                      </label>
                      <div className={`relative flex items-center mt-2 rounded-xl border bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300 ${
                        formErrors.name ? 'border-[#C8041C]' : 'border-brand-charcoal/10'
                      }`}>
                        <div className="absolute left-4 text-brand-charcoal/30">
                          <Icons.User className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      {formErrors.name && (
                        <span className="text-xs text-[#C8041C] mt-1 font-mono">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col">
                      <label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Company Name
                      </label>
                      <div className="relative flex items-center mt-2 rounded-xl border border-brand-charcoal/10 bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300">
                        <div className="absolute left-4 text-brand-charcoal/30">
                          <Icons.Briefcase className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal"
                          placeholder="e.g. Acme Corp"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Email Address *
                      </label>
                      <div className={`relative flex items-center mt-2 rounded-xl border bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300 ${
                        formErrors.email ? 'border-[#C8041C]' : 'border-brand-charcoal/10'
                      }`}>
                        <div className="absolute left-4 text-brand-charcoal/30">
                          <Icons.Mail className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal"
                          placeholder="e.g. john@company.com"
                        />
                      </div>
                      {formErrors.email && (
                        <span className="text-xs text-[#C8041C] mt-1 font-mono">{formErrors.email}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Phone Number *
                      </label>
                      <div className={`relative flex items-center mt-2 rounded-xl border bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300 ${
                        formErrors.phone ? 'border-[#C8041C]' : 'border-brand-charcoal/10'
                      }`}>
                        <div className="absolute left-4 text-brand-charcoal/30">
                          <Icons.Phone className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal"
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>
                      {formErrors.phone && (
                        <span className="text-xs text-[#C8041C] mt-1 font-mono">{formErrors.phone}</span>
                      )}
                    </div>

                    {/* Project Location */}
                    <div className="flex flex-col">
                      <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Project Location *
                      </label>
                      <div className={`relative flex items-center mt-2 rounded-xl border bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300 ${
                        formErrors.location ? 'border-[#C8041C]' : 'border-brand-charcoal/10'
                      }`}>
                        <div className="absolute left-4 text-brand-charcoal/30">
                          <Icons.MapPin className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal"
                          placeholder="e.g. Mumbai, India / Remote"
                        />
                      </div>
                      {formErrors.location && (
                        <span className="text-xs text-[#C8041C] mt-1 font-mono">{formErrors.location}</span>
                      )}
                    </div>

                    {/* Project Date */}
                    <div className="flex flex-col">
                      <label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Project Date (If relevant)
                      </label>
                      <div className="relative flex items-center mt-2 rounded-xl border border-brand-charcoal/10 bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300">
                        <div className="absolute left-4 text-brand-charcoal/30">
                          <Icons.Calendar className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <input
                          type="text"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal"
                          placeholder="e.g. Mid-September 2026"
                        />
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="requirements" className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                        Project Details & Requirements
                      </label>
                      <div className="relative flex mt-2 rounded-xl border border-brand-charcoal/10 bg-brand-white focus-within:border-[#C8041C] focus-within:ring-2 focus-within:ring-[#C8041C]/10 transition-all duration-300">
                        <div className="absolute left-4 top-4 text-brand-charcoal/30">
                          <Icons.MessageSquare className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <textarea
                          id="requirements"
                          name="requirements"
                          rows="4"
                          value={formData.requirements}
                          onChange={handleInputChange}
                          className="w-full bg-transparent pl-12 pr-4 py-4 text-sm focus:outline-none placeholder-brand-charcoal/30 text-brand-charcoal resize-none"
                          placeholder="Describe your project, editing deliverables, shoot parameters, or social goals..."
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <button
                        type="submit"
                        className="w-full bg-brand-charcoal text-brand-white hover:bg-[#C8041C] hover:text-brand-white py-4.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300"
                      >
                        Continue to Summary <Icons.ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Summary Invoice Panel */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="border border-brand-charcoal/10 bg-brand-white p-6 sm:p-8 rounded-[24px]">
                    <div className="flex items-center gap-3 pb-6 border-b border-brand-charcoal/5">
                      <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red">
                        <Icons.FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left leading-none">
                        <h4 className="text-xs font-bold uppercase tracking-tight text-brand-charcoal font-sans">
                          YOUR SUMMARY
                        </h4>
                        <p className="text-[8px] font-mono text-brand-charcoal/40 uppercase tracking-widest font-bold mt-1">
                          ESTIMATED SUMMARY
                        </p>
                      </div>
                    </div>

                    {/* Selected Service */}
                    <div className="space-y-2 py-6 border-b border-brand-charcoal/5 text-left">
                      <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest block font-bold">
                        Selected Service
                      </span>
                      <span className="text-xs font-bold text-brand-charcoal block">
                        {activeService.name} - {activePlan.name}
                      </span>
                    </div>

                    {/* Price & Timeline */}
                    <div className="grid grid-cols-2 gap-4 py-6 border-b border-brand-charcoal/5 text-left">
                      <div>
                        <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest block font-bold">
                          Estimated Budget
                        </span>
                        <span className="text-base font-black text-brand-red font-sans leading-none tracking-tight block mt-1.5">
                          {activePlan.price}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest block font-bold">
                          Estimated Timeline
                        </span>
                        <span className="text-xs font-bold text-brand-charcoal block mt-2">
                          {activeServiceId === 'event-coverage' ? 'Flexible Delivery' : 'Monthly Deliverables'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="summary-review"
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl mx-auto text-left"
            >
              {/* Top Progress bar */}
              <div className="space-y-2 mb-10">
                <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase tracking-wider text-brand-charcoal/40">
                  <span>Step 3 of 3</span>
                  <span className="text-[#C8041C]">100% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-brand-charcoal/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-[#C8041C] rounded-full"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-brand-charcoal font-sans">
                  Review Plan Summary
                </h3>
                <button
                  onClick={() => handleBackToStep(2)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8041C] hover:text-[#C8041C]/80 transition-colors focus-ring"
                >
                  <Icons.ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Left: Invoice items list */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border border-brand-charcoal/10 bg-brand-white p-6 sm:p-8 rounded-[24px]">
                    <h4 className="text-xs font-bold font-mono tracking-widest text-[#C8041C] uppercase mb-6 pb-2 border-b border-brand-charcoal/5">
                      YOUR SELECTION
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">SERVICE CHANNEL</span>
                          <h5 className="font-bold text-sm sm:text-base uppercase text-brand-charcoal tracking-tight">
                            {activeService.name}
                          </h5>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">PLAN TYPE</span>
                          <h5 className="font-bold text-sm sm:text-base uppercase text-brand-charcoal tracking-tight">
                            {activePlan.name}
                          </h5>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-brand-charcoal/5">
                        <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">DELIVERABLES INCLUDED</span>
                        <ul className="mt-2 space-y-2">
                          {activeService.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed">
                              <Icons.Check className="w-3.5 h-3.5 text-[#C8041C] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-brand-charcoal/10">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-brand-charcoal uppercase">ESTIMATED RATE:</span>
                        <div className="text-right">
                          <span className="text-lg sm:text-xl font-extrabold text-brand-charcoal tracking-tight">
                            {activePlan.price}
                          </span>
                          <span className="text-xs text-brand-charcoal/50 font-mono lowercase ml-1">
                            / {activePlan.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] font-sans text-brand-charcoal/40 mt-2 text-right leading-normal font-normal">
                        No hidden fees. Final quote confirmed after discovery call.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Lead info summary */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="border border-brand-charcoal/10 bg-brand-white p-6 sm:p-8 rounded-[24px]">
                    <h4 className="text-xs font-bold font-mono tracking-widest text-[#C8041C] uppercase mb-6 pb-2 border-b border-brand-charcoal/5">
                      YOUR INFORMATION
                    </h4>

                    <div className="space-y-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">CLIENT NAME</span>
                        <p className="font-bold text-brand-charcoal mt-0.5">{formData.name}</p>
                      </div>

                      {formData.company && (
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">COMPANY</span>
                          <p className="font-bold text-brand-charcoal mt-0.5">{formData.company}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">EMAIL</span>
                          <p className="font-bold text-brand-charcoal mt-0.5 truncate">{formData.email}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">PHONE</span>
                          <p className="font-bold text-brand-charcoal mt-0.5">{formData.phone}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">LOCATION</span>
                          <p className="font-bold text-brand-charcoal mt-0.5">{formData.location}</p>
                        </div>
                        {formData.date && (
                          <div>
                            <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">PROJECT DATE</span>
                            <p className="font-bold text-brand-charcoal mt-0.5">{formData.date}</p>
                          </div>
                        )}
                      </div>

                      {formData.requirements && (
                        <div>
                          <span className="text-[10px] font-mono text-brand-charcoal/40 uppercase">REQUIREMENTS</span>
                          <p className="text-brand-charcoal/70 mt-1 italic leading-relaxed text-xs">"{formData.requirements}"</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit request button */}
                  <button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#C8041C] text-brand-white py-4.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C8041C]/90 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? 'SUBMITTING REQUEST...' : 'REQUEST QUOTE'} <Icons.Send className="w-4 h-4" />
                  </button>

                  {/* Submission Failure Feedback */}
                  {submissionError && (
                    <p className="text-xs text-[#C8041C] font-mono mt-4 text-center leading-relaxed bg-brand-red/5 p-4 rounded-xl border border-brand-red/10">
                      {submissionError}
                    </p>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
