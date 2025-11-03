import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  const typeClasses = {
    success: 'toast-success',
    error: 'toast-error',
    info: 'toast-info'
  };

  return (
    <div className={`toast ${typeClasses[type]}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <p className="flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
