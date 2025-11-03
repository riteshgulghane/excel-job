# Setup Checklist ✅

Follow this checklist to get your application up and running.

## 📦 Installation

- [ ] Node.js 16+ installed
- [ ] Git installed (optional)
- [ ] Text editor/IDE ready

## 🔧 Project Setup

- [ ] Navigate to project directory: `cd job-excel`
- [ ] Install dependencies: `npm install`
- [ ] Verify installation completed without errors

## ☁️ Google Cloud Setup

### Create Project
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project
- [ ] Note project name: __________________

### Enable API
- [ ] Navigate to "APIs & Services" → "Library"
- [ ] Search for "Google Sheets API"
- [ ] Click "Enable"

### Create Credentials

#### API Key
- [ ] Go to "Credentials" tab
- [ ] Click "Create Credentials" → "API Key"
- [ ] Copy API Key: __________________
- [ ] (Optional) Restrict API Key to Google Sheets API

#### OAuth 2.0
- [ ] Configure OAuth consent screen
- [ ] User Type: External
- [ ] App name: __________________
- [ ] Add test user (your email)
- [ ] Create OAuth Client ID
- [ ] Application type: Web application
- [ ] Add authorized JavaScript origins:
  - [ ] `http://localhost:3000`
  - [ ] `http://localhost:5173`
- [ ] Add authorized redirect URIs:
  - [ ] `http://localhost:3000`
  - [ ] `http://localhost:5173`
- [ ] Copy Client ID: __________________
- [ ] Copy Client Secret: __________________

## 📊 Google Sheets Setup

- [ ] Go to [Google Sheets](https://sheets.google.com)
- [ ] Create new spreadsheet
- [ ] Name it: __________________
- [ ] Add headers in row 1:
  - [ ] A1: Sr No
  - [ ] B1: Company
  - [ ] C1: L1
  - [ ] D1: L2
  - [ ] E1: L3
  - [ ] F1: MR
  - [ ] G1: Location
  - [ ] H1: Mode
  - [ ] I1: Details
- [ ] Click "Share" button
- [ ] Set to "Anyone with the link" + "Editor" OR share with your Google account
- [ ] Copy Spreadsheet ID from URL: __________________

## 🔐 Environment Configuration

- [ ] Copy `.env.example` to `.env`: `cp .env.example .env`
- [ ] Open `.env` file
- [ ] Add Google API Key
- [ ] Add Google Client ID
- [ ] Add Google Client Secret
- [ ] Add Spreadsheet ID
- [ ] Verify Sheet Name (default: Sheet1)
- [ ] Save `.env` file

## ✅ Verification

### Test Installation
- [ ] Run `npm run dev`
- [ ] Application opens in browser
- [ ] No console errors
- [ ] Port is 3000 or 5173

### Test Read Operations
- [ ] Navigate to home page (/)
- [ ] Table displays (empty or with data)
- [ ] No API errors in console

### Test Write Operations
- [ ] Click "Create New" button
- [ ] Fill out the form
- [ ] Click "Save Record"
- [ ] OAuth popup appears
- [ ] Sign in with Google
- [ ] Grant permissions
- [ ] Record is created successfully
- [ ] Toast notification appears
- [ ] Redirected to home page
- [ ] New record appears in table

### Test Edit Operations
- [ ] Click "Edit" on a record
- [ ] Form loads with existing data
- [ ] Modify a field
- [ ] Click "Update Record"
- [ ] Record updates successfully
- [ ] Changes reflected in table

### Test Delete Operations
- [ ] Click "Delete" on a record
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Record is removed
- [ ] Table updates

## 📱 Responsive Testing

- [ ] Test on desktop (> 1024px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on mobile (< 640px)
- [ ] Navigation works on all sizes
- [ ] Table scrolls horizontally on mobile
- [ ] Forms are usable on all sizes

## 🐛 Troubleshooting

If you encounter issues, check:

- [ ] Environment variables are correct
- [ ] No typos in `.env` file
- [ ] Google Sheets API is enabled
- [ ] OAuth credentials are correct
- [ ] Authorized URLs match your local URL
- [ ] Spreadsheet ID is correct
- [ ] Sheet name matches
- [ ] Spreadsheet is shared/public

## 📚 Documentation Review

Familiarize yourself with:

- [ ] Read [README.md](README.md)
- [ ] Review [QUICKSTART.md](QUICKSTART.md)
- [ ] Check [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
- [ ] Browse [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- [ ] Plan deployment with [DEPLOYMENT.md](DEPLOYMENT.md)

## 🚀 Next Steps

After successful setup:

- [ ] Add sample data to test
- [ ] Customize styling/colors
- [ ] Add more fields if needed
- [ ] Set up version control (Git)
- [ ] Deploy to hosting platform
- [ ] Add production credentials
- [ ] Update OAuth for production domain
- [ ] Share with team/users

## ✨ Optional Enhancements

Consider adding:

- [ ] Dark mode
- [ ] Search/filter functionality
- [ ] Export to CSV
- [ ] Batch operations
- [ ] Pagination
- [ ] Sorting
- [ ] Advanced validation
- [ ] File uploads
- [ ] User authentication
- [ ] Analytics tracking

## 🎉 Completion

- [ ] Application is running locally
- [ ] All CRUD operations work
- [ ] Data syncs with Google Sheets
- [ ] No console errors
- [ ] Ready for development/deployment

---

**Congratulations! Your Google Sheets CRUD application is ready to use! 🎊**

For questions or issues, refer to the documentation or open an issue.

**Happy coding!** 🚀
