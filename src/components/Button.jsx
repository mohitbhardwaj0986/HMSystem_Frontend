import React from "react";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-2 py-1 rounded bg-[#036176] text-white hover:bg-[#024d5c] transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
