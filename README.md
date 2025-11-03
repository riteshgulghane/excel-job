# Google Sheets CRUD Application

A modern, responsive web application built with **React**, **Tailwind CSS**, and **Google Sheets API** that enables full CRUD (Create, Read, Update, Delete) operations on Google Sheets data.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-cyan)
![Vite](https://img.shields.io/badge/Vite-5.0.7-purple)

## 📋 Features

- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete records in Google Sheets
- 📊 **Responsive Table View** - Display all records in a beautiful, responsive table
- 📝 **Form Validation** - Client-side validation with error messages
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, professional look
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Real-time Sync** - Direct integration with Google Sheets API
- 🔔 **Toast Notifications** - User-friendly feedback for all actions
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development and builds

## 📁 Project Structure

```
/src
  /components          # Reusable UI components
    Button.jsx         # Customizable button component
    FormInput.jsx      # Form input with validation
    Table.jsx          # Data table component
    Layout.jsx         # Main layout wrapper
    Loader.jsx         # Loading spinner
    Toast.jsx          # Toast notification component
  /pages               # Application pages
    ListPage.jsx       # List/home page with data table
    CreatePage.jsx     # Create new record form
    EditPage.jsx       # Edit existing record form
  /services            # API and external services
    googleSheetsService.js  # Google Sheets API integration
  /hooks               # Custom React hooks
    useToast.js        # Toast notification hook
  /utils               # Utility functions
    validation.js      # Form validation utilities
  /styles              # Global styles
    index.css          # Tailwind and custom CSS
  App.jsx              # Main App component with routing
  main.jsx             # Application entry point
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A **Google Account**
- A **Google Cloud Project** with Sheets API enabled

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd job-excel
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Google Sheets API

#### 3.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"**
3. Enter a project name and click **"Create"**

#### 3.2 Enable Google Sheets API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and press **"Enable"**

#### 3.3 Create API Credentials

**Option A: API Key (Read-only operations)**

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the API Key (you'll need this for `.env`)

**Option B: OAuth 2.0 Client ID (Full CRUD operations - Recommended)**

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: Your app name
   - User support email: Your email
   - Developer contact: Your email
4. Choose **"Web application"**
5. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5173` (Vite default)
6. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:5173`
7. Click **"Create"**
8. Copy the **Client ID** and **Client Secret**

#### 3.4 Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add the following headers in the first row:
   ```
   Sr No | Company | L1 | L2 | L3 | MR | Location | Mode | Details
   ```
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
5. Make sure the sheet is either:
   - **Public** (Anyone with the link can view), OR
   - **Shared** with the email associated with your OAuth credentials

### Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_GOOGLE_API_KEY=your_api_key_here
   VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here
   VITE_SPREADSHEET_ID=your_spreadsheet_id_here
   VITE_SHEET_NAME=Sheet1
   ```

### Step 5: Run the Application

#### Development Mode

```bash
npm run dev
```

The application will open at `http://localhost:3000` (or the port shown in your terminal).

#### Production Build

```bash
npm run build
npm run preview
```

## 🎯 Usage

### Viewing Records

1. Navigate to the home page (`/`)
2. All records from your Google Sheet will be displayed in a table
3. Click **"Refresh"** to reload data from the sheet

### Creating a Record

1. Click **"Create New"** button or navigate to `/create`
2. Fill in the form fields:
   - **Company*** (required)
   - **L1*** (required)
   - **L2**
   - **L3**
   - **MR**
   - **Location*** (required)
   - **Mode** (dropdown: Remote/Hybrid/On-site)
   - **Details** (textarea)
3. Click **"Save Record"**
4. The Sr No will be auto-generated

### Editing a Record

1. Click the **"Edit"** button on any record in the table
2. Modify the form fields as needed
3. Click **"Update Record"** to save changes
4. Click **"Cancel"** to discard changes

### Deleting a Record

1. Click the **"Delete"** button on any record
2. Confirm the deletion in the popup
3. The record will be removed from the Google Sheet

## 🔐 Authentication Flow

When you perform a write operation (Create, Update, Delete) for the first time:

1. A Google OAuth popup will appear
2. Sign in with your Google account
3. Grant the necessary permissions
4. The app will store the access token for subsequent operations

**Note:** The token is session-based and will expire. You'll need to re-authenticate when it expires.

## 🎨 Customization

### Tailwind Configuration

Customize colors, fonts, and theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize your primary color palette
      },
    },
  },
}
```

### Adding New Fields

1. Update the Google Sheet headers
2. Modify `COLUMNS` in `src/services/googleSheetsService.js`
3. Update `rowToObject` and `objectToRow` functions
4. Add form fields in `CreatePage.jsx` and `EditPage.jsx`
5. Update table columns in `ListPage.jsx`

## 🛠️ Tech Stack

- **React 18.2** - UI library with functional components and hooks
- **React Router 6.20** - Client-side routing
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Vite 5.0** - Build tool and dev server
- **Google Sheets API v4** - Backend data storage
- **Google Identity Services** - OAuth authentication

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "googleapis": "^128.0.0",
  "axios": "^1.6.2",
  "tailwindcss": "^3.3.6",
  "vite": "^5.0.7"
}
```

## 🐛 Troubleshooting

### "API Key not valid" Error

- Verify your API key is correct in `.env`
- Check that Google Sheets API is enabled in your project
- Ensure the spreadsheet is publicly accessible or shared with your account

### OAuth Popup Blocked

- Allow popups in your browser for localhost
- Check the authorized origins in Google Cloud Console

### CORS Errors

- Ensure your local development server URL is added to authorized JavaScript origins
- Try clearing browser cache and cookies

### "Failed to fetch records"

- Verify the Spreadsheet ID is correct
- Check that the sheet name matches (default: "Sheet1")
- Ensure the sheet has the correct headers in row 1

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update authorized origins in Google Cloud Console to include your Vercel URL
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Update authorized origins to include your Netlify URL

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

**Made with ❤️ using React and Tailwind CSS**
