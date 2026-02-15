# ZALPHA Platform - Tech Stack Configuration

## 🎯 **MANDATORY SPECIFICATIONS**

### **Node.js Version**
```json
"engines": {
  "node": "24.x"
}
```
✅ **CRITICAL:** Always ensure Node.js is set to **24.x** in `package.json`

---

## 📦 **Core Technology Stack**

### **Build Tool & Framework**
- **Vite:** `6.3.5` (6.x) - Lightning-fast build tool
- **React:** `18.3.1` (18.x) - UI library
- **TypeScript:** `5.7.3` (5.x) - Type safety
- **Vite Plugin React:** `4.7.0`

### **Styling & UI**
- **Tailwind CSS:** `4.1.12` (v4) - Utility-first CSS
- **@tailwindcss/vite:** `4.1.12` - Tailwind v4 Vite plugin
- **Material UI (MUI):** `7.3.5` - Material Design components
  - `@mui/material`
  - `@mui/icons-material`
  - `@emotion/react` - Required peer dependency
  - `@emotion/styled` - Required peer dependency
- **Radix UI:** Extensive collection of primitives
  - All `@radix-ui/react-*` components (accordion, dialog, dropdown, etc.)
- **Lucide React:** `0.487.0` - Icon library

### **Animation**
- **Motion (Framer Motion):** `12.23.24` - Animation library
  - Import from `motion/react` (NOT `framer-motion`)

### **Utility Libraries**
- **clsx:** `2.1.1` - Conditional classNames
- **tailwind-merge:** `3.2.0` - Merge Tailwind classes
- **class-variance-authority:** `0.7.1` - Component variants

---

## 🎨 **ZALPHA Design System**

### **Color Palette**

#### **Primary Colors (Pacific Blue/Teal)**
```css
--primary: rgba(8, 145, 178, 1);           /* #0891b2 - Cyan-600 */
--ocean-cyan: #06b6d4;                      /* Cyan-500 */
--ring: rgba(6, 182, 212, 1);              /* Focus ring */
```

#### **Secondary Colors (Sunset/Pacific)**
```css
--sunset-orange: #f97316;                   /* Orange-500 */
--sunset-coral: #fb923c;                    /* Orange-400 */
--sunset-pink: #f472b6;                     /* Pink-400 */
--sunset-peach: #fdba74;                    /* Orange-300 */
```

#### **Gradients**
```css
/* Hero/CTA Gradients */
from-slate-900 via-blue-900 to-slate-900
from-cyan-500 to-blue-500
from-blue-600 to-cyan-600

/* Card Backgrounds */
from-blue-50 to-cyan-50
from-green-50 to-emerald-50
from-purple-50 to-pink-50
from-orange-50 to-amber-50
```

#### **Neutral Colors**
```css
--background: #fef9f6;                      /* Warm white */
--foreground: #1a1d29;                      /* Dark slate */
--card: #ffffff;                            /* Pure white */
--muted: rgba(241, 245, 249, 1);           /* Slate-100 */
```

### **Typography**
- **Font Size:** `16px` base
- **Font Weight:**
  - Normal: `400`
  - Medium: `500`
  - Semibold: `600`
  - Bold: `700`
  - Black: `900`

### **Spacing & Layout**
- **Border Radius:** `0.75rem` (12px)
- **Mobile-First:** 390x844 primary viewport
- **Responsive Breakpoints:**
  - `sm:` 640px
  - `md:` 768px
  - `lg:` 1024px
  - `xl:` 1280px

### **Component Patterns**

#### **Buttons**
```tsx
// Primary CTA
className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold hover:scale-105"

// Secondary
className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold"

// Admin Action
className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white font-semibold"
```

#### **Cards**
```tsx
// Feature Card
className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"

// Admin Card (Radix)
<Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all">
```

#### **Badges**
```tsx
<Badge className="bg-orange-100 text-orange-700 border-orange-300">
  <Sparkles className="w-3 h-3 mr-1 inline" />
  Active
</Badge>
```

#### **Stats Panels**
```tsx
<div className="text-2xl font-black text-cyan-600 mb-1">127</div>
<div className="text-xs text-slate-600">Label</div>
```

---

## 📂 **Project Structure**

```
zalpha-platform/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components
│   │   │   ├── ui/              # Radix UI primitives (shadcn-style)
│   │   │   ├── TollaiBot.tsx    # AI chatbot
│   │   │   ├── BetaProgramSection.tsx
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Landing.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── ...
│   │   └── App.tsx              # Main app entry
│   ├── styles/
│   │   ├── theme.css            # Tailwind v4 theme + CSS variables
│   │   ├── fonts.css            # Font imports
│   │   └── index.css            # Global styles
│   └── main.tsx                 # React entry point
├── public/                      # Static assets
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── TECH_STACK.md               # This file
```

---

## 🔧 **Vite Configuration**

### **Plugins**
```ts
plugins: [
  react(),           // React Fast Refresh
  tailwindcss(),     // Tailwind v4 integration
]
```

