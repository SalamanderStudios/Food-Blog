# Firebase Setup Guide for B.O.R.G. Night

This guide will help you set up Firebase for persistent recipe ratings storage.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: "borg-night-ratings"
4. Click "Create project"
5. Wait for the project to be created

## Step 2: Set Up Realtime Database

1. In the Firebase Console, go to **Build > Realtime Database**
2. Click "Create Database"
3. Choose location (select closest to your users)
4. Choose **Start in test mode** (for development)
5. Click "Enable"

## Step 3: Get Your Firebase Config

1. In Firebase Console, click the gear icon (⚙️) > **Project Settings**
2. Scroll to "Your apps" section
3. Click the "</>" (Web) icon to create a web app
4. Register app name: "borg-night"
5. Copy the Firebase config object

## Step 4: Add Environment Variables

1. Create a `.env.local` file in your project root (same level as package.json)
2. Copy the values from your Firebase config:

```
VITE_FIREBASE_API_KEY=your_apiKey
VITE_FIREBASE_AUTH_DOMAIN=your_authDomain
VITE_FIREBASE_PROJECT_ID=your_projectId
VITE_FIREBASE_STORAGE_BUCKET=your_storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId
VITE_FIREBASE_APP_ID=your_appId
VITE_FIREBASE_DATABASE_URL=your_databaseURL
```

## Step 5: Set Up Database Rules (Security)

1. In Realtime Database, go to **Rules** tab
2. Replace the default rules with:

```json
{
  "rules": {
    "ratings": {
      "$key": {
        ".read": true,
        ".write": true,
        "rating": {
          ".validate": "isNumber(newData.val()) && newData.val() >= 1 && newData.val() <= 5"
        },
        "timestamp": {
          ".validate": "isString(newData.val())"
        }
      }
    }
  }
}
```

3. Click "Publish"

## Step 6: Test Locally

1. Run `npm run dev`
2. Navigate to a recipe
3. Try rating it - ratings should now persist
4. Refresh the page - ratings should still be there

## Step 7: Deploy to Vercel

1. In your Vercel project settings, go to **Environment Variables**
2. Add all 7 Firebase variables from Step 4
3. Redeploy your project
4. Ratings will now persist on your live site!

## Troubleshooting

**"Firebase is not defined"**: Make sure `.env.local` file exists and has correct variables

**Ratings not saving**: Check browser console for errors. Make sure Firebase database rules are published.

**"Realtime Database URL is invalid"**: Copy the exact URL from Firebase Console database settings (should look like `https://your-project.firebaseio.com`)

## Database Structure

Ratings are stored in this structure:
```
ratings/
  recipe_1/
    -rating-id-1: { rating: 5, timestamp: "2024-01-21..." }
    -rating-id-2: { rating: 4, timestamp: "2024-01-21..." }
  recipe_2/
    -rating-id-3: { rating: 5, timestamp: "2024-01-21..." }
```
