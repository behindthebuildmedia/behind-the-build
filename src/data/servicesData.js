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
        price: "₹6,000",
        billing: "month",
        features: [
          "Captions",
          "Color grading",
          "Minimal editing",
          "3 videos per week",
          "1 product video"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹10,500",
        billing: "2 months",
        features: [
          "Sound effects",
          "Captions",
          "Color grading",
          "Premium editing",
          "4 videos per week",
          "2 product videos"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
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
        price: "₹5,000",
        billing: "month",
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
        price: "₹9,000",
        billing: "2 months",
        features: [
          "Management of 4 accounts",
          "20 posts per month",
          "Advanced content creation",
          "Best hashtags",
          "2 month content strategy"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
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
        price: "₹5,000",
        billing: "",
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
        price: "₹9,000",
        billing: "2 months",
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
      }
    },
    faq: [
      {
        question: "What source files do we receive?",
        answer: "You receive editable vectors (.AI, .EPS, Figma files) and high-res web ready copies (.PNG, .SVG)."
      }
    ]
  },
  'website-design': {
    num: '04',
    label: 'WEBSITE DESIGN',
    name: 'WEBSITE DESIGN',
    intro: "Modern, responsive websites built to present your brand and convert visitors.",
    servicesList: [
      { name: "Portfolio Websites", desc: "Editorial visual displays presenting past accomplishments." },
      { name: "E-commerce Websites", desc: "Seamless storefronts managing checkouts and inventory." },
      { name: "Commercial Websites", desc: "Business platforms describing complex service packages." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹12,999",
        billing: "",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic SEO setup",
          "Contact form",
          "Social media integration",
          "Google Analytics setup"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹21,999",
        billing: "",
        features: [
          "Up to 10 pages",
          "Responsive design",
          "Advanced SEO setup",
          "Contact form",
          "Social media integration",
          "Google Analytics setup",
          "Custom functionality",
          "Content creation"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      }
    },
    faq: [
      {
        question: "Do you handle domain configuration?",
        answer: "Yes, we map domains, set up hosting on fast platforms like Vercel, and configure DNS parameters."
      }
    ]
  },
  'tech-events-coverage': {
    num: '05',
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
        billing: "Up to 3 hours",
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
        billing: "Up to 6 hours",
        features: [
          "100 edited photos",
          "1 full event coverage video",
          "1 highlight video",
          "3 reels"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
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
    num: '06',
    label: 'DIGITAL MARKETING',
    name: 'DIGITAL MARKETING',
    intro: "Strategic digital marketing designed to grow your visibility, reach and audience.",
    servicesList: [
      { name: "Social Media Management", desc: "Complete operations across your channels." },
      { name: "Content Strategy", desc: "Script planning, hook design, and release maps." },
      { name: "Content Creation", desc: "Copywriting, graphic templates, and media formats." }
    ],
    pricing: {
      introductory: true,
      starter: {
        planName: "STARTER",
        price: "₹5,000",
        billing: "month",
        features: [
          "Management of 2 social media accounts",
          "12 posts per month",
          "Basic content creation",
          "Simple hashtag strategy",
          "1-month content strategy",
          "Content calendar & scheduling",
          "Monthly performance report"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: false
      },
      growth: {
        planName: "GROWTH",
        price: "₹9,000",
        billing: "2 months",
        features: [
          "Management of 4 social media accounts",
          "20 posts per month",
          "Advanced content creation",
          "Advanced hashtag strategy",
          "2-month content strategy",
          "Content calendar & scheduling",
          "Community management",
          "Monthly performance reports"
        ],
        buttonText: "SELECT PLAN →",
        highlighted: true
      }
    },
    faq: [
      {
        question: "How do we get started with marketing plans?",
        answer: "Choose Starter or Growth to begin our setup. We will schedule a kickoff session to align on accounts and strategy."
      }
    ]
  }
};
