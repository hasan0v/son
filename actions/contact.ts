'use server'

import { prisma } from '@/lib/db'
import { contactSchema } from '@/lib/validators'
import { revalidatePath } from 'next/cache'

export async function submitContactAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string || undefined,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      message: formData.get('message') as string,
    }

    // Clean the data - convert empty strings to undefined for optional fields
    const cleanedData = {
      name: rawData.name?.trim() || '',
      company: rawData.company?.trim() || undefined,
      email: rawData.email?.trim() || undefined,
      phone: rawData.phone?.trim() || undefined,
      message: rawData.message?.trim() || '',
    }

    // Validate the data
    const validatedData = contactSchema.parse(cleanedData)

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        company: validatedData.company || null,
        email: validatedData.email || null,
        phone: validatedData.phone || null,
        message: validatedData.message,
      }
    })

    // Revalidate admin messages page if it exists
    revalidatePath('/admin/messages')

    return { 
      success: true, 
      message: 'Mesajınız uğurla göndərildi!',
      id: contactMessage.id 
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return { 
      success: false, 
      message: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' 
    }
  }
}

export async function markMessageHandled(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { handled: true }
    })
    
    revalidatePath('/admin/messages')
    return { success: true }
  } catch (error) {
    console.error('Error marking message as handled:', error)
    return { success: false }
  }
}

export async function deleteMessageAction(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id }
    })
    
    revalidatePath('/admin/messages')
    return { success: true }
  } catch (error) {
    console.error('Error deleting message:', error)
    return { success: false }
  }
}