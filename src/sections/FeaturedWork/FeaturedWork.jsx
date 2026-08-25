import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { projects } from '../../data/projects';
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

// Case Study Custom Outline SVG Icons
const UsersIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const FilmIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="12" y1="7" x2="22" y2="7"></line>
    <line x1="12" y1="17" x2="22" y2="17"></line>
    <line x1="2" y1="7" x2="12" y2="7"></line>
    <line x1="2" y1="17" x2="12" y2="17"></line>
  </svg>
);

const TargetIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const GrowthIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
  </svg>
);

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
    ],
    // Redesign properties
    servicesListText: 'Video Editing, Content Production, Creative Strategy',
    industry: 'AI Education Platform',
    duration: '4 Weeks',
    year: '2024',
    projectOverviewText: 'Consistency.AI is an online AI learning platform dedicated to making technology and programming accessible to students worldwide. We designed and captured a complete visual curriculum, combining mirrorless camera capturing with high-retention vertical editing.',
    challengeCards: [
      { title: 'Educational Hooks', desc: 'Make complex coding principles immediately engaging within the first three seconds.' },
      { title: 'Structured Formats', desc: 'Develop recurring series templates that build audience habits and high return rates.' },
      { title: 'Visual Retention', desc: 'Integrate precise pacing, typography maps, and code animation styles that hold attention.' }
    ],
    servicesDeliveredList: ['VIDEO EDITING', 'CONTENT PRODUCTION', 'SOCIAL MEDIA CONTENT', 'CREATIVE STRATEGY', 'VISUAL STORYTELLING', 'MOTION GRAPHICS'],
    impactText: 'We established Consistency.AI as a leading authority in online technical education, transforming theoretical lectures into viral programming narratives that students choose to watch.'
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
    challengeParagraph: 'We partnered with DelusionAI to craft emotionally resonant visual narratives that bring mental health conversations to life through cinematic storytelling, strong editing, and intentional visual language.',
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
    ],
    // Redesign properties
    servicesListText: 'Video Editing, Color Grading, Sound Design',
    industry: 'Health Tech / Mental Health',
    duration: '3 Weeks',
    year: '2024',
    projectOverviewText: 'DelusionAI is a mental health platform using technology and storytelling to create awareness and empathy. Our goal was to craft a cinematic visual identity that feels authentic, sensitive, and deeply human.',
    challengeCards: [
      { title: 'Sensitive Storytelling', desc: 'Convey complex emotions with respect, authenticity, and visual subtlety.' },
      { title: 'Engaging Visuals', desc: 'Create content that captures attention while maintaining empathy and trust.' },
      { title: 'Strong Retention', desc: 'Improve watch time and connection through pacing, structure, and emotional storytelling.' }
    ],
    servicesDeliveredList: ['VIDEO EDITING', 'COLOR GRADING', 'SOUND DESIGN', 'CONTENT STRATEGY', 'VISUAL STORYTELLING', 'SOCIAL MEDIA CONTENT'],
    impactText: 'Through cinematic visual narratives and careful editing pacing, we enabled DelusionAI to communicate complex emotional themes with deep visual authority, driving record audience engagement and community trust.'
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
    ],
    // Redesign properties
    servicesListText: 'Video Editing, Content Production, Creative Strategy',
    industry: 'EdTech / Higher Education',
    duration: '6 Weeks',
    year: '2024',
    projectOverviewText: 'Campus Insight required an immersive visual directory to showcase modern campus environments and ease the student transition into academic programs. We produced high-end cinematic drone guides and structural interview templates.',
    challengeCards: [
      { title: 'Immersive Guiding', desc: 'Showcase physical spaces in an engaging, cinematic, and modern perspective.' },
      { title: 'Authentic Reviews', desc: 'Incorporate real student stories and professor reviews without feeling staged or corporate.' },
      { title: 'Hybrid Conversions', desc: 'Bridge the gap between online video tours and active program enrollments through targeted CTAs.' }
    ],
    servicesDeliveredList: ['VIDEO EDITING', 'CONTENT PRODUCTION', 'CREATIVE STRATEGY', 'DRONE VIDEOGRAPHY', 'VISUAL STORYTELLING', 'STUDENT ONBOARDING'],
    impactText: 'The cinematic tour experience repositioned the university registration funnel, providing prospective students with an authentic, high-quality window into campus culture that boosted active enrollments.'
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
    ],
    // Redesign properties
    servicesListText: 'Video Editing, Motion Graphics, Event Coverage',
    industry: 'Developer Ecosystem',
    duration: '6 Weeks',
    year: '2024',
    projectOverviewText: 'Behind The Build crafted a premium tech campaign for HackVerse, utilizing motion design, fast-paced editing, and high-energy developer aesthetics.',
    challengeCards: [
      { title: 'Developer Resonance', desc: 'Create high-energy trailer cuts that appeal directly to top-tier software builders.' },
      { title: 'Event Clarity', desc: 'Structure information maps, schedule grids, and event tracks into rapid content clips.' },
      { title: 'Retention in Tech', desc: 'Retain audience focus using dynamic sound design, code flashes, and cinematic pacing.' }
    ],
    servicesDeliveredList: ['VIDEO EDITING', 'MOTION GRAPHICS', 'EVENT COVERAGE', 'CONTENT STRATEGY', 'DEVELOPER MARKETING', 'SOUND DESIGN'],
    impactText: 'The HackVerse hybrid campaign generated record dev impressions and filled hackathon tracks ahead of schedule, setting a new benchmark for developer ecosystem event marketing.'
  }
};

