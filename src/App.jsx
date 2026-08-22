import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Confirmation from './sections/Confirmation/Confirmation';

import Hero from './sections/Hero/Hero';
import FeaturedWork from './sections/FeaturedWork/FeaturedWork';

// Lazy load below-the-fold sections
const Partners = lazy(() => import('./sections/Partners/Partners'));
const Impact = lazy(() => import('./sections/Impact/Impact'));
const BrandStatement = lazy(() => import('./sections/BrandStatement/BrandStatement'));
const PlanBuilder = lazy(() => import('./sections/PlanBuilder/PlanBuilder'));
const Process = lazy(() => import('./sections/Process/Process'));
const About = lazy(() => import('./sections/About/About'));
const WhyChooseUs = lazy(() => import('./sections/WhyChooseUs/WhyChooseUs'));
const Testimonials = lazy(() => import('./sections/Testimonials/Testimonials'));
const Connect = lazy(() => import('./sections/Connect/Connect'));
const FinalCTA = lazy(() => import('./sections/FinalCTA/FinalCTA'));
const Footer = lazy(() => import('./sections/Footer/Footer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [submitted_booking_id, setSubmitted_booking_id] = useState(null);
  const [planBuilderKey, setPlanBuilderKey] = useState(0);

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

    // 1. Define updates based on booking confirmation status
    let title = "Behind the Build";
    let desc = "Behind the Build helps businesses, brands, and creators turn ideas into powerful visual stories through videography, photography, content creation, and custom remote video editing.";
    let path = "/";

    if (submitted_booking_id) {
      title = "Booking Confirmed | Behind the Build";
      desc = `Thank you for choosing Behind the Build. Your project request (ID: ${submitted_booking_id}) has been received. Our creative team will contact you in 60 minutes.`;
      path = "/confirmation";
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

  }, [isLoading, submitted_booking_id]);

  return (
    <div className="relative min-h-screen bg-brand-offwhite text-brand-charcoal selection:bg-brand-red selection:text-brand-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Fixed top navigation */}
      <Header onHomeRedirect={() => setSubmitted_booking_id(null)} />

      {/* Main page layout flow */}
      <main>
        {submitted_booking_id ? (
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
            <FeaturedWork />
            <Suspense fallback={<div className="min-h-[200px]" />}>
              <Partners />
              <Impact />
              <BrandStatement />
              <PlanBuilder key={planBuilderKey} onSuccess={(id) => setSubmitted_booking_id(id)} />
              <Process />
              <About />
              <WhyChooseUs />
              <Testimonials />
              <Connect />
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

