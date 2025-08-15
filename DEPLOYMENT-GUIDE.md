# Complete Deployment Guide - Capel Sound Taxi Booking System

## 🔐 Admin Credentials
- **Username:** `backoffice`
- **Password:** `G89x!h5qgj`

## 🗄️ Database Configuration
- **Database Name:** `capelsound_taxi`
- **Username:** `capelsound_user`
- **Password:** `G89x!h5qgj`
- **Host:** `localhost`

---

## 📋 Prerequisites

### For Local Development:
- Node.js 18+ installed
- XAMPP/WAMP (for local PHP and MySQL)
- Git (optional)

### For cPanel Deployment:
- cPanel hosting account with PHP 7.4+ and MySQL
- Database creation privileges
- File manager access

---

## 🖥️ Local Development Setup

### 1. Install Dependencies
```bash
cd your-project-folder
npm install
```

### 2. Set Up Local Database (XAMPP/WAMP)
1. Start Apache and MySQL in XAMPP
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create database: `capelsound_taxi`
4. Create user: `capelsound_user` with password: `G89x!h5qgj`
5. Import the database structure:

```sql
-- Create bookings table
CREATE TABLE `bookings` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pickup_location` text NOT NULL,
  `destination` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `passengers` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `special_requests` text DEFAULT '',
  `status` varchar(50) DEFAULT 'pending',
  `admin_remarks` text DEFAULT '',
  `device_info` text DEFAULT '',
  `contact_name` varchar(255) NOT NULL,
  `contact_phone` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Create contacts table
CREATE TABLE `contacts` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT '',
  `message` text NOT NULL,
  `status` varchar(50) DEFAULT 'new',
  `device_info` text DEFAULT '',
  PRIMARY KEY (`id`)
);

-- Create admin_sessions table
CREATE TABLE `admin_sessions` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `session_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `last_activity` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `session_id` (`session_id`)
);
```

### 3. Configure Local API
1. Copy the `api` folder to your XAMPP `htdocs` directory
2. Update `api/config.php` if needed (should work with default settings)

### 4. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🌐 cPanel Deployment

### Step 1: Prepare the Build
```bash
# Build the production version
npm run build
```

### Step 2: Set Up Database on cPanel

1. **Login to cPanel**
2. **Go to MySQL Databases**
3. **Create Database:**
   - Database Name: `capelsound_taxi`
4. **Create Database User:**
   - Username: `capelsound_user` 
   - Password: `G89x!h5qgj`
5. **Add User to Database** with ALL PRIVILEGES
6. **Import Database Structure** using phpMyAdmin (same SQL as above)

### Step 3: Upload Files

1. **Go to File Manager in cPanel**
2. **Navigate to `public_html`**
3. **Delete all existing files** in public_html
4. **Upload the `dist` folder contents:**
   - Upload all files from the `dist` folder to `public_html`
   - Make sure `index.html` is in the root of `public_html`

### Step 4: Upload API Files

1. **Create `api` folder** in `public_html`
2. **Upload all PHP files** from your local `api` folder:
   - `config.php`
   - `admin-auth.php`
   - `bookings.php`
   - `contacts.php`
   - `send-otp.php`

### Step 5: Configure Database Connection

1. **Edit `api/config.php`** in cPanel File Manager
2. **Update database credentials** if they differ:
```php
$host = 'localhost'; // Usually localhost on cPanel
$dbname = 'youraccount_capelsound_taxi'; // May include cPanel username prefix
$username = 'youraccount_capelsound_user'; // May include cPanel username prefix
$password = 'G89x!h5qgj';
```

### Step 6: Set File Permissions

1. **Set folder permissions to 755:**
   - `public_html/api/`
2. **Set file permissions to 644:**
   - All `.php` files
   - All static files

### Step 7: Configure .htaccess

Ensure the `.htaccess` file is in the root of `public_html` with this content:

```apache
RewriteEngine On

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# SPA Routing - Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule . /index.html [L]

# Block access to sensitive files
<FilesMatch "\.(env|log|sql|config|ini)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Enable CORS for API
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

---

## ✅ Post-Deployment Testing

### 1. Test Website Access
- Visit your domain: `https://yourdomain.com`
- Check all pages load correctly
- Verify mobile responsiveness

### 2. Test Booking System
1. Go to booking page
2. Fill out the form completely
3. Test OTP verification
4. Submit booking
5. Check if data appears in admin panel

### 3. Test Contact Form
1. Go to contact page
2. Submit a message
3. Check admin panel for the message

### 4. Test Admin Panel
1. Go to `https://yourdomain.com/admin`
2. Login with credentials: `backoffice` / `G89x!h5qgj`
3. Verify bookings and contacts display
4. Test buzzer functionality
5. Test date filtering
6. Test logout and login persistence

### 5. Test Buzzer & Notifications
1. Enable buzzer in admin panel
2. Submit a test booking/contact
3. Verify sound plays and notification appears
4. Test with browser tab minimized

---

## 🔧 Troubleshooting

### Common Issues:

**1. "500 Internal Server Error"**
- Check file permissions (755 for folders, 644 for files)
- Verify PHP version compatibility
- Check error logs in cPanel

**2. "Database Connection Failed"**
- Verify database credentials in `config.php`
- Ensure database user has proper permissions
- Check if database name includes cPanel prefix

**3. "Admin Login Not Working"**
- Clear browser cache and localStorage
- Check if PHP sessions are enabled
- Verify API files are uploaded correctly

**4. "API Returning HTML Instead of JSON"**
- Ensure PHP is properly configured
- Check if `.htaccess` is conflicting with API routes
- Verify API files have correct permissions

**5. "Buzzer Not Working"**
- Allow notifications in browser
- Check browser audio permissions
- Ensure HTTPS is enabled (required for audio)

**6. "Google Maps Not Loading"**
- Verify Google Maps API key
- Check API key restrictions
- Ensure domain is added to allowed domains

---

## 🔒 Security Notes

1. **HTTPS Required:** Ensure SSL certificate is installed
2. **Database Security:** Use strong passwords
3. **File Permissions:** Don't set 777 permissions
4. **API Protection:** Monitor API usage for abuse
5. **Admin Access:** Change default admin credentials after testing

---

## 📞 Support

If you encounter issues:
1. Check cPanel error logs
2. Verify all files are uploaded correctly
3. Test API endpoints individually
4. Check browser console for JavaScript errors

**Admin Panel Features:**
- ✅ Persistent login (survives page refresh & browser close)
- ✅ Sound buzzer for new bookings/contacts
- ✅ Browser notifications (with permission)
- ✅ Date filtering (defaults to today)
- ✅ Fully responsive design
- ✅ Real-time data updates