export default function FeaturedWork({ initialProjectId }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLightboxVideo, setActiveLightboxVideo] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (initialProjectId) {
      const project = projects.find(p => p.id === initialProjectId);
      if (project) {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
      }
    }
  }, [initialProjectId]);

  const clipRevealVariants = {
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: {
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
    }
  };

  const handleOpenDetail = (project) => {
    setSelectedProject(project);
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
      const headerOffset = 80;
      const elementPosition = configurator.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

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

  return (
    <section id="work" className="py-24 bg-brand-white relative overflow-hidden border-t border-brand-charcoal/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
         {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 text-left">
          <div className="space-y-4">
            <ScrollReveal yOffset={10} duration={0.45} delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8041C]">
                OUR WORK
              </p>
            </ScrollReveal>
            <ScrollReveal yOffset={35} duration={0.8} delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-brand-charcoal leading-none">
                OUR WORK<span className="text-[#C8041C]">.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal yOffset={20} duration={0.7} delay={0.25}>
              <p className="text-sm md:text-base text-brand-charcoal/60 leading-relaxed font-sans max-w-xl">
                A selection of brands, campaigns and stories we've helped bring to life.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Premium Asymmetric Editorial Project Rows */}
        <div className="space-y-24 lg:space-y-32">
          {projects.slice(0, 2).map((project, idx) => {
            const isLeftImage = idx % 2 === 0;
            const subtitleText = project.id === 'consistency-ai' ? 'AI Education Platform' : 'Mental Health & Wellness';
            const workLabel = `WORK ${String(idx + 1).padStart(2, '0')}`;
            const projectDesc = project.id === 'consistency-ai' 
              ? "We helped Consistency.AI build a powerful digital presence through high-impact content and consistent storytelling that connects, educates, and grows."
              : "We created meaningful content and digital campaigns that build awareness, spark conversations, and strengthen the brand's online presence.";
            
            const servicesList = project.id === 'consistency-ai' 
              ? ['VIDEO EDITING', 'SOCIAL MEDIA'] 
              : ['SOCIAL MEDIA', 'CONTENT CREATION'];

            const imageArea = (
              <div 
                onClick={() => handleOpenDetail(project)}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-[#E6E6E6] bg-brand-lightgray cursor-pointer"
              >
                <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <video
                  src={project.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:contrast-[1.08] group-hover:scale-[1.03] transition-all duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="w-3 group-hover:w-8 h-[2.5px] bg-[#C8041C] transition-all duration-300" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white drop-shadow-md opacity-70 group-hover:opacity-100 transition-all duration-300">
                    {project.servicesDelivered[0]}
                  </span>
                </div>
              </div>
            );

            const infoArea = (
              <div className="flex flex-col justify-center text-left space-y-6 lg:px-6">
                <div className="space-y-2">
                  <ScrollReveal yOffset={10} duration={0.45} delay={0.05} viewportAmount={0.15}>
                    <span className="text-[10px] font-bold tracking-widest text-[#C8041C] uppercase font-mono block">
                      {workLabel}
                    </span>
                  </ScrollReveal>
                  <ScrollReveal yOffset={35} duration={0.8} delay={0.15} viewportAmount={0.15}>
                    <h3 
                      onClick={() => handleOpenDetail(project)}
                      className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-charcoal cursor-pointer group-hover:text-[#C8041C] group-hover:translate-x-1.5 transition-all duration-300 font-sans"
                    >
                      {project.name}
                    </h3>
                    <span className="text-xs text-brand-charcoal/50 uppercase tracking-wider font-bold block mt-2">
                      {subtitleText}
                    </span>
                  </ScrollReveal>
                </div>

                <ScrollReveal yOffset={20} duration={0.7} delay={0.3} viewportAmount={0.15}>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-sans font-normal">
                    {projectDesc}
                  </p>
                </ScrollReveal>

                {/* Services Tags */}
                <ScrollReveal yOffset={15} duration={0.6} delay={0.42} viewportAmount={0.15}>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((srv, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-[9px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 bg-[#F3F3F3] text-brand-charcoal/80 border border-[#E6E6E6] rounded-none"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Metrics */}
                <ScrollReveal yOffset={30} duration={0.75} delay={0.52} viewportAmount={0.15}>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E6E6E6]">
                    {project.results.map((res, rIdx) => {
                      const match = res.match(/^([\d.x\u00D7MX+]+)(.*)$/i);
                      const val = match ? match[1].trim() : res;
                      const lbl = match ? match[2].trim() : '';

                      return (
                        <div key={rIdx} className="space-y-1">
                          <span className="text-xl sm:text-2xl font-black text-[#C8041C] tracking-tight leading-none block font-sans">
                            {val}
                          </span>
                          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-brand-charcoal/40 leading-none block">
                            {lbl}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </ScrollReveal>

                {/* View Project Link */}
                <ScrollReveal yOffset={15} duration={0.6} delay={0.62} viewportAmount={0.15}>
                  <div className="pt-4">
                    <button 
                      onClick={() => handleOpenDetail(project)}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-charcoal group-hover:text-[#C8041C] group-hover:translate-x-1 transition-all duration-300 font-sans"
                    >
                      <span>VIEW PROJECT</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            );

            return (
              <div key={project.id} className="w-full">
                <motion.div 
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.15 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group cursor-default"
                >
                  {isLeftImage ? (
                    <>
                      <motion.div variants={shouldReduceMotion ? {} : clipRevealVariants} className="lg:col-span-7">{imageArea}</motion.div>
                      <div className="lg:col-span-5">{infoArea}</div>
                    </>
                  ) : (
                    <>
                      <motion.div variants={shouldReduceMotion ? {} : clipRevealVariants} className="lg:col-span-7 order-first lg:order-last">{imageArea}</motion.div>
                      <div className="lg:col-span-5">{infoArea}</div>
                    </>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Premium Fullscreen Project Detail View */}
      <AnimatePresence>
        {selectedProject && (() => {
          const story = DETAIL_PROJECT_STORIES[selectedProject.id] || DETAIL_PROJECT_STORIES['consistency-ai'];
          
          const moreProjects = [
            { id: 'consistency-ai', name: 'Consistency.AI', industry: 'AI Education Platform', image: projects.find(p => p.id === 'consistency-ai')?.image || hackverseImage },
            { id: 'delusionai', name: 'DelusionAI', industry: 'Mental Health & Wellness', image: projects.find(p => p.id === 'delusionai')?.image || hackverseImage },
            { id: 'campus-insight', name: 'Campus Insight', industry: 'EdTech Platform', image: campusInsightImage },
            { id: 'hackverse', name: 'HackVerse', industry: 'Developer Ecosystem', image: hackverseImage }
          ].filter(p => p.id !== selectedProject.id).slice(0, 3);

          const renderProjectTitle = (name) => {
            if (name.toLowerCase().endsWith('ai')) {
              const base = name.slice(0, -2);
              return (
                <>
                  {base}<span className="text-[#C8041C]">AI</span>
                </>
              );
            }
            const words = name.split(' ');
            if (words.length > 1) {
              const lastWord = words.pop();
              return (
                <>
                  {words.join(' ')} <span className="text-[#C8041C]">{lastWord}</span>
                </>
              );
            }
            return name;
          };

          const challengeIcons = [UsersIcon, FilmIcon, TargetIcon];
          const metricIcons = [EyeIcon, GrowthIcon, PlayIcon];
          const galleryItems = GALLERY_MEDIA[selectedProject.id] || [];

          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-brand-white z-[999] overflow-y-auto font-sans text-[#212121]"
              role="dialog"
              aria-modal="true"
            >
              {/* HEADER */}
              <div className="w-full border-b border-brand-charcoal/10 py-5 px-6 md:px-12 flex justify-between items-center bg-brand-white/80 backdrop-blur-md sticky top-0 z-[1001] select-none">
                <div className="flex items-center gap-6">
                  <img 
                    src={logoUrl} 
                    alt="Behind the Build Logo" 
                    className="w-16 sm:w-20 object-contain" 
                  />
                  <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#212121]/40 uppercase">
                    <span>HOME</span>
                    <span>/</span>
                    <span>OUR WORK</span>
                    <span>/</span>
                    <span className="text-[#C8041C] font-black">{story.name}</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#212121] hover:text-[#C8041C] transition-colors duration-300 group"
                  aria-label="Close project view"
                >
                  <div className="w-8 h-8 rounded-full border border-[#E6E6E6] group-hover:border-[#C8041C] flex items-center justify-center transition-colors duration-300">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>CLOSE CASE STUDY</span>
                </button>
              </div>

              {/* HERO CASE STUDY SECTION */}
              <section className="min-h-[80vh] flex items-center py-16 md:py-24 border-b border-[#E6E6E6] bg-brand-white select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left Column Content */}
                  <div className="lg:col-span-5 text-left space-y-8">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C] block">
                          FEATURED PROJECT
                        </p>
                        <div className="w-8 h-[2px] bg-[#C8041C] mt-2" />
                      </div>
                      
                      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
                        {renderProjectTitle(story.name)}
                      </h1>
                      
                      <p className="text-lg sm:text-xl font-medium text-[#212121]/60 tracking-tight leading-snug">
                        {story.subtitle}
                      </p>
                      
                      <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed font-normal max-w-md pt-2">
                        {story.challengeParagraph}
                      </p>
                    </div>

                    {/* Results / Metrics horizontal strip */}
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-charcoal/10 w-full">
                      {story.heroMetrics.map((metric, i) => {
                        const Icon = metricIcons[i] || EyeIcon;
                        return (
                          <div key={i} className={`space-y-2 text-left ${i > 0 ? 'border-l border-brand-charcoal/10 pl-6' : ''}`}>
                            <Icon className="text-[#C8041C] shrink-0 w-5 h-5" />
                            <div className="space-y-0.5">
                              <span className="text-2xl sm:text-3xl font-black text-[#212121] block tracking-tight leading-none font-sans">
                                <AnimatedCounter value={metric.value} />
                              </span>
                              <span className="text-[9px] font-mono text-[#212121]/50 uppercase tracking-widest font-black block leading-tight">
                                {metric.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column Showcase Image & Dark Strip */}
                  <div className="lg:col-span-7 w-full flex flex-col items-stretch">
                    <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-brand-lightgray rounded-t-[12px] shadow-sm border border-brand-charcoal/5 group">
                      <img
                        src={selectedProject.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Dark Information Strip */}
                    <div className="bg-[#212121] text-white py-6 px-8 rounded-b-[12px] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left items-start select-none border-t border-white/5">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                          SERVICES
                        </span>
                        <span className="text-xs font-bold text-white/90 font-sans block leading-tight">
                          {story.servicesListText || story.services.map(s => s.name).join(', ')}
                        </span>
                      </div>
                      <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-6">
                        <span className="text-[9px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                          INDUSTRY
                        </span>
                        <span className="text-xs font-bold text-white/90 font-sans block leading-tight">
                          {story.industry || selectedProject.industry}
                        </span>
                      </div>
                      <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-6">
                        <span className="text-[9px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                          DURATION
                        </span>
                        <span className="text-xs font-bold text-white/90 font-sans block leading-tight">
                          {story.duration || '3 Weeks'}
                        </span>
                      </div>
                      <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-6">
                        <span className="text-[9px] font-mono font-black text-[#C8041C] uppercase tracking-widest block">
                          YEAR
                        </span>
                        <span className="text-xs font-bold text-white/90 font-sans block leading-tight">
                          {story.year || '2024'}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* PROJECT OVERVIEW & THE CHALLENGE */}
              <section className="py-20 md:py-24 border-b border-[#E6E6E6] bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
                  
                  {/* Left Column: Project Overview */}
                  <div className="lg:col-span-4 space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                        PROJECT OVERVIEW
                      </span>
                      <div className="w-8 h-[2px] bg-[#C8041C]" />
                    </div>
                    
                    <p className="text-sm md:text-[15px] text-[#212121]/80 leading-relaxed font-normal max-w-sm font-sans">
                      {story.projectOverviewText}
                    </p>
                    
                    <div className="pt-2">
                      <button 
                        onClick={() => setActiveLightboxVideo(selectedProject.videoUrl)}
                        className="inline-flex items-center gap-2.5 border-2 border-[#212121] hover:border-[#C8041C] text-[#212121] hover:text-[#C8041C] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] bg-transparent"
                      >
                        <span>VIEW LIVE PROJECT</span>
                        <span className="text-[10px]">↗</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Challenge Cards */}
                  <div className="lg:col-span-8 space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                        THE CHALLENGE
                      </span>
                      <div className="w-8 h-[2px] bg-[#C8041C]" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                      {story.challengeCards.map((card, idx) => {
                        const IconComponent = challengeIcons[idx] || TargetIcon;
                        return (
                          <div
                            key={idx}
                            className="bg-brand-white border border-[#E6E6E6] rounded-[12px] p-6 text-left flex flex-col justify-between items-start transition-all duration-300 hover:border-[#C8041C]/40 hover:-translate-y-1.5 cursor-default select-none shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                          >
                            <div className="space-y-6">
                              {/* Icon Box */}
                              <div className="w-10 h-10 rounded-[8px] bg-[#C8041C]/5 flex items-center justify-center text-[#C8041C]">
                                <IconComponent className="stroke-[1.5]" />
                              </div>
                              
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono font-bold text-[#212121]/30 block leading-none">
                                  0{idx + 1}
                                </span>
                                <h4 className="text-[15px] font-bold text-[#212121] tracking-tight font-sans">
                                  {card.title}
                                </h4>
                                <p className="text-xs text-[#212121]/60 leading-relaxed font-normal">
                                  {card.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </section>

              {/* CREATIVE PROCESS TIMELINE */}
              <section className="py-20 md:py-24 border-b border-[#E6E6E6] bg-brand-white select-none">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-16">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                      CREATIVE PROCESS
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
                      HOW WE BUILT IT<span className="text-[#C8041C]">.</span>
                    </h2>
                  </div>

                  <div className="relative">
                    {/* Horizontal connector line for desktop */}
                    <div className="absolute top-[18px] left-[5%] right-[5%] h-[1px] bg-brand-charcoal/10 hidden lg:block z-0" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10 w-full">
                      {[
                        { num: '01', title: 'DISCOVERY', desc: 'Understanding the brand, audience, and message.' },
                        { num: '02', title: 'STORY', desc: 'Developing the visual narrative and content direction.' },
                        { num: '03', title: 'PRODUCTION', desc: 'Capturing and producing the visual assets.' },
                        { num: '04', title: 'EDITING', desc: 'Editing, color grading, sound design, and final polish.' },
                        { num: '05', title: 'DELIVERY', desc: 'Publishing optimized content and measuring performance.' }
                      ].map((step, idx) => (
                        <ScrollReveal 
                          key={idx} 
                          delay={idx * 0.08} 
                          yOffset={20}
                          className="space-y-4 group text-left"
                        >
                          {/* Step circle */}
                          <div className="w-9 h-9 rounded-full border-2 border-[#E6E6E6] bg-brand-white flex items-center justify-center font-bold text-xs text-[#212121] group-hover:border-[#C8041C] group-hover:bg-[#C8041C] group-hover:text-brand-white transition-all duration-300">
                            {step.num}
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-[#212121] group-hover:text-[#C8041C] transition-colors duration-300">
                              {step.title}
                            </h4>
                            <p className="text-xs sm:text-[13px] text-[#212121]/60 leading-relaxed font-normal">
                              {step.desc}
                            </p>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>

                </div>
              </section>

              {/* VISUAL STORY SECTION */}
              <section className="py-20 md:py-24 border-b border-[#E6E6E6] bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                      VISUAL STORY
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
                      EDITORIAL SHOWCASE<span className="text-[#C8041C]">.</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                    {/* Left: Large Featured Image */}
                    {galleryItems[0] && (
                      <ScrollReveal delay={0} yOffset={35} className="lg:col-span-8 aspect-[16/10] w-full">
                        <div 
                          onClick={() => setActiveLightboxVideo(selectedProject.videoUrl)}
                          className="group relative overflow-hidden bg-brand-lightgray rounded-[12px] border border-brand-charcoal/5 cursor-pointer shadow-sm w-full h-full"
                        >
                          <div className="w-full h-full overflow-hidden">
                            <img
                              src={galleryItems[0].image}
                              alt={galleryItems[0].title}
                              className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                            />
                          </div>
                          <div className="absolute inset-0 bg-brand-charcoal/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <div className="px-5 py-2.5 bg-brand-white text-[#C8041C] text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <span>VIEW</span>
                              <span className="text-[8px]">▶</span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-left select-none">
                            <span className="text-[8px] font-mono font-bold text-white/50 uppercase tracking-widest">
                              {galleryItems[0].category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold uppercase text-white tracking-tight mt-0.5">
                              {galleryItems[0].title}
                            </h4>
                          </div>
                        </div>
                      </ScrollReveal>
                    )}

                    {/* Right: Two stacked smaller images */}
                    <div className="lg:col-span-4 flex flex-col gap-6 justify-between w-full">
                      {galleryItems[1] && (
                        <ScrollReveal delay={0.15} yOffset={25} className="aspect-[16/9.5] w-full flex-grow">
                          <div 
                            onClick={() => setActiveLightboxVideo(selectedProject.videoUrl)}
                            className="group relative overflow-hidden bg-brand-lightgray rounded-[12px] border border-brand-charcoal/5 cursor-pointer shadow-sm w-full h-full"
                          >
                            <div className="w-full h-full overflow-hidden">
                              <img
                                src={galleryItems[1].image}
                                alt={galleryItems[1].title}
                                className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                              />
                            </div>
                            <div className="absolute inset-0 bg-brand-charcoal/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                              <div className="px-5 py-2.5 bg-brand-white text-[#C8041C] text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <span>VIEW</span>
                                <span className="text-[8px]">▶</span>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-left select-none">
                              <span className="text-[8px] font-mono font-bold text-white/50 uppercase tracking-widest">
                                {galleryItems[1].category}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold uppercase text-white tracking-tight mt-0.5">
                                {galleryItems[1].title}
                              </h4>
                            </div>
                          </div>
                        </ScrollReveal>
                      )}
                      {galleryItems[2] && (
                        <ScrollReveal delay={0.25} yOffset={25} className="aspect-[16/9.5] w-full flex-grow">
                          <div 
                            onClick={() => setActiveLightboxVideo(selectedProject.videoUrl)}
                            className="group relative overflow-hidden bg-brand-lightgray rounded-[12px] border border-brand-charcoal/5 cursor-pointer shadow-sm w-full h-full"
                          >
                            <div className="w-full h-full overflow-hidden">
                              <img
                                src={galleryItems[2].image}
                                alt={galleryItems[2].title}
                                className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                              />
                            </div>
                            <div className="absolute inset-0 bg-brand-charcoal/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                              <div className="px-5 py-2.5 bg-brand-white text-[#C8041C] text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <span>VIEW</span>
                                <span className="text-[8px]">▶</span>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-left select-none">
                              <span className="text-[8px] font-mono font-bold text-white/50 uppercase tracking-widest">
                                {galleryItems[2].category}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold uppercase text-white tracking-tight mt-0.5">
                                {galleryItems[2].title}
                              </h4>
                            </div>
                          </div>
                        </ScrollReveal>
                      )}
                    </div>

                    {/* Full-width bottom banner */}
                    {galleryItems[3] && (
                      <ScrollReveal delay={0.35} yOffset={35} className="lg:col-span-12 aspect-[21/9] sm:aspect-[21/7] w-full mt-2">
                        <div 
                          onClick={() => setActiveLightboxVideo(selectedProject.videoUrl)}
                          className="group relative overflow-hidden bg-brand-lightgray rounded-[12px] border border-brand-charcoal/5 cursor-pointer shadow-sm w-full h-full"
                        >
                          <div className="w-full h-full overflow-hidden">
                            <img
                              src={galleryItems[3].image}
                              alt={galleryItems[3].title}
                              className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                            />
                          </div>
                          <div className="absolute inset-0 bg-brand-charcoal/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <div className="px-5 py-2.5 bg-brand-white text-[#C8041C] text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <span>VIEW</span>
                              <span className="text-[8px]">▶</span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-left select-none">
                            <span className="text-[8px] font-mono font-bold text-white/50 uppercase tracking-widest">
                              {galleryItems[3].category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold uppercase text-white tracking-tight mt-0.5">
                              {galleryItems[3].title}
                            </h4>
                          </div>
                        </div>
                      </ScrollReveal>
                    )}
                  </div>

                </div>
              </section>

              {/* THE IMPACT */}
              <section className="py-24 md:py-32 border-b border-[#E6E6E6] bg-brand-offwhite select-none">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                  <ScrollReveal delay={0} yOffset={10}>
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                      THE IMPACT
                    </span>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.1} yOffset={35}>
                    <h2 className="text-3xl sm:text-5xl md:text-[60px] font-black uppercase tracking-tight text-[#212121] leading-[1.05] font-sans">
                      CONTENT SHOULD NOT
                      <br />
                      JUST BE SEEN.
                      <br />
                      IT SHOULD BE <span className="text-[#C8041C]">FELT.</span>
                    </h2>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.25} yOffset={20}>
                    <p className="text-sm sm:text-base md:text-lg text-[#212121]/75 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
                      {story.impactText}
                    </p>
                  </ScrollReveal>
                </div>
              </section>

              {/* SERVICES DELIVERED */}
              <section className="py-20 md:py-24 border-b border-[#E6E6E6] bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                      SERVICES DELIVERED
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
                      SERVICES FOR THIS BUILD<span className="text-[#C8041C]">.</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 w-full">
                    {story.servicesDeliveredList.map((serv, idx) => (
                      <ScrollReveal key={idx} delay={idx * 0.05} yOffset={15} className="space-y-3 text-left group">
                        <div className="w-6 h-[2px] bg-[#C8041C] group-hover:w-12 transition-all duration-300" />
                        <h4 className="text-[15px] sm:text-base font-black text-[#212121] uppercase tracking-wider font-sans">
                          {serv}
                        </h4>
                      </ScrollReveal>
                    ))}
                  </div>

                </div>
              </section>

              {/* MORE PROJECTS */}
              <section className="py-20 md:py-24 border-b border-[#E6E6E6] bg-brand-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-left space-y-12">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#C8041C]">
                      NEXT STORIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#212121] tracking-tight font-sans leading-none">
                      MORE PROJECTS
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {moreProjects.map((proj) => (
                      <div 
                        key={proj.id}
                        onClick={() => {
                          const targetProj = projects.find(p => p.id === proj.id) || MOCK_PROJECTS[proj.id];
                          if (targetProj) {
                            handleOpenDetail(targetProj);
                            const modalContainer = document.querySelector('[role="dialog"]');
                            if (modalContainer) {
                              modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }
                        }}
                        className="group cursor-pointer bg-brand-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-stretch"
                      >
                        <div className="w-full md:w-1/3 aspect-[16/10] md:aspect-auto overflow-hidden relative bg-brand-lightgray shrink-0">
                          <img 
                            src={proj.image} 
                            alt={proj.name}
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" 
                          />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-between flex-grow text-left">
                          <div className="space-y-3">
                            <span className="text-[9px] font-mono text-[#212121]/40 uppercase tracking-widest block font-black">
                              {proj.industry}
                            </span>
                            <h4 className="text-xl md:text-2xl font-black uppercase text-[#212121] tracking-tight font-sans">
                              {proj.name}
                            </h4>
                          </div>
                          <button className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-[10px] font-mono font-black tracking-widest text-[#212121] group-hover:text-[#C8041C] transition-colors w-fit uppercase">
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* FINAL CTA */}
              <section className="py-28 md:py-36 bg-brand-white relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-[0.035] pointer-events-none select-none filter grayscale" 
                  style={{ backgroundImage: `url(${selectedProject.image})` }} 
                />
                
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full text-center space-y-8 relative z-10">
                  <ScrollReveal delay={0} yOffset={25}>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#212121] leading-none font-sans">
                      HAVE A STORY TO BUILD?
                    </h2>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.12} yOffset={15}>
                    <p className="text-base sm:text-lg text-[#212121]/60 leading-relaxed font-sans max-w-md mx-auto">
                      Let's bring it to the world.
                    </p>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.25} yOffset={15}>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                      <button
                        onClick={handleCtaClick}
                        className="bg-[#C8041C] text-brand-white hover:bg-[#C8041C]/90 px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(200,4,28,0.2)] active:scale-95"
                      >
                        <span>START A PROJECT</span>
                        <span>→</span>
                      </button>
                      <button
                        onClick={handleCloseDetail}
                        className="border-2 border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-brand-white px-8 py-4 rounded-none text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-95 bg-transparent"
                      >
                        <span>VIEW OUR WORK</span>
                        <span>→</span>
                      </button>
                    </div>
                  </ScrollReveal>
                </div>
              </section>

              {/* Detail Footer */}
              <div className="w-full border-t border-brand-charcoal/5 py-8 px-6 text-center text-[10px] font-mono text-[#212121]/40 bg-brand-white">
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

