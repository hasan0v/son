import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Ad minimum 2 simvol olmalıdır'),
  company: z.string().optional(),
  email: z.string().optional().refine((val) => {
    if (!val || val.trim() === '') return true; // Allow empty email
    return z.string().email().safeParse(val).success; // Validate if provided
  }, 'Düzgün e-poçt ünvanı daxil edin'),
  phone: z.string().optional(),
  message: z.string().min(5, 'Mesaj minimum 5 simvol olmalıdır'),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Kateqoriya adı minimum 2 simvol olmalıdır'),
  desc: z.string().transform(val => val.trim() === '' ? undefined : val).optional(),
})

export const productSchema = z.object({
  title: z.string().min(2, 'Məhsul adı minimum 2 simvol olmalıdır'),
  categoryId: z.string().min(1, 'Kateqoriya seçin'),
  description: z.string().optional(),
  imageUrl: z.string().optional().refine((val) => {
    if (!val || val === '') return true;
    
    // Allow relative paths (uploaded files)
    if (val.startsWith('/uploads/')) return true;
    if (val.startsWith('./') || val.startsWith('../')) return true;
    
    // Check if it's a valid URL
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, 'Düzgün URL və ya fayl yolu daxil edin'),
  volume: z.string().optional(),
  packSize: z.string().optional(),
  featured: z.boolean().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Düzgün e-poçt ünvanı daxil edin'),
  password: z.string().min(6, 'Şifrə minimum 6 simvol olmalıdır'),
})