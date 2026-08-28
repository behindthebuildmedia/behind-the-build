export const servicesData = {
  'video-editing': {
    num: '01',
    label: 'VIDEO EDITING',
    name: 'VIDEO EDITING',
    intro: "Professional short-form editing for brands, founders, products and technology companies.",
    servicesList: [
      { name: "Reels Editing", desc: "Short-form vertical video cuts with high hook retention." },
      { name: "Personal Growth Edits", desc: "Positioning founders and creators as authorities." },
      { name: "Motion Graphics", desc: "Dynamic typography overlays and transition details." },
      { name: "Product Videos", desc: "Creative visual reviews showcasing product features." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹7,999",
        billing: "1 Month",
        features: [
          "Basic editing",
          "Color grading",
          "Captions",
          "2 reels per week",
          "Content script",
          "Duration: 1 month"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹13,999",
        billing: "3 Months",
        features: [
          "Good editing",
          "Color grading",
          "Captions",
          "Sound effects",
          "Content script",
          "1 product video",
          "3 reels per week + 1 long-form video",
          "Duration: 3 months"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      },
      premium: {
        planName: "PREMIUM",
        price: "₹19,999",
        billing: "5 Months",
        features: [
          "Premium editing",
          "After Effects",
          "Motion graphics",
          "Sound effects",
          "Captions",
          "Color grading",
          "Content script",
          "Product shoot",
          "2 product videos",
          "4 reels per week + 2 long-form videos",
          "Duration: 5 months"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      }
    },
    faq: [
      {
        question: "What raw footage format do you accept?",
        answer: "We support any raw footage format (.MP4, .MOV, .MXF) recorded via smartphone or professional cameras. You can upload them to Google Drive or Dropbox."
      }
    ]
  },
  'social-media-marketing': {
    num: '02',
    label: 'SOCIAL MEDIA MARKETING',
    name: 'SOCIAL MEDIA MARKETING',
    intro: "Strategy, content and management designed to build a consistent digital presence.",
    servicesList: [
      { name: "Social Media Strategy", desc: "Audience targeting, brand voice direction, and release maps." },
      { name: "Content Creation", desc: "Copywriting, graphic asset creation, and video hooks strategy." },
      { name: "Content Calendar & Scheduling", desc: "Ensuring structured posting times and calendar management." },
      { name: "Monthly Reports", desc: "Insightful metrics reporting viewer impressions and click-through rates." },
      { name: "Community Management", desc: "Direct interactions, comment replies, and message responses." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹4,999",
        billing: "1 Month",
        features: [
          "Management of 2 accounts",
          "12 posts per month",
          "Basic content creation",
          "Simple hashtags",
          "1 month content strategy"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹11,999",
        billing: "3 Months",
        features: [
          "Management of 4 accounts",
          "20 posts per month",
          "Advanced content creation",
          "Best hashtags",
          "2 month content strategy"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      },
      premium: {
        planName: "PREMIUM",
        price: "₹17,999",
        billing: "5 Months",
        features: [
          "Management of all major accounts",
          "35 posts per month",
          "Premium dynamic content & copywriting",
          "Full monthly analytics dashboard",
          "Dedicated community manager",
          "Custom campaign strategies"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      }
    },
    faq: [
      {
        question: "Which social platforms do you manage?",
        answer: "We support Instagram, YouTube, LinkedIn, and Facebook channel operations."
      }
    ]
  },
  'design': {
    num: '03',
    label: 'DESIGN',
    name: 'DESIGN',
    intro: "Creative design systems that make your brand look consistent and recognizable.",
    servicesList: [
      { name: "Announcement Posts", desc: "Brand launch graphics, hiring calls, and news releases." },
      { name: "Thumbnails", desc: "High click-through-rate assets for YouTube videos." },
      { name: "Story Designs", desc: "Interactive story templates to boost channel participation." },
      { name: "Instagram Carousels", desc: "Slide decks presenting complex information simply." },
      { name: "Logo Design", desc: "Memorability vector assets matching company theme." },
      { name: "Branding", desc: "Typography guidelines and corporate styled packages." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹5,999",
        billing: "1 Month",
        features: [
          "Custom Logo Design",
          "Business Card Design",
          "4 Thumbnails",
          "3 Instagram Carousels per month",
          "Social Media Cover Pages — any 2"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹12,999",
        billing: "3 Months",
        features: [
          "Logo & Branding Kit",
          "Social Media Templates",
          "Offer Letters",
          "Social Media Cover Pages — any 4",
          "10 Thumbnails",
          "8 Instagram Carousels per month"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      },
      premium: {
        planName: "PREMIUM",
        price: "₹18,999",
        billing: "5 Months",
        features: [
          "Full Corporate Brand Identity Guidelines",
          "Custom Presentation & Deck Design",
          "Unlimited Social Cover Layouts",
          "25 Custom Thumbnails",
          "18 Instagram Carousels per month",
          "Print Ready Stationery & Merch assets"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      }
    },
    faq: [
      {
        question: "What source files do we receive?",
        answer: "You receive editable vectors (.AI, .EPS, Figma files) and high-res web ready copies (.PNG, .SVG)."
      }
    ]
  },
  'tech-events-coverage': {
    num: '04',
    label: 'TECH EVENT COVERAGE',
    name: 'TECH EVENT COVERAGE',
    intro: "Professional photo and video coverage for launches, conferences, campus and technology events.",
    servicesList: [
      { name: "Videography", desc: "Dynamic cinematic event capture using premium setups." },
      { name: "Photography", desc: "High-resolution candid shots catching authentic moments." },
      { name: "Video Editing", desc: "Turn event documentation into engaging highlights and reels." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹8,000",
        billing: "upto 3 hours",
        features: [
          "50 edited photos",
          "1 highlight video",
          "2 reels"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹15,000",
        billing: "upto 6 hours",
        features: [
          "100 edited photos",
          "1 full event coverage video",
          "1 highlight video",
          "3 reels"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      },
      premium: {
        planName: "PREMIUM",
        price: "₹25,000",
        billing: "upto 8 hours",
        features: [
          "200+ edited high-resolution photos",
          "Full Event Aftermovie & Highlight Edit",
          "5 engaging social reels/shorts",
          "On-site secondary camera/gimbal setup",
          "Fast 48-hour raw footage deliverable"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      }
    },
    faq: [
      {
        question: "Where are events coverage services available?",
        answer: "We support physical on-site coverage in Hyderabad and surrounding locations. Reach out to schedule dates."
      }
    ]
  },
  'digital-marketing': {
    num: '05',
    label: 'DIGITAL MARKETING',
    name: 'DIGITAL MARKETING',
    intro: "Strategic digital marketing designed to grow your visibility, reach and audience.",
    servicesList: [
      { name: "Search Engine Optimization (SEO)", desc: "Improve organic visibility and search rankings." },
      { name: "Search Engine Marketing (SEM)", desc: "Paid search campaigns designed to reach high-intent audiences." },
      { name: "Performance Marketing", desc: "Data-driven campaigns focused on measurable conversions and growth." },
      { name: "Paid Advertising", desc: "Campaign strategy and management across relevant digital advertising platforms." },
      { name: "Conversion Optimization", desc: "Improve landing pages, funnels and user journeys to increase conversions." },
      { name: "Analytics & Growth Strategy", desc: "Track performance, identify opportunities and continuously optimize campaigns." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹4,999",
        billing: "1 Month",
        features: [
          "SEO Audit & Keyword Map",
          "Ad campaign strategy",
          "Analytics dashboard integration",
          "Monthly conversions tracking report",
          "1 ad platform configuration",
          "Campaign setup & target kickoff"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹11,999",
        billing: "3 Months",
        features: [
          "Full SEO & SEM operations",
          "Conversion funnel engineering",
          "Up to 3 ad platforms managed",
          "Bi-weekly reporting dashboard updates",
          "A/B landing page campaign assets",
          "Advanced growth consultations"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      },
      premium: {
        planName: "PREMIUM",
        price: "₹18,999",
        billing: "5 Months",
        features: [
          "Omnichannel Paid Ads Strategy & Executions",
          "Full Conversion Funnel Engineering & CRO",
          "5+ Ad Platforms Managed (Meta, Google, LinkedIn, etc)",
          "Weekly Growth Consulting & Reporting Calls",
          "Advanced Retargeting & LTV Analytics setup",
          "Dedicated Growth Marketer assignment"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      }
    },
    faq: [
      {
        question: "Do you configure Google Ads and Meta campaigns?",
        answer: "Yes, we handle complete creation, tracking setup, copy design, asset mapping, and bid optimization across Google, Meta, and LinkedIn ads."
      },
      {
        question: "How long does it take to see results?",
        answer: "Paid campaigns (SEM/Meta) usually show initial conversion traffic within 24-48 hours. Organic SEO optimizations take between 3-6 months to rank and capture sustainable traffic."
      }
    ]
  }
};
