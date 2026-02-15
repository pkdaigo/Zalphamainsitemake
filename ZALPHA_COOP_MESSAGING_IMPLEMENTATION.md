# ZALPHA Co-Op Messaging - Implementation Guide
## Quick Start for Engineering Integration

---

## 🚀 **What's Included**

1. **Design Specification** (`ZALPHA_COOP_MESSAGING_DESIGN_SPEC.md`)
   - Complete visual design system
   - Component structure
   - Data structures
   - User roles and permissions
   - Integration points
   - Compliance requirements

2. **React Component** (`CoOpMessaging.tsx`)
   - Full mobile-first implementation
   - Message bubbles with role differentiation
   - Quick templates (late, time-off, cannot-attend)
   - Template modals with form inputs
   - Placement summary card
   - Compliance banner
   - Message input with file attachment
   - Real-time status updates

3. **Demo Page** (`CoOpMessagingDemo.tsx`)
   - Interactive demo
   - Feature highlights
   - Template examples
   - Integration documentation

---

## 📱 **Component Usage**

### **Basic Integration**

```tsx
import { CoOpMessaging } from '@/app/components/CoOpMessaging';

function StudentDashboard() {
  return (
    <div>
      <CoOpMessaging />
    </div>
  );
}
```

### **With Real Data**

```tsx
import { CoOpMessaging } from '@/app/components/CoOpMessaging';

function StudentDashboard() {
  const { placement, messages } = useCoOpData();

  return (
    <CoOpMessaging
      placement={placement}
      initialMessages={messages}
      currentUserId={user.id}
      currentUserRole={user.role}
      onSendMessage={handleSendMessage}
    />
  );
}
```

---

## 🎨 **Customization**

### **Change Colors**

```tsx
// In CoOpMessaging.tsx, modify role colors
const getRoleColor = () => {
  switch (message.senderRole) {
    case 'student': return 'blue'; // Change to your brand color
    case 'employer': return 'emerald';
    case 'admin': return 'violet';
  }
};
```

### **Add New Template**

```tsx
// In QuickTemplates component
<Button
  variant="outline"
  size="sm"
  onClick={() => onSelectTemplate('sick-leave')}
>
  <Heart className="w-4 h-4 mr-1.5" />
  Sick leave
</Button>

// In TemplateModal component
case 'sick-leave':
  return `Hi, I am feeling unwell today and need to take sick leave.

Symptoms: ${reason}

I will keep you updated on my recovery. Thank you for understanding.`;
```

### **Modify Template Fields**

```tsx
// Add new field in TemplateModal
const [attachDoctor, setAttachDoctor] = useState(false);

{type === 'sick-leave' && (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={attachDoctor}
      onChange={(e) => setAttachDoctor(e.target.checked)}
    />
    <label className="text-sm">I have a doctor's note</label>
  </div>
)}
```

---

## 🔌 **Backend Integration**

### **API Endpoints**

```typescript
// Send message
POST /api/placements/:placementId/messages
Body: {
  content: string;
  type: 'text' | 'template';
  templateType?: 'late' | 'time-off' | 'cannot-attend';
  attachments?: string[];
}

// Get messages
GET /api/placements/:placementId/messages
Response: {
  messages: Message[];
  participants: {
    student: Participant;
    employer: Participant;
    admin: Participant;
  };
}

// Update message status
PUT /api/messages/:messageId/status
Body: {
  status: 'acknowledged' | 'approved' | 'denied' | 'follow-up';
}

// Export thread for compliance
GET /api/placements/:placementId/messages/export
Response: PDF or CSV file
```

### **WebSocket for Real-time Updates**

```typescript
// Client-side
const socket = io('wss://your-server.com');

socket.on('connect', () => {
  socket.emit('join-placement', { placementId });
});

socket.on('new-message', (message: Message) => {
  setMessages(prev => [...prev, message]);
});

socket.on('status-update', (update: { messageId: string; status: string }) => {
  setMessages(prev => prev.map(m => 
    m.id === update.messageId 
      ? { ...m, status: update.status } 
      : m
  ));
});
```

### **Server-side (Supabase Edge Function)**

