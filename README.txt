# KeepStock XPTN - Inventory Management System

## Overview
KeepStock XPTN is a modern inventory management system designed for efficient warehouse operations. It supports multiple user roles, branch management, and comprehensive inventory tracking.

## Features
- Multi-role user system (Store, Manager, Admin)
- Real-time inventory tracking
- Box management system with categories (A/B/C)
- Activity logging and analytics
- CSV data import/export
- Branch-specific inventory management
- Print-ready box labels

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- State Management: Zustand
- Icons: Lucide React
- Charts: Chart.js
- Routing: React Router

## Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

## Local Development Setup
1. Clone the repository
```bash
git clone [repository-url]
cd keepstock-xptn
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## Production Deployment Guide

### 1. Build the Application
```bash
npm run build
```
This creates a `dist` folder with production-ready files.

### 2. Web Hosting Setup

#### Option A: Static Hosting (Recommended)
1. Choose a static hosting provider (Netlify, Vercel, etc.)
2. Upload the contents of the `dist` folder
3. Configure redirects for SPA routing:

Create a `_redirects` file in the `public` folder:
```
/* /index.html 200
```

#### Option B: Traditional Web Hosting
1. Upload the `dist` folder contents to your web server
2. Configure your web server:

Apache (.htaccess):
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Nginx (nginx.conf):
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 3. Environment Setup
Create environment variables for production:
- VITE_API_URL: Your API endpoint
- Other necessary environment variables

### 4. Post-Deployment
1. Verify all routes work correctly
2. Test user authentication
3. Confirm data persistence
4. Check branch-specific features
5. Validate CSV import/export

## Security Considerations
- Enable HTTPS
- Set up proper CORS headers
- Implement rate limiting
- Configure CSP headers
- Regular security audits

## Maintenance
- Regular backups of data
- Monitor error logs
- Update dependencies
- Performance monitoring

## Support
For technical support or questions:
- Email: support@keepstock.com
- Documentation: [docs-url]
- Issue Tracker: [issues-url]