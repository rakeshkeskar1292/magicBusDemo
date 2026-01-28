# Individual Signup Feature Documentation

## Overview
A complete individual user registration flow with email/mobile verification and OTP authentication.

## Features

✅ **Email/Mobile Selection** - Users can choose to register via email or mobile number  
✅ **OTP Verification** - 4-digit OTP verification with 30-second countdown  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Modular Components** - Easy to extend and maintain  
✅ **User Feedback** - Clear validation messages and progress indicators  
✅ **Multi-step Flow** - Contact → OTP → Profile completion  

---

## Route

**URL:** `http://localhost:5173/individualsignup`

---

## Architecture

### File Structure
```
frontend/src/
├── pages/auth/
│   └── IndividualSignup.tsx          # Main page component
├── components/auth/
│   ├── IndividualSignupForm.tsx      # Step 1: Contact collection
│   ├── OTPVerification.tsx           # Step 2: OTP verification
│   └── CompleteSignup.tsx            # Step 3: Profile completion
```

### Component Hierarchy
```
IndividualSignup (State Management)
├── SignupForm (Step 1)
├── OTPVerification (Step 2)
└── CompleteSignup (Step 3)
```

---

## Signup Flow

### Step 1: Email/Mobile Selection & Collection
**Component:** `IndividualSignupForm`

**Features:**
- Toggle between Email and Mobile Number
- Input validation
- Error handling
- Loading state

**Form Fields:**
- Email Address (if email selected)
- Mobile Number (if mobile selected)

**Actions:**
- Send OTP button

**Validations:**
- Email format validation
- Mobile: 10-digit validation
- Required field validation

---

### Step 2: OTP Verification
**Component:** `OTPVerification`

**Features:**
- 4-digit OTP input
- 30-second countdown timer
- Resend OTP option
- Masked contact display
- Progress indicator

**Form Fields:**
- OTP (4 digits only, numeric)

**Actions:**
- Verify OTP button
- Resend OTP (after 30 seconds)
- Use different contact link

**Validations:**
- OTP must be 4 digits
- OTP must match (hardcoded: "0000")
- Timer countdown

**OTP Details:**
```javascript
const VALID_OTP = '0000'
const OTP_RESEND_TIME = 30 // seconds
```

---

### Step 3: Profile Completion
**Component:** `CompleteSignup`

**Features:**
- Collect full name
- Display verified contact info
- Success confirmation

**Form Fields:**
- Full Name

**Actions:**
- Complete Registration button

**Validations:**
- Name required
- Minimum 3 characters

**Auto Actions:**
- Redirects to Sign In after 2 seconds on success

---

## Technical Details

### State Management
Located in `IndividualSignup.tsx`:

```typescript
type SignupStep = 'contact' | 'otp' | 'profile'

interface SignupData {
  contact: string
  contactType: 'email' | 'mobile'
  fullName?: string
}
```

### API Integration Points
Currently using mock API calls with simulated delays:

```typescript
// Simulate API call
await new Promise((resolve) => setTimeout(resolve, 1000))
```

