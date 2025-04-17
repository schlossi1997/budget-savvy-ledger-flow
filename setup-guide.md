
# Budget Savvy Setup Guide

This guide will walk you through setting up Budget Savvy on your own server.

## Prerequisites

Before you begin, ensure you have:

- A web server with Apache or Nginx
- Node.js and npm installed (for building the application)
- Git (optional, for cloning the repository)

## Step 1: Obtain the Source Code

### Option A: Clone from Git Repository

```bash
# Clone the repository
git clone <your-repository-url>
cd budget-savvy
```

### Option B: Download Source Code

Download the source code archive and extract it to your desired location.

## Step 2: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
npm install
```

## Step 3: Configure the Application

The application uses a simple authentication system. For a production environment, you should modify the authentication in `src/contexts/AuthContext.tsx`.

Currently, the login credentials are:
- Email: `admin@example.com`
- Password: `password`

You may want to:
- Connect to a real authentication API
- Set up a database for user management
- Configure environment-specific settings

## Step 4: Build the Application

Create a production build:

```bash
npm run build
```

This will generate a `dist` directory containing optimized static files.

## Step 5: Deploy to Web Server

### For Apache Server

1. Copy the contents of the `dist` directory to your web server's document root.

2. Ensure the `.htaccess` file is included in the root directory:

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

3. Enable Apache's mod_rewrite module:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

4. Ensure your virtual host configuration allows `.htaccess` overrides:

```apache
<Directory /path/to/your/document/root>
    AllowOverride All
</Directory>
```

### For Nginx Server

1. Copy the contents of the `dist` directory to your web server's document root.

2. Configure your Nginx server block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Test and reload Nginx:

```bash
nginx -t
sudo systemctl reload nginx
```

## Step 6: Verify the Installation

1. Navigate to your domain in a web browser
2. Verify you can access the login page
3. Log in with the default credentials (or your custom configuration)
4. Confirm all functionality works correctly

## Customization Options

### Changing the Default Authentication

To replace the mock authentication with a real backend:

1. Edit `src/contexts/AuthContext.tsx`
2. Replace the mock authentication with calls to your API
3. Update the user data structure as needed

### Database Integration

For storing real financial data:

1. Set up a database (MySQL, PostgreSQL, MongoDB, etc.)
2. Create an API to interact with your database
3. Modify the data service files to connect to your API

### Styling and Branding

To customize the look and feel:

1. Edit the tailwind configuration in `tailwind.config.ts`
2. Update logos and icons in the `public` directory
3. Modify component styles as needed

## Troubleshooting

### Issue: Page Not Found on Refresh

If you encounter 404 errors when refreshing pages:

- For Apache: Ensure mod_rewrite is enabled and .htaccess is properly configured
- For Nginx: Verify the try_files directive is correctly set up

### Issue: Authentication Not Working

If login fails:

- Check browser console for errors
- Verify your authentication API is properly connected
- Ensure CORS is correctly configured if API is on a different domain

### Issue: Styling or Layout Problems

If the application appears broken:

- Clear browser cache and reload
- Verify all CSS and JavaScript files are properly loaded
- Check for console errors related to resource loading

## Security Considerations

Before deploying to production:

1. Replace mock authentication with a secure authentication system
2. Implement proper HTTPS using SSL/TLS certificates
3. Set appropriate Content Security Policy headers
4. Regularly update dependencies to patch security vulnerabilities

## Support and Resources

For additional help:
- Consult the project documentation
- Visit the project repository for issues and updates
- Contact your system administrator for server-specific questions
