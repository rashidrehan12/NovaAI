import { useState, useEffect } from 'react';

const Toast = ({ message, show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-[#3c6e71] text-white px-4 py-2 rounded-lg shadow-lg border border-[#549295]">
        <div className="flex items-center gap-2">
          <span className="text-sm">✓</span>
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;