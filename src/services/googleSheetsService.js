// Google Sheets API Service
// This service handles all Google Sheets operations using the Google Sheets API v4

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || 'Sheet1';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Column mapping for the sheet
export const COLUMNS = {
  SR_NO: 0,
  COMPANY: 1,
  L1: 2,
  L2: 3,
  L3: 4,
  MR: 5,
  LOCATION: 6,
  MODE: 7,
  DETAILS: 8
};

// Initialize Google API client
let gapiInitialized = false;
let tokenClient = null;
let accessToken = localStorage.getItem('google_access_token'); // Persist token

export const initializeGoogleAPI = () => {
  return new Promise((resolve, reject) => {
    if (gapiInitialized) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';

    console.log('Loading Google API client...', API_KEY);
    script.onload = () => {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          });
          gapiInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
    script.onerror = reject;
    document.body.appendChild(script);

    console.log('Loading Google Identity Services for OAuth...', CLIENT_ID);
    // Load Google Identity Services for OAuth
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = () => {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (response) => {
          if (response.access_token) {
            accessToken = response.access_token;
            localStorage.setItem('google_access_token', accessToken);
            console.log('✅ OAuth token saved successfully');
          }
        },
      });
    };
    document.body.appendChild(gisScript);
  });
};

// Request user authorization
export const authorize = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error('Token client not initialized'));
      return;
    }

    // Check if we already have a valid token
    if (accessToken) {
      console.log('✅ Using existing OAuth token (no login needed)');
      // Set token in gapi client
      window.gapi.client.setToken({ access_token: accessToken });
      resolve({ access_token: accessToken });
      return;
    }

    // No token - need to request OAuth
    console.log('🔐 No token found - requesting OAuth authentication...');
    
    tokenClient.callback = (response) => {
      if (response.error) {
        console.error('❌ OAuth error:', response.error);
        reject(response);
      } else {
        accessToken = response.access_token;
        localStorage.setItem('google_access_token', accessToken);
        // Set token in gapi client
        window.gapi.client.setToken({ access_token: accessToken });
        console.log('✅ OAuth successful - token saved');
        resolve(response);
      }
    };

    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
};

// Clear stored authentication (logout)
export const clearAuth = () => {
  accessToken = null;
  localStorage.removeItem('google_access_token');
  if (window.gapi && window.gapi.client) {
    window.gapi.client.setToken(null);
  }
  console.log('🚪 Logged out - token cleared');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!accessToken;
};

// Convert row array to object
const rowToObject = (row, rowIndex) => {
  return {
    rowIndex: rowIndex + 2, // +2 because of 0-index and header row
    srNo: row[COLUMNS.SR_NO] || '',
    company: row[COLUMNS.COMPANY] || '',
    l1: row[COLUMNS.L1] || '',
    l2: row[COLUMNS.L2] || '',
    l3: row[COLUMNS.L3] || '',
    mr: row[COLUMNS.MR] || '',
    location: row[COLUMNS.LOCATION] || '',
    mode: row[COLUMNS.MODE] || '',
    details: row[COLUMNS.DETAILS] || ''
  };
};

// Convert object to row array
const objectToRow = (obj) => {
  return [
    obj.srNo || '',
    obj.company || '',
    obj.l1 || '',
    obj.l2 || '',
    obj.l3 || '',
    obj.mr || '',
    obj.location || '',
    obj.mode || '',
    obj.details || ''
  ];
};

// Get all records from the sheet
export const getAllRecords = async () => {
  try {
    await initializeGoogleAPI();
    
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:I`, // Skip header row (start from row 2)
    });

    const rows = response.result.values || [];
    console.log(`✅ Successfully fetched ${rows.length} records from Google Sheet`);
    return rows.map((row, index) => rowToObject(row, index));
  } catch (error) {
    console.error('❌ Error fetching records:', error);
    if (error.result) {
      console.error('Error details:', error.result.error);
    }
    throw error;
  }
};

// Get a single record by row index
export const getRecordByIndex = async (rowIndex) => {
  try {
    await initializeGoogleAPI();
    
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex}:I${rowIndex}`,
    });

    const row = response.result.values?.[0] || [];
    return rowToObject(row, rowIndex - 2);
  } catch (error) {
    console.error('Error fetching record:', error);
    throw error;
  }
};

// Create a new record
export const createRecord = async (data) => {
  try {
    console.log('📝 Creating new record...');
    await initializeGoogleAPI();
    await authorize();

    // Get the next Sr No
    const records = await getAllRecords();
    const nextSrNo = records.length + 1;

    const newRecord = {
      ...data,
      srNo: nextSrNo
    };

    const row = objectToRow(newRecord);
    console.log(`➕ Adding record #${nextSrNo} to sheet...`);

    const response = await window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [row]
      }
    });

    console.log('✅ Record created successfully!');
    return response.result;
  } catch (error) {
    console.error('❌ Error creating record:', error);
    
    // Handle token expiration
    if (error.result?.error?.code === 401 || error.result?.error?.status === 'UNAUTHENTICATED') {
      console.warn('⚠️ Token expired - clearing auth. Please try again.');
      clearAuth();
    }
    
    throw error;
  }
};

// Update an existing record
export const updateRecord = async (rowIndex, data) => {
  try {
    await initializeGoogleAPI();
    await authorize();

    const row = objectToRow(data);

    const response = await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex}:I${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [row]
      }
    });

    return response.result;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

// Delete a record (by clearing the row)
export const deleteRecord = async (rowIndex) => {
  try {
    await initializeGoogleAPI();
    await authorize();

    const response = await window.gapi.client.sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex}:I${rowIndex}`
    });

    return response.result;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

// Initialize the sheet with headers if it doesn't exist
export const initializeSheet = async () => {
  try {
    await initializeGoogleAPI();
    await authorize();

    const headers = ['Sr No', 'Company', 'L1', 'L2', 'L3', 'MR', 'Location', 'Mode', 'Details'];

    const response = await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:I1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [headers]
      }
    });

    return response.result;
  } catch (error) {
    console.error('Error initializing sheet:', error);
    throw error;
  }
};
