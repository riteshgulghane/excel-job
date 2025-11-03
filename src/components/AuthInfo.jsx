import React from 'react';

const AuthInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🔐</span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            First-time Setup Required
          </h3>
          <p className="text-sm text-blue-700">
            When you save your first record, you'll be asked to sign in with Google. 
            This is a <strong>one-time authorization</strong> to allow the app to write to your Google Sheet. 
            After that, everything works automatically!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthInfo;
