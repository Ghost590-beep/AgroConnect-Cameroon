# 🚀 Deployment & Environment Setup Guide

## Server Information

- **Production Server:** 173.249.53.17
- **Server User:** mc
- **Application Type:** Node.js + React
- **Port:** 5000 (Backend) / 3000 (Frontend - if serving separately)

---

## 📋 Initial Server Setup

### 1. SSH Connection

```bash
ssh mc@173.249.53.17
# Password: Mc2026
```

### 2. Create Application Directory

```bash
mkdir -p ~/AgroConnect-Cameroon
cd ~/AgroConnect-Cameroon
```

### 3. Clone Repository

```bash
git clone https://github.com/Ghost590-beep/AgroConnect-Cameroon.git .
git checkout develop  # Start with develop branch for testing
```

### 4. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend  
cd ../client
npm install
```

### 5. Configure Environment Variables

#### Backend (.env)

```bash
# server/.env
PORT=5000
NODE_ENV=production

# Database
DB_HOST=localhost
DB_USER=agroconnect_user
DB_PASSWORD=SecurePassword123!
DB_NAME=agroconnect_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-this

# API Configuration
API_BASE=http://173.249.53.17

# File Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB

# CORS
CORS_ORIGIN=http://173.249.53.17:3000,http://173.249.53.17

# Logging
LOG_LEVEL=info
```

#### Frontend (.env)

```bash
# client/.env
VITE_API_BASE=http://173.249.53.17:5000
VITE_APP_NAME=AgroConnect
```

### 6. Setup Database

```bash
# Connect to MySQL
mysql -h localhost -u root -p

# Run these commands:
CREATE DATABASE agroconnect_db;
CREATE USER 'agroconnect_user'@'localhost' IDENTIFIED BY 'SecurePassword123!';
GRANT ALL PRIVILEGES ON agroconnect_db.* TO 'agroconnect_user'@'localhost';
FLUSH PRIVILEGES;

# Import schema
mysql -u agroconnect_user -p agroconnect_db < ./Database/Agrofamily.sql
```

---

## 🔄 Process Manager Setup (PM2)

### Install PM2 Globally

```bash
sudo npm install -g pm2
pm2 startup
pm2 save
```

### Create PM2 Configuration

Create `ecosystem.config.js` in project root:

```javascript
module.exports = {
  apps: [
    {
      name: 'agroconnect-backend',
      script: './server/index.js',
      cwd: '/home/mc/AgroConnect-Cameroon',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
```

### Start Applications with PM2

```bash
pm2 start ecosystem.config.js
pm2 status
pm2 logs

# Save startup configuration
pm2 save
```

---

## 🌐 Nginx Configuration (Reverse Proxy)

### Install Nginx

```bash
sudo apt update
sudo apt install nginx
```

### Configure Nginx

Create `/etc/nginx/sites-available/agroconnect`:

```nginx
upstream backend {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name 173.249.53.17;

    client_max_body_size 10M;

    # API Routes
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Static files
    location /uploads/ {
        alias /home/mc/AgroConnect-Cameroon/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Swagger Documentation
    location /api-docs {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### Enable Nginx Configuration

```bash
sudo ln -s /etc/nginx/sites-available/agroconnect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📊 Monitoring & Logs

### View Application Logs

```bash
# Backend logs
pm2 logs agroconnect-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Create Log Directory

```bash
mkdir -p ~/AgroConnect-Cameroon/logs
chmod 755 ~/AgroConnect-Cameroon/logs
```

---

## ✅ Deployment Checklist

- [ ] SSH access configured
- [ ] Git repository cloned
- [ ] Dependencies installed (npm ci)
- [ ] .env files created with secrets
- [ ] Database created and schema imported
- [ ] PM2 configured and running
- [ ] Nginx configured and running
- [ ] Health check endpoint responding
- [ ] API responds at http://173.249.53.17/api
- [ ] Uploads directory writable
- [ ] Logs directory created
- [ ] Monitoring set up

---

## 🚨 Common Issues & Solutions

### Port Already in Use

```bash
# Find process on port 5000
sudo lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Permission Denied on Uploads

```bash
cd ~/AgroConnect-Cameroon/server
chmod -R 755 uploads/
```

### Database Connection Failed

```bash
# Check MySQL is running
sudo service mysql status

# Test connection
mysql -h localhost -u agroconnect_user -p -e "SELECT 1"
```

---

**Last Updated:** 2026-06-08
**Environment:** Production (173.249.53.17)
