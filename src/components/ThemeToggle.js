"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check if there's a saved theme preference or use default
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!theme) return null; // Avoid hydration mismatch by waiting for mount

  return (
    <button 
      onClick={toggleTheme} 
      style={{
        position: "fixed",
        top: "var(--space-2)",
        right: "var(--space-2)",
        zIndex: 100,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-primary)",
        padding: "var(--space-1) var(--space-2)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all var(--transition-fast)"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
