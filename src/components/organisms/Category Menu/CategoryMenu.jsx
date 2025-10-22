import React from "react";
import "./CategoryMenu.css";
import { Link } from "react-router-dom";

export default function CategoryMenu() {
  const categories = [
    { name: "Gaming y Streaming", link: "/categories/gaming-y-streaming" },
    { name: "Computación", link: "/categories/computacion" },
    { name: "Componentes", link: "/categories/componentes" },
    { name: "Juegos de mesa", link: "/categories/juegos-de-mesa" },
    { name: "Consolas", link: "/categories/consolas" },
    
  ];

  return (
    <div className="category-menu">
      <div className="category-menu-container">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.link}
            className={`category-item ${cat.extra ? "extra-item" : ""}`}
          >
            <span className="category-text">{cat.name}</span>
            {!cat.extra && (
              <svg
                className="category-icon"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 32 32"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3067 13.1323L15.7867 18.6123C16.0365 18.8606 16.3744 19 16.7267 19C17.0789 19 17.4168 18.8606 17.6667 18.6123L23 13.2789"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                ></path>
              </svg>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}