# ZALPHA Co-Op Pitch Deck Specification
## "Work-Ready Pacific: Real Skills Through Real Work"

---

## 📱 **Format & Structure**

- **Dimensions**: 390x844 (mobile-first, vertical)
- **Slides**: 10 total
- **Layout**: Scrollable mobile presentation, exportable as individual slides
- **Style**: ZALPHA blue/teal accents, Pacific imagery, clean cards
- **Typography**: Clear hierarchy, legible at mobile size

---

## 🎨 **Visual Design System**

### **Color Palette**

```css
/* Primary Colors */
--zalpha-blue: #0ea5e9;        /* Sky-500 - Primary CTA */
--zalpha-teal: #14b8a6;        /* Teal-500 - Accent */
--zalpha-navy: #1e3a8a;        /* Blue-900 - Dark sections */

/* Category Colors */
--admin-violet: #8b5cf6;       /* Violet-500 */
--service-cyan: #06b6d4;       /* Cyan-500 */
--operations-emerald: #10b981; /* Emerald-500 */
--rd-amber: #f59e0b;          /* Amber-500 */

/* Backgrounds */
--bg-light: #ffffff;
--bg-dark: #0f172a;           /* Slate-900 */
--bg-gradient-pacific: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
--bg-gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Text */
--text-primary: #0f172a;      /* Slate-900 */
--text-secondary: #64748b;    /* Slate-500 */
--text-light: #ffffff;
```

### **Typography Scale**

```css
/* Slide Title */
.slide-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Subtitle */
.slide-subtitle {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
}

/* Headline */
.slide-headline {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
}

/* Body Text */
.slide-body {
  font-size: 16px;
  line-height: 1.6;
}

/* Caption */
.slide-caption {
  font-size: 14px;
  line-height: 1.5;
}

/* Small Text */
.slide-small {
  font-size: 12px;
  line-height: 1.4;
}
```

### **Spacing System**

```css
--slide-padding: 24px;
--section-spacing: 32px;
--element-spacing: 16px;
--card-spacing: 12px;
```

---

## 📊 **Slide-by-Slide Specifications**

### **Slide 1: Title**

```
┌─────────────────────────────────────────┐
│                                         │
│         [Pacific Globe Icon]            │
│                                         │
│      Work-Ready Pacific:                │
│   Real Skills Through Real Work         │
│                                         │
│   How ZALPHA Co-Op turns placements     │
│      into career launchpads             │
│                                         │
│  [Student + Employer illustration]      │
│                                         │
│         CNMI • Guam • FSM               │
│         Palau • Marshall Islands        │
│                                         │
│              [ZALPHA logo]              │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Background: Pacific blue gradient
- Globe illustration with highlighted regions
- White text for high contrast
- Student and employer icons
- ZALPHA logo at bottom

---

### **Slide 2: The Problem**

```
┌─────────────────────────────────────────┐
│ The Problem 🔴                          │
│                                         │
│ [Card 1]                                │
│ 📄 Students log hours but struggle      │
│    to show real, resume-worthy skills   │
│                                         │
│ [Card 2]                                │
│ 🏢 Employers can't attract youth to     │
│    roles seen as "just food service"    │
│    or "basic retail"                    │
│                                         │
│ [Card 3]                                │
│ 🎓 Co-op coordinators can't easily      │
│    see what students actually learned   │
│    beyond attendance                    │
│                                         │
│ Traditional co-ops track time,          │
│ not skills or real outcomes.            │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Dark background with light text
- Three problem cards with icons
- Red accent for "problem" theme
- Bottom tagline in italics

---

### **Slide 3: The ZALPHA Difference**

```
┌─────────────────────────────────────────┐
│ The ZALPHA Difference ✨                │
│                                         │
│ From vague experience to                │
│ clear deliverables                      │
│                                         │
│ [Before]           [After]              │
│ "Front Desk" →  "Customer Service &     │
│                  POS Specialist"        │
│                                         │
│ Business Functions:                     │
│                                         │
│ ┌────────┐ ┌────────┐                  │
│ │ 📋 HR  │ │ 👥 POS │                  │
│ │ Admin  │ │Service │                  │
│ └────────┘ └────────┘                  │
│                                         │
│ ┌────────┐ ┌────────┐                  │
│ │ 🔧 Ops │ │ 💡 R&D │                  │
│ │Hands-On│ │ Ideas  │                  │
│ └────────┘ └────────┘                  │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Light background
- Before/after comparison
- Four category icons in grid
- Color-coded cards

---

### **Slide 4: How It Works**

```
┌─────────────────────────────────────────┐
│ How It Works: Deliverables System       │
│                                         │
│      1️⃣ Employer                       │
│    Defines Deliverables                 │
│         ↓                               │
│      2️⃣ Student                        │
│  Completes & Reflects                   │
│         ↓                               │
│      3️⃣ ZALPHA                         │
│   Records Skill Data                    │
│         ↓                               │
│      4️⃣ Co-Op Admin                    │
│     Sees Outcomes                       │
│                                         │
│ Example Deliverables:                   │
│ • SOP drafting                          │
│ • POS training                          │
│ • Inventory checks                      │
│ • Recipe R&D ideas                      │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Process flow with arrows
- Numbered emoji steps
- Blue accent color
- Bullet list at bottom

