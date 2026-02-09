# 🚀 ZALPHA Vercel Deployment Guide

## 📋 Production-Ready Configuration

This project is **fully configured** for Vercel deployment with optimal bundle splitting and performance settings.

---

## ✅ Prerequisites

Before deploying, ensure you have:

1. **Node.js** >= 18.0.0
2. **pnpm** >= 8.0.0
3. **GitHub Account** (for repository hosting)
4. **Vercel Account** (free tier works great)

---

## 🔧 Project Configuration

### Package.json Scripts

```json
{
  "dev": "vite",              // Development server
  "build": "vite build",      // Production build
  "preview": "vite preview"   // Preview production build locally
}
```

### Vite Build Configuration

✅ **Chunk Size Warning Limit**: 1500kb (Vercel-friendly)  
✅ **Manual Chunks**: Intelligent vendor splitting for optimal caching  
✅ **Minification**: Terser with console.log removal  
✅ **Target**: ES2020 for modern browsers  
✅ **Source Maps**: Disabled for production (faster builds)

### Bundle Splitting Strategy

The build is split into optimized chunks:

- `vendor-react` - React core (18.3.1)
- `vendor-radix` - All Radix UI components
- `vendor-mui` - Material UI components
- `vendor-three` - 3D visualization libraries
- `vendor-charts` - Recharts visualization
- `vendor-animation` - Motion/Framer Motion
- `vendor-forms` - Form handling libraries
- `vendor-dnd` - Drag and drop
- `vendor-integrations` - Third-party integrations
- `vendor-utils` - Utility libraries
- `vendor-ui-misc` - Miscellaneous UI components

This ensures:
- ✅ Better caching (vendor code changes less frequently)
- ✅ Parallel loading
- ✅ Faster initial page load
- ✅ No Vercel chunk size warnings

---

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial ZALPHA platform commit"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/zalpha-platform.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will **auto-detect** the Vite configuration
5. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
6. Click **"Deploy"**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🔐 Environment Variables (If Needed)

If your project uses environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add required variables:
   - `VITE_API_URL` (if applicable)
   - `VITE_SUPABASE_URL` (if using Supabase)
   - `VITE_SUPABASE_ANON_KEY`
   - etc.

**Note**: All environment variables in Vite must be prefixed with `VITE_`

---

## ⚙️ Vercel Configuration

The project includes a `vercel.json` with:

### Routing
- ✅ SPA fallback routing (all routes → index.html)
- ✅ Handles React Router navigation

### Headers
- ✅ Cache-Control for static assets (1 year)
- ✅ Security headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin

### Performance
- ✅ Region: US East (iad1) - Change as needed
- ✅ Function timeout: 10 seconds

---

## 📦 Build Output

After running `pnpm build`, you'll see:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js          (main app code)
│   ├── vendor-react-[hash].js   (React core)
│   ├── vendor-radix-[hash].js   (Radix UI)
│   ├── vendor-mui-[hash].js     (Material UI)
│   ├── vendor-three-[hash].js   (3D libraries)
│   ├── vendor-charts-[hash].js  (Charts)
│   ├── vendor-*.js              (other vendors)
│   └── *.css                    (styles)
└── public files (icons, manifest, etc.)
```

---

## 🧪 Testing Deployment Locally

Before deploying to Vercel, test the production build locally:

```bash
# Build the project
pnpm build

# Preview the production build
pnpm preview
```

Open `http://localhost:4173` to test the production build.

---

## 📊 Performance Expectations

### Lighthouse Scores (Target)
- ✅ Performance: 90+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 90+

### Load Times
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3.0s
- ✅ Total Bundle Size: ~2-3MB (gzipped)

---

## 🔄 Continuous Deployment

Vercel automatically deploys:

### Main Branch
- ✅ Commits to `main` → Production deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic invalidation

### Feature Branches
- ✅ Commits to other branches → Preview deployments
- ✅ Unique URLs for testing
- ✅ Perfect for PR reviews

---

## 🐛 Troubleshooting

### Build Fails on Vercel

1. **Check Node Version**
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

2. **Check pnpm Version**
   - Vercel uses pnpm by default if `pnpm-lock.yaml` exists
   - Ensure your local pnpm version matches

3. **Clear Build Cache**
   - Vercel Dashboard → Deployments → (Three dots) → Redeploy

### Chunk Size Warnings

If you still get chunk size warnings:

1. Check `vite.config.ts` → `chunkSizeWarningLimit` is set to 1500
2. Ensure `manualChunks` is properly configured
3. Consider splitting large chunks further

### Routing Issues (404 on Refresh)

Ensure `vercel.json` includes:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Add them in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

---

## 📱 Mobile Compatibility

The platform is **fully optimized** for mobile deployment:

- ✅ Responsive design (320px - 2000px+)
- ✅ PWA capabilities
- ✅ Touch-optimized UI
- ✅ iOS Safari compatible
- ✅ Android Chrome compatible
- ✅ Safe area support (notches, etc.)

See `MOBILE_COMPATIBILITY.md` for full details.

---

## 🔒 Security Best Practices

### Implemented Security Features

1. **Content Security**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection enabled

2. **Build Security**
   - console.log removed in production
   - Source maps disabled
   - Dependencies regularly updated

3. **Authentication**
   - Password protection for beta access
   - Session storage for auth state
   - No sensitive data in client code

---

## 📈 Monitoring & Analytics

### Vercel Analytics (Optional)

Enable in Vercel Dashboard:
1. Go to your project
2. Click "Analytics" tab
3. Enable Vercel Analytics
4. Get real-time performance metrics

### Recommended Tools

- ✅ **Vercel Speed Insights** - Real user monitoring
- ✅ **Sentry** - Error tracking (if needed)
- ✅ **Google Analytics** - User analytics (if needed)

---

## 🆘 Support & Documentation

### Official Documentation
- [Vite Docs](https://vitejs.dev/)
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev/)

### ZALPHA Specific
- Email: contact@kiexgroup.com
- Password Protection: `ZALPHA2026`
- Beta Access Required

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Code is committed to GitHub
- [ ] `pnpm build` runs successfully locally
- [ ] `pnpm preview` works correctly
- [ ] Environment variables are documented
- [ ] Password protection is set (`ZALPHA2026`)
- [ ] Mobile responsiveness tested
- [ ] Browser navigation (back/forward) tested
- [ ] Beta application forms tested
- [ ] All links and routes working
- [ ] Icons and images loading correctly
- [ ] Performance is acceptable
- [ ] No console errors in production build

---

## 🎉 Post-Deployment

After successful deployment:

1. **Test Production URL**
   - Visit your Vercel URL
   - Test all major features
   - Check mobile responsiveness
   - Test browser navigation

2. **Custom Domain (Optional)**
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

3. **SSL Certificate**
   - ✅ Automatic HTTPS (Vercel provides free SSL)

4. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor error logs
   - Gather user feedback

---

## 📞 Need Help?

If you encounter deployment issues:

1. Check Vercel build logs
2. Review this documentation
3. Contact: contact@kiexgroup.com

---

**Last Updated**: February 2026  
**Version**: ZALPHA 1.0  
**Status**: ✅ Production Ready for Vercel
