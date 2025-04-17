
@echo off
echo Budget Savvy Installation Script
echo --------------------------------

REM Check for Node.js and npm
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js and npm are required but not installed. Please install them first.
    exit /b 1
)

echo v Node.js and npm found.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies.
    exit /b 1
)
echo v Dependencies installed successfully.

REM Build the application
echo Building the application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build the application.
    exit /b 1
)
echo v Application built successfully. Build files are in the 'dist' directory.

echo.
echo Installation Complete!
echo ----------------------
echo Next Steps:
echo 1. Copy the 'dist' directory to your web server's document root
echo 2. Configure your web server to serve the application
echo 3. If using Apache, ensure the .htaccess file is included
echo 4. Restart your web server
echo.
echo For detailed instructions, please refer to the setup-guide.md file.

pause
