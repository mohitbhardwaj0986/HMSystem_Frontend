import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="w-12 h-12 border-4 border-[#036176] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
