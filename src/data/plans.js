export const plans = {
  // India Individual Content Services
  'ind-content': [
    {
      id: 'ind-co-edit',
      name: 'Video Editing Only',
      price: 800,
      currency: 'INR',
      period: 'video',
      deliverables: [
        '1 Edited Video',
        'Professional editing & pacing',
        'Basic color grading',
        'Audio leveling & balancing',
        'Format optimized for social media'
      ]
    },
    {
      id: 'ind-co-shoot-edit',
      name: 'Video Shooting + Editing',
      price: 1600,
      currency: 'INR',
      period: 'video',
      deliverables: [
        '1 Finished Video',
        'On-site video shoot',
        'Professional editing & color grading',
        'High-quality audio setup & mix',
        'Revisions included'
      ]
    }
  ],
  // India Event Services
  'ind-events': [
    {
      id: 'ind-ev-edit',
      name: 'Event Video Editing Only',
      price: 4999,
      currency: 'INR',
      period: 'project',
      deliverables: [
        '3 Reels / Short vertical cuts',
        '1 Highlight Video (1-3 mins)',
        'Raw footage provided by client'
      ]
    },
    {
      id: 'ind-ev-photo-edit',
      name: 'Photo Editing Only',
      price: 2999,
      currency: 'INR',
      period: 'project',
      deliverables: [
        '50–75 Edited Photos',
        'Professional color retouching',
        'Raw photos provided by client'
      ]
    },
    {
      id: 'ind-ev-shoot-video',
      name: 'Video Shooting Only',
      price: 5999,
      currency: 'INR',
      period: 'up to 6 hours',
      deliverables: [
        'Up to 6 Hours Shooting Coverage',
        'Raw footage delivery',
        'Professional videography gear setup'
      ]
    },
    {
      id: 'ind-ev-shoot-photo',
      name: 'Photography Only',
      price: 4999,
      currency: 'INR',
      period: 'up to 6 hours',
      deliverables: [
        'Up to 6 Hours Shooting Coverage',
        'Raw photos delivery',
        'Professional photographer setup'
      ]
    },
    {
      id: 'ind-ev-shoot-edit-video',
      name: 'Video Shooting + Editing',
      price: 9999,
      currency: 'INR',
      period: 'project',
      deliverables: [
        'Up to 6 Hours Shooting Coverage',
        '3 Reels / Short vertical cuts',
        '1 Highlight Video (1-3 mins)'
      ]
    },
    {
      id: 'ind-ev-shoot-edit-photo',
      name: 'Photography + Editing',
      price: 7999,
      currency: 'INR',
      period: 'project',
      deliverables: [
        'Up to 6 Hours Shooting Coverage',
        '50–75 Edited Photos'
      ]
    },
    {
      id: 'ind-ev-full',
      name: 'Full Photo + Video Coverage',
      price: 14999,
      currency: 'INR',
      period: 'project',
      deliverables: [
        'Up to 6 Hours Media Coverage',
        '50–75 Edited Photos',
        '3 Reels / Short vertical cuts',
        '1 Highlight Video (1-3 mins)',
        'Dedicated photographer + videographer team'
      ]
    }
  ],
  // USA / International Remote Editing Services
  'intl-remote': [
    {
      id: 'intl-basic',
      name: 'Basic Video Editing',
      price: 75,
      currency: 'USD',
      period: 'video',
      deliverables: [
        '1 Edited Video',
        'Basic editing & cuts',
        'Audio leveling',
        'Standard color correction'
      ]
    },
    {
      id: 'intl-std',
      name: 'Standard Video Editing',
      price: 125,
      currency: 'USD',
      period: 'video',
      deliverables: [
        '1 High-engagement Video',
        'Advanced visual editing & pacing',
        'Dynamic text / subtitles',
        'Sound FX & creative mix'
      ]
    },
    {
      id: 'intl-prem',
      name: 'Premium Video Editing',
      price: 200,
      isRange: true,
      priceDisplay: '$200+',
      currency: 'USD',
      period: 'video',
      deliverables: [
        'Premium Video Production',
        'Full creative direction support',
        'Advanced motion design / graphics',
        'Priority turnaround support'
      ]
    },
    {
      id: 'intl-ev-edit',
      name: 'Event Video Editing',
      price: 500,
      isRange: true,
      priceDisplay: '$500 – $1,000',
      currency: 'USD',
      period: 'project',
      deliverables: [
        'Complete Event Recap Cut',
        'Reels / social media vertical cuts',
        'Raw footage processing',
        'Custom sound mix & track matching'
      ]
    },
    {
      id: 'intl-photo-edit',
      name: 'Photo Editing',
      price: 200,
      isRange: true,
      priceDisplay: '$200 – $500',
      currency: 'USD',
      period: 'project',
      deliverables: [
        'Professional Retouching Pack',
        'Color grading & lighting adjustment',
        'High-resolution export',
        'Bulk file delivery'
      ]
    }
  ]
};
