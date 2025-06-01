# Authentication Setup Guide

This guide explains how to set up Firebase authentication for the LeetFeedback website and Chrome extension integration.

## Overview

The authentication system uses Firebase Auth with Google and Apple sign-in providers. The website and Chrome extension communicate to sync authentication state across both platforms.

## Firebase Setup

### 1. Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `leetfeedback` (or your preferred name)
4. Enable Google Analytics (optional)
5. Create the project

### 2. Enable Authentication

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable the following providers:

#### Google Sign-In
1. Click on **Google** provider
2. Toggle **Enable**
3. Set project support email
4. Add your website domain to **Authorized domains**
5. Save configuration

#### Apple Sign-In
1. Click on **Apple** provider
2. Toggle **Enable**
3. Configure Apple Developer settings:
   - Service ID
   - Apple Team ID
   - Key ID
   - Private Key (.p8 file)
4. Save configuration

### 3. Get Firebase Configuration

1. Go to **Project settings** (gear icon)
2. In the **General** tab, scroll to **Your apps**
3. Click **Add app** > **Web app** (</> icon)
4. Register your app with a nickname
5. Copy the Firebase configuration object

## Website Configuration

### 1. Environment Variables

Create `.env.local` file in the `website` directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Authorized Domains

In Firebase Console > Authentication > Settings > Authorized domains, add:

- `localhost` (for development)
- Your production domain (e.g., `leetfeedback.vercel.app`)
- Any staging domains

## Chrome Extension Configuration

### 1. Update Manifest Host Permissions

The extension manifest already includes necessary host permissions for:
- `http://localhost:*/*` (development)
- `https://*.vercel.app/*` (Vercel deployments)
- `https://*.netlify.app/*` (Netlify deployments)

Add your custom domain if different:

```json
"host_permissions": [
  "https://yourdomain.com/*"
]
```

### 2. Content Script Domains

Update `website-auth.js` content script to match your domain:

```javascript
const isLeetFeedbackSite = window.location.hostname.includes('yourdomain') || 
                          window.location.hostname.includes('localhost');
```

## Authentication Flow

### Website Sign-In Process

1. User clicks "Sign In" button in navbar
2. Sign-in modal opens with Google and Apple options
3. User selects provider and completes OAuth flow
4. Firebase handles authentication
5. User data is stored and synced with extension

### Extension Integration

1. Extension checks for cached auth data on startup
2. If website is open, requests current auth status
3. User can sign in via extension by opening website
4. Auth state syncs automatically between website and extension

### Sign-Out Process

1. User can sign out from website or extension
2. Auth state is cleared from both platforms
3. Extension shows sign-in prompt

## Security Considerations

### Firebase Security Rules

Set up Firestore security rules if using Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### API Keys

- Firebase Web API keys are safe to include in client-side code
- They are not secret and only identify your project
- Security is enforced through Firebase Auth rules and CORS

### Extension Permissions

The extension requests minimal permissions:
- `storage` - For caching auth data
- `activeTab` - For website communication
- `tabs` - For opening sign-in page

## Development Setup

### 1. Install Dependencies

```bash
cd website
npm install firebase
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Load Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `leetFeedback` folder

### 4. Test Authentication

1. Visit the website in development mode
2. Click "Sign In" and complete OAuth flow
3. Open extension popup to verify auth state sync

## Production Deployment

### 1. Update Environment Variables

Set production Firebase config in your hosting platform:
- Vercel: Add environment variables in project settings
- Netlify: Add in site settings > Environment variables

### 2. Update Extension URLs

Update `auth.js` in the extension to use production URL:

```javascript
getWebsiteUrl() {
  return 'https://yourdomain.com';
}
```

### 3. Firebase Hosting (Optional)

Deploy to Firebase Hosting:

```bash
npm run build
firebase deploy
```

## Troubleshooting

### Common Issues

1. **Auth not syncing between website and extension**
   - Check browser console for errors
   - Verify host permissions in manifest
   - Ensure content script is loading

2. **Google Sign-In not working**
   - Verify authorized domains in Firebase Console
   - Check OAuth consent screen configuration

3. **Apple Sign-In not working**
   - Verify Apple Developer configuration
   - Check Service ID and private key setup

### Debug Mode

Enable debug logging by setting `debugMode: true` in extension popup settings.

## API Reference

### AuthContext Methods

- `signInWithGoogle()` - Initiate Google sign-in
- `signInWithApple()` - Initiate Apple sign-in
- `signOut()` - Sign out current user
- `isAuthenticated` - Boolean auth status
- `user` - Current user object

### Extension Auth Methods

- `extensionAuth.init()` - Initialize auth system
- `extensionAuth.openSignIn()` - Open website for sign-in
- `extensionAuth.signOut()` - Sign out from extension
- `extensionAuth.onAuthStatusChange(callback)` - Listen for auth changes

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify Firebase configuration
3. Test with different browsers
4. Check network requests in dev tools