# ZALPHA Co-Op Messaging System - Design Specification
## Mobile-First Direct Messaging for Student-Employer-Admin Communication

---

## 🎯 **Purpose**

A chat-style messaging interface that allows students to communicate with their co-op employers about attendance issues (late, time-off, cannot attend), automatically CC'ing the school co-op administrator for compliance and record-keeping.

---

## 📱 **Screen Layout (390x844 Mobile)**

```
┌─────────────────────────────────────────┐
│ ← Co-Op Messages              🔔 [...]  │ ← Header
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Placement Summary Card              │ │
│ │ Maya Santos • Paradise Hotel        │ │
│ │ Front Desk Assistant                │ │
│ │ Mon-Fri 9:00 AM - 2:00 PM          │ │
│ │ Today's Shift: 9:00 AM - 2:00 PM   │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🔒 Recorded Channel                     │ ← Compliance banner
│ All messages stored for attendance      │
├─────────────────────────────────────────┤
│                                         │
│ ┌───────────────────────────┐          │
│ │ Admin                      │          │ ← Admin bubble
│ │ Welcome! I'm here to help │          │
│ │ 9:45 AM • Acknowledged     │          │
│ └───────────────────────────┘          │
│                                         │
│          ┌───────────────────────────┐ │
│          │ Hi, I need to request    │ │ ← Student bubble
│          │ time off for Friday      │ │
│          │ 10:15 AM                 │ │
│          └───────────────────────────┘ │
│          📎 Shared with admin          │
│                                         │
│ ┌───────────────────────────┐          │
│ │ Employer                  │          │ ← Employer bubble
│ │ That works! Approved ✓    │          │
│ │ 10:32 AM • Approved       │          │
│ └───────────────────────────┘          │
│                                         │
│ [Scroll for more messages]              │
│                                         │
├─────────────────────────────────────────┤
│ Quick Templates:                        │ ← Templates
│ [🕐 I'll be late] [📅 Time off]        │
│ [❌ Cannot attend]                      │
├─────────────────────────────────────────┤
│ Type your message...            [Send]  │ ← Message input
│                                         │
│ 🔗 Attach file/photo                   │
└─────────────────────────────────────────┘
```

---

## 🎨 **Visual Design System**

### **Color Palette** (ZALPHA Pacific Theme)

```css
/* Primary Colors */
--zalpha-blue: #0ea5e9;      /* Sky-500 - Primary actions */
--zalpha-teal: #14b8a6;      /* Teal-500 - Success, approved */
--zalpha-navy: #0f172a;      /* Slate-900 - Headers */
--zalpha-ocean: #0c4a6e;     /* Sky-900 - Dark accents */

/* Role Colors */
--student-color: #3b82f6;    /* Blue-500 */
--employer-color: #10b981;   /* Emerald-500 */
--admin-color: #8b5cf6;      /* Violet-500 */

/* Status Colors */
--acknowledged: #64748b;     /* Slate-500 */
--approved: #10b981;         /* Emerald-500 */
--pending: #f59e0b;          /* Amber-500 */
--follow-up: #ef4444;        /* Red-500 */

/* Background */
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;     /* Slate-50 */
--bg-recorded: #fef3c7;      /* Amber-50 - Compliance banner */

/* Text */
--text-primary: #0f172a;     /* Slate-900 */
--text-secondary: #64748b;   /* Slate-500 */
--text-muted: #94a3b8;       /* Slate-400 */
```

### **Typography**

```css
/* Headers */
.header-title {
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Placement Summary */
.placement-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.placement-detail {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
}

/* Message Text */
.message-body {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-primary);
}

/* Timestamps */
.message-timestamp {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
}

/* Status Tags */
.status-tag {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Compliance Text */
.compliance-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}
```

### **Spacing System**

```css
/* Layout Padding */
--spacing-screen: 16px;      /* Screen edges */
--spacing-section: 12px;     /* Between sections */
--spacing-message: 8px;      /* Between messages */
--spacing-inline: 12px;      /* Inside cards */

/* Component Spacing */
--header-height: 56px;
--banner-height: 48px;
--input-height: 52px;
--template-height: 44px;
```

---

## 🏗️ **Component Structure**

### **1. Placement Summary Card**

