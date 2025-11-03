#!/bin/bash

# Test Google Sheets API Connection
# Run this to verify your setup is working

echo "🔍 Testing Google Sheets API Connection..."
echo ""

API_KEY="AIzaSyBgmfqRhQl5JzNQpv7gqHrz6RcJ7MTj7nY"
SPREADSHEET_ID="1_oo_Aw1AqDv-cgTacIfyqrCSW40nDTfyNaXq9xK8foI"
SHEET_NAME="Sheet1"

echo "📊 Spreadsheet ID: $SPREADSHEET_ID"
echo "📄 Sheet Name: $SHEET_NAME"
echo ""

# Test 1: Check if sheet is accessible
echo "Test 1: Checking sheet accessibility..."
RESPONSE=$(curl -s "https://content-sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$SHEET_NAME?key=$API_KEY")

if echo "$RESPONSE" | grep -q "error"; then
  echo "❌ FAILED - Sheet is not accessible"
  echo ""
  echo "Error Response:"
  echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
  echo ""
  echo "🔧 FIX REQUIRED:"
  echo "1. Open: https://docs.google.com/spreadsheets/d/$SPREADSHEET_ID/edit"
  echo "2. Click 'Share' button (top right)"
  echo "3. Click 'Change to anyone with the link'"
  echo "4. Set to 'Viewer' or 'Editor'"
  echo "5. Click 'Done'"
  echo ""
else
  echo "✅ SUCCESS - Sheet is accessible!"
  echo ""
  echo "Data Preview:"
  echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
  echo ""
  echo "🎉 Your Google Sheets API is working correctly!"
  echo ""
fi

# Test 2: Check if API is enabled
echo ""
echo "Test 2: Verifying Google Sheets API is enabled..."
if echo "$RESPONSE" | grep -q "API_KEY_SERVICE_BLOCKED"; then
  echo "❌ FAILED - Google Sheets API is NOT enabled"
  echo ""
  echo "🔧 FIX REQUIRED:"
  echo "1. Go to: https://console.cloud.google.com/apis/library"
  echo "2. Search for 'Google Sheets API'"
  echo "3. Click 'Enable'"
  echo ""
elif echo "$RESPONSE" | grep -q "error"; then
  echo "⚠️  API is enabled but there's a permission issue (see Test 1)"
else
  echo "✅ Google Sheets API is enabled!"
fi

echo ""
echo "================================================"
echo "Test Complete!"
echo "================================================"
