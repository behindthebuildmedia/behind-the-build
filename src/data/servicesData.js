export const servicesData = {
  media: {
    label: "MEDIA SERVICES",
    name: "MEDIA",
    headline: "WE PRODUCE THE VISUALS THAT MAKE BRANDS IMPOSSIBLE TO IGNORE.",
    description: "High-retention video production, cinematic editing, dynamic motion graphics, and corporate/brand photography built to capture attention and tell your story.",
    servicesList: [
      { name: "Video Production", desc: "Scripted, shot, and directed on-site or remote." },
      { name: "Video Editing", desc: "Cinematic cuts, audio leveling, and pacing optimization." },
      { name: "Photography", desc: "Premium product, brand, and corporate headshots." },
      { name: "Event Coverage", desc: "Comprehensive documentation of corporate events and hackathons." },
      { name: "Motion Graphics", desc: "Dynamic text animations, transition graphics, and overlays." }
    ],
    pricing: {
      starter: {
        planName: "STARTER",
        price: "₹15,000",
        billing: "per project",
        description: "Ideal for creators and startups needing essential post-production.",
        features: [
          "5 Edited Short-Form Videos",
          "Professional Pacing & Cuts",
          "Basic Color Correction & Audio leveling",
          "2 Revision rounds",
          "72-hour Turnaround"
        ],
        buttonText: "START A PROJECT →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹45,000",
        billing: "per month",
        description: "For high-growth brands seeking ongoing content support and scaling.",
        features: [
          "15 Edited Short-Form Videos",
          "Advanced Motion Graphics & Audio Mix",
          "Premium Color Grading & Subtitles",
          "Unlimited Revision rounds",
          "Priority 24-48h Turnaround",
          "Dedicated Project Manager"
        ],
        buttonText: "BUILD WITH US →",
        highlighted: true
      }
    },
    faq: [
      {
        question: "What is your typical turnaround time?",
        answer: "For standard starter edits, we deliver initial drafts within 72 hours. Growth tier projects receive priority 24-48 hour turnaround."
      },
      {
        question: "Do you offer custom raw footage shoots?",
        answer: "Yes, we cover on-site videography and photography in Hyderabad and select locations in India. Get in touch to discuss booking."
      },
      {
        question: "Can we roll over unused video credits?",
        answer: "Growth retainer packages are structured monthly, but we allow up to 3 unused video credits to roll over to the following month."
      }
    ]
  },
  content: {
    label: "CONTENT SERVICES",
    name: "CONTENT",
    headline: "WE TURN IDEAS INTO CONTENT PEOPLE ACTUALLY WANT TO WATCH.",
    description: "Data-driven social media content creation, viral hooks scripting, platform-optimized vertical layouts, and creative campaign assets designed for maximum retention.",
    servicesList: [
      { name: "Social Media", desc: "End-to-end community building and release scheduling." },
      { name: "Content Strategy", desc: "Target audience profiling, script writing, and hook optimization." },
      { name: "Reels & Short-form", desc: "High-hook vertical cuts optimized for Instagram and YouTube." },
      { name: "Personal Branding", desc: "Positioning creators and founders as authority figures." },
      { name: "Creative Campaigns", desc: "Interactive content plans to trigger organic reach." }
    ],
    pricing: {
      starter: {
        planName: "STARTER",
        price: "₹20,000",
        billing: "per project",
        description: "Essential organic content setup to test your target market.",
        features: [
          "Social Media Page Audit",
          "10 Hook Templates & Scripts",
          "5 High-Retention Video Edits",
          "Basic Hashtag & SEO Plan",
          "1 Creative Campaign Guide"
        ],
        buttonText: "START A PROJECT →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹60,000",
        billing: "per month",
        description: "Complete hands-off social media growth strategy and execution.",
        features: [
          "Full Platform Management",
          "Custom Monthly Content Strategy",
          "12 Custom Vertical Videos",
          "Advanced Analytics & Hook Iteration",
          "Priority Creator Support",
          "2 Monthly Campaign Adjustments"
        ],
        buttonText: "BUILD WITH US →",
        highlighted: true
      }
    },
    faq: [
      {
        question: "Do you handle script writing?",
        answer: "Yes! In both plans, we assist with script templates and hook formulation based on proven high-retention editing structures."
      },
      {
        question: "Which platforms do you optimize for?",
        answer: "We support YouTube Shorts, Instagram Reels, TikTok, and LinkedIn video content formats."
      }
    ]
  },
  digital: {
    label: "DIGITAL SERVICES",
    name: "DIGITAL",
    headline: "WE BUILD THE DIGITAL SYSTEMS BEHIND YOUR BRAND.",
    description: "Premium editorial websites, custom high-converting landing pages, robust e-commerce setups, and scalable digital marketing flows that load fast.",
    servicesList: [
      { name: "Websites", desc: "Modern web portals using Vite, React, and Tailwind CSS." },
      { name: "Landing Pages", desc: "High-converting single-page campaigns built for promotions." },
      { name: "E-commerce", desc: "Smooth store designs, payment gateways, and order management." },
      { name: "Digital Marketing", desc: "Targeted campaigns, SEO optimizations, and tracking setups." },
      { name: "Digital Experiences", desc: "Interactive custom configurators, animations, and tools." }
    ],
    pricing: {
      starter: {
        planName: "STARTER",
        price: "₹35,000",
        billing: "per project",
        description: "Clean single-page website or landing page for quick launches.",
        features: [
          "Responsive Landing Page (React/Tailwind)",
          "SEO Optimization & Analytics setup",
          "Contact Form & Database integration",
          "Vercel Deployment & domain mapping",
          "2 Weeks post-launch support"
        ],
        buttonText: "START A PROJECT →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹95,000",
        billing: "per project",
        description: "Comprehensive multi-page custom build or e-commerce solution.",
        features: [
          "Multi-page Dynamic Web Application",
          "Custom Interactive Elements (e.g. configurators)",
          "E-commerce & Checkout integration",
          "CMS Integration for blog/services",
          "4 Weeks post-launch support",
          "Priority ongoing system optimization"
        ],
        buttonText: "BUILD WITH US →",
        highlighted: true
      }
    },
    faq: [
      {
        question: "Can we add AI services later?",
        answer: "Absolutely. Our codebases are architected to scale so adding AI automation APIs, custom workflows, or chatbot integrations is straightforward."
      },
      {
        question: "Who handles website hosting?",
        answer: "We deploy on secure cloud platforms like Vercel and Netlify. We will guide you through domain configuration and setup."
      }
    ]
  },
  design: {
    label: "DESIGN SERVICES",
    name: "DESIGN",
    headline: "WE BUILD THE VISUAL IDENTITY THAT MAKES YOUR BRAND RECOGNIZABLE.",
    description: "Clean, minimalist, and editorial graphic design, professional brand identity systems, high-engagement carousels, and high-end pitch decks.",
    servicesList: [
      { name: "Graphic Design", desc: "Custom digital layouts and graphics for social networks." },
      { name: "Logo Design", desc: "Minimalist, memorable vector logo systems." },
      { name: "Brand Identity", desc: "Typography guidelines, color schemes, and styles guides." },
      { name: "Carousel Design", desc: "High-retention multi-slide guides for LinkedIn and Instagram." },
      { name: "Presentation Design", desc: "Premium investor pitch decks and corporate templates." }
    ],
    pricing: {
      starter: {
        planName: "STARTER",
        price: "₹12,000",
        billing: "per project",
        description: "Essential design elements to establish your startup's brand.",
        features: [
          "Minimalist Logo System (3 Concepts)",
          "Primary Typography & Color Guides",
          "3 Custom Social Media Templates",
          "All Source Files (.SVG, .AI)",
          "1 Revision round"
        ],
        buttonText: "START A PROJECT →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹35,000",
        billing: "per project",
        description: "Complete editorial brand identity design package and collateral.",
        features: [
          "Comprehensive Visual Identity System",
          "Logo Pack (Vertical, Horizontal, Icons)",
          "Full Typography & Styling Guidelines",
          "10 Custom Social Templates / Carousels",
          "Premium Pitch Deck Template (15 Slides)",
          "Unlimited Revision rounds"
        ],
        buttonText: "BUILD WITH US →",
        highlighted: true
      }
    },
    faq: [
      {
        question: "What files do we receive?",
        answer: "We provide high-resolution formats (.PNG, .PDF) alongside vector source files (.AI, .EPS, .SVG, or Figma project links) for complete editing control."
      },
      {
        question: "Do you design presentation decks?",
        answer: "Yes, presentation design (such as startup pitch decks or event portfolios) is covered under the Growth tier."
      }
    ]
  }
};