```tsx
<PlacementSummaryCard>
  <StudentInfo>
    <Avatar src={student.avatar} />
    <Name>{student.name}</Name>
    <Text>•</Text>
    <EmployerName>{employer.name}</EmployerName>
  </StudentInfo>
  
  <RoleInfo>
    <Icon>💼</Icon>
    <RoleTitle>{placement.role}</RoleTitle>
  </RoleInfo>
  
  <ScheduleInfo>
    <Icon>📅</Icon>
    <Text>{placement.schedule}</Text>
  </ScheduleInfo>
  
  <TodayShift highlighted>
    <Icon>🕐</Icon>
    <Text>Today's Shift: {todayShift}</Text>
  </TodayShift>
</PlacementSummaryCard>
```

**Visual Specs**:
- Background: White card with subtle shadow
- Border: 1px solid slate-200
- Border radius: 12px
- Padding: 16px
- Margin bottom: 12px

### **2. Compliance Banner**

```tsx
<ComplianceBanner>
  <Icon>🔒</Icon>
  <TextGroup>
    <Title>Recorded Channel</Title>
    <Description>
      All messages stored for attendance & compliance tracking
    </Description>
  </TextGroup>
</ComplianceBanner>
```

**Visual Specs**:
- Background: Amber-50 (#fef3c7)
- Border: 1px solid amber-200
- Border radius: 8px
- Padding: 12px 16px
- Icon: Slate-600
- Text: Slate-700

### **3. Message Bubble**

```tsx
<MessageBubble role={role} alignment={alignment}>
  <Header>
    <Avatar src={sender.avatar} role={role} />
    <SenderLabel role={role}>{sender.role}</SenderLabel>
  </Header>
  
  <MessageBody>
    {message.content}
  </MessageBody>
  
  <Footer>
    <Timestamp>{message.timestamp}</Timestamp>
    {message.status && (
      <>
        <Separator>•</Separator>
        <StatusTag status={message.status}>
          {message.status}
        </StatusTag>
      </>
    )}
  </Footer>
  
  {message.ccAdmin && (
    <CCIndicator>
      📎 Shared with School Co-Op Admin
    </CCIndicator>
  )}
</MessageBubble>
```

**Visual Specs by Role**:

**Student** (right-aligned):
- Background: Blue-500 (#3b82f6)
- Text color: White
- Border radius: 16px 16px 4px 16px
- Max width: 280px
- Margin left: auto

**Employer** (left-aligned):
- Background: Emerald-50 (#ecfdf5)
- Text color: Slate-900
- Border: 1px solid emerald-200
- Border radius: 16px 16px 16px 4px
- Max width: 280px
- Margin right: auto

**Admin** (left-aligned):
- Background: Violet-50 (#f5f3ff)
- Text color: Slate-900
- Border: 1px solid violet-200
- Border radius: 16px 16px 16px 4px
- Max width: 280px
- Margin right: auto

### **4. Quick Templates**

```tsx
<TemplateContainer>
  <Label>Quick Templates:</Label>
  <TemplateButtons>
    <TemplateButton icon="🕐" onClick={selectLate}>
      I'll be late
    </TemplateButton>
    <TemplateButton icon="📅" onClick={selectTimeOff}>
      Time off
    </TemplateButton>
    <TemplateButton icon="❌" onClick={selectCannotAttend}>
      Cannot attend
    </TemplateButton>
  </TemplateButtons>
</TemplateContainer>
```

**Visual Specs**:
- Button background: White
- Border: 1px solid slate-300
- Border radius: 8px
- Padding: 10px 16px
- Font size: 14px
- Icon + text layout
- Active state: Blue-500 border + blue-50 background

### **5. Message Input**

```tsx
<MessageInputContainer>
  <InputField
    placeholder="Type your message..."
    value={message}
    onChange={handleChange}
    multiline
    maxRows={4}
  />
  
  <ActionButtons>
    <AttachButton>
      📎 Attach file/photo
    </AttachButton>
    
    <SendButton 
      disabled={!message.trim()}
      onClick={handleSend}
    >
      Send
    </SendButton>
  </ActionButtons>
</MessageInputContainer>
```

**Visual Specs**:
- Container background: White
- Border top: 1px solid slate-200
- Padding: 12px 16px
- Input border: 1px solid slate-300
- Input border radius: 8px
- Send button: Blue-500 background
- Send button disabled: Slate-300 background

---

## 💬 **Message Templates**

### **Template 1: I'll be late**

```
Pre-filled message:
"Hi, I will be late to my shift today. 
Expected arrival time: [TIME_PICKER]

Reason: [SHORT_TEXT_INPUT]

Sorry for the inconvenience."
```

**Fields**:
- Time picker (pre-filled with +30 mins from shift start)
- Reason (optional, max 100 chars)

### **Template 2: Time off request**

```
Pre-filled message:
"Hi, I would like to request time off on:

Date: [DATE_PICKER]
Reason: [SHORT_TEXT_INPUT]

Please let me know if this works. Thank you!"
```

**Fields**:
- Date picker (disabled for past dates)
- Reason (required, max 150 chars)

### **Template 3: Cannot attend**

```
Pre-filled message:
"Hi, I am unable to attend my shift today [DATE].

Reason: [SHORT_TEXT_INPUT]

I apologize for the short notice."
```

**Fields**:
- Date (auto-filled with today)
- Reason (required, max 150 chars)

---

## 📊 **Data Structure**

### **Placement**

```typescript
interface Placement {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  employerId: string;
  employerName: string;
  employerAvatar: string;
  adminId: string;
  adminName: string;
  adminAvatar: string;
  role: string;
  schedule: string;
  todayShift: {
    start: string; // "9:00 AM"
    end: string;   // "2:00 PM"
  } | null;
  status: 'active' | 'paused' | 'completed';
}
```

### **Message**

```typescript
interface Message {
  id: string;
  placementId: string;
  threadId: string;
  senderId: string;
  senderRole: 'student' | 'employer' | 'admin';
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'template' | 'system';
  templateType?: 'late' | 'time-off' | 'cannot-attend';
  ccAdmin: boolean; // Always true for student messages
  status?: 'pending' | 'acknowledged' | 'approved' | 'denied' | 'follow-up';
  attachments?: Attachment[];
  metadata: {
    recorded: true;
    ipAddress: string;
    deviceInfo: string;
  };
}
```

### **Thread**

```typescript
interface MessageThread {
  id: string;
  placementId: string;
  participants: {
    student: Participant;
    employer: Participant;
    admin: Participant;
  };
  messages: Message[];
  status: 'active' | 'resolved' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  recordedFor: 'attendance' | 'compliance';
}
```

### **Status Tags**

```typescript
type MessageStatus = 
  | 'pending'        // Awaiting response
  | 'acknowledged'   // Read by recipient
  | 'approved'       // Time-off approved
  | 'denied'         // Request denied
  | 'follow-up';     // Needs more info
```

---

## 🎭 **User Roles & Permissions**

### **Student**
- ✅ Can send messages to employer (auto-CC admin)
- ✅ Can use quick templates
- ✅ Can attach files/photos
- ✅ Can view all messages in thread
- ❌ Cannot delete messages
- ❌ Cannot edit sent messages

### **Employer**
- ✅ Can reply to student messages
- ✅ Can change message status (approve/deny)
- ✅ Can view all messages in thread
- ❌ Cannot initiate new threads (student starts)
- ❌ Cannot delete messages

### **School Co-Op Admin**
- ✅ Can view all messages (auto-CC'd)
- ✅ Can reply to any message
- ✅ Can mark messages for follow-up
- ✅ Can export thread for records
- ✅ Can view compliance metadata
- ❌ Cannot delete messages

---

## 🔔 **Notification Flow**

### **When Student Sends Message**

```
Student sends → Message saved → Notifications sent:

1. Employer: Push notification
   "Maya Santos: I will be late to my shift today"
   
2. Admin: Email notification (compliance copy)
   Subject: [RECORDED] Student message - Maya Santos
   
3. Student: Confirmation toast
   "Message sent and shared with School Co-Op Admin"
```

### **When Employer Replies**

```
Employer replies → Message saved → Notifications sent:

1. Student: Push notification
   "Paradise Hotel: That works! Approved ✓"
   
2. Admin: Email notification (thread update)
   Subject: [UPDATE] Co-op thread - Maya Santos
```

### **When Admin Replies**

```
Admin replies → Message saved → Notifications sent:

1. Student: Push notification
   "Admin Garcia: Thanks for letting us know"
   
2. Employer: Push notification
   "Admin Garcia responded to Maya's request"
```

---

## 📱 **Mobile UI States**

### **State 1: Empty Thread (First Use)**

```
┌─────────────────────────────────────────┐
│ [Placement Summary Card]                │
├─────────────────────────────────────────┤
│ 🔒 Recorded Channel                     │
├─────────────────────────────────────────┤
│                                         │
│          ┌───────────────────────┐     │
│          │ 👋 Start a           │     │
│          │ conversation          │     │
│          │                       │     │
│          │ Use quick templates  │     │
│          │ below to message     │     │
│          │ your employer        │     │
│          └───────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│ Quick Templates:                        │
│ [🕐 I'll be late] [📅 Time off]        │
│ [❌ Cannot attend]                      │
├─────────────────────────────────────────┤
│ Type your message...            [Send]  │
└─────────────────────────────────────────┘
```

### **State 2: Active Conversation**

```
┌─────────────────────────────────────────┐
│ [Placement Summary Card]                │
├─────────────────────────────────────────┤
│ 🔒 Recorded Channel                     │
├─────────────────────────────────────────┤
│ [Scrollable message thread]             │
│                                         │
│ Admin: "Welcome..."                     │
│ Student: "I need time off..."           │
│   📎 Shared with admin                  │
│ Employer: "Approved ✓"                  │
│ Admin: "Noted for records"              │
│                                         │
├─────────────────────────────────────────┤
│ Quick Templates:                        │
│ [🕐 I'll be late] [📅 Time off]        │
├─────────────────────────────────────────┤
│ Type your message...            [Send]  │
└─────────────────────────────────────────┘
```

### **State 3: Template Selected**

```
┌─────────────────────────────────────────┐
│ 🕐 I'll be late - Template              │
│                              [X] Cancel  │
├─────────────────────────────────────────┤
│ Hi, I will be late to my shift today.   │
│                                         │
│ Expected arrival time:                  │
│ [10:00 AM ▼]                           │
│                                         │
│ Reason (optional):                      │
│ [Traffic on Beach Road________]         │
│                                         │
│ Sorry for the inconvenience.            │
│                                         │
│ ✓ This will be shared with your        │
│   School Co-Op Admin                    │
│                                         │
│              [Cancel]  [Send Message]   │
└─────────────────────────────────────────┘
```

### **State 4: Message Sent Confirmation**

```
┌─────────────────────────────────────────┐
│ ✓ Message sent!                         │ ← Toast
│ Shared with School Co-Op Admin          │
└─────────────────────────────────────────┘

[Thread updates with new message]

          ┌───────────────────────────┐
          │ Hi, I will be late to my │
          │ shift today...           │
          │ 10:15 AM • Pending       │
          └───────────────────────────┘
          📎 Shared with admin
```

---

## 🎨 **Visual Differentiation**

### **Sender Avatars**

```css
/* Student Avatar */
.avatar-student {
  border: 2px solid var(--student-color);
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

/* Employer Avatar */
.avatar-employer {
  border: 2px solid var(--employer-color);
  background: linear-gradient(135deg, #10b981, #059669);
}

/* Admin Avatar */
.avatar-admin {
  border: 2px solid var(--admin-color);
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}
```

### **Role Labels**

```tsx
// Student
<RoleLabel color="blue">
  👤 Student
</RoleLabel>

// Employer
<RoleLabel color="green">
  🏢 Employer
</RoleLabel>

// Admin
<RoleLabel color="violet">
  🎓 School Co-Op Admin
</RoleLabel>
```

### **Status Tags**

```tsx
// Pending
<StatusTag color="amber">
  ⏳ Pending
</StatusTag>

// Acknowledged
<StatusTag color="slate">
  👁️ Acknowledged
</StatusTag>

// Approved
<StatusTag color="green">
  ✓ Approved
</StatusTag>

// Follow-up required
<StatusTag color="red">
  ⚠️ Follow-up Required
</StatusTag>
```

---

## 🔗 **Integration Points**

### **Time Logs System**

```typescript
// When message involves attendance
interface AttendanceRecord {
  placementId: string;
  studentId: string;
  date: Date;
  shiftStart: string;
  shiftEnd: string;
  status: 'on-time' | 'late' | 'absent' | 'time-off';
  messageThreadId: string; // Link to messaging
  excuseNote: string; // From message
  approvedBy: string; // Employer ID
  recordedAt: Date;
}
```

### **Compliance Tracking**

```typescript
// All messages stored with metadata
interface ComplianceLog {
  messageId: string;
  placementId: string;
  studentId: string;
  employerId: string;
  adminId: string;
  timestamp: Date;
  ipAddress: string;
  deviceInfo: string;
  messageType: 'late' | 'time-off' | 'absent' | 'general';
  recorded: true; // Always true
  retentionDate: Date; // 7 years for FERPA
}
```

### **Admin Dashboard**

```typescript
// Admin can view all threads
interface AdminThreadView {
  allPlacements: Placement[];
  activeThreads: MessageThread[];
  pendingActions: Message[]; // Needs follow-up
  complianceExport: () => void;
}
```

---

## ✅ **Accessibility**

### **Screen Reader Support**

```tsx
<div 
  role="region" 
  aria-label="Co-op messaging thread"
  aria-live="polite"
>
  {messages.map(msg => (
    <div 
      role="article"
      aria-label={`Message from ${msg.senderRole} at ${msg.timestamp}`}
    >
      {msg.content}
    </div>
  ))}
</div>
```

### **Keyboard Navigation**

- Tab: Navigate through messages
- Enter: Open message details
- Escape: Close template modal
- Space: Select template button

### **Color Contrast**

All text meets WCAG AA standards:
- White text on blue-500: 4.5:1
- Dark text on light backgrounds: 7:1+
- Status tags: 4.5:1 minimum

---

## 📏 **Measurements**

```css
/* Header */
.header {
  height: 56px;
  padding: 0 16px;
}

/* Placement Summary Card */
.placement-summary {
  padding: 16px;
  margin: 12px 16px;
  border-radius: 12px;
}

/* Compliance Banner */
.compliance-banner {
  padding: 12px 16px;
  margin: 0 16px 12px;
  border-radius: 8px;
}

/* Message Bubble */
.message-bubble {
  max-width: 280px;
  padding: 12px 16px;
  margin: 8px 16px;
  border-radius: 16px;
}

/* Template Button */
.template-button {
  height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  font-size: 14px;
}

/* Message Input */
.message-input {
  min-height: 52px;
  padding: 12px 16px;
  border-radius: 8px;
}
```

---

## 🧪 **Testing Scenarios**

### **Scenario 1: Student requests time off**
1. Student selects "Time off" template
2. Picks date, enters reason
3. Sends message
4. Employer receives notification
5. Admin receives email
6. Employer approves
7. Student receives approval notification
8. Admin logs approval
9. Time log system updates

### **Scenario 2: Student will be late**
1. Student selects "I'll be late" template
2. Picks expected time, enters reason
3. Sends message
4. Employer acknowledges
5. Admin is notified
6. Student arrives (GPS clock-in)
7. Time log shows "late" status
8. Message thread attached to time log

### **Scenario 3: Admin needs follow-up**
1. Student reports cannot attend
2. Admin marks "Follow-up required"
3. Admin asks for documentation
4. Student uploads photo
5. Admin approves excuse
6. Employer is notified
7. Absence marked as excused

---

## 🚀 **Engineering Notes**

### **Backend API Endpoints**

```typescript
// Messages
POST   /api/placements/:id/messages     // Send message
GET    /api/placements/:id/messages     // Get thread
PUT    /api/messages/:id/status         // Update status

// Templates
GET    /api/message-templates           // Get templates

// Compliance
GET    /api/admin/compliance-logs       // Export logs
```

### **Real-time Updates**

```typescript
// WebSocket for live messages
socket.on('new-message', (message) => {
  // Update thread in real-time
});

socket.on('status-change', (update) => {
  // Update message status
});
```

### **File Storage**

```typescript
// Supabase Storage for attachments
const uploadAttachment = async (file: File) => {
  const path = `co-op-messages/${placementId}/${messageId}/${file.name}`;
  const { data } = await supabase.storage
    .from('make-9bd83859-coop-attachments')
    .upload(path, file);
  return data.path;
};
```

---

## 📋 **Component Checklist**

- [ ] Placement Summary Card
- [ ] Compliance Banner
- [ ] Message Thread Container
- [ ] Message Bubble (Student)
- [ ] Message Bubble (Employer)
- [ ] Message Bubble (Admin)
- [ ] CC Indicator
- [ ] Status Tags
- [ ] Quick Template Buttons
- [ ] Template Modal (Late)
- [ ] Template Modal (Time Off)
- [ ] Template Modal (Cannot Attend)
- [ ] Message Input Field
- [ ] Send Button
- [ ] Attach File Button
- [ ] Loading States
- [ ] Error States
- [ ] Empty State
- [ ] Success Toast

---

**ZALPHA Co-Op Messaging - Connecting Students, Employers, and Administrators** 📱✉️🎓
