import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Play, Check, Compass, Camera, Sliders, TrendingUp, Share2, Quote } from 'lucide-react';
import { projects } from '../../data/projects';
import { useResponsive } from '../../hooks/useResponsive';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import campusInsightImage from '../../assets/projects/campus_insight.webp';
import hackverseImage from '../../assets/projects/hackverse.webp';
import santhoshAvatar from '../../assets/projects/santhosh.webp';
import showcaseReels from '../../assets/projects/showcase_reels.webp';
import showcaseYoutube from '../../assets/projects/showcase_youtube.webp';
import showcaseBts from '../../assets/projects/showcase_bts.webp';
import showcaseShorts from '../../assets/projects/showcase_shorts.webp';
import partner1Logo from '../../assets/images/partner_1.webp';
import partner2Logo from '../../assets/images/partner_2.webp';
import logoUrl from '../../assets/images/btb logo.webp';

// Animated count up number sub-component
function AnimatedCounter({ value, duration = 1.5 }) {
  const match = value.match(/([\d.]+)/);
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffix = value.replace(match ? match[0] : '', '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numericPart;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30;
    const steps = Math.ceil(totalMiliseconds / incrementTime);
    const stepValue = (end - start) / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const currentVal = start + stepValue * currentStep;
      if (currentStep >= steps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentVal);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericPart, duration]);

  const displayValue = Number.isInteger(numericPart) ? Math.round(count) : count.toFixed(1);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

