# 🌊 ZALPHA - Pacific Job Connection Platform

> Connecting college students and high school graduates across Pacific Islands with quality employment opportunities

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/zalpha-platform)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC.svg)](https://tailwindcss.com/)

---

## 🌴 About ZALPHA

ZALPHA is a comprehensive job connection platform designed specifically for college students and high school graduates across the Pacific Islands region, including:

- 🏝️ CNMI (Commonwealth of the Northern Mariana Islands)
- 🏝️ FSM (Federated States of Micronesia)
- 🏝️ Guam
- 🏝️ Hawaii
- 🏝️ American Samoa
- 🏝️ Palau

### Key Features

- ✅ **100% White-Labeled Platform**
- ✅ **Gamified Skills Assessments**
- ✅ **AI Chatbot "Zee"** - Intelligent career guidance
- ✅ **Tiered Employer Subscriptions**
- ✅ **Virtual Job & College Fairs**
- ✅ **Contract Job Pricing**
- ✅ **Government Loan Application Documentation**
- ✅ **FERPA Compliance** (18+ age requirement)
- ✅ **6-Month Premium Beta Testing Program**

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/zalpha-platform.git

# Navigate to project directory
cd zalpha-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Create production build
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📁 Project Structure

```
zalpha-platform/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   └── App.tsx            # Main app component
│   ├── styles/
│   │   ├── fonts.css          # Custom fonts
│   │   ├── tailwind.css       # Tailwind configuration
│   │   └── theme.css          # Theme variables
│   ├── imports/               # Figma imports & assets
│   └── main.tsx               # App entry point
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icon.svg               # App icon
├── supabase/                  # Supabase backend (optional)
├── vite.config.ts             # Vite configuration
├── package.json               # Dependencies & scripts
├── vercel.json                # Vercel deployment config
└── tsconfig.json              # TypeScript configuration
```

---

## 🎨 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.7.3** - Type safety
- **Vite 6.3.5** - Build tool & dev server
- **Tailwind CSS 4.1.12** - Utility-first CSS

### UI Components
- **Radix UI** - Accessible component primitives
- **Material UI** - Enterprise-grade components
- **Lucide React** - Beautiful icons
- **Motion** - Smooth animations

### Forms & Validation
- **React Hook Form** - Form management
- **React Day Picker** - Date selection

### Data Visualization
- **Recharts** - Beautiful charts & graphs
- **Three.js** - 3D visualizations

### Backend (Optional)
- **Supabase** - Database, auth, storage
- **Plaid** - Financial integration
- **D-ID** - AI avatar integration

---

## 🔐 Authentication & Access

### Beta Testing Access

The platform is currently in **beta testing** mode:

- 🔒 Password: `ZALPHA2026`
- 📧 Contact: contact@kiexgroup.com

### Public Pages (No Password Required)
- Landing Page
- App Overview
- Beta Tester Application Forms

### Protected Pages (Password Required)
- Beta User Demo
- All Dashboards (Student, Employer, School)
- Platform Features
- Admin Tools

---

## 📱 Mobile Compatibility

ZALPHA is **fully optimized** for mobile devices:

### Supported Devices
- ✅ iPhone (15, 14, 13, 12, 11, X, SE, 8)
- ✅ Samsung Galaxy (S24, S23, S22, S21, Note series)
- ✅ Google Pixel (8, 7, 6 series)
- ✅ OnePlus, Xiaomi, Motorola, OPPO, Vivo
- ✅ iPads and Android tablets

### Mobile Features
- ✅ Responsive design (320px - 2000px+)
- ✅ Touch-optimized UI (44px minimum tap targets)
- ✅ PWA support (Add to Home Screen)
- ✅ Offline capabilities
- ✅ Safe area support (notches, Dynamic Island)
- ✅ Browser back/forward navigation
- ✅ Virtual keyboard handling

See [MOBILE_COMPATIBILITY.md](./MOBILE_COMPATIBILITY.md) for detailed specifications.

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/zalpha-platform)

1. Push your code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Vite configuration
4. Click "Deploy"

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

### Manual Deployment

```bash
# Build the project
pnpm build

# The dist/ folder contains production-ready files
# Upload to any static hosting service
```

---

## ⚙️ Configuration

### Build Optimization

