# Trading Journal Web App - Architecture Design

## Overview
This document outlines the architecture for the Trading Journal web application. The application will be built using Node.js for the backend and React for the frontend, creating a modern, responsive web application with the same capabilities as the Android app but optimized for web usage.

## System Architecture

### High-Level Architecture
The Trading Journal web app will follow a modern client-server architecture:

1. **Client-Side (Frontend)**: React.js application
2. **Server-Side (Backend)**: Node.js with Express.js
3. **Database**: MongoDB (NoSQL database)
4. **External Integrations**: MT4/MT5 API

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  Client         │◄────►│  Server         │◄────►│  Database       │
│  (React.js)     │      │  (Node.js)      │      │  (MongoDB)      │
│                 │      │                 │      │                 │
└─────────────────┘      └────────┬────────┘      └─────────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │                 │
                         │  MT4/MT5 API    │
                         │                 │
                         └─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework**: React.js
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router
- **UI Components**: Material-UI
- **Data Visualization**: Chart.js and React-Chartjs-2
- **Forms**: Formik with Yup validation
- **HTTP Client**: Axios
- **CSS Preprocessor**: Sass/SCSS

### Component Structure
The frontend will be organized using a component-based architecture:

```
src/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable UI components
│   ├── common/        # Common UI elements (buttons, inputs, etc.)
│   ├── charts/        # Chart components
│   ├── layout/        # Layout components (header, sidebar, etc.)
│   └── tables/        # Table components
├── pages/             # Page components
│   ├── Dashboard/
│   ├── TradesList/
│   ├── TradeDetails/
│   ├── SessionAnalysis/
│   ├── StrategyAnalysis/
│   ├── MissedTrades/
│   ├── MT4MT5Connection/
│   ├── Settings/
│   └── Auth/          # Login/Registration
├── redux/             # Redux state management
│   ├── slices/        # Redux Toolkit slices
│   ├── store.js       # Redux store configuration
│   └── selectors.js   # Reusable selectors
├── services/          # API service modules
│   ├── authService.js
│   ├── tradeService.js
│   ├── brokerService.js
│   └── analyticsService.js
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
├── constants/         # Application constants
├── App.js             # Main application component
└── index.js           # Application entry point
```

### Responsive Design Strategy
- Mobile-first approach
- Breakpoints for different device sizes:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Flexible layouts using CSS Grid and Flexbox
- Adaptive components that change behavior based on screen size

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Joi
- **Testing**: Jest and Supertest
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

### Directory Structure
```
server/
├── config/            # Configuration files
├── controllers/       # Request handlers
├── middleware/        # Express middleware
├── models/            # Mongoose models
├── routes/            # API routes
├── services/          # Business logic
│   ├── authService.js
│   ├── tradeService.js
│   ├── brokerService.js
│   └── analyticsService.js
├── utils/             # Utility functions
├── validation/        # Request validation schemas
├── app.js             # Express application setup
└── server.js          # Server entry point
```

### API Structure
The backend will expose a RESTful API with the following main endpoints:

1. **Authentication**
   - POST /api/auth/register
   - POST /api/auth/login
   - POST /api/auth/refresh-token

2. **User Management**
   - GET /api/users/profile
   - PUT /api/users/profile
   - PUT /api/users/settings

3. **Broker Accounts**
   - GET /api/broker-accounts
   - POST /api/broker-accounts
   - PUT /api/broker-accounts/:id
   - DELETE /api/broker-accounts/:id
   - POST /api/broker-accounts/:id/sync

4. **Trades**
   - GET /api/trades
   - GET /api/trades/:id
   - POST /api/trades
   - PUT /api/trades/:id
   - DELETE /api/trades/:id
   - GET /api/trades/export

5. **Analytics**
   - GET /api/analytics/dashboard
   - GET /api/analytics/sessions
   - GET /api/analytics/strategies
   - GET /api/analytics/performance

6. **Missed Trades**
   - GET /api/missed-trades
   - POST /api/missed-trades
   - PUT /api/missed-trades/:id
   - DELETE /api/missed-trades/:id

## Database Design

### MongoDB Collections

1. **Users**
   ```json
   {
     "_id": "ObjectId",
     "username": "String",
     "email": "String",
     "password": "String (hashed)",
     "profile": {
       "firstName": "String",
       "lastName": "String",
       "timezone": "String"
     },
     "settings": {
       "theme": "String",
       "notifications": "Object"
     },
     "createdAt": "Date",
     "updatedAt": "Date"
   }
   ```

2. **BrokerAccounts**
   ```json
   {
     "_id": "ObjectId",
     "userId": "ObjectId (ref: Users)",
     "accountNumber": "String",
     "brokerName": "String",
     "serverName": "String",
     "connectionStatus": "String",
     "lastSyncAt": "Date",
     "authToken": "String (encrypted)",
     "createdAt": "Date",
     "updatedAt": "Date"
   }
   ```

