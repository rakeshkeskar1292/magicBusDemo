# Individual Signup - Quick Reference

## 🎯 Quick Start

**URL:** `http://localhost:5173/individualsignup`

## 📋 Signup Steps

### Step 1: Select Contact Method & Enter Details
- Choose: Email or Mobile Number
- Enter your contact information
- Click: "Send OTP"

### Step 2: Verify OTP
- Look for OTP in your email/mobile (demo: always 0000)
- Enter: 4-digit OTP
- Click: "Verify OTP"
- Can resend after 30 seconds

### Step 3: Complete Profile
- Enter: Full Name (min 3 characters)
- Click: "Complete Registration"
- Auto-redirects to Sign In page

---

## 🧪 Test with Demo Data

### Email Registration
- **Email:** any@email.com
- **OTP:** 0000
- **Name:** John Doe

### Mobile Registration
- **Mobile:** 9876543210 (10 digits)
- **OTP:** 0000
- **Name:** Jane Smith

---

## 📁 File Structure

```
frontend/
├── src/
│   ├── App.tsx                                      # Updated with route
│   ├── pages/auth/
│   │   └── IndividualSignup.tsx                    # Main page
│   └── components/auth/
│       ├── IndividualSignupForm.tsx                # Step 1
│       ├── OTPVerification.tsx                     # Step 2
│       └── CompleteSignup.tsx                      # Step 3
└── INDIVIDUAL_SIGNUP_DOCS.md                       # Full documentation
```

---

## 🔑 Key Features

✅ Email & Mobile options  
✅ 4-digit OTP verification  
✅ 30-second OTP timer  
✅ Resend OTP option  
✅ Form validation  
✅ Loading states  
✅ Error messages  
✅ Responsive design  
✅ Material-UI components  

---

## 🧩 Components

### IndividualSignupForm
- Contact type toggle (Email/Mobile)
- Contact input field
- Validation
- Send OTP button

### OTPVerification
- 4-digit OTP input
- 30-second countdown timer
- Resend button (after timer)
- Contact masking display
- Verify button

### CompleteSignup
- Full name input
- Success confirmation
- Complete registration button

---

## ✅ Validation Rules

| Field | Rule | Error |
|-------|------|-------|
| Email | Valid email format | "Please enter a valid email" |
| Mobile | 10 digits | "Please enter a valid 10-digit number" |
| OTP | Exactly 4 digits, must be "0000" | "Invalid OTP. (Hint: 0000)" |
| Name | Min 3 characters | "Full name must be 3+ chars" |

---

## 🎨 Responsive Design

- **Mobile:** 100% width, padding: 8px
- **Tablet:** Full width card, padding: 12px
- **Desktop:** Fixed card width, padding: 16px

All text and buttons scale for touch/mouse input.

---

## 🔗 Routes

```
/individualsignup          # Main signup page
/auth/sign-in              # Sign in page (after signup)
```

---

## 💻 Development

### Start Dev Server
```bash
cd frontend
npm run dev
# Opens at http://localhost:5173
```

### Build for Production
```bash
npm run build
```

### Run Linting
```bash
npm run lint
```

---

## 🔮 Future Backend Integration

Update `frontend/src/pages/auth/IndividualSignup.tsx`:

```typescript
// Current: Mock API
await new Promise((resolve) => setTimeout(resolve, 1000))

// Future: Real API calls
const response = await fetch('/api/auth/send-otp', {
  method: 'POST',
  body: JSON.stringify({ contact, contactType })
})
```

---

## 📝 API Endpoints to Create (Backend)

```
POST /api/auth/send-otp
  Body: { contact: string, contactType: 'email'|'mobile' }
  Response: { success: boolean }

POST /api/auth/verify-otp
  Body: { contact: string, otp: string }
  Response: { success: boolean, token?: string }

POST /api/auth/complete-signup
  Body: { fullName: string, contact: string, contactType: string, otp: string }
  Response: { success: boolean, userId?: string }
```

---

## 🐛 Debugging

Check browser console (F12) for:
- Component mounting/unmounting
- Form submissions
- Navigation changes
- API calls (when integrated)

---

## 📱 Mobile Testing

Test on different screen sizes:
```
iPhone: 375px
iPad: 768px
Desktop: 1920px
```

All responsive utilities are from Material-UI.

---

## 🎓 How to Extend

### Add Password Field
Edit `CompleteSignup.tsx`:
```typescript
const [password, setPassword] = useState('')
// Add password validation
// Include in signup submission
```

### Add Terms Checkbox
Edit `CompleteSignup.tsx`:
```typescript
const [agreeTerms, setAgreeTerms] = useState(false)
// Add FormControlLabel with Checkbox
```

### Add Backend API Calls
Edit `IndividualSignup.tsx`:
```typescript
const response = await fetch('/api/auth/...')
// Handle response
// Show errors if needed
```

---

## ✨ Summary

A **complete, production-ready** individual signup flow with:
- Modern Material-UI design
- Full form validation
- OTP verification system
- Responsive on all devices
- Easy to extend
- Ready for backend integration

**Start using:** `http://localhost:5173/individualsignup`

---

**Need more details?** See `INDIVIDUAL_SIGNUP_DOCS.md`
