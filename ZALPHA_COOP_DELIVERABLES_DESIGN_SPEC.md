# ZALPHA Co-Op Deliverables Module - Design Specification
## Mobile-First Deliverable Tracking for Employers & Students

---

## 🎯 **Purpose**

A mobile-first system where employers define and track clear, measurable deliverables for high school co-op students. Each deliverable represents a specific business function with progress tracking, skill development focus, and school learning outcome mapping.

---

## 📱 **Screen Layout (390x844 Mobile)**

```
┌─────────────────────────────────────────┐
│ ← Co-Op Deliverables          [+ Add]   │ ← Header
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Student Header Card                 │ │
│ │ Maya Santos • Z-UID: Z24-0847      │ │
│ │ Paradise Hotel                      │ │
│ │ Front Desk Assistant                │ │
│ │ Mon-Fri 9:00 AM - 2:00 PM          │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Progress Summary                        │
│ ● 2/5 Completed  ● 2 In Progress       │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ✓ [Admin] Create HR SOPs           │ │ ← Deliverable Card
│ │   Help create Company Standard      │ │
│ │   Operating Procedures for Co-Op    │ │
│ │   📚 Skill: Documentation           │ │
│ │   ✓ Completed • Due: Feb 20         │ │
│ │   🎓 Maps to: Writing Skills        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ◐ [Service] POS System Training    │ │
│ │   Learn and operate the POS system  │ │
│ │   for basic transactions            │ │
│ │   📚 Skill: Customer Service        │ │
│ │   In Progress (60%) • Due: Feb 25   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ○ [Operations] Inventory Check     │ │
│ │   Assist with inventory check and   │ │
│ │   restocking procedures             │ │
│ │   📚 Skill: Organization            │ │
│ │   Not Started • Due: Mar 1          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [View All] [Filter by Status]          │
│                                         │
│ [+ Add New Deliverable]                 │
└─────────────────────────────────────────┘
```

---

## 🎨 **Visual Design System**

### **Color Palette**

```css
/* Categories */
--category-admin: #8b5cf6;          /* Violet-500 - Admin/Office */
--category-customer: #06b6d4;       /* Cyan-500 - Customer Service */
--category-operations: #10b981;     /* Emerald-500 - Hands-On */
--category-rd: #f59e0b;             /* Amber-500 - R&D/Ideas */

/* Status Colors */
--status-not-started: #94a3b8;      /* Slate-400 */
--status-in-progress: #3b82f6;      /* Blue-500 */
--status-completed: #10b981;        /* Emerald-500 */
--status-overdue: #ef4444;          /* Red-500 */

/* Background */
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;            /* Slate-50 */
--bg-card: #ffffff;

/* Text */
--text-primary: #0f172a;            /* Slate-900 */
--text-secondary: #64748b;          /* Slate-500 */
--text-muted: #94a3b8;              /* Slate-400 */

/* Accents */
--accent-blue: #0ea5e9;             /* Sky-500 */
--accent-teal: #14b8a6;             /* Teal-500 */
```

### **Typography**

```css
/* Headers */
.page-title {
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Student Name */
.student-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Deliverable Title */
.deliverable-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Description */
.deliverable-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Category Tag */
.category-tag {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Status Text */
.status-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

/* Skill Focus */
.skill-focus {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}
```

### **Spacing System**

```css
/* Layout */
--spacing-screen: 16px;          /* Screen edges */
--spacing-card: 16px;            /* Card padding */
--spacing-section: 16px;         /* Between sections */
--spacing-item: 12px;            /* Between items */

/* Components */
--header-height: 56px;
--card-border-radius: 12px;
--tag-border-radius: 6px;
--button-height: 44px;
```

---

## 🏗️ **Component Structure**

### **1. Student Header Card**

