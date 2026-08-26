import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Confirmation from './sections/Confirmation/Confirmation';
import Privacy from './sections/Legal/Privacy';
import Terms from './sections/Legal/Terms';

import Hero from './sections/Hero/Hero';
import FeaturedWork from './sections/FeaturedWork/FeaturedWork';

// Lazy load below-the-fold sections
const MediaDigital = lazy(() => import('./sections/MediaDigital/MediaDigital'));
const Clients = lazy(() => import('./sections/Clients/Clients'));
const PlanBuilder = lazy(() => import('./sections/PlanBuilder/PlanBuilder'));
const Process = lazy(() => import('./sections/Process/Process'));
const WhyChooseUs = lazy(() => import('./sections/WhyChooseUs/WhyChooseUs'));
const Testimonials = lazy(() => import('./sections/Testimonials/Testimonials'));
const FinalCTA = lazy(() => import('./sections/FinalCTA/FinalCTA'));
const Footer = lazy(() => import('./sections/Footer/Footer'));
const ServicePage = lazy(() => import('./sections/ServicePage/ServicePage'));
const Careers = lazy(() => import('./sections/Careers/Careers'));
const AboutPage = lazy(() => import('./sections/AboutPage/AboutPage'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [submitted_booking_id, setSubmitted_booking_id] = useState(null);
  const [planBuilderKey, setPlanBuilderKey] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Monitor location changes
  useEffect(() => {
    const handleUrlChange = () => {
      if (currentPath !== window.location.pathname) {
        setCurrentPath(window.location.pathname);
      }
    };
    const interval = setInterval(handleUrlChange, 100);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [currentPath]);

  const handleHomeRedirect = () => {
    setSubmitted_booking_id(null);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
    }
  };

  const caseStudyMatch = currentPath.match(/^\/case-studies\/([a-zA-Z0-9-]+)/);
  const initialProjectId = caseStudyMatch ? caseStudyMatch[1] : null;
  
  // Custom scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Dynamic SEO and JSON-LD Structured Data Schema Handler
  useEffect(() => {
    if (isLoading) return;

    // 1. Define updates based on current path and booking confirmation status
    let title = "Behind the Build";
    let desc = "Behind the Build helps businesses, brands, and creators turn ideas into powerful visual stories through videography, photography, content creation, and custom remote video editing.";
    let path = currentPath;

    if (currentPath === '/privacy') {
      title = "Privacy Policy | Behind the Build";
      desc = "Behind The Build Privacy Policy. Learn how we collect, store, safeguard, and use your data when you visit our website or engage our creative media and marketing services.";
    } else if (currentPath === '/terms') {
      title = "Terms & Conditions | Behind the Build";
      desc = "Behind The Build Terms & Conditions. Read our service agreements, project requests, intellectual property transfer rights, deliverables, and payment terms.";
    } else if (currentPath === '/about') {
      title = "About | Behind the Build";
      desc = "We're building what's next. Behind The Build helps ambitious brands turn what they build into stories, experiences and digital presence people remember.";
    } else if (currentPath === '/careers') {
      title = "Careers | Behind the Build";
      desc = "Join Behind the Build. We are looking for talented video editors, motion designers, content creators, and digital strategists to build with us.";
    } else if (currentPath.startsWith('/services/')) {
      const sKey = currentPath.split('/').pop();
      const sTitle = sKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      title = `${sTitle} | Behind the Build`;
      desc = `Explore premium ${sTitle} packages by Behind the Build. Review our custom deliverables, starter and growth launch partnership rates.`;
    } else if (submitted_booking_id) {
      title = "Booking Confirmed | Behind the Build";
      desc = `Thank you for choosing Behind the Build. Your project request (ID: ${submitted_booking_id}) has been received. Our creative team will contact you in 60 minutes.`;
      path = "/confirmation";
    } else if (window.location.pathname.startsWith('/case-studies/')) {
      path = window.location.pathname;
    } else {
      path = "/";
    }

    const canonicalUrl = `https://behindthebuild.in${path}`;

    // 2. Update dynamic title & meta tags
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

    // Update canonical link element
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update browser URL dynamically for search friendliness
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    // 3. Inject Structured Schema JSON-LD Script Blocks
    const injectJSONLD = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    // Inject static schemas
    injectJSONLD('schema-org', {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Behind the Build",
      "url": "https://behindthebuild.in",
      "logo": "https://behindthebuild.in/favicon.png",
      "sameAs": [
        "https://instagram.com/behindthebuild.co",
        "https://linkedin.com/company/behindthebuild",
        "https://youtube.com/@behindthebuild",
        "https://twitter.com/behindthebuild"
      ]
    });

    injectJSONLD('schema-local', {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Behind the Build",
      "url": "https://behindthebuild.in",
      "image": "https://behindthebuild.in/favicon.png",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    });

    injectJSONLD('schema-website', {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Behind the Build",
      "url": "https://behindthebuild.in"
    });

    // Inject breadcrumb schema if sub-route is active
    if (submitted_booking_id) {
      injectJSONLD('schema-breadcrumb', {
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
            "name": "Confirmation",
            "item": canonicalUrl
          }
        ]
      });
    } else {
      const breadcrumbScript = document.getElementById('schema-breadcrumb');
      if (breadcrumbScript) breadcrumbScript.remove();
    }

  }, [isLoading, submitted_booking_id, currentPath]);

  return (
    <div className="relative min-h-screen bg-brand-offwhite text-brand-charcoal selection:bg-brand-red selection:text-brand-white">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-[#C8041C] z-[9999] transition-all duration-100 ease-out pointer-events-none" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Fixed top navigation */}
      <Header onHomeRedirect={handleHomeRedirect} />

      {/* Main page layout flow */}
      <main>
        {currentPath === '/privacy' ? (
          <Privacy />
        ) : currentPath === '/terms' ? (
          <Terms />
        ) : currentPath === '/about' ? (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING ABOUT...</div>}>
            <AboutPage />
          </Suspense>
        ) : currentPath.startsWith('/services/') ? (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING SERVICE...</div>}>
            <ServicePage serviceKey={currentPath.split('/').pop()} />
          </Suspense>
        ) : currentPath === '/careers' ? (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING CAREERS...</div>}>
            <Careers />
          </Suspense>
        ) : submitted_booking_id ? (
          <Confirmation 
            booking_id={submitted_booking_id}
            onBack={() => setSubmitted_booking_id(null)}
            onSubmitAnother={() => {
              setPlanBuilderKey(prev => prev + 1);
              setSubmitted_booking_id(null);
            }}
          />
        ) : (
          <>
            <Hero />
            <Suspense fallback={<div className="min-h-[200px]" />}>
              <MediaDigital />
              <Clients />
              <FeaturedWork initialProjectId={initialProjectId} />
              <PlanBuilder key={planBuilderKey} onSuccess={(id) => setSubmitted_booking_id(id)} />
              <Process />
              <WhyChooseUs />
              <Testimonials />
              <FinalCTA />
            </Suspense>
          </>
        )}
      </main>

      {/* Page Footer */}
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

