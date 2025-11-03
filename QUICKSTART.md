# Quick Start Guide

Get up and running in 5 minutes! ⚡

## Prerequisites

- Node.js 16+ installed
- Google account
- 5 minutes of your time

## Step 1: Clone & Install (1 minute)

```bash
# Clone the repo
git clone <your-repo-url>
cd job-excel

# Install dependencies
npm install
```

## Step 2: Google Sheets Setup (2 minutes)

### Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add headers in first row:
   ```
   Sr No | Company | L1 | L2 | L3 | MR | Location | Mode | Details
   ```
4. Copy the Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/[COPY_THIS_ID]/edit
   ```
5. Click "Share" → "Anyone with the link" → Set to "Editor" → "Done"

### Get Google API Credentials

**Quick Setup (Development):**

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google Sheets API"
4. Create credentials:
   - **API Key**: Credentials → Create → API Key
   - **OAuth Client ID**: Credentials → Create → OAuth 2.0 Client ID
     - Application type: Web application
     - Authorized origins: `http://localhost:3000` and `http://localhost:5173`
     - Authorized redirect URIs: Same as above

## Step 3: Configure Environment (1 minute)

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env`:

```env
VITE_GOOGLE_API_KEY=your_api_key
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=your_client_secret
VITE_SPREADSHEET_ID=your_spreadsheet_id
VITE_SHEET_NAME=Sheet1
```

## Step 4: Run! (1 minute)

```bash
npm run dev
```

Open http://localhost:3000

## Step 5: Test It Out

1. **View records** - Should see empty table or existing data
2. **Click "Create New"** - Fill the form and save
3. **First time creating?** - OAuth popup will appear:
   - Sign in with Google
   - Click "Allow"
4. **Edit a record** - Click "Edit" button
5. **Delete a record** - Click "Delete" button

## 🎉 You're Done!

Your app is now connected to Google Sheets!

## Troubleshooting

### "Failed to fetch records"
- Check Spreadsheet ID is correct
- Verify sheet name (default: "Sheet1")
- Ensure sheet is shared/public

### OAuth popup blocked
- Allow popups for localhost
- Try a different browser

### API Key error
- Verify API key in `.env`
- Check Google Sheets API is enabled
- Wait a few minutes (propagation delay)

## Next Steps

- Read the full [README.md](README.md)
- Check [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) for detailed setup
- Deploy your app with [DEPLOYMENT.md](DEPLOYMENT.md)

## Common Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

Need help? Check the docs or open an issue!