---

### **Slide 5: Student Advantage**

```
┌─────────────────────────────────────────┐
│ Student Advantage 🎯                    │
│                                         │
│ From "I worked at a café"               │
│      to real achievements               │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ✓ Helped draft HR SOPs for          │ │
│ │   Student Co-Op Program             │ │
│ │   (Employer verified)               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ✓ Operated POS system               │ │
│ │   independently during lunch rush   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ✓ Contributed 3 new menu R&D        │ │
│ │   ideas; 1 implemented              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Export to resume, portfolio,            │
│ or Zee Bot–generated CV ✓              │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Achievement cards with checkmarks
- Green accent for "verified"
- Gradient cards
- Bottom export note

---

### **Slide 6: Employer Advantage**

```
┌─────────────────────────────────────────┐
│ Employer Advantage 💼                   │
│                                         │
│ Attract the right students with         │
│ real work, not stereotypes              │
│                                         │
│ Function-Based Roles:                   │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 💡 Recipe R&D Assistant             │ │
│ │    23 students interested           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👥 Customer Insights &              │ │
│ │    Service Design                   │ │
│ │    18 students interested           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📋 HR & People Operations           │ │
│ │    31 students interested           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Students see skills and deliverables,   │
│ not just job titles. 3.9x more          │
│ applicants! 📊                          │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Role cards with icons
- Student interest counts
- Category colors
- Metric highlight at bottom

---

### **Slide 7: Co-Op Admin Advantage**

```
┌─────────────────────────────────────────┐
│ Co-Op Admin Advantage 🎓                │
│                                         │
│ Design better programs                  │
│ with real data                          │
│                                         │
│ Top Student Interests:                  │
│ ┌────┐ ┌────┐ ┌────┐                   │
│ │R&D │ │ HR │ │Tech│                   │
│ │67% │ │54% │ │43% │                   │
│ └────┘ └────┘ └────┘                   │
│                                         │
│ Skills to Strengthen:                   │
│ • Communication (71 students)           │
│ • Reliability (68 students)             │
│ • Documentation (54 students)           │
│                                         │
│ Design Co-Op Pathways:                  │
│ [Mental readiness]                      │
│ [HR fundamentals]                       │
│ [Innovation & R&D]                      │
│                                         │
│ Data from 87 students across            │
│ 23 placements 📊                        │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Data visualization cards
- Percentage badges
- Pathway chips
- Purple/admin color theme

---

### **Slide 8: Data Flow**

```
┌─────────────────────────────────────────┐
│ Data Flow Across All Users 🔄          │
│                                         │
│         Student signals                 │
│    (Skills & Interests)                 │
│              ↓                          │
│       Verified Achievements             │
│              ↓                          │
│     Employer SOP/Training               │
│        Improvements                     │
│              ↓                          │
│      Co-Op Admin Program                │
│           Design                        │
│              ↓                          │
│       Better Matches &                  │
│        Higher Success                   │
│                                         │
│ Everyone benefits from                  │
│ the same deliverable data 📈            │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Flow diagram with arrows
- Circular icons for each step
- Gradient connector lines
- Center-aligned layout

---

### **Slide 9: Pacific Context**