**Future API endpoints to implement:**
- `POST /api/auth/send-otp` - Send OTP to email/mobile
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/complete-signup` - Create user account

---

## Responsive Design

### Breakpoints (Material-UI)
```
xs (0px) - Extra small (mobile)
sm (600px) - Small (tablet)
md (960px) - Medium (desktop)
```

### Responsive Elements
- **Card Width:** 100% on mobile, fixed on desktop
- **Padding:** Adaptive (xs: 2, sm: 3)
- **Font Sizes:** Responsive typography
- **Button Layout:** Full width on mobile

### Mobile Optimizations
- Numeric keyboard on mobile for OTP
- Touch-friendly button sizes
- Large input fields for easy interaction
- Vertical layout for narrow screens

---

## Material-UI Components Used

```
Container
Card
CardContent
TextField
Button
ToggleButton
ToggleButtonGroup
Typography
Box
Alert
CircularProgress
LinearProgress
CheckCircleIcon
EmailIcon
PhoneIcon
PersonAddIcon
LockIcon
```

---

## Styling Features

### Color Scheme
- **Primary:** #1976d2 (Blue)
- **Secondary:** #dc004e (Pink)
- **Success:** Green (checkmarks, confirmations)
- **Error:** Red (alerts, validation)

### Elevations & Shadows
- Card elevation: 3
- Responsive shadows

### Spacing
- Consistent padding and margins
- Mobile-optimized spacing

---

## Validation Rules

### Email
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Mobile Number
```javascript
/^\d{10}$/  // 10-digit validation
```

### Full Name
- Minimum 3 characters
- Required field

### OTP
- Exactly 4 digits
- Must match "0000"

---

## User Experience Features

### Feedback Mechanisms
1. **Loading States**
   - Spinner animation during processing
   - Disabled inputs during submission
   - Button state changes

2. **Progress Indicators**
   - Linear progress for OTP timer
   - Step-by-step flow
   - Visual confirmation (checkmarks)

3. **Error Handling**
   - Inline error messages
   - Alert boxes for errors
   - Clear guidance for users

4. **Success States**
   - Confirmation messages
   - Success icons (CheckCircleIcon)
   - Auto-redirect on completion

---

## How to Use

### Access the Page
```
Navigate to: http://localhost:5173/individualsignup
```

### Registration Flow
1. **Enter Contact Information**
   - Select Email or Mobile Number
   - Enter your contact details
   - Click "Send OTP"

2. **Verify OTP**
   - Check your email/mobile for OTP
   - (Demo OTP: 0000)
   - Enter OTP in 4-digit field
   - Click "Verify OTP"
   - Option to resend after 30 seconds

3. **Complete Profile**
   - Enter your full name
   - Click "Complete Registration"
   - Automatically redirected to Sign In page

---

## Testing

### Test Cases

#### Email Registration
1. ✅ Select Email option
2. ✅ Enter valid email
3. ✅ Send OTP
4. ✅ Enter OTP "0000"
5. ✅ Verify success
6. ✅ Enter full name
7. ✅ Complete registration

#### Mobile Registration
1. ✅ Select Mobile option
2. ✅ Enter 10-digit mobile
3. ✅ Send OTP
4. ✅ Enter OTP "0000"
5. ✅ Verify success
6. ✅ Enter full name
7. ✅ Complete registration

#### Validation Tests
1. ✅ Empty email shows error
2. ✅ Invalid email format shows error
3. ✅ Invalid mobile (not 10 digits) shows error
4. ✅ Wrong OTP shows error
5. ✅ Empty name shows error
6. ✅ Name < 3 characters shows error

#### Responsive Tests
- ✅ Works on iPhone (375px)
- ✅ Works on iPad (768px)
- ✅ Works on Desktop (1920px)

---

## Future Enhancements

1. **Backend Integration**
   - Connect to real OTP service (Twilio, SendGrid)
   - Real email/SMS sending
   - Database persistence

2. **Features**
   - Password creation
   - Terms & Conditions acceptance
   - Additional profile fields (age, city, etc.)
   - Social login integration

3. **Security**
   - Rate limiting on OTP attempts
   - CAPTCHA verification
   - Session management
   - Password encryption

4. **Analytics**
   - Track signup completion rates
   - Monitor drop-off points
   - Error tracking

---

## Code Examples

### Accessing the signup page
```typescript
// In your navigation or links
<Link to="/individualsignup">Sign Up</Link>
```

### Using the signup hook (future enhancement)
```typescript
// Could be created for reusability
const useIndividualSignup = () => {
  // signup logic
}
```

---

## Troubleshooting

### OTP Not Accepted
- Check that you entered "0000" (4 zeros)
- Ensure all 4 digits are entered
- Check browser console for errors

### Page Not Loading
- Verify route is added to App.tsx
- Check component imports
- Clear browser cache

### Mobile Number Validation Failing
- Enter only digits (10 total)
- Remove spaces, dashes, or country codes
- Example: 9876543210

---

## Component Props

### IndividualSignupForm
```typescript
interface SignupFormProps {
  onSubmit: (contact: string, contactType: 'email' | 'mobile') => void
  isLoading?: boolean
}
```

### OTPVerification
```typescript
interface OTPVerificationProps {
  contactType: 'email' | 'mobile'
  contact: string
  onVerify: (otp: string) => void
  onEdit: () => void
  isLoading?: boolean
}
```

### CompleteSignup
```typescript
interface CompleteSignupProps {
  contact: string
  contactType: 'email' | 'mobile'
  onSubmit: (userData: {
    fullName: string
    contact: string
    contactType: string
  }) => void
  isLoading?: boolean
}
```

---

## Styling Customization

To customize colors and theme:

Edit `frontend/src/App.tsx`:
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-color', // Change primary color
    },
    success: {
      main: '#your-color', // Change success color
    },
    // ... more customizations
  },
})
```

---

## Files Modified

- ✅ `frontend/src/App.tsx` - Added route
- ✅ Created `frontend/src/pages/auth/IndividualSignup.tsx`
- ✅ Created `frontend/src/components/auth/IndividualSignupForm.tsx`
- ✅ Created `frontend/src/components/auth/OTPVerification.tsx`
- ✅ Created `frontend/src/components/auth/CompleteSignup.tsx`

---

## Summary

The Individual Signup feature provides a complete, modern, and user-friendly registration flow with:
- Email and mobile number options
- OTP-based verification
- Profile completion
- Fully responsive design
- Material-UI components
- Comprehensive validation
- Clear user feedback

The implementation is modular, making it easy to extend and integrate with backend services.

---

**Ready to use!** Access at: `http://localhost:5173/individualsignup`
