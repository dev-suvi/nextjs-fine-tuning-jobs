import React from "react";

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export default function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  return (
    <div className=" bg-red-600 text-white px-6 py-3 rounded shadow-lg flex items-center space-x-4  w-full mb-4">
      <p className="flex-1 font-medium">{message}</p>
      <button
        aria-label="Dismiss error"
        onClick={onClose}
        className="text-white hover:text-red-300 font-bold"
      >
        ×
      </button>
    </div>
  );
}
