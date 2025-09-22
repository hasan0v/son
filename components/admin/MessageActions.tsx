'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteMessageAction, markMessageHandled } from '@/actions/contact'
import { toast } from 'sonner'

interface MessageActionsProps {
  messageId: string
  customerName: string
  isHandled: boolean
}

export default function MessageActions({ messageId, customerName, isHandled }: MessageActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMarkingHandled, setIsMarkingHandled] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const result = await deleteMessageAction(messageId)
      
      if (result.success) {
        toast.success('Mesaj uğurla silindi')
        setDeleteDialogOpen(false)
      } else {
        toast.error('Mesaj silinərkən xəta baş verdi')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Xəta baş verdi')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleMarkHandled = async () => {
    setIsMarkingHandled(true)
    
    try {
      const result = await markMessageHandled(messageId)
      
      if (result.success) {
        toast.success('Mesaj cavablandı kimi işarələndi')
      } else {
        toast.error('Xəta baş verdi')
      }
    } catch (error) {
      console.error('Mark handled error:', error)
      toast.error('Xəta baş verdi')
    } finally {
      setIsMarkingHandled(false)
    }
  }

  return (
    <div className="flex gap-2 pt-2">
      {!isHandled && (
        <Button 
          onClick={handleMarkHandled}
          disabled={isMarkingHandled}
          variant="outline" 
          size="sm"
        >
          {isMarkingHandled ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              İşarələnir...
            </div>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cavablandı kimi işarələ
            </>
          )}
        </Button>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Sil
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mesajı sil</DialogTitle>
            <DialogDescription>
              <strong>{customerName}</strong> adlı şəxsin mesajını silmək istədiyinizə əminsiniz? 
              Bu əməliyyat geri qaytarıla bilməz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Ləğv et
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Silinir...
                </div>
              ) : (
                'Sil'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}