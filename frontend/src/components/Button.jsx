import React from "react";

export default function Button({ children, onClick, type = "button", className = "", ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
