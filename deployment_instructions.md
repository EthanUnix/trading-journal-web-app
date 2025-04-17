# Trading Journal Web App - Deployment Instructions

## Overview
This document provides instructions for deploying the Trading Journal web application to a production environment. The application consists of a Node.js backend and a React frontend.

## Prerequisites
- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm or yarn package manager
- A hosting service for the backend (e.g., Heroku, AWS, DigitalOcean)
- A static hosting service for the frontend (e.g., Netlify, Vercel, AWS S3)

## Backend Deployment

### 1. Set up MongoDB Database
- Create a MongoDB Atlas account or set up a MongoDB server
- Create a new database named `trading_journal`
- Note the connection string, which will be used in environment variables

### 2. Configure Environment Variables
Create a `.env` file in the server directory with the following variables:
```
NODE_ENV=production
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRE=24h
```

### 3. Build the Backend
```bash
cd /path/to/trading_journal_app/server
npm install
```

### 4. Deploy to Hosting Service

#### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create a new Heroku app
heroku create trading-journal-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=<your-mongodb-connection-string>
heroku config:set JWT_SECRET=<your-jwt-secret-key>
heroku config:set JWT_EXPIRE=24h

# Deploy to Heroku
git subtree push --prefix server heroku main
```

#### AWS/DigitalOcean Deployment
- Create a new server instance
- Install Node.js and npm
- Clone the repository
- Set up environment variables
- Install PM2 for process management: `npm install -g pm2`
- Start the server: `pm2 start server.js`
- Configure Nginx as a reverse proxy

## Frontend Deployment

### 1. Configure API Endpoint
Update the API endpoint in `/client/src/services/api.js` to point to your production backend:
```javascript
const API_URL = 'https://your-backend-url.com/api/v1';
```

### 2. Build the Frontend
```bash
cd /path/to/trading_journal_app/client
npm install
npm run build
```

### 3. Deploy to Hosting Service

#### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=build
```

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel --prod
```

#### AWS S3 Deployment
- Create an S3 bucket
- Enable static website hosting
- Upload the contents of the `build` directory
- Configure CloudFront for CDN (optional)

## Post-Deployment Steps

### 1. Test the Application
- Verify that the frontend can connect to the backend
- Test user registration and login
- Test all CRUD operations for trades and missed trades
- Test MT4/MT5 integration

### 2. Set up Monitoring
- Implement logging with tools like Winston or Bunyan
- Set up error tracking with Sentry or similar services
- Configure performance monitoring with New Relic or similar

### 3. Set up Continuous Integration/Deployment
- Configure GitHub Actions or similar CI/CD service
- Automate testing and deployment processes

## Troubleshooting
- If you encounter CORS issues, ensure that the backend is properly configured to allow requests from the frontend domain
- For database connection issues, verify that the MongoDB connection string is correct and that network access is properly configured
- For authentication issues, check that the JWT secret is properly set and that tokens are being correctly generated and validated

## Security Considerations
- Use HTTPS for all communications
- Store sensitive information in environment variables, not in code
- Implement rate limiting to prevent abuse
- Regularly update dependencies to patch security vulnerabilities
