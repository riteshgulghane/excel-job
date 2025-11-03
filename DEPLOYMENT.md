# Deployment Guide

This guide covers deploying your Google Sheets CRUD application to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ Application works locally
- ✅ All environment variables are documented
- ✅ Google Sheets API is properly configured
- ✅ OAuth credentials are set up
- ✅ Code is pushed to a Git repository (GitHub, GitLab, etc.)

---

## 🚀 Vercel Deployment

Vercel is recommended for React applications. It provides automatic HTTPS, CDN, and easy environment variable management.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Sign up/Login to Vercel**
   - Go to: https://vercel.com
   - Sign up with GitHub

3. **Import Project**
   - Click **"New Project"**
   - Select your repository
   - Click **"Import"**

4. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables**
   - Scroll to **"Environment Variables"**
   - Add each variable from your `.env`:
     - `VITE_GOOGLE_API_KEY`
     - `VITE_GOOGLE_CLIENT_ID`
     - `VITE_GOOGLE_CLIENT_SECRET`
     - `VITE_SPREADSHEET_ID`
     - `VITE_SHEET_NAME`
   - Make sure to select all environments (Production, Preview, Development)

6. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment to complete

7. **Update Google Cloud Console**
   - Go to Google Cloud Console → Credentials
   - Edit your OAuth 2.0 Client
   - Add your Vercel URL to:
     - Authorized JavaScript origins: `https://your-app.vercel.app`
     - Authorized redirect URIs: `https://your-app.vercel.app`
   - Click **"Save"**

8. **Test Your Deployment**
   - Visit your Vercel URL
   - Test all CRUD operations
   - Verify OAuth flow works

### Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update Google Cloud Console with new domain

---

## 🌐 Netlify Deployment

### Steps:

1. **Push to GitHub** (if not already done)

2. **Sign up/Login to Netlify**
   - Go to: https://netlify.com
   - Sign up with GitHub

3. **Import Project**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub** and select your repository

4. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click **"Show advanced"**

5. **Add Environment Variables**
   - Click **"New variable"** for each:
     - `VITE_GOOGLE_API_KEY`
     - `VITE_GOOGLE_CLIENT_ID`
     - `VITE_GOOGLE_CLIENT_SECRET`
     - `VITE_SPREADSHEET_ID`
     - `VITE_SHEET_NAME`

6. **Deploy**
   - Click **"Deploy site"**
   - Wait for deployment

7. **Update Google Cloud Console**
   - Add Netlify URL to authorized origins and redirect URIs
   - Format: `https://your-app.netlify.app`

8. **Configure Redirects** (Important for React Router)
   - Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

---

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build image
docker build -t google-sheets-crud .

# Run container
docker run -p 80:80 \
  -e VITE_GOOGLE_API_KEY=your_key \
  -e VITE_GOOGLE_CLIENT_ID=your_client_id \
  -e VITE_GOOGLE_CLIENT_SECRET=your_secret \
  -e VITE_SPREADSHEET_ID=your_sheet_id \
  google-sheets-crud
```

---

## 🔧 Environment-Specific Configuration

### Production `.env`

```env
VITE_GOOGLE_API_KEY=production_api_key
VITE_GOOGLE_CLIENT_ID=production_client_id
VITE_GOOGLE_CLIENT_SECRET=production_secret
VITE_SPREADSHEET_ID=production_sheet_id
VITE_SHEET_NAME=Sheet1
```

### Development `.env.development`

```env
VITE_GOOGLE_API_KEY=dev_api_key
VITE_GOOGLE_CLIENT_ID=dev_client_id
VITE_GOOGLE_CLIENT_SECRET=dev_secret
VITE_SPREADSHEET_ID=dev_sheet_id
VITE_SHEET_NAME=Sheet1
```

---

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use platform-specific secret management
- Rotate credentials regularly

### 2. API Key Restrictions
- Restrict API keys to your domain
- Use separate keys for dev/prod
- Enable only required APIs

### 3. OAuth Configuration
- Use HTTPS in production
- Set correct redirect URIs
- Verify OAuth consent screen

### 4. Sheet Permissions
- Use service accounts for production (advanced)
- Limit sheet access
- Monitor API usage

---

## 📊 Monitoring & Analytics

### Setup Vercel Analytics

```bash
npm install @vercel/analytics
```

In `src/main.jsx`:
```javascript
import { inject } from '@vercel/analytics';

inject();
```

### Setup Error Tracking (Sentry)

```bash
npm install @sentry/react
```

Configure in `src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE
});
```

---

## 🚀 Performance Optimization

### 1. Code Splitting
Already implemented via React Router and dynamic imports.

### 2. Image Optimization
- Use WebP format
- Lazy load images
- Use CDN for assets

### 3. Caching Strategy
- API responses (use React Query)
- Static assets (handled by host)
- Service Worker (optional PWA)

### 4. Bundle Analysis

```bash
npm run build -- --mode analyze
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting Deployment

### Issue: Build fails on Vercel/Netlify

**Solution:**
- Check Node version in build settings
- Verify all dependencies are in `package.json`
- Check build logs for specific errors
- Ensure `npm run build` works locally

### Issue: Environment variables not working

**Solution:**
- Verify variable names start with `VITE_`
- Redeploy after adding variables
- Check variable values don't have extra spaces
- Restart build after changes

### Issue: OAuth not working after deployment

**Solution:**
- Update Google Cloud Console with production URL
- Use exact URL (including https://)
- Clear browser cache
- Check redirect URIs match exactly

### Issue: 404 on page refresh

**Solution:**
- Add redirect rules for SPA
- Netlify: Create `_redirects` file
- Vercel: Add `vercel.json` with rewrites
- Nginx: Configure try_files

---

## 📱 Progressive Web App (Optional)

### Add PWA Support

1. Install Vite PWA plugin:
```bash
npm install vite-plugin-pwa -D
```

2. Update `vite.config.js`:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Google Sheets CRUD',
        short_name: 'Sheets CRUD',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## ✅ Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] OAuth flow works
- [ ] CRUD operations successful
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Analytics setup
- [ ] Error tracking configured
- [ ] SEO meta tags added
- [ ] Performance tested (Lighthouse)

---

## 🎉 Success!

Your application is now live and ready to use!

**Next Steps:**
- Monitor application performance
- Set up automated backups
- Plan for scaling
- Collect user feedback
- Iterate and improve

Need help? Open an issue or check [README.md](README.md)