```
┌─────────────────────────────────────────┐
│ Built for Pacific Islander              │
│ Co-Op Programs 🌺                       │
│                                         │
│      [Pacific Islands Map]              │
│                                         │
│ ✓ CNMI • Guam • FSM                    │
│   Palau • Marshall Islands              │
│                                         │
│ ✓ First-time workforce entry for        │
│   high school students across           │
│   Pacific Island communities            │
│                                         │
│ ✓ Small business & tourism              │
│   sector focus                          │
│                                         │
│ ✓ Mobile-first for island               │
│   connectivity                          │
│                                         │
│ ✓ Culturally relevant design with       │
│   Pacific Islander themes               │
│                                         │
│ Designed with and for                   │
│ Pacific Islander communities 🏝️        │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Pacific map illustration
- Teal/ocean color theme
- Island-themed icons
- List with checkmarks

---

### **Slide 10: Call to Action**

```
┌─────────────────────────────────────────┐
│                                         │
│   Ready to Transform Your               │
│      Co-Op Program?                     │
│                                         │
│                                         │
│   Pilot ZALPHA Co-Op at your            │
│    school or business                   │
│                                         │
│                                         │
│   [📅 Book a Demo]                     │
│                                         │
│   [🚀 Join Beta Program]               │
│                                         │
│   [📧 Contact Us]                      │
│                                         │
│                                         │
│   hello@zalpha.work                     │
│   www.zalpha.work/coop                  │
│                                         │
│                                         │
│         [ZALPHA logo]                   │
└─────────────────────────────────────────┘
```

**Visual Elements**:
- Gradient background
- Large CTA buttons
- Contact information
- ZALPHA logo at bottom

---

## 🎯 **Design Patterns**

### **Slide Header**

```tsx
<SlideHeader>
  <SlideNumber>01</SlideNumber>
  <SlideTitle>Work-Ready Pacific</SlideTitle>
  <SlideSubtitle>Real Skills Through Real Work</SlideSubtitle>
</SlideHeader>
```

### **Problem Card**

```tsx
<ProblemCard>
  <Icon>📄</Icon>
  <Text>
    Students log hours but struggle to show 
    real, resume-worthy skills
  </Text>
</ProblemCard>
```

### **Process Step**

```tsx
<ProcessStep number={1}>
  <StepIcon>🏢</StepIcon>
  <StepTitle>Employer</StepTitle>
  <StepDescription>Defines Deliverables</StepDescription>
</ProcessStep>
```

### **Achievement Card**

```tsx
<AchievementCard verified>
  <CheckIcon />
  <AchievementText>
    Helped draft HR SOPs for Student Co-Op Program
  </AchievementText>
  <VerificationBadge>Employer verified</VerificationBadge>
</AchievementCard>
```

### **Role Card**

```tsx
<RoleCard category="rd">
  <CategoryIcon>💡</CategoryIcon>
  <RoleTitle>Recipe R&D Assistant</RoleTitle>
  <InterestCount>23 students interested</InterestCount>
</RoleCard>
```

### **Data Point Card**

```tsx
<DataPointCard>
  <Percentage>67%</Percentage>
  <Label>R&D Interest</Label>
</DataPointCard>
```

### **CTA Button**

```tsx
<CTAButton variant="primary">
  <Icon>📅</Icon>
  <ButtonText>Book a Demo</ButtonText>
</CTAButton>
```

---

## 📱 **Mobile Responsiveness**

### **Mobile (390x844)**
- Single column layout
- Full-width cards
- Stacked elements
- Large touch targets (44px min)
- Readable text (16px min body)

### **Tablet (768px+)**
- Wider padding
- Slightly larger text
- More breathing room
- Same single-column flow

### **Desktop (1024px+)**
- Centered content (max-width: 600px)
- Larger text and icons
- Can be displayed as slides
- Export-friendly format

---

## 🎨 **Component Library**

### **Icons**

```
Pacific: 🌺 🏝️ 🌊 🗺️
Process: 1️⃣ 2️⃣ 3️⃣ 4️⃣
Categories: 📋 👥 🔧 💡
Status: ✓ ✨ 🎯 📊 📈
Actions: 📅 🚀 📧 💼 🎓
```

### **Color Usage**

```
Slide 1 (Title): Pacific gradient background
Slide 2 (Problem): Dark background, red accents
Slide 3 (Difference): Light background, category colors
Slide 4 (How): Light background, blue accents
Slide 5 (Student): Light background, green/verified
Slide 6 (Employer): Light background, category colors
Slide 7 (Admin): Light background, purple accents
Slide 8 (Flow): Gradient background
Slide 9 (Pacific): Teal/ocean theme
Slide 10 (CTA): Pacific gradient background
```

---

## 📤 **Export Formats**

### **Mobile Scroll View**
- All slides in one scrollable container
- Snap scroll behavior
- Slide indicators
- Swipe navigation

### **Desktop Presentation**
- Individual slide export (PNG/PDF)
- 16:9 aspect ratio conversion
- Print-friendly layout
- Slide numbers

### **Web Share**
- Shareable URL
- Social media cards
- Embed code
- QR code link

---

**ZALPHA Pitch Deck - Work-Ready Pacific** 🌺📊✨