```tsx
<StudentHeaderCard>
  <StudentInfo>
    <Avatar src={student.avatar} />
    <div>
      <Name>{student.name}</Name>
      <ZUID>Z-UID: {student.zuid}</ZUID>
    </div>
  </StudentInfo>
  
  <PlacementInfo>
    <Icon>🏢</Icon>
    <Text>{placement.employerName}</Text>
  </PlacementInfo>
  
  <RoleInfo>
    <Icon>💼</Icon>
    <Text>{placement.role}</Text>
  </RoleInfo>
  
  <ScheduleInfo>
    <Icon>📅</Icon>
    <Text>{placement.schedule}</Text>
  </ScheduleInfo>
</StudentHeaderCard>
```

**Visual Specs**:
- Background: White with subtle shadow
- Border: 1px solid slate-200
- Border radius: 12px
- Padding: 16px
- Margin: 16px (sides), 12px (bottom)

### **2. Progress Summary Bar**

```tsx
<ProgressSummary>
  <StatGroup>
    <Stat>
      <Icon color="emerald">●</Icon>
      <Text>{completed}/{total} Completed</Text>
    </Stat>
    
    <Stat>
      <Icon color="blue">●</Icon>
      <Text>{inProgress} In Progress</Text>
    </Stat>
    
    <Stat>
      <Icon color="slate">●</Icon>
      <Text>{notStarted} Not Started</Text>
    </Stat>
  </StatGroup>
  
  <ProgressBar>
    <Fill width={completionPercentage} />
  </ProgressBar>
</ProgressSummary>
```

**Visual Specs**:
- Background: Slate-50
- Padding: 12px 16px
- Progress bar height: 6px
- Progress fill: Emerald-500
- Text: 13px, slate-600

### **3. Deliverable Card**

```tsx
<DeliverableCard status={status} completed={completed}>
  <Header>
    <Checkbox 
      checked={completed}
      onChange={handleToggle}
      disabled={role !== 'employer'}
    />
    
    <CategoryTag category={category}>
      {categoryLabel}
    </CategoryTag>
    
    <StatusIndicator status={status} />
  </Header>
  
  <Title>{deliverable.title}</Title>
  
  <Description>{deliverable.description}</Description>
  
  <SkillFocus>
    <Icon>📚</Icon>
    <Text>Skill: {deliverable.skill}</Text>
  </SkillFocus>
  
  <Footer>
    <Status>
      {statusIcon} {statusText}
      {progress && ` (${progress}%)`}
    </Status>
    
    <DueDate overdue={isOverdue}>
      Due: {formatDate(deliverable.dueDate)}
    </DueDate>
  </Footer>
  
  {deliverable.schoolOutcome && (
    <SchoolOutcome>
      <Icon>🎓</Icon>
      <Text>Maps to: {deliverable.schoolOutcome}</Text>
    </SchoolOutcome>
  )}
  
  {role === 'employer' && (
    <Actions>
      <Button variant="ghost" onClick={handleEdit}>
        Edit
      </Button>
      <Button variant="ghost" onClick={handleDelete}>
        Delete
      </Button>
    </Actions>
  )}
</DeliverableCard>
```

**Visual Specs by Status**:

**Not Started**:
- Border: 2px solid slate-200
- Checkbox: Empty circle
- Opacity: 0.9

**In Progress**:
- Border: 2px solid blue-300
- Background: Blue-50 (subtle)
- Progress bar visible

**Completed**:
- Border: 2px solid emerald-300
- Background: Emerald-50 (subtle)
- Checkbox: Filled with checkmark
- Opacity: 0.8

**Overdue**:
- Border: 2px solid red-300
- Due date: Red text with warning icon

### **4. Category Tags**

```tsx
// Admin/Office
<CategoryTag category="admin">
  Admin
</CategoryTag>

// Customer Service
<CategoryTag category="customer">
  Service
</CategoryTag>

// Operations/Hands-On
<CategoryTag category="operations">
  Operations
</CategoryTag>

// R&D/Ideas
<CategoryTag category="rd">
  R&D
</CategoryTag>
```

