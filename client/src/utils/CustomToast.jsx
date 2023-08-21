import React from "react";
import { toast } from "react-hot-toast";

// Dark Mode Toast - Success
export const DarkModeToastSuccess = ({ message }) => {
  return (
    <div>
      {toast.success(message, {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })}
    </div>
  );
};

// Dark Mode Toast - Error
export const DarkModeToastError = ({ message }) => {
  return (
    <div>
      {toast.error(message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })}
    </div>
  );
};
