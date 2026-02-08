# KiEX Platform Integrations

## Overview
KiEX seamlessly integrates with **Manatal ATS** and **Wix** to provide a complete job connection ecosystem for the Western Pacific region.

---

## 🔗 Manatal ATS Integration

### What Gets Synced
- ✅ **Job Postings** (bidirectional sync)
- ✅ **Candidate Applications** (KiEX → Manatal)
- ✅ **Application Statuses** (Manatal → KiEX)
- ✅ **Candidate Profiles** (KiEX → Manatal)

### Setup Instructions

1. **Get Your Manatal API Key**
   - Log into your Manatal account
   - Navigate to Settings → API
   - Generate a new API key
   - Copy the key securely

2. **Configure in KiEX**
   - Go to **Integration Settings** in KiEX
   - Paste your Manatal API key
   - Click "Test Connection" to verify
   - Save your settings

3. **Automatic Sync**
   - Jobs from Manatal automatically appear in KiEX
   - When students apply through KiEX, applications are sent to Manatal
   - Webhooks keep data in real-time sync

### API Documentation
- [Manatal API Docs](https://www.manatal.com/api)
- Base URL: `https://api.manatal.com/open/v3`

---

## 🌐 Wix Integration

### What Gets Synced
- ✅ **Contacts** (bidirectional sync)
- ✅ **Form Submissions** (Wix → KiEX)
- ✅ **Member Registrations** (Wix → KiEX)
- ✅ **Job Postings** (KiEX → Wix Blog)

### Setup Instructions

1. **Get Your Wix Credentials**
   - Log into Wix Developer Console
   - Navigate to your site settings
   - Get your Site ID
   - Generate an API key with appropriate permissions
   - (Optional) Get your Account ID for advanced features

2. **Configure in KiEX**
   - Go to **Integration Settings** in KiEX
   - Enter your Wix API Key
   - Enter your Wix Site ID
   - (Optional) Enter Account ID
   - Click "Test Connection" to verify
   - Save your settings

3. **Automatic Sync**
   - Wix contact form submissions sync to KiEX
   - KiEX users can be synced to Wix Members
   - Job postings can be published to your Wix blog
   - Real-time updates via webhooks

### API Documentation
- [Wix Developers](https://dev.wix.com/api/rest/getting-started)
- [Wix API Reference](https://dev.wix.com/api/rest/contacts/contacts/introduction)

---

## 📊 Sync Dashboard

Monitor all integration activity in real-time:

- **Live Sync Status** - See what's syncing now
- **Activity Logs** - Complete history of all sync operations
- **Manual Triggers** - Force sync when needed
- **Performance Metrics** - Track success rates and volume
- **Error Reporting** - Detailed error messages for troubleshooting

Access the dashboard at: **Sync Dashboard** in the main menu

---

## 🔐 Security

### API Key Storage
- API keys are stored securely in encrypted format
- Keys are never exposed in client-side code
- Server-side validation on all requests
- Keys can be rotated at any time

### Data Privacy
- All data transfers use HTTPS/TLS encryption
- Complies with GDPR and CCPA regulations
- Students can control what data is synced
- Data retention policies respected

### Rate Limiting
- Automatic throttling to prevent API overuse
- Intelligent retry logic for failed requests
- Queue system for bulk operations

---

## 🚀 How It Works

### Job Posting Flow
```
Manatal ATS → KiEX Platform → Student Dashboard
                ↓
         Student Applies
                ↓
    Application → Manatal ATS
```

### Contact/Form Flow
```
Wix Website Form → Wix Contacts → KiEX Database
                                        ↓
                               Available for Processing
```

### Bidirectional Sync
```
Manatal Jobs ←→ KiEX Platform ←→ Wix Blog Posts
      ↓                                  ↓
  Applications                      Form Submissions
      ↓                                  ↓
  Back to Manatal                  Into KiEX
```

---

## 🛠️ Troubleshooting

### Connection Failed
- **Verify API keys are correct** - Copy/paste carefully
- **Check API permissions** - Ensure read/write access
- **Network issues** - Try again or check firewall settings
- **API rate limits** - Wait a few minutes and retry

### Sync Not Working
- **Check Sync Dashboard** for error logs
- **Verify webhooks are configured** in Manatal/Wix
- **Manual trigger sync** to force update
- **Contact support** if issues persist

### Data Not Appearing
- **Allow time for sync** - Can take 1-2 minutes
- **Check filters** - Data might be filtered out
- **Verify permissions** - Ensure API has access to data
- **Review logs** in Sync Dashboard

---

## 📞 Support

For integration support:
- **Email**: support@kiex.com
- **Docs**: [KiEX Integration Guide](https://kiex.com/docs/integrations)
- **Manatal Support**: [Manatal Help Center](https://help.manatal.com)
- **Wix Support**: [Wix Developer Support](https://dev.wix.com/support)

---

## 🎯 Best Practices

1. **Test in Development First** - Use sandbox/test API keys
2. **Monitor Sync Dashboard Regularly** - Catch issues early
3. **Keep API Keys Secure** - Never share or commit to version control
4. **Enable Webhooks** - For real-time updates
5. **Review Logs Weekly** - Identify patterns and optimize
6. **Update Integrations Regularly** - Stay current with API changes

---

## 🔄 Webhook Configuration

### Manatal Webhooks
Set your webhook URL to:
```
https://your-kiex-domain.com/api/webhooks/manatal
```

Subscribe to events:
- `job.created`
- `job.updated`
- `application.created`
- `application.updated`

### Wix Webhooks
Set your webhook URL to:
```
https://your-kiex-domain.com/api/webhooks/wix
```

Subscribe to events:
- `contact/created`
- `contact/updated`
- `form/submitted`
- `member/created`

---

## 📈 Future Enhancements

Coming soon:
- **LinkedIn Integration** - Direct job posting to LinkedIn
- **Indeed Sync** - Cross-post to Indeed.com
- **Google for Jobs** - Structured data export
- **Slack Notifications** - Real-time updates in Slack
- **Advanced Analytics** - Detailed integration metrics

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
