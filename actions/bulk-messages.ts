'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function bulkDeleteMessagesAction(messageIds: string[]) {
  try {
    await prisma.contactMessage.deleteMany({
      where: {
        id: {
          in: messageIds
        }
      }
    })
    
    revalidatePath('/admin/messages')
    return { success: true, count: messageIds.length }
  } catch (error) {
    console.error('Error bulk deleting messages:', error)
    return { success: false }
  }
}

export async function bulkMarkHandledAction(messageIds: string[]) {
  try {
    await prisma.contactMessage.updateMany({
      where: {
        id: {
          in: messageIds
        }
      },
      data: {
        handled: true
      }
    })
    
    revalidatePath('/admin/messages')
    return { success: true, count: messageIds.length }
  } catch (error) {
    console.error('Error bulk marking messages as handled:', error)
    return { success: false }
  }
}