import consistencyThumbnail from '../assets/projects/consistency-ai/thumbnail.webp';
import delusionaiThumbnail from '../assets/projects/delusionai/thumbnail.webp';
import partner1Logo from '../assets/images/partner_1.webp';
import partner2Logo from '../assets/images/partner_2.webp';
import consistencyVideo from '../assets/videos/consistencyai.mp4';
import delusionaiVideo from '../assets/videos/delusionai.mp4';

export const projects = [
  {
    id: 'consistency-ai',
    name: 'Consistency.AI',
    client: 'Consistency.AI',
    industry: 'AI Education Platform',
    challenge: 'Consistency.AI wanted to build a stronger digital presence by creating high-quality educational content that consistently engaged students and professionals while increasing organic reach across social platforms.',
    solution: 'Behind The Build handled end-to-end content production, including premium video editing, content optimization, and platform-specific storytelling to maximize audience retention and engagement.',
    servicesDelivered: [
      'Video Editing',
      'Content Production',
      'Social Media Content',
      'Creative Strategy'
    ],
    duration: '3 Months',
    results: [
      '12M+ Organic Views',
      '420K+ Community Growth',
      '4.2× Engagement Rate'
    ],
    image: consistencyThumbnail,
    partnerLogo: partner1Logo,
    videoUrl: consistencyVideo,
    overview: 'Behind the Build collaborated with Consistency.AI to deliver premium video post-production services. We focused on high-retention short-form vertical structures, visual pacing optimization, and social media brand edits.'
  },
  {
    id: 'delusionai',
    name: 'DelusionAI',
    client: 'DelusionAI',
    industry: 'Mental Health & Wellness',
    challenge: 'DelusionAI wanted to make mental health conversations more accessible through engaging visual storytelling while building trust and growing a strong online community.',
    solution: 'Behind The Build developed a premium content strategy with cinematic editing, motion graphics, and platform-optimized content designed to educate, connect, and increase audience retention.',
    servicesDelivered: [
      'Video Editing',
      'Motion Graphics',
      'Social Media Content',
      'Brand Storytelling'
    ],
    duration: '2 Months',
    results: [
      '30K+ Views in 30 Days',
      '3.8× Community Growth',
      'Higher Audience Retention'
    ],
    image: delusionaiThumbnail,
    partnerLogo: partner2Logo,
    videoUrl: delusionaiVideo,
    overview: 'Behind the Build provided advanced video editing solutions for DELUSIONAI. This included dynamic post-production sequences, motion graphics syncing, sound design mixes, and platform-optimized social cuts.'
  }
];