**Visual Specs**:
```css
.category-tag {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.category-admin {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.category-customer {
  background: rgba(6, 182, 212, 0.1);
  color: #06b6d4;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.category-operations {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.category-rd {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.2);
}
```

---

## 📊 **Data Structures**

### **Deliverable**

```typescript
interface Deliverable {
  id: string;
  placementId: string;
  title: string;
  description: string;
  category: 'admin' | 'customer' | 'operations' | 'rd';
  skillFocus: string;
  expectedOutcome: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0-100
  dueDate: Date;
  createdAt: Date;
  createdBy: string; // Employer ID
  updatedAt: Date;
  completedAt?: Date;
  schoolOutcome?: string; // Optional learning objective mapping
  notes?: string;
  attachments?: string[];
  evaluationCriteria?: string[];
}
```

### **Category Definition**

```typescript
interface Category {
  id: 'admin' | 'customer' | 'operations' | 'rd';
  label: string;
  description: string;
  color: string;
  icon: string;
  examples: string[];
}

const CATEGORIES: Category[] = [
  {
    id: 'admin',
    label: 'Administration/Office',
    description: 'Office tasks, documentation, and administrative functions',
    color: '#8b5cf6',
    icon: '📋',
    examples: [
      'Create SOPs',
      'File organization',
      'Email management',
      'Meeting notes',
    ],
  },
  {
    id: 'customer',
    label: 'Customer Service & POS',
    description: 'Customer-facing tasks and point of sale operations',
    color: '#06b6d4',
    icon: '👥',
    examples: [
      'POS system training',
      'Customer greetings',
      'Phone etiquette',
      'Handle complaints',
    ],
  },
  {
    id: 'operations',
    label: 'Operations/Hands-On',
    description: 'Physical tasks, maintenance, and operational procedures',
    color: '#10b981',
    icon: '🔧',
    examples: [
      'Inventory checks',
      'Restocking',
      'Equipment cleaning',
      'Safety inspections',
    ],
  },
  {
    id: 'rd',
    label: 'Research & Development',
    description: 'Brainstorming, ideas, and improvement suggestions',
    color: '#f59e0b',
    icon: '💡',
    examples: [
      'Improvement ideas',
      'Customer feedback analysis',
      'Process observations',
      'Innovation suggestions',
    ],
  },
];
```

### **School Outcome**

```typescript
interface SchoolOutcome {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'technical' | 'soft-skills';
  creditType?: string; // e.g., "CTE Credit", "English Credit"
}

const COMMON_OUTCOMES: SchoolOutcome[] = [
  {
    id: 'writing-skills',
    name: 'Writing Skills',
    description: 'Technical and professional writing',
    category: 'academic',
    creditType: 'English Credit',
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Verbal and written communication',
    category: 'soft-skills',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Critical thinking and issue resolution',
    category: 'soft-skills',
  },
  {
    id: 'technical-skills',
    name: 'Technical Skills',
    description: 'Industry-specific technical competencies',
    category: 'technical',
    creditType: 'CTE Credit',
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    description: 'Collaboration and team dynamics',
    category: 'soft-skills',
  },
  {
    id: 'time-management',
    name: 'Time Management',
    description: 'Planning and organization',
    category: 'soft-skills',
  },
];
```

---

## 📝 **Sample Deliverables**

### **Administration/Office**

```typescript
{
  id: 'del-001',
  title: 'Create HR SOPs',
  description: 'Help create Company/Organization Standard Operating Procedures (SOPs) for Student Co-Op Program',
  category: 'admin',
  skillFocus: 'Documentation & Technical Writing',
  expectedOutcome: 'Complete 3-page SOP document with clear steps for student onboarding',
  status: 'completed',
  progress: 100,
  dueDate: new Date('2024-02-20'),
  schoolOutcome: 'Writing Skills',
}
```

### **Customer Service & POS**

