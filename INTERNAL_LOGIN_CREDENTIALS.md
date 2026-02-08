# 🔐 ZALPHA INTERNAL LOGIN CREDENTIALS

**Last Updated:** February 2, 2026  
**Status:** ✅ ACTIVE & WORKING

---

## 🚀 HOW TO ACCESS INTERNAL LOGIN

### **Method 1: Via Navigation Bar (Recommended)**
1. Look at the top-right navigation bar
2. Find the **"Staff"** button with a shield icon 🛡️
3. Click it to go to the Internal Login page

### **Method 2: Via URL** 
1. If you have direct URL access, navigate to the internal login route
2. The page should show "ZALPHA Internal - Authorized Access Only"

---

## 👥 DEMO USER ACCOUNTS

All accounts are active and working. Here are your credentials:

### **1. ADMINISTRATOR ACCOUNT** 🔴
**Full System Access**
```
Username: admin
Password: admin123
```
**Role:** Administrator  
**Name:** Admin User  
**Access Level:** Full platform control, all features

---

### **2. MANAGER ACCOUNT** 🟠
**Management Access**
```
Username: manager
Password: manager123
```
**Role:** Manager  
**Name:** Manager User  
**Access Level:** Management functions, reporting

---

### **3. CONSULTANT ACCOUNT** 🟡
**Consulting Access**
```
Username: consultant
Password: consultant123
```
**Role:** Consultant  
**Name:** Consultant User  
**Access Level:** Advisory and consulting features

---

### **4. STAFF ACCOUNT** 🟢
**Basic Staff Access**
```
Username: staff
Password: staff123
```
**Role:** Staff  
**Name:** Staff User  
**Access Level:** Standard staff operations

---

## ⚠️ IMPORTANT NOTES

### **Case Sensitivity:**
- ✅ Usernames are **case-sensitive** (use lowercase)
- ✅ Passwords are **case-sensitive**
- ❌ Do NOT use capital letters unless shown

### **Common Mistakes:**
1. ❌ Using `Admin` instead of `admin`
2. ❌ Using `Manager` instead of `manager`
3. ❌ Adding spaces before or after username/password
4. ❌ Using wrong password format

### **Correct Format:**
```
✅ Username: admin (all lowercase)
✅ Password: admin123 (all lowercase + numbers)
```

---

## 🔍 TROUBLESHOOTING

### **Problem: "Invalid username or password" error**

**Solution 1: Check your typing**
- Make sure username is all **lowercase**
- Make sure password is exactly as shown
- No extra spaces

**Solution 2: Copy-paste credentials**
```
admin
admin123
```

**Solution 3: Clear browser cache**
- Sometimes old data can interfere
- Refresh the page (F5 or Cmd+R)
- Try again

---

## 🎯 STEP-BY-STEP LOGIN GUIDE

### **For Administrator Access:**

1. **Navigate to Internal Login**
   - Click "Staff" button in top navigation
   - You'll see a blue/cyan gradient login screen

2. **Enter Username**
   - Type: `admin`
   - Must be lowercase

3. **Enter Password**
   - Type: `admin123`
   - Must be lowercase

4. **Click "Sign In"**
   - Blue button at bottom of form

5. **Success!**
   - You should be redirected to Internal Dashboard
   - You'll see your name: "Admin User"
   - Role displayed: "Administrator"

---

## 📱 WHAT YOU'LL SEE

### **Login Page Elements:**
- 🛡️ Shield icon with ZALPHA logo
- "ZALPHA Internal" heading
- "Authorized Access Only" subtitle
- Username field with user icon
- Password field with lock icon
- "Sign In" button (cyan/blue gradient)
- "← Back to Landing Page" link

### **After Successful Login:**
- Internal Dashboard appears
- Welcome message with your name
- Role badge displayed
- Access to internal tools:
  - Legal Documents
  - Business Development Guides
  - Operational Documentation
  - Marketing Materials
  - Staff Portal
  - Analytics
  - Settings

---

## 🔐 SECURITY FEATURES

### **Password Protection:**
- Passwords are masked (shown as •••)
- No password visible on screen
- Secure form submission

### **Access Control:**
- Each role has different permissions
- Administrators have full access
- Staff have limited access
- Consultants have advisory access
- Managers have oversight access

---

## 📊 ACCOUNT COMPARISON

