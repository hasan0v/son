import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Allowed image types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp'
]

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

function isAllowedType(mimeType: string): boolean {
  return ALLOWED_TYPES.includes(mimeType)
}

function sanitizeFilename(filename: string): string {
  // Remove or replace unsafe characters
  return filename
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9.\-_]/g, '') // Remove unsafe characters
    .toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'Fayl seçilməyib' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!isAllowedType(file.type)) {
      return NextResponse.json(
        { error: 'Dəstəklənməyən fayl formatı. Yalnız JPEG, PNG və WebP faylları qəbul edilir.' },
        { status: 415 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Fayl ölçüsü böyükdür. Maksimum 5MB icazə verilir.' },
        { status: 413 }
      )
    }

    // Generate unique filename
    const sanitizedName = sanitizeFilename(file.name)
    const timestamp = Date.now()
    const filename = `products/${timestamp}-${sanitizedName}`
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    // Return the public URL
    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: filename,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { error: 'Fayl yükləmə zamanı xəta baş verdi' },
      { status: 500 }
    )
  }
}

// Optionally handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}