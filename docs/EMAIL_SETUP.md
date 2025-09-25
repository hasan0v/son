# EmailJS Template Setup Guide

## 📧 Email Templates Configuration

### 1. Admin Notification Template (template_01vl6tj)

**Template Variables:**
- `{{from_name}}` - Customer name
- `{{reply_to}}` - Customer email  
- `{{phone}}` - Customer phone
- `{{company}}` - Customer company
- `{{message}}` - Customer message
- `{{current_date}}` - Submission date
- `{{message_id}}` - Database message ID

**EmailJS Template Content:**
```html
<!-- Copy the content from /public/email-templates/contact-notification.html -->
<!-- and paste it into your EmailJS template -->
```

### 2. Customer Auto-Reply Template (Create New)

**Create a second template in EmailJS with ID: `template_auto_reply`**

**Important**: This template sends TO the customer, so configure the recipient properly:

**Template Settings in EmailJS:**
- **To Email**: `{{to_email}}` (this will be the customer's email)
- **To Name**: `{{to_name}}` (this will be the customer's name)  
- **From Email**: Your business email (e.g., info@son-temizlik.com)
- **From Name**: SON Təmizlik Məhsulları

**Template Variables:**
- `{{to_email}}` - Customer's email address (recipient)
- `{{to_name}}` - Customer's name (recipient name)
- `{{customer_name}}` - Customer name for personalization in content
- `{{from_name}}` - Customer name (original sender)
- `{{company}}` - Customer company  
- `{{message}}` - Original message from customer
- `{{current_date}}` - Submission date
- `{{phone}}` - Customer phone
- `{{reply_to}}` - Your business reply email

**EmailJS Template Content:**
```html
<!-- Copy the content from /public/email-templates/customer-auto-reply.html -->
<!-- and paste it into your new EmailJS template -->
```

## 🔧 Implementation Steps

### Step 1: Update Environment Variables
Add the auto-reply template ID to your `.env.local`:

```bash
# Existing EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="EG6r1kdAmJ1MQ_SiA"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_nj3enbg"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_01vl6tj"

# Add auto-reply template (create this in EmailJS)
NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID="template_auto_reply"
```

### Step 2: Create EmailJS Templates

1. **Log into EmailJS Dashboard**
   - Go to https://dashboard.emailjs.com/
   - Navigate to Email Templates

2. **Admin Notification Template**
   - Use existing template: `template_01vl6tj`
   - Copy HTML from `contact-notification.html`
   - Set recipient to your admin email

3. **Customer Auto-Reply Template**
   - Create new template: `template_auto_reply`
   - **IMPORTANT**: Configure recipient settings:
     - **To Email**: `{{to_email}}` 
     - **To Name**: `{{to_name}}`
     - **From Email**: Your business email
     - **From Name**: SON Təmizlik Məhsulları
   - Copy HTML from `customer-auto-reply.html`

## 🚨 Common Issues & Solutions

### EmailJS 422 Error: "The recipients address is empty"

**Problem**: Auto-reply template not configured properly

**Solution**: 
1. Go to your EmailJS dashboard
2. Edit the auto-reply template
3. In template settings, set:
   - **To Email**: `{{to_email}}`
   - **To Name**: `{{to_name}}`
4. Save the template

### EmailJS 400 Error: Bad Request

**Common Causes**:
- Invalid email addresses
- Missing required template variables
- Template variable name mismatches

**Solution**: Check browser console for detailed error logs

### Step 3: Test Email Flow

1. **Database Storage** ✅
   - Contact messages are saved to `ContactMessage` table
   - All form data is validated with Zod schema
   - Handled status tracking for admin

2. **Admin Notification** ✅
   - Professional email with customer details
   - Formatted message content
   - Direct reply and call action buttons
   - Company branding and styling

3. **Customer Auto-Reply** 🔄
   - Confirmation email to customer
   - Thank you message with next steps
   - Company contact information
   - Product showcase section

## 📱 Features Implemented

### ✅ Database Integration
- Form data validation with Zod
- Automatic saving to SQLite database
- Message status tracking (handled/unhandled)
- Admin panel integration ready

### ✅ Professional Email Templates
- **Responsive Design**: Works on mobile and desktop
- **Brand Consistent**: Uses SON colors and styling
- **Professional Layout**: Modern, clean design
- **Interactive Elements**: Call and email action buttons

### ✅ Enhanced Form Handling
- Loading states and user feedback
- Error handling and validation
- Automatic form reset after submission
- Toast notifications for user experience

### ✅ Localization
- All text in Azerbaijani (az-AZ)
- Proper date formatting for Baku timezone
- Cultural appropriate styling and icons

## 🔒 Security & Performance

- Environment variables for sensitive keys
- Server-side validation with Zod
- Error handling prevents information leakage  
- Optimized email template loading
- Database transactions for data integrity

## 📊 Admin Panel Integration

The contact messages are automatically available in:
- `/admin/messages` (if admin panel exists)
- Database table: `ContactMessage`
- Automated status tracking with `handled` field

## 🎨 Template Customization

Both email templates are fully customizable:
- Colors match your brand (blue-green theme)
- Mobile-responsive design
- Easy to modify text and styling
- Modular component structure

## 📈 Analytics & Tracking

- Message ID tracking for correlation
- Timestamp with Baku timezone
- Success/failure logging
- EmailJS delivery tracking