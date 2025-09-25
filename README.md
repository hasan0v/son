# SON Təmizlik Məhsulları

Modern və funksional bir təmizlik məhsulları e-ticarət saytı. Next.js 15, TypeScript, Tailwind CSS və Prisma ilə hazırlanmışdır.

## 🌟 Xüsusiyyətlər

### 🎯 Ana Funksiyalar
- **Məhsul Kataloqu** - Kateqoriyalar üzrə filtrlənə bilən məhsul siyahısı
- **Əlaqə Formu** - EmailJS inteqrasiyası ilə birbaşa e-poçt göndərmə
- **Admin Paneli** - Məhsul və kateqoriya idarəetməsi
- **Şəkil Yükləmə** - Məhsul şəkillərinin local və ya URL vasitəsilə əlavə edilməsi
- **Responsive Dizayn** - Bütün cihazlarda mükəmməl görünüm

### 🔧 Texniki Xüsusiyyətlər
- **Next.js 15** - App Router və Server Actions
- **TypeScript** - Tam tip təhlükəsizliyi
- **Prisma ORM** - PostgreSQL inteqrasiyası
- **JWT Authentication** - Təhlükəsiz admin girişi
- **Tailwind CSS** - Modern və responsive styling
- **Framer Motion** - Səlis animasiyalar
- **Zod Validation** - Form validasiyası
- **EmailJS** - E-poçt göndərmə

## 🚀 Texnologiyalar

- **Frontend:** Next.js 15, React 19, TypeScript
- **Backend:** Next.js API Routes, Server Actions
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Styling:** Tailwind CSS, Shadcn-ui
- **Animations:** Framer Motion
- **Authentication:** JWT, HTTP-only cookies
- **Forms:** React Hook Form, Zod validation
- **Email:** EmailJS
- **Deployment:** Vercel/VPS ready

## 🚀 Qısa Başlanğıc

1. **Dependency-ləri quraşdırın:**
   ```bash
   npm install
   ```

2. **Environment-i konfiqurasiya edin:**
   ```bash
   cp .env.example .env.local
   ```

3. **Database-i quraşdırın:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Development serveri başladın:**
   ```bash
   npm run dev
   ```

## 📁 Proyekt Strukturu

```
son/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel səhifələri
│   ├── api/               # API routes
│   ├── products/          # Məhsul səhifələri
│   └── layout.tsx         # Root layout
├── components/            # React komponentləri
│   ├── ui/               # Shadcn-ui komponentləri
│   ├── forms/            # Form komponentləri
│   ├── layout/           # Layout komponentləri
│   ├── products/         # Məhsul komponentləri
│   └── animations/       # Animasiya komponentləri
├── lib/                  # Utility funksiyaları
├── actions/              # Server Actions
├── prisma/               # Database schema və seed
└── public/              # Static fayllar
```

## 📱 Səhifələr

### İctimai Səhifələr
- **Ana Səhifə** (`/`) - Hero, kateqoriyalar, featured məhsullar, əlaqə
- **Məhsullar** (`/products`) - Filtrlənə bilən məhsul siyahısı

### Admin Paneli
- **Dashboard** (`/admin`) - Statistikalar və qısa əməliyyatlar
- **Məhsullar** (`/admin/products`) - Məhsul idarəetməsi
- **Kateqoriyalar** (`/admin/categories`) - Kateqoriya idarəetməsi
- **Mesajlar** (`/admin/messages`) - Əlaqə mesajları

## 🔐 Təhlükəsizlik

- **JWT Authentication** - 7 günlük token müddəti
- **HTTP-only Cookies** - XSS qarşısında qorunma
- **Middleware Protection** - Admin route-ların qorunması
- **File Upload Validation** - Təhlükəsiz fayl yükləmə
- **Security Headers** - CSP, XSS, CSRF qorunması

## 📊 Performance

- **Core Web Vitals** optimizasiyası
- **Image Optimization** - Next.js Image komponent
- **Caching Strategy** - Next.js cache tags
- **Lazy Loading** - Suspense boundaries

---

**SON** - Təmizlik məhsullarında keyfiyyət və etimad! 🧽✨
