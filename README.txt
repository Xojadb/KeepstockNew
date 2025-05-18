# KeepStock XPTN - Inventory Management System

## Database Setup

### MySQL Tables Structure

1. users
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role ENUM('store', 'manager', 'admin') NOT NULL,
  branch VARCHAR(50),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. boxes
```sql
CREATE TABLE boxes (
  id VARCHAR(36) PRIMARY KEY,
  number VARCHAR(20) NOT NULL,
  category ENUM('A', 'B', 'C') NOT NULL,
  branch VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_box_number (number, branch)
);
```

3. box_items
```sql
CREATE TABLE box_items (
  id VARCHAR(36) PRIMARY KEY,
  box_id VARCHAR(36) NOT NULL,
  sku VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (box_id) REFERENCES boxes(id),
  UNIQUE KEY unique_box_sku (box_id, sku)
);
```

4. products
```sql
CREATE TABLE products (
  sku VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  rack_number VARCHAR(20) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  stock_new INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. activity_logs
```sql
CREATE TABLE activity_logs (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  action ENUM('input', 'refill', 'update', 'login', 'logout', 'csv_upload') NOT NULL,
  details TEXT NOT NULL,
  sku VARCHAR(50),
  box_id VARCHAR(36),
  category ENUM('A', 'B', 'C'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment Instructions

1. Database Setup
   - Create MySQL database named 'keepstock_db'
   - Import SQL schema from `database/schema.sql`
   - Create database user and set permissions

2. Project Files
   - Upload all files to public_html/keepstock directory
   - Ensure node_modules is excluded
   - Set proper file permissions (755 for directories, 644 for files)

3. Environment Setup
   - Create .env file in project root
   - Configure database connection:
     ```
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=keepstock_db
     ```

4. Build Process
   ```bash
   npm install
   npm run build
   ```

5. Web Server Configuration
   - Configure Apache/Nginx for SPA routing
   - Set up SSL certificate
   - Configure proper CORS headers

## Project Structure

```
keepstock-xptn/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Zustand state management
│   ├── types/         # TypeScript type definitions
│   └── config/        # Configuration files
├── public/            # Static assets
└── database/          # SQL schema and migrations
```

## Maintenance Guide

1. Adding New Features
   - Follow existing component patterns
   - Update types in types/index.ts
   - Add new store methods as needed
   - Test thoroughly before deployment

2. Database Changes
   - Create migration files in database/migrations
   - Test migrations in development first
   - Backup production database before applying

3. User Management
   - Use admin panel to manage users
   - Ensure proper role assignments
   - Regular security audits

4. Troubleshooting
   - Check server logs
   - Verify database connections
   - Monitor error tracking
   - Regular backups