
# Deploying Budget Savvy to Your Web Server

This guide provides a brief overview of deploying Budget Savvy. For a more comprehensive setup guide, please refer to the `setup-guide.md` file.

## Quick Deployment Steps

### Step 1: Build the Application

Run the following command in your project directory:

```bash
npm run build
```

This will create a `dist` folder containing the optimized production-ready files.

### Step 2: Configure Your Web Server

#### For Apache Server

1. Upload all files from the `dist` folder to your web server's public directory.

2. Create a `.htaccess` file in the same directory with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### For Nginx Server

Configure your Nginx server block:

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## Initial System Setup

When you first access your Budget Savvy instance, you'll be automatically redirected to the setup page where you can configure:

1. **Administrator Account**
   - Create your admin account
   - Set name, email, and password
   - Configure salary information for budget recommendations

2. **Branding**
   - Set your company name
   - Upload a company logo or provide a URL
   - Choose your primary application color theme

3. **SMTP Settings (Optional)**
   - Configure email server details for notifications
   - Set up the sender email address

The setup page will only appear during the first access to your Budget Savvy instance. Once completed, you'll be redirected to the login page.

## Automated Installation

For an automated setup process, you can use:

- `install.sh` (for Linux/macOS users)
- `install.bat` (for Windows users)

These scripts will guide you through the installation process.

## Comprehensive Setup Guide

For a detailed setup guide including:
- Prerequisites
- Installation steps
- Configuration options
- Customization
- Troubleshooting

Please refer to the `setup-guide.md` file.
