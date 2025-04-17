
#!/bin/bash

# Budget Savvy Installation Script
echo "Budget Savvy Installation Script"
echo "--------------------------------"

# Check for Node.js and npm
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "Node.js and npm are required but not installed. Please install them first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
if [ $NODE_MAJOR -lt 14 ]; then
    echo "Node.js version 14 or higher is required. You have version $NODE_VERSION."
    exit 1
fi

echo "✓ Node.js and npm found."

# Install dependencies
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies."
    exit 1
fi
echo "✓ Dependencies installed successfully."

# Build the application
echo "Building the application..."
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build the application."
    exit 1
fi
echo "✓ Application built successfully. Build files are in the 'dist' directory."

# Check for Apache
APACHE_INSTALLED=false
if command -v apache2 &> /dev/null || command -v httpd &> /dev/null; then
    APACHE_INSTALLED=true
    echo "✓ Apache detected on your system."
    
    # Create a sample Apache virtual host configuration
    echo "Creating sample Apache virtual host configuration..."
    cat > budget-savvy-apache.conf << EOF
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /path/to/budget-savvy/dist
    
    <Directory "/path/to/budget-savvy/dist">
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog \${APACHE_LOG_DIR}/budget-savvy-error.log
    CustomLog \${APACHE_LOG_DIR}/budget-savvy-access.log combined
</VirtualHost>
EOF
    echo "✓ Sample Apache configuration created: budget-savvy-apache.conf"
fi

# Check for Nginx
NGINX_INSTALLED=false
if command -v nginx &> /dev/null; then
    NGINX_INSTALLED=true
    echo "✓ Nginx detected on your system."
    
    # Create a sample Nginx server block configuration
    echo "Creating sample Nginx server block configuration..."
    cat > budget-savvy-nginx.conf << EOF
server {
    listen 80;
    server_name yourdomain.com;
    
    root /path/to/budget-savvy/dist;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    error_log /var/log/nginx/budget-savvy-error.log;
    access_log /var/log/nginx/budget-savvy-access.log;
}
EOF
    echo "✓ Sample Nginx configuration created: budget-savvy-nginx.conf"
fi

if [ "$APACHE_INSTALLED" = false ] && [ "$NGINX_INSTALLED" = false ]; then
    echo "! No web server detected. You'll need to configure a web server manually."
fi

echo ""
echo "Installation Complete!"
echo "----------------------"
echo "Next Steps:"
echo "1. Copy the 'dist' directory to your web server's document root"
echo "2. Configure your web server using the provided sample configuration"
echo "3. Update the configuration with your actual domain and paths"
echo "4. Restart your web server"
echo ""
echo "For detailed instructions, please refer to the setup-guide.md file."