// Sparkline SVG graph sub-component
function MiniSparkline({ color = '#C8041C' }) {
  const points = "0,15 15,25 30,5 45,30 60,10 75,20 90,8 105,25 120,5";
  return (
    <div className="w-full h-8 mt-4 overflow-hidden opacity-50 hover:opacity-100 transition-opacity">
      <svg className="w-full h-full" viewBox="0 0 120 30" preserveAspectRatio="none">
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

const GALLERY_MEDIA = {
  'consistency-ai': [
    { title: 'Retention Optimization Sequence', category: 'Instagram Reels', image: showcaseReels },
    { title: 'AI Automation Editorial Cut', category: 'YouTube', image: showcaseYoutube },
    { title: 'Behind the Camera: Lighting Setup', category: 'Behind The Scenes', image: showcaseBts },
    { title: 'Brand Narrative Loop', category: 'Shorts', image: showcaseShorts }
  ],
  'delusionai': [
    { title: 'Cinematic Interview Sequence', category: 'YouTube', image: showcaseYoutube },
    { title: 'Motion Graphic Explanation', category: 'Shorts', image: showcaseShorts },
    { title: 'Sound Design Behind the Scenes', category: 'Behind The Scenes', image: showcaseBts },
    { title: 'High-Hook Introduction Cut', category: 'Instagram Reels', image: showcaseReels }
  ],
  'campus-insight': [
    { title: 'Interactive Tour Teaser', category: 'YouTube', image: showcaseYoutube },
    { title: 'Student Life Story Cut', category: 'Instagram Reels', image: showcaseReels },
    { title: 'Campus Drone Flyover', category: 'Shorts', image: showcaseShorts },
    { title: 'Lighting & Interview Setup', category: 'Behind The Scenes', image: showcaseBts }
  ],
  'hackverse': [
    { title: 'Official Launch Trailer', category: 'YouTube', image: showcaseYoutube },
    { title: 'Developer Hype Short', category: 'Shorts', image: showcaseShorts },
    { title: 'Trailer Post-Production Breakdown', category: 'Behind The Scenes', image: showcaseBts },
    { title: 'Sponsor Spotlight Edit', category: 'Instagram Reels', image: showcaseReels }
  ]
};

const MOCK_PROJECTS = {
  'campus-insight': {
    id: 'campus-insight',
    name: 'Campus Insight',
    client: 'Campus Insight',
    industry: 'EdTech Platform',
    challenge: 'Campus Insight needed to make academic documentation and university life highly engaging to increase student registration and retention across their digital learning portal.',
    solution: 'Behind The Build created a dynamic course showcase content system, using high-end campus tours, student stories, and cinematic educational videography.',
    servicesDelivered: ['Video Editing', 'Content Production', 'Creative Strategy'],
    duration: '4 Months',
    results: [
      '5M+ Student Reach',
      '120K+ Subscriptions',
      '15% Conversion Lift'
    ],
    image: campusInsightImage,
    partnerLogo: partner1Logo,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-in-horizontal-position-41712-large.mp4',
    overview: 'Behind The Build produced a high-end educational branding campaign for Campus Insight, focusing on storytelling, high production value, and visual engagement.'
  },
  'hackverse': {
    id: 'hackverse',
    name: 'HackVerse',
    client: 'HackVerse LLC',
    industry: 'Developer Ecosystem',
    challenge: 'HackVerse wanted to build massive buzz and secure 15,000+ developer registrations for their global hybrid hackathon within a tight 6-week marketing window.',
    solution: 'Behind The Build delivered a premium tech trailer, dynamic motion graphic teasers, and high-energy coding shorts showcasing previous hackathon highlights.',
    servicesDelivered: ['Motion Graphics', 'Video Editing', 'Creative Strategy'],
    duration: '2 Months',
    results: [
      '1.2M Dev Impressions',
      '15K+ Registrations',
      '85% Engagement Index'
    ],
    image: hackverseImage,
    partnerLogo: partner2Logo,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40618-large.mp4',
    overview: 'Behind The Build crafted a premium tech campaign for HackVerse, utilizing motion design, fast-paced editing, and high-energy developer aesthetics.'
  }
};

const DETAIL_PROJECT_STORIES = {
  'consistency-ai': {
    name: 'Consistency.AI',
    subtitle: 'Premium Content Production & Video Editing',
    heroMetrics: [
      { value: '12M+', label: 'Organic Views' },
      { value: '420K+', label: 'Community Growth' },
      { value: '4.2×', label: 'Engagement Rate' }
    ],
    challengeHeading: 'Building an education brand that students actually enjoy watching.',
    challengeParagraph: 'Consistency.AI wanted to build a stronger digital presence by creating high-quality educational content that consistently engaged students and professionals while increasing organic reach across social platforms. Traditional educational content was perceived as dry and hard to consume, requiring a complete editorial re-engineering.',
    goalList: ['Maximize reach', 'Increase engagement', 'Grow community'],
    outcomeMetrics: [
      { value: '12M+', label: 'Organic Views' },
      { value: '420K+', label: 'Community Growth' },
      { value: '4.2×', label: 'Engagement Rate' },
      { value: '3.6×', label: 'Watch Time Increase' },
      { value: '180+', label: 'Content Pieces' }
    ],
    feedbackQuote: 'Behind The Build transformed our ideas into powerful content that actually connects.',
    feedbackAuthorName: 'Santhosh Kumar Thota',
    feedbackAuthorTitle: 'Founder',
    feedbackAuthorCompany: 'Consistency.AI',
    feedbackAuthorAvatar: santhoshAvatar,
    services: [
      { name: 'Video Editing', desc: 'Premium pacing, color workspace setups, and narrative post-production.' },
      { name: 'Content Production', desc: 'On-set production grids, mirrorless cinema camera shoots, and lighting.' },
      { name: 'Social Media Content', desc: 'Optimized reels, hooks scripting, and short-form visual aesthetics.' },
      { name: 'Creative Strategy', desc: 'Audience analytics tracking, editorial calendars, and brand positioning.' }
    ]
  },
  'delusionai': {
    name: 'DelusionAI',
    subtitle: 'Cinematic Mental Health Visual Narratives',
    heroMetrics: [
      { value: '30K+', label: 'Views in 30 Days' },
      { value: '3.8×', label: 'Community Growth' },
      { value: '78%', label: 'Watch Retention' }
    ],
    challengeHeading: 'Transforming clinical research into stories that actually enjoy and connect.',
    challengeParagraph: 'DelusionAI wanted to make mental health conversations more accessible through engaging visual storytelling while building trust and growing a strong online community. Navigating sensitive topics with emotional resonance was the core challenge.',
    goalList: ['Educate & connect', 'Build deep trust', 'Increase retention'],
    outcomeMetrics: [
      { value: '30K+', label: 'Views in 30 Days' },
      { value: '3.8×', label: 'Community Growth' },
      { value: '78%', label: 'Watch Retention' },
      { value: '2.4×', label: 'Shares Increase' },
      { value: '45+', label: 'Production Hours' }
    ],
    feedbackQuote: 'The level of cinematic detail and strategic positioning Behind The Build brought to our brand was unmatched.',
    feedbackAuthorName: 'Sarah Chen',
    feedbackAuthorTitle: 'Co-Founder',
    feedbackAuthorCompany: 'DelusionAI',
    feedbackAuthorAvatar: santhoshAvatar,
    services: [
      { name: 'Video Editing', desc: 'Cinematic color sequencing and dialogue synchronization.' },
      { name: 'Motion Graphics', desc: 'Visual models, typography maps, and animated abstract backgrounds.' },
      { name: 'Social Media Content', desc: 'High-hook edits, reels cuts, and title design guides.' },
      { name: 'Brand Storytelling', desc: 'Narrative arcs building, audience profile fits, and visual guidelines.' }
    ]
  },
  'campus-insight': {
    name: 'Campus Insight',
    subtitle: 'Digital Tours & Interactive Student Onboarding',
    heroMetrics: [
      { value: '5M+', label: 'Student Reach' },
      { value: '120K+', label: 'Subscriptions' },
      { value: '15%', label: 'Conversion Lift' }
    ],
    challengeHeading: 'Showcasing university life in an authentic way students actually enjoy and trust.',
    challengeParagraph: 'Campus Insight needed to make academic documentation and university life highly engaging to increase student registration and retention across their digital learning portal.',
    goalList: ['Boost enrollment', 'Elevate campus aura', 'Build student trust'],
    outcomeMetrics: [
      { value: '5M+', label: 'Student Reach' },
      { value: '120K+', label: 'Subscriptions' },
      { value: '15%', label: 'Conversion Lift' },
      { value: '4.5×', label: 'Click-Through Rate' },
      { value: '60+', label: 'Course Modules' }
    ],
    feedbackQuote: 'They managed to capture the vibrant spirit of our campus in a way that feels organic and premium.',
    feedbackAuthorName: 'Dr. Ramesh Nair',
    feedbackAuthorTitle: 'Director of Admissions',
    feedbackAuthorCompany: 'Campus Insight',
    feedbackAuthorAvatar: santhoshAvatar,
    services: [
      { name: 'Video Editing', desc: 'Seamless pacing, audio mixing, and multi-camera assembly.' },
      { name: 'Content Production', desc: 'Cinematic drone shots, architectural tours, and interview setups.' },
      { name: 'Creative Strategy', desc: 'Campaign timelines, messaging guidelines, and student targeting.' }
    ]
  },
  'hackverse': {
    name: 'HackVerse',
    subtitle: 'Global Hybrid Coding Event Marketing Campaign',
    heroMetrics: [
      { value: '1.2M', label: 'Dev Impressions' },
      { value: '15K+', label: 'Registrations' },
      { value: '85%', label: 'Engagement Index' }
    ],
    challengeHeading: 'Creating massive global builder hype in a highly enjoy-focused competitive space.',
    challengeParagraph: 'HackVerse wanted to build massive buzz and secure 15,000+ developer registrations for their global hybrid hackathon within a tight 6-week marketing window.',
    goalList: ['Secure signups', 'Engage top builders', 'Maximize sponsorships'],
    outcomeMetrics: [
      { value: '1.2M', label: 'Dev Impressions' },
      { value: '15K+', label: 'Registrations' },
      { value: '85%', label: 'Engagement Index' },
      { value: '3.2×', label: 'Social Shares' },
      { value: '100+', label: 'Project Submissions' }
    ],
    feedbackQuote: 'Our trailer went viral within the developer ecosystem and exceeded our registration target within weeks.',
    feedbackAuthorName: 'Elena Rostova',
    feedbackAuthorTitle: 'Lead Organizer',
    feedbackAuthorCompany: 'HackVerse LLC',
    feedbackAuthorAvatar: santhoshAvatar,
    services: [
      { name: 'Motion Graphics', desc: 'Abstract code grids, particle overlays, and animated title designs.' },
      { name: 'Video Editing', desc: 'Fast-paced edits, sound effects layering, and social teasers.' },
      { name: 'Creative Strategy', desc: 'Developer marketing angles, viral assets distribution, and timelines.' }
    ]
  }
};

function ProjectStoryCard({ project, onOpenDetail }) {
  return (
    <div
      onClick={onOpenDetail}
      className="group cursor-pointer text-left space-y-6"
    >
      {/* 1. IMAGE AREA */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#212121]/10 bg-brand-lightgray shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
        
        {/* Subtle dark gradient overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85 z-10 pointer-events-none" />
        
        <video
          src={project.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500 ease-out"
        />

        {/* Small Red Accent Line and Service Category label inside image */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="w-3 h-[2px] bg-[#C8041C]" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white">
            {project.servicesDelivered[0]}
          </span>
        </div>
      </div>

      {/* 2. CASE STUDY DETAILS */}
      <div className="space-y-4">
        {/* Case Study Label */}
        <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#212121]/45">
          {project.id === 'consistency-ai' ? 'CASE STUDY 01' : 'CASE STUDY 02'}
        </p>

        {/* Title and View Case Row */}
        <div className="flex justify-between items-baseline gap-4">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
              {project.name}
            </h3>
            <p className="text-xs text-[#212121]/60 font-sans mt-1.5">
              {project.id === 'consistency-ai' ? 'AI Education Platform' : 'Mental Health & Wellness Platform'}
            </p>
          </div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#212121] group-hover:text-[#C8041C] transition-colors shrink-0">
            VIEW CASE &rarr;
          </span>
        </div>

        {/* Divider */}
        <hr className="border-[#212121]/10" />

        {/* 3. RESULTS (Metrics) */}
        <div className="grid grid-cols-3 gap-4 py-2">
          {project.results.map((res, idx) => {
            const match = res.match(/^([\d.x\u00D7MX+]+)(.*)$/i);
            const value = match ? match[1].trim() : res;
            const label = match ? match[2].trim() : '';

            return (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-[#C8041C] tracking-tight leading-none font-sans">
                  {value}
                </p>
                <p className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#212121]/50 leading-tight">
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <hr className="border-[#212121]/10" />

        {/* 4. DETAILS ROW (Duration, Services, Industry) */}
        <div className="grid grid-cols-3 gap-4 text-xs font-sans text-[#212121]/60">
          <div>
            <p className="font-bold text-[#212121] uppercase text-[9px] tracking-wider mb-1">DURATION</p>
            <p>{project.duration}</p>
          </div>
          <div>
            <p className="font-bold text-[#212121] uppercase text-[9px] tracking-wider mb-1">SERVICES</p>
            <p className="line-clamp-1">{project.servicesDelivered.slice(0, 2).join(', ')}</p>
          </div>
          <div>
            <p className="font-bold text-[#212121] uppercase text-[9px] tracking-wider mb-1">INDUSTRY</p>
            <p className="line-clamp-1">
              {project.id === 'consistency-ai' ? 'AI Education' : 'Mental Health & Wellness'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('All');
  const [activeLightboxVideo, setActiveLightboxVideo] = useState(null);
  const { isMobile, isTouch } = useResponsive();
  const shouldReduceMotion = useReducedMotion();
  
  const [activeStoryTabs, setActiveStoryTabs] = useState({
    'consistency-ai': 'result',
    'delusionai': 'result'
  });

  // Dynamic SEO Metadata for Case Study Dialog
  useEffect(() => {
    if (!selectedProject) {
      // Restore home page metadata (only if not on the booking success screen)
      const isConfirmationPage = window.location.pathname === '/confirmation';
      if (!isConfirmationPage) {
        document.title = "Behind the Build";
        
        const updateMetaTag = (selector, attr, val) => {
          const el = document.querySelector(selector);
          if (el) el.setAttribute(attr, val);
        };

        const homeDesc = "Behind the Build helps businesses, brands, and creators turn ideas into powerful visual stories through videography, photography, content creation, and custom remote video editing.";
        const homeUrl = "https://behindthebuild.in/";

        updateMetaTag('meta[name="description"]', 'content', homeDesc);
        updateMetaTag('meta[property="og:title"]', 'content', document.title);
        updateMetaTag('meta[property="og:description"]', 'content', homeDesc);
        updateMetaTag('meta[property="og:url"]', 'content', homeUrl);
        updateMetaTag('meta[property="twitter:title"]', 'content', document.title);
        updateMetaTag('meta[property="twitter:description"]', 'content', homeDesc);
        updateMetaTag('meta[property="twitter:url"]', 'content', homeUrl);

        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) canonicalLink.setAttribute('href', homeUrl);

        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/');
        }
      }

      // Remove breadcrumb script
      const breadcrumbScript = document.getElementById('schema-breadcrumb');
      if (breadcrumbScript) breadcrumbScript.remove();

      return;
    }

    // A project study is selected and modal is open
    const title = `${selectedProject.name} Case Study | Behind the Build`;
    const desc = `How Behind the Build delivered visual value to ${selectedProject.name} in the ${selectedProject.industry} industry. Check out our process, deliverables, and final results.`;
    const path = `/case-studies/${selectedProject.id}`;
    const canonicalUrl = `https://behindthebuild.in${path}`;

    // Update document variables
    document.title = title;

    const updateMetaTag = (selector, attr, val) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, val);
    };

    updateMetaTag('meta[name="description"]', 'content', desc);
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', desc);
    updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    updateMetaTag('meta[property="twitter:title"]', 'content', title);
    updateMetaTag('meta[property="twitter:description"]', 'content', desc);
    updateMetaTag('meta[property="twitter:url"]', 'content', canonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl);

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    // Inject Case Study dynamic Breadcrumb JSON-LD schema
    let script = document.getElementById('schema-breadcrumb');
    if (!script) {
      script = document.createElement('script');
      script.id = 'schema-breadcrumb';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://behindthebuild.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": selectedProject.name,
          "item": canonicalUrl
        }
      ]
    });

  }, [selectedProject]);

  const handleOpenDetail = (project) => {
    setSelectedProject(project);
    setActiveShowcaseTab('All');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // restore scrolling
  };

  const handleCtaClick = () => {
    handleCloseDetail();
    // Scroll to configurator
    const configurator = document.querySelector('#build-plan');
    if (configurator) {
      const headerOffset = 60;
      const elementPosition = configurator.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: { 
      y: -10, 
      transition: { duration: 0.35, ease: 'easeOut' } 
    }
  };

  const arrowVariants = {
    initial: { x: 0, y: 0 },
    hover: { x: 3, y: -3, transition: { duration: 0.2, ease: 'easeInOut' } }
  };

  const lineVariants = {
    initial: { width: 0 },
    hover: { width: '100%', transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const overlayMaskVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.15, transition: { duration: 0.3 } }
  };

  return (
    <section id="work" className="py-20 md:py-24 bg-white relative overflow-hidden border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-16 text-left">
            <div className="md:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C]">
                01 / CASE STUDIES
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[45px] font-black uppercase tracking-tight text-[#212121] leading-none">
                WORK THAT <span className="text-[#C8041C]">SPEAKS.</span>
              </h2>
              <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#212121]/50 font-sans">
                Real projects. Real execution. Real results.
              </p>
            </div>
            <div className="md:col-span-5 md:pl-6 border-l border-[#212121]/10">
              <p className="text-sm sm:text-base text-[#212121]/70 leading-relaxed font-sans">
                We partner with brands and creators to craft visual stories that engage audiences and deliver measurable impact.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={shouldReduceMotion ? 0 : idx * 0.08} className="w-full">
              <ProjectStoryCard
                project={project}
                onOpenDetail={() => handleOpenDetail(project)}
              />
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Premium Fullscreen Project Detail View */}
      <AnimatePresence>
        {selectedProject && (() => {
          const story = DETAIL_PROJECT_STORIES[selectedProject.id] || DETAIL_PROJECT_STORIES['consistency-ai'];
          
          const moreProjects = [
            { id: 'consistency-ai', name: 'Consistency.AI', industry: 'AI Education Platform', image: projects.find(p => p.id === 'consistency-ai')?.image || consistencyThumbnail },
            { id: 'delusionai', name: 'DelusionAI', industry: 'Mental Health & Wellness', image: projects.find(p => p.id === 'delusionai')?.image || delusionaiThumbnail },
            { id: 'campus-insight', name: 'Campus Insight', industry: 'EdTech Platform', image: campusInsightImage },
            { id: 'hackverse', name: 'HackVerse', industry: 'Developer Ecosystem', image: hackverseImage }
          ].filter(p => p.id !== selectedProject.id).slice(0, 3);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-brand-white z-[999] overflow-y-auto font-sans"
              role="dialog"
              aria-modal="true"
            >
              {/* Sticky Top Header */}
              <div className="w-full border-b border-brand-charcoal/10 py-5 px-6 md:px-12 flex justify-between items-center bg-brand-white/80 backdrop-blur-md sticky top-0 z-[1001]">
                <div className="flex items-center gap-3">
                  <img 
                    src={logoUrl} 
                    alt="Behind the Build Logo" 
                    className="w-16 sm:w-20 object-contain animate-fadeIn" 
                  />
                  <span className="font-sans text-[10px] font-bold tracking-widest text-brand-charcoal/60 uppercase">
                    CASE STUDY NARRATIVE
                  </span>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-charcoal/50 hover:text-brand-charcoal transition-colors p-2.5 border border-brand-charcoal/10 hover:border-brand-charcoal/30 rounded-full focus-ring bg-brand-white"
                  aria-label="Close project view"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Section 1: Cinematic Hero */}
              <section className="min-h-[80vh] flex items-center py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column Content */}
                  <div className="lg:col-span-5 text-left space-y-6">
                    <div>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-red">
                        FEATURED PROJECT
                      </p>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-brand-charcoal leading-none mt-4">
                        {story.name}
                      </h1>
                      <p className="text-base sm:text-lg text-brand-charcoal/60 leading-relaxed mt-4 font-normal max-w-sm">
                        {story.subtitle}
                      </p>
                    </div>

                    {/* Animated Metrics */}
                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4 border-t border-brand-charcoal/10">
                      {story.heroMetrics.map((metric, i) => (
                        <div key={i}>
                          <span className="text-2xl sm:text-3xl font-black text-brand-red block font-sans tracking-tight">
                            <AnimatedCounter value={metric.value} />
                          </span>
                          <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest font-bold mt-1.5 block">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Scroll Indicator */}
                    <div className="pt-4 hidden lg:flex items-center gap-2.5 text-brand-charcoal/40 font-mono text-[9px] tracking-widest">
                      <div className="w-5 h-8 border border-brand-charcoal/20 rounded-full flex justify-center p-1">
                        <motion.div 
                          animate={{ y: [0, 8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-1 h-1.5 bg-brand-red rounded-full"
                        />
                      </div>
                      <span className="font-bold uppercase">SCROLL TO EXPLORE</span>
                    </div>
                  </div>

                  {/* Right Column Video */}
                  <div className="lg:col-span-7 w-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-lightgray rounded-[20px] shadow-[0_20px_48px_rgba(0,0,0,0.06)] border border-brand-charcoal/5">
                      <video
                        src={selectedProject.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-brand-charcoal/25 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: The Challenge */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left Column Description */}
                  <div className="lg:col-span-6 text-left space-y-12">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-charcoal/40">
                        02 / THE CHALLENGE
                      </span>
                      <h2 
                        className="text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-[1.1] text-brand-charcoal tracking-tight font-sans"
                        dangerouslySetInnerHTML={{ __html: story.challengeHeading }}
                      />
                    </div>
                    <p className="text-sm sm:text-base text-brand-charcoal/75 leading-relaxed font-normal">
                      {story.challengeParagraph}
                    </p>
                  </div>

                  {/* Right Column Graphic & Goal Card */}
                  <div className="lg:col-span-6 relative">
                    <div className="aspect-[16/10] overflow-hidden bg-brand-lightgray rounded-[20px] shadow-sm border border-brand-charcoal/5">
                      <img
                        src={selectedProject.image}
                        alt="Project challenge setting preview"
                        width="800"
                        height="500"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Floating circular Goal Card */}
                    <div className="sm:absolute sm:-bottom-6 sm:-right-6 relative bottom-0 right-0 mt-6 mx-auto bg-brand-charcoal text-brand-white p-6 sm:p-8 rounded-full w-44 h-44 sm:w-48 sm:h-48 flex flex-col justify-center items-center text-center shadow-lg border border-brand-white/10 z-10 hover:scale-105 transition-transform duration-300 select-none">
                      <span className="text-[9px] font-mono text-brand-red uppercase font-black tracking-widest block mb-2">
                        THE GOAL
                      </span>
                      <ul className="text-[10px] font-mono space-y-1 text-brand-white/80 font-bold uppercase leading-tight">
                        {story.goalList.map((goal, idx) => (
                          <li key={idx}>• {goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </section>

              {/* Section 3: Our Solution */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  {/* Section Title */}
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-charcoal/40">
                      03 / OUR SOLUTION
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-brand-charcoal tracking-tight font-sans leading-none">
                      End-to-End Content Production That Connects, Educates & Converts.
                    </h2>
                  </div>

                  {/* Process Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                      { icon: Compass, title: 'Strategy & Research', desc: 'Target audience profiling and structural editing scripting.' },
                      { icon: Camera, title: 'Content Production', desc: 'Dynamic camera setups and professional on-site video capturing.' },
                      { icon: Sliders, title: 'Editing & Motion', desc: 'Cinematic cuts, sound design mixes, and high-retention post-production.' },
                      { icon: TrendingUp, title: 'Optimization', desc: 'Multi-platform adapting formatting, hook templates, and pacing grids.' },
                      { icon: Share2, title: 'Publishing', desc: 'Consistent release calendar scheduling, retention analytics tracking, and revisions.' }
                    ].map((stepCard, idx) => (
                      <div 
                        key={idx}
                        className="bg-brand-white border border-brand-charcoal/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col justify-between group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-brand-red/5 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-brand-white transition-colors duration-300">
                          <stepCard.icon className="w-5 h-5 stroke-[1.5]" />
                        </div>
                        <div className="mt-8 space-y-2">
                          <h4 className="text-sm font-bold uppercase tracking-tight text-brand-charcoal font-sans">
                            {stepCard.title}
                          </h4>
                          <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                            {stepCard.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Section 4: Project Showcase */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  {/* Showcase Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-charcoal/40">
                        04 / PROJECT SHOWCASE
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-brand-charcoal tracking-tight font-sans leading-none">
                        Interactive Visual Showcase
                      </h2>
                    </div>

                    {/* Gallery Tabs */}
                    <div className="flex flex-wrap gap-2">
                      {['All', 'YouTube', 'Instagram Reels', 'Shorts', 'Behind The Scenes'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveShowcaseTab(tab)}
                          className={`text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 border rounded-full transition-all ${
                            activeShowcaseTab === tab
                              ? 'border-brand-red bg-brand-red text-brand-white'
                              : 'border-brand-charcoal/10 bg-transparent text-brand-charcoal/50 hover:text-brand-charcoal hover:border-brand-charcoal/30'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Showcase Media Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(() => {
                      const items = GALLERY_MEDIA[selectedProject.id] || [];
                      const filteredItems = activeShowcaseTab === 'All' ? items : items.filter(item => item.category === activeShowcaseTab);
                      
                      if (filteredItems.length === 0) {
                        return (
                          <div className="col-span-full py-12 text-center text-xs font-mono text-brand-charcoal/40 uppercase">
                            No showcase media files under this category.
                          </div>
                        );
                      }

                      return filteredItems.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setActiveLightboxVideo(selectedProject.videoUrl)}
                          className="group cursor-pointer bg-brand-white border border-brand-charcoal/5 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col h-full relative"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-brand-lightgray relative filter grayscale contrast-90 mix-blend-luminosity brightness-90 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500">
                            <img
                              src={item.image || selectedProject.image}
                              alt={item.title}
                              width="800"
                              height="500"
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Play Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <div className="w-12 h-12 rounded-full bg-brand-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-5 h-5 text-brand-red fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex-grow text-left space-y-1">
                            <span className="text-[8px] font-mono text-brand-charcoal/40 uppercase tracking-widest block font-bold">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-bold uppercase text-brand-charcoal font-sans tracking-tight">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>

                </div>
              </section>

              {/* Section 5: Results */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  {/* Results Heading */}
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-charcoal/40">
                      05 / THE OUTCOME
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-brand-charcoal tracking-tight font-sans leading-none">
                      Measurable Audience Growth, Engagement & Conversions.
                    </h2>
                  </div>

                  {/* Outcome Metric Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {story.outcomeMetrics.map((metric, i) => (
                      <div 
                        key={i}
                        className="bg-brand-white border border-brand-charcoal/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300"
                      >
                        <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest font-black block">
                          {metric.label}
                        </span>
                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-red block font-sans tracking-tight mt-6 leading-none">
                          <AnimatedCounter value={metric.value} />
                        </span>
                        {/* Self-drawing svg mini sparkline */}
                        <MiniSparkline color="#C8041C" />
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Section 6: Client Feedback */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full flex justify-center">
                  
                  <div className="max-w-3xl bg-brand-white border border-brand-charcoal/5 p-8 sm:p-12 md:p-16 rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.03)] text-center relative select-none">
                    <Quote className="w-10 h-10 text-brand-red/10 mx-auto mb-6 fill-current" />
                    
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-brand-charcoal tracking-tight font-sans leading-relaxed">
                      "{story.feedbackQuote}"
                    </h3>
                    
                    <div className="flex flex-col items-center justify-center mt-6 gap-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-brand-charcoal/10 shadow-sm bg-brand-lightgray">
                        <img 
                          src={story.feedbackAuthorAvatar} 
                          alt={story.feedbackAuthorName}
                          width="56"
                          height="56"
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-brand-charcoal font-sans leading-none">
                          {story.feedbackAuthorName}
                        </h4>
                        <p className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest font-black mt-1.5">
                          {story.feedbackAuthorTitle}, {story.feedbackAuthorCompany}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Section 7: Services Delivered */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  {/* Title */}
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-charcoal/40">
                      06 / DELIVERABLES
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-brand-charcoal tracking-tight font-sans leading-none">
                      Services Provided For This Build
                    </h2>
                  </div>

                  {/* Services Delivered Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {story.services.map((serv, idx) => (
                      <div 
                        key={idx}
                        className="bg-brand-white border border-brand-charcoal/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:border-brand-red transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        <div className="mt-6 space-y-1 text-left">
                          <h4 className="text-sm font-bold uppercase tracking-tight text-brand-charcoal font-sans">
                            {serv.name}
                          </h4>
                          <p className="text-xs text-brand-charcoal/60 leading-relaxed font-normal">
                            {serv.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Section 8: More Projects */}
              <section className="py-20 md:py-24 border-b border-brand-charcoal/5 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  <div className="space-y-4 max-w-xl">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-charcoal/40">
                      NEXT STORIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-brand-charcoal tracking-tight font-sans leading-none">
                      More Projects
                    </h2>
                  </div>

                  {/* Horizontal Case study cards list */}
                  <div className="space-y-6">
                    {moreProjects.map((proj) => (
                      <div 
                        key={proj.id}
                        onClick={() => {
                          const targetProj = projects.find(p => p.id === proj.id) || MOCK_PROJECTS[proj.id];
                          if (targetProj) {
                            handleOpenDetail(targetProj);
                            // Scroll modal container back to top
                            const modalContainer = document.querySelector('[role="dialog"]');
                            if (modalContainer) {
                              modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }
                        }}
                        className="group cursor-pointer bg-brand-white border border-brand-charcoal/5 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-stretch"
                      >
                        <div className="w-full md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden relative bg-brand-lightgray shrink-0">
                          <img 
                            src={proj.image} 
                            alt={proj.name}
                            width="600"
                            height="375"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow text-left">
                          <div className="space-y-4">
                            <span className="text-[9px] font-mono text-brand-charcoal/40 uppercase tracking-widest block font-bold">
                              {proj.industry}
                            </span>
                            <h4 className="text-xl md:text-2xl font-black uppercase text-brand-charcoal tracking-tight font-sans">
                              {proj.name}
                            </h4>
                          </div>
                          <button className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-brand-charcoal group-hover:text-brand-red transition-colors w-fit uppercase">
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Section 9: Final CTA */}
              <section className="py-20 md:py-24 bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-center space-y-12">
                  <div className="max-w-4xl mx-auto space-y-8 select-none">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-[1.05] text-brand-charcoal tracking-tight font-sans">
                      READY TO BUILD YOUR NEXT <span className="text-brand-red">SUCCESS STORY?</span>
                    </h2>
                    <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-sans max-w-lg mx-auto">
                      Let's create content that drives real impact for your brand.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                      <button
                        onClick={handleCtaClick}
                        className="bg-brand-red text-brand-white hover:bg-brand-red/90 px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(200,4,28,0.25)] active:scale-95"
                      >
                        Start Your Project
                      </button>
                      <button
                        onClick={handleCloseDetail}
                        className="border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] hover:shadow-sm active:scale-95 bg-transparent"
                      >
                        View More Work
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Detail Footer */}
              <div className="w-full border-t border-brand-charcoal/5 py-6 px-6 text-center text-[10px] font-mono text-brand-charcoal/40 bg-brand-white">
                &copy; BEHIND THE BUILD. ALL WORK SPECIFICATIONS ARE PROPRIETARY AND VERIFIED.
              </div>

              {/* Lightbox Modal overlay */}
              <AnimatePresence>
                {activeLightboxVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-brand-charcoal/95 z-[1000] flex items-center justify-center p-4 sm:p-8"
                  >
                    <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
                      <button
                        onClick={() => setActiveLightboxVideo(null)}
                        className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-brand-white transition-colors"
                        aria-label="Close video player"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
                      <video
                        src={activeLightboxVideo}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}

