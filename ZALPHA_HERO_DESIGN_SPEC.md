# ZALPHA Hero Section - Design Specification
## Interactive 3D Globe → Flat Map with Glowing Orbs

---

## 🎯 **Design Vision**

A premium SaaS landing page hero featuring a cinematic 3D globe that transforms into an interactive regional map, showcasing ZALPHA's Pacific network through animated glowing orbs and pulsing connections.

---

## 📐 **Layout Structure**

```
┌─────────────────────────────────────────────────────────────────┐
│  ZALPHA Logo                                    [Login] [Sign Up]│
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────┐        ┌──────────────────────────────┐ │
│  │                    │        │                              │ │
│  │  Left Content      │        │      3D Globe Animation      │ │
│  │  Section           │        │                              │ │
│  │                    │        │    🌍 → 🗺️ → ✨           │ │
│  │  • Headline        │        │                              │ │
│  │  • Subtext         │        │   Glowing Orbs + Lines       │ │
│  │  • CTA Buttons     │        │                              │ │
│  │  • Trust Badges    │        │                              │ │
│  │                    │        │                              │ │
│  └────────────────────┘        └──────────────────────────────┘ │
│                                                                   │
│  [Scroll to explore] ↓                                           │
└─────────────────────────────────────────────────────────────────┘

Container: 1440px max-width, centered
Grid: 5-column (2 cols left content, 3 cols globe)
Height: 100vh (min 800px)
Padding: 80px horizontal, 60px vertical
```

---

## 🎬 **Animation Sequence (10s total)**

### **Stage 1: Globe Appears (0-2s)**
```
Scene: Deep space with stars
Globe: Fades in from opacity 0 → 1
Position: Center screen, slightly rotated
State: Slow ambient rotation (Y-axis, 0.1 rad/s)
Atmosphere: Soft blue glow around globe
Stars: Twinkling particles in background
```