```typescript
{
  id: 'del-002',
  title: 'POS System Training',
  description: 'Learn and operate the POS (Point of Sale) system for basic transactions',
  category: 'customer',
  skillFocus: 'Customer Service & Technology',
  expectedOutcome: 'Successfully process 10 transactions independently with 100% accuracy',
  status: 'in-progress',
  progress: 60,
  dueDate: new Date('2024-02-25'),
  schoolOutcome: 'Technical Skills',
}
```

### **Operations/Hands-On**

```typescript
{
  id: 'del-003',
  title: 'Inventory Check',
  description: 'Assist with inventory check and restocking procedures',
  category: 'operations',
  skillFocus: 'Organization & Attention to Detail',
  expectedOutcome: 'Complete weekly inventory count with less than 2% discrepancy',
  status: 'not-started',
  progress: 0,
  dueDate: new Date('2024-03-01'),
  schoolOutcome: 'Problem Solving',
}
```

### **Research & Development**

```typescript
{
  id: 'del-004',
  title: 'Customer Experience Ideas',
  description: 'Brainstorm and document 3 new ideas to improve customer experience',
  category: 'rd',
  skillFocus: 'Critical Thinking & Innovation',
  expectedOutcome: '3 documented ideas with pros/cons and implementation suggestions',
  status: 'in-progress',
  progress: 33,
  dueDate: new Date('2024-03-05'),
  schoolOutcome: 'Communication',
}
```

---

## ➕ **Add Deliverable Form**

### **Form Structure**

```
┌─────────────────────────────────────────┐
│ Add New Deliverable             [X]     │
├─────────────────────────────────────────┤
│                                         │
│ Category *                              │
│ ┌─────────────────────────────────────┐ │
│ │ [📋 Admin] [👥 Service]            │ │
│ │ [🔧 Operations] [💡 R&D]           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Title *                                 │
│ [________________________]              │
│                                         │
│ Description *                           │
│ [________________________]              │
│ [________________________]              │
│ [________________________]              │
│                                         │
│ Skill Focus *                           │
│ [________________________]              │
│                                         │
│ Expected Outcome *                      │
│ (What should the student achieve?)      │
│ [________________________]              │
│ [________________________]              │
│                                         │
│ Due Date *                              │
│ [MM/DD/YYYY ▼]                         │
│                                         │
│ School Learning Outcome (Optional)      │
│ [Select outcome... ▼]                  │
│ • Writing Skills                        │
│ • Communication                         │
│ • Problem Solving                       │
│ • Technical Skills                      │
│ • Teamwork                              │
│                                         │
│ ✓ Make this suitable for high school   │
│   students (age 16-18)                  │
│                                         │
│        [Cancel]  [Create Deliverable]   │
└─────────────────────────────────────────┘
```

### **Form Validation**

```typescript
interface FormErrors {
  category?: string;
  title?: string;
  description?: string;
  skillFocus?: string;
  expectedOutcome?: string;
  dueDate?: string;
}

const validateForm = (data: DeliverableForm): FormErrors => {
  const errors: FormErrors = {};

  if (!data.category) {
    errors.category = 'Please select a category';
  }

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }

  if (!data.description || data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  if (!data.skillFocus) {
    errors.skillFocus = 'Please specify the skill focus';
  }

  if (!data.expectedOutcome || data.expectedOutcome.trim().length < 10) {
    errors.expectedOutcome = 'Please describe expected outcome';
  }

  if (!data.dueDate) {
    errors.dueDate = 'Please select a due date';
  } else if (new Date(data.dueDate) < new Date()) {
    errors.dueDate = 'Due date must be in the future';
  }

  return errors;
};
```

---

## 🎯 **User Roles & Permissions**

### **Employer**
- ✅ Create deliverables
- ✅ Edit deliverables
- ✅ Delete deliverables
- ✅ Mark deliverables as complete
- ✅ Update progress percentage
- ✅ View all student deliverables

