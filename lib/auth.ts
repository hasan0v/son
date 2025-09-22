import { prisma } from './db'
import bcrypt from 'bcryptjs'
import { signAdminJwt } from './jwt'
import { setAdminCookie } from './cookies'

export async function login(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ 
    where: { email } 
  })
  
  if (!admin) {
    throw new Error('Invalid credentials')
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash)
  
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  const token = await signAdminJwt({ 
    sub: admin.id, 
    email: admin.email 
  })
  
  await setAdminCookie(token)
  
  return admin
}