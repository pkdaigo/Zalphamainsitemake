# ZALPHA Hero Section - Implementation Guide
## Quick Start for Engineering Team

---

## 🚀 **What's Included**

1. **Design Specification** (`ZALPHA_HERO_DESIGN_SPEC.md`)
   - Complete visual design system
   - Animation timeline (10 seconds)
   - Component specifications
   - Color palette, typography, spacing
   - Responsive breakpoints
   - Figma frame structure

2. **React Component** (`ZALPHAHeroSection.tsx`)
   - Full implementation with React Three Fiber
   - 5-stage animation sequence
   - 6 regional orbs with labels
   - Connecting lines
   - Interactive hover states
   - Production-ready code

---

## 📋 **Animation Sequence Summary**

```
0-2s:   Globe appears in space (fade in + rotation)
2-6s:   Rotate & zoom to Western Pacific
6-8s:   Flatten 3D globe into 2D map
8-10s:  Orbs animate out one by one (0.3s apart)
9-10s:  Connecting lines draw between orbs
10s+:   Idle state (subtle pulse, interactive)
```

---

## 🎨 **Key Visual Elements**

### **Headline**
"Orchestrating Pacific talent, one region at a time"

### **Subtext**
"ZALPHA connects students seeking work-based learning with employers across the Pacific..."

### **Buttons**
- Primary: "Get Started" (gradient blue-purple)
- Secondary: "Watch Demo" (outline)

### **Orbs (6 regions)**
1. 🇲🇵 CNMI - "Saipan Hub" - "Local talent"
2. 🇬🇺 Guam - "Regional Center" - "Regional employers"
3. 🇵🇼 Palau - "Island Network" - "Government partners"
4. 🇫🇲 FSM - "Micronesia Hub" - "Educational institutions"
5. 🇲🇭 Marshall Islands - "Pacific Gateway" - "Career services"
6. 🇵🇭 Philippines - "APAC Connector" - "Remote opportunities"

---

## 🔧 **Usage**

### **Basic Integration**

```tsx
import { ZALPHAHeroSection } from '@/app/components/ZALPHAHeroSection';

function LandingPage() {
  return (
    <div>
      <ZALPHAHeroSection
        onGetStarted={() => navigate('/signup')}
        onWatchDemo={() => openVideoModal()}
      />
      {/* Rest of landing page */}
    </div>
  );
}
```

### **With Analytics**

```tsx
<ZALPHAHeroSection
  onGetStarted={() => {
    analytics.track('hero_cta_clicked', { button: 'get_started' });
    navigate('/signup');
  }}
  onWatchDemo={() => {
    analytics.track('hero_cta_clicked', { button: 'watch_demo' });
    openVideoModal();
  }}
/>
```

---

## 📱 **Responsive Behavior**

### **Desktop (1440px+)**
- Full 10-second animation
- Side-by-side layout (40% content, 60% globe)
- Interactive hover states on orbs
- Smooth camera movements

### **Tablet (768px - 1439px)**
- Full animation (slightly smaller globe)
- Side-by-side layout (45% content, 55% globe)
- All features enabled

### **Mobile (< 768px)**
- **Simplified animation** (5 seconds)
- Stacked layout (content top, globe bottom)
- Skip flatten stage (globe → orbs directly)
- Reduced particle count (1500 stars vs 3000)
- Smaller orbs and labels

---

## 🎨 **Customization Options**

### **Change Colors**

```tsx
// In regions array, modify color property
{
  id: 'cnmi',
  color: '#your-color', // Change this
  // ... rest
}
```

### **Adjust Animation Speed**

```tsx
// In AnimatedGlobe component
const newProgress = Math.min(progress + delta * 0.5, 1);
//                                             ^^^^
//                                          Speed multiplier
//                                          Lower = slower, higher = faster
```

### **Add More Regions**

```tsx
// Add to regions array
const regions: Region[] = [
  // ... existing regions
  {
    id: 'new-region',
    name: 'New Region',
    flag: '🏴',
    position: [0.2, -0.3, 0.1], // x, y, z coordinates
    color: '#hexcolor',
    label: 'Region Label',
    caption: 'Short description',
    stats: { students: 0, coops: 0, employers: 0 },
  },
];
```

### **Disable Animation (Static Mode)**

```tsx
function StaticHero() {
  return (
    <div className="hero-container">
      {/* Show final state immediately */}
      <Scene initialStage="idle" />
    </div>
  );
}
```

---

## 🐛 **Troubleshooting**

### **Issue: Animation stutters**
**Solution**: Reduce particle count or polygon count

```tsx
// In Stars component
<Stars radius={100} depth={50} count={1500} /> 
//                                    ^^^^ Lower number

// In Sphere components
<Sphere args={[1, 32, 32]} />
//              ^^ ^^ Lower segments (e.g., 32 instead of 64)
```

### **Issue: Labels appear too early**
**Solution**: Adjust delay timing

```tsx
<AnimatedOrb
  delay={idx * 0.5} // Increase spacing (0.3 → 0.5)
  // ...
/>
```

### **Issue: Colors look different**
**Solution**: Check oklch vs RGB

```tsx
// Use RGB instead of oklch for consistent colors
color: 'rgb(168, 85, 247)' // Instead of '#a855f7'
```

### **Issue: Globe doesn't appear**
**Solution**: Check Canvas size

```tsx
<Canvas
  style={{ width: '100%', height: '100%' }} // Ensure parent has height
  // ...
/>
```

---

## ⚡ **Performance Tips**

### **1. Lazy Load Three.js**

```tsx
const HeroSection = lazy(() => 
  import('@/app/components/ZALPHAHeroSection')
);

<Suspense fallback={<HeroSkeleton />}>
  <HeroSection />
</Suspense>
```

