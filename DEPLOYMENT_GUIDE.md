# Deployment Guide: Dual Database Setup (SQLite + PostgreSQL)

## Overview
This project supports both **SQLite for local development** and **PostgreSQL for production deployment** on Vercel with Supabase.

## Quick Start Checklist

### Local Development
- [x] SQLite database configured for local development
- [x] Admin credentials hardcoded in environment variables
- [x] Development server ready to run

### Production Deployment
- [ ] Create Supabase project and get DATABASE_URL
- [ ] Set up Vercel environment variables
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Run database migration
- [ ] Initialize admin user
- [ ] Test admin login

---

## 1. Local Development (SQLite)

Your local environment is already configured with SQLite:

```env
# .env.local (current setup)
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@campaign.com"
ADMIN_PASSWORD="admin123"
```

**Admin Login**: `admin@campaign.com` / `admin123`

## 2. Production Setup (Supabase PostgreSQL)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to Settings > Database and copy your connection string
4. The connection string format will be:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

### Step 2: Environment Variables

**For Local Development** (keep current `.env.local`):
```env
# Database - SQLite for local development
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

For production in Vercel, set these environment variables:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-production-secret-key"
NODE_ENV="production"
ADMIN_PASSWORD="your-secure-admin-password"
SETUP_SECRET="your-secret-setup-key"
```

## 3. Database Migration

Run these commands after setting up your environment:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Initialize with admin user and sample data
npm run db:init
```

## 4. Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the environment variables in Vercel dashboard:
   - Go to Settings > Environment Variables
   - Add all the production environment variables listed above
4. The first deployment will automatically start
5. After deployment, initialize the database:
   
   **Option A: Using the setup API endpoint**
   - Add `SETUP_SECRET="your-secret-setup-key"` to your Vercel environment variables
   - Make a POST request to: `https://your-app.vercel.app/api/setup?key=your-secret-setup-key`
   
   **Option B: Manual initialization**
   - Clone your repo locally with production environment variables
   - Run: `npm run setup:production`

### Important Vercel Settings:
- Framework Preset: Next.js
- Build Command: `npm run build` (automatically includes Prisma generation)
- Output Directory: `.next` (default)
- Install Command: `npm install` (includes postinstall Prisma generation)

## 5. Generate NextAuth Secret

Generate a secure secret for production:
```bash
openssl rand -base64 32
```

## 6. Admin Login Credentials

After running `npm run db:init`:
- Email: admin@campaign.com
- Password: admin123

**Important**: Change the admin password after first login in production!
