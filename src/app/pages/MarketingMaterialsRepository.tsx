import { FileText, Download, Eye, TrendingUp, Lock, Calendar, FileCheck, AlertTriangle, Search, Filter, ChevronDown, Megaphone } from 'lucide-react';
import { BackButton } from '@/app/components/BackButton';
import { useState } from 'react';
import { generatePDF } from '@/app/utils/pdfGenerator';
import { ZalphaBrainLogo } from '@/app/components/ZalphaBrainLogo';
import { Logo } from '@/app/components/Logo';

interface MarketingMaterialsRepositoryProps {
  onNavigate: (page: string) => void;
}

export function MarketingMaterialsRepository({ onNavigate }: MarketingMaterialsRepositoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const documents = [
    // Brand Assets
    {
      id: 'brand-guidelines',
      name: 'ZALPHA Brand Guidelines',
      category: 'brand',
      description: 'Complete brand identity guidelines including logo usage, colors, typography',
      file: 'ZALPHA_Brand_Guidelines_2026.pdf',
      size: '15.2 MB',
      pages: 42,
      version: '3.0',
      lastUpdated: 'February 1,2026',
      status: 'active',
      featured: true,
      content: `Brand Guidelines include:
• Logo Usage (Primary, Secondary, Monochrome)
• Clear Space & Minimum Size Requirements
• Color Palette (Pacific-themed blues, greens, corals)
• Typography (Primary: Poppins, Secondary: Inter)
• Pacific Islands Design Elements
• Photography Style & Guidelines
• Illustration Style
• Voice & Tone Guidelines
• Brand Personality: Empowering, Cultural, Innovative
• Do's and Don'ts
• Co-Branding Guidelines
• Digital & Print Applications`,
    },
    {
      id: 'logo-package',
      name: 'Logo & Assets Package',
      category: 'brand',
      description: 'Complete collection of ZALPHA logos in all formats and variations',
      file: 'ZALPHA_Logo_Package_2026.zip',
      size: '45.8 MB',
      pages: 1,
      version: '2.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      featured: true,
      content: `Logo Package includes:
• Primary Logo (Full Color, White, Black)
• Secondary Logo Variations
• Icon-Only Versions
• Horizontal & Vertical Layouts
• File Formats: PNG, SVG, AI, EPS, PDF
• Sizes: From 16px icon to 4K print
• Pacific Islands Wave Pattern
• Zee AI Chatbot Character Assets
• Social Media Profile Images
• Favicon & App Icons
• Print-Ready Files (CMYK)`,
    },
    {
      id: 'style-guide',
      name: 'Marketing Style Guide',
      category: 'brand',
      description: 'Comprehensive writing and visual style guide for all marketing materials',
      file: 'ZALPHA_Style_Guide_2026.pdf',
      size: '8.3 MB',
      pages: 36,
      version: '2.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      featured: false,
      content: `Style Guide includes:
• Writing Voice: Empowering, Authentic, Cultural
• Tone Guidelines (Formal vs. Casual by channel)
• Messaging Pillars: Opportunity, Community, Innovation
• Pacific Islands Cultural Sensitivity
• Inclusive Language Guidelines
• Grammar & Punctuation Standards
• Numbers & Dates Formatting
• Headlines & CTAs Best Practices
• Social Media Voice
• Email Communication Style
• Press Release Guidelines`,
    },

    // Print Materials
    {
      id: 'brochure-students',
      name: 'Student Recruitment Brochure',
      category: 'print',
      description: 'Tri-fold brochure for recruiting students at high schools and colleges',
      file: 'ZALPHA_Student_Brochure_2026.pdf',
      size: '12.4 MB',
      pages: 6,
      version: '3.0',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      featured: true,
      content: `Student Brochure includes:
• Front Panel: "Your Future Starts Here"
• Platform Overview & Benefits
• ADA Accessibility Highlight
• Skills Assessment & Gamification
• Zee AI Chatbot Introduction
• Success Stories (3 student testimonials)
• Job Opportunities Across Pacific Islands
• Government Loan Application Support
• QR Code for Easy Sign-Up
• Contact Information
• Print Specs: 8.5" x 11" tri-fold, 4-color`,
    },
    {
      id: 'brochure-employers',
      name: 'Employer Recruitment Brochure',
      category: 'print',
      description: 'Professional brochure for recruiting employers to the platform',
      file: 'ZALPHA_Employer_Brochure_2026.pdf',
      size: '14.1 MB',
      pages: 8,
      version: '2.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      featured: true,
      content: `Employer Brochure includes:
• "Find Pacific's Best Talent"
• Subscription Tier Comparison
• ATS Integration Benefits
• ADA Compliance Made Easy
• Candidate Quality Metrics
• Success Stories (3 employer testimonials)
• ROI Calculator
• Virtual Job Fair Opportunities
• Contract Worker Marketplace
• Pricing Information
• Contact & Demo Request
• Print Specs: 8.5" x 14" booklet, full color`,
    },
    {
      id: 'poster-schools',
      name: 'Educational Institution Poster',
      category: 'print',
      description: 'Large-format poster for display in schools and career centers',
      file: 'ZALPHA_School_Poster_2026.pdf',
      size: '28.7 MB',
      pages: 1,
      version: '1.5',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      featured: false,
      content: `School Poster includes:
• Eye-catching Pacific-themed design
• Headline: "Launch Your Career with ZALPHA"
• Key Benefits for Students
• QR Code for Registration
• Visual: Diverse Pacific Islander students succeeding
• Partnership Logo Space
• ADA Accessibility Badge
• Print Specs: 24" x 36", full color
• Available in English, Chamorro, Carolinian`,
    },
    {
      id: 'business-cards',
      name: 'Business Card Templates',
      category: 'print',
      description: 'Professional business card templates for team members',
      file: 'ZALPHA_Business_Cards_2026.pdf',
      size: '5.2 MB',
      pages: 4,
      version: '2.0',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      featured: false,
      content: `Business Cards include:
• Standard Template (3.5" x 2")
• Front: Logo, Name, Title
• Back: Contact Info, QR Code, Tagline
• Pacific Wave Design Element
• Print Specs: 16pt cardstock, matte finish
• Templates for: Sales, Support, Management
• Print-ready files in CMYK`,
    },

    // Digital Assets
    {
      id: 'social-media-templates',
      name: 'Social Media Templates Pack',
      category: 'digital',
      description: 'Complete set of social media post templates for all platforms',
      file: 'ZALPHA_Social_Templates_2026.zip',
      size: '127.3 MB',
      pages: 1,
      version: '4.0',
      lastUpdated: 'February 2, 2026',
      status: 'active',
      featured: true,
      content: `Social Templates include:
• Instagram: Posts, Stories, Reels
• Facebook: Posts, Cover Photos, Ads
• LinkedIn: Posts, Company Page Banner
• Twitter/X: Posts, Header Images
• TikTok: Video Overlays, Thumbnails
• Sizes for all platforms (optimized)
• File Formats: Adobe XD, Canva, PSD, PNG
• 50+ Pre-designed Templates
• Editable Text & Images
• Brand-compliant color schemes
• Pacific-themed graphics included`,
    },
    {
      id: 'email-templates',
      name: 'Email Marketing Templates',
      category: 'digital',
      description: 'Professional email templates for campaigns and communications',
      file: 'ZALPHA_Email_Templates_2026.zip',
      size: '42.6 MB',
      pages: 1,
      version: '3.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      featured: true,
      content: `Email Templates include:
• Welcome Series (5 emails)
• Newsletter Templates (3 variations)
• Promotional Campaign Templates
• Event Invitation Templates
• Job Alert Templates
• Survey & Feedback Templates
• Transactional Email Designs
• Mobile-Responsive Layouts
• HTML & Plain Text Versions
• A/B Testing Variations
• File Formats: HTML, Mailchimp, HubSpot`,
    },
    {
      id: 'web-banners',
      name: 'Website Banner & Ad Creative',
      category: 'digital',
      description: 'Display advertising creative for web and mobile',
      file: 'ZALPHA_Web_Banners_2026.zip',
      size: '89.4 MB',
      pages: 1,
      version: '2.8',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      featured: false,
      content: `Web Banners include:
• Standard IAB Sizes (300x250, 728x90, 160x600, etc.)
• Mobile Sizes (320x50, 300x50, 320x100)
• Animated HTML5 Banners
• Static Image Banners (JPG, PNG)
• Google Display Network Ready
• Facebook & Instagram Ad Sizes
• LinkedIn Sponsored Content Sizes
• 3 Creative Themes: Students, Employers, Schools
• CTAs: "Sign Up Free", "Post a Job", "Join Now"
• File Formats: HTML5, GIF, PNG, PSD`,
    },
    {
      id: 'presentation-template',
      name: 'PowerPoint Presentation Template',
      category: 'digital',
      description: 'Professional presentation template for sales and events',
      file: 'ZALPHA_Presentation_Template_2026.pptx',
      size: '18.9 MB',
      pages: 45,
      version: '2.5',
      lastUpdated: 'January 22, 2026',
      status: 'active',
      featured: false,
      content: `Presentation Template includes:
• Title Slide with Pacific Design
• Agenda & Contents Slides
• Section Dividers
• Content Layouts (Text, Images, Charts)
• Data Visualization Slides
• Team Introduction Slides
• Product Feature Slides
• Pricing & Comparison Tables
• Testimonial Slides
• Call-to-Action Slides
• Contact & Thank You Slide
• Master Slides for Easy Editing
• Google Slides Version Included`,
    },

    // Video Assets
    {
      id: 'explainer-video',
      name: 'ZALPHA Explainer Video',
      category: 'video',
      description: 'Professional 90-second explainer video for the platform',
      file: 'ZALPHA_Explainer_Video_2026.mp4',
      size: '245.7 MB',
      pages: 1,
      version: '1.0',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      featured: true,
      content: `Explainer Video includes:
• Duration: 90 seconds
• Format: MP4, 1080p HD
• Professional Voiceover (English)
• Subtitles: English, Chamorro, Carolinian
• Pacific Islands-themed animation
• Key Messages: Opportunity, Accessibility, Community
• Zee AI Chatbot Feature Highlight
• Student Success Stories
• Call-to-Action: Visit Website
• Social Media Cuts: 60s, 30s, 15s versions
• Vertical (9:16) and Square (1:1) versions`,
    },
    {
      id: 'testimonial-videos',
      name: 'Student & Employer Testimonial Videos',
      category: 'video',
      description: 'Collection of authentic testimonial videos from users',
      file: 'ZALPHA_Testimonials_2026.zip',
      size: '1.2 GB',
      pages: 1,
      version: '1.5',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      featured: true,
      content: `Testimonial Videos include:
• 6 Student Success Stories (2-3 min each)
• 4 Employer Success Stories (2-3 min each)
• 2 School Partnership Stories (3-4 min each)
• Professional editing with b-roll
• Lower thirds with names & titles
• ZALPHA branding throughout
• Formats: MP4 (1080p), Social Media cuts
• Diverse Pacific Islander representation
• Authentic, unscripted testimonials
• Usage rights secured`,
    },
    {
      id: 'social-video-ads',
      name: 'Social Media Video Ad Campaign',
      category: 'video',
      description: 'Short-form video ads optimized for social media platforms',
      file: 'ZALPHA_Social_Video_Ads_2026.zip',
      size: '567.8 MB',
      pages: 1,
      version: '2.0',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      featured: false,
      content: `Social Video Ads include:
• 15-second Instagram/Facebook Ads (3 variations)
• 30-second LinkedIn Ads (2 variations)
• 60-second YouTube Pre-roll Ads
• TikTok-style vertical videos (9:16)
• Square format for feeds (1:1)
• Captions embedded (no sound needed)
• Multiple CTAs: Sign Up, Learn More, Get Started
• Target Audiences: Students, Employers, Schools
• A/B testing variations
• Performance tracking codes embedded`,
    },

    // Campaign Assets
    {
      id: 'launch-campaign',
      name: 'Platform Launch Campaign Kit',
      category: 'campaigns',
      description: 'Complete marketing campaign for platform launch events',
      file: 'ZALPHA_Launch_Campaign_2026.pdf',
      size: '34.2 MB',
      pages: 68,
      version: '1.0',
      lastUpdated: 'January 15, 2026',
      status: 'active',
      featured: true,
      content: `Launch Campaign includes:
• Campaign Strategy & Timeline (90 days)
• Target Audience Profiles
• Key Messages & Positioning
• Press Release Template
• Media Kit & Fact Sheet
• Social Media Calendar (pre-launch, launch, post)
• Email Campaign Series (5 emails)
• Paid Advertising Creative
• Event Marketing Materials
• Partnership Outreach Templates
• Influencer Collaboration Guide
• Launch Day Checklist
• Success Metrics Dashboard`,
    },
    {
      id: 'ada-campaign',
      name: 'ADA Accessibility Campaign Materials',
      category: 'campaigns',
      description: 'Marketing campaign highlighting ADA compliance competitive advantage',
      file: 'ZALPHA_ADA_Campaign_2026.pdf',
      size: '28.5 MB',
      pages: 52,
      version: '1.5',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      featured: true,
      content: `ADA Campaign includes:
• Campaign Theme: "Opportunity for Everyone"
• Positioning: Pacific's First & Only ADA-Compliant Platform
• Key Messages for Students with Disabilities
• Key Messages for Employers (DEI hiring)
• Social Media Content Calendar (30 days)
• Success Stories (4 students with disabilities)
• Infographics on Accessibility Features
• Blog Post Series (5 articles)
• Press Release on ADA Compliance
• Email Campaign to Disability Organizations
• Partnership Opportunities
• Metrics & ROI Tracking`,
    },
    {
      id: 'student-recruitment',
      name: 'Student Recruitment Campaign',
      category: 'campaigns',
      description: 'Multi-channel campaign for recruiting students to the platform',
      file: 'ZALPHA_Student_Recruitment_2026.pdf',
      size: '41.7 MB',
      pages: 74,
      version: '3.0',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      featured: false,
      content: `Student Recruitment includes:
• Campaign Duration: Ongoing
• Target: High school seniors, college students, recent grads
• Channels: Social, Email, Campus Events, Influencers
• Key Messages: "Your Dream Job Awaits"
• Social Media Content (Instagram, TikTok focus)
• Campus Ambassador Program Guide
• School Partnership Co-Marketing
• Referral Program Materials
• Contest & Giveaway Ideas
• Success Stories & Testimonials
• Landing Page Designs
• Conversion Optimization Tips
• Weekly Performance Reports`,
    },

    // Advertising Creative
    {
      id: 'google-ads',
      name: 'Google Ads Campaign Creative',
      category: 'advertising',
      description: 'Search and display advertising creative for Google Ads',
      file: 'ZALPHA_Google_Ads_2026.zip',
      size: '156.3 MB',
      pages: 1,
      version: '2.5',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      featured: true,
      content: `Google Ads Creative includes:
• Search Ads: Headlines & Descriptions (20+ variations)
• Responsive Search Ads (RSAs)
• Display Ads (All IAB sizes)
• YouTube Video Ads (bumper, skippable, non-skippable)
• Gmail Sponsored Promotions
• Discovery Ads
• Keyword Lists (Students, Employers, Schools)
• Negative Keywords List
• Ad Extensions: Sitelinks, Callouts, Structured Snippets
• Landing Page Recommendations
• Conversion Tracking Setup
• Performance Benchmarks`,
    },
    {
      id: 'facebook-ads',
      name: 'Meta (Facebook & Instagram) Ads',
      category: 'advertising',
      description: 'Complete ad creative for Facebook and Instagram advertising',
      file: 'ZALPHA_Meta_Ads_2026.zip',
      size: '278.4 MB',
      pages: 1,
      version: '3.0',
      lastUpdated: 'February 1, 2026',
      status: 'active',
      featured: true,
      content: `Meta Ads Creative includes:
• Feed Ads (Image & Video)
• Stories Ads (Static & Video)
• Reels Ads
• Carousel Ads (5-10 cards)
• Collection Ads
• Lead Generation Forms
• Ad Copy Variations (40+ variations)
• Audience Targeting Recommendations
• Custom & Lookalike Audiences
• Retargeting Campaigns
• A/B Testing Framework
• Pixel Setup & Conversion Tracking
• Performance Dashboards`,
    },
    {
      id: 'linkedin-ads',
      name: 'LinkedIn Advertising Campaign',
      category: 'advertising',
      description: 'Professional advertising creative for LinkedIn (employer focus)',
      file: 'ZALPHA_LinkedIn_Ads_2026.zip',
      size: '112.7 MB',
      pages: 1,
      version: '2.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      featured: false,
      content: `LinkedIn Ads Creative includes:
• Sponsored Content (Single Image & Video)
• Carousel Ads
• Text Ads
• Sponsored InMail (Message Ads)
• Dynamic Ads (Follower, Spotlight)
• Lead Gen Forms
• Ad Copy for B2B Audience
• Targeting: HR, Recruiters, Business Owners
• Industry Targeting (Pacific Islands focus)
• Job Title & Seniority Targeting
• Retargeting Campaigns
• Conversion Tracking
• ROI Measurement Framework`,
    },

    // Content Marketing
    {
      id: 'blog-content',
      name: 'Blog Content Library',
      category: 'content',
      description: 'Collection of blog posts and article templates',
      file: 'ZALPHA_Blog_Content_2026.pdf',
      size: '22.8 MB',
      pages: 156,
      version: '4.0',
      lastUpdated: 'February 2, 2026',
      status: 'active',
      featured: false,
      content: `Blog Content includes:
• 30 Published Blog Posts (SEO-optimized)
• Blog Post Templates (How-to, Listicle, Interview, Case Study)
• Content Calendar (6 months)
• Keyword Research & SEO Strategy
• Topics: Career Tips, Interview Prep, Pacific Jobs, Employer Guides
• Editorial Guidelines
• Image Sourcing & Licensing
• Internal Linking Strategy
• Call-to-Action Placements
• Social Sharing Graphics
• Email Newsletter Integration
• Performance Metrics`,
    },
    {
      id: 'infographics',
      name: 'Infographics & Data Visualizations',
      category: 'content',
      description: 'Professional infographics for sharing data and insights',
      file: 'ZALPHA_Infographics_2026.zip',
      size: '67.9 MB',
      pages: 1,
      version: '2.5',
      lastUpdated: 'January 28, 2026',
      status: 'active',
      featured: true,
      content: `Infographics include:
• "State of Pacific Islands Jobs Market 2026"
• "How ZALPHA Works" (Process Flow)
• "ADA Accessibility Features" (Comparison)
• "Student Success Stats" (Data Viz)
• "Employer ROI Calculator" (Interactive)
• "Skills in Demand Across Pacific" (Heat Map)
• "Job Search Timeline" (Vertical)
• Pacific Islands Demographics (Charts)
• File Formats: PNG, PDF, Editable (AI, Adobe XD)
• Optimized for Social Sharing
• Print & Digital Versions`,
    },
    {
      id: 'case-studies',
      name: 'Customer Success Case Studies',
      category: 'content',
      description: 'Detailed case studies showcasing platform success stories',
      file: 'ZALPHA_Case_Studies_2026.pdf',
      size: '18.4 MB',
      pages: 64,
      version: '2.0',
      lastUpdated: 'January 22, 2026',
      status: 'active',
      featured: true,
      content: `Case Studies include:
• 4 Student Success Stories (detailed)
• 3 Employer Success Stories (ROI-focused)
• 2 School Partnership Success Stories
• Template for Creating New Case Studies
• Format: Problem, Solution, Results
• Quantifiable Metrics & Results
• Quotes & Testimonials
• Before/After Comparisons
• Visual Design (branded layout)
• Multiple Formats: PDF, Web Page, One-Pager
• Usage Rights & Approvals`,
    },

    // Events & Trade Shows
    {
      id: 'event-booth',
      name: 'Trade Show & Event Booth Design',
      category: 'events',
      description: 'Complete booth design and materials for trade shows and job fairs',
      file: 'ZALPHA_Event_Booth_2026.pdf',
      size: '52.3 MB',
      pages: 24,
      version: '1.5',
      lastUpdated: 'January 18, 2026',
      status: 'active',
      featured: true,
      content: `Event Booth includes:
• 10x10 Booth Design (3D Renderings)
• Backdrop Banner (Popup & Retractable)
• Table Covers with Logo
• Promotional Materials Displays
• Brochure Racks & Business Card Holders
• iPad Kiosk for Platform Demos
• Giveaways: Branded Pens, Stickers, Tote Bags
• Staff T-Shirts & Badges
• Signage & Wayfinding
• Lead Capture Forms
• Post-Event Follow-up Templates
• Booth Staff Training Guide`,
    },
    {
      id: 'virtual-event',
      name: 'Virtual Job Fair & Event Materials',
      category: 'events',
      description: 'Digital materials for hosting and participating in virtual events',
      file: 'ZALPHA_Virtual_Events_2026.zip',
      size: '89.6 MB',
      pages: 1,
      version: '2.0',
      lastUpdated: 'January 25, 2026',
      status: 'active',
      featured: true,
      content: `Virtual Event Materials include:
• Virtual Booth Background Images
• Zoom/Teams Virtual Backgrounds
• Event Landing Page Templates
• Registration Form Templates
• Email Invitation Series
• Social Media Promotion Graphics
• Presentation Slides for Workshops
• Chat Bot Scripts for Q&A
• Video Ads for Event Promotion
• Post-Event Survey Templates
• Follow-up Email Sequences
• Sponsor/Partner Packages`,
    },

    // PR & Media
    {
      id: 'press-kit',
      name: 'Media & Press Kit',
      category: 'pr',
      description: 'Comprehensive press kit for media outreach and PR',
      file: 'ZALPHA_Press_Kit_2026.pdf',
      size: '31.7 MB',
      pages: 48,
      version: '2.5',
      lastUpdated: 'January 30, 2026',
      status: 'active',
      featured: true,
      content: `Press Kit includes:
• Company Fact Sheet
• Executive Bios & Headshots
• Product Screenshots (High-Res)
• Logo Package (All Formats)
• Press Release Templates (5 topics)
• Boilerplate Company Description
• Key Statistics & Metrics
• Media Contact Information
• Brand Story & Mission
• Awards & Recognition
• Partnership Announcements
• Crisis Communication Templates`,
    },
    {
      id: 'media-outreach',
      name: 'Media Outreach Templates',
      category: 'pr',
      description: 'Email templates and scripts for reaching out to media',
      file: 'ZALPHA_Media_Outreach_2026.pdf',
      size: '8.9 MB',
      pages: 32,
      version: '1.5',
      lastUpdated: 'January 20, 2026',
      status: 'active',
      featured: false,
      content: `Media Outreach includes:
• Initial Pitch Email Template
• Follow-up Email Sequences
• Press Release Distribution List
• Pacific Islands Media Contacts
• Interview Request Template
• Interview Prep Guides
• Q&A for Common Questions
• Spokesperson Training Guide
• Media Monitoring Setup
• Crisis Response Procedures
• Embargo Guidelines`,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Materials', count: documents.length },
    { id: 'brand', name: 'Brand Assets', count: documents.filter(d => d.category === 'brand').length },
    { id: 'print', name: 'Print Materials', count: documents.filter(d => d.category === 'print').length },
    { id: 'digital', name: 'Digital Assets', count: documents.filter(d => d.category === 'digital').length },
    { id: 'video', name: 'Video Assets', count: documents.filter(d => d.category === 'video').length },
    { id: 'campaigns', name: 'Campaign Kits', count: documents.filter(d => d.category === 'campaigns').length },
    { id: 'advertising', name: 'Advertising Creative', count: documents.filter(d => d.category === 'advertising').length },
    { id: 'content', name: 'Content Marketing', count: documents.filter(d => d.category === 'content').length },
    { id: 'events', name: 'Events & Trade Shows', count: documents.filter(d => d.category === 'events').length },
    { id: 'pr', name: 'PR & Media', count: documents.filter(d => d.category === 'pr').length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc: typeof documents[0]) => {
    generatePDF(doc, {
      repositoryName: 'Marketing Materials Repository',
      headerColor: [219, 39, 119], // Pink
      accentColor: [190, 24, 93]
    });
  };

  const handleView = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      brand: 'from-purple-500 to-pink-600',
      print: 'from-blue-500 to-indigo-600',
      digital: 'from-cyan-500 to-blue-600',
      video: 'from-red-500 to-pink-600',
      campaigns: 'from-green-500 to-emerald-600',
      advertising: 'from-yellow-500 to-orange-600',
      content: 'from-indigo-500 to-purple-600',
      events: 'from-teal-500 to-cyan-600',
      pr: 'from-orange-500 to-red-600',
    };
    return colors[category] || 'from-gray-500 to-slate-600';
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon: any }> = {
      brand: { bg: 'bg-purple-500/20', text: 'text-purple-300', label: 'Brand', icon: TrendingUp },
      print: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Print', icon: FileText },
      digital: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'Digital', icon: FileText },
      video: { bg: 'bg-red-500/20', text: 'text-red-300', label: 'Video', icon: FileText },
      campaigns: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Campaign', icon: FileText },
      advertising: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: 'Advertising', icon: FileText },
      content: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', label: 'Content', icon: FileText },
      events: { bg: 'bg-teal-500/20', text: 'text-teal-300', label: 'Events', icon: FileText },
      pr: { bg: 'bg-orange-500/20', text: 'text-orange-300', label: 'PR & Media', icon: FileText },
    };
    return badges[category] || { bg: 'bg-gray-500/20', text: 'text-gray-300', label: 'Other', icon: FileText };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton onNavigate={onNavigate} destination="internal-dashboard" variant="light" />
          <div className="flex items-center gap-6 mt-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border-4 border-white/40 shadow-2xl">
              <Megaphone className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Marketing Materials Repository</h1>
              <p className="text-xl text-white/90">
                {documents.length} Marketing Assets • Brand, Print, Digital, Video & More
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search marketing materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-all appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-gray-900">
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-pink-500/20 border-2 border-pink-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-pink-300 mb-1">{documents.length}</div>
              <div className="text-sm text-pink-200">Total Materials</div>
            </div>
            <div className="bg-purple-500/20 border-2 border-purple-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-300 mb-1">{documents.filter(d => d.featured).length}</div>
              <div className="text-sm text-purple-200">Featured</div>
            </div>
            <div className="bg-indigo-500/20 border-2 border-indigo-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-indigo-300 mb-1">{categories.length - 1}</div>
              <div className="text-sm text-indigo-200">Categories</div>
            </div>
            <div className="bg-cyan-500/20 border-2 border-cyan-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-cyan-300 mb-1">{filteredDocuments.length}</div>
              <div className="text-sm text-cyan-200">Filtered Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMOTIONAL LOGO DOWNLOAD SECTION */}
      <div className="py-8 px-6 bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-purple-900/30 border-y-2 border-cyan-400/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border-4 border-cyan-400/50 p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-black text-sm px-4 py-2 rounded-full mb-4">
                ⭐ PROMOTIONAL MATERIALS ⭐
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Official ZALPHA Logo for Marketing & Outreach
              </h2>
              <p className="text-xl text-cyan-200">
                Download high-resolution logo for promotional items, event materials, and partner marketing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Logo Preview - Full Promotional Logo */}
              <div className="space-y-6">
                <div className="bg-white/90 rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-cyan-500 zalpha-logo-download">
                  <ZalphaBrainLogo className="w-full h-auto max-w-md" />
                  <p className="text-center text-sm text-gray-600 mt-4 font-semibold">Full Promotional Logo</p>
                </div>
                
                <div className="bg-white/90 rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-purple-500 zalpha-icon-download">
                  <Logo className="w-32 h-32" />
                  <p className="text-center text-sm text-gray-600 mt-4 font-semibold">Icon Logo (App/Social)</p>
                </div>
              </div>

              {/* Download Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <Download className="w-6 h-6" />
                    Included in Download:
                  </h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 text-xl">✓</span>
                      <span><strong>Logo Image:</strong> High-res PNG with QR code, graduation cap, briefcase, book, and laptop icons</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 text-xl">✓</span>
                      <span><strong>Text Elements:</strong> "ZALPHA" in gradient cyan + "FRESH TALENT.FUTURE LEADERS" + "zalpharecruit.com"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 text-xl">✓</span>
                      <span><strong>Perfect For:</strong> T-shirts, banners, flyers, booth displays, promotional items, partner materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 text-xl">✓</span>
                      <span><strong>Print Quality:</strong> 4K resolution, transparent background available</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/40 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-3">Usage Guidelines</h3>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li>• Maintain aspect ratio when resizing</li>
                    <li>• Do not modify logo elements or colors</li>
                    <li>• Ensure minimum clear space around logo</li>
                    <li>• For questions: <a href="mailto:marketing@zalpharecruit.com" className="text-pink-400 underline">marketing@zalpharecruit.com</a></li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    // Helper function to convert SVG to PNG
                    const convertSVGtoPNG = (svgElement: Element, filename: string, size: number = 2048) => {
                      const svgData = new XMLSerializer().serializeToString(svgElement);
                      const canvas = document.createElement('canvas');
                      canvas.width = size;
                      canvas.height = size;
                      const ctx = canvas.getContext('2d');
                      
                      if (ctx) {
                        // White background for social media
                        ctx.fillStyle = 'white';
                        ctx.fillRect(0, 0, size, size);
                        
                        const img = new Image();
                        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        
                        img.onload = () => {
                          ctx.drawImage(img, 0, 0, size, size);
                          canvas.toBlob((pngBlob) => {
                            if (pngBlob) {
                              const pngUrl = URL.createObjectURL(pngBlob);
                              const link = document.createElement('a');
                              link.href = pngUrl;
                              link.download = filename;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              URL.revokeObjectURL(pngUrl);
                            }
                          }, 'image/png');
                          URL.revokeObjectURL(url);
                        };
                        img.src = url;
                      }
                    };
                    
                    // Download Full Promotional Logo (PNG)
                    const fullLogoSVG = document.querySelector('.zalpha-logo-download svg');
                    if (fullLogoSVG) {
                      convertSVGtoPNG(fullLogoSVG, 'ZALPHA_Full_Logo_4K_2026.png', 3840);
                    }
                    
                    // Download Icon Logo (PNG)
                    setTimeout(() => {
                      const iconLogoSVG = document.querySelector('.zalpha-icon-download svg');
                      if (iconLogoSVG) {
                        convertSVGtoPNG(iconLogoSVG, 'ZALPHA_Icon_Logo_2026.png', 1024);
                      }
                    }, 500);
                    
                    // Also download SVG versions
                    setTimeout(() => {
                      if (fullLogoSVG) {
                        const svgData = new XMLSerializer().serializeToString(fullLogoSVG);
                        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                        const url = URL.createObjectURL(svgBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'ZALPHA_Full_Logo_Vector_2026.svg';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                      }
                    }, 1000);
                  }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-xl rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 border-4 border-white/30"
                >
                  <Download className="w-7 h-7" />
                  Download Promotional Logo Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-20">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Materials Found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map((doc) => {
                const badge = getCategoryBadge(doc.category);
                const isExpanded = expandedDoc === doc.id;
                const CategoryIcon = badge.icon;

                return (
                  <div
                    key={doc.id}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-pink-400/50 transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <CategoryIcon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                              {doc.featured && (
                                <span className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <p className="text-white/70 mb-3">{doc.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                              <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-lg font-semibold flex items-center gap-1`}>
                                <CategoryIcon className="w-3 h-3" />
                                {badge.label}
                              </span>
                              {doc.pages > 1 && (
                                <span className="flex items-center gap-1">
                                  <FileCheck className="w-4 h-4" />
                                  {doc.pages} pages
                                </span>
                              )}
                              <span>{doc.size}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {doc.lastUpdated}
                              </span>
                              <span className="text-pink-400 font-semibold">v{doc.version}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 flex-shrink-0">
                          <button
                            onClick={() => handleView(doc.id)}
                            className="px-4 py-2 bg-purple-500/20 border-2 border-purple-400/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all flex items-center gap-2 font-semibold"
                          >
                            <Eye className="w-4 h-4" />
                            {isExpanded ? 'Hide' : 'View'}
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="px-4 py-2 bg-pink-500/20 border-2 border-pink-400/30 text-pink-300 rounded-xl hover:bg-pink-500/30 transition-all flex items-center gap-2 font-semibold"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="text-lg font-bold text-white mb-3">Contents:</h4>
                          <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                            <pre className="text-white/80 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                              {doc.content}
                            </pre>
                          </div>
                          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4 text-pink-400" />
                              <span className="text-pink-300">Internal Marketing Use</span>
                            </div>
                            <span>•</span>
                            <span>Status: <span className="text-pink-400 font-semibold uppercase">{doc.status}</span></span>
                            <span>•</span>
                            <span>File: {doc.file}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredDocuments.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-2 border-pink-400/30 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Download All Marketing Materials</h3>
                <p className="text-white/70 mb-6">
                  Get the complete marketing package ({documents.length} files, ready to use)
                </p>
                <button
                  onClick={() => {
                    documents.forEach(doc => setTimeout(() => handleDownload(doc), 100));
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download Complete Marketing Package
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 bg-purple-500/10 border-2 border-purple-400/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Megaphone className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-purple-300 mb-2">Marketing Materials Notice</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  These marketing materials are for internal and authorized partner use only. All assets must follow
                  brand guidelines. For custom requests or questions, contact: <a href="mailto:marketing@zalpharecruit.com" className="text-pink-400 hover:text-pink-300 underline">marketing@zalpharecruit.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}