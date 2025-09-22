/**
 * EmailJS debugging and configuration utilities
 */

export interface EmailJSConfig {
  publicKey: string | undefined
  serviceId: string | undefined
  templateId: string | undefined
  autoReplyTemplateId: string | undefined
}

export interface EmailJSError {
  status?: number
  text?: string
  name?: string
  message?: string
}

/**
 * Get EmailJS configuration from environment variables
 */
export function getEmailJSConfig(): EmailJSConfig {
  return {
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    autoReplyTemplateId: process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID
  }
}

/**
 * Check if EmailJS configuration is valid
 */
export function isEmailJSConfigValid(config: EmailJSConfig): boolean {
  return !!(config.publicKey && config.serviceId && config.templateId)
}

/**
 * Log EmailJS configuration status for debugging
 */
export function logEmailJSConfig(config: EmailJSConfig): void {
  const configStatus = {
    hasPublicKey: !!config.publicKey,
    hasServiceId: !!config.serviceId,
    hasTemplateId: !!config.templateId,
    hasAutoReplyTemplateId: !!config.autoReplyTemplateId,
    isValid: isEmailJSConfigValid(config)
  }

  console.log('EmailJS Configuration:', configStatus)

  if (!configStatus.isValid) {
    console.warn('EmailJS configuration is incomplete. Required environment variables:')
    if (!config.publicKey) console.warn('- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY')
    if (!config.serviceId) console.warn('- NEXT_PUBLIC_EMAILJS_SERVICE_ID')
    if (!config.templateId) console.warn('- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID')
    console.warn('Optional:')
    if (!config.autoReplyTemplateId) console.warn('- NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID')
  }
}

/**
 * Format EmailJS error for better debugging
 */
export function formatEmailJSError(error: unknown): EmailJSError & { originalError: unknown } {
  const errorObj = error as Record<string, unknown>
  
  return {
    status: typeof errorObj?.status === 'number' ? errorObj.status : undefined,
    text: typeof errorObj?.text === 'string' ? errorObj.text : undefined,
    name: typeof errorObj?.name === 'string' ? errorObj.name : undefined,
    message: error instanceof Error ? error.message : 'Unknown error',
    originalError: error
  }
}

/**
 * Get user-friendly error message based on EmailJS error
 */
export function getEmailJSErrorMessage(error: EmailJSError): string {
  if (error.status === 403) {
    return 'Mesajınız qeydə alındı! (E-poçt konfiqurasiya xətası)'
  } else if (error.status === 400) {
    return 'Mesajınız qeydə alındı! (E-poçt göndərmə xətası)'
  } else if (error.status === 500) {
    return 'Mesajınız qeydə alındı! (E-poçt serveri əlçatan deyil)'
  } else if (error.status === 422) {
    return 'Mesajınız qeydə alındı! (E-poçt şablonu xətası)'
  } else {
    return 'Mesajınız qeydə alındı! (E-poçt göndərilmədi)'
  }
}

/**
 * Log detailed EmailJS error information
 */
export function logEmailJSError(error: unknown, context: string = 'EmailJS operation'): void {
  const formattedError = formatEmailJSError(error)
  
  console.error(`${context} failed:`, {
    status: formattedError.status || 'Unknown',
    text: formattedError.text || 'No error text',
    name: formattedError.name || 'No error name',
    message: formattedError.message,
    originalError: formattedError.originalError
  })

  // Log specific error guidance
  if (formattedError.status === 403) {
    console.error('EmailJS 403 Error: Check your public key and template access permissions')
  } else if (formattedError.status === 400) {
    console.error('EmailJS 400 Error: Check template variables and email addresses')
    console.error('Common 400 error causes:')
    console.error('- Invalid email address in reply_to field')
    console.error('- Missing required template variables')
    console.error('- Template variable names mismatch')
    console.error('- Invalid characters in template variables')
  } else if (formattedError.status === 422) {
    console.error('EmailJS 422 Error: Template processing failed - check template syntax')
  } else if (formattedError.status === 500) {
    console.error('EmailJS 500 Error: Server error - try again later')
  }
}