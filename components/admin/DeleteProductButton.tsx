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
import { deleteProductAction } from '@/actions/products'
import { toast } from 'sonner'

interface DeleteProductButtonProps {
  productId: string
  productTitle: string
  categoryName: string
  productDescription?: string | null
}

export default function DeleteProductButton({ productId, productTitle, categoryName, productDescription }: DeleteProductButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const result = await deleteProductAction(productId)
      
      if (result.success) {
        toast.success('Məhsul uğurla silindi')
        setOpen(false)
      } else {
        toast.error(result.error || 'Məhsul silinərkən xəta baş verdi')
      }
    } catch (error) {
      console.error('Delete product error:', error)
      toast.error('Xəta baş verdi')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle>Məhsulu sil</DialogTitle>
          <DialogDescription>
            <strong>&quot;{productTitle}&quot;</strong> məhsulunu silmək istədiyinizə əminsiniz?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Kateqoriya:</span> {categoryName}
            </div>
            {productDescription && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Açıqlama:</span> {productDescription}
              </div>
            )}
          </div>
          <div className="text-sm text-red-600 font-medium">
            ⚠️ Bu əməliyyat geri qaytarıla bilməz və məhsul həmişəlik silinəcək.
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
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
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Məhsulu Sil
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}