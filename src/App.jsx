import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
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
const Process = lazy(() => import('./sections/Process/Process'));
const WhyChooseUs = lazy(() => import('./sections/WhyChooseUs/WhyChooseUs'));
const Testimonials = lazy(() => import('./sections/Testimonials/Testimonials'));
const FinalCTA = lazy(() => import('./sections/FinalCTA/FinalCTA'));
const Footer = lazy(() => import('./sections/Footer/Footer'));
const ServicePage = lazy(() => import('./sections/ServicePage/ServicePage'));
const Careers = lazy(() => import('./sections/Careers/Careers'));
const AboutPage = lazy(() => import('./sections/AboutPage/AboutPage'));
const StartProjectFlow = lazy(() => import('./sections/StartProjectFlow/StartProjectFlow'));
const BookingPage = lazy(() => import('./sections/BookingPage/BookingPage'));
const NotFound = lazy(() => import('./sections/NotFound/NotFound'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [submitted_booking_id, setSubmitted_booking_id] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Monitor location changes
  useEffect(() => {
    const handleUrlChange = () => {
      const newPath = window.location.pathname;
      if (currentPath !== newPath) {
        setCurrentPath(newPath);
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => {
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
  
  // Custom scroll progress using framer-motion (GPU accelerated, zero state updates)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

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

  // Handle direct navigation to section routes on homepage (e.g. /work, /build-your-plan, /our-process, /contact)
  useEffect(() => {
    if (isLoading) return;
    const targetMap = {
      '/work': 'work',
      '/build-your-plan': 'services',
      '/services': 'services',
      '/our-process': 'process',
      '/process': 'process',
      '/contact': 'footer'
    };
    const targetId = targetMap[currentPath];
    if (targetId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentPath, isLoading]);

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
    } else if (currentPath === '/booking' || currentPath.startsWith('/booking/') || currentPath === '/book' || currentPath.startsWith('/book/') || currentPath === '/booking-success') {
      title = "Book Your Project | Behind the Build";
      desc = "Book a creative media service with Behind the Build. Fill in your project details and we'll get back to you within 60 minutes.";
      // Keep the full path + query string so BookingPage can read params
      path = window.location.pathname + window.location.search;
    } else if (submitted_booking_id) {
      title = "Booking Confirmed | Behind the Build";
      desc = `Thank you for choosing Behind the Build. Your project request (ID: ${submitted_booking_id}) has been received. Our creative team will contact you in 60 minutes.`;
      path = "/confirmation";
    } else if (currentPath === '/start-a-project' || currentPath.startsWith('/start-a-project/')) {
      title = "Start a Project | Behind the Build";
      desc = "Start a creative media project with Behind the Build. Choose from video editing, social media marketing, design, tech event coverage, and digital marketing.";
      path = currentPath;
    } else if (currentPath === '/project-submitted') {
      title = "Project Inquiry Received | Behind the Build";
      desc = "Thank you for reaching out to Behind the Build. We've received your project details and will get back to you shortly.";
      path = currentPath;
    } else if (currentPath.startsWith('/case-studies/')) {
      path = currentPath;
    } else {
      path = "/";
    }

    const canonicalUrl = `https://www.behindthebuild.in${path}`;

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
    // Compare full href (including query string) to avoid clobbering booking params
    const fullCurrentHref = window.location.pathname + window.location.search;
    const pathWithoutTrailingSlash = path.replace(/\/$/, '') || '/';
    const hrefWithoutTrailingSlash = fullCurrentHref.replace(/\/$/, '') || '/';
    if (hrefWithoutTrailingSlash !== pathWithoutTrailingSlash) {
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
        "https://www.instagram.com/behindthebuild_official/",
        "https://www.linkedin.com/company/behind-the-build-official/posts/?viewAsMember=true",
        "https://www.youtube.com/channel/UCSYVvK1307E2DyVbKGMGLQg"
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
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#C8041C] z-[9999] origin-left pointer-events-none" 
        style={{ scaleX }}
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
            {['video-editing', 'social-media-marketing', 'design', 'tech-event-coverage', 'tech-events-coverage', 'event-coverage', 'digital-marketing'].includes(currentPath.split('/').pop()) ? (
              <ServicePage serviceKey={currentPath.split('/').pop()} />
            ) : (
              <NotFound onHomeRedirect={handleHomeRedirect} />
            )}
          </Suspense>
        ) : currentPath === '/careers' ? (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING CAREERS...</div>}>
            <Careers />
          </Suspense>
        ) : (currentPath.startsWith('/start-a-project') || currentPath === '/project-submitted') ? (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING...</div>}>
            <StartProjectFlow currentPath={currentPath} />
          </Suspense>
        ) : (currentPath === '/booking' || currentPath.startsWith('/booking/') || currentPath === '/book' || currentPath.startsWith('/book/') || currentPath === '/booking-success') ? (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING...</div>}>
            <BookingPage currentPath={currentPath} />
          </Suspense>
        ) : submitted_booking_id ? (
          <Confirmation 
            booking_id={submitted_booking_id}
            onBack={() => setSubmitted_booking_id(null)}
            onSubmitAnother={() => {
              window.history.pushState(null, '', '/start-a-project');
              window.dispatchEvent(new Event('popstate'));
              setSubmitted_booking_id(null);
            }}
          />
        ) : ['/', '/work', '/build-your-plan', '/services', '/our-process', '/process', '/contact'].includes(currentPath) ? (
          <>
            <Hero />
            <Suspense fallback={<div className="min-h-[200px]" />}>
              <FeaturedWork initialProjectId={initialProjectId} />
              <MediaDigital />
              <Clients />
              <Process />
              <WhyChooseUs />
              <Testimonials />
              <FinalCTA />
            </Suspense>
          </>
        ) : (
          <Suspense fallback={<div className="min-h-screen bg-brand-white flex items-center justify-center font-mono text-xs text-brand-charcoal/50">LOADING...</div>}>
            <NotFound onHomeRedirect={handleHomeRedirect} />
          </Suspense>
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

