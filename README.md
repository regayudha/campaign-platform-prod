# CampaignHub - Marketing Campaign Platform

A modern, full-stack marketing campaign platform built with Next.js, featuring AI-powered insights, real-time analytics, and a beautiful user experience.

## 🚀 Features

### Core Features
- **Landing Page**: Beautiful, responsive landing page with hero banner and call-to-action
- **User Registration**: Complete sign-up form with validation and confirmation screen
- **Admin Dashboard**: Secure admin panel with user management and analytics
- **Real-time Analytics**: Track page views, signups, and user interactions

### Innovation Add-ons
- **Progressive Web App (PWA)**: Installable app with offline capabilities
- **Advanced Analytics**: Scroll depth tracking, user behavior analytics
- **Social Media Integration**: Share functionality with tracking
- **Mobile-First Design**: Fully responsive with optimized mobile experience
- **Real-time Data**: Live dashboard updates and instant notifications

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Database**: PostgreSQL with Supabase (Production) / SQLite (Development)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with JWT
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Analytics**: Custom analytics system with event tracking

## 📋 Requirements Met

✅ **Landing Page**: Branded layout with campaign message and CTA  
✅ **Sign-Up Form**: Collects name, email, phone with validation  
✅ **Database Storage**: Prisma with SQLite for data persistence  
✅ **Admin Dashboard**: Authentication and user management  
✅ **Analytics**: Real-time tracking and reporting  
✅ **Innovation**: PWA features, social sharing, advanced analytics  

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**:
```bash
git clone https://github.com/regayudha/campaign-platform-local.git
cd campaign-platform-local
npm install
```

2. **Create environment file**:

**Option A: Copy from example (Recommended)**:
```bash
# Copy the example file and edit if needed
cp .env.example .env.local
```

**Option B: Create manually**:
```bash
# For Linux/Mac
echo "DATABASE_URL=file:./dev.db" > .env.local
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local
echo "NEXTAUTH_SECRET=campaign-hub-secret-key-2024" >> .env.local
echo "ADMIN_EMAIL=admin@campaign.com" >> .env.local
echo "ADMIN_PASSWORD=admin123" >> .env.local

# For Windows PowerShell
'DATABASE_URL="file:./dev.db"' | Out-File .env.local
'NEXTAUTH_URL="http://localhost:3000"' | Add-Content .env.local
'NEXTAUTH_SECRET="campaign-hub-secret-key-2024"' | Add-Content .env.local
'ADMIN_EMAIL="admin@campaign.com"' | Add-Content .env.local
'ADMIN_PASSWORD="admin123"' | Add-Content .env.local
```

**Option C: Manual creation** - Create a `.env.local` file with:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="campaign-hub-secret-key-2024"
ADMIN_EMAIL="admin@campaign.com"
ADMIN_PASSWORD="admin123"
```

3. **Set up the database**:
```bash
npm run setup
```

This command will:
- Generate Prisma client
- Create SQLite database
- Initialize with admin user and sample data

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser**:
   - Landing Page: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Admin Credentials
- **Email**: admin@campaign.com
- **Password**: admin123

### Troubleshooting

**Issue**: `Environment variable not found: DATABASE_URL` error
- **Solution**: Make sure you've created the `.env.local` file in step 2
- **If you see the error "Environment variable not found: DATABASE_URL"**, change `.env.local` to `.env`:
  ```bash
  # Linux/Mac
  cp .env.local .env
  
  # Windows PowerShell
  Copy-Item .env.local .env
  ```
- **Alternative**: Rename your environment file from `.env.local` to `.env` if Prisma can't find the variables

**Issue**: Database setup fails
- **Solution**: Run the commands individually:
  ```bash
  npm run db:generate
  npm run db:push
  npm run db:init
  ```

## 📖 Usage Guide

### For Visitors
1. Visit the landing page to learn about CampaignHub
2. Fill out the sign-up form with your details
3. Receive confirmation and welcome message

### For Admins
1. Navigate to `/admin/login`
2. Log in with admin credentials
3. View dashboard with:
   - Total signups and analytics
   - Recent user registrations
   - Export functionality for user data

## 🎨 Innovation Features

### Progressive Web App (PWA)
- **Installable**: Users can install the app on their devices
- **Offline Ready**: Core functionality works without internet
- **Native Feel**: App-like experience on mobile and desktop

### Advanced Analytics
- **Page View Tracking**: Monitor visitor engagement
- **Scroll Depth Analysis**: Understand content consumption
- **Conversion Funnel**: Track user journey from landing to signup
- **Real-time Dashboard**: Live updates without page refresh

### Social Media Integration
- **Native Sharing**: Uses Web Share API when available
- **Platform-Specific Sharing**: Twitter, Facebook, LinkedIn integration
- **Share Tracking**: Monitor viral coefficient and referral sources

### Mobile-First Design
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Fast Loading**: Optimized images and code splitting

## 📊 Analytics Dashboard

The admin dashboard provides comprehensive insights:

- **User Metrics**: Total signups, daily/weekly trends
- **Engagement Analytics**: Page views, session duration
- **Conversion Tracking**: Signup rates and funnel analysis
- **Export Capabilities**: Download user data as CSV

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup        # Initialize database and admin user
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:init      # Initialize database with sample data
```

## 📁 Project Structure

```
campaign-platform/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── admin/          # Admin pages
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Hero.tsx       # Landing page hero
│   │   ├── Features.tsx   # Features section
│   │   └── SignupForm.tsx # User registration form
│   └── lib/               # Utility functions
│       ├── prisma.ts      # Database client
│       ├── auth.ts        # Authentication config
│       └── analytics.ts   # Analytics utilities
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
├── scripts/
│   └── init-db.js        # Database initialization
└── package.json
```

## 🚀 Deployment

### PostgreSQL + Supabase + Vercel (Recommended)

**📖 For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

Quick steps:
1. Create Supabase project and get DATABASE_URL
2. Push code to GitHub
3. Deploy to Vercel with environment variables
4. Initialize database using setup API endpoint

### Legacy SQLite Deployment
1. Build the project: `npm run build`
2. Set up production database
3. Configure environment variables
4. Start production server: `npm start`

## 🔒 Environment Variables

The repository includes a `.env.example` file with all required variables. 

Create a `.env.local` file (copy from `.env.example` or create manually):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
ADMIN_EMAIL="admin@campaign.com"
ADMIN_PASSWORD="admin123"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- **Email Integration**: Automated welcome emails and newsletters
- **A/B Testing**: Campaign optimization tools
- **Advanced Segmentation**: User behavior-based targeting
- **API Integration**: Third-party marketing tool connections
- **Multi-language Support**: Internationalization features

---

Built with ❤️ using Next.js, React, and modern web technologies.
