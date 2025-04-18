# Trading Journal Web App - Render Deployment Instructions

## Overview
This document provides step-by-step instructions for deploying your Trading Journal web application to Render. The application consists of a Node.js backend API and a React frontend, both of which will be deployed as separate services on Render.

## Prerequisites
- A Render account (https://render.com)
- Your GitHub repository with the trading journal app (https://github.com/EthanUnix/trading-journal-web-app)
- MongoDB Atlas database (already set up)

## Deployment Steps

### 1. Add render.yaml to Your Repository

I've created a `render.yaml` file in your repository that defines both the backend and frontend services. This file tells Render how to build and deploy your application.

```yaml
services:
  # Backend API service
  - type: web
    name: trading-journal-api
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: JWT_SECRET
        sync: false
      - key: JWT_EXPIRE
        value: 24h
      - key: MONGO_URI
        sync: false
    healthCheckPath: /api/health

  # Frontend static site
  - type: web
    name: trading-journal-client
    env: static
    buildCommand: cd client && npm install && npm run build
    staticPublishPath: ./client/build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: REACT_APP_API_URL
        fromService:
          name: trading-journal-api
          type: web
          envVarKey: RENDER_EXTERNAL_URL
```

### 2. Push the render.yaml File to GitHub

```bash
git add render.yaml
git commit -m "Add Render deployment configuration"
git push origin main
```

### 3. Deploy to Render Using Blueprint

1. Log in to your Render account at https://dashboard.render.com
2. Click on the "New" button and select "Blueprint" from the dropdown menu
3. Connect your GitHub account if you haven't already
4. Select your repository: `EthanUnix/trading-journal-web-app`
5. Render will automatically detect the `render.yaml` file and display the services to be created
6. Click "Apply Blueprint" to start the deployment process

### 4. Configure Environment Variables

After applying the blueprint, you'll need to configure the secret environment variables:

#### For the Backend API Service:
1. Navigate to the `trading-journal-api` service in your Render dashboard
2. Click on the "Environment" tab
3. Add the following environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT token generation

The other environment variables are already defined in the render.yaml file.

### 5. Verify Deployment

1. Once the deployment is complete, Render will provide URLs for both services
2. The backend API will be available at: `https://trading-journal-api.onrender.com`
3. The frontend client will be available at: `https://trading-journal-client.onrender.com`
4. Access the frontend client URL to verify that your application is working correctly
5. Test the API endpoints using tools like Postman or directly from your frontend application

### 6. Set Up Automatic Deployments

Render automatically deploys your application whenever you push changes to the main branch of your GitHub repository. No additional configuration is required.

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Errors**:
   - Verify that your MongoDB Atlas IP whitelist includes Render's IP addresses (0.0.0.0/0 for simplicity)
   - Check that your connection string is correctly formatted

2. **API Connection Issues**:
   - Ensure CORS is properly configured in your backend to allow requests from your frontend
   - Verify that the `REACT_APP_API_URL` environment variable is correctly set

3. **Build Failures**:
   - Check the build logs in the Render dashboard for specific error messages
   - Ensure all dependencies are correctly listed in your package.json files

## Render-Specific Benefits

1. **Automatic HTTPS**: Render automatically provisions SSL certificates for all services
2. **Global CDN**: Static sites are served through a global CDN for fast loading
3. **Auto-scaling**: Web services can be configured to scale automatically based on load
4. **Zero-downtime Deployments**: Updates are deployed without service interruption
5. **Integrated Monitoring**: View logs and metrics directly in the Render dashboard

## Additional Resources

- Render Documentation: https://render.com/docs
- Render Blueprint Specification: https://render.com/docs/blueprint-spec
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
