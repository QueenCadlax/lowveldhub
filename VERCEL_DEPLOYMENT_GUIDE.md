# Vercel Deployment Guide - LowveldHub

## Project Type
✅ **Vite (React 19 + TypeScript)**

## Deployment Checklist

### 1. Pre-Deployment Requirements
- [ ] Ensure `.env.local` has `GEMINI_API_KEY` set locally
- [ ] Test build: `npm run build`
- [ ] Verify dist folder is created successfully
- [ ] Test preview: `npm run preview`

### 2. Environment Variables (Set in Vercel Dashboard)
**Required:**
- `GEMINI_API_KEY` - Google Gemini API key for AI features

**Steps:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add `GEMINI_API_KEY` with your API key value
3. Apply to: Production, Preview, Development

### 3. Build Configuration
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

### 4. Vercel Configuration Files
- `vercel.json` - Deployment configuration (included)
- `.vercelignore` - Files to exclude from deployment (included)

### 5. Performance Optimizations Applied

#### Code Splitting
- Seed data files: Separate chunks (`seeds-*.js`)
- Vendor splitting: `vendor-react.js`, `vendor-ai.js`, `vendor-icons.js`, `vendor-other.js`
- Lazy-loaded page components with React.Suspense

#### Production Build
- Minification with Terser
- Drop console logs and debugger statements
- CSS code splitting
- Source maps disabled in production

#### Caching Strategy
- **Assets (immutable):** 1 year cache
- **HTML/JS (dynamic):** No cache (must-revalidate)
- Security headers included (X-Frame-Options, X-Content-Type-Options)

### 6. Deployment Steps

#### Option A: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

#### Option B: Via GitHub Integration
1. Push code to GitHub
2. Connect repo to Vercel: https://vercel.com/new
3. Select repository
4. Set environment variables in dashboard
5. Click Deploy

### 7. Post-Deployment

#### Verify Deployment
- [ ] Site loads at https://your-project.vercel.app
- [ ] All pages load quickly (check Performance tab)
- [ ] Concierge chat works (Gemini API responding)
- [ ] Images load properly
- [ ] Mobile responsive

#### Monitor Performance
- Vercel Analytics dashboard
- Web Vitals monitoring
- Error tracking
- Real user monitoring (RUM)

### 8. Troubleshooting

**Build Fails:**
- Check Node version (recommend 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

**Slow Performance:**
- Check dist folder size (should be <1MB gzipped)
- Verify chunk splitting in Network tab
- Enable Vercel Analytics

**AI Features Not Working:**
- Verify GEMINI_API_KEY is set in Vercel env vars
- Check Gemini quota in Google Cloud Console
- Check browser console for API errors

### 9. Environment Variable Reference

**Vite Process:**
```typescript
// Access in code:
process.env.API_KEY
process.env.GEMINI_API_KEY

// Both are injected via vite.config.ts define
```

### 10. Current Optimizations

✅ Lazy seed data loading (only loaded when needed)
✅ React.memo on card components
✅ useCallback on event handlers
✅ Code splitting enabled
✅ Production minification
✅ Static site generation via Vite build
✅ Security headers configured
✅ Cache optimization via vercel.json

### 11. SPA Routing Note

This is a Single Page Application (SPA) using custom routing (no browser history).
The `vercel.json` includes rewrites to always serve `index.html` for client-side routing.

### 12. File Size Expectations

After build, expect approximately:
- Main bundle: 250-300 KB
- React vendor: 150-200 KB  
- AI vendor (Google GenAI): 100-150 KB
- Icons (lucide): 80-120 KB
- Seed data chunks: 50-100 KB each
- **Total (gzipped):** ~300-400 KB

### 13. Maintenance

**Regular Tasks:**
- Monitor Vercel Analytics
- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Review error tracking for issues

**Optional Enhancements:**
- Add preview deployments for branches
- Configure custom domain
- Enable Web Vitals monitoring
- Set up error tracking integration

---

**Last Updated:** April 15, 2026
**Status:** ✅ Ready for Deployment