3. **Trades**
   ```json
   {
     "_id": "ObjectId",
     "userId": "ObjectId (ref: Users)",
     "brokerAccountId": "ObjectId (ref: BrokerAccounts)",
     "symbol": "String",
     "direction": "String (BUY/SELL)",
     "openTime": "Date",
     "closeTime": "Date",
     "openPrice": "Number",
     "closePrice": "Number",
     "lotSize": "Number",
     "profit": "Number",
     "commission": "Number",
     "strategyTag": "String",
     "sessionType": "String",
     "notes": "String",
     "images": ["String (URLs)"],
     "createdAt": "Date",
     "updatedAt": "Date"
   }
   ```

4. **MissedTrades**
   ```json
   {
     "_id": "ObjectId",
     "userId": "ObjectId (ref: Users)",
     "symbol": "String",
     "potentialDirection": "String (BUY/SELL)",
     "potentialEntryPrice": "Number",
     "potentialExitPrice": "Number",
     "estimatedProfit": "Number",
     "reasonCategory": "String",
     "notes": "String",
     "timestamp": "Date",
     "createdAt": "Date",
     "updatedAt": "Date"
   }
   ```

5. **Strategies**
   ```json
   {
     "_id": "ObjectId",
     "userId": "ObjectId (ref: Users)",
     "name": "String",
     "description": "String",
     "metrics": {
       "totalTrades": "Number",
       "winRate": "Number",
       "profitFactor": "Number",
       "averageProfit": "Number"
     },
     "createdAt": "Date",
     "updatedAt": "Date"
   }
   ```

## Authentication and Security

### Authentication Flow
1. User registers or logs in
2. Server validates credentials and issues JWT
3. Client stores JWT in localStorage or secure cookie
4. JWT is included in Authorization header for subsequent requests
5. Server validates JWT for protected routes
6. Refresh token mechanism for token renewal

### Security Measures
1. HTTPS for all communications
2. Password hashing using bcrypt
3. JWT with expiration
4. CORS configuration
5. Input validation for all requests
6. Rate limiting to prevent abuse
7. Helmet.js for HTTP security headers
8. Encryption for sensitive data (broker credentials)

## MT4/MT5 Integration

### Integration Architecture
The web app will integrate with MT4/MT5 platforms through their API:

1. User provides broker account credentials
2. Backend securely stores credentials
3. Backend authenticates with MT4/MT5 API
4. Backend retrieves trade data and stores in database
5. Periodic synchronization to keep data updated

### Security Considerations
1. Encryption of broker credentials
2. Secure API communication
3. Token-based authentication with MT4/MT5 API
4. Rate limiting to comply with API restrictions

## Deployment Architecture

### Development Environment
- Local development using Docker containers
- Environment variables for configuration
- Hot reloading for frontend and backend

### Production Environment
- Frontend: Static hosting (Netlify, Vercel, or AWS S3)
- Backend: Node.js server on cloud platform (AWS, Google Cloud, or Heroku)
- Database: MongoDB Atlas (cloud database)
- CI/CD pipeline for automated testing and deployment

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  Static Hosting │◄────►│  Cloud Platform │◄────►│  MongoDB Atlas  │
│  (Frontend)     │      │  (Backend)      │      │  (Database)     │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## Performance Optimization

### Frontend Optimization
1. Code splitting and lazy loading
2. Memoization of expensive calculations
3. Virtual scrolling for large data sets
4. Optimized bundle size
5. Asset optimization (images, fonts)
6. Caching strategies

### Backend Optimization
1. Database indexing
2. Query optimization
3. Response caching
4. Pagination for large data sets
5. Efficient data processing algorithms
6. Horizontal scaling capability

## Error Handling and Logging

### Frontend Error Handling
1. Global error boundary
2. Axios interceptors for API errors
3. User-friendly error messages
4. Error tracking service integration

### Backend Error Handling
1. Centralized error handling middleware
2. Structured error responses
3. Comprehensive logging with Winston
4. Monitoring and alerting

## Testing Strategy

### Frontend Testing
1. Unit tests for components and utilities
2. Integration tests for complex components
3. End-to-end tests for critical user flows
4. Snapshot testing for UI components

### Backend Testing
1. Unit tests for services and utilities
2. Integration tests for API endpoints
3. Database tests with in-memory MongoDB
4. Authentication and authorization tests

## Conclusion
This architecture provides a solid foundation for building a modern, scalable, and maintainable Trading Journal web application. The design focuses on user experience, performance, security, and maintainability while ensuring all the functionality from the Android app is preserved and enhanced for web usage.