### **2. Reduce Geometry Complexity**

```tsx
// Mobile
const segments = isMobile ? 32 : 64;
<Sphere args={[1, segments, segments]} />
```

### **3. Limit Star Count**

```tsx
const starCount = isMobile ? 1500 : 3000;
<Stars count={starCount} />
```

### **4. Disable Shadows**

```tsx
// Don't enable shadows in Canvas
<Canvas shadows={false}> // Explicit false
```

### **5. Use Object Pooling**

```tsx
// Reuse geometries and materials
const geometry = useMemo(() => 
  new THREE.SphereGeometry(1, 64, 64), 
  []
);
```

---

## 🎬 **Animation Timing Reference**

```typescript
const TIMELINE = {
  APPEAR: { start: 0, end: 2 },
  ROTATE: { start: 2, end: 6 },
  FLATTEN: { start: 6, end: 8 },
  ORBS: {
    cnmi: 8.0,
    guam: 8.3,
    palau: 8.6,
    fsm: 8.9,
    marshall: 9.2,
    philippines: 9.5,
  },
  LINES: { start: 9.8, end: 10 },
  IDLE: { start: 10, loop: true },
};
```

---

## 🎨 **Color Tokens**

```css
/* Background */
--hero-bg: #0a1628;
--hero-gradient: radial-gradient(circle at 60% 40%, rgba(6, 182, 212, 0.15) 0%, transparent 60%);

/* Text */
--hero-headline: #ffffff;
--hero-subtext: #cbd5e1;
--hero-accent: linear-gradient(135deg, rgb(59 130 246), rgb(168 85 247));

/* Buttons */
--btn-primary-bg: linear-gradient(135deg, rgb(59 130 246), rgb(139 92 246));
--btn-primary-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
--btn-secondary-border: rgba(255, 255, 255, 0.2);

/* Orbs */
--orb-cnmi: #a855f7;      /* Purple */
--orb-guam: #06b6d4;      /* Cyan */
--orb-palau: #10b981;     /* Emerald */
--orb-fsm: #3b82f6;       /* Blue */
--orb-marshall: #ec4899;  /* Pink */
--orb-philippines: #f59e0b; /* Amber */

/* Lines */
--line-color: #06b6d4;
--line-opacity: 0.3;
```

---

## 📊 **A/B Testing Variants**

### **Variant A: Full Animation (Current)**
- 10-second sequence
- All stages included
- Best for engagement

### **Variant B: Fast Animation**
- 5-second sequence
- Skip flatten stage
- Faster time-to-interactive

### **Variant C: Static with Fade-in**
- No animation
- Orbs fade in together
- Best for performance-sensitive users

### **Implementation**

```tsx
const variant = getABTestVariant(); // 'A', 'B', or 'C'

{variant === 'A' && <FullAnimationHero />}
{variant === 'B' && <FastAnimationHero />}
{variant === 'C' && <StaticHero />}
```

---

## 🔍 **Accessibility**

### **Prefers Reduced Motion**

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

{prefersReducedMotion ? (
  <StaticHero />
) : (
  <AnimatedHero />
)}
```

### **Keyboard Navigation**

```tsx
<div 
  role="region" 
  aria-label="Pacific workforce network visualization"
  tabIndex={0}
>
  {/* Hero content */}
</div>
```

### **Screen Reader Support**

```tsx
<div aria-live="polite" className="sr-only">
  {stage === 'appear' && 'Globe appearing'}
  {stage === 'rotating' && 'Zooming to Western Pacific'}
  {stage === 'orbs' && 'Showing regional connections'}
</div>
```

---

## 📈 **Analytics Events**

Track these events for insights:

```typescript
analytics.track('hero_animation_started');
analytics.track('hero_animation_completed');
analytics.track('hero_orb_clicked', { region: 'cnmi' });
analytics.track('hero_cta_clicked', { button: 'get_started' });
analytics.track('hero_demo_clicked');
```

---

## 🚢 **Deployment Checklist**

- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on iOS Safari, Android Chrome
- [ ] Verify animation plays smoothly (60fps)
- [ ] Check mobile responsive behavior
- [ ] Test with slow 3G connection
- [ ] Verify prefers-reduced-motion works
- [ ] Check color contrast ratios (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Verify analytics tracking
- [ ] Run Lighthouse audit (score >90)

---

## 🎯 **Success Metrics**

Target metrics for hero section:

- **Performance**: 60fps animation, <1s load time
- **Engagement**: >70% users watch full animation
- **Conversion**: >15% click "Get Started"
- **Bounce Rate**: <30% from hero section
- **Time on Page**: >45 seconds average

---

## 📚 **Resources**

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Manual](https://threejs.org/manual/)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [Tailwind v4 Docs](https://tailwindcss.com)

---

## 🆘 **Support**

For questions or issues:
1. Check design spec (`ZALPHA_HERO_DESIGN_SPEC.md`)
2. Review component code (`ZALPHAHeroSection.tsx`)
3. Refer to this implementation guide
4. Contact design team for clarifications

---

## ✅ **Quick Wins**

### **5-Minute Integration**
1. Copy `ZALPHAHeroSection.tsx` to your project
2. Import in landing page
3. Pass callback props
4. Done! 🎉

### **10-Minute Customization**
1. Update headline text
2. Change button labels
3. Adjust colors in regions array
4. Test on mobile
5. Ship it! 🚀

### **30-Minute Full Customization**
1. Modify animation timing
2. Add new regions
3. Customize orb labels
4. Adjust responsive breakpoints
5. Add analytics tracking
6. A/B test variants
7. Production ready! ✨

---

**ZALPHA Hero Section - Ready to Orchestra Pacific Talent** 🌏🎵
