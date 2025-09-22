'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/validators'
import { submitContactAction } from '@/actions/contact'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  getEmailJSConfig, 
  isEmailJSConfigValid, 
  logEmailJSConfig,
  getEmailJSErrorMessage,
  logEmailJSError
} from '@/lib/email-debug'

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isEmailSending, setIsEmailSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    startTransition(async () => {
      try {
        // Save to database first
        const formData = new FormData()
        
        // Only append non-empty values
        formData.append('name', data.name.trim())
        if (data.company?.trim()) formData.append('company', data.company.trim())
        if (data.email?.trim()) formData.append('email', data.email.trim())
        if (data.phone?.trim()) formData.append('phone', data.phone.trim())
        formData.append('message', data.message.trim())

        const result = await submitContactAction(formData)
        
        if (!result.success) {
          toast.error(result.message)
          return
        }

        // Send emails via EmailJS if configured
        const emailConfig = getEmailJSConfig()
        logEmailJSConfig(emailConfig)

        if (isEmailJSConfigValid(emailConfig)) {
          setIsEmailSending(true)
          
          try {
            // Prepare and validate template variables
            const currentDate = new Intl.DateTimeFormat('az-AZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Baku'
            }).format(new Date())

            // Validate email format if provided
            const customerEmail = data.email?.trim()
            const isValidEmail = customerEmail && customerEmail.includes('@') && customerEmail.includes('.')

            const emailTemplateParams = {
              from_name: data.name.trim(),
              company: data.company?.trim() || 'Qeyd edilməyib',
              reply_to: isValidEmail ? customerEmail : 'noreply@example.com',
              phone: data.phone?.trim() || 'Telefon verilməyib',
              message: data.message.trim(),
              to_name: 'SON Təmizlik Məhsulları',
              current_date: currentDate,
              message_id: result.id?.toString() || 'unknown'
            }

            console.log('EmailJS template params:', {
              ...emailTemplateParams,
              reply_to: isValidEmail ? customerEmail : 'noreply@example.com (customer email invalid/missing)'
            })

            console.log('Sending admin notification email...')
            
            // Send admin notification email
            const adminEmailResult = await emailjs.send(
              emailConfig.serviceId!,
              emailConfig.templateId!,
              emailTemplateParams,
              emailConfig.publicKey!
            )
            
            console.log('Admin email sent successfully:', adminEmailResult.status, adminEmailResult.text)

            // Send customer auto-reply email if they provided a valid email and auto-reply template exists
            if (isValidEmail && emailConfig.autoReplyTemplateId) {
              try {
                console.log('Sending customer auto-reply email...')
                
                // Create separate parameters for auto-reply (customer receives the email)
                const autoReplyParams = {
                  ...emailTemplateParams,
                  to_email: customerEmail, // Customer's email as recipient
                  to_name: data.name.trim(), // Customer's name as recipient name
                  customer_name: data.name.trim(), // For personalization in template
                }
                
                console.log('Auto-reply template params:', autoReplyParams)
                
                const autoReplyResult = await emailjs.send(
                  emailConfig.serviceId!,
                  emailConfig.autoReplyTemplateId,
                  autoReplyParams,
                  emailConfig.publicKey!
                )
                console.log('Auto-reply email sent successfully:', autoReplyResult.status, autoReplyResult.text)
              } catch (autoReplyError) {
                logEmailJSError(autoReplyError, 'Customer auto-reply email')
                // Don't show error to user for auto-reply failure
              }
            } else if (customerEmail && !isValidEmail) {
              console.warn('Customer email provided but invalid, skipping auto-reply:', customerEmail)
            }
            
            toast.success('Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.')
          } catch (emailError) {
            logEmailJSError(emailError, 'Admin notification email')
            const errorMessage = getEmailJSErrorMessage({ status: (emailError as Record<string, unknown>)?.status as number })
            toast.success(errorMessage)
          } finally {
            setIsEmailSending(false)
          }
        } else {
          toast.success(result.message)
        }

        reset()
      } catch (error) {
        console.error('Form submission error:', error)
        toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.')
      }
    })
  }

  const isLoading = isPending || isEmailSending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Ad Soyad <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Adınızı və soyadınızı yazın"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Şirkət</Label>
          <Input
            id="company"
            type="text"
            placeholder="Şirkət adı (məcburi deyil)"
            {...register('company')}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-poçt</Label>
          <Input
            id="email"
            type="email"
            placeholder="ornek@email.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+994 XX XXX XX XX"
            {...register('phone')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Mesaj <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Mesajınızı yazın..."
          rows={5}
          {...register('message')}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full md:w-auto bg-brand-primary hover:bg-brand-primary/90"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isEmailSending ? 'E-poçt göndərilir...' : 'Göndərilir...'}
          </div>
        ) : (
          'Mesaj Göndər'
        )}
      </Button>

      <p className="text-xs text-gray-500">
        <span className="text-red-500">*</span> Məcburi sahələr
      </p>
    </form>
  )
}