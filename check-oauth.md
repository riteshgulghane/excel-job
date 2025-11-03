# OAuth Setup Verification

## Current Configuration

### From .env file:
- **Client ID**: 661801660274-8mcucrj9uf8pevnbp2m9bsjvtqhcj1t6.apps.googleusercontent.com
- **Project ID**: 661801660274

## What to Check:

### 1. OAuth Consent Screen
Visit: https://console.cloud.google.com/apis/credentials/consent?project=661801660274

**Verify:**
- [ ] App name is set
- [ ] User type: External
- [ ] Publishing status: Testing (for development)
- [ ] Your email is in "Test users" list ⬅️ **CRITICAL**

### 2. OAuth Credentials
Visit: https://console.cloud.google.com/apis/credentials?project=661801660274

**Verify:**
- [ ] OAuth 2.0 Client ID exists
- [ ] Type: Web application
- [ ] Authorized JavaScript origins include:
  - http://localhost:3000
  - http://localhost:5173
- [ ] Authorized redirect URIs include:
  - http://localhost:3000
  - http://localhost:5173

## Test Email Requirement

**IMPORTANT**: The email you use to sign in must be:
1. Added to "Test users" in OAuth consent screen, OR
2. The same email as the developer account

## Steps to Fix:

1. Go to OAuth consent screen
2. Click "ADD USERS" under Test users
3. Add your Gmail address
4. Click "Save"
5. Try OAuth flow again

## Expected Flow:

1. Click "Save Record"
2. OAuth popup appears
3. Sign in with your Gmail
4. See consent screen: "ShopDemo wants to access your Google Account"
5. Click "Continue" or "Allow"
6. Popup closes
7. Record is saved!

## If You See Error:

**"ShopDemo has not completed the Google verification process"**
→ Your email is NOT in the test users list. Add it!

**"Access blocked: This app's request is invalid"**
→ Check authorized origins and redirect URIs

**"Insufficient Permission"**
→ Grant all requested permissions (Sheets API scope)