```typescript
// /supabase/functions/server/coop-messaging.tsx

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store';

const app = new Hono();

// Send message
app.post('/make-server-9bd83859/coop-messages/:placementId', async (c) => {
  const { placementId } = c.req.param();
  const { content, type, templateType } = await c.req.json();
  const userId = c.get('userId'); // From auth middleware

  // Save message
  const message = {
    id: crypto.randomUUID(),
    placementId,
    senderId: userId,
    content,
    type,
    templateType,
    ccAdmin: true,
    timestamp: new Date().toISOString(),
    metadata: {
      recorded: true,
      ipAddress: c.req.header('cf-connecting-ip'),
      deviceInfo: c.req.header('user-agent'),
    },
  };

  // Store in KV (key: `coop-message:${placementId}:${messageId}`)
  await kv.set(`coop-message:${placementId}:${message.id}`, message);

  // Get placement info
  const placement = await kv.get(`placement:${placementId}`);

  // Send notifications
  await sendNotification({
    to: placement.employerId,
    type: 'push',
    title: 'New message from student',
    body: content,
  });

  await sendNotification({
    to: placement.adminId,
    type: 'email',
    subject: '[RECORDED] Student message',
    body: `Student sent message: ${content}`,
  });

  // Broadcast via WebSocket
  await broadcastMessage('new-message', message);

  return c.json({ success: true, message });
});

// Get messages
app.get('/make-server-9bd83859/coop-messages/:placementId', async (c) => {
  const { placementId } = c.req.param();

  // Get all messages for placement
  const messageKeys = await kv.getByPrefix(`coop-message:${placementId}`);
  const messages = messageKeys.map(k => k.value);

  return c.json({ messages });
});

// Update status
app.put('/make-server-9bd83859/coop-messages/:messageId/status', async (c) => {
  const { messageId } = c.req.param();
  const { status } = await c.req.json();

  // Update message
  const messageKey = await kv.getByPrefix(`coop-message:*:${messageId}`);
  const message = messageKey[0].value;
  message.status = status;

  await kv.set(messageKey[0].key, message);

  // Broadcast status update
  await broadcastMessage('status-update', { messageId, status });

  return c.json({ success: true });
});

export default app;
```

---

## 📊 **Data Flow**

### **Sending a Message**

```
1. Student clicks template or types message
2. Component validates input
3. POST /api/placements/:id/messages
4. Server saves to database
5. Server sends notifications:
   - Push to employer
   - Email to admin
6. Server broadcasts via WebSocket
7. Component shows success toast
8. Component adds message to thread
9. Other participants receive real-time update
```

### **Status Update Flow**

```
1. Employer/Admin changes status (e.g., "Approved")
2. PUT /api/messages/:id/status
3. Server updates database
4. Server broadcasts status change
5. Student receives notification
6. Component updates message status tag
7. Time log system updated (if applicable)
```

---

## 🔔 **Notification System**

### **Push Notifications (Employer/Student)**

```typescript
// Using Web Push API
const sendPushNotification = async (userId: string, message: string) => {
  const subscription = await getUserPushSubscription(userId);
  
  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: subscription.token,
      notification: {
        title: 'New Co-op Message',
        body: message,
        icon: '/zalpha-logo.png',
        click_action: '/coop-messages',
      },
    }),
  });
};
```

### **Email Notifications (Admin)**

```typescript
// Using Supabase Edge Function
const sendAdminEmail = async (adminEmail: string, message: Message) => {
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: adminEmail }],
        subject: '[RECORDED] Student Co-op Message',
      }],
      from: { email: 'noreply@zalpha.org', name: 'ZALPHA Co-Op' },
      content: [{
        type: 'text/html',
        value: `
          <h2>New message from ${message.senderName}</h2>
          <p><strong>Placement:</strong> ${placement.studentName} at ${placement.employerName}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${message.content}</blockquote>
          <p><em>This message is recorded for compliance tracking.</em></p>
          <a href="https://zalpha.org/admin/messages/${message.id}">View in Dashboard</a>
        `,
      }],
    }),
  });
};
```

---

## 🔗 **Integration with Time Logs**

### **Link Message to Attendance**

```typescript
// When student sends "late" or "cannot-attend" message
const linkMessageToTimeLog = async (message: Message, placement: Placement) => {
  if (message.templateType === 'late') {
    // Update today's time log
    const timeLog = await getTimeLog(placement.studentId, new Date());
    
    await updateTimeLog({
      ...timeLog,
      status: 'late',
      excuseNote: message.content,
      messageThreadId: message.threadId,
      excuseProvidedAt: message.timestamp,
    });
  }

  if (message.templateType === 'cannot-attend') {
    // Mark as absent
    const timeLog = await getTimeLog(placement.studentId, new Date());
    
    await updateTimeLog({
      ...timeLog,
      status: 'absent',
      excuseNote: message.content,
      messageThreadId: message.threadId,
      excuseProvidedAt: message.timestamp,
      approvalRequired: true,
    });
  }
};
```

### **Display in Admin Dashboard**

```tsx
// Admin can see linked messages
function TimeLogDetails({ timeLog }: { timeLog: TimeLog }) {
  const linkedMessages = useMessages(timeLog.messageThreadId);

  return (
    <div>
      <h3>Attendance Record</h3>
      <p>Status: {timeLog.status}</p>
      
      {timeLog.messageThreadId && (
        <div className="mt-4">
          <h4>Related Messages</h4>
          {linkedMessages.map(msg => (
            <MessagePreview key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🔒 **Compliance & Security**

### **Message Retention**

```typescript
// Store messages for 7 years (FERPA requirement)
const RETENTION_PERIOD = 7 * 365 * 24 * 60 * 60 * 1000; // 7 years in ms