The project includes advanced build optimization:

- ✅ Chunk size limit: 1500kb
- ✅ Manual chunk splitting for vendor libraries
- ✅ Console.log removal in production
- ✅ Terser minification
- ✅ ES2020 target for modern browsers

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your_api_url_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

**Note**: All Vite environment variables must be prefixed with `VITE_`

---

## 🧪 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Lint code (if configured)
pnpm lint
```

### Development Server

- Local: http://localhost:5173
- Network: http://YOUR_IP:5173 (for mobile testing)

---

## 🎯 Platform Features

### For Students
- 📝 Free account creation
- 🎮 Gamified skills assessments
- 💼 Job search & applications
- 🎓 College fair access
- 📊 Progress tracking
- 🤖 AI career guidance (Zee chatbot)
- 🔒 Full control over visibility to employers

### For Employers
- 💳 Tiered subscription plans
- 👥 Multi-seat team access
- 📋 Job posting & management
- 👨‍💼 Candidate screening
- 📊 Analytics & reporting
- 🎪 Virtual job fair participation
- ✅ Verified talent pool

### For Schools/Career Services
- 🏫 Institution partnerships
- 📈 Student placement tracking
- 💰 Revenue sharing program
- 📊 Detailed analytics
- 🎯 Alumni network support

---

## 🔒 Privacy & Compliance

- ✅ **FERPA Compliant** - Educational records protection
- ✅ **18+ Age Requirement** - Legal compliance
- ✅ **Student Data Control** - Students own their data
- ✅ **On-Platform Interactions** - Protected revenue model
- ✅ **Offer Tracking** - All offers must go through platform

---

## 🌊 Design System

### Ocean Professional Color Scheme

The platform uses a cohesive ocean-themed color palette:

- **Primary**: Cyan (#06b6d4) - Ocean Professional
- **Secondary**: Blue (#3b82f6)
- **Accent**: Teal (#14b8a6)
- **Background**: Slate (#0f172a)

### Typography

- **Headings**: System font stack
- **Body**: Clean, readable sans-serif
- **Responsive**: Fluid typography (clamp)

---

## 📊 Performance

### Build Output (Optimized)

```
dist/
├── index.html (2.5 KB)
├── assets/
│   ├── index-[hash].js         (~150 KB gzipped)
│   ├── vendor-react-[hash].js  (~130 KB gzipped)
│   ├── vendor-radix-[hash].js  (~180 KB gzipped)
│   ├── vendor-mui-[hash].js    (~250 KB gzipped)
│   └── vendor-*-[hash].js      (various sizes)
└── Total: ~2-3 MB gzipped
```

### Performance Targets

- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3.0s
- ✅ Lighthouse Score: 90+

---

## 🤝 Contributing

This is a private beta platform. For access or inquiries:

📧 **Email**: contact@kiexgroup.com

---

## 📝 License

Proprietary - KIEX Group  
All rights reserved.

---

## 🆘 Support

### Beta Testing Support

- 📧 Email: contact@kiexgroup.com
- 🔑 Beta Password: `ZALPHA2026`

### Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Mobile Compatibility](./MOBILE_COMPATIBILITY.md)

### Known Issues

Currently in beta testing. Report issues to: contact@kiexgroup.com

---

## 🎉 Acknowledgments

Built with ❤️ for the Pacific Islands community

### Technologies Used

- React, TypeScript, Vite, Tailwind CSS
- Radix UI, Material UI, Lucide Icons
- Supabase, Plaid, D-ID
- Motion, Recharts, Three.js

---

## 📅 Version History

### 1.0.0 - Beta Launch (February 2026)
- ✅ Full platform functionality
- ✅ Password protection for beta access
- ✅ Mobile optimization (all devices)
- ✅ Browser navigation support
- ✅ Production-ready Vercel deployment
- ✅ Comprehensive beta testing program

---

**Made with 🌊 for Pacific Islands Job Seekers**

---

## 🔗 Quick Links

- [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/zalpha-platform)
- [View Demo](https://youtu.be/lcI_g3_PfF4) (YouTube)
- [Contact Support](mailto:contact@kiexgroup.com)
- [Request Beta Access](mailto:contact@kiexgroup.com?subject=ZALPHA%20Beta%20Access%20Request)
