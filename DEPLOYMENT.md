# SON Təmizlik Məhsulları - Deployment Guide

## 🚀 Production Deployment

### Prerequisites

1. **Neon PostgreSQL Database**
   - Create account at [neon.tech](https://neon.tech)
   - Create a new database
   - Copy the connection string

2. **EmailJS Account**
   - Create account at [emailjs.com](https://emailjs.com)
   - Set up email service
   - Get public key, service ID, and template ID

### Environment Setup

1. **Create production environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update environment variables:**
   ```env
   DATABASE_URL="your-neon-database-url"
   JWT_SECRET="your-strong-secret-key"
   ADMIN_SEED_EMAIL="admin@son.az"
   ADMIN_SEED_PASSWORD="your-secure-password"
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
   NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-service-id"
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-template-id"
   ```

### Database Setup

1. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

2. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed initial data:**
   ```bash
   npx prisma db seed
   ```

### Deployment Options

#### Option 1: Vercel (Recommended)

1. **Connect to Vercel:**
   - Push code to GitHub/GitLab
   - Import project in Vercel
   - Add environment variables in Vercel dashboard

2. **Build settings:**
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

#### Option 2: VPS/Docker

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Docker deployment:**
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npx prisma generate
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

### Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Verify product listings work
- [ ] Test contact form submission
- [ ] Check admin login functionality
- [ ] Test product/category CRUD operations
- [ ] Verify file upload works
- [ ] Test EmailJS integration
- [ ] Check sitemap.xml generation
- [ ] Verify robots.txt accessibility

### Performance Optimization

1. **Enable caching headers**
2. **Optimize images with Next.js Image component**
3. **Use CDN for static assets**
4. **Monitor Core Web Vitals**

### Security Checklist

- [ ] Security headers configured
- [ ] Admin routes protected
- [ ] File upload validation enabled
- [ ] Environment variables secured
- [ ] Database connection encrypted
- [ ] No sensitive data in client code

### Monitoring

1. **Setup error tracking** (Sentry, LogRocket)
2. **Monitor performance** (Vercel Analytics, Google Analytics)
3. **Database monitoring** (Neon dashboard)
4. **Uptime monitoring** (Pingdom, UptimeRobot)

## 🛠️ Local Development

### First Time Setup

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd son
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env.local
   # Update .env.local with your values
   ```

4. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio

### Default Admin Credentials

- **Email:** admin@son.az
- **Password:** change-this-password (update in .env.local)

## 📞 Support

For deployment issues, check:
1. Environment variables are correctly set
2. Database connection is working
3. All dependencies are installed
4. Build process completes successfully

## 🔧 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify DATABASE_URL is correct
   - Check Neon database is active
   - Ensure SSL mode is enabled

2. **Build failures**
   - Clear .next directory
   - Delete node_modules and reinstall
   - Check for TypeScript errors

3. **EmailJS not working**
   - Verify public key, service ID, template ID
   - Check EmailJS dashboard for quotas
   - Test email configuration

4. **File upload issues**
   - Check file size limits
   - Verify upload directory permissions
   - Test with different file types