### **Student**
- ✅ View assigned deliverables
- ✅ Update progress (self-assessment)
- ✅ Add notes/comments
- ✅ Upload work samples
- ❌ Cannot create deliverables
- ❌ Cannot delete deliverables
- ❌ Cannot mark as complete (employer only)

### **School Co-Op Admin**
- ✅ View all deliverables across placements
- ✅ Map to school learning outcomes
- ✅ Generate reports by skill/outcome
- ✅ Export for transcript/credit
- ✅ Suggest deliverables to employers
- ❌ Cannot edit employer-created deliverables

---

## 📊 **Progress Tracking**

### **Progress States**

```typescript
type ProgressState = {
  status: 'not-started' | 'in-progress' | 'completed';
  percentage: number; // 0-100
  lastUpdated: Date;
  updatedBy: string;
};

// Visual indicators
const PROGRESS_INDICATORS = {
  'not-started': {
    icon: '○',
    color: 'slate-400',
    label: 'Not Started',
  },
  'in-progress': {
    icon: '◐',
    color: 'blue-500',
    label: 'In Progress',
  },
  'completed': {
    icon: '✓',
    color: 'emerald-500',
    label: 'Completed',
  },
};
```

### **Progress Bar Component**

```tsx
<ProgressBar>
  <Fill percentage={progress} status={status} />
  <Label>{progress}% Complete</Label>
</ProgressBar>

// CSS
.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--status-in-progress);
  transition: width 0.3s ease;
}

.progress-fill.completed {
  background: var(--status-completed);
}
```

---

## 🎓 **School Outcome Mapping**

### **Mapping Interface**

```tsx
<SchoolOutcomeSelector>
  <Label>
    Map to School Learning Outcome (Optional)
  </Label>
  
  <Select value={selectedOutcome} onChange={handleSelect}>
    <optgroup label="Academic Skills">
      <option value="writing-skills">Writing Skills</option>
      <option value="math-skills">Math Skills</option>
      <option value="reading-comprehension">Reading Comprehension</option>
    </optgroup>
    
    <optgroup label="Technical Skills">
      <option value="technical-skills">Technical Skills</option>
      <option value="computer-literacy">Computer Literacy</option>
      <option value="industry-specific">Industry-Specific Skills</option>
    </optgroup>
    
    <optgroup label="Soft Skills">
      <option value="communication">Communication</option>
      <option value="teamwork">Teamwork</option>
      <option value="problem-solving">Problem Solving</option>
      <option value="time-management">Time Management</option>
      <option value="work-ethic">Work Ethic</option>
    </optgroup>
  </Select>
  
  {selectedOutcome && (
    <OutcomeInfo>
      <Icon>🎓</Icon>
      <Text>
        {outcomes[selectedOutcome].description}
        {outcomes[selectedOutcome].creditType && (
          <CreditBadge>
            {outcomes[selectedOutcome].creditType}
          </CreditBadge>
        )}
      </Text>
    </OutcomeInfo>
  )}
</SchoolOutcomeSelector>
```

---

## 🔗 **Integration Points**

### **Time Logs**

```typescript
// Link deliverables to time log entries
interface TimeLogEntry {
  id: string;
  studentId: string;
  date: Date;
  clockIn: string;
  clockOut: string;
  deliverableWorkedOn?: string; // Deliverable ID
  progressMade?: string; // Description
  skillsPracticed?: string[];
}
```

### **Evaluations**

```typescript
// Include deliverables in performance evaluations
interface Evaluation {
  id: string;
  placementId: string;
  date: Date;
  deliverableProgress: {
    deliverableId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    feedback: string;
  }[];
  overallRating: number;
}
```

### **Coordinator Dashboard**

```typescript
// Admin view of deliverables across all placements
interface CoordinatorView {
  totalDeliverables: number;
  completedDeliverables: number;
  byCategory: {
    admin: number;
    customer: number;
    operations: number;
    rd: number;
  };
  byOutcome: {
    [outcome: string]: number;
  };
  studentsWithOverdueDeliverables: Student[];
}
```

### **DOL Reporting**

