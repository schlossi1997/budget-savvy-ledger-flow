
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

## Step 3: Build the Application

Create a production build:

```bash
npm run build
```

This will generate a `dist` directory containing optimized static files.

## Step 4: Deploy to Web Server

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

## Step 5: Initial System Setup

When you first access your Budget Savvy instance, you'll be automatically redirected to the setup page where you can configure:

1. **Administrator Account**
   - Create your admin account with name, email, and password
   - Set salary information for budget recommendations

2. **Branding**
   - Set your company name
   - Upload a company logo (or provide a URL)
   - Choose your primary application color

3. **SMTP Settings (Optional)**
   - Configure email server details for notifications
   - Set up the "from" email address

After completing the setup, you'll be redirected to the login page where you can sign in with your newly created credentials.

## Step 6: Interactive Tour

After logging in for the first time, Budget Savvy will present an interactive tour that guides new users through the key features:

- **Welcome**: Introduction to Budget Savvy
- **Dashboard**: Overview of financial status and quick access to important information
- **Transactions**: Recording income and expenses
- **Budgets**: Setting up and managing budget categories
- **Analysis**: Financial insights and reports
- **Settings**: Customizing the application
- **Completion**: Final steps and getting started tips

The tour only appears once after initial login. Users can exit the tour at any time, and it will be marked as completed.

## Important Notes

- The setup page is only accessible once during initial configuration
- If you need to reconfigure any settings after initial setup, use the Settings page
- For security reasons, changing certain system-wide settings after initial setup may require additional verification

## Customization Options

### Changing the Authentication Method

To replace the mock authentication with a real backend:

1. Edit `src/contexts/AuthContext.tsx`
2. Replace the mock authentication with calls to your API
3. Update the user data structure as needed

### Database Integration

For storing real financial data:

1. Set up a database (MySQL, PostgreSQL, MongoDB, etc.)
2. Create an API to interact with your database
3. Modify the data service files to connect to your API

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

### Issue: Setup Page Redirects in a Loop

If you're stuck in a redirect loop with the setup page:

1. Clear your browser's local storage
2. Ensure you've completed all required setup fields
3. Check for JavaScript errors in the browser console

### Issue: Tour Not Appearing

If the interactive tour doesn't appear after the first login:

1. Check browser console for errors
2. Clear your browser's local storage and try again
3. Ensure TourProvider is properly set up in App.tsx

## Support and Resources

For additional help:
- Consult the project documentation
- Visit the project repository for issues and updates
- Contact your system administrator for server-specific questions
