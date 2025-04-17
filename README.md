
# Budget Savvy: Financial Management Application

## Overview

Budget Savvy is a comprehensive web application designed to help users manage their personal finances effectively. Built with modern web technologies, it provides intuitive tools for tracking transactions, creating budgets, and gaining financial insights.

## Technologies

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: React Query
- **Routing**: React Router
- **Build Tool**: Vite

## Key Features

- 📊 Dashboard with financial overview
- 💸 Transaction tracking and management
- 🏦 Budget creation and monitoring
- 📈 Financial analysis and reporting
- 🔐 Secure user authentication
- 🚀 Interactive first-time user tour

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
```bash
git clone <your-repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## First-Time Setup

When you first launch Budget Savvy, you'll be guided through an initial setup process:

1. **Create Admin Account**
   - Set up your primary administrator credentials
   - Configure initial profile information

2. **Branding Configuration**
   - Customize your application's appearance
   - Set company name
   - Upload logo
   - Choose color theme

3. **Optional SMTP Configuration**
   - Configure email notification settings
   - Set up sender email address

## Interactive Tour

After initial setup, Budget Savvy offers a guided tour to help you understand the application's key features:

- Welcome introduction
- Dashboard overview
- Transaction management
- Budget tracking
- Financial analysis
- Settings exploration

The tour appears only once after the first login and can be exited at any time.

## Deployment

For detailed deployment instructions, refer to `deploy-guide.md` in the project root.

### Quick Deploy Options

- **Local Deployment**: Use `npm run build` to generate production files
- **Web Hosting**: Configure Apache or Nginx using provided configuration templates
- **One-Click Deploy**: Use Lovable's publish feature

## Customization

- Modify authentication methods in `src/contexts/AuthContext.tsx`
- Extend database integration in data service files
- Customize UI components using Tailwind CSS and Shadcn/UI

## Troubleshooting

Consult `setup-guide.md` for common issues and their solutions.

## Support

- Review project documentation
- Check GitHub repository for issues and updates
- Contact system administrator for specific questions

## License

[Your License Information]

## Contributing

[Contribution Guidelines]