```typescript
// Include in WIOA/Perkins reporting
interface DOLReport {
  placementId: string;
  skillsAcquired: string[]; // From deliverable skill focus
  competenciesAchieved: string[]; // From completed deliverables
  learningOutcomes: string[]; // From school outcome mapping
  hoursSpentOnDeliverables: number;
}
```

---

## 📱 **Mobile UI States**

### **State 1: Empty State (No Deliverables)**

```
┌─────────────────────────────────────────┐
│ [Student Header Card]                   │
├─────────────────────────────────────────┤
│                                         │
│          📋                              │
│                                         │
│     No deliverables yet                 │
│                                         │
│  Employers can add deliverables to      │
│  track learning objectives and skills   │
│                                         │
│  [+ Add First Deliverable]              │
│                                         │
└─────────────────────────────────────────┘
```

### **State 2: List View (Multiple Deliverables)**

```
┌─────────────────────────────────────────┐
│ [Student Header]                        │
│ [Progress Summary: 2/5 complete]        │
├─────────────────────────────────────────┤
│ [✓ Completed Deliverable Card]         │
│ [◐ In Progress Deliverable Card]       │
│ [○ Not Started Deliverable Card]       │
│ [○ Not Started Deliverable Card]       │
│ [○ Not Started Deliverable Card]       │
├─────────────────────────────────────────┤
│ [+ Add New Deliverable]                 │
└─────────────────────────────────────────┘
```

### **State 3: Filtered View**

```
┌─────────────────────────────────────────┐
│ ← Back         Filtering: In Progress   │
├─────────────────────────────────────────┤
│ Showing 2 deliverables                  │
├─────────────────────────────────────────┤
│ [◐ In Progress Card 1]                 │
│ [◐ In Progress Card 2]                 │
├─────────────────────────────────────────┤
│ [Clear Filter]                          │
└─────────────────────────────────────────┘
```

### **State 4: Deliverable Detail View**

```
┌─────────────────────────────────────────┐
│ ← Back        POS System Training       │
├─────────────────────────────────────────┤
│ [Customer Service] In Progress (60%)    │
│                                         │
│ Description:                            │
│ Learn and operate the POS (Point of     │
│ Sale) system for basic transactions     │
│                                         │
│ Skill Focus:                            │
│ Customer Service & Technology           │
│                                         │
│ Expected Outcome:                       │
│ Successfully process 10 transactions    │
│ independently with 100% accuracy        │
│                                         │
│ Due: Feb 25, 2024 (5 days left)        │
│                                         │
│ 🎓 Maps to: Technical Skills (CTE)     │
│                                         │
│ Progress Log:                           │
│ • Feb 12: Started training (20%)        │
│ • Feb 14: Practiced 5 transactions (60%)│
│                                         │
│ [Update Progress]  [Add Note]           │
│ [Mark Complete]                         │
└─────────────────────────────────────────┘
```

---

## 🎨 **Component Measurements**

```css
/* Header */
.page-header {
  height: 56px;
  padding: 0 16px;
}

/* Student Header Card */
.student-header-card {
  padding: 16px;
  margin: 16px;
  border-radius: 12px;
  border: 1px solid var(--slate-200);
}

/* Progress Summary */
.progress-summary {
  padding: 12px 16px;
  margin: 0 16px 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
}

/* Deliverable Card */
.deliverable-card {
  padding: 16px;
  margin: 0 16px 12px;
  border-radius: 12px;
  border: 2px solid var(--slate-200);
  min-height: 140px;
}

/* Category Tag */
.category-tag {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
}

/* Status Indicator */
.status-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

/* Add Button */
.add-deliverable-button {
  height: 48px;
  margin: 16px;
  border-radius: 8px;
  font-size: 16px;
}

/* Form Modal */
.form-modal {
  max-height: 80vh;
  padding: 16px;
  border-radius: 16px 16px 0 0;
}
```

---

## ✅ **Deliverable Templates**

