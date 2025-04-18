# Trading Journal Web App - Netlify Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the React frontend of your Trading Journal web application to Netlify. This will complement your backend API that's already deployed on Render.

## Prerequisites
- A Netlify account (https://netlify.com)
- Your GitHub repository with the trading journal app (https://github.com/EthanUnix/trading-journal-web-app)
- Backend API already deployed on Render (https://trading-journal-web-app.onrender.com)

## Configuration Files
I've created two important configuration files for your Netlify deployment:

1. **netlify.toml** - Contains build settings and environment variables:
```toml
[build]
  base = "client/"
  publish = "build/"
  command = "npm run build"

[build.environment]
  REACT_APP_API_URL = "https://trading-journal-web-app.onrender.com/api/v1"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **_redirects** - Ensures client-side routing works correctly:
```
/*    /index.html   200
```

## Deployment Steps

### 1. Push the Netlify Configuration Files to GitHub

```bash
git add client/netlify.toml client/public/_redirects
git commit -m "Add Netlify configuration files"
git push origin main
```

### 2. Deploy to Netlify

#### Option 1: Deploy via Netlify UI
1. Log in to your Netlify account at https://app.netlify.com
2. Click on "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account if prompted
5. Select your repository: `EthanUnix/trading-journal-web-app`
6. Configure build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `build`
7. Click "Deploy site"

#### Option 2: Deploy via Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Log in to Netlify: `netlify login`
3. Navigate to your client directory: `cd client`
4. Initialize Netlify site: `netlify init`
5. Follow the prompts to create a new site or connect to an existing one
6. Deploy your site: `netlify deploy --prod`

### 3. Verify Environment Variables

1. After deployment, go to your site settings in the Netlify dashboard
2. Navigate to "Build & deploy" > "Environment"
3. Verify that `REACT_APP_API_URL` is set to `https://trading-journal-web-app.onrender.com/api/v1`
4. If needed, update the variable and trigger a new deployment

### 4. Set Up Custom Domain (Optional)

1. In the Netlify dashboard, go to your site settings
2. Navigate to "Domain management" > "Domains"
3. Click "Add custom domain"
4. Follow the instructions to configure your domain's DNS settings

### 5. Enable HTTPS (Automatic)

Netlify automatically provisions SSL certificates for all sites, including those with custom domains. No additional configuration is required.

## Troubleshooting

### Common Issues:

1. **API Connection Issues**:
   - Verify that the `REACT_APP_API_URL` environment variable is correctly set
   - Check that CORS is properly configured on your backend API
   - Ensure your API endpoints match what's expected in the frontend code

2. **Build Failures**:
   - Check the build logs in the Netlify dashboard for specific error messages
   - Ensure all dependencies are correctly listed in your package.json file
   - Verify that your React app builds successfully locally with `npm run build`

3. **Routing Issues**:
   - Confirm that the _redirects file is in the public directory
   - Verify that the netlify.toml file has the correct redirects configuration
   - Test navigation between different routes in your application

## Continuous Deployment

Netlify automatically rebuilds and deploys your site when you push changes to the main branch of your GitHub repository. No additional configuration is required for continuous deployment.

## Additional Resources

- Netlify Documentation: https://docs.netlify.com
- Netlify CLI Documentation: https://docs.netlify.com/cli/get-started/
- React Deployment Guide: https://create-react-app.dev/docs/deployment/#netlify
