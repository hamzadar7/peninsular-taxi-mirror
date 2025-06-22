
# Deployment Guide for Capel Sound Taxi Booking System

## Prerequisites
- Node.js 18+ installed
- Google Maps API key configured
- Supabase project configured
- cPanel hosting account

## Environment Configuration

1. Create a `.env.local` file in your project root (copy from `.env.example`):
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
VITE_SUPABASE_URL=https://nlpgylbwbizcbkirawie.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scGd5bGJ3Yml6Y2JraXJhd2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTgyOTYsImV4cCI6MjA2NjEzNDI5Nn0.ruadfjd_b1lx0t3M-di77ISqxggYv5Eq_sG7H7rSoKI
```

## Build Commands

1. Install dependencies:
```bash
npm install
```

2. Test locally:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment Steps

1. Upload all contents from the `dist` folder to your cPanel `public_html` directory
2. Ensure the `.htaccess` file is uploaded for proper routing
3. Test all functionality:
   - Google Maps autocomplete
   - OTP email sending
   - Form submission to Supabase

## Important Notes

- The Google Maps API key is now environment-based for security
- Supabase URLs are configured for your production domain
- All fallbacks are maintained for development environments
- No functionality has been removed or changed

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify API key restrictions in Google Cloud Console
3. Check Supabase Edge Function logs
4. Ensure SSL/HTTPS is properly configured
