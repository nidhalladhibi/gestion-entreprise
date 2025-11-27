import React from "react";

export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn ${className}`}
    >
      {children}
    </button>
  );
}