**Visual Details**:
- Globe texture: Blue marble (#1e40af base)
- Atmosphere ring: Cyan glow (#06b6d4, 20% opacity)
- Stars: 3,000 particles, white, slow drift
- Camera position: (0, 0, 5)
- Lighting: Ambient + 2 point lights

### **Stage 2: Rotation & Zoom (2-6s)**
```
Animation: Smooth camera movement + globe rotation
Start: Front view of Earth
End: Western Pacific centered (CNMI/Guam visible)
Camera: Lerps from (0,0,5) to (1.5, 0.8, 3.5)
Globe: Rotates Y-axis π/2 to show Pacific
Duration: 4 seconds (easing: easeInOutCubic)
Label: "Focusing on Western Pacific..." (bottom)
```

**Visual Details**:
- Smooth bezier curve path
- Globe continues ambient rotation
- Atmosphere glow intensifies
- Pacific region highlighted (brighter blue)
- Stars parallax in background

### **Stage 3: Flatten to 2D Map (6-8s)**
```
Transformation: 3D sphere → 2D flat map
Method: Perspective flatten + scale
Start: 3D globe at (1.5, 0.8, 3.5)
End: Flat map plane at (0, 0, 0)
Scale: Globe shrinks 30% during flatten
Rotation: Flattens on X-axis (90° tilt)
Grid: Pacific region map overlay appears
Duration: 2 seconds (easing: easeOutQuad)
```

**Visual Details**:
- Globe mesh morphs (MorphTargets)
- 2D map grid fades in (subtle lines)
- Coastlines become visible
- Atmosphere fades out
- Background darkens slightly

### **Stage 4: Orbs Animate Out (8-10s)**
```
Orbs appear one by one from map center:
1. CNMI 🇲🇵 (8.0s)
2. Guam 🇬🇺 (8.3s)
3. Palau 🇵🇼 (8.6s)
4. FSM 🇫🇲 (8.9s)
5. Marshall Islands 🇲🇭 (9.2s)
6. Philippines 🇵🇭 (9.5s)

Animation per orb:
- Start: Center of map, scale 0
- End: Region position, scale 1
- Curve: Elastic bounce (easeOutElastic)
- Glow: Fade in emissive color
- Label: Slides in from right
```

**Visual Details**:
- Orb size: 80px diameter
- Glow radius: 120px (outer ring)
- Emission: Bright core (emissiveIntensity: 1.5)
- Colors: See color palette below
- Labels: 14px font, fade in with orb

### **Stage 5: Connecting Lines (9-10s)**
```
Lines draw between orbs (SVG path animation):
- Start: Orb center
- End: Adjacent orb center
- Style: Dashed gradient line
- Width: 2px
- Color: Cyan (#06b6d4, 40% opacity)
- Animation: Stroke-dashoffset
- Pulse: Continuous after draw (2s cycle)

Connections:
CNMI ↔ Guam
Guam ↔ Palau
Palau ↔ FSM
FSM ↔ Marshall Islands
All ↔ Philippines (hub)
```

**Visual Details**:
- Dashed pattern: 10px dash, 5px gap
- Pulse: Travels along line (light effect)
- Gradient: Fades at endpoints
- Glow: Subtle bloom effect

### **Stage 6: Idle State (10s+)**
```
Continuous animations:
- Orbs: Gentle pulse (scale 0.98 ↔ 1.02, 3s cycle)
- Lines: Pulse travels (2s cycle per line)
- Map: Subtle ambient glow
- Stars: Continue slow drift
- Interactive: Orb hover/click enabled

Hover states:
- Orb: Scale 1.2, label brightens
- Line: Glow intensifies
- Info card: Slides in from right
```

---

## 🎨 **Visual Design System**

### **Color Palette**

**Background**:
```css
Primary BG: #0a1628 (navy)
Gradient overlay: 
  radial-gradient(
    circle at 60% 40%, 
    rgba(6, 182, 212, 0.15) 0%, 
    transparent 60%
  )
```

**Globe/Map**:
```css
Ocean: #1e40af (blue-800)
Land: #374151 (gray-700, subtle)
Atmosphere: #06b6d4 (cyan-500, 20% opacity)
Grid lines: #334155 (slate-700, 15% opacity)
```

**Orb Colors** (Tailwind v4):
```css
CNMI:            #a855f7 (purple-500)
Guam:            #06b6d4 (cyan-500)
Palau:           #10b981 (emerald-500)
FSM:             #3b82f6 (blue-500)
Marshall Islands:#ec4899 (pink-500)
Philippines:     #f59e0b (amber-500)
```

**Text**:
```css
Headline: #ffffff (white)
Subtext: #cbd5e1 (slate-300)
Labels: #e2e8f0 (slate-200)
Captions: #94a3b8 (slate-400)
```

**Buttons**:
```css
Primary (Get Started):
  Background: linear-gradient(135deg, #3b82f6, #8b5cf6)
  Text: #ffffff
  Hover: Glow effect (shadow-lg shadow-blue-500/50)

Secondary (Watch Demo):
  Background: transparent
  Border: 1px solid rgba(255,255,255,0.2)
  Text: #e2e8f0
  Hover: Background rgba(255,255,255,0.05)
```

### **Typography**

**Headline**:
```
Font: Inter Bold
Size: 56px / 3.5rem
Line height: 1.1 (61px)
Letter spacing: -0.02em (tight)
Max width: 520px
```

**Subtext**:
```
Font: Inter Regular
Size: 18px / 1.125rem
Line height: 1.6 (29px)
Letter spacing: 0
Max width: 480px
Color: #cbd5e1
Margin top: 24px
```

**Orb Labels**:
```
Font: Inter Semibold
Size: 14px / 0.875rem
Line height: 1.4
Letter spacing: 0.01em
Background: rgba(10, 22, 40, 0.8)
Padding: 6px 12px
Border radius: 6px
Backdrop filter: blur(8px)
```

**Captions**:
```
Font: Inter Regular
Size: 12px / 0.75rem
Line height: 1.4
Color: #94a3b8
Display: Below label
```

### **Spacing System**

```css
Container padding: 80px 60px
Section gap: 60px (left content to globe)
Headline to subtext: 24px
Subtext to buttons: 32px
Button gap: 16px
Button padding: 16px 32px
Label to caption: 4px
Orb to label: 16px
```

---

## 📱 **Responsive Breakpoints**

### **Desktop (1440px+)**
```
Layout: Side-by-side (40% content, 60% globe)
Globe size: 600px diameter
Font sizes: As specified
Animation: Full 10s sequence
```

### **Tablet (768px - 1439px)**
```
Layout: Side-by-side (45% content, 55% globe)
Globe size: 480px diameter
Headline: 48px
Subtext: 16px
Animation: Full 10s sequence
```

### **Mobile (< 768px)**
```
Layout: Stacked (content top, globe bottom)
Globe size: 320px diameter
Headline: 40px
Subtext: 16px
Animation: Simplified (skip flatten, orbs appear faster)
Duration: 5s total
```

---

## 🏗️ **Frame Structure (Figma/Design)**

```
Hero Section (Frame)
├── Background (Frame)
│   ├── Navy BG Fill
│   ├── Gradient Overlay
│   └── Stars Pattern
│
├── Content Container (Auto Layout, Horizontal)
│   ├── Left Content (Frame, Auto Layout Vertical)
│   │   ├── Eyebrow Text (Optional: "New: AI-Powered Matching")
│   │   ├── Headline (Text)
│   │   ├── Subtext (Text)
│   │   ├── Button Group (Auto Layout, Horizontal)
│   │   │   ├── Primary Button (Component)
│   │   │   └── Secondary Button (Component)
│   │   └── Trust Badges (Auto Layout, Horizontal)
│   │       ├── Badge 1: "2,847 Students"
│   │       ├── Badge 2: "456 Employers"
│   │       └── Badge 3: "6 Regions"
│   │
│   └── Globe Container (Frame)
│       ├── 3D Globe (Component - Animation Reference)
│       ├── Flat Map (Component - Hidden initially)
│       └── Orbs Layer (Frame)
│           ├── CNMI Orb (Component)
│           │   ├── Glow Circle
│           │   ├── Label Card
│           │   └── Caption Text
│           ├── Guam Orb (Component)
│           ├── Palau Orb (Component)
│           ├── FSM Orb (Component)
│           ├── Marshall Islands Orb (Component)
│           └── Philippines Orb (Component)
│
└── Scroll Indicator (Component)
    └── Animated down arrow
```

---

## 🎯 **Orb Data Structure**

### **CNMI** 🇲🇵
```json
{
  "id": "cnmi",
  "name": "CNMI",
  "flag": "🇲🇵",
  "position": { "x": 420, "y": 280 },
  "color": "#a855f7",
  "label": "Saipan Hub",
  "caption": "Local talent",
  "stats": {
    "students": 847,
    "coops": 89,
    "employers": 142
  }
}
```

### **Guam** 🇬🇺
```json
{
  "id": "guam",
  "name": "Guam",
  "flag": "🇬🇺",
  "position": { "x": 380, "y": 320 },
  "color": "#06b6d4",
  "label": "Regional Center",
  "caption": "Regional employers",
  "stats": {
    "students": 1124,
    "coops": 156,
    "employers": 198
  }
}
```

### **Palau** 🇵🇼
```json
{
  "id": "palau",
  "name": "Palau",
  "flag": "🇵🇼",
  "position": { "x": 320, "y": 360 },
  "color": "#10b981",
  "label": "Island Network",
  "caption": "Government partners",
  "stats": {
    "students": 234,
    "coops": 32,
    "employers": 42
  }
}
```

### **FSM** 🇫🇲
```json
{
  "id": "fsm",
  "name": "FSM",
  "flag": "🇫🇲",
  "position": { "x": 460, "y": 340 },
  "color": "#3b82f6",
  "label": "Micronesia Hub",
  "caption": "Educational institutions",
  "stats": {
    "students": 412,
    "coops": 54,
    "employers": 48
  }
}
```

### **Marshall Islands** 🇲🇭
```json
{
  "id": "marshall",
  "name": "Marshall Islands",
  "flag": "🇲🇭",
  "position": { "x": 520, "y": 300 },
  "color": "#ec4899",
  "label": "Pacific Gateway",
  "caption": "Career services",
  "stats": {
    "students": 156,
    "coops": 21,
    "employers": 18
  }
}
```

### **Philippines** 🇵🇭
```json
{
  "id": "philippines",
  "name": "Philippines",
  "flag": "🇵🇭",
  "position": { "x": 280, "y": 400 },
  "color": "#f59e0b",
  "label": "APAC Connector",
  "caption": "Remote opportunities",
  "stats": {
    "students": 2400,
    "coops": 340,
    "employers": 520
  }
}
```

---

## 🎨 **Component Specifications**

### **Orb Component**
```tsx
// Visual structure
<group position={[x, y, z]}>
  {/* Core sphere */}
  <mesh>
    <sphereGeometry args={[0.4, 32, 32]} />
    <meshStandardMaterial
      color={region.color}
      emissive={region.color}
      emissiveIntensity={1.5}
      metalness={0.3}
      roughness={0.4}
    />
  </mesh>

  {/* Outer glow ring */}
  <mesh>
    <sphereGeometry args={[0.6, 32, 32]} />
    <meshBasicMaterial
      color={region.color}
      transparent
      opacity={0.2}
      side={THREE.BackSide}
    />
  </mesh>

  {/* Label card (HTML overlay) */}
  <Html distanceFactor={5} position={[0.8, 0, 0]}>
    <div className="orb-label">
      <div className="label-main">{region.label}</div>
      <div className="label-caption">{region.caption}</div>
    </div>
  </Html>
</group>
```

### **Connecting Line Component**
```tsx
// SVG path with animated dash
<svg className="connections-layer">
  <defs>
    <linearGradient id="lineGradient">
      <stop offset="0%" stopColor={colorA} stopOpacity="0" />
      <stop offset="50%" stopColor={colorA} stopOpacity="0.4" />
      <stop offset="100%" stopColor={colorA} stopOpacity="0" />
    </linearGradient>
  </defs>
  
  <path
    d={`M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`}
    stroke="url(#lineGradient)"
    strokeWidth="2"
    strokeDasharray="10 5"
    fill="none"
    className="animate-pulse-line"
  />
  
  {/* Traveling pulse dot */}
  <circle
    r="4"
    fill={colorA}
    className="pulse-dot"
  >
    <animateMotion
      dur="2s"
      repeatCount="indefinite"
      path={`M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`}
    />
  </circle>
</svg>
```

---

## 💻 **Engineering Handoff Notes**

### **Tech Stack**
- **3D Rendering**: React Three Fiber (@react-three/fiber)
- **3D Helpers**: @react-three/drei (OrbitControls, Html, Stars, etc.)
- **Animation**: Motion (framer-motion successor) or GSAP
- **Styling**: Tailwind v4
- **State**: React hooks (useState, useRef, useEffect)

### **Key Files Structure**
```
/components/hero/
├── InteractiveGlobeHero.tsx       (Main container)
├── Globe3D.tsx                    (3D globe component)
├── FlatMap.tsx                    (2D map component)
├── RegionOrb.tsx                  (Orb component)
├── ConnectionLine.tsx             (Line component)
├── HeroContent.tsx                (Left side content)
└── animations.ts                  (Animation configs)

/data/
└── regions.ts                     (Region data)

/styles/
└── hero.css                       (Custom animations)
```

### **Animation Timeline**
```typescript
const timeline = {
  globeAppear: { start: 0, end: 2 },
  rotateZoom: { start: 2, end: 6 },
  flatten: { start: 6, end: 8 },
  orbsCNMI: { start: 8.0, end: 8.3 },
  orbsGuam: { start: 8.3, end: 8.6 },
  orbsPalau: { start: 8.6, end: 8.9 },
  orbsFSM: { start: 8.9, end: 9.2 },
  orbsMarshall: { start: 9.2, end: 9.5 },
  orbsPhilippines: { start: 9.5, end: 9.8 },
  connectLines: { start: 9.8, end: 10 },
  idleState: { start: 10, loop: true }
};
```

### **Performance Targets**
- 60fps on desktop (Chrome/Safari/Firefox)
- 30fps minimum on mobile
- Bundle size: <200KB (3D libs)
- First paint: <1s
- Animation complete: <10s

### **Accessibility**
- Prefers-reduced-motion: Show static map instead
- Keyboard navigation: Tab through orbs
- Screen readers: Announce region data
- Alt text: Descriptive for each element

---

## 🎯 **Interactive States**

### **Orb Hover**
```
Trigger: Mouse enters orb
Animation: Scale 1 → 1.2 (0.3s easeOutCubic)
Label: Fade 1 → 1 + translate Y -4px
Glow: Emissive intensity 1.5 → 2.0
Cursor: pointer
Info card: Slide in from right (300ms)
```

### **Orb Click**
```
Trigger: Click orb
Action: Navigate to region page
Visual: Ripple effect (scale 1 → 1.5 → 1, opacity 1 → 0)
Sound: Optional subtle click (WebAudio API)
Analytics: Track region interest
```

### **Line Pulse**
```
Animation: Continuous
Duration: 2s per cycle
Effect: Dot travels along path
Glow: Travels with dot (gaussian blur)
Color: Inherits from connected orbs (blend)
```

---

## 📐 **Measurements & Spacing**

```css
/* Container */
.hero-section {
  max-width: 1440px;
  height: 100vh;
  min-height: 800px;
  padding: 60px 80px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 60px;
  align-items: center;
}

/* Left content */
.hero-content {
  max-width: 560px;
  padding-right: 40px;
}

.hero-headline {
  font-size: 56px;
  line-height: 1.1;
  margin-bottom: 24px;
  max-width: 520px;
}

.hero-subtext {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 480px;
}

/* Buttons */
.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn-primary {
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 8px;
}

.btn-secondary {
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 8px;
}

/* Globe container */
.globe-container {
  width: 100%;
  height: 600px;
  position: relative;
}

/* Orb label */
.orb-label {
  background: rgba(10, 22, 40, 0.8);
  backdrop-filter: blur(8px);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.label-main {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 2px;
}

.label-caption {
  font-size: 12px;
  color: #94a3b8;
}
```

---

## 🎬 **Animation Easing Functions**

```typescript
const easings = {
  // Globe appear
  fadeIn: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  
  // Rotate & zoom
  easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  
  // Flatten transition
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  
  // Orb bounce
  easeOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Line draw
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  
  // Pulse loop
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
};
```

---

## ✅ **Design Checklist**

### **Visual Design**
- [ ] Background gradient renders smoothly
- [ ] Globe texture is crisp (no pixelation)
- [ ] Orb colors match brand palette
- [ ] Typography is legible at all sizes
- [ ] Buttons have clear hover states
- [ ] Labels are readable against background
- [ ] Connecting lines are subtle but visible

### **Animation**
- [ ] Globe appears smoothly (no pop-in)
- [ ] Rotation is fluid (60fps)
- [ ] Zoom transition feels natural
- [ ] Flatten effect is convincing
- [ ] Orbs bounce on arrival
- [ ] Lines draw smoothly
- [ ] Pulse effect is continuous
- [ ] Idle state is subtle

### **Interaction**
- [ ] Orbs respond to hover
- [ ] Click navigates correctly
- [ ] Labels appear on schedule
- [ ] Info cards slide smoothly
- [ ] Cursor changes appropriately

### **Responsive**
- [ ] Desktop layout is balanced
- [ ] Tablet stacks gracefully
- [ ] Mobile simplifies animation
- [ ] Text is readable at all sizes
- [ ] Buttons are thumb-friendly

### **Performance**
- [ ] Loads in <1s
- [ ] Maintains 60fps
- [ ] No jank on scroll
- [ ] Mobile optimized
- [ ] Accessible fallbacks work

---

## 🚀 **Production Ready**

This design specification is ready for:
- **Design handoff** to engineering
- **WebGL implementation** with React Three Fiber
- **Motion design** with Framer Motion/GSAP
- **Component library** integration
- **A/B testing** variants

**ZALPHA Hero Section - Premium SaaS Experience** 🌏✨