const message = {
  // ... message data
  metadata: {
    recorded: true,
    retentionDate: new Date(Date.now() + RETENTION_PERIOD),
  },
};
```

### **Audit Log**

```typescript
// Log every message for compliance
const logMessageForCompliance = async (message: Message) => {
  await kv.set(`compliance-log:${message.id}`, {
    messageId: message.id,
    placementId: message.placementId,
    studentId: message.senderId,
    timestamp: message.timestamp,
    ipAddress: message.metadata.ipAddress,
    deviceInfo: message.metadata.deviceInfo,
    content: message.content,
    type: message.type,
    recorded: true,
    exportable: true,
  });
};
```

### **Export for Audits**

```typescript
// Admin can export all messages for a placement
app.get('/make-server-9bd83859/coop-messages/:placementId/export', async (c) => {
  const { placementId } = c.req.param();
  
  // Get all messages
  const messages = await kv.getByPrefix(`coop-message:${placementId}`);
  
  // Generate PDF
  const pdf = await generatePDF({
    title: 'Co-Op Message Thread Export',
    placement: await kv.get(`placement:${placementId}`),
    messages: messages.map(m => m.value),
    exportedBy: c.get('userId'),
    exportedAt: new Date(),
  });
  
  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="coop-messages-${placementId}.pdf"`,
    },
  });
});
```

---

## 📱 **Mobile Optimization**

### **Responsive Breakpoints**

```css
/* Mobile-first (390x844) */
@media (max-width: 768px) {
  .message-bubble {
    max-width: 280px;
  }
  
  .template-button {
    font-size: 14px;
  }
}

/* Tablet */
@media (min-width: 768px) {
  .message-bubble {
    max-width: 400px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .messaging-container {
    max-width: 600px;
    margin: 0 auto;
  }
}
```

### **Touch Optimization**

```tsx
// Increase tap targets for mobile
<Button 
  className="min-h-[44px] min-w-[44px]" // iOS minimum
  onClick={handleClick}
>
  Send
</Button>
```

---

## ✅ **Testing Scenarios**

### **Scenario 1: Student sends "I'll be late"**
- [ ] Template modal opens
- [ ] Time picker works
- [ ] Reason field is optional
- [ ] Preview shows formatted message
- [ ] Send button works
- [ ] Success toast appears
- [ ] Message appears in thread
- [ ] CC indicator shows
- [ ] Employer receives notification
- [ ] Admin receives email

### **Scenario 2: Employer approves time-off**
- [ ] Student sends time-off request
- [ ] Employer sees message
- [ ] Employer can change status to "Approved"
- [ ] Status tag updates in real-time
- [ ] Student receives notification
- [ ] Admin is notified
- [ ] Time log system updates

### **Scenario 3: Admin asks for follow-up**
- [ ] Student reports absence
- [ ] Admin marks "Follow-up required"
- [ ] Student sees status change
- [ ] Student can reply with details
- [ ] Student can attach photo
- [ ] Admin approves excuse
- [ ] Absence marked as excused in time logs

---

## 🚀 **Deployment Checklist**

- [ ] Backend API endpoints implemented
- [ ] WebSocket server configured
- [ ] Push notification setup (FCM/APNS)
- [ ] Email notification configured (SendGrid)
- [ ] Database schema created
- [ ] KV store initialized
- [ ] Message retention policy set
- [ ] Compliance logging enabled
- [ ] File upload to Supabase Storage
- [ ] Real-time updates working
- [ ] Mobile responsive (390x844)
- [ ] Tested on iOS Safari
- [ ] Tested on Android Chrome
- [ ] Accessibility verified (screen readers)
- [ ] Error handling complete
- [ ] Loading states implemented
- [ ] Analytics tracking added
- [ ] Admin dashboard integration
- [ ] Time log integration
- [ ] Export functionality working

---

## 📚 **Resources**

- [Design Spec](./ZALPHA_COOP_MESSAGING_DESIGN_SPEC.md)
- [Component Code](./src/app/components/CoOpMessaging.tsx)
- [Demo Page](./src/app/pages/CoOpMessagingDemo.tsx)
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

---

## 🆘 **Support**

For issues or questions:
1. Check design spec for visual requirements
2. Review component code for implementation details
3. Test with sample data in demo page
4. Contact dev team for backend integration help

---

**ZALPHA Co-Op Messaging - Connecting Students, Employers, and Administrators** 📱✉️✅