### **Template Library**

```typescript
const DELIVERABLE_TEMPLATES = [
  // Administration
  {
    category: 'admin',
    title: 'Create Standard Operating Procedures',
    description: 'Help create Company/Organization SOPs for {specific area}',
    skillFocus: 'Documentation & Technical Writing',
    expectedOutcome: 'Complete {number}-page SOP document with clear steps',
  },
  {
    category: 'admin',
    title: 'Email and Calendar Management',
    description: 'Learn professional email etiquette and schedule coordination',
    skillFocus: 'Communication & Organization',
    expectedOutcome: 'Manage inbox and schedule appointments for one week',
  },
  
  // Customer Service
  {
    category: 'customer',
    title: 'POS System Training',
    description: 'Learn and operate the POS system for basic transactions',
    skillFocus: 'Customer Service & Technology',
    expectedOutcome: 'Process 10 transactions independently with 100% accuracy',
  },
  {
    category: 'customer',
    title: 'Customer Greeting Protocol',
    description: 'Practice professional customer greetings and assistance',
    skillFocus: 'Communication & Service',
    expectedOutcome: 'Greet and assist 20 customers following company standards',
  },
  
  // Operations
  {
    category: 'operations',
    title: 'Inventory Management',
    description: 'Assist with inventory check and restocking procedures',
    skillFocus: 'Organization & Attention to Detail',
    expectedOutcome: 'Complete weekly inventory count with <2% discrepancy',
  },
  {
    category: 'operations',
    title: 'Equipment Safety & Maintenance',
    description: 'Learn safety procedures and basic equipment maintenance',
    skillFocus: 'Safety & Responsibility',
    expectedOutcome: 'Pass safety quiz and perform daily maintenance checks',
  },
  
  // R&D
  {
    category: 'rd',
    title: 'Customer Experience Improvement Ideas',
    description: 'Brainstorm and document new ideas to improve customer experience',
    skillFocus: 'Critical Thinking & Innovation',
    expectedOutcome: '3 documented ideas with pros/cons and implementation plan',
  },
  {
    category: 'rd',
    title: 'Process Improvement Observations',
    description: 'Observe current processes and suggest efficiency improvements',
    skillFocus: 'Analysis & Problem Solving',
    expectedOutcome: 'Written report with 2-3 improvement recommendations',
  },
];
```

---

## 🔔 **Notifications**

### **For Students**

```
New deliverable assigned:
"POS System Training" 
Due: Feb 25
Tap to view details
```

### **For Employers**

```
Student updated progress:
Maya Santos completed "Create HR SOPs"
View deliverable →
```

### **For Admins**

```
Weekly Deliverables Summary:
• 12 completed this week
• 3 overdue across all placements
View report →
```

---

## 📊 **Reporting Views**

### **Employer View: Student Progress**

```
Maya Santos - Overall Progress

Deliverables: 2/5 Completed (40%)

By Category:
• Admin: 1/1 ✓
• Customer Service: 1/2 (50%)
• Operations: 0/1
• R&D: 0/1

Skills Acquired:
✓ Documentation
✓ Customer Service
⏳ Organization
⏳ Critical Thinking

Completion Timeline:
[Visual chart showing completion dates]
```

### **Admin View: Program-Wide**

```
Co-Op Deliverables Report
All Placements - February 2024

Total Deliverables: 47
• Completed: 18 (38%)
• In Progress: 21 (45%)
• Not Started: 8 (17%)

By Category:
• Admin: 12 (26%)
• Customer Service: 15 (32%)
• Operations: 13 (28%)
• R&D: 7 (15%)

Top Skills Developed:
1. Customer Service (15 students)
2. Communication (12 students)
3. Organization (10 students)

School Outcomes Achieved:
• Writing Skills: 8 students
• Technical Skills: 12 students
• Problem Solving: 6 students
```

---

**ZALPHA Co-Op Deliverables - Tracking Skills & Outcomes** 📋✅🎓