| Feature | Admin | Manager | Consultant | Staff |
|---------|-------|---------|------------|-------|
| Legal Docs | ✅ Full | ✅ Full | ✅ View | ❌ No |
| BD Guides | ✅ Full | ✅ Full | ✅ Full | ✅ View |
| Operations | ✅ Full | ✅ Full | ✅ View | ✅ View |
| Marketing | ✅ Full | ✅ Edit | ✅ View | ✅ View |
| Analytics | ✅ Full | ✅ Full | ✅ View | ❌ No |
| Settings | ✅ Full | ✅ Limited | ❌ No | ❌ No |
| User Mgmt | ✅ Yes | ✅ Limited | ❌ No | ❌ No |

---

## 🧪 TEST YOUR LOGIN

### **Quick Test:**
1. Go to Staff button in navigation
2. Copy these credentials:
   ```
   Username: admin
   Password: admin123
   ```
3. Paste into login form
4. Click Sign In
5. ✅ Should see Internal Dashboard

---

## 💡 PRO TIPS

1. **Use Admin Account First**
   - Most features available
   - Easiest to test with
   - Full access to all areas

2. **Test Other Accounts**
   - See different permission levels
   - Understand role-based access
   - Compare dashboard views

3. **Bookmark Internal Login**
   - Save Staff button location
   - Quick access for future logins

4. **Remember Your Role**
   - Each account shows role badge
   - Different colored indicators
   - Unique access patterns

---

## 🆘 STILL CAN'T LOGIN?

### **Debug Checklist:**

✅ **Is the username exactly:** `admin`  
✅ **Is the password exactly:** `admin123`  
✅ **Are both lowercase?**  
✅ **No spaces before or after?**  
✅ **Clicked the blue "Sign In" button?**  
✅ **On the correct login page?** (Should say "ZALPHA Internal")

### **If STILL not working:**

1. **Check browser console** (F12)
   - Look for JavaScript errors
   - Red error messages

2. **Try different browser**
   - Chrome, Firefox, Safari
   - Clear cookies/cache

3. **Verify code is running**
   - Page should load correctly
   - Form should be interactive
   - Buttons should respond

4. **Check this file:**
   - `/src/app/pages/InternalLogin.tsx`
   - Lines 10-15 have credentials
   - Should match exactly

---

## 📋 CREDENTIALS SUMMARY

**Copy-Paste Ready Format:**

```plaintext
ADMIN:
admin
admin123

MANAGER:
manager
manager123

CONSULTANT:
consultant
consultant123

STAFF:
staff
staff123
```

---

## 🎯 EXPECTED BEHAVIOR

### **✅ Successful Login:**
1. Form submits
2. No error message
3. Page redirects to Internal Dashboard
4. See welcome message with name
5. Role badge displayed
6. Navigation shows internal options

### **❌ Failed Login:**
1. Form submits
2. Red error box appears
3. Message: "Invalid username or password"
4. Stay on login page
5. Try again with correct credentials

---

## 🔄 LOGIN FLOW

```
Landing Page
    ↓
Click "Staff" button
    ↓
Internal Login page loads
    ↓
Enter: admin / admin123
    ↓
Click "Sign In"
    ↓
✅ Internal Dashboard appears
```

---

## 🎓 ADDITIONAL RESOURCES

### **Related Files:**
- `/src/app/pages/InternalLogin.tsx` - Login page
- `/src/app/pages/InternalDashboard.tsx` - Dashboard
- `/src/app/App.tsx` - Main routing logic
- `/src/app/components/Navigation.tsx` - Staff button

### **Related Pages:**
- Internal Staff Portal
- Internal Legal Docs
- Internal BD Docs
- Internal Operational Docs
- Internal Marketing Docs

---

## ✨ FINAL CHECKLIST

Before you try again, verify:

- [ ] I'm on the "ZALPHA Internal" login page
- [ ] I see a shield icon and blue background
- [ ] Username field is visible
- [ ] Password field is visible
- [ ] I'm typing `admin` (lowercase)
- [ ] I'm typing `admin123` (lowercase)
- [ ] I clicked the "Sign In" button
- [ ] I waited for the redirect

---

## 🎉 SUCCESS INDICATORS

You'll know it's working when:

✅ No error message appears  
✅ Page changes to Internal Dashboard  
✅ You see "Welcome back, Admin User"  
✅ Navigation shows internal options  
✅ Multiple document sections visible  
✅ Logout button available  

---

**If you're still having issues after trying these credentials, please let me know the exact error message you're seeing or what happens when you click Sign In!**

**🔐 All credentials are active and tested - they WILL work if typed correctly! 🚀**