### **Path Alias**
```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### **Bundle Optimization**
```ts
build: {
  chunkSizeWarningLimit: 1500,
  manualChunks: {
    'vendor-react': ['react', 'react-dom'],
    'vendor-radix': ['@radix-ui/react-*'],
    'vendor-mui': ['@mui/material', '@mui/icons-material'],
    // ... (see vite.config.ts for full list)
  },
  minify: 'esbuild',
  target: 'es2020',
}
```

---

## 📚 **Key Libraries**

### **Forms & Validation**
- **react-hook-form:** `7.55.0` - Form state management
- **react-day-picker:** `8.10.1` - Date picker
- **date-fns:** `3.6.0` - Date utilities

### **Charts & Visualization**
- **recharts:** `2.15.2` - Charts
- **three:** `0.182.0` - 3D graphics
- **@react-three/fiber:** `9.5.0` - React renderer for Three.js
- **@react-three/drei:** `10.7.7` - Three.js helpers

### **Interactions**
- **react-dnd:** `16.0.1` - Drag and drop
- **react-slick:** `0.31.0` - Carousels
- **embla-carousel-react:** `8.6.0` - Modern carousel
- **react-resizable-panels:** `2.1.7` - Resizable layouts

### **Integrations**
- **@d-id/client-sdk:** `1.1.48` - D-ID AI video
- **react-plaid-link:** `4.1.1` - Plaid identity verification
- **jspdf:** `4.0.0` - PDF generation
- **react-qr-code:** `2.0.18` - QR code generation

### **UI Utilities**
- **sonner:** `2.0.3` - Toast notifications
- **cmdk:** `1.1.1` - Command palette
- **vaul:** `1.1.2` - Drawer component
- **next-themes:** `0.4.6` - Theme switching

---

## 🚀 **Development Commands**

```bash
# Development server (localhost:5173)
npm run dev
# or
pnpm dev

# Production build
npm run build

# Preview production build (localhost:4173)
npm run preview

# Lint code
npm run lint
```

---

## ✅ **Development Guidelines**

### **1. Always Use Node 24.x**
```bash
# Verify Node version
node --version  # Should show v24.x.x
```

### **2. Component Structure**
```tsx
// Use TypeScript for all components
interface ComponentProps {
  onNavigate: (page: string) => void;
}

export function Component({ onNavigate }: ComponentProps) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

### **3. Styling Best Practices**
```tsx
// ✅ Use Tailwind utility classes
<div className="flex items-center gap-4 bg-blue-50 rounded-xl p-6">

// ✅ Use ZALPHA design tokens
<div className="bg-gradient-to-r from-cyan-500 to-blue-500">

// ✅ Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// ❌ Avoid inline styles (unless necessary)
<div style={{ color: 'blue' }}>
```

### **4. Icon Usage**
```tsx
// Lucide React icons
import { Users, Star, ArrowRight } from 'lucide-react';

<Users className="w-5 h-5 text-blue-600" />

// Emoji for visual appeal
<div className="text-4xl mb-4">💼</div>
```

### **5. Animation**
```tsx
// Use Motion (from 'motion/react')
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### **6. Radix UI Components**
```tsx
// Use shadcn-style UI components from @/app/components/ui/
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
```

---

## 🎨 **ZALPHA Brand Identity**

### **Core Values**
- 🌊 **Pacific-first:** Built by islanders, for islanders
- 🚀 **Youth-focused:** Gen Z & Alpha Gen design language
- 📱 **Mobile-native:** 390x844 primary viewport
- ♿ **Accessible:** WCAG 2.1 AA compliant
- 🎯 **Data-driven:** Analytics and metrics-focused

### **Visual Language**
- **Colors:** Ocean blues, sunset oranges, tropical gradients
- **Typography:** Bold headlines, clear hierarchy
- **Spacing:** Generous whitespace, card-based layouts
- **Interactions:** Smooth animations, hover effects
- **Icons:** Mix of Lucide icons and emoji for personality

### **Tone & Voice**
- **Professional** yet **approachable**
- **Empowering** and **supportive**
- **Data-informed** with **human touch**
- **Regional pride** (CNMI, Guam, Hawaii, Palau, FSM, Marshall Islands)

---

## 📝 **Version History**

### **Current (v1.0.0)**
- ✅ Node.js: **24.x**
- ✅ Vite: **6.3.5**
- ✅ React: **18.3.1**
- ✅ TypeScript: **5.7.3**
- ✅ Tailwind CSS: **4.1.12**
- ✅ Material UI: **7.3.5**
- ✅ Radix UI: **Latest** (all primitives)
- ✅ Motion: **12.23.24**

---

## 🔗 **Useful Links**

- [Vite Documentation](https://vite.dev/)
- [React 18 Docs](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Motion (Framer Motion)](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## ⚠️ **Important Notes**

1. **Node Version:** MUST be 24.x - update package.json if changed
2. **Tailwind v4:** Uses `@theme` directive in CSS, not `tailwind.config.js`
3. **Motion Import:** Use `import { motion } from 'motion/react'` NOT `framer-motion`
4. **Path Alias:** Use `@/` for imports from `src/` directory
5. **React Hook Form:** Version 7.55.0 is required (peer dependency compatibility)
6. **MUI Peer Dependencies:** Always install `@emotion/react` and `@emotion/styled`

---

## 🎯 **Next Steps for New Features**

When building new components:
1. ✅ Check Node.js is 24.x
2. ✅ Use TypeScript with proper interfaces
3. ✅ Follow ZALPHA design system (blue/teal gradients)
4. ✅ Ensure mobile-first responsive (390x844)
5. ✅ Use Radix UI primitives for complex interactions
6. ✅ Add Motion animations for polish
7. ✅ Test accessibility (keyboard nav, screen readers)
8. ✅ Optimize bundle size (check build output)

---

**Last Updated:** February 15, 2026
**Maintained by:** ZALPHA Platform Team
