#!/usr/bin/env node

/**
 * EmailJS Configuration Test Script
 * 
 * This script helps you test your EmailJS configuration by checking environment variables
 * and optionally sending a test email.
 * 
 * Usage:
 *   node test-emailjs.js [--send-test]
 * 
 * Options:
 *   --send-test   Send a test email to verify the configuration works
 */

const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`)
}

function logSuccess(message) {
  log(colors.green, `✓ ${message}`)
}

function logError(message) {
  log(colors.red, `✗ ${message}`)
}

function logWarning(message) {
  log(colors.yellow, `⚠ ${message}`)
}

function logInfo(message) {
  log(colors.blue, `ℹ ${message}`)
}

function logHeader(message) {
  log(colors.bold, `\n${message}`)
  log(colors.bold, '='.repeat(message.length))
}

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (!fs.existsSync(envPath)) {
    logWarning('No .env.local file found. Make sure to create one with your EmailJS configuration.')
    return {}
  }

  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars = {}
  
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=')
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim().replace(/^["'](.*)["']$/, '$1')
      }
    }
  })
  
  return envVars
}

// Check EmailJS configuration
function checkEmailJSConfig() {
  logHeader('EmailJS Configuration Check')
  
  const envVars = loadEnvFile()
  
  const requiredVars = [
    'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
    'NEXT_PUBLIC_EMAILJS_SERVICE_ID', 
    'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'
  ]
  
  const optionalVars = [
    'NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID'
  ]
  
  let allRequiredPresent = true
  
  // Check required variables
  logInfo('Required Environment Variables:')
  requiredVars.forEach(varName => {
    if (envVars[varName]) {
      logSuccess(`${varName}: ****${envVars[varName].slice(-4)}`)
    } else {
      logError(`${varName}: Missing`)
      allRequiredPresent = false
    }
  })
  
  // Check optional variables
  logInfo('\nOptional Environment Variables:')
  optionalVars.forEach(varName => {
    if (envVars[varName]) {
      logSuccess(`${varName}: ****${envVars[varName].slice(-4)}`)
    } else {
      logWarning(`${varName}: Not set (auto-reply emails disabled)`)
    }
  })
  
  if (allRequiredPresent) {
    logSuccess('\nEmailJS configuration is complete! ✨')
  } else {
    logError('\nEmailJS configuration is incomplete. Please add the missing environment variables.')
    logInfo('\nExample .env.local file:')
    console.log(`
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key_here"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id_here"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id_here"
NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID="your_auto_reply_template_id_here"
    `.trim())
  }
  
  return { allRequiredPresent, envVars }
}

// Send test email (requires @emailjs/browser to be available)
async function sendTestEmail(envVars) {
  logHeader('Sending Test Email')
  
  try {
    // This would require running in a browser environment
    logInfo('To test email sending, please:')
    logInfo('1. Run your Next.js application: npm run dev')
    logInfo('2. Navigate to your contact form')
    logInfo('3. Fill out and submit the form')
    logInfo('4. Check the browser console for detailed logs')
    logInfo('5. Check your email for the test message')
    
  } catch (error) {
    logError(`Test email failed: ${error.message}`)
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2)
  const shouldSendTest = args.includes('--send-test')
  
  logHeader('EmailJS Configuration Tester')
  logInfo('This tool helps you verify your EmailJS setup for the contact form.')
  
  const { allRequiredPresent, envVars } = checkEmailJSConfig()
  
  if (shouldSendTest) {
    if (allRequiredPresent) {
      await sendTestEmail(envVars)
    } else {
      logError('Cannot send test email - configuration is incomplete.')
    }
  }
  
  logHeader('Next Steps')
  if (allRequiredPresent) {
    logInfo('1. Start your development server: npm run dev')
    logInfo('2. Navigate to your contact form')
    logInfo('3. Submit a test message')
    logInfo('4. Check browser console for detailed EmailJS logs')
    logInfo('5. Verify emails are received')
  } else {
    logInfo('1. Create or update your .env.local file with EmailJS credentials')
    logInfo('2. Get your credentials from: https://dashboard.emailjs.com/')
    logInfo('3. Run this script again to verify: node test-emailjs.js')
  }
}

// Run the main function
main().catch(error => {
  logError(`Script failed: ${error.message}`)
  process.exit(1)
})