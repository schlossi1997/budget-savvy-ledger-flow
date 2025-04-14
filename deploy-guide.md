
# Deploying Budget Savvy to Your Web Server

This guide will help you deploy the Budget Savvy application to your own web server.

## Step 1: Build the Application

Run the following command in your project directory:

```bash
npm run build
```

This will create a `dist` folder containing the optimized production-ready files.

## Step 2: Configure Your Web Server

### For Apache Server

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

### For Nginx Server

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

## Step 3: Important Note About the GPT Engineer Script

Ensure that the following script tag remains in your `index.html` file, as it's essential for the "Select" feature:

```html
<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
```

This script should be placed before the main application script. Removing or modifying this script tag will disable the Pick and Edit functionality.

## Step 4: Environment Variables (If Needed)

If your application uses environment variables, make sure to set them on your server or create a `.env` file in your production environment.

## Step 5: Testing

After deployment, test all features of your application to ensure everything works as expected.
